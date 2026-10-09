import { AuditReport, RuleViolation } from '../types';

export function auditLandingPageCopy(text: string): AuditReport {
  if (!text || text.trim().length === 0) {
    return {
      passed: false,
      score: 0,
      wordCount: 0,
      h1Count: 0,
      violations: [{
        rule: 'Empty Copy',
        severity: 'error',
        description: 'No content has been generated yet.',
        count: 1
      }],
      sectionChecklist: [],
      stats: {
        hasNoEmDash: true,
        hasNoEnDash: true,
        hasProperBrandName: true,
        hasValidMicrosoftPartner: true,
        hasNoPricing: true,
        hasIndianSpelling: true
      }
    };
  }

  const violations: RuleViolation[] = [];
  const words = text.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // 1. Dash checks: Em Dash (— \u2014) and En Dash (– \u2013)
  const emDashMatches = text.match(/[\u2014—]/g);
  if (emDashMatches && emDashMatches.length > 0) {
    violations.push({
      rule: 'No Em Dash Allowed',
      severity: 'error',
      description: `Found ${emDashMatches.length} em dash characters (—). Replace with a colon, comma, or restructure the sentence.`,
      count: emDashMatches.length
    });
  }

  const enDashMatches = text.match(/[\u2013–]/g);
  if (enDashMatches && enDashMatches.length > 0) {
    violations.push({
      rule: 'No En Dash Allowed',
      severity: 'error',
      description: `Found ${enDashMatches.length} en dash characters (–). Replace with a colon, comma, or restructure the sentence.`,
      count: enDashMatches.length
    });
  }

  // 2. Brand Name: Always "Embee Software", never standalone "Embee"
  const standaloneEmbeeRegex = /\bEmbee\b(?!\s+Software)/gi;
  const standaloneEmbee = text.match(standaloneEmbeeRegex);
  if (standaloneEmbee && standaloneEmbee.length > 0) {
    violations.push({
      rule: 'Brand Name: Always "Embee Software"',
      severity: 'error',
      description: `Found ${standaloneEmbee.length} instance(s) of standalone "Embee". Always write "Embee Software" in full.`,
      count: standaloneEmbee.length,
      matches: standaloneEmbee.slice(0, 5)
    });
  }

  // 3. Microsoft Partner Relationship check
  if (/Microsoft\s+Gold\s+Partner/i.test(text)) {
    violations.push({
      rule: 'Forbidden Microsoft Title',
      severity: 'error',
      description: 'Found "Microsoft Gold Partner". The approved relationship is "Microsoft Frontier Partner" and "Microsoft Solutions Partner".',
      count: 1
    });
  }

  // 4. Competitor Name Ban
  const competitors = [
    'HCL Technologies', 'Infosys', 'NTT Data', 'Wipro', 'TCS', 
    'Tech Mahindra', 'LTIMindtree', 'Softchoice', 'Silver Touch', 
    'Team Computers', 'IFI Techsolutions', 'Rishabh Software'
  ];
  for (const comp of competitors) {
    const compRegex = new RegExp(`\\b${comp}\\b`, 'i');
    if (compRegex.test(text)) {
      violations.push({
        rule: 'Competitor Mention Forbidden',
        severity: 'error',
        description: `Mentioned competitor "${comp}". Never name competitors or compare Embee Software to named companies.`,
        count: 1
      });
    }
  }

  // 5. Pricing / Cost figures / GST ban
  const priceMatches = text.match(/(?:₹|INR|USD|\$)\s*\d+|(?:rate\s*card|GST\s*rate|pricing\s*starts\s*at|₹\s*\d+,\d+)/gi);
  if (priceMatches && priceMatches.length > 0) {
    violations.push({
      rule: 'No Pricing Figures Allowed',
      severity: 'error',
      description: `Detected pricing or cost figures (${priceMatches.slice(0, 3).join(', ')}). Never mention price numbers, rate cards, or GST.`,
      count: priceMatches.length,
      matches: priceMatches.slice(0, 5)
    });
  }

  // 6. Founding year ban ("since 19xx" or similar)
  if (/since\s+19\d\d/i.test(text)) {
    violations.push({
      rule: 'No Founding Year Allowed',
      severity: 'error',
      description: 'Found founding year reference ("since 19xx"). Use "40+ years of experience" instead.',
      count: 1
    });
  }

  // 7. Indian English Spelling Check
  const usSpellings = [
    { us: /\boptimization\b/gi, in: 'optimisation' },
    { us: /\boptimizations\b/gi, in: 'optimisations' },
    { us: /\bprioritized\b/gi, in: 'prioritised' },
    { us: /\borganization\b/gi, in: 'organisation' },
    { us: /\borganizations\b/gi, in: 'organisations' },
    { us: /\bcenter\b/gi, in: 'centre (or data centre)' }
  ];
  for (const item of usSpellings) {
    const found = text.match(item.us);
    if (found && found.length > 0) {
      violations.push({
        rule: 'Indian English Spelling Required',
        severity: 'warning',
        description: `Found "${found[0]}". Prefer Indian English spelling "${item.in}".`,
        count: found.length
      });
    }
  }

  // 8. H1 Check (matches "# Title" or "H1. Title")
  const h1Matches = text.match(/^(?:#\s+|H1\.\s+).+$/gm) || [];
  const h1Count = h1Matches.length;
  if (h1Count === 0) {
    violations.push({
      rule: 'H1 Required',
      severity: 'error',
      description: 'No H1 heading (# Heading or H1. Heading) found on the page.',
      count: 1
    });
  } else if (h1Count > 1) {
    violations.push({
      rule: 'Exactly ONE H1 Allowed',
      severity: 'error',
      description: `Found ${h1Count} H1 headings. Exactly one H1 is allowed.`,
      count: h1Count
    });
  }

  // 9. Word Count Check (Target: 1,000 to 1,350 words matching reference structure)
  if (wordCount < 900) {
    violations.push({
      rule: 'Word Count Below Range',
      severity: 'warning',
      description: `Word count is ${wordCount} words. Target length is 1,000 to 1,350 words matching the approved page structure.`,
      count: 1
    });
  } else if (wordCount > 1600) {
    violations.push({
      rule: 'Word Count Above Range',
      severity: 'warning',
      description: `Word count is ${wordCount} words (exceeds recommended 1,350 words ceiling). Keep copy crisp and scannable.`,
      count: 1
    });
  }

  // 10. Required Core Section Structure Checklist (Assessments removed for now)
  const requiredSections = [
    { name: '1. Business Challenges', pattern: /1\.\s*H2:|business\s*challenges|obstacles/i },
    { name: '2. Measurable Outcomes', pattern: /2\.\s*H2:|measurable\s*outcomes|outcomes\s*we\s*deliver/i },
    { name: '3. Scope of Engagement', pattern: /3\.\s*H2:|engagement\s*cover|what\s*does\s*the/i },
    { name: '4. Delivery Framework & Phases', pattern: /4\.\s*H2:|how\s*does\s*embee.*deliver|delivery\s*phases|\[Phase\s*1/i },
    { name: '5. Deliverables (Documents & Built Assets)', pattern: /5\.\s*H2:|deliverables.*receive|strategic\s*and\s*governance/i },
    { name: '6. Partner Evaluation Table', pattern: /6\.\s*H2:|choose\s*the\s*right.*partner|evaluation/i },
    { name: '7. Frequently Asked Questions', pattern: /(?:7|8)\.\s*H2:|frequently\s*asked\s*questions|faq/i },
    { name: '8. Related Solutions in Portfolio', pattern: /(?:8|9)\.\s*H2:|related\s*solutions/i },
    { name: '9. Closing Section & Proof', pattern: /(?:9|10)\.\s*H2:|secure\s*your.*today|customer\s*logos/i }
  ];

  const sectionChecklist = requiredSections.map(s => ({
    name: s.name,
    found: s.pattern.test(text)
  }));

  const missingSections = sectionChecklist.filter(s => !s.found);
  if (missingSections.length > 0) {
    violations.push({
      rule: 'Core Section Page Structure',
      severity: missingSections.length > 3 ? 'error' : 'warning',
      description: `Missing or unrecognized sections: ${missingSections.map(s => s.name).join(', ')}.`,
      count: missingSections.length
    });
  }

  // Scoring calculation
  let score = 100;
  for (const v of violations) {
    if (v.severity === 'error') {
      score -= Math.min(25, v.count * 10);
    } else {
      score -= Math.min(10, v.count * 3);
    }
  }
  score = Math.max(0, Math.min(100, score));

  return {
    passed: violations.filter(v => v.severity === 'error').length === 0,
    score,
    wordCount,
    h1Count,
    h1Text: h1Matches[0]?.replace(/^(?:#\s+|H1\.\s+)/, ''),
    violations,
    sectionChecklist,
    stats: {
      hasNoEmDash: !emDashMatches,
      hasNoEnDash: !enDashMatches,
      hasProperBrandName: !standaloneEmbee,
      hasValidMicrosoftPartner: !/Microsoft\s+Gold\s+Partner/i.test(text),
      hasNoPricing: !priceMatches,
      hasIndianSpelling: !usSpellings.some(item => item.us.test(text))
    }
  };
}

export function autoFixBrandIssues(text: string): string {
  let cleaned = text;

  // Replace em dash and en dash with colons or commas
  cleaned = cleaned.replace(/[\u2014—]/g, ': ');
  cleaned = cleaned.replace(/[\u2013–]/g, ', ');

  // Fix standalone "Embee" -> "Embee Software" (except if already followed by Software)
  cleaned = cleaned.replace(/\bEmbee\b(?!\s+Software)/g, 'Embee Software');

  // Fix Microsoft Gold Partner
  cleaned = cleaned.replace(/Microsoft\s+Gold\s+Partner/gi, 'Microsoft Solutions Partner');

  // Fix US spellings to Indian English
  cleaned = cleaned.replace(/\boptimization\b/gi, 'optimisation');
  cleaned = cleaned.replace(/\boptimizations\b/gi, 'optimisations');
  cleaned = cleaned.replace(/\bprioritized\b/gi, 'prioritised');
  cleaned = cleaned.replace(/\borganization\b/gi, 'organisation');
  cleaned = cleaned.replace(/\borganizations\b/gi, 'organisations');
  cleaned = cleaned.replace(/\bcenter\b/gi, 'centre');

  // Fix since 19xx -> 40+ years of experience
  cleaned = cleaned.replace(/since\s+19\d\d/gi, 'with 40+ years of experience');

  return cleaned;
}
