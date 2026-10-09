import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { 
  generateFallbackLandingCopy, 
  generateFallbackSeoPack, 
  generateFallbackDesignerNotes,
  parseBrief
} from "./server/fallbackGenerator";
import { 
  generateDomainResearch as generateFallbackResearch,
  enrichResearchWithBenchmarkPagesAndPoints
} from "./server/researchIntelligence";
import { refineWithFeedbackOffline } from "./server/feedbackRefiner";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Cooldown tracking for depleted API key quota or rate limits
let quotaCooldownUntil = 0;
let lastApiError: { code: number; message: string; status: string; timestamp: number } | null = null;

function isQuotaDepletedError(err: any): boolean {
  if (!err) return false;
  const str = typeof err === "string" ? err : err.message || JSON.stringify(err);
  return (
    str.includes("429") ||
    str.includes("RESOURCE_EXHAUSTED") ||
    str.includes("prepayment") ||
    str.includes("credits are depleted") ||
    str.includes("quota")
  );
}

function handleQuotaOrServiceFallback(context: string, err?: any) {
  if (err) {
    const errorMsg = typeof err === "string" ? err : err.message || JSON.stringify(err);
    const isQuota = isQuotaDepletedError(err);
    lastApiError = {
      code: isQuota ? 429 : 500,
      message: errorMsg,
      status: isQuota ? "RESOURCE_EXHAUSTED" : "API_ERROR",
      timestamp: Date.now()
    };
  }
  if (isQuotaDepletedError(err)) {
    quotaCooldownUntil = Date.now() + 180 * 1000; // 3-minute cooldown before re-attempting live API
    console.log(`[Embee Engine] ${context}: Prepayment credits depleted / quota reached. Serving specialized Embee Software domain knowledge base.`);
  } else {
    console.log(`[Embee Engine] ${context}: Serving specialized Embee Software domain knowledge base.`);
  }
}

// Lazy getter for Google Gen AI client with telemetry User-Agent header
function getGenAIClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not configured. Please set it in Settings > Secrets.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build"
      }
    }
  });
}

// Health check and live API diagnostics endpoint
app.get("/api/health", async (req, res) => {
  const shouldTest = req.query.test === "true";
  let liveTestResult: any = null;

  if (shouldTest && process.env.GEMINI_API_KEY) {
    try {
      const ai = getGenAIClient();
      const testRes = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: "Respond with: OK",
        config: { maxOutputTokens: 5 }
      });
      quotaCooldownUntil = 0;
      lastApiError = null;
      liveTestResult = {
        success: true,
        message: `Connected successfully to Gemini 3.8 Flash! (Response: ${testRes.text?.trim()})`
      };
    } catch (err: any) {
      handleQuotaOrServiceFallback("Live API Health Test", err);
      liveTestResult = {
        success: false,
        code: 429,
        message: err?.message || "Credits depleted",
        status: isQuotaDepletedError(err) ? "RESOURCE_EXHAUSTED" : "API_ERROR"
      };
    }
  }

  res.json({
    status: "ok",
    hasApiKey: !!process.env.GEMINI_API_KEY,
    isQuotaLimited: Date.now() < quotaCooldownUntil || (lastApiError !== null && lastApiError.code === 429),
    lastApiError,
    liveTestResult,
    timestamp: new Date().toISOString()
  });
});

