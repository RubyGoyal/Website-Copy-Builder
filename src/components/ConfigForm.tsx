import React, { useState } from 'react';
import { PillarData, PrimaryAudience, CompanySize, CaseStudy, ResearchInsight } from '../types';
import { ALL_PILLARS, getSiblingPillars } from '../data/pillarsData';
import { 
  Search, 
  Globe, 
  Layers, 
  Users, 
  Building2, 
  Crosshair, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  BookOpen, 
  FileCheck,
  Zap,
  ArrowRight,
  ShieldCheck,
  Database
} from 'lucide-react';

interface ConfigFormProps {
  selectedPillar: PillarData;
  onSelectPillar: (pillar: PillarData) => void;
  primaryAudience: PrimaryAudience;
  onChangeAudience: (aud: PrimaryAudience) => void;
  companySize: CompanySize;
  onChangeCompanySize: (size: CompanySize) => void;
  emphasiseAngle: string;
  onChangeEmphasiseAngle: (angle: string) => void;
  selectedAssessment: string;
  onChangeAssessment: (assessment: string) => void;
  onRunResearch: () => void;
  isResearching: boolean;
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
  primaryAudience,
  onChangeAudience,
  companySize,
  onChangeCompanySize,
  emphasiseAngle,
  onChangeEmphasiseAngle,
  selectedAssessment,
  onChangeAssessment,
  onRunResearch,
  isResearching,
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

  const siblingPillars = getSiblingPillars(selectedPillar.g, selectedPillar.p);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-6">
      {/* Section 1: Pillar Selection */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-blue-600" />
            1. Select Solution Pillar (48 Available)
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
                // Also default the assessment to the first one available
                if (found.a && found.a.length > 0) {
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

      {/* Section 2: Audience, Company Size, & Assessment Selection */}
      <div className="space-y-3 pt-3 border-t border-slate-100">
        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
          <Users className="w-4 h-4 text-blue-600" />
          2. Target Audience & Commercial Scope
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Primary Audience */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Primary Decision Maker
            </label>
            <select
              id="aud"
              value={primaryAudience}
              onChange={e => onChangeAudience(e.target.value as PrimaryAudience)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white text-slate-800 focus:ring-2 focus:ring-blue-500"
            >
              <option value="CIO/CTO">CIO/CTO (Focus on risk, timeline, TCO)</option>
              <option value="CISO">CISO (Focus on threat surface, DPDP compliance)</option>
              <option value="IT manager">IT manager (Focus on operational stability, 2am fixes)</option>
              <option value="mixed CxO and IT leadership">Mixed CxO and IT Leadership</option>
            </select>
          </div>

          {/* Company Size */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Company Size Segment
            </label>
            <select
              id="seg"
              value={companySize}
              onChange={e => onChangeCompanySize(e.target.value as CompanySize)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white text-slate-800 focus:ring-2 focus:ring-blue-500"
            >
              <option value="all sizes">All Sizes (SMB to Large Enterprise)</option>
              <option value="enterprise">Enterprise</option>
              <option value="mid-market">Mid-Market</option>
              <option value="SMB">SMB</option>
            </select>
          </div>
        </div>

        {/* Featured Assessment Selection */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Featured Assessment (Primary Conversion Asset)
          </label>
          <div className="flex gap-2">
            <select
              value={selectedAssessment}
              onChange={e => onChangeAssessment(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white text-slate-800 focus:ring-2 focus:ring-blue-500"
            >
              {selectedPillar.a.map((assessment, idx) => (
                <option key={idx} value={assessment}>
                  {assessment}
                </option>
              ))}
              {selectedPillar.a.length === 0 && (
                <option value="Comprehensive Architecture & Migration Readiness Review">
                  Comprehensive Architecture & Migration Readiness Review (Proposed)
                </option>
              )}
            </select>
          </div>
        </div>

        {/* Specific Angle / Emphasis */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Specific Angle or Differentiator to Emphasise (Optional)
          </label>
          <input
            id="ang"
            type="text"
            placeholder="e.g. Highlight DPDP Act 2023 compliance, Azure India regions, and sub-hour ERP failover"
            value={emphasiseAngle}
            onChange={e => onChangeEmphasiseAngle(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white text-slate-800 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Section 3: Live Research Step via Gemini Google Search Grounding */}
      <div className="pt-3 border-t border-slate-100 space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-indigo-600" />
            3. Competitor Research (Google Search Grounding)
          </label>
          {researchInsight && (
            <span className="text-[11px] font-medium text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Research Active
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500">
          Uses Gemini's native Google Search grounding to inspect live ranking competitor pages in India and pinpoint what they cover versus what they omit.
        </p>

        <button
          onClick={onRunResearch}
          disabled={isResearching || isGenerating}
          id="btn-run-research"
          className={`w-full py-2 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 border transition ${
            isResearching
              ? 'bg-indigo-50 border-indigo-200 text-indigo-700 cursor-wait'
              : 'bg-indigo-50/70 hover:bg-indigo-100/90 text-indigo-700 border-indigo-200 hover:border-indigo-300'
          }`}
        >
          <Globe className={`w-3.5 h-3.5 ${isResearching ? 'animate-spin' : ''}`} />
          {isResearching
            ? 'Grounding Gemini with Google Search in India...'
            : researchInsight
            ? 'Re-run Competitor Search Grounding'
            : 'Run Google Search Competitor Research'}
        </button>

        {/* Small Research Preview if available */}
        {researchInsight && (
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

      {/* Section 4: Generation Triggers */}
      <div className="pt-4 border-t border-slate-200 space-y-3">
        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-blue-600" />
          4. Execute 3-Call Generation Pipeline
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
