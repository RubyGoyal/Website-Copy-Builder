import React, { useState, useEffect } from 'react';
import { ResearchInsight, PillarData } from '../types';
import { Globe, ShieldAlert, Sparkles, CheckCircle2, Search, ArrowUpRight, Filter, RefreshCw, Send, Layers } from 'lucide-react';

interface ResearchViewerProps {
  research: ResearchInsight;
  onRefresh?: (pillar?: PillarData, query?: string) => void;
  isRefreshing?: boolean;
  selectedPillar: PillarData;
  onSelectPillar: (pillar: PillarData) => void;
  allPillars: PillarData[];
}

export const ResearchViewer: React.FC<ResearchViewerProps> = ({
  research,
  onRefresh,
  isRefreshing = false,
  selectedPillar,
  onSelectPillar,
  allPillars
}) => {
  const [customQuery, setCustomQuery] = useState<string>(
    `${selectedPillar.p} ${selectedPillar.g} India`
  );

  // Keep query in sync when selected pillar changes
  useEffect(() => {
    setCustomQuery(`${selectedPillar.p} ${selectedPillar.g} India`);
  }, [selectedPillar]);

  // Suggested queries for quick exploration
  const queryPresets = [
    `${selectedPillar.p} ${selectedPillar.g} India`,
    `${selectedPillar.p} competitor gaps Indian enterprises`,
    `${selectedPillar.p} DPDP Act compliance India`,
    `${selectedPillar.k[0] || selectedPillar.p} services India`
  ];

  const handleExecuteSearch = (queryToRun?: string) => {
    const q = queryToRun || customQuery;
    if (onRefresh) {
      onRefresh(selectedPillar, q);
    }
  };

  return (
    <div className="space-y-6">
      {/* Pillar & Search Control Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3.5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Target Solution for Research
              </div>
              <div className="text-sm font-bold text-slate-900 flex items-center gap-2 flex-wrap">
                <span>{selectedPillar.p}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {selectedPillar.g}
                </span>
                <span className="text-xs font-normal text-slate-500">
                  Owner: <span className="font-semibold text-slate-700">{selectedPillar.s}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Pillar Selector Dropdown right in the research viewer */}
          <div className="flex items-center gap-2">
            <label htmlFor="research-pillar-select" className="text-xs font-semibold text-slate-600 shrink-0 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              Switch Pillar:
            </label>
            <select
              id="research-pillar-select"
              value={`${selectedPillar.g}::${selectedPillar.p}`}
              onChange={e => {
                const [group, pillarName] = e.target.value.split('::');
                const found = allPillars.find(p => p.g === group && p.p === pillarName);
                if (found) {
                  onSelectPillar(found);
                  if (onRefresh) {
                    onRefresh(found, `${found.p} ${found.g} India`);
                  }
                }
              }}
              className="text-xs font-medium py-1.5 px-2.5 rounded-lg border border-slate-300 bg-slate-50 hover:bg-white focus:bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 max-w-[280px] truncate"
            >
              {allPillars.map(p => (
                <option key={`${p.g}::${p.p}`} value={`${p.g}::${p.p}`}>
                  [{p.g}] {p.p}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Query Input and Execution */}
        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={customQuery}
              onChange={e => setCustomQuery(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleExecuteSearch();
                }
              }}
              placeholder="Enter search query to analyze competitor gaps in India..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white"
            />
          </div>

          <button
            onClick={() => handleExecuteSearch()}
            disabled={isRefreshing}
            id="btn-execute-research"
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-xs font-semibold shadow-xs transition flex items-center justify-center gap-1.5 shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Researching...' : 'Re-run Search'}
          </button>
        </div>

        {/* Preset Query Chips */}
        <div className="flex items-center gap-1.5 flex-wrap text-[11px]">
          <span className="text-slate-500 font-medium text-[10px] uppercase tracking-wide mr-1">
            Suggested Queries:
          </span>
          {queryPresets.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setCustomQuery(preset);
                handleExecuteSearch(preset);
              }}
              className={`px-2 py-0.5 rounded-md border text-[11px] transition truncate max-w-[260px] ${
                customQuery === preset
                  ? 'bg-indigo-100 text-indigo-800 border-indigo-300 font-medium'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-indigo-50 hover:text-indigo-700'
              }`}
              title={preset}
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      {/* Top Overview Banner */}
      <div className="bg-linear-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-xl p-6 shadow-sm border border-indigo-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-400/30">
              <Globe className="w-3.5 h-3.5" />
              Gemini Competitor Landscape Grounding
            </div>
            <h2 className="text-lg font-bold text-white mt-2">
              Indian Market Landscape & Competitor Gaps
            </h2>
            <p className="text-xs text-indigo-200 mt-1">
              Evaluated for: <span className="font-mono bg-indigo-950/80 px-2 py-0.5 rounded text-indigo-300">"{research.query}"</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] px-2.5 py-1 rounded-full font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {research.isQuotaLimited ? 'Domain Intelligence Matrix' : 'Live Google Grounded'}
            </span>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="mt-4 pt-4 border-t border-indigo-800/80 text-xs text-slate-300 leading-relaxed">
          <strong className="text-white">Executive Landscape Summary:</strong> {research.summary}
        </div>
      </div>

      {/* Two Column Grid: Ranking Themes vs Competitor Omissions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Themes Covered */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                What Ranking Competitor Pages Cover
              </h3>
              <p className="text-[11px] text-slate-500">
                Standard claims appearing across IT provider websites in India
              </p>
            </div>
          </div>

          <ul className="space-y-2 text-xs mt-3">
            {research.rankingThemes.map((theme, idx) => (
              <li key={idx} className="flex items-start gap-2 text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>{theme}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Critical Omissions & Gaps (How Embee Software Wins) */}
        <div className="bg-white rounded-xl border border-indigo-100 p-5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none" />
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-700">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-indigo-950">
                What They Omit (Embee Software Differentiators)
              </h3>
              <p className="text-[11px] text-slate-500">
                Unanswered requirements Embee Software addresses head-on
              </p>
            </div>
          </div>

          <ul className="space-y-2 text-xs mt-3">
            {research.competitorGaps.map((gap, idx) => (
              <li key={idx} className="flex items-start gap-2 text-indigo-950 bg-indigo-50/50 p-2.5 rounded-lg border border-indigo-100 font-medium">
                <ShieldAlert className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>{gap}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Grounding Sources Found via Google Search Tool */}
      {research.searchSources && research.searchSources.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-600" />
              Verified Authority & Research Sources ({research.searchSources.length})
            </h3>
            <span className="text-[11px] text-slate-500">
              Regulatory frameworks and reference architectures
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {research.searchSources.map((source, idx) => (
              <a
                key={idx}
                href={source.uri}
                target="_blank"
                rel="noreferrer"
                className="group block p-3 rounded-lg border border-slate-200 hover:border-indigo-400 bg-slate-50/50 hover:bg-indigo-50/30 transition"
              >
                <div className="text-xs font-semibold text-slate-900 group-hover:text-indigo-600 truncate flex items-center justify-between gap-1">
                  <span className="truncate">{source.title || source.uri}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500 shrink-0" />
                </div>
                <div className="text-[10px] text-slate-500 truncate mt-1">
                  {source.uri}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