// Live Research using Gemini with Google Search Grounding
app.post("/api/research", async (req, res) => {
  const { query, pillarName, solutionGroup, keywords } = req.body;
  const pName = pillarName || "Cloud Advisory & Consulting";
  const gName = solutionGroup || "Cloud Solutions";
  const searchQuery = query || `${pName} ${gName} India`;

  // If in quota cooldown, immediately serve enterprise domain fallback
  if (Date.now() < quotaCooldownUntil) {
    const fallbackData = generateFallbackResearch(pName, gName, keywords, searchQuery);
    return res.json({
      ...fallbackData,
      isQuotaLimited: true,
      engineType: "Offline template, not AI generated",
      quotaReason: lastApiError?.message || "Prepayment credits depleted"
    });
  }

  try {
    const ai = getGenAIClient();
    const prompt = `Perform genuine, in-depth B2B search landscape and competitor research for the specific enterprise solution page and topic:
Topic / Solution Pillar: "${pName}"
Solution Group: "${gName}"
Search Query: "${searchQuery}"
Target keywords: ${(keywords || []).join(", ")}.

You are providing competitive and strategic intelligence for Embee Software (Microsoft Frontier Partner, Microsoft Solutions Partner) to build the definitive high-ranking enterprise landing page.

CRITICAL RESEARCH RULES:
- Perform ACTUAL competitor research based specifically on this exact page and topic.
- Do NOT follow predefined notions: do NOT assume or force Indian cloud regions (such as Central India in Pune, South India in Chennai, or sub-18ms latency), do NOT force SAP ERP integrations, and do NOT force generic datacenter/migration templates unless this specific pillar is explicitly about them.
- Research what actual top-ranking competitor and vendor pages for "${searchQuery}" focus on in reality.
- Identify the genuine omissions, practical limitations, and customer blindspots in their messaging for this specific solution.
- Uncover real buyer anxieties and objections relevant to this topic (such as change management, adoption hurdles, team productivity, total cost of ownership, operational agility, security governance).
- Formulate strategic differentiation points in clear, readable, accessible business language without overly dense engineering jargon.

Please output your findings in the following clear structure:
1. SUMMARY: A concise 2-sentence executive summary of the real search landscape for this specific solution topic.
2. TOP THEMES COVERED: 5 bullet points of what current ranking competitor pages actually focus on.
3. CRITICAL GAPS & OMISSIONS: 5 to 6 bullet points of what competing pages fail to answer for this specific topic.
4. BUYER ANXIETIES & OBJECTIONS: 3 to 4 bullet points of real unspoken fears of enterprise CIOs and business leaders for this solution.
5. TECHNICAL ARCHITECTURE & SLAS: 3 to 4 bullet points detailing architecture baselines, integration standards, and operational benchmarks in clear, readable terms.
6. RESEARCH BRIEF FOR COPYWRITER: A detailed paragraph synthesizing how Embee Software can cleanly differentiate on this page without naming any competitors.`;

    let response: any;
    const searchSources: { title: string; uri: string }[] = [];

    try {
      const searchPromise = ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          temperature: 0.2
        }
      });
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Search grounding timeout")), 12000)
      );
      response = await Promise.race([searchPromise, timeoutPromise]);

      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      for (const chunk of groundingChunks) {
        if (chunk.web?.uri) {
          searchSources.push({
            title: chunk.web.title || chunk.web.uri,
            uri: chunk.web.uri
          });
        }
      }
    } catch (searchToolError: any) {
      if (isQuotaDepletedError(searchToolError)) {
        handleQuotaOrServiceFallback("Search Grounding", searchToolError);
        const fallbackData = generateFallbackResearch(pName, gName, keywords, searchQuery);
        return res.json({
          ...fallbackData,
          isQuotaLimited: true
        });
      }

      // If search tool alone failed for other reasons, try direct inference
      response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: `Perform expert B2B competitive analysis for the specific topic: "${pName}" (Solution Group: "${gName}") with search query: "${searchQuery}".
Target keywords: ${(keywords || []).join(", ")}.

CRITICAL RESEARCH RULES:
- Perform ACTUAL competitor research based specifically on this exact page and topic.
- Do NOT follow predefined notions: do NOT assume or force Indian cloud regions (Pune, Chennai), do NOT force SAP ERP integrations, and do NOT force generic datacenter templates unless this specific pillar is explicitly about them.
- Analyze what top-ranking IT service providers actually cover for this topic, and identify genuine gaps and omissions that Embee Software can exploit in clear, readable business terms.

Please output your findings in the following clear structure:
1. SUMMARY: A concise 2-sentence executive summary of the search landscape for this specific solution.
2. TOP THEMES COVERED: 5 bullet points of what current ranking competitor pages focus on.
3. CRITICAL GAPS & OMISSIONS: 5 to 6 bullet points of what ranking pages fail to answer.
4. BUYER ANXIETIES & OBJECTIONS: 3 to 4 bullet points of unspoken fears of enterprise buyers.
5. TECHNICAL ARCHITECTURE & SLAS: 3 to 4 bullet points detailing practical architecture and delivery benchmarks.
6. RESEARCH BRIEF FOR COPYWRITER: A paragraph synthesizing how Embee Software can definitively differentiate on this page without naming any competitors.`,
        config: {
          temperature: 0.2
        }
      });
    }

    const rawText = response.text || "";

    // Parse sections from response
    const themesMatch = rawText.match(/TOP THEMES COVERED:?([\s\S]*?)(?=CRITICAL GAPS|$)/i);
    const gapsMatch = rawText.match(/CRITICAL GAPS & OMISSIONS:?([\s\S]*?)(?=BUYER ANXIETIES|RESEARCH BRIEF|$)/i);
    const summaryMatch = rawText.match(/SUMMARY:?([\s\S]*?)(?=TOP THEMES|$)/i);

    const rankingThemes = themesMatch
      ? themesMatch[1].split("\n").map(l => l.replace(/^[-*•0-9.]+\s*/, "").trim()).filter(Boolean)
      : [
          `Broad ${pName} and ${gName} overviews without local engineering depth`,
          "Generic SLA claims without verified contractual RTO/RPO commitments",
          "Global marketing templates disconnected from Indian compliance realities"
        ];

    const competitorGaps = gapsMatch
      ? gapsMatch[1].split("\n").map(l => l.replace(/^[-*•0-9.]+\s*/, "").trim()).filter(Boolean)
      : [
          `Specific ${gName} architectures engineered for Indian enterprise workloads`,
          "Direct access to [X certified engineers] backed by 35+ years of operational experience"
        ];

    const summary = summaryMatch
      ? summaryMatch[1].trim()
      : `Analysis of ranking pages for "${searchQuery}" shows generic service claims lacking Indian regulatory depth and concrete proof.`;

    const enrichedResult = enrichResearchWithBenchmarkPagesAndPoints(
      {
        query: searchQuery,
        summary,
        rankingThemes,
        competitorGaps,
        searchSources,
        rawText,
        isQuotaLimited: false
      },
      pName,
      gName,
      keywords,
      searchQuery
    );

    res.json(enrichedResult);
  } catch (error: any) {
    handleQuotaOrServiceFallback("Competitor Research", error);
    const fallbackData = generateFallbackResearch(pName, gName, keywords, searchQuery);
    res.json({
      ...fallbackData,
      isQuotaLimited: true,
      engineType: "Offline template, not AI generated",
      quotaReason: lastApiError?.message || "Prepayment credits depleted"
    });
  }
});

