import React, { useState, useMemo } from 'react';
import { ALL_PILLARS, buildSharedBrief, LANDING_PAGE_PROMPT_TEMPLATE, SEO_PROMPT_TEMPLATE, DESIGNER_PROMPT_TEMPLATE } from './data/pillarsData';
import { SAMPLE_LANDING_COPY, SAMPLE_SEO_PACK, SAMPLE_DESIGNER_NOTES } from './data/sampleOutput';
import { PillarData, PrimaryAudience, CompanySize, ResearchInsight } from './types';
import { auditLandingPageCopy, autoFixBrandIssues } from './utils/brandAudit';
import { auditSeoAndAiSeo } from './utils/seoAudit';
import { generateSemanticHtml, downloadFile } from './utils/exportHelpers';
import { Header } from './components/Header';
import { ConfigForm } from './components/ConfigForm';
import { LandingCopyViewer } from './components/LandingCopyViewer';
import { SeoNotesViewer } from './components/SeoNotesViewer';
import { DesignerNotesViewer } from './components/DesignerNotesViewer';
import { ResearchViewer } from './components/ResearchViewer';
import { AuditReportViewer } from './components/AuditReportViewer';
import { SeoScoreViewer } from './components/SeoScoreViewer';
import { LiveMockupViewer } from './components/LiveMockupViewer';
import { TopicClusterViewer } from './components/TopicClusterViewer';
import { LeadGenStrategyViewer } from './components/LeadGenStrategyViewer';
import { 
  FileText, 
  Tag, 
  Palette, 
  Globe, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Layers,
  Sparkles,
  ArrowRight,
  Monitor,
  BarChart2,
  GitFork,
  Target
} from 'lucide-react';

