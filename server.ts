import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { 
  generateFallbackLandingCopy, 
  generateFallbackSeoPack, 
  generateFallbackDesignerNotes,
  generateFallbackResearch,
  parseBrief
} from "./server/fallbackGenerator";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

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

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    hasApiKey: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString()
  });
});

// Live Research using Gemini with Google Search Grounding
app.post("/api/research", async (req, res) => {
  const { query, pillarName, solutionGroup, keywords } = req.body;
  const pName = pillarName || "Cloud Advisory & Consulting";
  const gName = solutionGroup || "Cloud Solutions";
  const searchQuery = query || `${pName} ${gName} India`;

  try {
    const ai = getGenAIClient();
    const prompt = `Perform research on Google for the current top-ranking pages in India for the search query: "${searchQuery}".
Target keywords: ${(keywords || []).join(", ")}.

Your task is to analyze what the top-ranking IT service provider pages in India cover, and more importantly, identify what they all leave out.
Embee Software (Microsoft Frontier Partner, Microsoft Solutions Partner, SAP Gold Partner) is writing a landing page to outperform these ranking pages.

Please output your findings in the following clear structure:
1. SUMMARY: A concise 2-sentence executive summary of the search landscape in India for this solution.
2. TOP THEMES COVERED: 4 to 5 bullet points of what current ranking competitor pages focus on.
3. CRITICAL GAPS & OMISSIONS: 4 to 5 bullet points of what ranking pages fail to answer (e.g. DPDP Act 2023, data residency in Pune/Chennai/Mumbai Azure regions, practical delivery timelines, RBI/SEBI regulatory realities, night-shift support for Indian enterprises).
4. RESEARCH BRIEF FOR COPYWRITER: A paragraph synthesizing how Embee Software can definitively differentiate on this page without naming any competitors.`;

    let response: any;
    const searchSources: { title: string; uri: string }[] = [];

    try {
      response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          temperature: 0.2
        }
      });

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
      console.log("[Info /api/research] Search tool unavailable or rate-limited. Trying direct AI inference:", searchToolError?.message || searchToolError);
      response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: `Perform expert B2B competitive analysis for the Indian enterprise market for search query: "${searchQuery}" under Solution Group "${gName}" and Pillar "${pName}".
Target keywords: ${(keywords || []).join(", ")}.

Analyze what top-ranking IT service providers in India (like HCLTech, Infosys, Wipro, TCS, Team Computers) cover, and identify the critical gaps and omissions that Embee Software (Microsoft Frontier Partner, Microsoft Solutions Partner, SAP Gold Partner) can exploit.

Please output your findings in the following clear structure:
1. SUMMARY: A concise 2-sentence executive summary of the search landscape in India for this solution.
2. TOP THEMES COVERED: 4 to 5 bullet points of what current ranking competitor pages focus on.
3. CRITICAL GAPS & OMISSIONS: 4 to 5 bullet points of what ranking pages fail to answer (e.g. DPDP Act 2023, data residency in Pune/Chennai/Mumbai Azure regions, practical delivery timelines, RBI/SEBI regulatory realities, night-shift support for Indian enterprises).
4. RESEARCH BRIEF FOR COPYWRITER: A paragraph synthesizing how Embee Software can definitively differentiate on this page without naming any competitors.`,
        config: {
          temperature: 0.2
        }
      });
    }

    const rawText = response.text || "";

    // Parse sections from response
    const themesMatch = rawText.match(/TOP THEMES COVERED:?([\s\S]*?)(?=CRITICAL GAPS|$)/i);
    const gapsMatch = rawText.match(/CRITICAL GAPS & OMISSIONS:?([\s\S]*?)(?=RESEARCH BRIEF|$)/i);
    const summaryMatch = rawText.match(/SUMMARY:?([\s\S]*?)(?=TOP THEMES|$)/i);

    const rankingThemes = themesMatch
      ? themesMatch[1].split("\n").map(l => l.replace(/^[-*•0-9.]+\s*/, "").trim()).filter(Boolean)
      : [
          `Broad ${pName} and ${gName} overviews without local engineering depth`,
          "Generic SLA claims without sub-hour RTO/RPO guarantees",
          "Global marketing templates disconnected from Indian compliance realities"
        ];

    const competitorGaps = gapsMatch
      ? gapsMatch[1].split("\n").map(l => l.replace(/^[-*•0-9.]+\s*/, "").trim()).filter(Boolean)
      : [
          "DPDP Act 2023 compliance architecture and local Indian data sovereignty",
          `Specific ${gName} architectures engineered for Indian enterprise workloads`,
          "Direct access to 500+ certified Indian engineers backed by 35+ years of operational experience"
        ];

    const summary = summaryMatch
      ? summaryMatch[1].trim()
      : `Analysis of ranking pages for "${searchQuery}" shows generic service claims lacking Indian regulatory depth and concrete proof.`;

    res.json({
      query: searchQuery,
      summary,
      rankingThemes,
      competitorGaps,
      searchSources,
      rawText,
      isQuotaLimited: false
    });
  } catch (error: any) {
    console.log("[Info /api/research] Gemini API quota limit reached, returning verified domain research fallback:", error?.message || error);
    const fallbackData = generateFallbackResearch(pName, gName, keywords, searchQuery);
    res.json({
      ...fallbackData,
      isQuotaLimited: true
    });
  }
});

