import React, { useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PillarData } from '../types';
import { 
  Monitor, 
  Tablet, 
  Smartphone, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  Building2, 
  Award, 
  Lock, 
  AlertTriangle, 
  Layers, 
  Clock, 
  FileText, 
  HelpCircle,
  ExternalLink,
  BookOpen,
  Compass,
  Sparkles,
  GitPullRequest,
  MessageSquareQuote
} from 'lucide-react';

interface LiveMockupViewerProps {
  copy: string;
  pillar: PillarData;
  assessmentName: string;
  audience: string;
}

interface ParsedSection {
  id: string;
  title: string;
  content: string;
  type: 'challenges' | 'outcomes' | 'scope' | 'phases' | 'deliverables' | 'table' | 'assessment' | 'faq' | 'related' | 'closing' | 'generic';
}

export const LiveMockupViewer: React.FC<LiveMockupViewerProps> = ({
  copy,
  pillar,
  assessmentName
}) => {
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    size: '500-1000'
  });

  // Comprehensive parser that extracts ALL 10 sections from the landing page copy
  const parsedData = useMemo(() => {
    const rawCopy = copy || '';

    // Extract Hero H1 (handles "H1. Title" or "# Title")
    const h1Match = rawCopy.match(/^(?:#\s+|H1\.\s+)(.+)$/m);
    const heroHeading = h1Match 
      ? h1Match[1].replace(/[*_]/g, '').trim() 
      : `${pillar.p} Consulting India`;

    // Extract Hero Paragraph (first paragraph after H1)
    const lines = rawCopy.split('\n');
    let heroPara = '';
    let readingHero = false;
    for (const l of lines) {
      const trimmed = l.trim();
      if (/^(?:#\s+|H1\.\s+)/.test(trimmed)) {
        readingHero = true;
        continue;
      }
      if (readingHero && trimmed.length > 30 && !trimmed.startsWith('CTA:') && !trimmed.startsWith('>') && !trimmed.startsWith('1.') && !trimmed.startsWith('##')) {
        heroPara = trimmed.replace(/[*_]/g, '');
        break;
      }
    }
    if (!heroPara) {
      heroPara = `Realize the full value of ${pillar.p} with a clear strategy for adoption, data confidence, and connected business workflows. Embee Software helps enterprises turn ${pillar.p} into a practical, secure, and scalable advantage.`;
    }

    // Extract Hero CTA
    const ctaMatch = rawCopy.match(/(?:>\s*\*\*CTA:\*\*|CTA:)\s*(.+)/i);
    const heroCta = ctaMatch 
      ? ctaMatch[1].replace(/[*_]/g, '').trim() 
      : 'Consult Enterprise Architect';

    // Extract Trust Indicators (from "2024 Microsoft India..." or pipe-separated strip or bullet points)
    let trustIndicators: string[] = [];
    const credentialLine = lines.find(l => 
      l.includes('Partner of the Year') || 
      l.includes('Microsoft Advanced Specializations') || 
      l.includes('Microsoft Frontier Partner')
    );
    if (credentialLine && credentialLine.includes('|')) {
      trustIndicators = credentialLine
        .split('|')
        .map(s => s.trim())
        .filter(Boolean);
    } else {
      const trustBlock = rawCopy.match(/\*\*Trust Indicators:\*\*([\s\S]*?)(?=---|\n##|\n1\.|$)/i);
      if (trustBlock) {
        trustIndicators = trustBlock[1]
          .split('\n')
          .map(l => l.replace(/^[-*]\s*/, '').trim())
          .filter(Boolean);
      }
    }
    if (trustIndicators.length === 0) {
      trustIndicators = [
        '2024 Microsoft India & South Asia Partner of the Year for Modern Work',
        'Microsoft Frontier Partner and Microsoft Solutions Partner',
        '18 Microsoft Advanced Specializations'
      ];
    }

    // Match sections: either "1. H2: Title", "## 1. Title", or "## Title"
    const sectionHeadingRegex = /^(?:##\s*|(\d+)\.\s*H2:\s*)(.+)$/gm;
    const sections: ParsedSection[] = [];
    let match;
    const sectionPositions: { title: string; index: number }[] = [];

    while ((match = sectionHeadingRegex.exec(rawCopy)) !== null) {
      sectionPositions.push({
        title: match[2]?.trim() || match[0].trim(),
        index: match.index
      });
    }

    for (let i = 0; i < sectionPositions.length; i++) {
      const current = sectionPositions[i];
      const startIndex = current.index;
      const nextIndex = sectionPositions[i + 1] ? sectionPositions[i + 1].index : rawCopy.length;
      
      const fullBlock = rawCopy.slice(startIndex, nextIndex);
      // Remove the section heading line
      const contentWithoutHeader = fullBlock.replace(/^(?:##\s*|\d+\.\s*H2:\s*).+\n?/, '').trim();
      
      const lowerTitle = current.title.toLowerCase();
      let type: ParsedSection['type'] = 'generic';

      if (lowerTitle.includes('challenge') || lowerTitle.includes('obstacle') || lowerTitle.includes('problem')) {
        type = 'challenges';
      } else if (lowerTitle.includes('outcome') || lowerTitle.includes('result') || lowerTitle.includes('expect')) {
        type = 'outcomes';
      } else if (lowerTitle.includes('cover') || lowerTitle.includes('scope')) {
        type = 'scope';
      } else if (lowerTitle.includes('deliver') || lowerTitle.includes('phase') || contentWithoutHeader.includes('--->')) {
        type = 'phases';
      } else if (lowerTitle.includes('deliverable') || lowerTitle.includes('receive')) {
        type = 'deliverables';
      } else if (lowerTitle.includes('choose') || lowerTitle.includes('partner') || contentWithoutHeader.includes('| What to Evaluate |')) {
        type = 'table';
      } else if (lowerTitle.includes('assessment')) {
        type = 'assessment';
      } else if (lowerTitle.includes('faq') || lowerTitle.includes('frequently asked')) {
        type = 'faq';
      } else if (lowerTitle.includes('related solution') || lowerTitle.includes('portfolio')) {
        type = 'related';
      } else if (lowerTitle.includes('secure your') || lowerTitle.includes('foundation today') || contentWithoutHeader.includes('<Customer Logos>')) {
        type = 'closing';
      }

      sections.push({
        id: `section-${i}`,
        title: current.title,
        content: contentWithoutHeader,
        type
      });
    }

    // Extract FAQs (8.1 to 8.6 H3 or standard H3s)
    const faqItems: { q: string; a: string }[] = [];
    const faqSection = sections.find(s => s.type === 'faq');
    if (faqSection) {
      const qMatches = [...faqSection.content.matchAll(/(?:###|\d+\.\d+\s*H3:)\s*([^\n?]+\??)/g)];
      qMatches.forEach((m, idx) => {
        const q = m[1].replace(/[*_]/g, '').trim();
        const nextMatchIndex = qMatches[idx + 1] ? qMatches[idx + 1].index! : faqSection.content.length;
        const answerBlock = faqSection.content.slice(m.index! + m[0].length, nextMatchIndex).trim();
        const a = answerBlock.replace(/^>\s*/gm, '').trim();
        faqItems.push({ q, a });
      });
    }

    return {
      heroHeading,
      heroPara,
      heroCta,
      trustIndicators,
      sections,
      faqItems
    };
  }, [copy, pillar, assessmentName]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const getContainerWidth = () => {
    switch (viewport) {
      case 'mobile':
        return 'max-w-[400px]';
      case 'tablet':
        return 'max-w-[768px]';
      default:
        return 'w-full max-w-5xl';
    }
  };

  return (
    <div className="space-y-4">
      {/* Viewport Control Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
            <Monitor className="w-4 h-4 text-blue-600" />
            Live Landing Page Mockup (Approved 10-Section Structure)
          </span>
          <span className="text-xs text-slate-500">
            · All {parsedData.sections.length} sections matching target structure and length
          </span>
        </div>

        {/* Viewport Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg self-start sm:self-auto">
          <button
            onClick={() => setViewport('desktop')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition ${
              viewport === 'desktop'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Monitor className="w-3.5 h-3.5 text-blue-600" />
            Desktop
          </button>
          <button
            onClick={() => setViewport('tablet')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition ${
              viewport === 'tablet'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Tablet className="w-3.5 h-3.5 text-indigo-600" />
            Tablet
          </button>
          <button
            onClick={() => setViewport('mobile')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition ${
              viewport === 'mobile'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-purple-600" />
            Mobile
          </button>
        </div>
      </div>

      {/* Mockup Canvas */}
      <div className="bg-slate-200/80 p-3 sm:p-6 rounded-2xl flex justify-center transition-all duration-300 overflow-x-auto">
        <div className={`bg-white rounded-xl shadow-xl overflow-hidden border border-slate-300 ${getContainerWidth()} transition-all duration-300`}>
          
          {/* Mock Browser Topbar */}
          <div className="bg-slate-900 text-slate-300 px-4 py-2.5 flex items-center justify-between text-xs border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              <div className="ml-2 bg-slate-800/80 text-slate-400 font-mono text-[11px] px-3 py-0.5 rounded flex items-center gap-1.5 truncate max-w-[320px]">
                <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                https://www.embee.co.in/what-we-do/{pillar.g.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/{pillar.p.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
              </div>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-slate-400">
              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-semibold">
                Production Preview
              </span>
            </div>
          </div>

          {/* Website Header Bar */}
          <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="font-black text-xl tracking-tight text-slate-900 flex items-center gap-1.5">
                <span className="w-7 h-7 rounded bg-blue-600 flex items-center justify-center text-white text-xs font-black shadow-xs">
                  E
                </span>
                <span>embee</span>
              </div>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest hidden md:inline border-l border-slate-200 pl-3">
                Making IT Easier
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
              <span className="text-blue-600 border-b-2 border-blue-600 pb-0.5">{pillar.g}</span>
              <span className="hover:text-slate-900 cursor-pointer">Who We Help</span>
              <span className="hover:text-slate-900 cursor-pointer">Why Embee</span>
              <span className="hover:text-slate-900 cursor-pointer">Case Studies</span>
            </nav>

            <a 
              href="#mockup-lead-form"
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition shadow-xs"
            >
              Book Assessment
            </a>
          </header>

          {/* Breadcrumb Bar */}
          <div className="bg-slate-50 px-6 py-2.5 border-b border-slate-100 text-[11px] text-slate-500 flex items-center gap-1.5 flex-wrap">
            <span>Home &gt; What we do &gt; {pillar.g} &gt; {pillar.p}</span>
          </div>

          {/* Hero Section */}
          <section className="px-6 py-10 lg:py-12 bg-gradient-to-b from-slate-50 via-white to-slate-50/50 border-b border-slate-100">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Enterprise {pillar.g} Advisory &amp; Architecture</span>
              </div>

              {/* H1 Heading */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight tracking-tight">
                {parsedData.heroHeading}
              </h1>

              {/* Subheading / Value Proposition */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                {parsedData.heroPara}
              </p>

              {/* Dual CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href="#mockup-lead-form"
                  className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition"
                >
                  <span>{parsedData.heroCta}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('mockup-lead-form');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-2.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition flex items-center justify-center gap-1.5"
                >
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Consult Enterprise Architect</span>
                </button>
              </div>
            </div>
          </section>

          {/* Trust Proof Ribbon */}
          <section className="bg-slate-900 text-white px-6 py-4 border-b border-slate-800">
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-center text-xs font-semibold text-slate-200">
              {parsedData.trustIndicators.map((ind, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>{ind}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ALL 10 DYNAMIC SECTIONS */}
          <div className="divide-y divide-slate-100">
            {parsedData.sections.map((section) => {
              // 1. BUSINESS CHALLENGES SECTION
              if (section.type === 'challenges') {
                return (
                  <section key={section.id} className="px-6 py-10 bg-slate-50/50">
                    <div className="space-y-6">
                      <div className="space-y-1">
                        <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          Enterprise Obstacles &amp; Hurdles
                        </span>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                          {section.title}
                        </h2>
                      </div>

                      <div className="markdown-body text-xs sm:text-sm leading-relaxed text-slate-700 bg-white p-6 rounded-xl border border-rose-100 shadow-2xs [&_h3]:text-slate-900 [&_h3]:font-bold [&_h3]:text-sm [&_h3]:mt-4 [&_h3]:mb-1.5 [&_h3:first-child]:mt-0">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {section.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </section>
                );
              }

              // 2. MEASURABLE OUTCOMES SECTION
              if (section.type === 'outcomes') {
                return (
                  <section key={section.id} className="px-6 py-10 bg-white">
                    <div className="space-y-6">
                      <div className="space-y-1">
                        <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Measurable ROI &amp; Outcomes
                        </span>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                          {section.title}
                        </h2>
                      </div>

                      <div className="markdown-body text-xs sm:text-sm leading-relaxed text-slate-700 bg-emerald-50/20 p-6 rounded-xl border border-emerald-200 shadow-2xs [&_h3]:text-emerald-950 [&_h3]:font-bold [&_h3]:text-sm [&_h3]:mt-4 [&_h3]:mb-1.5 [&_h3:first-child]:mt-0">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {section.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </section>
                );
              }

              // 3. SCOPE OF ENGAGEMENT
              if (section.type === 'scope') {
                return (
                  <section key={section.id} className="px-6 py-10 bg-slate-50/40">
                    <div className="space-y-6">
                      <div className="space-y-1">
                        <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5" />
                          Scope &amp; Modular Coverage
                        </span>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                          {section.title}
                        </h2>
                      </div>

                      <div className="markdown-body text-xs sm:text-sm leading-relaxed text-slate-700 bg-white p-6 rounded-xl border border-slate-200 shadow-2xs [&_h3]:text-blue-900 [&_h3]:font-bold [&_h3]:text-sm [&_h3]:mt-4 [&_h3]:mb-1.5 [&_h3:first-child]:mt-0">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {section.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </section>
                );
              }

              // 4. DELIVERY FRAMEWORK & PHASES (WITH FLOW STEPPER)
              if (section.type === 'phases') {
                return (
                  <section key={section.id} className="px-6 py-10 bg-white">
                    <div className="space-y-6">
                      <div className="space-y-1">
                        <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          Structured Phased Delivery
                        </span>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                          {section.title}
                        </h2>
                      </div>

                      {/* Phase Stepper Flow Bar */}
                      <div className="bg-indigo-900 text-white p-4 rounded-xl shadow-xs overflow-x-auto">
                        <div className="flex items-center justify-between min-w-[500px] gap-2 text-xs font-bold text-indigo-200">
                          <div className="bg-indigo-800/80 px-3 py-1.5 rounded-lg border border-indigo-700/60 text-white">
                            Phase 1: Discovery &amp; Assessment
                          </div>
                          <span className="text-indigo-400 font-mono font-black">&rarr;</span>
                          <div className="bg-indigo-800/80 px-3 py-1.5 rounded-lg border border-indigo-700/60 text-white">
                            Phase 2: Envisioning &amp; Security
                          </div>
                          <span className="text-indigo-400 font-mono font-black">&rarr;</span>
                          <div className="bg-indigo-800/80 px-3 py-1.5 rounded-lg border border-indigo-700/60 text-white">
                            Phase 3: PoV Validation
                          </div>
                          <span className="text-indigo-400 font-mono font-black">&rarr;</span>
                          <div className="bg-indigo-800/80 px-3 py-1.5 rounded-lg border border-indigo-700/60 text-white">
                            Phase 4: Scaling &amp; Governance
                          </div>
                        </div>
                      </div>

                      <div className="markdown-body text-xs sm:text-sm leading-relaxed text-slate-700 bg-indigo-50/20 p-6 rounded-xl border border-indigo-200 shadow-2xs [&_h3]:text-indigo-950 [&_h3]:font-bold [&_h3]:text-sm [&_h3]:mt-4 [&_h3]:mb-1.5 [&_h3:first-child]:mt-0">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {section.content.replace(/\[Phase 1.*?\] --->.*?\[Phase 4.*?\]/g, '')}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </section>
                );
              }

              // 5. DELIVERABLES (DOCUMENTS & BUILT ASSETS)
              if (section.type === 'deliverables') {
                return (
                  <section key={section.id} className="px-6 py-10 bg-slate-50/60">
                    <div className="space-y-6">
                      <div className="space-y-1">
                        <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5" />
                          Handover Artifacts
                        </span>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                          {section.title}
                        </h2>
                      </div>

                      <div className="markdown-body text-xs sm:text-sm leading-relaxed text-slate-700 bg-white p-6 rounded-xl border border-slate-200 shadow-2xs [&_h3]:text-slate-900 [&_h3]:font-bold [&_h3]:text-sm [&_h3]:mt-4 [&_h3]:mb-2 [&_h3:first-child]:mt-0 [&_ul]:space-y-2 [&_li]:leading-normal">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {section.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </section>
                );
              }

              // 6. PARTNER EVALUATION COMPARISON TABLE
              if (section.type === 'table') {
                return (
                  <section key={section.id} className="px-6 py-10 bg-white">
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                          Transformation-Led Partner Evaluation
                        </span>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                          {section.title}
                        </h2>
                      </div>

                      <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-2xs">
                        <div className="markdown-body p-4 bg-white text-xs sm:text-sm">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {section.content}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  </section>
                );
              }

              // 7. FEATURED ASSESSMENT SPOTLIGHT (Removed for now)
              if (section.type === 'assessment') {
                return null;
              }

              // 8. FAQ ACCORDION
              if (section.type === 'faq') {
                return (
                  <section key={section.id} className="px-6 py-10 bg-slate-50/60">
                    <div className="max-w-3xl mx-auto space-y-6">
                      <div className="text-center space-y-1">
                        <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                          Frequently Asked Questions
                        </span>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                          {section.title}
                        </h2>
                      </div>

                      <div className="space-y-3 mt-4">
                        {parsedData.faqItems.map((item, idx) => (
                          <div 
                            key={idx} 
                            className="border border-slate-200 rounded-xl bg-white overflow-hidden shadow-2xs transition"
                          >
                            <button
                              type="button"
                              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                              className="w-full text-left p-4 bg-white hover:bg-slate-50 flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-900 transition"
                            >
                              <span className="flex items-center gap-2">
                                <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                                {item.q}
                              </span>
                              {openFaq === idx ? (
                                <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                              )}
                            </button>
                            {openFaq === idx && (
                              <div className="p-4 bg-slate-50/50 border-t border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed">
                                {item.a}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                );
              }

              // 9. RELATED SOLUTIONS IN PORTFOLIO
              if (section.type === 'related') {
                return (
                  <section key={section.id} className="px-6 py-10 bg-white">
                    <div className="space-y-6">
                      <div className="space-y-1">
                        <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-1.5">
                          <Compass className="w-3.5 h-3.5" />
                          Related Solutions in Portfolio
                        </span>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                          {section.title}
                        </h2>
                      </div>

                      <div className="markdown-body text-xs sm:text-sm leading-relaxed text-slate-700 bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-2xs [&_strong]:text-indigo-900 [&_ul]:space-y-3">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {section.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </section>
                );
              }

              // 10. CLOSING CONVERSION SECTION & PROOF LOGOS
              if (section.type === 'closing') {
                return (
                  <section key={section.id} className="px-6 py-10 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white">
                    <div className="max-w-4xl mx-auto space-y-6 text-center">
                      <h2 className="text-xl sm:text-2xl font-black text-white">
                        {section.title}
                      </h2>

                      <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        {section.content.replace(/<Customer Logos>|<Case study>|<Blogs>|CTA:\s*.+/g, '').trim()}
                      </p>

                      <div className="pt-2">
                        <a
                          href="#mockup-lead-form"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold transition shadow-lg shadow-blue-500/20"
                        >
                          <span>Connect With Our Lead Strategists</span>
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>

                      {/* Client Proof Logos Ribbon */}
                      <div className="pt-8 border-t border-slate-800">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-4">
                          Trusted By Premier Indian Enterprises
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-slate-300">
                          <span className="px-3 py-1.5 rounded bg-white/10 border border-white/10">SBI Life</span>
                          <span className="px-3 py-1.5 rounded bg-white/10 border border-white/10">MRF Tyres</span>
                          <span className="px-3 py-1.5 rounded bg-white/10 border border-white/10">Thermax</span>
                          <span className="px-3 py-1.5 rounded bg-white/10 border border-white/10">Godrej</span>
                          <span className="px-3 py-1.5 rounded bg-white/10 border border-white/10">Flipkart</span>
                          <span className="px-3 py-1.5 rounded bg-white/10 border border-white/10">Cement Corporation of India</span>
                        </div>
                      </div>
                    </div>
                  </section>
                );
              }

              // GENERIC FALLBACK SECTION
              return (
                <section key={section.id} className="px-6 py-10 bg-white">
                  <div className="space-y-4">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                      {section.title}
                    </h2>
                    <div className="markdown-body text-xs sm:text-sm leading-relaxed text-slate-700">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {section.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>

          {/* Lead Capture Form Section */}
          <section id="mockup-lead-form" className="px-6 py-12 bg-slate-900 text-white border-t border-slate-800">
            <div className="max-w-xl mx-auto">
              <div className="text-center mb-6 space-y-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  Enterprise Consultation
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Connect with an Enterprise Solution Architect
                </h2>
                <p className="text-xs text-slate-400">
                  Get practical architecture guidance and an execution roadmap prepared by Embee Software Principal Solution Architects.
                </p>
              </div>

              {formSubmitted ? (
                <div className="bg-emerald-950/70 border border-emerald-500/50 rounded-xl p-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-sm text-emerald-300">
                    Consultation Request Received
                  </h3>
                  <p className="text-xs text-emerald-200 leading-relaxed max-w-md mx-auto">
                    Thank you. An Embee Software Enterprise Solution Specialist will contact your team within 1 business day to coordinate technical discovery scoping.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="text-xs text-emerald-400 underline font-semibold mt-2"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="bg-slate-800/90 rounded-xl p-6 border border-slate-700 space-y-3.5 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Work Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="cio@company.com"
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Rajesh Sharma"
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Company Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={e => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Acme Enterprises India"
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Company Size (Employees)</label>
                    <select
                      value={formData.size}
                      onChange={e => setFormData({ ...formData, size: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="200-1000">Mid-Market (200 - 1,000 employees)</option>
                      <option value="1000-5000">Enterprise (1,000 - 5,000 employees)</option>
                      <option value="5000+">Large Enterprise (5,000+ employees)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition shadow-md shadow-blue-500/30 flex items-center justify-center gap-1.5 mt-3"
                  >
                    <span>Request Enterprise Solution Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[10px] text-slate-400 text-center">
                    Confidential · Embee Software respects enterprise NDA guidelines · 100% Indian Sovereign Data Privacy
                  </p>
                </form>
              )}
            </div>
          </section>

          {/* Feedback & Review Callout Banner */}
          <section className="px-6 py-6 bg-slate-900 border-t border-slate-800">
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-blue-950/60 border border-blue-500/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-300 shrink-0">
                  <MessageSquareQuote className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">Reviewing this live mockup?</h4>
                  <p className="text-[11px] text-slate-300">Submit your feedback in the feedback section below to instruct the engine to edit, rewrite, or refine the copy.</p>
                </div>
              </div>
              <a
                href="#feedback-refinement-section"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shrink-0 shadow-md shadow-blue-600/20"
              >
                <span>Provide Feedback Below</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </section>

          {/* Mock Website Footer */}
          <footer className="bg-slate-950 text-slate-500 px-6 py-8 border-t border-slate-800 text-[11px] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              © {new Date().getFullYear()} Embee Software Pvt Ltd. All rights reserved.
              <div className="text-[10px] text-slate-600 mt-1">
                2024 Microsoft Partner of the Year · 18 Advanced Specializations · SAP Gold Partner
              </div>
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <span className="hover:text-white cursor-pointer">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer">DPDP Act 2023 Compliance</span>
              <span className="hover:text-white cursor-pointer">Security Center</span>
              <span className="hover:text-white cursor-pointer">Contact Us</span>
            </div>
          </footer>

        </div>
      </div>
    </div>
  );
};