export function App() {
  // State for selected pillar & configuration
  const [selectedPillar, setSelectedPillar] = useState<PillarData>(ALL_PILLARS[0]);
  const [primaryAudience, setPrimaryAudience] = useState<PrimaryAudience>('CIO/CTO');
  const [companySize, setCompanySize] = useState<CompanySize>('all sizes');
  const [emphasiseAngle, setEmphasiseAngle] = useState<string>('Highlight DPDP Act 2023 compliance, Azure India Central region resilience, and sub-hour ERP failover');
  const [selectedAssessment, setSelectedAssessment] = useState<string>(
    ALL_PILLARS[0].a && ALL_PILLARS[0].a.length > 0 ? ALL_PILLARS[0].a[0] : 'Azure Well-Architected and Migration Assessment'
  );

  // Active view tab
  const [activeTab, setActiveTab] = useState<'mockup' | 'copy' | 'seo_score' | 'seo' | 'clusters' | 'leadgen' | 'research' | 'audit' | 'designer'>('mockup');

  // Outputs state
  const [landingCopy, setLandingCopy] = useState<string>(SAMPLE_LANDING_COPY);
  const [seoNotes, setSeoNotes] = useState<string>(SAMPLE_SEO_PACK);
  const [designerNotes, setDesignerNotes] = useState<string>(SAMPLE_DESIGNER_NOTES);

  // Live Research Insight
  const [researchInsight, setResearchInsight] = useState<ResearchInsight | undefined>({
    query: 'Azure cloud consulting services India',
    summary: 'Current top-ranking pages in India from large legacy SIs feature generic corporate marketing but omit Indian data sovereignty nuances and practical migration execution timelines.',
    rankingThemes: [
      'Broad digital transformation and cloud enablement messaging',
      'Generic multi-cloud positioning without deep Microsoft specialization',
      'High-level security statements without local regulatory references',
      'Global case studies disconnected from Indian infrastructure realities'
    ],
    competitorGaps: [
      'Digital Personal Data Protection (DPDP) Act 2023 compliance architecture',
      'Specific Azure India region topologies (Central India/Pune, South India/Chennai)',
      'Sub-hour RTO/RPO guarantees for legacy ERP cutovers',
      'Local 24x7 NOC/SOC coverage with 500+ Indian engineers',
      'Predictable 3-year TCO modeling using Azure Hybrid Benefit'
    ],
    searchSources: [
      { title: 'Cloud Advisory Services - Microsoft Azure India', uri: 'https://azure.microsoft.com/en-in/solutions/cloud-advisory/' },
      { title: 'Enterprise Cloud Migration & Strategy', uri: 'https://www.gartner.com/en/information-technology/insights/cloud-strategy' },
      { title: 'DPDP Act 2023 Regulatory Guide for Indian Enterprise IT', uri: 'https://www.meity.gov.in/data-protection-framework' }
    ]
  });

  // Processing indicators
  const [isResearching, setIsResearching] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [activeGenerationStep, setActiveGenerationStep] = useState<string>('');
  const [notification, setNotification] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  // Live brand audit of landing copy
  const auditReport = useMemo(() => {
    return auditLandingPageCopy(landingCopy);
  }, [landingCopy]);

  // Live SEO and AI SEO (GEO) Scorecard
  const seoAuditReport = useMemo(() => {
    return auditSeoAndAiSeo(landingCopy, seoNotes, selectedPillar, primaryAudience);
  }, [landingCopy, seoNotes, selectedPillar, primaryAudience]);

  const showNotification = (type: 'success' | 'error' | 'info', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(prev => (prev?.message === message ? null : prev));
    }, 6000);
  };

  // Helper to build shared brief with current parameters
  const getCurrentBrief = () => {
    const siblingPillars = ALL_PILLARS
      .filter(p => p.g === selectedPillar.g && p.p !== selectedPillar.p)
      .map(p => p.p);

    return buildSharedBrief({
      pillarName: selectedPillar.p,
      solutionGroup: selectedPillar.g,
      internalOwner: selectedPillar.s,
      sections: selectedPillar.sec,
      platforms: selectedPillar.pl,
      assessments: selectedAssessment ? [selectedAssessment] : selectedPillar.a,
      targetKeywords: selectedPillar.k,
      primaryAudience,
      companySize,
      emphasiseAngle,
      matchedCaseStudies: selectedPillar.cs,
      siblingPillars,
      researchBriefText: researchInsight
        ? `Summary: ${researchInsight.summary}\nCompetitor Gaps: ${researchInsight.competitorGaps.join('; ')}\nRanking Themes: ${researchInsight.rankingThemes.join('; ')}`
        : undefined
    });
  };

  // When pillar changes, also update assessment and refresh research insight
  const handleSelectPillar = (newPillar: PillarData) => {
    setSelectedPillar(newPillar);
    if (newPillar.a && newPillar.a.length > 0) {
      setSelectedAssessment(newPillar.a[0]);
    }
    // Automatically trigger research for the new pillar
    handleRunResearch(newPillar);
  };

  // Run Google Search Competitor Research
  const handleRunResearch = async (targetPillar?: PillarData, customQuery?: string) => {
    const pillarToUse = targetPillar || selectedPillar;
    setIsResearching(true);
    showNotification('info', `Running competitor research for "${pillarToUse.p}" in India...`);
    try {
      const res = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: customQuery || `${pillarToUse.p} ${pillarToUse.g} India`,
          pillarName: pillarToUse.p,
          solutionGroup: pillarToUse.g,
          keywords: pillarToUse.k
        })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to complete search research');
      }

      const data: ResearchInsight = await res.json();
      setResearchInsight(data);
      if (data.isQuotaLimited) {
        showNotification('success', `Competitor gaps loaded for "${pillarToUse.p}" (${pillarToUse.g}).`);
      } else {
        showNotification('success', `Live Google grounding completed for "${pillarToUse.p}".`);
      }
    } catch (err: any) {
      console.error(err);
      showNotification('error', err.message || 'Error running search research');
    } finally {
      setIsResearching(false);
    }
  };

  // Auto-Fix Brand Violations
  const handleAutoFix = () => {
    const fixed = autoFixBrandIssues(landingCopy);
    setLandingCopy(fixed);
    showNotification('success', 'Auto-fix applied: Sanitized em/en dashes, spelling, and brand rules.');
  };

  // Sequential 3-Call Pipeline Execution
  const handleGenerateAll = async () => {
    setIsGenerating(true);
    setActiveGenerationStep('Building shared brief & facts...');
    const brief = getCurrentBrief();

    try {
      // Call 1 of 3: Landing Page Copy
      setActiveGenerationStep('Call 1 of 3: Crafting 1,800-word Landing Copy...');
      const copyRes = await fetch('/api/generate-copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brief,
          promptTemplate: LANDING_PAGE_PROMPT_TEMPLATE
        })
      });

      if (!copyRes.ok) {
        const errorData = await copyRes.json();
        throw new Error(errorData.error || 'Failed to generate landing copy');
      }
      const copyData = await copyRes.json();
      setLandingCopy(copyData.landingCopy);
      setActiveTab('copy');

      // Call 2 of 3: SEO Handover Pack
      setActiveGenerationStep('Call 2 of 3: Generating SEO Handover & JSON-LD Schemas...');
      const seoRes = await fetch('/api/generate-seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brief,
          promptTemplate: SEO_PROMPT_TEMPLATE
        })
      });

      if (!seoRes.ok) {
        const errorData = await seoRes.json();
        throw new Error(errorData.error || 'Failed to generate SEO pack');
      }
      const seoData = await seoRes.json();
      setSeoNotes(seoData.seoNotes);

      // Call 3 of 3: Designer Notes
      setActiveGenerationStep('Call 3 of 3: Assembling In-House Designer Notes...');
      const designRes = await fetch('/api/generate-designer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brief,
          promptTemplate: DESIGNER_PROMPT_TEMPLATE
        })
      });

      if (!designRes.ok) {
        const errorData = await designRes.json();
        throw new Error(errorData.error || 'Failed to generate designer notes');
      }
      const designData = await designRes.json();
      setDesignerNotes(designData.designerNotes);

      showNotification('success', 'All 3 outputs generated successfully with full brand compliance.');
    } catch (err: any) {
      console.error('Generation error:', err);
      showNotification('error', err.message || 'Generation failed. Check server logs.');
    } finally {
      setIsGenerating(false);
      setActiveGenerationStep('');
    }
  };

  // Generate Copy Only (Call 1)
  const handleGenerateCopyOnly = async () => {
    setIsGenerating(true);
    setActiveGenerationStep('Generating Call 1: Landing Page Copy...');
    try {
      const brief = getCurrentBrief();
      const res = await fetch('/api/generate-copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brief,
          promptTemplate: LANDING_PAGE_PROMPT_TEMPLATE
        })
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to generate copy');
      }
      const data = await res.json();
      setLandingCopy(data.landingCopy);
      setActiveTab('copy');
      showNotification('success', 'Landing copy generated successfully.');
    } catch (err: any) {
      showNotification('error', err.message || 'Error generating copy');
    } finally {
      setIsGenerating(false);
      setActiveGenerationStep('');
    }
  };

  // Generate SEO Only (Call 2)
  const handleGenerateSeoOnly = async () => {
    setIsGenerating(true);
    setActiveGenerationStep('Generating Call 2: SEO Handover Pack...');
    try {
      const brief = getCurrentBrief();
      const res = await fetch('/api/generate-seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brief,
          promptTemplate: SEO_PROMPT_TEMPLATE
        })
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to generate SEO');
      }
      const data = await res.json();
      setSeoNotes(data.seoNotes);
      setActiveTab('seo');
      showNotification('success', 'SEO handover pack generated successfully.');
    } catch (err: any) {
      showNotification('error', err.message || 'Error generating SEO');
    } finally {
      setIsGenerating(false);
      setActiveGenerationStep('');
    }
  };

  // Generate Design Only (Call 3)
  const handleGenerateDesignOnly = async () => {
    setIsGenerating(true);
    setActiveGenerationStep('Generating Call 3: Designer Notes...');
    try {
      const brief = getCurrentBrief();
      const res = await fetch('/api/generate-designer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brief,
          promptTemplate: DESIGNER_PROMPT_TEMPLATE
        })
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to generate design notes');
      }
      const data = await res.json();
      setDesignerNotes(data.designerNotes);
      setActiveTab('designer');
      showNotification('success', 'Designer notes generated successfully.');
    } catch (err: any) {
      showNotification('error', err.message || 'Error generating design notes');
    } finally {
      setIsGenerating(false);
      setActiveGenerationStep('');
    }
  };

  // Reset to clean state
  const handleReset = () => {
    setSelectedPillar(ALL_PILLARS[0]);
    setPrimaryAudience('CIO/CTO');
    setCompanySize('all sizes');
    setEmphasiseAngle('');
    setSelectedAssessment(ALL_PILLARS[0].a[0] || '');
    showNotification('info', 'Form reset to default Cloud Advisory & Consulting pillar.');
  };

  // Load sample demo data
  const handleLoadSample = () => {
    const cloudAdvisoryPillar = ALL_PILLARS.find(p => p.p === 'Cloud Advisory & Consulting') || ALL_PILLARS[0];
    setSelectedPillar(cloudAdvisoryPillar);
    setPrimaryAudience('CIO/CTO');
    setCompanySize('all sizes');
    setEmphasiseAngle('Focus on DPDP Act 2023 compliance, Azure India Central region resilience, and sub-hour ERP failover');
    setSelectedAssessment('Azure Well-Architected and Migration Assessment');
    setLandingCopy(SAMPLE_LANDING_COPY);
    setSeoNotes(SAMPLE_SEO_PACK);
    setDesignerNotes(SAMPLE_DESIGNER_NOTES);
    setActiveTab('copy');
    showNotification('success', 'Loaded approved Cloud Advisory & Consulting sample pack.');
  };

  // Download complete handover pack in Markdown
  const handleDownloadAll = () => {
    const slug = selectedPillar.p.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const fullContent = `# EMBEE SOFTWARE - COMPLETE PRODUCTION HANDOVER PACK
PILLAR: ${selectedPillar.p}
SOLUTION GROUP: ${selectedPillar.g}
AUDIENCE: ${primaryAudience} (${companySize})
EXPORTED: ${new Date().toISOString()}

================================================================================
PART 1: FINISHED LANDING PAGE COPY
================================================================================

${landingCopy}

================================================================================
PART 2: SEO HANDOVER PACK & SCHEMAS
================================================================================

${seoNotes}

================================================================================
PART 3: DESIGNER DIRECTION NOTES
================================================================================

${designerNotes}
`;

    downloadFile(`embee-software-${slug}-handover-pack.md`, fullContent, 'text/markdown;charset=utf-8;');
    showNotification('success', 'Exported complete Markdown handover pack.');
  };

  // Export Semantic HTML
  const handleDownloadHtml = () => {
    const slug = selectedPillar.p.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const html = generateSemanticHtml(landingCopy, seoNotes, selectedPillar, primaryAudience);
    downloadFile(`embee-${slug}-landing-page.html`, html, 'text/html;charset=utf-8;');
    showNotification('success', 'Exported complete semantic HTML page ready for CMS publication.');
  };

  // Export JSON Project Bundle
  const handleDownloadJson = () => {
    const slug = selectedPillar.p.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const bundle = {
      pillar: selectedPillar.p,
      solutionGroup: selectedPillar.g,
      internalOwner: selectedPillar.s,
      audience: primaryAudience,
      companySize,
      selectedAssessment,
      seoAudit: {
        traditionalScore: seoAuditReport.traditionalScore,
        aiSeoScore: seoAuditReport.aiSeoScore,
        overallScore: seoAuditReport.overallScore,
        grade: seoAuditReport.grade
      },
      brandAudit: {
        score: auditReport.score,
        passed: auditReport.passed
      },
      landingCopy,
      seoNotes,
      designerNotes,
      research: researchInsight,
      exportedAt: new Date().toISOString()
    };
    downloadFile(`embee-${slug}-project-bundle.json`, JSON.stringify(bundle, null, 2), 'application/json');
    showNotification('success', 'Exported JSON project bundle.');
  };

  // Print / PDF
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      {/* Header */}
      <Header
        onLoadSample={handleLoadSample}
        onReset={handleReset}
        hasOutput={!!landingCopy}
        onDownloadAll={handleDownloadAll}
        onDownloadHtml={handleDownloadHtml}
        onDownloadJson={handleDownloadJson}
        onPrint={handlePrint}
        activePillarName={selectedPillar.p}
      />

      {/* Global Notification Banner */}
      {notification && (
        <div className={`py-2 px-4 text-xs font-semibold flex items-center justify-center gap-2 border-b transition ${
          notification.type === 'error'
            ? 'bg-rose-600 text-white border-rose-700'
            : notification.type === 'success'
            ? 'bg-emerald-600 text-white border-emerald-700'
            : 'bg-blue-600 text-white border-blue-700'
        }`}>
          {notification.type === 'error' ? (
            <AlertCircle className="w-4 h-4" />
          ) : (
            <CheckCircle2 className="w-4 h-4" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Main Workspace Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Form & Configuration (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <ConfigForm
              selectedPillar={selectedPillar}
              onSelectPillar={handleSelectPillar}
              primaryAudience={primaryAudience}
              onChangeAudience={setPrimaryAudience}
              companySize={companySize}
              onChangeCompanySize={setCompanySize}
              emphasiseAngle={emphasiseAngle}
              onChangeEmphasiseAngle={setEmphasiseAngle}
              selectedAssessment={selectedAssessment}
              onChangeAssessment={setSelectedAssessment}
              onRunResearch={() => handleRunResearch(selectedPillar)}
              isResearching={isResearching}
              researchInsight={researchInsight}
              onGenerateAll={handleGenerateAll}
              onGenerateCopyOnly={handleGenerateCopyOnly}
              onGenerateSeoOnly={handleGenerateSeoOnly}
              onGenerateDesignOnly={handleGenerateDesignOnly}
              isGenerating={isGenerating}
              activeGenerationStep={activeGenerationStep}
            />
          </div>

          {/* Right Column: Output Viewer Tabs & Audit (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* View Tabs Header */}
            <div className="bg-white rounded-xl border border-slate-200 p-1.5 shadow-xs flex items-center gap-1 overflow-x-auto no-scrollbar text-xs">
              <button
                onClick={() => setActiveTab('mockup')}
                id="tab-mockup"
                className={`px-3 py-2 rounded-lg font-semibold transition flex items-center gap-1.5 shrink-0 ${
                  activeTab === 'mockup'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                Live Mockup
              </button>

              <button
                onClick={() => setActiveTab('copy')}
                id="tab-copy"
                className={`px-3 py-2 rounded-lg font-semibold transition flex items-center gap-1.5 shrink-0 ${
                  activeTab === 'copy'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                Landing Copy
                {auditReport.wordCount > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    activeTab === 'copy' ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {auditReport.wordCount}w
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('seo_score')}
                id="tab-seo-score"
                className={`px-3 py-2 rounded-lg font-semibold transition flex items-center gap-1.5 shrink-0 ${
                  activeTab === 'seo_score'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <BarChart2 className="w-3.5 h-3.5" />
                SEO & AI Score
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  activeTab === 'seo_score'
                    ? 'bg-blue-700 text-white'
                    : seoAuditReport.overallScore >= 85
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {seoAuditReport.overallScore}% ({seoAuditReport.grade})
                </span>
              </button>

              <button
                onClick={() => setActiveTab('seo')}
                id="tab-seo"
                className={`px-3 py-2 rounded-lg font-semibold transition flex items-center gap-1.5 shrink-0 ${
                  activeTab === 'seo'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Tag className="w-3.5 h-3.5" />
                SEO Handover
              </button>

              <button
                onClick={() => setActiveTab('clusters')}
                id="tab-clusters"
                className={`px-3 py-2 rounded-lg font-semibold transition flex items-center gap-1.5 shrink-0 ${
                  activeTab === 'clusters'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <GitFork className="w-3.5 h-3.5" />
                Topic Cluster
              </button>

              <button
                onClick={() => setActiveTab('leadgen')}
                id="tab-leadgen"
                className={`px-3 py-2 rounded-lg font-semibold transition flex items-center gap-1.5 shrink-0 ${
                  activeTab === 'leadgen'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Target className="w-3.5 h-3.5" />
                Lead Strategy
              </button>

              <button
                onClick={() => setActiveTab('research')}
                id="tab-research"
                className={`px-3 py-2 rounded-lg font-semibold transition flex items-center gap-1.5 shrink-0 ${
                  activeTab === 'research'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                Search Gaps
              </button>

              <button
                onClick={() => setActiveTab('audit')}
                id="tab-audit"
                className={`px-3 py-2 rounded-lg font-semibold transition flex items-center gap-1.5 shrink-0 ${
                  activeTab === 'audit'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Brand Audit
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  auditReport.score >= 90
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-rose-100 text-rose-800'
                }`}>
                  {auditReport.score}%
                </span>
              </button>

              <button
                onClick={() => setActiveTab('designer')}
                id="tab-designer"
                className={`px-3 py-2 rounded-lg font-semibold transition flex items-center gap-1.5 shrink-0 ${
                  activeTab === 'designer'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                Designer Notes
              </button>
            </div>

            {/* Tab Views */}
            {activeTab === 'mockup' && (
              <LiveMockupViewer
                copy={landingCopy}
                pillar={selectedPillar}
                assessmentName={selectedAssessment}
                audience={primaryAudience}
              />
            )}

            {activeTab === 'copy' && (
              <LandingCopyViewer
                copy={landingCopy}
                auditReport={auditReport}
                onAutoFix={handleAutoFix}
                pillarName={selectedPillar.p}
              />
            )}

            {activeTab === 'seo_score' && (
              <SeoScoreViewer
                audit={seoAuditReport}
                pillar={selectedPillar}
                onNavigateToTab={(tab) => setActiveTab(tab)}
              />
            )}

            {activeTab === 'seo' && (
              <SeoNotesViewer
                seoNotes={seoNotes}
                pillarName={selectedPillar.p}
              />
            )}

            {activeTab === 'clusters' && (
              <TopicClusterViewer
                pillar={selectedPillar}
                allPillars={ALL_PILLARS}
              />
            )}

            {activeTab === 'leadgen' && (
              <LeadGenStrategyViewer
                pillar={selectedPillar}
                assessmentName={selectedAssessment}
                audience={primaryAudience}
              />
            )}

            {activeTab === 'research' && researchInsight && (
              <ResearchViewer
                research={researchInsight}
                onRefresh={handleRunResearch}
                isRefreshing={isResearching}
                selectedPillar={selectedPillar}
                onSelectPillar={handleSelectPillar}
                allPillars={ALL_PILLARS}
              />
            )}

            {activeTab === 'audit' && (
              <AuditReportViewer
                report={auditReport}
                onAutoFix={handleAutoFix}
              />
            )}

            {activeTab === 'designer' && (
              <DesignerNotesViewer
                designerNotes={designerNotes}
                pillarName={selectedPillar.p}
              />
            )}

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <strong className="text-slate-700">Embee Software</strong> · Making IT Easier · Frontier Partner & Solutions Partner with Microsoft · SAP Gold Partner
          </div>
          <div>
            14-Section Landing Page & Handover Generator · Non-Negotiable Brand & Style Compliant
          </div>
        </div>
      </footer>
    </div>
  );
}
export default App;
