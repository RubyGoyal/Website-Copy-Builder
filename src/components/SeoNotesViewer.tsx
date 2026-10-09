import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy, Check, Download, Eye, Code2, Sparkles, ShieldCheck, Tag, FileText } from 'lucide-react';
import { downloadWordDoc } from '../utils/exportHelpers';

interface SeoNotesViewerProps {
  seoNotes: string;
  pillarName: string;
}

export const SeoNotesViewer: React.FC<SeoNotesViewerProps> = ({
  seoNotes,
  pillarName
}) => {
  const [viewMode, setViewMode] = useState<'preview' | 'raw'>('preview');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(seoNotes);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const slug = pillarName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const blob = new Blob([seoNotes], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `seo-handover-${slug}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadDoc = () => {
    const slug = pillarName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    downloadWordDoc(
      `seo-handover-${slug}.doc`,
      `${pillarName} - Developer & SEO Handover Pack`,
      seoNotes,
      {
        pillar: pillarName,
        type: 'Developer & SEO Handover Pack'
      }
    );
  };

  // Helper to extract specific JSON-LD schemas from the text
  const extractSchemas = () => {
    const jsonBlocks = Array.from(seoNotes.matchAll(/```json\s*([\s\S]*?)\s*```/g));
    return jsonBlocks.map((match, idx) => ({
      id: idx,
      content: match[1]
    }));
  };

  const schemas = extractSchemas();

  return (
    <div className="space-y-4">
      {/* Top Bar Controls */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-blue-50 text-blue-800 font-semibold text-xs border border-blue-200 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5" />
            Developer & SEO Handover Pack
          </span>
          {schemas.length > 0 && (
            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200">
              {schemas.length} Valid Schemas
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* View Toggle */}
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
              Rendered Pack
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

          <button
            onClick={handleCopy}
            id="btn-copy-seo"
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 shadow-xs transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy Full Pack'}
          </button>

          {/* Download Buttons: .md and .doc */}
          <div className="inline-flex rounded-md shadow-xs border border-slate-300 overflow-hidden">
            <button
              onClick={handleDownload}
              title="Download as Markdown (.md)"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium bg-white hover:bg-slate-100 text-slate-800 border-r border-slate-300 transition"
            >
              <Download className="w-3.5 h-3.5" />
              .md
            </button>
            <button
              onClick={handleDownloadDoc}
              title="Download as Word Document (.doc) with H1/H2 formatting"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold bg-blue-50 hover:bg-blue-100 text-blue-800 transition"
            >
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              .doc (Word)
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 md:p-8 min-h-[500px]">
        {viewMode === 'preview' ? (
          <div className="markdown-body max-w-4xl mx-auto">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {seoNotes}
            </ReactMarkdown>
          </div>
        ) : (
          <textarea
            readOnly
            value={seoNotes}
            rows={30}
            className="w-full font-mono text-xs text-slate-800 bg-slate-50 p-4 rounded-lg border border-slate-200 focus:outline-none resize-y leading-relaxed"
          />
        )}
      </div>
    </div>
  );
};