// Generate Landing Page Copy (Call 1)
app.post("/api/generate-copy", async (req, res) => {
  const { brief, promptTemplate } = req.body;
  if (!brief) {
    return res.status(400).json({ error: "Missing shared brief content" });
  }

  // If in quota cooldown, immediately serve enterprise copy fallback
  if (Date.now() < quotaCooldownUntil) {
    const landingCopy = generateFallbackLandingCopy(brief);
    return res.json({
      landingCopy,
      isQuotaLimited: true,
      engineType: "Offline template, not AI generated",
      quotaReason: lastApiError?.message || "Prepayment credits depleted"
    });
  }

  try {
    const ai = getGenAIClient();
    const finalPrompt = (promptTemplate || "").replace("[[INSERT THE SHARED BRIEF HERE]]", brief);

    const systemInstruction = `You are the lead B2B copywriter for Embee Software.
You must adhere strictly and non-negotiably to all Brand and Style Rules:
1. Always write "Embee Software" in full. Never just "Embee".
2. Microsoft relationship is "Microsoft Frontier Partner" and "Microsoft Solutions Partner". NEVER write "Microsoft Gold Partner". SAP relationship is "SAP Gold Partner".
3. Credential facts: 40+ years of experience across Indian enterprise IT, 18 Microsoft Advanced Specializations, 2024 Microsoft India & South Asia Partner of the Year for Modern Work.
4. NEVER use an em dash (—) or an en dash (–) anywhere. Use a comma, a colon, or restructure the sentence. This applies to every line of output.
5. Indian English spelling: optimisation, prioritised, organisation, centre.
6. Tagline: "Making IT Easier".
7. Never invent a statistic, customer name, award or credential. Use placeholders in square brackets if not in the facts.
8. NEVER name any competitor.
9. NEVER mention pricing, cost figures, rate cards, GST, or budget ranges anywhere.
10. Output FINISHED landing page copy ONLY in Markdown. No preamble, no postscript, no code fences.
11. Follow the clean 9-section structure, heading numbering (H1, 1. H2:, 1.1 H3:, 2. H2:, etc.), and the 4-phase arrow flowchart. Do NOT include an assessments section for now. Proceed directly from Partner Evaluation (Section 6) to Frequently Asked Questions (Section 7), Related Solutions (Section 8), and Closing Next Steps (Section 9).
12. Length must be strictly between 1,000 and 1,350 words total, matching the concise, high-density format of the reference document.
13. Customer proof is restricted to what the brief literally states. You may name a customer only if that customer appears in the brief. You may state an outcome only if that outcome is explicitly documented for that customer in the brief. Never invent metrics or attach unverified outcomes to real customers.
14. Tone and Readability: Write in clear, human, readable, and benefit-driven business language. Avoid overly dense technical jargon, acronym soup, and robotic engineering phrasing. Make it easy to read for enterprise leadership and business decision-makers.
15. Integrations & Sovereignty Rule: Do NOT mention specific Indian cloud regions (such as Azure Central India in Pune, South India in Chennai, or sub-18ms latency) and do NOT force SAP ERP integrations everywhere unless explicitly requested in the brief. Describe integrations with existing enterprise systems, CRM/ERP platforms, and databases naturally and flexibly.
16. Single Standalone Page Rule: Write strictly for ONE standalone landing page for the exact pillar/topic requested. Do NOT combine multiple sub-pages, separate service lines, or sister topics into a merged multi-page catalog automatically. Maintain an isolated focus on this single offering alone.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: finalPrompt,
      config: {
        systemInstruction,
        temperature: 0.3
      }
    });

    let landingCopy = response.text || "";

    // Safety sanitization: remove code fences if the model wrapped output
    landingCopy = landingCopy.replace(/^```markdown\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "").trim();

    // Enforce no em dashes and en dashes
    landingCopy = landingCopy.replace(/[\u2014—]/g, ": ");
    landingCopy = landingCopy.replace(/[\u2013–]/g, ", ");

    res.json({ landingCopy, isQuotaLimited: false, engineType: "Gemini 3.8 Flash (Live)" });
  } catch (error: any) {
    handleQuotaOrServiceFallback("Generate Copy", error);
    const landingCopy = generateFallbackLandingCopy(brief);
    res.json({
      landingCopy,
      isQuotaLimited: true,
      engineType: "Offline template, not AI generated",
      quotaReason: lastApiError?.message || "Prepayment credits depleted"
    });
  }
});

