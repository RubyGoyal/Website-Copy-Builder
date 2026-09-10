import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy, Check, Download, Palette, Eye, Code2 } from 'lucide-react';

interface DesignerNotesViewerProps {
  designerNotes: string;
  pillarName: string;
}

export const DesignerNotesViewer: React.FC<DesignerNotesViewerProps> = ({
  designerNotes,
  pillarName
}) => {
  const [viewMode, setViewMode] = useState<'preview' | 'raw'>('preview');
  const [copied, setCopied] = useState(false);

  const wordCount = designerNotes.trim().split(/\s+/).filter(Boolean).length;

  const handleCopy = () => {
    navigator.clipboard.writeText(designerNotes);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const slug = pillarName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const blob = new Blob([designerNotes], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `designer-notes-${slug}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* Top Bar Controls */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-purple-50 text-purple-800 font-semibold text-xs border border-purple-200 flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5" />
            In-House Designer Direction
          </span>
          <span className={`px-2 py-0.5 rounded text-xs font-medium border ${
            wordCount <= 550
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-amber-50 text-amber-800 border-amber-200'
          }`}>
            {wordCount} words (Target: &lt;500 words)
          </span>
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

          <button
            onClick={handleCopy}
            id="btn-copy-design"
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 shadow-xs transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy Notes'}
          </button>

          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 shadow-xs transition"
          >
            <Download className="w-3.5 h-3.5" />
            .md
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 md:p-8 min-h-[400px]">
        {viewMode === 'preview' ? (
          <div className="markdown-body max-w-4xl mx-auto">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {designerNotes}
            </ReactMarkdown>
          </div>
        ) : (
          <textarea
            readOnly
            value={designerNotes}
            rows={24}
            className="w-full font-mono text-xs text-slate-800 bg-slate-50 p-4 rounded-lg border border-slate-200 focus:outline-none resize-y leading-relaxed"
          />
        )}
      </div>
    </div>
  );
};
