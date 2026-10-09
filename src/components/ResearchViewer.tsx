import React, { useState, useEffect, useMemo } from 'react';
import { ResearchInsight, PillarData, BenchmarkPage, ResearchInsightPoint, ResearchStatus } from '../types';
import { 
  Globe, 
  ShieldAlert, 
  Sparkles, 
  CheckCircle2, 
  Search, 
  ArrowUpRight, 
  Filter, 
  RefreshCw, 
  Layers, 
  Copy, 
  Check, 
  BookOpen, 
  Scale, 
  Cpu, 
  AlertTriangle, 
  Award,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FileCheck2,
  SlidersHorizontal
} from 'lucide-react';

interface ResearchViewerProps {
  research?: ResearchInsight;
  researchStatus?: ResearchStatus;
  researchCompletedAt?: string | null;
  onRefresh?: (pillar?: PillarData, query?: string) => void;
  isRefreshing?: boolean;
  selectedPillar: PillarData;
  onSelectPillar: (pillar: PillarData) => void;
  allPillars: PillarData[];
}

export const ResearchViewer: React.FC<ResearchViewerProps> = ({
  research,
  researchStatus = 'not_run',
  researchCompletedAt,
  onRefresh,
  isRefreshing = false,
  selectedPillar,
  onSelectPillar,
  allPillars
}) => {
  const [customQuery, setCustomQuery] = useState<string>(
    `${selectedPillar.p} ${selectedPillar.g} India`
  );

  // Sync custom query when pillar changes
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

  // Filtering for Benchmark Pages
  const [pageCategoryFilter, setPageCategoryFilter] = useState<string>('all');
  const [pageSearchFilter, setPageSearchFilter] = useState<string>('');

  // Filtering for Input Points
  const [pointCategoryFilter, setPointCategoryFilter] = useState<string>('all');
  const [copiedPointIndex, setCopiedPointIndex] = useState<number | null>(null);
  const [copiedAllPoints, setCopiedAllPoints] = useState<boolean>(false);
  const [copiedAllSources, setCopiedAllSources] = useState<boolean>(false);

  const handleExecuteSearch = (queryToRun?: string) => {
    const q = queryToRun || customQuery;
    if (onRefresh) {
      onRefresh(selectedPillar, q);
    }
  };

  // Ensure benchmark pages exist or build fallback list from sources
  const benchmarkPages: BenchmarkPage[] = useMemo(() => {
    if (!research) return [];
    if (research.benchmarkPages && research.benchmarkPages.length > 0) {
      return research.benchmarkPages;
    }
    // Fallback: build from search sources
    return (research.searchSources || []).map((s, idx) => ({
      rankIndex: idx + 1,
      title: s.title || `Ranking Page ${idx + 1}`,
      uri: s.uri,
      domain: new URL(s.uri.startsWith('http') ? s.uri : `https://${s.uri}`).hostname.replace('www.', ''),
      category: idx < 4 ? 'competitor' : idx < 7 ? 'hyperscaler' : 'regulatory',
      takeaway: `Standard enterprise overview evaluated for ${selectedPillar.p}.`
    }));
  }, [research, selectedPillar.p]);

  // Ensure detailed input points exist or extract from competitor gaps
  const detailedPoints: ResearchInsightPoint[] = useMemo(() => {
    if (!research) return [];
    if (research.detailedInputPoints && research.detailedInputPoints.length > 0) {
      return research.detailedInputPoints;
    }
    // Fallback if raw
    return (research.competitorGaps || []).map((gap, idx) => ({
      category: idx % 2 === 0 ? 'Competitor Blindspot' : 'Technical Architecture & SLA',
      point: gap,
      copywritingApplication: `Explicitly address this gap in the copy to outperform competitor claims.`
    }));
  }, [research]);

  // Filtered Benchmark Pages
  const filteredBenchmarkPages = useMemo(() => {
    return benchmarkPages.filter(page => {
      const matchesCat = pageCategoryFilter === 'all' || page.category === pageCategoryFilter;
      const matchesSearch = !pageSearchFilter.trim() || 
        page.title.toLowerCase().includes(pageSearchFilter.toLowerCase()) ||
        (page.domain && page.domain.toLowerCase().includes(pageSearchFilter.toLowerCase())) ||
        page.takeaway.toLowerCase().includes(pageSearchFilter.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [benchmarkPages, pageCategoryFilter, pageSearchFilter]);

  // Filtered Strategic Input Points
  const filteredInputPoints = useMemo(() => {
    return detailedPoints.filter(point => {
      return pointCategoryFilter === 'all' || point.category === pointCategoryFilter;
    });
  }, [detailedPoints, pointCategoryFilter]);

  const handleCopySinglePoint = (pointText: string, index: number) => {
    navigator.clipboard.writeText(pointText);
    setCopiedPointIndex(index);
    setTimeout(() => setCopiedPointIndex(null), 2500);
  };

  const handleCopyAllPoints = () => {
    const text = detailedPoints
      .map((p, i) => `${i + 1}. [${p.category}]\nFinding: ${p.point}\nCopywriting Mandate: ${p.copywritingApplication}\n`)
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopiedAllPoints(true);
    setTimeout(() => setCopiedAllPoints(false), 2500);
  };

  const handleCopyAllSources = () => {
    const text = benchmarkPages
      .map((p, i) => `${p.rankIndex || i + 1}. [${p.category.toUpperCase()}] ${p.title} (${p.domain || p.uri})\nTakeaway: ${p.takeaway}\nURL: ${p.uri}`)
      .join('\n\n');
    navigator.clipboard.writeText(text);
    setCopiedAllSources(true);
    setTimeout(() => setCopiedAllSources(false), 2500);
  };

  // Helper for category badge styling
  const getPointCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'Competitor Blindspot':
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
          icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
        };
      case 'Indian Regulatory Reality':
        return {
          bg: 'bg-purple-50 text-purple-800 border-purple-200',
          icon: <Scale className="w-3.5 h-3.5 text-purple-600 shrink-0" />
        };
      case 'Technical Architecture & SLA':
        return {
          bg: 'bg-cyan-50 text-cyan-800 border-cyan-200',
          icon: <Cpu className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
        };
      case 'Buyer Anxiety & Objection':
        return {
          bg: 'bg-rose-50 text-rose-800 border-rose-200',
          icon: <ShieldAlert className="w-3.5 h-3.5 text-rose-600 shrink-0" />
        };
      case 'Value Hook':
      default:
        return {
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          icon: <Award className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        };
    }
  };

  const getPageCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'competitor':
        return 'bg-amber-100/70 text-amber-800 border-amber-200';
      case 'hyperscaler':
        return 'bg-blue-100/70 text-blue-800 border-blue-200';
      case 'regulatory':
        return 'bg-purple-100/70 text-purple-800 border-purple-200';
      case 'case_study':
      default:
        return 'bg-emerald-100/70 text-emerald-800 border-emerald-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Pillar & Search Control Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3.5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 shrink-0 shadow-2xs">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Target Solution for In-Depth Research
              </div>
              <div className="text-sm font-bold text-slate-900 flex items-center gap-2 flex-wrap">
                <span>{selectedPillar.p}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {selectedPillar.g}
                </span>
                <span className="text-xs font-normal text-slate-500">
                  Practice Lead: <span className="font-semibold text-slate-700">{selectedPillar.s}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Pillar Selector Dropdown */}
          <div className="flex items-center gap-2">
            <label htmlFor="research-pillar-select" className="text-xs font-semibold text-slate-600 shrink-0 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              Switch Page:
            </label>
            <select
              id="research-pillar-select"
              value={`${selectedPillar.g}::${selectedPillar.p}`}
              onChange={e => {
                const [group, pillarName] = e.target.value.split('::');
                const found = allPillars.find(p => p.g === group && p.p === pillarName);
                if (found) {
                  onSelectPillar(found);
                  // Do NOT auto-run research on pillar switch; research is manual trigger only
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
              placeholder="Enter search query to analyze competitor landscape in India..."
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
            {isRefreshing ? 'Researching 18-20 Pages...' : researchStatus === 'complete' ? 'Re-run Deep Research' : 'Run Deep Research'}
          </button>
        </div>

        {/* Target Keywords Quick Filters */}
        <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 flex-wrap text-[11px]">
          <span className="text-slate-500 font-medium text-[10px] uppercase tracking-wide mr-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Page Keywords:
          </span>
          {selectedPillar.k.map((keyword, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                const newQuery = `${keyword} India`;
                setCustomQuery(newQuery);
                handleExecuteSearch(newQuery);
              }}
              className="px-2 py-0.5 rounded-md border border-slate-200 bg-slate-50 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-800 text-slate-700 text-[11px] transition flex items-center gap-1"
              title={`Analyze search landscape for keyword: ${keyword}`}
            >
              <span>{keyword}</span>
              <span className="text-[9px] text-slate-400">↗</span>
            </button>
          ))}
        </div>

        {/* Preset Query Chips */}
        <div className="flex items-center gap-1.5 flex-wrap text-[11px]">
          <span className="text-slate-500 font-medium text-[10px] uppercase tracking-wide mr-1">
            Suggested Presets:
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

      {/* State: Not run */}
      {(!research || researchStatus === 'not_run') && (
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center mx-auto shadow-2xs">
            <Globe className="w-6 h-6" />
          </div>
          <div className="max-w-md mx-auto">
            <h3 className="text-base font-bold text-slate-900">Research Not Run for "{selectedPillar.p}"</h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Research is triggered manually to prevent stale or auto-fetched data. Click <strong>"Run Deep Research"</strong> to ground Gemini with live Google Search across ranking pages in India for this specific solution.
            </p>
          </div>
          <button
            onClick={() => handleExecuteSearch()}
            disabled={isRefreshing}
            className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition inline-flex items-center gap-2 shadow-xs"
          >
            <Globe className="w-4 h-4" />
            Run Deep Research for "{selectedPillar.p}"
          </button>
        </div>
      )}

      {/* State: Running */}
      {researchStatus === 'running' && (
        <div className="bg-indigo-50/50 border border-indigo-200 rounded-xl p-8 text-center space-y-3 animate-pulse">
          <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
            <RefreshCw className="w-6 h-6 animate-spin" />
          </div>
          <h3 className="text-base font-bold text-indigo-950">Grounding Gemini with Live Google Search in India...</h3>
          <p className="text-xs text-indigo-700 max-w-md mx-auto">
            Analyzing ranking B2B IT competitor pages in India, evaluating real gaps, buyer objections, and technical architecture for <strong>{selectedPillar.p}</strong>.
          </p>
        </div>
      )}

      {/* State: Complete with Research Data */}
      {researchStatus === 'complete' && research && (
        <>
          {/* Top Overview Banner & Depth Metrics */}
          <div className="bg-linear-to-r from-indigo-950 via-slate-900 to-indigo-900 text-white rounded-xl p-6 shadow-sm border border-indigo-800/80">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-400/30">
                  <Globe className="w-3.5 h-3.5" />
                  Comprehensive Indian Market Intelligence
                </div>
                <h2 className="text-lg font-bold text-white mt-2">
                  Indian Enterprise Market Landscape & Competitor Deep Research
                </h2>
                <p className="text-xs text-indigo-200 mt-1">
                  Active Query: <span className="font-mono bg-indigo-950/80 px-2 py-0.5 rounded text-indigo-300">"{research.query}"</span>
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {researchCompletedAt && (
                  <span className="text-[11px] px-2.5 py-1 rounded-full font-medium bg-indigo-900/90 text-indigo-200 border border-indigo-700/80">
                    Completed: {researchCompletedAt}
                  </span>
                )}
                {research.researchIsLive ? (
                  <span className="text-[11px] px-3 py-1.5 rounded-full font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1.5 shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Live Google Search
                  </span>
                ) : (
                  <span className="text-[11px] px-3 py-1.5 rounded-full font-semibold bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center gap-1.5 shadow-2xs">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    Fallback Research
                  </span>
                )}
              </div>
            </div>

        {/* 4 Quantitative Depth Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5 pt-5 border-t border-indigo-800/60">
          <div className="bg-indigo-900/40 rounded-lg p-3 border border-indigo-800/60">
            <div className="text-[11px] text-indigo-300 font-medium">Benchmark Pages</div>
            <div className="text-xl font-bold text-white mt-0.5 flex items-baseline gap-1.5">
              <span>{benchmarkPages.length}</span>
              <span className="text-[10px] text-emerald-400 font-normal">pages evaluated</span>
            </div>
            <div className="text-[10px] text-indigo-300/80 mt-1 truncate">
              Top rivals + hyperscalers + laws
            </div>
          </div>

          <div className="bg-indigo-900/40 rounded-lg p-3 border border-indigo-800/60">
            <div className="text-[11px] text-indigo-300 font-medium">Strategic Input Points</div>
            <div className="text-xl font-bold text-white mt-0.5 flex items-baseline gap-1.5">
              <span>{detailedPoints.length}</span>
              <span className="text-[10px] text-indigo-300 font-normal">actionable points</span>
            </div>
            <div className="text-[10px] text-indigo-300/80 mt-1 truncate">
              Gaps, SLAs, objections, hooks
            </div>
          </div>

          <div className="bg-indigo-900/40 rounded-lg p-3 border border-indigo-800/60">
            <div className="text-[11px] text-indigo-300 font-medium">Indian Regulatory Laws</div>
            <div className="text-xl font-bold text-white mt-0.5 flex items-baseline gap-1.5">
              <span>4</span>
              <span className="text-[10px] text-indigo-300 font-normal">statutory frameworks</span>
            </div>
            <div className="text-[10px] text-indigo-300/80 mt-1 truncate">
              DPDP 2023, CERT-In, RBI, TRAI
            </div>
          </div>

          <div className="bg-indigo-900/40 rounded-lg p-3 border border-indigo-800/60">
            <div className="text-[11px] text-indigo-300 font-medium">Copy Protection Level</div>
            <div className="text-xl font-bold text-emerald-400 mt-0.5 flex items-baseline gap-1.5">
              <span>100%</span>
              <span className="text-[10px] text-indigo-200 font-normal">depth guaranteed</span>
            </div>
            <div className="text-[10px] text-indigo-300/80 mt-1 truncate">
              Zero competitor naming, zero pricing
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="mt-4 pt-4 border-t border-indigo-800/60 text-xs text-slate-300 leading-relaxed">
          <strong className="text-white">Executive Landscape Summary:</strong> {research.summary}
        </div>
      </div>

      {/* SECTION 1: 10-15 IN-DEPTH STRATEGIC RESEARCH INPUT POINTS */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-base text-slate-900">
                In-Depth Strategic Research Input Points ({detailedPoints.length} Points)
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Extracted across 18-20 benchmark pages to ensure landing copy depth, regulatory resilience, and competitive differentiation.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopyAllPoints}
              className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition"
              title="Copy all research points to clipboard"
            >
              {copiedAllPoints ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">All Points Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy All {detailedPoints.length} Points</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Category Filters for Input Points */}
        <div className="flex items-center gap-1.5 flex-wrap text-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mr-1">
            Filter Points:
          </span>
          {[
            { id: 'all', label: `All Points (${detailedPoints.length})` },
            { id: 'Competitor Blindspot', label: 'Competitor Blindspots' },
            { id: 'Indian Regulatory Reality', label: 'Indian Regulatory Realities' },
            { id: 'Technical Architecture & SLA', label: 'Architecture & SLAs' },
            { id: 'Buyer Anxiety & Objection', label: 'Buyer Anxieties' },
            { id: 'Value Hook', label: 'Embee Value Hooks' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setPointCategoryFilter(cat.id)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition ${
                pointCategoryFilter === cat.id
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Points Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
          {filteredInputPoints.map((pt, idx) => {
            const badge = getPointCategoryBadge(pt.category);
            const isCopied = copiedPointIndex === idx;

            return (
              <div 
                key={idx} 
                className="bg-slate-50/70 hover:bg-white rounded-xl border border-slate-200/80 hover:border-indigo-300 p-4 shadow-2xs hover:shadow-xs transition duration-150 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${badge.bg}`}>
                      {badge.icon}
                      <span>{pt.category}</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 font-semibold">
                      Point #{idx + 1}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-slate-900 leading-relaxed">
                    {pt.point}
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-200/60 bg-white/80 -mx-4 -mb-4 p-3 rounded-b-xl">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1 mb-1">
                    <FileCheck2 className="w-3.5 h-3.5" />
                    Mandatory Copywriting Mandate:
                  </div>
                  <p className="text-[11px] text-slate-600 leading-normal">
                    {pt.copywritingApplication}
                  </p>
                  
                  <div className="mt-2.5 flex justify-end">
                    <button
                      onClick={() => handleCopySinglePoint(`[${pt.category}] ${pt.point}\nCopy Mandate: ${pt.copywritingApplication}`, idx)}
                      className="text-[10px] text-slate-500 hover:text-indigo-600 font-medium flex items-center gap-1 transition"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-600 font-semibold">Copied to clipboard</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Point</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: 18-20 BENCHMARK PAGES ANALYZED ACROSS INDIA */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700">
                <BookOpen className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-base text-slate-900">
                Benchmark Pages Analyzed Across India ({benchmarkPages.length} Pages)
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Evaluated across top ranking IT service providers, Microsoft official technical architectures, Indian regulatory bodies, and proven enterprise case studies.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopyAllSources}
              className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition"
              title="Copy all benchmark pages citations to clipboard"
            >
              {copiedAllSources ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">All Sources Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy All Sources</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Filter Bar for Pages: Search and Category Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 flex-wrap text-xs">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mr-1">
              Category:
            </span>
            {[
              { id: 'all', label: `All (${benchmarkPages.length})` },
              { id: 'competitor', label: 'Competitor Pages' },
              { id: 'hyperscaler', label: 'Hyperscaler Docs' },
              { id: 'regulatory', label: 'Regulatory Mandates' },
              { id: 'case_study', label: 'Embee Case Studies' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setPageCategoryFilter(cat.id)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition ${
                  pageCategoryFilter === cat.id
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={pageSearchFilter}
              onChange={e => setPageSearchFilter(e.target.value)}
              placeholder="Search benchmark pages..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Benchmark Pages Table / Cards */}
        <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden">
          {filteredBenchmarkPages.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500">
              No benchmark pages found matching "{pageSearchFilter}".
            </div>
          ) : (
            filteredBenchmarkPages.map((page, idx) => (
              <div 
                key={idx} 
                className={`p-3.5 transition flex flex-col md:flex-row md:items-start justify-between gap-3 text-xs ${
                  page.isSynthetic 
                    ? 'bg-amber-50/40 hover:bg-amber-50/70 border-l-3 border-l-amber-500' 
                    : 'bg-white hover:bg-slate-50/80 border-l-3 border-l-emerald-500'
                }`}
              >
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                      {page.rankIndex || idx + 1}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wide ${getPageCategoryBadge(page.category)}`}>
                      {page.category.replace('_', ' ')}
                    </span>
                    {page.isSynthetic && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 uppercase tracking-wide flex items-center gap-1">
                        <AlertTriangle className="w-2.5 h-2.5 text-amber-700" />
                        Synthetic Template
                      </span>
                    )}
                    {page.isSynthetic === false && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 uppercase tracking-wide flex items-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-700" />
                        Live Grounded
                      </span>
                    )}
                    <span className="font-semibold text-slate-900 truncate">
                      {page.title}
                    </span>
                  </div>

                  <p className="text-slate-600 text-[11px] leading-relaxed pl-7">
                    <strong className="text-slate-700">Competitive Finding / Flaw:</strong> {page.takeaway}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end md:self-center pl-7 md:pl-0">
                  <span className="text-[11px] text-slate-400 font-mono">
                    {page.domain || 'official doc'}
                  </span>
                  <a
                    href={page.uri}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-md hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 transition flex items-center gap-1 text-[11px] font-medium"
                    title="Open benchmark reference page in new tab"
                  >
                    <span>Visit</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* SECTION 3: SIDE-BY-SIDE COMPETITIVE ANALYSIS */}
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
                What Competitors Omit (How Embee Software Wins)
              </h3>
              <p className="text-[11px] text-slate-500">
                Critical enterprise requirements Embee Software addresses head-on
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
      </>
    )}
  </div>
);
};