// Generate SEO Handover Pack (Call 2)
app.post("/api/generate-seo", async (req, res) => {
  const { brief, promptTemplate } = req.body;
  if (!brief) {
    return res.status(400).json({ error: "Missing shared brief content" });
  }

  // If in quota cooldown, immediately serve enterprise SEO pack fallback
  if (Date.now() < quotaCooldownUntil) {
    const seoNotes = generateFallbackSeoPack(brief);
    return res.json({
      seoNotes,
      isQuotaLimited: true,
      engineType: "Offline template, not AI generated",
      quotaReason: lastApiError?.message || "Prepayment credits depleted"
    });
  }

  try {
    const ai = getGenAIClient();
    const finalPrompt = (promptTemplate || "").replace("[[INSERT THE SHARED BRIEF HERE]]", brief);

    const systemInstruction = `You are the senior SEO Lead at Embee Software.
Output a complete, developer-ready SEO handover pack in Markdown.
Ensure all JSON-LD schemas (Service, FAQPage, BreadcrumbList) are syntactically valid JSON inside fenced code blocks.
Never use em dashes or en dashes anywhere. Always write "Embee Software". Never mention pricing or GST.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: finalPrompt,
      config: {
        systemInstruction,
        temperature: 0.2
      }
    });

    let seoNotes = response.text || "";
    seoNotes = seoNotes.replace(/[\u2014—]/g, ": ");
    seoNotes = seoNotes.replace(/[\u2013–]/g, ", ");

    res.json({ seoNotes, isQuotaLimited: false, engineType: "Gemini 3.8 Flash (Live)" });
  } catch (error: any) {
    handleQuotaOrServiceFallback("Generate SEO", error);
    const seoNotes = generateFallbackSeoPack(brief);
    res.json({
      seoNotes,
      isQuotaLimited: true,
      engineType: "Offline template, not AI generated",
      quotaReason: lastApiError?.message || "Prepayment credits depleted"
    });
  }
});

// Generate Designer Notes (Call 3)
app.post("/api/generate-designer", async (req, res) => {
  const { brief, promptTemplate } = req.body;
  if (!brief) {
    return res.status(400).json({ error: "Missing shared brief content" });
  }

  // If in quota cooldown, immediately serve enterprise designer notes fallback
  if (Date.now() < quotaCooldownUntil) {
    const designerNotes = generateFallbackDesignerNotes(brief);
    return res.json({
      designerNotes,
      isQuotaLimited: true,
      engineType: "Offline template, not AI generated",
      quotaReason: lastApiError?.message || "Prepayment credits depleted"
    });
  }

  try {
    const ai = getGenAIClient();
    const finalPrompt = (promptTemplate || "").replace("[[INSERT THE SHARED BRIEF HERE]]", brief);

    const systemInstruction = `You are the Creative Director providing starting direction for an in-house designer for Embee Software.
Keep the prose tight and under 500 words total.
Never use em dashes or en dashes. Always write "Embee Software". Never specify colors or fonts the designer owns.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: finalPrompt,
      config: {
        systemInstruction,
        temperature: 0.3
      }
    });

    let designerNotes = response.text || "";
    designerNotes = designerNotes.replace(/[\u2014—]/g, ": ");
    designerNotes = designerNotes.replace(/[\u2013–]/g, ", ");

    res.json({ designerNotes, isQuotaLimited: false, engineType: "Gemini 3.8 Flash (Live)" });
  } catch (error: any) {
    handleQuotaOrServiceFallback("Generate Designer", error);
    const designerNotes = generateFallbackDesignerNotes(brief);
    res.json({
      designerNotes,
      isQuotaLimited: true,
      engineType: "Offline template, not AI generated",
      quotaReason: lastApiError?.message || "Prepayment credits depleted"
    });
  }
});

