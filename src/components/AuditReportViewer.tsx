import React from 'react';
import { AuditReport } from '../types';
import { 
  ShieldCheck, 
  AlertTriangle, 
  XCircle, 
  CheckCircle2, 
  Wand2, 
  Check, 
  AlertCircle,
  FileCheck2,
  ListOrdered
} from 'lucide-react';

interface AuditReportViewerProps {
  report: AuditReport;
  onAutoFix: () => void;
}

export const AuditReportViewer: React.FC<AuditReportViewerProps> = ({
  report,
  onAutoFix
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (score >= 75) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-rose-600 bg-rose-50 border-rose-200';
  };

  const errorCount = report.violations.filter(v => v.severity === 'error').length;
  const warningCount = report.violations.filter(v => v.severity === 'warning').length;

  return (
    <div className="space-y-6">
      {/* Score Header Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-black text-2xl border ${getScoreColor(report.score)} shadow-xs`}>
              <span>{report.score}</span>
              <span className="text-[10px] font-normal tracking-wide uppercase">Score</span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">
                  Embee Software Brand & Style Compliance Audit
                </h2>
                {report.passed ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Passed Non-Negotiables
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">
                    <AlertCircle className="w-3.5 h-3.5" /> Action Required ({errorCount} errors)
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Audits text against Embee Software non-negotiable guidelines (no dashes, Indian English, no competitor names, approved partner titles, 14-section framework).
              </p>
            </div>
          </div>

          {report.violations.length > 0 && (
            <button
              onClick={onAutoFix}
              id="btn-auto-fix-audit"
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition inline-flex items-center justify-center gap-1.5 self-start sm:self-auto"
            >
              <Wand2 className="w-4 h-4" />
              Auto-Fix Brand Violations
            </button>
          )}
        </div>

        {/* Quick Rule Checks Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mt-5 pt-5 border-t border-slate-100 text-xs">
          <div className={`p-2.5 rounded-lg border flex items-center gap-2 ${
            report.stats.hasNoEmDash ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}>
            {report.stats.hasNoEmDash ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <XCircle className="w-3.5 h-3.5 text-rose-600" />}
            <span>No Em Dash (—)</span>
          </div>

          <div className={`p-2.5 rounded-lg border flex items-center gap-2 ${
            report.stats.hasNoEnDash ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}>
            {report.stats.hasNoEnDash ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <XCircle className="w-3.5 h-3.5 text-rose-600" />}
            <span>No En Dash (–)</span>
          </div>

          <div className={`p-2.5 rounded-lg border flex items-center gap-2 ${
            report.stats.hasProperBrandName ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}>
            {report.stats.hasProperBrandName ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <XCircle className="w-3.5 h-3.5 text-rose-600" />}
            <span>"Embee Software"</span>
          </div>

          <div className={`p-2.5 rounded-lg border flex items-center gap-2 ${
            report.stats.hasValidMicrosoftPartner ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}>
            {report.stats.hasValidMicrosoftPartner ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <XCircle className="w-3.5 h-3.5 text-rose-600" />}
            <span>Microsoft Partner</span>
          </div>

          <div className={`p-2.5 rounded-lg border flex items-center gap-2 ${
            report.stats.hasNoPricing ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}>
            {report.stats.hasNoPricing ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <XCircle className="w-3.5 h-3.5 text-rose-600" />}
            <span>No Pricing / GST</span>
          </div>

          <div className={`p-2.5 rounded-lg border flex items-center gap-2 ${
            report.stats.hasIndianSpelling ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-amber-50 border-amber-200 text-amber-800'
          }`}>
            {report.stats.hasIndianSpelling ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />}
            <span>Indian English</span>
          </div>
        </div>
      </div>

      {/* Two Column Section: Violations List & 14-Section Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Violations List */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              Detected Issues ({report.violations.length})
            </h3>
            <span className="text-xs text-slate-500">
              {errorCount} errors, {warningCount} warnings
            </span>
          </div>

          {report.violations.length === 0 ? (
            <div className="p-6 text-center text-xs text-emerald-700 bg-emerald-50 rounded-lg border border-emerald-200">
              <CheckCircle2 className="w-6 h-6 mx-auto mb-2 text-emerald-600" />
              <div className="font-bold">Zero Violations Found</div>
              <div className="text-emerald-600 mt-0.5">
                The content conforms 100% to all Embee Software non-negotiable rules and formatting standards.
              </div>
            </div>
          ) : (
            <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
              {report.violations.map((violation, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border text-xs ${
                    violation.severity === 'error'
                      ? 'bg-rose-50/70 border-rose-200 text-rose-900'
                      : 'bg-amber-50/70 border-amber-200 text-amber-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold flex items-center gap-1.5">
                      {violation.severity === 'error' ? (
                        <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      )}
                      {violation.rule}
                    </span>
                    <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.2 rounded bg-white/80 border border-slate-200">
                      {violation.severity}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] opacity-90 pl-5">
                    {violation.description}
                  </p>
                  {violation.matches && (
                    <div className="mt-1 pl-5 text-[10px] font-mono bg-white/60 p-1 rounded border border-slate-200/60">
                      Matches: {violation.matches.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 14 Required Sections Verification Checklist */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
              <ListOrdered className="w-4 h-4 text-blue-600" />
              14 Required Sections Structural Audit
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              {report.sectionChecklist.filter(s => s.found).length} / 14 Verified
            </span>
          </div>

          <div className="space-y-1.5 max-h-[420px] overflow-y-auto pr-1">
            {report.sectionChecklist.map((section, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg border text-xs flex items-center justify-between ${
                  section.found
                    ? 'bg-slate-50/80 border-slate-200 text-slate-800'
                    : 'bg-rose-50/80 border-rose-200 text-rose-800 font-medium'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-[11px] font-mono w-5">
                    {idx + 1}.
                  </span>
                  <span>{section.name}</span>
                </div>
                {section.found ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
