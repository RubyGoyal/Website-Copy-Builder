import { SeoAuditScore, SeoCheckItem, KeywordAnalysis, PillarData } from '../types';

export function auditSeoAndAiSeo(
  copyText: string,
  seoNotesText: string,
  pillar: PillarData,
  audience: string = 'CIO/CTO'
): SeoAuditScore {
  const text = copyText || '';
  const words = text.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // Approximate Reading Time (avg 200 words per minute for B2B technical readers)
  const readingTimeMinutes = Math.max(1, Math.round(wordCount / 200));

  // Approximate Flesch Reading Ease: 206.835 - 1.015 * (words/sentences) - 84.6 * (syllables/words)
  const sentences = (text.match(/[.!?]+(\s+|$)/g) || []).length || 1;
  const avgSentenceLength = wordCount / Math.max(1, sentences);
  // Estimate syllables roughly
  const estimatedSyllables = words.reduce((acc, word) => {
    const clean = word.toLowerCase().replace(/[^a-z]/g, '');
    const syllables = (clean.match(/[aeiouy]{1,2}/g) || []).length;
    return acc + Math.max(1, syllables);
  }, 0);
  const avgSyllablesPerWord = estimatedSyllables / Math.max(1, wordCount);
  const rawFlesch = 206.835 - 1.015 * avgSentenceLength - 84.6 * avgSyllablesPerWord;
  const readingEaseScore = Math.min(100, Math.max(10, Math.round(rawFlesch)));

  // Target Keywords
  const targetKeywords = pillar.k && pillar.k.length > 0 ? pillar.k : [pillar.p, `${pillar.p} India`];
  const first100Words = words.slice(0, 150).join(' ').toLowerCase();

  // Extract Headings from markdown
  const h1Matches = text.match(/^#\s+(.+)$/m);
  const h1Text = h1Matches ? h1Matches[1].trim() : '';
  const h2Matches = [...text.matchAll(/^##\s+(.+)$/gm)].map(m => m[1].trim());
  const h3Matches = [...text.matchAll(/^###\s+(.+)$/gm)].map(m => m[1].trim());

  // Keyword Density Analysis
  const keywordsAnalysis: KeywordAnalysis[] = targetKeywords.map((kw, idx) => {
    const kwLower = kw.toLowerCase();
    // Escape for regex
    const escaped = kwLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'gi');
    const matches = text.match(regex) || [];
    const count = matches.length;
    const density = wordCount > 0 ? parseFloat(((count * kw.split(' ').length / wordCount) * 100).toFixed(2)) : 0;

    const inH1 = h1Text.toLowerCase().includes(kwLower);
    const inH2 = h2Matches.some(h => h.toLowerCase().includes(kwLower));
    const inFirst100 = first100Words.includes(kwLower);
    const inFaq = text.toLowerCase().includes('faq') && text.toLowerCase().slice(text.toLowerCase().indexOf('faq')).includes(kwLower);

    let status: 'optimal' | 'low' | 'high' = 'optimal';
    if (idx === 0) {
      if (count === 0) status = 'low';
      else if (density < 0.4) status = 'low';
      else if (density > 2.8) status = 'high';
    } else {
      if (count === 0) status = 'low';
      else if (density > 2.0) status = 'high';
    }

    return {
      keyword: kw,
      count,
      density,
      inH1,
      inH2,
      inFirst100Words: inFirst100,
      inFaq: inFaq,
      status
    };
  });

  // Schema Validation on seoNotesText
  let hasServiceSchema = false;
  let hasFaqSchema = false;
  let hasBreadcrumbSchema = false;
  let hasValidJson = true;

  if (seoNotesText) {
    hasServiceSchema = seoNotesText.includes('"@type": "Service"') || seoNotesText.includes('"@type":"Service"');
    hasFaqSchema = seoNotesText.includes('"@type": "FAQPage"') || seoNotesText.includes('"@type":"FAQPage"');
    hasBreadcrumbSchema = seoNotesText.includes('"@type": "BreadcrumbList"') || seoNotesText.includes('"@type":"BreadcrumbList"');

    // Test parse json blocks
    const jsonBlocks = [...seoNotesText.matchAll(/```(?:json)?\s*([\s\S]*?)\s*```/g)];
    for (const block of jsonBlocks) {
      try {
        JSON.parse(block[1]);
      } catch {
        hasValidJson = false;
      }
    }
  }

  // Individual Checks Evaluation
  const checks: SeoCheckItem[] = [];

  // --- 1. Traditional Technical Checks ---
  // H1 Check
  const hasH1 = !!h1Matches;
  const primaryKw = targetKeywords[0]?.toLowerCase() || pillar.p.toLowerCase();
  const primaryKwWords = primaryKw.split(' ').filter(w => w.length > 3);
  const h1HasKeyword = primaryKwWords.some(w => h1Text.toLowerCase().includes(w)) || h1Text.toLowerCase().includes(pillar.p.toLowerCase());

  checks.push({
    name: 'Single Optimized H1 Tag',
    category: 'technical',
    status: hasH1 && h1HasKeyword ? 'pass' : (hasH1 ? 'warning' : 'fail'),
    score: hasH1 && h1HasKeyword ? 10 : (hasH1 ? 6 : 0),
    maxScore: 10,
    detail: hasH1
      ? `Found H1: "${h1Text.slice(0, 60)}${h1Text.length > 60 ? '...' : ''}" with target keyword presence.`
      : 'No markdown H1 (# Heading) found in the page copy.',
    recommendation: !hasH1 || !h1HasKeyword ? `Ensure the H1 clearly includes "${pillar.p}" and targets ${audience}.` : undefined
  });

  // Heading Structure (H2 & H3 count)
  const totalH2 = h2Matches.length;
  checks.push({
    name: 'Hierarchical Heading Architecture (H2/H3)',
    category: 'technical',
    status: totalH2 >= 5 ? 'pass' : (totalH2 >= 3 ? 'warning' : 'fail'),
    score: totalH2 >= 5 ? 10 : (totalH2 >= 3 ? 6 : 2),
    maxScore: 10,
    detail: `Found ${totalH2} H2 subheadings and ${h3Matches.length} H3 sections establishing content hierarchy.`,
    recommendation: totalH2 < 5 ? 'Expand sub-sections into clear H2 milestones (Why Embee, Solution Architecture, Proof, FAQs).' : undefined
  });

  // Word Count Depth
  const targetMin = 1400;
  const targetMax = 2500;
  const isWordCountOptimal = wordCount >= targetMin && wordCount <= targetMax;
  const isWordCountAcceptable = wordCount >= 1000;
  checks.push({
    name: 'Enterprise Content Depth & Comprehensiveness',
    category: 'content',
    status: isWordCountOptimal ? 'pass' : (isWordCountAcceptable ? 'warning' : 'fail'),
    score: isWordCountOptimal ? 15 : (isWordCountAcceptable ? 10 : 4),
    maxScore: 15,
    detail: `${wordCount} words (Target: ${targetMin} - ${targetMax} words for definitive B2B enterprise ranking).`,
    recommendation: wordCount < targetMin ? `Expand the solution details and architectural comparisons by ~${targetMin - wordCount} words to outperform competitors.` : undefined
  });

  // Primary Keyword Placement in First 100 Words
  const primaryKwAnalysis = keywordsAnalysis[0];
  const inFirst100 = primaryKwAnalysis ? primaryKwAnalysis.inFirst100Words : false;
  checks.push({
    name: 'Above-the-Fold Keyword Prominence',
    category: 'content',
    status: inFirst100 ? 'pass' : 'warning',
    score: inFirst100 ? 10 : 4,
    maxScore: 10,
    detail: inFirst100
      ? 'Primary keyword or semantic variation appears directly in the opening 150 words.'
      : 'Primary keyword is delayed or absent in the introductory hero paragraph.',
    recommendation: !inFirst100 ? `Mention "${targetKeywords[0] || pillar.p}" in the first 2 sentences for immediate search engine topical lock.` : undefined
  });

  // Schemas Check
  const allSchemasPresent = hasServiceSchema && hasFaqSchema && hasBreadcrumbSchema;
  checks.push({
    name: 'Structured Data Schemas (JSON-LD)',
    category: 'schema',
    status: allSchemasPresent && hasValidJson ? 'pass' : (hasServiceSchema || hasFaqSchema ? 'warning' : 'fail'),
    score: allSchemasPresent && hasValidJson ? 15 : (hasServiceSchema ? 8 : 0),
    maxScore: 15,
    detail: `Schemas: Service (${hasServiceSchema ? '✓' : '✗'}), FAQPage (${hasFaqSchema ? '✓' : '✗'}), BreadcrumbList (${hasBreadcrumbSchema ? '✓' : '✗'}). Syntax: ${hasValidJson ? 'Valid JSON' : 'Syntax Error'}.`,
    recommendation: !allSchemasPresent ? 'Ensure all three schemas (Service, FAQPage, BreadcrumbList) are generated with valid JSON.' : undefined
  });

  // Breadcrumb Hierarchy
  const hasBreadcrumbText = /Home\s*>\s*What we do/i.test(text);
  checks.push({
    name: 'Breadcrumb Navigation & Taxonomical Path',
    category: 'technical',
    status: hasBreadcrumbText ? 'pass' : 'warning',
    score: hasBreadcrumbText ? 5 : 2,
    maxScore: 5,
    detail: hasBreadcrumbText
      ? 'Breadcrumb hierarchy: Home > What we do > [Group] > [Pillar] is explicitly declared.'
      : 'Visual breadcrumb trail is missing at the top of the copy.',
    recommendation: !hasBreadcrumbText ? 'Add "Home > What we do > Solution Group > Pillar Name" above the hero eyebrow.' : undefined
  });

  // --- 2. AI SEO / Generative Engine Optimization (GEO) Checks ---

  // Direct Answerability (AI Search Snippet Extraction)
  const hasDirectAnswer = /^(?:#.*\n+)?(?:[^\n]+\n+){1,4}/m.test(text) && 
    (text.toLowerCase().includes('provides') || text.toLowerCase().includes('delivers') || text.toLowerCase().includes('architects') || text.toLowerCase().includes('enables'));
  checks.push({
    name: 'AI Engine Direct Answerability (First 100 Words)',
    category: 'ai_geo',
    status: hasDirectAnswer ? 'pass' : 'warning',
    score: hasDirectAnswer ? 10 : 5,
    maxScore: 10,
    detail: 'Clear, authoritative definition of the solution in the opening block suitable for Google AI Overviews and Perplexity extraction.',
    recommendation: !hasDirectAnswer ? 'Craft the first paragraph as a crisp 2-sentence direct answer defining the exact scope and outcome.' : undefined
  });

  // Sovereign Indian Data Residency & Compliance Entities
  const lowerText = text.toLowerCase();
  const hasDpdp = lowerText.includes('dpdp') || lowerText.includes('digital personal data protection');
  const hasRegions = lowerText.includes('central india') || lowerText.includes('south india') || lowerText.includes('west india') || lowerText.includes('pune') || lowerText.includes('chennai') || lowerText.includes('mumbai');
  const hasRegulators = lowerText.includes('cert-in') || lowerText.includes('rbi') || lowerText.includes('sebi') || lowerText.includes('meity');
  const entityCount = (hasDpdp ? 1 : 0) + (hasRegions ? 1 : 0) + (hasRegulators ? 1 : 0);

  checks.push({
    name: 'Indian Sovereign Entities (DPDP Act, Azure Regions, Regulators)',
    category: 'entities',
    status: entityCount >= 2 ? 'pass' : (entityCount === 1 ? 'warning' : 'fail'),
    score: entityCount >= 2 ? 10 : (entityCount === 1 ? 5 : 0),
    maxScore: 10,
    detail: `Entities detected: DPDP Act 2023 (${hasDpdp ? '✓' : '✗'}), Sovereign Azure Regions (${hasRegions ? '✓' : '✗'}), Regulatory Bodies (${hasRegulators ? '✓' : '✗'}).`,
    recommendation: entityCount < 2 ? 'Incorporate specific Indian data residency (Central/South India Azure regions) and DPDP Act 2023 compliance hooks.' : undefined
  });

  // Brand Authority & Operational Metric Citations
  const hasBrandFull = (text.match(/Embee Software/g) || []).length;
  const hasEngineers = lowerText.includes('500+') || lowerText.includes('certified engineer');
  const hasYears = lowerText.includes('35+') || lowerText.includes('35 years');
  const hasSpecializations = lowerText.includes('specialization') || lowerText.includes('frontier partner') || lowerText.includes('solutions partner');
  const authoritySignals = (hasBrandFull >= 4 ? 1 : 0) + (hasEngineers ? 1 : 0) + (hasYears ? 1 : 0) + (hasSpecializations ? 1 : 0);

  checks.push({
    name: 'E-E-A-T Brand Authority & Proof Anchors',
    category: 'ai_geo',
    status: authoritySignals >= 3 ? 'pass' : (authoritySignals >= 2 ? 'warning' : 'fail'),
    score: authoritySignals >= 3 ? 10 : (authoritySignals >= 2 ? 6 : 2),
    maxScore: 10,
    detail: `Embee Software written in full ${hasBrandFull}x; Proof anchors: 500+ engineers (${hasEngineers ? '✓' : '✗'}), 35+ years (${hasYears ? '✓' : '✗'}), Microsoft Partner tier (${hasSpecializations ? '✓' : '✗'}).`,
    recommendation: authoritySignals < 3 ? 'Ensure verifiable proof points (35+ years, 500+ engineers, Microsoft Frontier Partner) are explicitly cited.' : undefined
  });

  // Structured Q&A Accordion Format
  const hasFaqQuestions = (text.match(/^###?\s+(?:What|How|Why|Can|Is|Where|Which|Who|Does).*\?/gim) || []).length;
  checks.push({
    name: 'Conversational Q&A Format for LLM Citations',
    category: 'ai_geo',
    status: hasFaqQuestions >= 4 ? 'pass' : (hasFaqQuestions >= 2 ? 'warning' : 'fail'),
    score: hasFaqQuestions >= 4 ? 5 : (hasFaqQuestions >= 2 ? 3 : 0),
    maxScore: 5,
    detail: `Found ${hasFaqQuestions} conversational question-and-answer pairs formatted for direct citation extraction.`,
    recommendation: hasFaqQuestions < 4 ? 'Include at least 5 clear FAQ questions addressing delivery timeline, Indian compliance, and TCO.' : undefined
  });

  // Fluff & Generic AI Cliche Avoidance
  const aiCliches = [
    /in today's (?:fast-paced|rapidly changing|digital) (?:world|landscape|age)/gi,
    /cutting-edge technology/gi,
    /supercharge your/gi,
    /unleash the power/gi,
    /seamlessly integrate/gi,
    /dive into/gi,
    /game-changer/gi
  ];
  let clicheCount = 0;
  aiCliches.forEach(regex => {
    const m = text.match(regex);
    if (m) clicheCount += m.length;
  });

  checks.push({
    name: 'Anti-Fluff & High Information Density',
    category: 'content',
    status: clicheCount === 0 ? 'pass' : (clicheCount <= 2 ? 'warning' : 'fail'),
    score: clicheCount === 0 ? 5 : (clicheCount <= 2 ? 3 : 0),
    maxScore: 5,
    detail: clicheCount === 0
      ? 'Clean, substantive B2B prose without generic AI buzzwords or filler phrases.'
      : `Detected ${clicheCount} generic filler phrases that dilute authority.`,
    recommendation: clicheCount > 0 ? 'Replace generic marketing phrases with concrete business and architectural outcomes.' : undefined
  });

  // Calculate Scores
  // Traditional technical + content: H1(10), H2(10), Depth(15), Prominence(10), Schema(15), Breadcrumb(5) = 65 total
  const traditionalPoints = checks
    .filter(c => ['technical', 'content', 'schema'].includes(c.category))
    .reduce((acc, c) => acc + c.score, 0);
  const traditionalMax = checks
    .filter(c => ['technical', 'content', 'schema'].includes(c.category))
    .reduce((acc, c) => acc + c.maxScore, 0);
  const traditionalScore = Math.round((traditionalPoints / Math.max(1, traditionalMax)) * 100);

  // AI SEO / GEO points: DirectAnswer(10), IndianEntities(10), BrandAuthority(10), Q&A(5), AntiFluff(5) = 40 total
  const aiGeoPoints = checks
    .filter(c => ['ai_geo', 'entities'].includes(c.category))
    .reduce((acc, c) => acc + c.score, 0);
  const aiGeoMax = checks
    .filter(c => ['ai_geo', 'entities'].includes(c.category))
    .reduce((acc, c) => acc + c.maxScore, 0);
  const aiSeoScore = Math.round((aiGeoPoints / Math.max(1, aiGeoMax)) * 100);

  // Overall combined score (50% traditional, 50% AI SEO)
  const overallScore = Math.round((traditionalScore + aiSeoScore) / 2);

  // Determine Grade
  let grade: 'A+' | 'A' | 'B' | 'C' | 'D' = 'D';
  if (overallScore >= 92) grade = 'A+';
  else if (overallScore >= 84) grade = 'A';
  else if (overallScore >= 74) grade = 'B';
  else if (overallScore >= 60) grade = 'C';

  // Gather actionable recommendations
  const topRecommendations = checks
    .filter(c => c.status !== 'pass' && c.recommendation)
    .map(c => c.recommendation as string);

  return {
    traditionalScore,
    aiSeoScore,
    overallScore,
    grade,
    wordCount,
    targetWordCountMin: targetMin,
    targetWordCountMax: targetMax,
    readingTimeMinutes,
    readingEaseScore,
    keywords: keywordsAnalysis,
    schemaValidation: {
      hasServiceSchema,
      hasFaqSchema,
      hasBreadcrumbSchema,
      hasValidJson
    },
    checks,
    topRecommendations: topRecommendations.slice(0, 5)
  };
}
