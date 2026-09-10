import React, { useState } from 'react';
import { SeoAuditScore, PillarData } from '../types';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Sparkles, 
  Search, 
  Cpu, 
  Code, 
  FileText, 
  ShieldCheck, 
  Layers, 
  BarChart2, 
  BookOpen, 
  Clock, 
  Target,
  ArrowRight,
  Info
} from 'lucide-react';

interface SeoScoreViewerProps {
  audit: SeoAuditScore;
  pillar: PillarData;
  onNavigateToTab?: (tab: 'copy' | 'seo') => void;
}

export const SeoScoreViewer: React.FC<SeoScoreViewerProps> = ({
  audit,
  pillar,
  onNavigateToTab
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'technical' | 'content' | 'ai_geo' | 'schema' | 'entities'>('all');

  const filteredChecks = activeFilter === 'all'
    ? audit.checks
    : audit.checks.filter(c => c.category === activeFilter);

  const passedCount = audit.checks.filter(c => c.status === 'pass').length;
  const warningCount = audit.checks.filter(c => c.status === 'warning').length;
  const failCount = audit.checks.filter(c => c.status === 'fail').length;

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (score >= 75) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (score >= 60) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-rose-600 bg-rose-50 border-rose-200';
  };

  const getScoreStroke = (score: number) => {
    if (score >= 90) return '#10b981'; // emerald-500
    if (score >= 75) return '#3b82f6'; // blue-500
    if (score >= 60) return '#f59e0b'; // amber-500
    return '#f43f5e'; // rose-500
  };

  return (
    <div className="space-y-6">
      {/* Top Hero Card: Dual Score & Grade */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
          {/* Left: Overall Pillar Details */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                {pillar.g}
              </span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                SEO & AI Search Performance Audit
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              {pillar.p}
            </h2>
            <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
              Real-time evaluation against Google search ranking factors and Generative Engine Optimization (GEO) criteria for Perplexity, ChatGPT Search, and Gemini AI Overviews.
            </p>
          </div>

          {/* Right: Dual Circular Gauges */}
          <div className="flex items-center gap-6 justify-around sm:justify-end border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100">
            {/* Traditional SEO Meter */}
            <div className="flex flex-col items-center">
              <div className="relative w-20 h-20">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-100"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    strokeDasharray={`${audit.traditionalScore}, 100`}
                    strokeWidth="3.5"
                    stroke={getScoreStroke(audit.traditionalScore)}
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-extrabold text-slate-900">{audit.traditionalScore}%</span>
                </div>
              </div>
              <span className="text-[11px] font-bold text-slate-700 mt-1.5 flex items-center gap-1">
                <Search className="w-3 h-3 text-blue-600" />
                Traditional SEO
              </span>
              <span className="text-[10px] text-slate-400">Google On-Page</span>
            </div>

            {/* AI SEO (GEO) Meter */}
            <div className="flex flex-col items-center">
              <div className="relative w-20 h-20">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-100"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    strokeDasharray={`${audit.aiSeoScore}, 100`}
                    strokeWidth="3.5"
                    stroke={getScoreStroke(audit.aiSeoScore)}
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-extrabold text-slate-900">{audit.aiSeoScore}%</span>
                </div>
              </div>
              <span className="text-[11px] font-bold text-slate-700 mt-1.5 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-purple-600" />
                AI SEO (GEO)
              </span>
              <span className="text-[10px] text-slate-400">LLM Citations</span>
            </div>

            {/* Composite Grade */}
            <div className="flex flex-col items-center pl-2 border-l border-slate-100">
              <div className={`w-14 h-14 rounded-xl border flex items-center justify-center font-black text-2xl shadow-xs ${getScoreColor(audit.overallScore)}`}>
                {audit.grade}
              </div>
              <span className="text-[11px] font-bold text-slate-700 mt-2">Overall Rank</span>
              <span className="text-[10px] text-slate-500">{audit.overallScore}/100</span>
            </div>
          </div>
        </div>

        {/* Quick Summary Pill Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-100">
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-[11px] font-medium flex items-center gap-1">
                <FileText className="w-3 h-3 text-slate-400" /> Content Length
              </span>
              <span className="text-[10px] text-slate-400">Target: 1.5k-2.2k</span>
            </div>
            <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <span>{audit.wordCount} words</span>
              <span className="text-[10px] text-emerald-600 font-semibold">
                (~{audit.readingTimeMinutes} min read)
              </span>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-[11px] font-medium flex items-center gap-1">
                <BookOpen className="w-3 h-3 text-slate-400" /> Readability
              </span>
              <span className="text-[10px] text-slate-400">Flesch Ease</span>
            </div>
            <div className="text-sm font-bold text-slate-900">
              {audit.readingEaseScore}/100
              <span className="text-[10px] text-slate-500 font-normal ml-1">
                (Professional B2B)
              </span>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-[11px] font-medium flex items-center gap-1">
                <Code className="w-3 h-3 text-slate-400" /> JSON-LD Schemas
              </span>
              <span className="text-[10px] text-slate-400">Valid</span>
            </div>
            <div className="text-sm font-bold text-slate-900 flex items-center gap-1">
              <span className={audit.schemaValidation.hasServiceSchema ? 'text-emerald-600' : 'text-slate-300'}>Service</span>
              <span className="text-slate-300">·</span>
              <span className={audit.schemaValidation.hasFaqSchema ? 'text-emerald-600' : 'text-slate-300'}>FAQ</span>
              <span className="text-slate-300">·</span>
              <span className={audit.schemaValidation.hasBreadcrumbSchema ? 'text-emerald-600' : 'text-slate-300'}>Path</span>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-[11px] font-medium flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-slate-400" /> Audit Checks
              </span>
              <span className="text-[10px] text-slate-400">11 Rules</span>
            </div>
            <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="text-emerald-600 flex items-center gap-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> {passedCount}
              </span>
              {warningCount > 0 && (
                <span className="text-amber-600 flex items-center gap-0.5">
                  <AlertTriangle className="w-3.5 h-3.5" /> {warningCount}
                </span>
              )}
              {failCount > 0 && (
                <span className="text-rose-600 flex items-center gap-0.5">
                  <XCircle className="w-3.5 h-3.5" /> {failCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Actionable Recommendations (if any) */}
      {audit.topRecommendations.length > 0 && (
        <div className="bg-amber-50/70 rounded-xl border border-amber-200 p-4 shadow-xs">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1.5 flex-1">
              <h3 className="text-xs font-bold text-amber-950 uppercase tracking-wide">
                Key Optimizations to Boost Ranking to 100%
              </h3>
              <ul className="space-y-1 text-xs text-amber-900">
                {audit.topRecommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Keyword Placement & Density Matrix */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Target Keyword Placement & Density Analysis
            </h3>
          </div>
          <span className="text-[11px] text-slate-500">
            Recommended Density: 0.6% – 2.2%
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <th className="p-3">Target Keyword</th>
                <th className="p-3 text-center">Mentions</th>
                <th className="p-3 text-center">Density</th>
                <th className="p-3 text-center">In H1</th>
                <th className="p-3 text-center">In H2</th>
                <th className="p-3 text-center">First 100w</th>
                <th className="p-3 text-center">In FAQ</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {audit.keywords.map((kw, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition">
                  <td className="p-3 font-semibold text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                    {kw.keyword}
                  </td>
                  <td className="p-3 text-center font-mono text-slate-700">{kw.count}</td>
                  <td className="p-3 text-center font-mono text-slate-700">{kw.density}%</td>
                  <td className="p-3 text-center">
                    {kw.inH1 ? (
                      <span className="text-emerald-600 font-bold">✓</span>
                    ) : (
                      <span className="text-slate-300 font-bold">—</span>
                    )}
                  </td>
                  <td className="p-3 text-center">
                    {kw.inH2 ? (
                      <span className="text-emerald-600 font-bold">✓</span>
                    ) : (
                      <span className="text-slate-300 font-bold">—</span>
                    )}
                  </td>
                  <td className="p-3 text-center">
                    {kw.inFirst100Words ? (
                      <span className="text-emerald-600 font-bold">✓</span>
                    ) : (
                      <span className="text-amber-500 font-bold">—</span>
                    )}
                  </td>
                  <td className="p-3 text-center">
                    {kw.inFaq ? (
                      <span className="text-emerald-600 font-bold">✓</span>
                    ) : (
                      <span className="text-slate-300 font-bold">—</span>
                    )}
                  </td>
                  <td className="p-3 text-right">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        kw.status === 'optimal'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : kw.status === 'low'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {kw.status === 'optimal' ? 'Optimal' : kw.status === 'low' ? 'Low Frequency' : 'High Frequency'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Audit Checks with Category Filter */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-indigo-600" />
              Granular Verification Checklist
            </h3>
            <p className="text-[11px] text-slate-500">
              Evaluated across 5 key ranking and LLM citation dimensions
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { id: 'all', label: 'All Checks' },
              { id: 'technical', label: 'Technical' },
              { id: 'content', label: 'Content Depth' },
              { id: 'ai_geo', label: 'AI & GEO' },
              { id: 'entities', label: 'Indian Entities' },
              { id: 'schema', label: 'Schemas' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                  activeFilter === tab.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredChecks.map((check, idx) => (
            <div key={idx} className="p-4 flex items-start justify-between gap-3 hover:bg-slate-50/60 transition">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0">
                  {check.status === 'pass' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  {check.status === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-500" />}
                  {check.status === 'fail' && <XCircle className="w-4 h-4 text-rose-600" />}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-slate-900">{check.name}</span>
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold uppercase bg-slate-100 text-slate-600">
                      {check.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">{check.detail}</p>
                  {check.recommendation && (
                    <p className="text-xs text-amber-700 bg-amber-50/70 p-2 rounded border border-amber-200 mt-1 font-medium">
                      Fix: {check.recommendation}
                    </p>
                  )}
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs font-mono font-bold text-slate-700">
                  {check.score} / {check.maxScore} pts
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
