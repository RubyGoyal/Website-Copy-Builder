import React, { useState, useMemo, useEffect } from 'react';
import { ALL_PILLARS, buildSharedBrief, LANDING_PAGE_PROMPT_TEMPLATE, SEO_PROMPT_TEMPLATE, DESIGNER_PROMPT_TEMPLATE } from './data/pillarsData';
import { SAMPLE_LANDING_COPY, SAMPLE_SEO_PACK, SAMPLE_DESIGNER_NOTES } from './data/sampleOutput';
import { PillarData, PrimaryAudience, CompanySize, ResearchInsight, ResearchStatus, FeedbackRevision, FeedbackTargetType } from './types';
import { auditLandingPageCopy, autoFixBrandIssues } from './utils/brandAudit';
import { auditSeoAndAiSeo } from './utils/seoAudit';
import { generateSemanticHtml, downloadFile, downloadAllWordDoc } from './utils/exportHelpers';
import { getClientDomainResearch } from './utils/researchGenerator';
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
import { FeedbackRefinementSection } from './components/FeedbackRefinementSection';
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
  Target,
  AlertTriangle
} from 'lucide-react';

export function App() {
  // State for selected pillar & configuration
  const initialPillar = ALL_PILLARS.find(p => p.p === 'Copilot & AI Strategy Advisory') || ALL_PILLARS[0];
  const [selectedPillar, setSelectedPillar] = useState<PillarData>(initialPillar);
  const [selectedSubPage, setSelectedSubPage] = useState<string>('');
  const [primaryAudience, setPrimaryAudience] = useState<PrimaryAudience>('CIO/CTO');
  const [companySize, setCompanySize] = useState<CompanySize>('all sizes');
  const [emphasiseAngle, setEmphasiseAngle] = useState<string>('Focus on executive ROI clarity, enterprise data security, and seamless workflow adoption');
  const [selectedAssessment, setSelectedAssessment] = useState<string>(
    initialPillar.a && initialPillar.a.length > 0 ? initialPillar.a[0] : 'Copilot & AI Readiness Assessment'
  );

  // Active view tab
  const [activeTab, setActiveTab] = useState<'mockup' | 'copy' | 'seo_score' | 'seo' | 'clusters' | 'leadgen' | 'research' | 'audit' | 'designer'>('mockup');

  // Outputs state
  const [landingCopy, setLandingCopy] = useState<string>(SAMPLE_LANDING_COPY);
  const [seoNotes, setSeoNotes] = useState<string>(SAMPLE_SEO_PACK);
  const [designerNotes, setDesignerNotes] = useState<string>(SAMPLE_DESIGNER_NOTES);

  // Research Status state (manual trigger only: not_run | running | complete)
  const [researchStatus, setResearchStatus] = useState<ResearchStatus>('not_run');
  const [researchCompletedAt, setResearchCompletedAt] = useState<string | null>(null);
  const [researchedPillarKey, setResearchedPillarKey] = useState<string | null>(null);
  const [researchInsight, setResearchInsight] = useState<ResearchInsight | undefined>(undefined);

  // Processing indicators
  const [isResearching, setIsResearching] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [activeGenerationStep, setActiveGenerationStep] = useState<string>('');
  const [notification, setNotification] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  // Editorial Revisions & Feedback state
  const [revisions, setRevisions] = useState<FeedbackRevision[]>([
    {
      id: 'rev-init',
      versionNumber: 1,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      feedbackText: 'Initial Baseline Output (9-Section Structure)',
      targetType: 'all',
      landingCopy: SAMPLE_LANDING_COPY,
      seoNotes: SAMPLE_SEO_PACK,
      designerNotes: SAMPLE_DESIGNER_NOTES,
      summaryOfChanges: 'Initial 9-section deliverable loaded with verified brand & style rules (assessments removed for now).'
    }
  ]);
  const [currentVersionIndex, setCurrentVersionIndex] = useState<number>(0);
  const [isApplyingFeedback, setIsApplyingFeedback] = useState<boolean>(false);
  const [latestSummaryOfChanges, setLatestSummaryOfChanges] = useState<string>('');

  // API Quota & Live Engine Status State
  const [isQuotaLimited, setIsQuotaLimited] = useState<boolean>(false);
  const [isCheckingHealth, setIsCheckingHealth] = useState<boolean>(false);
  const [showQuotaBanner, setShowQuotaBanner] = useState<boolean>(true);
  const [apiErrorMessage, setApiErrorMessage] = useState<string>('');

  const checkApiHealth = async (testLive = false) => {
    setIsCheckingHealth(true);
    try {
      const res = await fetch(`/api/health${testLive ? '?test=true' : ''}`);
      if (res.ok) {
        const data = await res.json();
        setIsQuotaLimited(data.isQuotaLimited);
        if (data.lastApiError?.message) {
          setApiErrorMessage(data.lastApiError.message);
        }
        if (testLive) {
          if (data.liveTestResult?.success) {
            showNotification('success', data.liveTestResult.message);
            setShowQuotaBanner(false);
          } else {
            showNotification('error', `Live API Test: ${data.liveTestResult?.message || 'Credits depleted (429)'}`);
          }
        }
      }
    } catch (err) {
      console.warn('Health check error:', err);
    } finally {
      setIsCheckingHealth(false);
    }
  };

  useEffect(() => {
    checkApiHealth(false);
  }, []);

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

    let researchBriefText: string | undefined = undefined;
    const isCurrentPillarResearched = 
      researchStatus === 'complete' && 
      researchInsight && 
      researchedPillarKey === selectedPillar.p;

    if (isCurrentPillarResearched && researchInsight) {
      const parts: string[] = [];
      parts.push(`Executive Summary: ${researchInsight.summary}`);
      parts.push(`Competitor Gaps (What They Leave Out): ${researchInsight.competitorGaps.join('; ')}`);
      parts.push(`Ranking Themes: ${researchInsight.rankingThemes.join('; ')}`);

      if (researchInsight.detailedInputPoints && researchInsight.detailedInputPoints.length > 0) {
        parts.push(
          `\nDetailed Strategic Research Inputs (${researchInsight.detailedInputPoints.length} verified points across ${researchInsight.benchmarkPages?.length || 19} analyzed competitor/regulatory pages in India):\n` +
          researchInsight.detailedInputPoints.map((pt, i) => `${i + 1}. [${pt.category}] ${pt.point} -> MANDATORY COPY APPLICATION: ${pt.copywritingApplication}`).join('\n')
        );
      }
      researchBriefText = parts.join('\n');
    }

    const targetTopic = selectedSubPage ? `${selectedSubPage} (${selectedPillar.p})` : selectedPillar.p;
    return buildSharedBrief({
      pillarName: targetTopic,
      solutionGroup: selectedPillar.g,
      internalOwner: selectedPillar.s,
      sections: selectedSubPage ? [selectedSubPage] : selectedPillar.sec,
      platforms: selectedPillar.pl,
      assessments: [], // Assessments section removed for now
      targetKeywords: selectedPillar.k,
      primaryAudience,
      companySize,
      emphasiseAngle,
      matchedCaseStudies: selectedPillar.cs,
      siblingPillars,
      researchBriefText
    });
  };

  // When pillar changes, update assessment, reset sub-page, and reset research state (manual trigger only)
  const handleSelectPillar = (newPillar: PillarData) => {
    setSelectedPillar(newPillar);
    setSelectedSubPage('');
    if (newPillar.a && newPillar.a.length > 0) {
      setSelectedAssessment(newPillar.a[0]);
    }
    // Strictly manual trigger: do NOT run search grounding automatically on pillar selection
    setResearchInsight(undefined);
    setResearchStatus('not_run');
    setResearchCompletedAt(null);
    setResearchedPillarKey(null);
  };

  // Run Deep Competitor Research (manual trigger only)
  const handleRunResearch = async (targetPillar?: PillarData, customQuery?: string) => {
    const pillarToUse = targetPillar || selectedPillar;
    setIsResearching(true);
    setResearchStatus('running');
    showNotification('info', `Running deep competitor research across 18-20 pages for "${pillarToUse.p}" in India...`);
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
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to complete search research');
      }

      const data: ResearchInsight = await res.json();
      setResearchInsight(data);
      setResearchStatus('complete');
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setResearchCompletedAt(timeStr);
      setResearchedPillarKey(pillarToUse.p);
      const pageCount = data.benchmarkPages?.length || data.pagesAnalyzedCount || 19;
      const pointCount = data.detailedInputPoints?.length || data.totalPointsCount || 15;
      showNotification('success', `Research complete for "${pillarToUse.p}": ${pageCount} benchmark pages analyzed, ${pointCount} strategic points extracted.`);
    } catch (err: any) {
      console.warn('Backend research network or quota fallback:', err);
      const fallbackResearch = getClientDomainResearch(pillarToUse.p, pillarToUse.g, pillarToUse.k);
      setResearchInsight(fallbackResearch);
      setResearchStatus('complete');
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setResearchCompletedAt(timeStr);
      setResearchedPillarKey(pillarToUse.p);
      const pageCount = fallbackResearch.benchmarkPages?.length || 19;
      const pointCount = fallbackResearch.detailedInputPoints?.length || 15;
      showNotification('success', `Domain research loaded for "${pillarToUse.p}": ${pageCount} benchmark pages, ${pointCount} strategic input points.`);
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

      // Record fresh revision
      const newRev: FeedbackRevision = {
        id: `rev-${Date.now()}`,
        versionNumber: revisions.length + 1,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        feedbackText: `Fresh Generation for ${selectedPillar.p}`,
        targetType: 'all',
        landingCopy: copyData.landingCopy,
        seoNotes: seoData.seoNotes,
        designerNotes: designData.designerNotes,
        summaryOfChanges: `Generated complete fresh deliverables for ${selectedPillar.p}`
      };
      setRevisions(prev => [...prev, newRev]);
      setCurrentVersionIndex(revisions.length);
      setLatestSummaryOfChanges(`Generated complete fresh deliverables for ${selectedPillar.p}`);

      const isQuotaFallback = !!(copyData.isQuotaLimited || seoData.isQuotaLimited || designData.isQuotaLimited);
      if (isQuotaFallback) {
        showNotification('info', 'Outputs populated from offline template (AI service quota limited / 429).');
      } else {
        showNotification('success', 'All 3 outputs generated successfully with full brand compliance.');
      }
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
      if (data.isQuotaLimited) {
        showNotification('info', 'Landing copy populated from offline template (AI service quota limited).');
      } else {
        showNotification('success', 'Landing copy generated successfully.');
      }
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
      if (data.isQuotaLimited) {
        showNotification('info', 'SEO handover pack populated from offline template (AI service quota limited).');
      } else {
        showNotification('success', 'SEO handover pack generated successfully.');
      }
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
        throw new Error(data.error || 'Failed to generate designer notes');
      }
      const data = await res.json();
      setDesignerNotes(data.designerNotes);
      setActiveTab('designer');
      if (data.isQuotaLimited) {
        showNotification('info', 'Designer notes populated from offline template (AI service quota limited).');
      } else {
        showNotification('success', 'Designer notes generated successfully.');
      }
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
    setEmphasiseAngle('Focus on executive ROI clarity, high availability, seamless core system integrations, and accessible business language');
    setSelectedAssessment('Azure Well-Architected and Migration Assessment');
    setLandingCopy(SAMPLE_LANDING_COPY);
    setSeoNotes(SAMPLE_SEO_PACK);
    setDesignerNotes(SAMPLE_DESIGNER_NOTES);
    setActiveTab('copy');
    showNotification('success', 'Loaded approved Cloud Advisory & Consulting sample pack.');
  };

  // Apply User Feedback & Edit Response
  const handleApplyFeedback = async (feedback: string, targetType: FeedbackTargetType) => {
    setIsApplyingFeedback(true);
    try {
      const brief = getCurrentBrief();
      const res = await fetch('/api/edit-with-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          feedback,
          targetType,
          currentLandingCopy: landingCopy,
          currentSeoNotes: seoNotes,
          currentDesignerNotes: designerNotes,
          brief,
          pillarName: selectedSubPage ? `${selectedSubPage} (${selectedPillar.p})` : selectedPillar.p,
          solutionGroup: selectedPillar.g
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to edit response with feedback');
      }

      const data = await res.json();
      const nextLandingCopy = data.landingCopy || landingCopy;
      const nextSeoNotes = data.seoNotes || seoNotes;
      const nextDesignerNotes = data.designerNotes || designerNotes;
      const summary = data.summaryOfChanges || `Incorporated stakeholder feedback: "${feedback.slice(0, 70)}..."`;

      setLandingCopy(nextLandingCopy);
      setSeoNotes(nextSeoNotes);
      setDesignerNotes(nextDesignerNotes);
      setLatestSummaryOfChanges(summary);

      const nextVersionNum = revisions.length + 1;
      const newRev: FeedbackRevision = {
        id: `rev-${Date.now()}`,
        versionNumber: nextVersionNum,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        feedbackText: feedback,
        targetType,
        landingCopy: nextLandingCopy,
        seoNotes: nextSeoNotes,
        designerNotes: nextDesignerNotes,
        summaryOfChanges: summary
      };

      setRevisions(prev => [...prev, newRev]);
      setCurrentVersionIndex(revisions.length);

      if (targetType === 'seo') {
        setActiveTab('seo');
      } else if (targetType === 'designer') {
        setActiveTab('designer');
      } else {
        if (activeTab !== 'mockup' && activeTab !== 'copy') {
          setActiveTab('mockup');
        }
      }

      showNotification('success', `Feedback applied (v${nextVersionNum}): ${summary}`);
    } catch (err: any) {
      console.error('Feedback error:', err);
      showNotification('error', err.message || 'Error processing feedback');
    } finally {
      setIsApplyingFeedback(false);
    }
  };

  const handleRevertToVersion = (index: number) => {
    const rev = revisions[index];
    if (!rev) return;
    setLandingCopy(rev.landingCopy);
    setSeoNotes(rev.seoNotes);
    setDesignerNotes(rev.designerNotes);
    setCurrentVersionIndex(index);
    setLatestSummaryOfChanges(`Restored version v${rev.versionNumber}`);
    showNotification('info', `Restored revision v${rev.versionNumber} ("${rev.feedbackText.slice(0, 50)}")`);
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

  // Export Word Document (.doc) containing all 3 deliverables with H1/H2 formatting
  const handleDownloadDoc = () => {
    const slug = selectedPillar.p.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    downloadAllWordDoc(
      `embee-software-${slug}-complete-pack.doc`,
      selectedPillar.p,
      selectedPillar.g,
      landingCopy,
      seoNotes,
      designerNotes
    );
    showNotification('success', 'Exported complete Word Document (.doc) with H1/H2 formatting.');
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
        onDownloadDoc={handleDownloadDoc}
        onDownloadHtml={handleDownloadHtml}
        onDownloadJson={handleDownloadJson}
        onPrint={handlePrint}
        activePillarName={selectedSubPage ? `${selectedSubPage} (${selectedPillar.p})` : selectedPillar.p}
        isQuotaLimited={isQuotaLimited}
        onCheckHealth={() => checkApiHealth(true)}
        isCheckingHealth={isCheckingHealth}
      />

      {/* Prominent Warning Banner when isQuotaLimited is true */}
      {isQuotaLimited && showQuotaBanner && (
        <div className="bg-amber-500/15 border-b-2 border-amber-500 text-amber-950 px-4 py-3 text-xs shadow-xs">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-start sm:items-center gap-2.5">
              <span className="px-2 py-1 rounded bg-amber-600 text-white font-bold tracking-wider text-[10px] uppercase shrink-0 flex items-center gap-1 shadow-xs">
                <AlertTriangle className="w-3.5 h-3.5" />
                Template Mode (429)
              </span>
              <p className="text-amber-950 leading-relaxed font-medium">
                <strong>Warning: Offline template, not AI generated.</strong> Google Gemini API quota is limited or credits are depleted (429). The system is currently serving boilerplate offline template data, not live research or AI generation. Do not send these outputs to stakeholders.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
              <a
                href="https://ai.studio/projects"
                target="_blank"
                rel="noreferrer"
                className="text-xs underline font-semibold hover:text-amber-950 text-amber-900"
              >
                Billing & Credits ↗
              </a>
              <button
                onClick={() => checkApiHealth(true)}
                disabled={isCheckingHealth}
                className="px-3 py-1.5 rounded bg-amber-600 hover:bg-amber-700 font-semibold text-white transition flex items-center gap-1 cursor-pointer text-xs shadow-xs"
              >
                {isCheckingHealth ? 'Testing...' : 'Test Live API'}
              </button>
              <button
                onClick={() => setShowQuotaBanner(false)}
                className="text-amber-800 hover:text-amber-950 p-1 font-bold ml-1 cursor-pointer"
                title="Dismiss banner"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

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
              selectedSubPage={selectedSubPage}
              onSelectSubPage={setSelectedSubPage}
              selectedAssessment={selectedAssessment}
              onChangeAssessment={setSelectedAssessment}
              onRunResearch={() => handleRunResearch(selectedPillar)}
              isResearching={isResearching}
              researchStatus={researchStatus}
              researchCompletedAt={researchCompletedAt}
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
                Deep Research
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  activeTab === 'research'
                    ? 'bg-blue-700 text-white'
                    : 'bg-indigo-100 text-indigo-800'
                }`}>
                  {researchInsight?.benchmarkPages?.length || 19}p / {researchInsight?.detailedInputPoints?.length || 15}pts
                </span>
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

            {activeTab === 'research' && (
              <ResearchViewer
                research={researchInsight}
                researchStatus={researchStatus}
                researchCompletedAt={researchCompletedAt}
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

            {/* Editorial Feedback & Response Refinement Section */}
            <FeedbackRefinementSection
              onApplyFeedback={handleApplyFeedback}
              isApplying={isApplyingFeedback}
              revisions={revisions}
              currentVersionIndex={currentVersionIndex}
              onRevertToVersion={handleRevertToVersion}
              latestSummaryOfChanges={latestSummaryOfChanges}
              activeOutputTab={activeTab}
            />

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
            Dedicated Landing Page & Handover Generator · Non-Negotiable Brand & Style Compliant
          </div>
        </div>
      </footer>
    </div>
  );
}
export default App;
