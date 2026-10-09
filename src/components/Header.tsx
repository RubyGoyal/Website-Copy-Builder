import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Shield, 
  Award, 
  CheckCircle2, 
  RotateCcw, 
  FileText, 
  Download, 
  ChevronDown, 
  Code, 
  FileJson, 
  Printer 
} from 'lucide-react';

interface HeaderProps {
  onLoadSample: () => void;
  onReset: () => void;
  hasOutput: boolean;
  onDownloadAll: () => void;
  onDownloadDoc?: () => void;
  onDownloadHtml: () => void;
  onDownloadJson: () => void;
  onPrint: () => void;
  activePillarName: string;
  isQuotaLimited?: boolean;
  onCheckHealth?: () => void;
  isCheckingHealth?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onLoadSample,
  onReset,
  hasOutput,
  onDownloadAll,
  onDownloadDoc,
  onDownloadHtml,
  onDownloadJson,
  onPrint,
  activePillarName,
  isQuotaLimited,
  onCheckHealth,
  isCheckingHealth
}) => {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowExportMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          {/* Brand & Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center font-black text-xl tracking-tighter text-white shadow-md shadow-blue-500/20">
              ES
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-white">
                  Embee Software
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-medium border border-blue-500/30">
                  Page Builder
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium tracking-wide">
                Making IT Easier <span className="text-slate-600">|</span> Powered by Gemini 3.8 Flash & Google Search Grounding
              </p>
            </div>
          </div>

          {/* Partner & Credential Badges & Engine Status */}
          <div className="hidden lg:flex items-center gap-2 text-xs">
            {onCheckHealth && (
              <button
                onClick={onCheckHealth}
                disabled={isCheckingHealth}
                title={isQuotaLimited ? "Google GenAI Prepayment Credits Depleted (429). Operating in Offline Template Mode. Click to re-test live connection." : "Connected to Gemini 3.8 Flash. Click to verify."}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded font-medium border transition cursor-pointer ${
                  isQuotaLimited
                    ? 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
                    : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isQuotaLimited ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`} />
                <span>
                  {isCheckingHealth 
                    ? 'Testing API...' 
                    : isQuotaLimited 
                    ? 'Offline Template (429)' 
                    : 'Gemini 3.8 Flash (Live)'}
                </span>
              </button>
            )}

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 text-slate-200 border border-slate-700">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              Microsoft Frontier Partner
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 text-slate-200 border border-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
              17 Specializations
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 text-slate-200 border border-slate-700">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              SAP Gold Partner
            </span>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onLoadSample}
              id="btn-load-sample"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              title="Load full pre-approved Cloud Advisory & Consulting sample page"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Sample Pillar
            </button>

            <button
              onClick={onReset}
              id="btn-reset"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
              title="Clear outputs and reset form"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              Reset
            </button>

            {hasOutput && (
              <div className="relative" ref={menuRef}>
                <div className="inline-flex rounded-md shadow-sm">
                  <button
                    onClick={onDownloadAll}
                    id="btn-download-all"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-l-md bg-blue-600 hover:bg-blue-500 text-white transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Export
                  </button>
                  <button
                    onClick={() => setShowExportMenu(!showExportMenu)}
                    className="px-2 py-1.5 text-xs font-semibold rounded-r-md bg-blue-700 hover:bg-blue-600 text-white border-l border-blue-500 transition"
                    title="Choose export format"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {showExportMenu && (
                  <div className="absolute right-0 mt-2 w-56 rounded-lg bg-slate-800 border border-slate-700 shadow-xl py-1 z-50 text-xs text-slate-200">
                    {onDownloadDoc && (
                      <button
                        onClick={() => {
                          setShowExportMenu(false);
                          onDownloadDoc();
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-slate-700 flex items-center gap-2 transition bg-blue-950/40 border-b border-slate-700/60"
                      >
                        <FileText className="w-4 h-4 text-blue-400" />
                        <div>
                          <div className="font-semibold text-white flex items-center gap-1.5">
                            Word Document (.doc)
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 font-bold">H1/H2s</span>
                          </div>
                          <div className="text-[10px] text-slate-300">Formatted for Microsoft Word &amp; Google Docs</div>
                        </div>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setShowExportMenu(false);
                        onDownloadAll();
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-700 flex items-center gap-2 transition"
                    >
                      <FileText className="w-4 h-4 text-slate-400" />
                      <div>
                        <div className="font-semibold text-white">Full Markdown (.md)</div>
                        <div className="text-[10px] text-slate-400">Copy + SEO + Design notes</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setShowExportMenu(false);
                        onDownloadHtml();
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-700 flex items-center gap-2 transition"
                    >
                      <Code className="w-4 h-4 text-emerald-400" />
                      <div>
                        <div className="font-semibold text-white">Semantic HTML (.html)</div>
                        <div className="text-[10px] text-slate-400">Ready for WordPress/Webflow</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setShowExportMenu(false);
                        onDownloadJson();
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-700 flex items-center gap-2 transition"
                    >
                      <FileJson className="w-4 h-4 text-purple-400" />
                      <div>
                        <div className="font-semibold text-white">Project JSON (.json)</div>
                        <div className="text-[10px] text-slate-400">Structured CMS data bundle</div>
                      </div>
                    </button>

                    <div className="border-t border-slate-700 my-1" />

                    <button
                      onClick={() => {
                        setShowExportMenu(false);
                        onPrint();
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-700 flex items-center gap-2 transition"
                    >
                      <Printer className="w-4 h-4 text-amber-400" />
                      <div>
                        <div className="font-semibold text-white">Print / Save as PDF</div>
                        <div className="text-[10px] text-slate-400">Browser print view</div>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