// Edit & Refine Deliverables Based on User Feedback
app.post("/api/edit-with-feedback", async (req, res) => {
  const {
    feedback,
    targetType = "copy",
    currentLandingCopy = "",
    currentSeoNotes = "",
    currentDesignerNotes = "",
    brief = "",
    pillarName = "Cloud Advisory & Consulting",
    solutionGroup = "Cloud Solutions"
  } = req.body;

  if (!feedback || typeof feedback !== "string" || !feedback.trim()) {
    return res.status(400).json({ error: "Feedback instruction cannot be empty" });
  }

  const cleanFeedback = feedback.trim();
  const contentBundle = {
    landingCopy: currentLandingCopy,
    seoNotes: currentSeoNotes,
    designerNotes: currentDesignerNotes
  };

  // If in quota cooldown or no API key, serve smart programmatic editorial refinement
  if (Date.now() < quotaCooldownUntil || !process.env.GEMINI_API_KEY) {
    const offlineResult = refineWithFeedbackOffline(contentBundle, cleanFeedback, targetType);
    return res.json({
      ...offlineResult,
      isQuotaLimited: true,
      engineType: "Offline editorial refinement engine",
      quotaReason: lastApiError?.message || "Prepayment credits depleted"
    });
  }

  try {
    const ai = getGenAIClient();

    const systemInstruction = `You are the Lead B2B Copywriter and Editorial Director for Embee Software.
A client or internal stakeholder has reviewed the generated deliverables and provided specific editorial feedback:
"${cleanFeedback}"

Your task is to EDIT and REFINE the existing content based directly on this feedback.
Target to update: "${targetType}" (copy = Landing Page Copy, seo = SEO Handover Pack, designer = Designer Notes, all = All deliverables).
Pillar: "${pillarName}", Solution Group: "${solutionGroup}".

Adhere strictly and non-negotiably to all Embee Software Brand and Style Rules:
1. Always write "Embee Software" in full. Never just "Embee".
2. Microsoft relationship is "Microsoft Frontier Partner" and "Microsoft Solutions Partner". NEVER write "Microsoft Gold Partner". SAP relationship is "SAP Gold Partner".
3. Credential facts: 40+ years of experience across Indian enterprise IT, 18 Microsoft Advanced Specializations, 2024 Microsoft India & South Asia Partner of the Year for Modern Work.
4. NEVER use an em dash (—) or an en dash (–) anywhere. Use a comma, a colon, or restructure the sentence.
5. Indian English spelling: optimisation, prioritised, organisation, centre.
6. Tagline: "Making IT Easier".
7. Never invent a statistic, customer name, award or credential.
8. NEVER name any competitor.
9. NEVER mention pricing, cost figures, rate cards, GST, or budget ranges anywhere.
10. For Landing Page Copy: maintain a clean single standalone page for the target topic alone. Do NOT combine multiple pages or separate solution offerings automatically. Do NOT include an assessments section for now. Follow the structure: Challenges (1), Outcomes (2), Scope (3), Phased Delivery (4), Deliverables (5), Partner Evaluation (6), FAQs (7), Related Solutions (8), and Closing (9). Keep word count strictly between 1,000 and 1,350 words total.
11. Tone & Readability Rule: Write in clear, human, readable, and benefit-driven business language. Avoid overly dense technical jargon, acronym overload, and robotic engineering phrasing. If the feedback asks to make it less technical or more readable, simplify sentences, remove dense jargon, and make it engaging for business decision-makers.
12. Cloud Regions & Integrations Rule: Do NOT mention specific Indian cloud regions (such as Azure Central India in Pune, South India in Chennai, or sub-18ms latency) and do NOT force SAP ERP integrations everywhere. If the feedback asks to remove them, replace them with clean enterprise security boundaries, standard APIs, and integrations with existing enterprise systems and databases.
13. Output ONLY valid JSON with keys: "landingCopy", "seoNotes", "designerNotes", "summaryOfChanges". No markdown code fences outside the JSON.`;

    const userPrompt = `EXISTING CONTENT TO EDIT:
TARGET: ${targetType}
USER FEEDBACK: "${cleanFeedback}"

CURRENT LANDING PAGE COPY:
${currentLandingCopy || "(None provided)"}

CURRENT SEO HANDOVER:
${currentSeoNotes || "(None provided)"}

CURRENT DESIGNER NOTES:
${currentDesignerNotes || "(None provided)"}

SHARED BRIEF CONTEXT:
${brief || `Pillar: ${pillarName}, Group: ${solutionGroup}`}

Please carefully incorporate the user's feedback, refine the appropriate text, and return valid JSON:
{
  "landingCopy": "updated landing copy markdown (or original if not targeted)",
  "seoNotes": "updated SEO markdown (or original if not targeted)",
  "designerNotes": "updated designer markdown (or original if not targeted)",
  "summaryOfChanges": "Concise summary of the specific edits made in response to the user's feedback"
}`;

    const generatePromise = ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.3,
        responseMimeType: "application/json"
      }
    });

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("AI edit timeout")), 12000)
    );

    const response: any = await Promise.race([generatePromise, timeoutPromise]);

    let rawOutput = response.text || "";
    // Clean potential markdown blocks
    rawOutput = rawOutput.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "").trim();

    let parsed: any;
    try {
      parsed = JSON.parse(rawOutput);
    } catch (parseErr) {
      console.warn("[Embee Engine] Failed to parse JSON from feedback edit, extracting or falling back:", parseErr);
      // Fallback to offline editor if JSON parsing failed
      const offlineResult = refineWithFeedbackOffline(contentBundle, cleanFeedback, targetType);
      return res.json({
        ...offlineResult,
        isQuotaLimited: false,
        engineType: "Gemini 3.8 Flash (Fallback parsed)"
      });
    }

    // Clean any accidental dashes or short names
    let updatedLandingCopy = parsed.landingCopy || currentLandingCopy;
    let updatedSeoNotes = parsed.seoNotes || currentSeoNotes;
    let updatedDesignerNotes = parsed.designerNotes || currentDesignerNotes;
    let summaryOfChanges = parsed.summaryOfChanges || `Incorporated user feedback: "${cleanFeedback.slice(0, 70)}..."`;

    const clean = (str: string) => {
      return (str || "")
        .replace(/[\u2014—]/g, ": ")
        .replace(/[\u2013–]/g, ", ")
        .replace(/\bEmbee\b(?!\s+Software)/g, "Embee Software");
    };

    updatedLandingCopy = clean(updatedLandingCopy);
    updatedSeoNotes = clean(updatedSeoNotes);
    updatedDesignerNotes = clean(updatedDesignerNotes);

    res.json({
      landingCopy: updatedLandingCopy,
      seoNotes: updatedSeoNotes,
      designerNotes: updatedDesignerNotes,
      summaryOfChanges,
      isQuotaLimited: false,
      engineType: "Gemini 3.8 Flash (Live Refinement)"
    });
  } catch (error: any) {
    handleQuotaOrServiceFallback("Edit with Feedback", error);
    const offlineResult = refineWithFeedbackOffline(contentBundle, cleanFeedback, targetType);
    res.json({
      ...offlineResult,
      isQuotaLimited: true,
      engineType: "Offline editorial refinement engine",
      quotaReason: lastApiError?.message || "Prepayment credits depleted"
    });
  }
});

// Start server with Vite middleware integration
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Embee Software Page Builder running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
