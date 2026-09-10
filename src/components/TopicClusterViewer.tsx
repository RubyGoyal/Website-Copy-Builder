import React, { useState } from 'react';
import { PillarData, ChildClusterArticle } from '../types';
import { 
  GitFork, 
  Layers, 
  Link2, 
  ArrowRight, 
  BookOpen, 
  Copy, 
  Check, 
  Share2, 
  Compass, 
  FileText,
  FolderTree
} from 'lucide-react';

interface TopicClusterViewerProps {
  pillar: PillarData;
  allPillars: PillarData[];
}

export const TopicClusterViewer: React.FC<TopicClusterViewerProps> = ({
  pillar,
  allPillars
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const groupSlug = pillar.g.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const pillarSlug = pillar.p.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const pillarUrl = `/solutions/${pillarSlug}`;
  const parentUrl = `/solutions/${groupSlug}`;

  // Find sibling pillars in the same solution group
  const siblings = allPillars
    .filter(p => p.g === pillar.g && p.p !== pillar.p)
    .map(p => ({
      name: p.p,
      url: `/solutions/${p.p.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      recommendedAnchor: `${p.p} in India`
    }));

  // Generate 4-5 strategic child cluster supporting articles based on the pillar
  const generateChildArticles = (): ChildClusterArticle[] => {
    const p = pillar.p;
    const g = pillar.g;
    return [
      {
        title: `How Indian Enterprises Navigate DPDP Act 2023 for ${p}`,
        slug: `/resources/dpdp-compliance-${pillarSlug}`,
        intent: 'Informational',
        funnelStage: 'TOFU',
        targetKeyword: `DPDP Act compliance for ${p}`,
        inboundAnchorText: `${p} compliance architecture`,
        description: `Deep regulatory guide breaking down data fiduciary obligations, sovereign Azure India data storage, and audit log retention.`
      },
      {
        title: `TCO Analysis: Migrating to ${p} vs On-Premises in India`,
        slug: `/resources/tco-roi-${pillarSlug}-india`,
        intent: 'Commercial',
        funnelStage: 'MOFU',
        targetKeyword: `${p} TCO calculator India`,
        inboundAnchorText: `enterprise ${p} consulting`,
        description: `Detailed cost modeling factoring in Azure Hybrid Benefit, power cooling in Indian metros, and 3-year FinOps savings.`
      },
      {
        title: `Zero-Downtime Cutover Checklist for ${p} Deployments`,
        slug: `/resources/zero-downtime-cutover-${pillarSlug}`,
        intent: 'Informational',
        funnelStage: 'MOFU',
        targetKeyword: `zero downtime ${p} cutover`,
        inboundAnchorText: `end-to-end ${p} services`,
        description: `Architectural step-by-step framework detailing mock runs, delta data sync, and fallback rollback procedures.`
      },
      {
        title: `Why Indian CIOs Choose Embee Software for ${p}`,
        slug: `/case-studies/enterprise-${pillarSlug}-embee`,
        intent: 'Comparative',
        funnelStage: 'BOFU',
        targetKeyword: `top ${p} partners India`,
        inboundAnchorText: `certified ${p} partner in India`,
        description: `Named Indian manufacturing and BFSI enterprise case studies with quantified 99.99% uptime and sub-hour cutovers.`
      }
    ];
  };

  const childArticles = generateChildArticles();

  const handleCopyMarkdownPlan = () => {
    const plan = `# TOPIC CLUSTER & INTERNAL LINKING PLAN: ${pillar.p}
Solution Group: ${pillar.g}
Pillar Canonical URL: https://www.embee.co.in${pillarUrl}
Parent Group Hub: https://www.embee.co.in${parentUrl}

## 1. Breadcrumb Hierarchy
Home (/) > What We Do (/solutions) > ${pillar.g} (${parentUrl}) > ${pillar.p} (${pillarUrl})

## 2. Sibling Pillar Cross-Links (Within ${pillar.g})
${siblings.map(s => `- [${s.recommendedAnchor}](https://www.embee.co.in${s.url})`).join('\n')}

## 3. Supporting Child Cluster Articles (Hub-and-Spoke Spoke Content)
${childArticles.map(a => `### ${a.title}
- Target Slug: https://www.embee.co.in${a.slug}
- Funnel Stage: ${a.funnelStage} (${a.intent})
- Target Search Keyword: "${a.targetKeyword}"
- Mandatory Inbound Link: Anchor text "[${a.inboundAnchorText}](https://www.embee.co.in${pillarUrl})"
- Summary: ${a.description}
`).join('\n')}
`;
    navigator.clipboard.writeText(plan);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                SEO Architecture
              </span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Topic Cluster & Hub-and-Spoke Model
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              {pillar.p} Cluster Map
            </h2>
            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
              Google algorithms rank pillar pages based on topical authority established by child spoke articles pointing inbound with exact contextual anchor text.
            </p>
          </div>

          <button
            onClick={handleCopyMarkdownPlan}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition flex items-center gap-1.5 self-start sm:self-auto shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied Plan!' : 'Copy Linking Plan'}
          </button>
        </div>

        {/* Visual Breadcrumb Path */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-2 text-xs font-mono text-slate-600 flex-wrap">
          <span className="bg-slate-100 px-2 py-1 rounded text-slate-700">/</span>
          <ArrowRight className="w-3 h-3 text-slate-400" />
          <span className="bg-slate-100 px-2 py-1 rounded text-slate-700">/solutions</span>
          <ArrowRight className="w-3 h-3 text-slate-400" />
          <span className="bg-indigo-50 text-indigo-800 border border-indigo-200 px-2.5 py-1 rounded font-semibold">
            {parentUrl} ({pillar.g})
          </span>
          <ArrowRight className="w-3 h-3 text-slate-400" />
          <span className="bg-blue-600 text-white px-2.5 py-1 rounded font-bold shadow-xs">
            ★ {pillarUrl} (This Pillar Page)
          </span>
        </div>
      </div>

      {/* Child Spoke Articles (Inbound Link Sources) */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Supporting Cluster Content (Child Articles to Produce)
            </h3>
          </div>
          <span className="text-[11px] text-slate-500">
            Passes topical authority directly to this pillar
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {childArticles.map((article, idx) => (
            <div key={idx} className="p-4 sm:p-5 hover:bg-slate-50/70 transition space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    article.funnelStage === 'TOFU'
                      ? 'bg-emerald-100 text-emerald-800'
                      : article.funnelStage === 'MOFU'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {article.funnelStage} · {article.intent}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">{article.title}</h4>
                </div>
                <span className="text-[11px] font-mono text-slate-500">{article.slug}</span>
              </div>

              <p className="text-xs text-slate-600">{article.description}</p>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5 text-slate-700">
                  <span className="font-semibold text-slate-500 text-[11px]">Target Keyword:</span>
                  <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-800 text-[11px]">
                    "{article.targetKeyword}"
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-blue-700 bg-blue-50/70 border border-blue-200/80 px-2.5 py-1 rounded-md">
                  <Link2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span className="font-semibold text-[11px]">Mandatory Inbound Anchor:</span>
                  <span className="font-bold underline text-[11px]">"{article.inboundAnchorText}"</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sibling Pillar Cross-Linking Matrix */}
      {siblings.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderTree className="w-4 h-4 text-indigo-600" />
              <h3 className="text-sm font-bold text-slate-900">
                Sibling Pillar Cross-Linking ({pillar.g})
              </h3>
            </div>
            <span className="text-[11px] text-slate-500">
              Internal links to integrate in the "Related Solutions" section
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {siblings.map((sib, i) => (
              <div key={i} className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-indigo-300 transition space-y-1.5">
                <div className="text-xs font-bold text-slate-900 truncate">{sib.name}</div>
                <div className="text-[10px] font-mono text-slate-500 truncate">{sib.url}</div>
                <div className="text-[11px] text-indigo-700 font-medium flex items-center gap-1">
                  <Link2 className="w-3 h-3 text-indigo-500 shrink-0" />
                  Anchor: <span className="font-semibold">"{sib.recommendedAnchor}"</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