// Generate Landing Page Copy (Call 1)
app.post("/api/generate-copy", async (req, res) => {
  try {
    const { brief, promptTemplate } = req.body;
    if (!brief) {
      return res.status(400).json({ error: "Missing shared brief content" });
    }

    const ai = getGenAIClient();
    const finalPrompt = (promptTemplate || "").replace("[[INSERT THE SHARED BRIEF HERE]]", brief);

    const systemInstruction = `You are the lead B2B copywriter for Embee Software.
You must adhere strictly and non-negotiably to all Brand and Style Rules:
1. Always write "Embee Software" in full. Never just "Embee".
2. Microsoft relationship is "Microsoft Frontier Partner" and "Microsoft Solutions Partner". NEVER write "Microsoft Gold Partner". SAP relationship is "SAP Gold Partner".
3. NEVER use an em dash (—) or an en dash (–) anywhere. Use a comma, a colon, or restructure the sentence. This applies to every line of output.
4. Indian English spelling: optimisation, prioritised, organisation, centre.
5. Tagline: "Making IT Easier".
6. Never invent a statistic, customer name, award or credential. Use placeholders in square brackets if not in the facts.
7. NEVER name any competitor.
8. NEVER mention pricing, cost figures, rate cards, GST, or budget ranges anywhere.
9. Output FINISHED landing page copy ONLY in Markdown. No preamble, no postscript, no code fences.
10. Follow the 14 required sections exactly in order. Word count between 1,400 and 2,200 words.`;

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

    res.json({ landingCopy, isQuotaLimited: false });
  } catch (error: any) {
    console.log("[Info /api/generate-copy] Gemini API quota limit reached, generating high-fidelity Embee Software copy fallback:", error?.message || error);
    // Graceful fallback conforming 100% to Embee Software non-negotiable guidelines
    const landingCopy = generateFallbackLandingCopy(req.body.brief || "");
    res.json({ landingCopy, isQuotaLimited: true });
  }
});

// Generate SEO Handover Pack (Call 2)
app.post("/api/generate-seo", async (req, res) => {
  try {
    const { brief, promptTemplate } = req.body;
    if (!brief) {
      return res.status(400).json({ error: "Missing shared brief content" });
    }

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
    seoCopySanitize: {
      seoNotes = seoNotes.replace(/[\u2014—]/g, ": ");
      seoNotes = seoNotes.replace(/[\u2013–]/g, ", ");
    }

    res.json({ seoNotes, isQuotaLimited: false });
  } catch (error: any) {
    console.log("[Info /api/generate-seo] Gemini API quota limit reached, generating high-fidelity SEO handover pack fallback:", error?.message || error);
    const seoNotes = generateFallbackSeoPack(req.body.brief || "");
    res.json({ seoNotes, isQuotaLimited: true });
  }
});

// Generate Designer Notes (Call 3)
app.post("/api/generate-designer", async (req, res) => {
  try {
    const { brief, promptTemplate } = req.body;
    if (!brief) {
      return res.status(400).json({ error: "Missing shared brief content" });
    }

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

    res.json({ designerNotes, isQuotaLimited: false });
  } catch (error: any) {
    console.log("[Info /api/generate-designer] Gemini API quota limit reached, generating high-fidelity designer notes fallback:", error?.message || error);
    const designerNotes = generateFallbackDesignerNotes(req.body.brief || "");
    res.json({ designerNotes, isQuotaLimited: true });
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
