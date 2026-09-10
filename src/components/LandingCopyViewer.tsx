import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  Copy, 
  Check, 
  Download, 
  Eye, 
  Code2, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  Wand2
} from 'lucide-react';
import { AuditReport } from '../types';

interface LandingCopyViewerProps {
  copy: string;
  auditReport: AuditReport;
  onAutoFix: () => void;
  pillarName: string;
}

export const LandingCopyViewer: React.FC<LandingCopyViewerProps> = ({
  copy,
  auditReport,
  onAutoFix,
  pillarName
}) => {
  const [viewMode, setViewMode] = useState<'preview' | 'raw'>('preview');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(copy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const slug = pillarName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const blob = new Blob([copy], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `landing-copy-${slug}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const wordCount = auditReport.wordCount;
  const isWordCountOptimal = wordCount >= 1400 && wordCount <= 2200;

  return (
    <div className="space-y-4">
      {/* Top Bar: Stats & View Controls */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Metrics & Verification */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          {/* Word Count Indicator */}
          <div className={`px-2.5 py-1 rounded-md font-semibold flex items-center gap-1.5 border ${
            isWordCountOptimal
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-amber-50 text-amber-800 border-amber-200'
          }`}>
            <FileText className="w-3.5 h-3.5" />
            <span>{wordCount.toLocaleString()} words</span>
            <span className="text-[10px] font-normal opacity-80">(Target: 1,400 - 2,200)</span>
          </div>

          {/* Single H1 Check */}
          <div className={`px-2.5 py-1 rounded-md font-medium flex items-center gap-1.5 border ${
            auditReport.h1Count === 1
              ? 'bg-blue-50 text-blue-800 border-blue-200'
              : 'bg-rose-50 text-rose-800 border-rose-200'
          }`}>
            {auditReport.h1Count === 1 ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
            ) : (
              <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
            )}
            <span>H1: {auditReport.h1Count === 1 ? '1 Valid H1' : `${auditReport.h1Count} Found`}</span>
          </div>

          {/* Quick Score */}
          <div className={`px-2.5 py-1 rounded-md font-medium flex items-center gap-1.5 border ${
            auditReport.score >= 90
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-amber-50 text-amber-800 border-amber-200'
          }`}>
            <span>Brand Compliance: {auditReport.score}/100</span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Auto-Fix Button if violations exist */}
          {auditReport.violations.length > 0 && (
            <button
              onClick={onAutoFix}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-md bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 transition"
              title="Automatically replace em/en dashes and sanitize spelling"
            >
              <Wand2 className="w-3.5 h-3.5" />
              Auto-Fix Brand Rules
            </button>
          )}

          {/* View Mode Toggle */}
          <div className="inline-flex p-0.5 rounded-lg bg-slate-200 border border-slate-300 text-xs">
            <button
              onClick={() => setViewMode('preview')}
              className={`px-2.5 py-1 rounded-md font-medium transition flex items-center gap-1 ${
                viewMode === 'preview'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Rendered
            </button>
            <button
              onClick={() => setViewMode('raw')}
              className={`px-2.5 py-1 rounded-md font-medium transition flex items-center gap-1 ${
                viewMode === 'raw'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              Raw Markdown
            </button>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            id="btn-copy-landing-copy"
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 shadow-xs transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 shadow-xs transition"
          >
            <Download className="w-3.5 h-3.5" />
            .md
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 md:p-8 min-h-[500px]">
        {viewMode === 'preview' ? (
          <div className="markdown-body max-w-4xl mx-auto">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {copy}
            </ReactMarkdown>
          </div>
        ) : (
          <div className="relative">
            <textarea
              readOnly
              value={copy}
              rows={32}
              className="w-full font-mono text-xs text-slate-800 bg-slate-50 p-4 rounded-lg border border-slate-200 focus:outline-none resize-y leading-relaxed"
            />
          </div>
        )}
      </div>
    </div>
  );
};
