import React, { useState } from 'react';
import { 
  MessageSquareQuote, 
  Sparkles, 
  Send, 
  RotateCcw, 
  History, 
  CheckCircle2, 
  Layers, 
  FileText, 
  Tag, 
  Palette, 
  ArrowRight,
  Info,
  Clock,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react';
import { FeedbackTargetType, FeedbackRevision } from '../types';

interface FeedbackRefinementSectionProps {
  onApplyFeedback: (feedback: string, targetType: FeedbackTargetType) => Promise<void>;
  isApplying: boolean;
  revisions: FeedbackRevision[];
  currentVersionIndex: number;
  onRevertToVersion: (index: number) => void;
  latestSummaryOfChanges?: string;
  activeOutputTab: string;
}

const QUICK_FEEDBACK_PROMPTS = [
  { label: '🚫 Remove Assessments Section', text: 'Remove the assessments section for now. Do not include an assessment spotlight section or featured readiness assessment card.' },
  { label: '📄 Single Dedicated Page (Do Not Combine)', text: 'Keep this strictly as a single dedicated page for this specific topic. Do not combine multiple pages, sub-sections, or separate offerings into one merged document automatically.' },
  { label: '📖 Make Language Readable & Less Technical', text: 'Make the language less technical, human, and readable. Remove dense engineering jargon, acronym soup, and robotic phrasing, and replace with clear, benefit-driven business language for executive decision-makers.' },
  { label: '🌐 Don\'t Mention India Cloud Regions or SAP Everywhere', text: 'Don\'t mention India cloud regions (Central/South India, Pune, Chennai) or SAP ERP integrations everywhere. Keep data security, cloud boundaries, and enterprise software integrations natural, flexible, and relevant to the specific solution.' },
  { label: '🔍 Actual Competitor Research (No Predefined Notions)', text: 'Perform actual competitor research tailored strictly to this specific page and topic without following predefined notions about cloud regions or ERP platforms.' },
  { label: '📊 Quantify Business Outcomes & ROI', text: 'Enrich business outcomes with concrete metrics such as 35% TCO reduction, 99.95% availability SLA, and 4x faster landing zone deployment.' },
  { label: '⚡ Make Hero & Overview Punchier', text: 'Shorten and punch up the hero section and executive overview for high-level enterprise C-suite reading.' },
  { label: '🔒 Strengthen Zero-Trust & Security Details', text: 'Deepen the security foundation by highlighting Zero-Trust access control, Microsoft Sentinel, and 24x7 monitoring.' },
  { label: '💬 Address Downtime & Data Protection in FAQs', text: 'Ensure the FAQs clearly address how Embee Software guarantees minimal business disruption, reliable cutovers, and enterprise data protection.' }
];

export const FeedbackRefinementSection: React.FC<FeedbackRefinementSectionProps> = ({
  onApplyFeedback,
  isApplying,
  revisions,
  currentVersionIndex,
  onRevertToVersion,
  latestSummaryOfChanges,
  activeOutputTab
}) => {
  const [feedbackText, setFeedbackText] = useState('');
  const [targetType, setTargetType] = useState<FeedbackTargetType>('copy');
  const [showHistory, setShowHistory] = useState(false);

  // Auto-align default targetType with active tab when user is on SEO or Designer tabs
  React.useEffect(() => {
    if (activeOutputTab === 'seo') {
      setTargetType('seo');
    } else if (activeOutputTab === 'designer') {
      setTargetType('designer');
    } else if (activeOutputTab === 'copy' || activeOutputTab === 'mockup') {
      setTargetType('copy');
    }
  }, [activeOutputTab]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!feedbackText.trim() || isApplying) return;
    await onApplyFeedback(feedbackText.trim(), targetType);
    setFeedbackText('');
  };

  const handleQuickPromptClick = (text: string) => {
    setFeedbackText(prev => {
      if (!prev.trim()) return text;
      return `${prev}\n${text}`;
    });
  };

  const currentRevision = revisions[currentVersionIndex];

  return (
    <section id="feedback-refinement-section" className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden mt-6 transition">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300 shrink-0">
            <MessageSquareQuote className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
                Feedback & Iterative Refinement
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/30 text-blue-200 border border-blue-400/30">
                v{currentRevision ? currentRevision.versionNumber : 1} Current
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Provide feedback on the generated response to instruct the engine to edit, rewrite, or expand specific sections.
            </p>
          </div>
        </div>

        {/* History Toggle Button */}
        {revisions.length > 1 && (
          <button
            type="button"
            onClick={() => setShowHistory(!showHistory)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white border border-white/10 transition shadow-2xs"
          >
            <History className="w-3.5 h-3.5 text-blue-300" />
            <span>Revision History ({revisions.length})</span>
            {showHistory ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>

      {/* Revision History Panel (Collapsible) */}
      {showHistory && revisions.length > 1 && (
        <div className="bg-slate-50 border-b border-slate-200 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              Version Timeline (Click to Revert)
            </span>
            <button
              onClick={() => setShowHistory(false)}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              Close
            </button>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {revisions.map((rev, idx) => {
              const isCurrent = idx === currentVersionIndex;
              return (
                <div
                  key={rev.id}
                  className={`p-3 rounded-lg border text-xs transition flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                    isCurrent
                      ? 'bg-blue-50/80 border-blue-300 text-blue-900 ring-1 ring-blue-300'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold">v{rev.versionNumber}</span>
                      <span className="text-[10px] text-slate-500">{rev.timestamp}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200 uppercase font-medium">
                        Target: {rev.targetType}
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-600 text-white font-bold">
                          Active
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-600 italic line-clamp-1">
                      "{rev.feedbackText}"
                    </div>
                    {rev.summaryOfChanges && (
                      <div className="text-[10px] text-emerald-700 font-medium">
                        ✓ {rev.summaryOfChanges}
                      </div>
                    )}
                  </div>

                  {!isCurrent && (
                    <button
                      type="button"
                      onClick={() => onRevertToVersion(idx)}
                      className="px-2.5 py-1 rounded bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-[11px] font-semibold transition shrink-0 flex items-center gap-1 self-start sm:self-auto"
                    >
                      <RotateCcw className="w-3 h-3 text-slate-500" />
                      Restore v{rev.versionNumber}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Latest Changes Banner */}
      {latestSummaryOfChanges && (
        <div className="bg-emerald-50 border-b border-emerald-200 px-4 py-3 flex items-start gap-2.5 text-xs text-emerald-900">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold">Edits Applied to Response:</span>
            <p className="text-emerald-800 leading-relaxed">
              {latestSummaryOfChanges}
            </p>
          </div>
        </div>
      )}

      {/* Form Content */}
      <div className="p-4 sm:p-5 space-y-4">
        {/* Step 1: Select Target Deliverable */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            1. Select Deliverable to Edit
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <button
              type="button"
              onClick={() => setTargetType('copy')}
              className={`p-2.5 rounded-lg border font-semibold flex items-center justify-center gap-1.5 transition ${
                targetType === 'copy'
                  ? 'bg-blue-50 border-blue-500 text-blue-700 ring-1 ring-blue-500'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Landing Copy</span>
            </button>

            <button
              type="button"
              onClick={() => setTargetType('seo')}
              className={`p-2.5 rounded-lg border font-semibold flex items-center justify-center gap-1.5 transition ${
                targetType === 'seo'
                  ? 'bg-blue-50 border-blue-500 text-blue-700 ring-1 ring-blue-500'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Tag className="w-3.5 h-3.5" />
              <span>SEO Handover</span>
            </button>

            <button
              type="button"
              onClick={() => setTargetType('designer')}
              className={`p-2.5 rounded-lg border font-semibold flex items-center justify-center gap-1.5 transition ${
                targetType === 'designer'
                  ? 'bg-blue-50 border-blue-500 text-blue-700 ring-1 ring-blue-500'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Designer Notes</span>
            </button>

            <button
              type="button"
              onClick={() => setTargetType('all')}
              className={`p-2.5 rounded-lg border font-semibold flex items-center justify-center gap-1.5 transition ${
                targetType === 'all'
                  ? 'bg-blue-50 border-blue-500 text-blue-700 ring-1 ring-blue-500'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All 3 Outputs</span>
            </button>
          </div>
        </div>

        {/* Step 2: Quick Feedback Inspiration Chips */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              2. Quick Feedback Shortcuts (Click to Add)
            </label>
            <span className="text-[10px] text-slate-400">Presets</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {QUICK_FEEDBACK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleQuickPromptClick(prompt.text)}
                className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 border border-slate-200 text-[11px] font-medium text-slate-700 transition"
              >
                {prompt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Feedback Textarea */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="user-feedback-input" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                3. Your Feedback / Editorial Instructions
              </label>
              <span className="text-[10px] text-slate-400">
                Press Ctrl+Enter to submit
              </span>
            </div>

            <div className="relative">
              <textarea
                id="user-feedback-input"
                rows={3}
                value={feedbackText}
                onChange={e => setFeedbackText(e.target.value)}
                onKeyDown={e => {
                  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                    handleSubmit();
                  }
                }}
                placeholder="Type your feedback here... E.g., 'Emphasize BFSI regulatory compliance in section 1 and 2', 'Add more quantitative ROI metrics into outcomes', 'Make the hero copy punchier and clarify migration timeline in FAQ'..."
                className="w-full text-xs text-slate-800 bg-slate-50/70 p-3.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-slate-400 leading-relaxed font-sans resize-y"
              />
              {feedbackText && (
                <button
                  type="button"
                  onClick={() => setFeedbackText('')}
                  className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 p-1"
                  title="Clear feedback"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>Strict Embee rules enforced: 10-section structure, no em dashes, 1,000–1,350 words.</span>
            </div>

            <div className="flex items-center gap-2">
              {feedbackText && (
                <button
                  type="button"
                  onClick={() => setFeedbackText('')}
                  disabled={isApplying}
                  className="px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 transition"
                >
                  Clear
                </button>
              )}

              <button
                type="submit"
                id="btn-apply-feedback"
                disabled={!feedbackText.trim() || isApplying}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition shadow-sm ${
                  !feedbackText.trim() || isApplying
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
                }`}
              >
                {isApplying ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Editing Response with Feedback...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Apply Feedback & Edit Response</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
