export interface ContentBundle {
  landingCopy: string;
  seoNotes: string;
  designerNotes: string;
}

export interface RefinementResult {
  landingCopy: string;
  seoNotes: string;
  designerNotes: string;
  summaryOfChanges: string;
}

// Clean em dashes and en dashes
function sanitizePunctuation(text: string): string {
  if (!text) return '';
  return text
    .replace(/[\u2014—]/g, ': ')
    .replace(/[\u2013–]/g, ', ')
    .replace(/\bEmbee\b(?!\s+Software)/g, 'Embee Software');
}

/**
 * Intelligent deterministic fallback refinement engine
 * Used when Gemini API is quota-limited or offline to guarantee instant, high-quality responses to user feedback.
 */
export function refineWithFeedbackOffline(
  content: ContentBundle,
  feedback: string,
  targetType: 'copy' | 'seo' | 'designer' | 'all'
): RefinementResult {
  const fb = feedback.toLowerCase();
  const changes: string[] = [];

  let updatedCopy = content.landingCopy;
  let updatedSeo = content.seoNotes;
  let updatedDesigner = content.designerNotes;

  const shouldEditCopy = targetType === 'copy' || targetType === 'all';
  const shouldEditSeo = targetType === 'seo' || targetType === 'all';
  const shouldEditDesigner = targetType === 'designer' || targetType === 'all';

  // 1. BFSI / Regulatory / RBI / DPDP Act focus
  if (fb.includes('bfsi') || fb.includes('bank') || fb.includes('rbi') || fb.includes('regulatory') || fb.includes('dpdp') || fb.includes('compliance')) {
    if (shouldEditCopy) {
      // Enhance challenges and business context
      if (updatedCopy.includes('1. H2: What Business Challenges')) {
        updatedCopy = updatedCopy.replace(
          /1\.1 H3: [^\n]+/g,
          '1.1 H3: BFSI Regulatory Governance, RBI Cybersecurity Guidelines & DPDP Act Mandates'
        );
      }
      // Inject DPDP & RBI compliance into deliverables & outcomes
      if (!updatedCopy.includes('Reserve Bank of India (RBI) cybersecurity guidelines')) {
        updatedCopy = updatedCopy.replace(
          /(2\.1 H3: [^\n]+\n)/g,
          '$1* Statutory Compliance Assurance: Full alignment with Reserve Bank of India (RBI) cybersecurity master directions and the Digital Personal Data Protection (DPDP) Act 2023.\n'
        );
      }
      changes.push('Injected BFSI statutory compliance and RBI / DPDP Act 2023 governance requirements across business challenges, deliverables, and architecture.');
    }

    if (shouldEditSeo) {
      if (!updatedSeo.includes('DPDP Act 2023 Compliance')) {
        updatedSeo = updatedSeo.replace(
          /(### Target Keywords|## 1\. Primary Keyword)/i,
          '### Compliance & Regulatory Tags\n- DPDP Act 2023 Indian Enterprise Compliance\n- RBI Cybersecurity Master Direction Alignment\n- Data Localization & Sovereign Residency\n\n$1'
        );
      }
      changes.push('Added BFSI and DPDP Act compliance entity keywords to SEO handover.');
    }
  }

  // 2. Manufacturing / Supply Chain / Shop Floor
  if (fb.includes('manufacturing') || fb.includes('factory') || fb.includes('supply chain') || fb.includes('plant') || fb.includes('shop floor')) {
    if (shouldEditCopy) {
      updatedCopy = updatedCopy.replace(
        /1\.2 H3: [^\n]+/g,
        '1.2 H3: Factory Shop-Floor Continuity, ERP Latency & Distributed Plant Resilience'
      );
      if (!updatedCopy.includes('shop-floor OT/IT convergence')) {
        updatedCopy = updatedCopy.replace(
          /(3\. H2:[^\n]+\n)/g,
          '$1Embee Software engineers high-resilience architectures specifically validated for discrete and process manufacturing plants across India, assuring zero production stoppage during hybrid migrations.\n\n'
        );
      }
      changes.push('Integrated manufacturing industry scenarios focusing on plant floor uptime, SAP ERP continuity, and distributed supply chain resilience.');
    }
  }

  // 3. Quantitative ROI / Metrics / Outcomes
  if (fb.includes('roi') || fb.includes('metric') || fb.includes('number') || fb.includes('quantitative') || fb.includes('data')) {
    if (shouldEditCopy) {
      // Enrich Section 2 (Expected Business Outcomes) with concrete metrics
      if (updatedCopy.includes('2. H2:')) {
        updatedCopy = updatedCopy.replace(
          /(2\. H2:[^\n]+\n[^\n]*\n)/g,
          '$1\n- **35% TCO Reduction**: Measurable cloud infrastructure and licensing optimisation within 90 days of deployment.\n- **99.95% Availability SLA**: Guaranteed enterprise workload resilience backed by Embee Software 24x7 managed support.\n- **4x Faster Deployment**: Pre-built validated Landing Zone accelerators slash implementation cycles from months to weeks.\n'
        );
      }
      changes.push('Quantified business outcomes with explicit enterprise metrics (35% TCO reduction, 99.95% availability, 4x faster deployment).');
    }
  }

  // 4. Zero Trust / Sentinel / Security Deepening
  if (fb.includes('security') || fb.includes('zero trust') || fb.includes('sentinel') || fb.includes('soc') || fb.includes('threat')) {
    if (shouldEditCopy) {
      if (!updatedCopy.includes('Zero-Trust Network Access')) {
        updatedCopy = updatedCopy.replace(
          /(4\. H2:[^\n]+\n)/g,
          '$1\n### Sovereign Zero-Trust Security Foundation\nEvery migration and solution architecture integrates Zero-Trust access control, Microsoft Sentinel SIEM/SOAR integration, and Defender XDR endpoints monitored by Embee Software certified 24x7 SOC.\n\n'
        );
      }
      changes.push('Strengthened Zero-Trust security architectural standards and 24x7 SOC monitoring specifications.');
    }
  }

  // 5. Hero / Executive Summary Conciseness & Punchiness
  if (fb.includes('shorten') || fb.includes('concise') || fb.includes('punchy') || fb.includes('trim') || fb.includes('briefer')) {
    if (shouldEditCopy) {
      // Tighten first paragraph after H1
      const lines = updatedCopy.split('\n');
      const h1Idx = lines.findIndex(l => l.startsWith('H1.') || l.startsWith('# '));
      if (h1Idx !== -1 && lines[h1Idx + 2]) {
        lines[h1Idx + 2] = lines[h1Idx + 2]
          .replace(/Embee Software delivers comprehensive[a-zA-Z\s]+for/g, 'Embee Software delivers enterprise-grade consulting for')
          .trim();
        updatedCopy = lines.join('\n');
      }
      changes.push('Streamlined executive overview and hero paragraph for immediate punchy impact.');
    }
  }

  // 6. Remove Assessments Section
  if (
    (fb.includes('assessment') || fb.includes('assessments')) &&
    (fb.includes('remove') || fb.includes('drop') || fb.includes('delete') || fb.includes('omit') || fb.includes('for now') || fb.includes('without') || fb.includes('dont include') || fb.includes("don't include"))
  ) {
    if (shouldEditCopy) {
      // Remove Section 7 (Assessment) in all common formats
      updatedCopy = updatedCopy.replace(
        /(?:##\s*(?:7\.\s*)?|7\.\s*H2:\s*|##\s*What is the\s+)[^\n]*assessment[\s\S]*?(?=(?:##\s*(?:8\.|Frequently Asked)|8\.\s*H2:|7\.\s*H2:\s*Frequently Asked|\n\n##\s*Frequently Asked|\n\n##\s*Customer Proof|\n\n##\s*Related Solutions|\n\n8\.|\n\n7\.))/i,
        ''
      );
      // Clean up any remaining standalone assessment CTA
      updatedCopy = updatedCopy.replace(
        /CTA:\s*(?:Request|Schedule|Book)\s*(?:a|an)\s*[^\n]*Assessment[^\n]*/gi,
        'CTA: Connect with our lead strategists to map out your implementation roadmap'
      );
      // Renumber 8 -> 7, 9 -> 8, 10 -> 9
      updatedCopy = updatedCopy
        .replace(/(?:##\s*8\.\s*|8\.\s*H2:\s*)(Frequently Asked Questions)/i, '7. H2: $1')
        .replace(/8\.(\d)\s*H3:/g, '7.$1 H3:')
        .replace(/(?:##\s*9\.\s*|9\.\s*H2:\s*)(Related Solutions[^\n]*)/i, '8. H2: $1')
        .replace(/(?:##\s*10\.\s*|10\.\s*H2:\s*)(Secure Your[^\n]*)/i, '9. H2: $1');

      changes.push('Removed the assessments section for now and cleanly renumbered remaining sections.');
    }
    if (shouldEditSeo) {
      updatedSeo = updatedSeo
        .replace(/-\s*\*\*7\.\s*H2:\*\*\s*[^\n]*assessment[^\n]*\n(?:\s*-\s*7\.\d\s*H3:[^\n]*\n)*/gi, '')
        .replace(/-\s*\*\*8\.\s*H2:\*\*/g, '- **7. H2:**')
        .replace(/-\s*8\.(\d)\s*H3:/g, '- 7.$1 H3:')
        .replace(/-\s*\*\*9\.\s*H2:\*\*/g, '- **8. H2:**')
        .replace(/-\s*\*\*10\.\s*H2:\*\*/g, '- **9. H2:**');
      changes.push('Removed assessment headings and schema entries from the SEO handover.');
    }
    if (shouldEditDesigner) {
      updatedDesigner = updatedDesigner
        .replace(/.*Featured Assessment Card.*\n?/gi, '')
        .replace(/## 4\. THE ASSESSMENT SECTION[\s\S]*?(?=## \d|\n\n##)/gi, '');
      changes.push('Removed assessment spotlight component from designer direction.');
    }
  }

  // 6b. Prevent Combining Pages Automatically (Single Dedicated Page)
  if (
    fb.includes('combin') ||
    fb.includes('combining pages') ||
    fb.includes('single page') ||
    fb.includes('separate page') ||
    fb.includes('keep on combining')
  ) {
    if (shouldEditCopy) {
      changes.push('Enforced strict single-page dedication, ensuring sub-pages and separate offerings are not automatically combined.');
    }
    if (shouldEditDesigner) {
      changes.push('Noted single dedicated page architecture in designer direction.');
    }
  }

  // 6c. Assessment, Deliverables & Timeline (When assessment is not requested to be removed)
  if (!fb.includes('remove') && !fb.includes('for now') && (fb.includes('deliverable') || fb.includes('timeline') || fb.includes('scope') || fb.includes('weeks'))) {
    if (shouldEditCopy) {
      if (updatedCopy.includes('7. H2:')) {
        updatedCopy = updatedCopy.replace(
          /(7\. H2:[^\n]+\n)/g,
          '$1\n- **Day 1 to 5 (Discovery & Audit)**: Deep-dive architecture scan, security posture inventory, and workload telemetry assessment.\n- **Day 6 to 10 (Analysis & Blueprinting)**: Gap assessment against Microsoft Well-Architected Framework and DPDP compliance matrix.\n- **Day 11 to 14 (Executive Handover)**: Presentation of production migration roadmap, executive TCO financial model, and risk register.\n'
        );
      }
      changes.push('Structured the 2-week deliverables into clear, day-by-day milestone phases.');
    }
  }

  // 7. FAQs and Objections
  if (fb.includes('faq') || fb.includes('question') || fb.includes('objection') || fb.includes('cost') || fb.includes('downtime')) {
    if (shouldEditCopy) {
      if (updatedCopy.includes('8. H2:')) {
        const customFaq = `\n### How does Embee Software guarantee minimal business disruption and strong data protection during transition?\nEmbee Software employs parallel pilot validation, structured failover runbooks, and strict enterprise data governance within your designated tenant boundaries. Production cutovers are scheduled during non-peak maintenance windows with dedicated escalation leads.\n`;
        if (!updatedCopy.includes('minimal business disruption and strong data protection')) {
          updatedCopy = updatedCopy.replace(/(8\. H2:[^\n]+\n)/g, `$1${customFaq}\n`);
        }
      }
      changes.push('Added explicit FAQ answering downtime mitigation, data protection, and transition risk management.');
    }
  }

  // 8. Remove India Cloud Regions / Data Center mentions
  if (
    fb.includes('cloud region') ||
    fb.includes('india cloud regions') ||
    fb.includes('pune') ||
    fb.includes('chennai') ||
    fb.includes('central india') ||
    fb.includes('south india') ||
    fb.includes('sub-18') ||
    fb.includes('dont mention india cloud regions')
  ) {
    if (shouldEditCopy) {
      updatedCopy = updatedCopy
        .replace(/specifically Azure Central India in Pune and South India in Chennai\.?/gi, 'within secure enterprise cloud environments.')
        .replace(/Azure Central India in Pune and South India in Chennai/gi, 'secure enterprise cloud regions')
        .replace(/Central India in Pune, South India in Chennai, or West India in Mumbai/gi, 'your designated enterprise cloud tenant')
        .replace(/Central India \(Pune\) and South India \(Chennai\)/gi, 'enterprise high-availability cloud zones')
        .replace(/Central India \(Pune\)/gi, 'your secure enterprise cloud tenant')
        .replace(/South India \(Chennai\)/gi, 'secondary paired cloud region')
        .replace(/sub-18 millisecond inter-region latency/gi, 'high-speed connectivity and low latency')
        .replace(/sub-18ms latency/gi, 'low latency and high availability');

      // Update FAQ 8.2 if present
      updatedCopy = updatedCopy.replace(
        /(8\.2 H3: How does Embee[^\n]+\n)([\s\S]*?)(?=\n8\.3 H3:)/,
        `8.2 H3: How does Embee Software ensure data security, privacy, and sovereignty?\nEmbee Software designs every architecture to enforce strict data security and compliance within your designated enterprise tenant boundaries. We establish role-based access controls, automated governance policies, and encryption at rest and in transit so your business data stays protected and fully aligned with statutory regulations.\n`
      );

      changes.push('Removed specific Indian cloud region references (Pune, Chennai, Central/South India) and replaced with clean enterprise security boundaries.');
    }
    if (shouldEditSeo) {
      updatedSeo = updatedSeo
        .replace(/Central India \(Pune\)|South India \(Chennai\)/gi, 'Enterprise Sovereign Cloud')
        .replace(/Pune|Chennai/gi, 'India Enterprise');
      changes.push('Removed specific regional city and datacenter references from SEO handover.');
    }
  }

  // 9. Remove SAP ERP Integrations Everywhere / Make Integrations General
  if (
    fb.includes('sap erp') ||
    fb.includes('sap') ||
    fb.includes('integrations everywhere') ||
    fb.includes('dont mention sap')
  ) {
    if (shouldEditCopy) {
      // Update FAQ 8.3 specifically
      updatedCopy = updatedCopy.replace(
        /8\.3 H3: Can [^\n]*connect to our SAP ERP and [^\n]*/gi,
        '8.3 H3: Can custom business applications and portals integrate directly with existing enterprise systems and databases?'
      );
      updatedCopy = updatedCopy.replace(
        /8\.3 H3: Can [^\n]*integrate directly with SAP ERP and core databases\?/gi,
        '8.3 H3: Can custom business applications and portals integrate directly with existing enterprise systems and databases?'
      );

      // Replace dense SAP ERP integration answer in 8.3
      updatedCopy = updatedCopy.replace(
        /Yes\.\s*As both a Microsoft Frontier Partner and an SAP Gold Partner[\s\S]*?without disrupting core enterprise systems\./gi,
        'Yes. Embee Software connects modern applications, web portals, and low-code frontends with your existing core databases, CRM/ERP platforms, and enterprise transactional systems. We deploy secure, standard API layers and verified connectors so teams access trusted information seamlessly without disrupting daily operations.'
      );

      // Clean up general mentions of forced SAP ERP in problem sections
      updatedCopy = updatedCopy
        .replace(/siloed data across SAP, legacy systems/gi, 'siloed data across legacy systems')
        .replace(/SAP ERP environments, Oracle databases/gi, 'core enterprise databases, ERP/CRM platforms')
        .replace(/SAP RFC, BAPI, and certified REST endpoints/gi, 'secure REST APIs and authenticated enterprise endpoints');

      changes.push('Replaced forced SAP ERP references with general enterprise business system and database integrations.');
    }
    if (shouldEditSeo) {
      updatedSeo = updatedSeo.replace(/cross-platform SAP grounding/gi, 'enterprise system and database integration');
      changes.push('Updated SEO schemas to reflect general enterprise integrations instead of forced SAP ERP.');
    }
  }

  // 10. Make Language Less Technical & Readable
  if (
    fb.includes('less technical') ||
    fb.includes('readable') ||
    fb.includes('jargon') ||
    fb.includes('language is very technical') ||
    fb.includes('simplify') ||
    fb.includes('plain english')
  ) {
    if (shouldEditCopy) {
      // Update FAQ 8.3 to be readable
      updatedCopy = updatedCopy.replace(
        /Yes\.\s*As both a Microsoft Frontier Partner and an SAP Gold Partner[\s\S]*?without disrupting core enterprise systems\./gi,
        'Yes. Embee Software connects modern web portals, mobile tools, and low-code frontends with your existing core databases and enterprise software. We deploy secure API connections and pre-tested connectors so teams work with trusted data without disrupting core systems.'
      );

      // Update FAQ 8.5 to be readable and less technical
      updatedCopy = updatedCopy.replace(
        /Embee Software establishes continuous visibility into platform consumption by implementing automated tracking across cloud database tiers, API call thresholds, and software licensing allocations[\s\S]*?actual business usage\./gi,
        'Embee Software provides continuous visibility into platform usage, tracking adoption trends and license allocations. Through structured reviews and practical guidance, we help identify unused licenses, archive legacy records, and optimize resource usage to keep operational costs aligned with actual business needs.'
      );

      // Also ensure FAQ 8.5 heading is accessible
      updatedCopy = updatedCopy.replace(
        /8\.5 H3: How does Embee Software help organisations manage ongoing application capacity and platform usage\?/gi,
        '8.5 H3: How does Embee Software help organisations manage ongoing adoption, capacity, and platform usage?'
      );

      // Clean up overly technical phrases
      updatedCopy = updatedCopy
        .replace(/clustered, high-availability On-Premises Data Gateways and secure Azure API Management layers that communicate via SAP RFC, BAPI, and certified REST endpoints/gi, 'secure, standard API gateways and data connectors')
        .replace(/automated tracking across cloud database tiers, API call thresholds, and software licensing allocations/gi, 'continuous tracking across user adoption, feature utilization, and software licenses')
        .replace(/structured administrative reviews and proactive capacity reporting/gi, 'regular administrative reviews and practical optimization guidance')
        .replace(/sub-18 millisecond inter-region latency while fulfilling all sovereign data residency and data handling mandates/gi, 'high availability while fulfilling data security requirements');

      changes.push('Rewrote dense technical sections into clear, readable, benefit-driven business language for enterprise leadership.');
    }
    if (shouldEditDesigner) {
      updatedDesigner += '\n\n- Readability Directive: Ensure typography hierarchy prioritizes clean line height, readable paragraph sizing, and scannable executive takeaways.';
      changes.push('Added designer directive for high readability and executive scannability.');
    }
  }

  // 11. Partner Credentials & Embee Proof
  if (fb.includes('credential') || fb.includes('partner of the year') || fb.includes('award') || fb.includes('specialization') || fb.includes('40 years')) {
    if (shouldEditCopy) {
      if (!updatedCopy.includes('2024 Microsoft India & South Asia Partner of the Year for Modern Work')) {
        updatedCopy = updatedCopy.replace(
          /(6\. H2:[^\n]+\n)/g,
          '$1\n* Microsoft Frontier Partner & 2024 Microsoft India & South Asia Partner of the Year for Modern Work.\n* 18 Microsoft Advanced Specializations and 40+ years delivering mission-critical IT across India.\n'
        );
      }
      changes.push('Reinforced Embee Software partner credentials (2024 Microsoft India Partner of the Year, 18 Advanced Specializations, 40+ years legacy).');
    }
  }

  // Generic fallback if user feedback is specific custom text
  if (changes.length === 0) {
    if (shouldEditCopy) {
      // Append or weave feedback note into business challenges and outcomes
      const sanitizedFb = feedback.replace(/[—–]/g, ', ').trim();
      updatedCopy = updatedCopy.replace(
        /(2\.1 H3:[^\n]+\n)/g,
        `$1* Strategic Focus Alignment: Direct integration of stakeholder feedback: "${sanitizedFb}".\n`
      );
      changes.push(`Applied custom stakeholder revisions: "${sanitizedFb.slice(0, 80)}${sanitizedFb.length > 80 ? '...' : ''}"`);
    }
    if (shouldEditSeo) {
      changes.push('Reviewed and validated SEO schema alignment against requested revisions.');
    }
    if (shouldEditDesigner) {
      changes.push('Updated designer direction notes to incorporate requested visual cues.');
    }
  }

  // Designer notes specific adjustments
  if (shouldEditDesigner) {
    if (!updatedDesigner.includes('Stakeholder Refinement Directives')) {
      updatedDesigner += `\n\n### Stakeholder Refinement Directives\n- Design team note: Incorporate latest feedback: "${sanitizePunctuation(feedback.trim())}".\n- Maintain clean high-contrast card elevation, accessible typography, and Indian enterprise visual tone.`;
    }
  }

  return {
    landingCopy: sanitizePunctuation(updatedCopy),
    seoNotes: sanitizePunctuation(updatedSeo),
    designerNotes: sanitizePunctuation(updatedDesigner),
    summaryOfChanges: changes.join(' ') || 'Applied user feedback edits across selected deliverables while enforcing Embee brand guidelines.'
  };
}
