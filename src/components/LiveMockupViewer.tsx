import React, { useState } from 'react';
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
  Users, 
  Sparkles, 
  ExternalLink,
  Lock,
  Globe,
  Check
} from 'lucide-react';

interface LiveMockupViewerProps {
  copy: string;
  pillar: PillarData;
  assessmentName: string;
  audience: string;
}

export const LiveMockupViewer: React.FC<LiveMockupViewerProps> = ({
  copy,
  pillar,
  assessmentName,
  audience
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

  // Extract clean H1 from copy
  const h1Match = copy.match(/^#\s+(.+)$/m);
  const heroHeading = h1Match ? h1Match[1].replace(/[*_]/g, '') : `${pillar.p} for Indian Enterprises`;

  // Extract subhead or first paragraph
  const lines = copy.split('\n').filter(l => l.trim().length > 0);
  const heroPara = lines.find(l => !l.startsWith('#') && l.length > 50) || 
    `Architect, modernize, and govern your ${pillar.p.toLowerCase()} workloads with certified local Indian engineering, sub-hour RTO/RPO SLAs, and complete DPDP Act 2023 compliance.`;

  // Parse FAQs from copy
  const faqItems: { q: string; a: string }[] = [];
  const faqSectionIndex = copy.toLowerCase().indexOf('frequently asked questions');
  if (faqSectionIndex !== -1) {
    const faqText = copy.slice(faqSectionIndex);
    const qMatches = [...faqText.matchAll(/###?\s+([^\n?]+\?)/g)];
    qMatches.forEach((m, idx) => {
      const q = m[1].replace(/[*_]/g, '').trim();
      const nextMatchIndex = qMatches[idx + 1] ? qMatches[idx + 1].index! : faqText.length;
      const content = faqText.slice(m.index! + m[0].length, nextMatchIndex).trim();
      const a = content.split('\n')[0]?.replace(/[*_]/g, '').trim() || 'Embee Software provides end-to-end operational engineering and 24x7 India-based support.';
      if (faqItems.length < 6) {
        faqItems.push({ q, a });
      }
    });
  }

  // Fallback FAQs if parsing found fewer than 3
  if (faqItems.length < 3) {
    faqItems.push(
      {
        q: `How does Embee Software ensure DPDP Act 2023 compliance for ${pillar.p}?`,
        a: `All customer data and workload traffic remain strictly within sovereign Microsoft Azure Indian regions (Central India/Pune, South India/Chennai, West India/Mumbai) with full audit telemetry.`
      },
      {
        q: `What is the delivery timeline for our initial ${assessmentName}?`,
        a: `The comprehensive readiness audit is delivered in 10 to 14 business days, concluding with an executive TCO analysis, risk matrix, and migration architecture review.`
      },
      {
        q: `What post-implementation support does Embee Software provide?`,
        a: `Direct access to 500+ certified Indian engineers backed by 24x7 local NOC/SOC monitoring, ITIL-governed incident management, and sub-hour cutover guarantees.`
      }
    );
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const getContainerWidth = () => {
    switch (viewport) {
      case 'mobile':
        return 'max-w-[390px]';
      case 'tablet':
        return 'max-w-[768px]';
      default:
        return 'w-full';
    }
  };

  return (
    <div className="space-y-4">
      {/* Viewport Control Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
            Live Landing Page Mockup
          </span>
          <span className="text-xs text-slate-500">
            · Visual rendering of embee.co.in production layout
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
              <div className="ml-2 bg-slate-800/80 text-slate-400 font-mono text-[11px] px-3 py-0.5 rounded flex items-center gap-1.5 truncate max-w-[280px]">
                <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                https://www.embee.co.in/solutions/{pillar.p.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
              </div>
            </div>
            <span className="text-[10px] text-slate-400 hidden sm:inline">
              Live Preview Mode
            </span>
          </div>

          {/* Website Header Bar */}
          <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="font-black text-lg tracking-tight text-slate-900 flex items-center gap-1.5">
                <span className="w-6 h-6 rounded bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white text-xs font-black">
                  E
                </span>
                <span>embee</span>
              </div>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest hidden md:inline border-l border-slate-200 pl-3">
                Making IT Easier
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
              <span className="text-blue-600 border-b-2 border-blue-600 pb-0.5">What We Do</span>
              <span className="hover:text-slate-900 cursor-pointer">Who We Help</span>
              <span className="hover:text-slate-900 cursor-pointer">Why Embee</span>
              <span className="hover:text-slate-900 cursor-pointer">Case Studies</span>
            </nav>

            <button className="px-3.5 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition shadow-xs">
              Book Assessment
            </button>
          </header>

          {/* Breadcrumb Bar */}
          <div className="bg-slate-50 px-6 py-2.5 border-b border-slate-100 text-[11px] text-slate-500 flex items-center gap-1.5 flex-wrap">
            <span>Home</span>
            <span>&gt;</span>
            <span>What we do</span>
            <span>&gt;</span>
            <span className="text-slate-700 font-medium">{pillar.g}</span>
            <span>&gt;</span>
            <span className="text-blue-700 font-semibold">{pillar.p}</span>
          </div>

          {/* Hero Section */}
          <section className="px-6 py-10 bg-gradient-to-b from-slate-50 via-white to-slate-50/40 border-b border-slate-100">
            <div className="max-w-3xl space-y-4">
              {/* Sovereign Regulatory Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>DPDP Act 2023 Compliant · Sovereign Indian Data Residency</span>
              </div>

              {/* H1 Heading */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight tracking-tight">
                {heroHeading}
              </h1>

              {/* Subheading / Value Proposition */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                {heroPara}
              </p>

              {/* Dual CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href="#mockup-lead-form"
                  className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition"
                >
                  <span>Request {assessmentName}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  className="px-5 py-2.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition flex items-center justify-center gap-1.5"
                >
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Consult Enterprise Architect</span>
                </button>
              </div>
            </div>
          </section>

          {/* Trust Proof Ribbon */}
          <section className="bg-slate-900 text-white px-6 py-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
              <div className="pt-2 sm:pt-0">
                <div className="text-lg font-black text-blue-400">35+ Years</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wide">Enterprise Pedigree</div>
              </div>
              <div className="pt-2 sm:pt-0">
                <div className="text-lg font-black text-blue-400">500+</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wide">Certified Engineers</div>
              </div>
              <div className="pt-2 sm:pt-0">
                <div className="text-lg font-black text-blue-400">17</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wide">Microsoft Specializations</div>
              </div>
              <div className="pt-2 sm:pt-0">
                <div className="text-lg font-black text-blue-400">1000+</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wide">Indian Enterprise Workloads</div>
              </div>
            </div>
          </section>

          {/* Key Solutions Architecture Grid */}
          <section className="px-6 py-10">
            <div className="text-center max-w-xl mx-auto mb-8 space-y-1">
              <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                Full-Lifecycle Engineering
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Core Architectural Capabilities
              </h2>
              <p className="text-xs text-slate-500">
                Designed for {audience} prioritizing business continuity and predictable TCO
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  title: 'Strategy & Readiness Assessment',
                  desc: `Comprehensive infrastructure audit evaluating TCO, dependency mapping, and zero-downtime cutover planning.`
                },
                {
                  title: 'Sovereign Compliance Architecture',
                  desc: `Engineered strictly for Indian data residency across Pune and Chennai Azure regions in full compliance with DPDP Act 2023.`
                },
                {
                  title: '24x7 Day-Two Managed Operations',
                  desc: `Continuous monitoring, FinOps governance, and guaranteed sub-hour SLA response backed by 500+ local engineers.`
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-50 p-5 rounded-xl border border-slate-200 hover:border-blue-400 transition space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                    0{idx + 1}
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900">{item.title}</h3>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Embee Software vs Competitor Comparison */}
          <section className="px-6 py-8 bg-slate-50 border-y border-slate-200">
            <div className="mb-4">
              <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                Competitive Matrix
              </span>
              <h2 className="text-lg font-black text-slate-900">
                Why Indian Enterprises Choose Embee Software
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs bg-white rounded-lg border border-slate-200 overflow-hidden">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <th className="p-3">Evaluation Parameter</th>
                    <th className="p-3 bg-blue-50 text-blue-900 border-x border-blue-200">Embee Software</th>
                    <th className="p-3 text-slate-600">Global Mega-SIs</th>
                    <th className="p-3 text-slate-600">Uncertified Resellers</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-3 font-medium text-slate-900">Partner Accreditation</td>
                    <td className="p-3 bg-blue-50/50 font-bold text-blue-900 border-x border-blue-200">
                      Microsoft Frontier Partner (17 Specializations)
                    </td>
                    <td className="p-3 text-slate-600">Tier-1 Multi-Cloud (Low Focus)</td>
                    <td className="p-3 text-slate-400">Basic Reseller (No Specialization)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-slate-900">Indian Compliance Nuance</td>
                    <td className="p-3 bg-blue-50/50 font-bold text-blue-900 border-x border-blue-200">
                      DPDP Act 2023 & RBI/SEBI Certified Architecture
                    </td>
                    <td className="p-3 text-slate-600">Generic Global Templates</td>
                    <td className="p-3 text-slate-400">Not Addressed</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-slate-900">Engineering Access</td>
                    <td className="p-3 bg-blue-50/50 font-bold text-blue-900 border-x border-blue-200">
                      Direct Principal Architect Access
                    </td>
                    <td className="p-3 text-slate-600">Layered Account Managers</td>
                    <td className="p-3 text-slate-400">Outsourced Support</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-slate-900">SLA Accountability</td>
                    <td className="p-3 bg-blue-50/50 font-bold text-blue-900 border-x border-blue-200">
                      Sub-hour RTO/RPO Guarantees
                    </td>
                    <td className="p-3 text-slate-600">Best Effort / Escalation Queues</td>
                    <td className="p-3 text-slate-400">No Commitments</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Interactive FAQ Accordion */}
          <section className="px-6 py-10">
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="text-center space-y-1">
                <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                  Clarity & Governance
                </span>
                <h2 className="text-xl font-black text-slate-900">
                  Frequently Asked Questions
                </h2>
                <p className="text-xs text-slate-500">
                  Common enterprise technical and commercial questions
                </p>
              </div>

              <div className="space-y-2 mt-6">
                {faqItems.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="border border-slate-200 rounded-lg overflow-hidden transition"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full text-left p-3.5 bg-slate-50/60 hover:bg-slate-50 flex items-center justify-between gap-3 text-xs font-bold text-slate-900"
                    >
                      <span>{item.q}</span>
                      {openFaq === idx ? (
                        <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>
                    {openFaq === idx && (
                      <div className="p-3.5 bg-white border-t border-slate-100 text-xs text-slate-600 leading-relaxed">
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Lead Capture Form Section */}
          <section id="mockup-lead-form" className="px-6 py-10 bg-slate-900 text-white">
            <div className="max-w-xl mx-auto">
              <div className="text-center mb-6 space-y-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  Enterprise Consultation
                </span>
                <h2 className="text-xl font-black text-white">
                  Request Your Free {assessmentName}
                </h2>
                <p className="text-xs text-slate-400">
                  Get a comprehensive gap analysis and migration blueprint prepared by our Principal Solution Architects.
                </p>
              </div>

              {formSubmitted ? (
                <div className="bg-emerald-950/70 border border-emerald-500/50 rounded-xl p-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-sm text-emerald-300">
                    Assessment Request Received
                  </h3>
                  <p className="text-xs text-emerald-200 leading-relaxed max-w-md mx-auto">
                    Thank you. An Embee Software Enterprise Solution Specialist will contact your team within 1 business day to coordinate scoping parameters.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="text-xs text-emerald-400 underline font-semibold mt-2"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="bg-slate-800/90 rounded-xl p-5 border border-slate-700 space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Work Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="cio@company.com"
                        className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
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
                        className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
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
                        className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
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
                        className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Company Size (Employees)</label>
                    <select
                      value={formData.size}
                      onChange={e => setFormData({ ...formData, size: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="200-1000">Mid-Market (200 - 1,000 employees)</option>
                      <option value="1000-5000">Enterprise (1,000 - 5,000 employees)</option>
                      <option value="5000+">Large Enterprise (5,000+ employees)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition shadow-md shadow-blue-500/30 flex items-center justify-center gap-1.5 mt-2"
                  >
                    <span>Schedule Free {assessmentName}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <p className="text-[10px] text-slate-400 text-center">
                    Confidential · Embee Software respects enterprise NDA guidelines · 100% Indian Data Privacy
                  </p>
                </form>
              )}
            </div>
          </section>

          {/* Mock Website Footer */}
          <footer className="bg-slate-950 text-slate-500 px-6 py-6 border-t border-slate-800 text-[11px] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              © {new Date().getFullYear()} Embee Software Pvt Ltd. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span>Privacy Policy</span>
              <span>DPDP Compliance</span>
              <span>Security Center</span>
            </div>
          </footer>

        </div>
      </div>
    </div>
  );
};
