import React, { useState } from 'react';
import { PillarData, ResearchInsight, ResearchStatus } from '../types';
import { ALL_PILLARS, getSiblingPillars } from '../data/pillarsData';
import { 
  Search, 
  Globe, 
  Layers, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  RefreshCw,
  Zap,
  ArrowRight
} from 'lucide-react';

interface ConfigFormProps {
  selectedPillar: PillarData;
  onSelectPillar: (pillar: PillarData) => void;
  selectedSubPage?: string;
  onSelectSubPage?: (subPage: string) => void;
  selectedAssessment: string;
  onChangeAssessment: (assessment: string) => void;
  onRunResearch: () => void;
  isResearching: boolean;
  researchStatus: ResearchStatus;
  researchCompletedAt?: string | null;
  researchInsight?: ResearchInsight;
  onGenerateAll: () => void;
  onGenerateCopyOnly: () => void;
  onGenerateSeoOnly: () => void;
  onGenerateDesignOnly: () => void;
  isGenerating: boolean;
  activeGenerationStep: string;
}

export const ConfigForm: React.FC<ConfigFormProps> = ({
  selectedPillar,
  onSelectPillar,
  selectedSubPage = '',
  onSelectSubPage,
  selectedAssessment,
  onChangeAssessment,
  onRunResearch,
  isResearching,
  researchStatus,
  researchCompletedAt,
  researchInsight,
  onGenerateAll,
  onGenerateCopyOnly,
  onGenerateSeoOnly,
  onGenerateDesignOnly,
  isGenerating,
  activeGenerationStep
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<string>('All');

  // Unique solution groups
  const solutionGroups = ['All', ...Array.from(new Set(ALL_PILLARS.map(p => p.g)))];

  // Filtered pillars based on search & group
  const filteredPillars = ALL_PILLARS.filter(p => {
    const matchesGroup = selectedGroup === 'All' || p.g === selectedGroup;
    const matchesQuery = 
      p.p.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.g.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.k.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesGroup && matchesQuery;
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-6">
      {/* Section 1: Pillar Selection */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-blue-600" />
            1. Select Solution Pillar
          </label>
          <span className="text-xs text-slate-500 font-medium">
            Group: <strong className="text-slate-800">{selectedPillar.g}</strong>
          </span>
        </div>

        {/* Group Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 no-scrollbar text-xs">
          {solutionGroups.map(group => (
            <button
              key={group}
              onClick={() => setSelectedGroup(group)}
              className={`px-2.5 py-1 rounded-full whitespace-nowrap transition font-medium ${
                selectedGroup === group
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {group}
            </button>
          ))}
        </div>

        {/* Search & Dropdown Picker */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search pillars, keywords..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
            />
          </div>

          <select
            id="pillar-select"
            value={`${selectedPillar.g}::${selectedPillar.p}`}
            onChange={e => {
              const [group, pillarName] = e.target.value.split('::');
              const found = ALL_PILLARS.find(p => p.g === group && p.p === pillarName);
              if (found) {
                onSelectPillar(found);
                if (found.a && found.a.length > 0 && onChangeAssessment) {
                  onChangeAssessment(found.a[0]);
                }
              }
            }}
            className="w-full px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {filteredPillars.map(p => (
              <option key={`${p.g}::${p.p}`} value={`${p.g}::${p.p}`}>
                [{p.g}] {p.p}
              </option>
            ))}
          </select>
        </div>

        {/* Dedicated Target Page Selector (prevents auto-combining sub-sections) */}
        {selectedPillar.sec && selectedPillar.sec.length > 0 && (
          <div className="space-y-1.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
            <div className="flex items-center justify-between">
              <label htmlFor="target-subpage-select" className="font-bold text-slate-800 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span>Dedicated Page Scope:</span>
              </label>
              <span className="text-[10px] text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200 font-medium">
                Single Standalone Page
              </span>
            </div>
            <select
              id="target-subpage-select"
              value={selectedSubPage}
              onChange={e => onSelectSubPage && onSelectSubPage(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs font-semibold rounded-md border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">
                ★ Main Pillar Overview: {selectedPillar.p} (Single Overview Page)
              </option>
              {selectedPillar.sec.map((s, idx) => (
                <option key={idx} value={s}>
                  📄 Dedicated Sub-Page: {s} (Do not combine)
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-500">
              Generates strictly ONE standalone landing page for this chosen topic instead of combining sub-pages.
            </p>
          </div>
        )}

        {/* Single Page Dedicated Mode Banner */}
        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-blue-50/70 border border-blue-200/60 text-xs">
          <div className="flex items-center gap-2 text-blue-900 font-medium">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span>Single Dedicated Page Mode</span>
          </div>
          <span className="text-[11px] text-blue-700 bg-white px-2 py-0.5 rounded border border-blue-200 font-medium">
            Prevents auto-combining sub-pages
          </span>
        </div>

        {/* Active Pillar Highlight Card */}
        <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-200/80">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="text-xs font-bold text-blue-700 tracking-wide uppercase">
                Active Pillar Page
              </div>
              <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                {selectedPillar.p}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Internal SPOC: <span className="font-medium text-slate-700">{selectedPillar.s || "Unassigned"}</span>
              </p>
            </div>

            <button
              onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}
              className="text-xs text-slate-600 hover:text-blue-600 font-medium inline-flex items-center gap-1 bg-white px-2 py-1 rounded border border-slate-200 shadow-2xs"
            >
              {isDetailsExpanded ? 'Hide Facts' : 'View Pillar Facts'}
              {isDetailsExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Expanded Pillar Details & Case Studies */}
          {isDetailsExpanded && (
            <div className="mt-3 pt-3 border-t border-slate-200 text-xs space-y-2.5">
              <div>
                <span className="font-semibold text-slate-700">Sub-sections:</span>{' '}
                <span className="text-slate-600">
                  {selectedPillar.sec.length > 0 ? selectedPillar.sec.join(', ') : 'None explicitly mapped'}
                </span>
              </div>

              <div>
                <span className="font-semibold text-slate-700">Platforms in Group:</span>{' '}
                <span className="text-slate-600">{selectedPillar.pl.join(', ')}</span>
              </div>

              <div>
                <span className="font-semibold text-slate-700">Keywords:</span>{' '}
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedPillar.k.slice(0, 6).map((kw, i) => (
                    <span key={i} className="px-2 py-0.5 bg-slate-200/80 text-slate-700 rounded text-[11px]">
                      {kw}
                    </span>
                  ))}
                  {selectedPillar.k.length > 6 && (
                    <span className="text-[11px] text-slate-500 py-0.5">
                      +{selectedPillar.k.length - 6} more
                    </span>
                  )}
                </div>
              </div>

              <div>
                <span className="font-semibold text-slate-700">Matched Customer Proof:</span>
                {selectedPillar.cs.length > 0 ? (
                  <ul className="mt-1 space-y-1.5 pl-2 border-l-2 border-blue-400">
                    {selectedPillar.cs.map((cs, idx) => (
                      <li key={idx} className="text-slate-700">
                        <strong className="text-slate-900">{cs.c}</strong>: {cs.h}
                        {cs.m && cs.m.length > 0 && (
                          <div className="text-[11px] text-emerald-700 font-medium mt-0.5">
                            Metrics: {cs.m.join('; ')}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-500 italic mt-0.5">
                    No matched case studies. Per rule 10, proof will focus on the assessment and delivery approach without fabricating customer names.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Section 2: Competitor Research (Google Search Grounding) - Manual Trigger Only */}
      <div className="pt-3 border-t border-slate-100 space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-indigo-600" />
            2. Competitor Research (Search Grounding)
          </label>

          {/* Research State: not run, running, or complete with timestamp */}
          {researchStatus === 'not_run' && (
            <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
              Research: Not run
            </span>
          )}
          {researchStatus === 'running' && (
            <span className="text-[11px] font-medium text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200 flex items-center gap-1 animate-pulse">
              <RefreshCw className="w-3 h-3 animate-spin" /> Research: Running...
            </span>
          )}
          {researchStatus === 'complete' && (
            <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Complete {researchCompletedAt ? `(${researchCompletedAt})` : ''}
            </span>
          )}
        </div>

        <p className="text-xs text-slate-500">
          Inspects live ranking competitor pages in India and pinpoints real gaps and customer anxieties without pre-seeded answers.
        </p>

        {/* Single "Run Deep Research" Button */}
        <button
          onClick={onRunResearch}
          disabled={isResearching || isGenerating}
          id="btn-run-deep-research"
          className={`w-full py-2.5 px-3 text-xs font-bold rounded-lg flex items-center justify-center gap-2 border transition ${
            isResearching
              ? 'bg-indigo-50 border-indigo-200 text-indigo-700 cursor-wait'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs border-transparent'
          }`}
        >
          <Globe className={`w-3.5 h-3.5 ${isResearching ? 'animate-spin' : ''}`} />
          {isResearching
            ? 'Grounding Gemini with Google Search in India...'
            : 'Run Deep Research'}
        </button>

        {/* Small Research Preview if complete */}
        {researchStatus === 'complete' && researchInsight && (
          <div className="bg-indigo-50/40 rounded-lg p-3 border border-indigo-100 text-xs space-y-1.5">
            <div className="font-semibold text-indigo-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              Competitor Gaps Discovered ({researchInsight.competitorGaps.length}):
            </div>
            <ul className="list-disc pl-4 space-y-0.5 text-slate-700 text-[11px]">
              {researchInsight.competitorGaps.slice(0, 3).map((gap, idx) => (
                <li key={idx}>{gap}</li>
              ))}
            </ul>
            {researchInsight.searchSources.length > 0 && (
              <div className="text-[10px] text-indigo-700 pt-1">
                Grounding citations: {researchInsight.searchSources.length} ranking sites analyzed
              </div>
            )}
          </div>
        )}
      </div>

      {/* Section 3: Generation Triggers */}
      <div className="pt-4 border-t border-slate-200 space-y-3">
        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-blue-600" />
          3. Execute 3-Call Generation Pipeline
        </label>
        <p className="text-xs text-slate-500">
          Executes three distinct calls to Gemini so the 1,800-word landing page copy is never squeezed by SEO notes or designer direction.
        </p>

        {/* Primary Action: Run All 3 Calls */}
        <button
          onClick={onGenerateAll}
          disabled={isGenerating || isResearching}
          id="btn-generate-all"
          className={`w-full py-3 px-4 rounded-lg font-bold text-xs sm:text-sm text-white shadow-md transition flex items-center justify-center gap-2 ${
            isGenerating
              ? 'bg-blue-500 cursor-wait'
              : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-blue-500/20'
          }`}
        >
          <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin text-amber-300' : 'text-amber-300'}`} />
          {isGenerating ? activeGenerationStep || 'Generating pipeline...' : 'Generate All 3 Outputs (Sequential)'}
          {!isGenerating && <ArrowRight className="w-4 h-4" />}
        </button>

        {/* Secondary Individual Calls */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          <button
            onClick={onGenerateCopyOnly}
            disabled={isGenerating}
            className="py-1.5 px-2 text-[11px] font-medium rounded-md border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition text-center"
            title="Generate Call 1: Landing Page Copy (1,400-2,200 words)"
          >
            Call 1: Copy
          </button>
          <button
            onClick={onGenerateSeoOnly}
            disabled={isGenerating}
            className="py-1.5 px-2 text-[11px] font-medium rounded-md border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition text-center"
            title="Generate Call 2: SEO Handover Pack & JSON-LD"
          >
            Call 2: SEO Pack
          </button>
          <button
            onClick={onGenerateDesignOnly}
            disabled={isGenerating}
            className="py-1.5 px-2 text-[11px] font-medium rounded-md border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition text-center"
            title="Generate Call 3: Designer Notes (<500 words)"
          >
            Call 3: Design
          </button>
        </div>
      </div>
    </div>
  );
};
