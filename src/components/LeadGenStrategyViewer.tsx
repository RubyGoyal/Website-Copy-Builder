import React, { useState } from 'react';
import { PillarData } from '../types';
import { 
  Target, 
  Mail, 
  PhoneCall, 
  CheckCircle2, 
  Copy, 
  Check, 
  ShieldAlert, 
  Users, 
  Clock, 
  FileCheck,
  Building2,
  Sparkles
} from 'lucide-react';

interface LeadGenStrategyViewerProps {
  pillar: PillarData;
  assessmentName: string;
  audience: string;
}

export const LeadGenStrategyViewer: React.FC<LeadGenStrategyViewerProps> = ({
  pillar,
  assessmentName,
  audience
}) => {
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [copiedQuestions, setCopiedQuestions] = useState<boolean>(false);

  // Email autoresponder template
  const autoresponderEmailSubject = `Confirmation: Your ${assessmentName} Request with Embee Software`;
  const autoresponderEmailBody = `Dear [First Name],

Thank you for requesting the ${assessmentName} with Embee Software.

Our Principal Cloud & Enterprise Architecture team has received your submission and is preparing the initial scoping parameters tailored for your organization.

Here is what you can expect over the next 48 hours:
1. Discovery Scoping Call: A dedicated Solutions Architect will reach out to confirm your workload topology, compliance constraints (such as DPDP Act 2023 or RBI guidelines), and target milestone dates.
2. Non-Intrusive Assessment: We execute the audit using automated telemetry collectors with zero downtime and strict adherence to enterprise security NDA guidelines.
3. Executive Presentation: You will receive a comprehensive Gap Analysis, 3-Year TCO Comparison, and phased migration/modernization blueprint.

If you have urgent requirements or upcoming contract renewals, you may reply directly to this email or contact our enterprise desk at cloud@embee.co.in.

Warm regards,

Enterprise Architecture Group
Embee Software Pvt Ltd
Making IT Easier · Microsoft Frontier Partner · SAP Gold Partner
Website: https://www.embee.co.in`;

  // Discovery questions for SDRs and Solution Architects
  const discoveryQuestions = [
    `What is your current infrastructure footprint (on-premises, Azure, AWS, or hybrid)?`,
    `What are your primary compliance or regulatory mandates (e.g. DPDP Act 2023, RBI data residency, ISO 27001)?`,
    `What is the target cutover timeline or trigger event (e.g. data centre lease expiry, hardware refresh, cyber audit)?`,
    `What are your sub-hour RTO (Recovery Time Objective) and RPO requirements for mission-critical databases/ERPs?`,
    `Who are the primary internal stakeholders involved in sign-off (${audience}, CISO, Procurement)?`
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(`Subject: ${autoresponderEmailSubject}\n\n${autoresponderEmailBody}`);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const handleCopyQuestions = () => {
    navigator.clipboard.writeText(discoveryQuestions.map((q, i) => `${i + 1}. ${q}`).join('\n'));
    setCopiedQuestions(true);
    setTimeout(() => setCopiedQuestions(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Lead Generation Blueprint
            </span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Conversion & Sales SDR Playbook
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            {assessmentName} Lead Strategy
          </h2>
          <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
            Pillar landing pages convert significantly higher when anchored around a high-value, non-intrusive enterprise assessment rather than a generic "Contact Us" form.
          </p>
        </div>

        {/* Lead Magnet Value Proposition Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-5 border-t border-slate-100">
          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-100 space-y-1">
            <div className="text-[11px] font-bold text-slate-500 uppercase">Assessment Format</div>
            <div className="text-xs font-bold text-slate-900">2-Week Automated & Architect-Led</div>
            <div className="text-[11px] text-slate-500">Zero impact on production operations</div>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-100 space-y-1">
            <div className="text-[11px] font-bold text-slate-500 uppercase">Primary Deliverable</div>
            <div className="text-xs font-bold text-slate-900">Executive TCO & Architecture Report</div>
            <div className="text-[11px] text-slate-500">Quantified ROI and risk mitigation roadmap</div>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-100 space-y-1">
            <div className="text-[11px] font-bold text-slate-500 uppercase">Target Persona</div>
            <div className="text-xs font-bold text-slate-900">{audience}</div>
            <div className="text-[11px] text-slate-500">Executive decision-makers with budget sign-off</div>
          </div>
        </div>
      </div>

      {/* Autoresponder Email Template */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Immediate Autoresponder Email (HubSpot / Marketo Copy)
            </h3>
          </div>
          <button
            onClick={handleCopyEmail}
            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition flex items-center gap-1.5"
          >
            {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedEmail ? 'Copied Email' : 'Copy Email'}
          </button>
        </div>

        <div className="p-5 bg-slate-50/50 space-y-3 font-mono text-xs">
          <div className="bg-white p-3 rounded border border-slate-200 text-slate-700">
            <span className="text-slate-400 font-bold">Subject: </span>
            <span className="font-semibold text-slate-900">{autoresponderEmailSubject}</span>
          </div>

          <div className="bg-white p-4 rounded border border-slate-200 text-slate-700 whitespace-pre-wrap leading-relaxed text-[11px] font-sans">
            {autoresponderEmailBody}
          </div>
        </div>
      </div>

      {/* SDR Sales Discovery Checklist */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900">
              SDR & Solution Architect Discovery Checklist (Call 1)
            </h3>
          </div>
          <button
            onClick={handleCopyQuestions}
            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition flex items-center gap-1.5"
          >
            {copiedQuestions ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedQuestions ? 'Copied Checklist' : 'Copy Questions'}
          </button>
        </div>

        <div className="p-5 space-y-3">
          {discoveryQuestions.map((question, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <p className="text-xs text-slate-800 font-medium leading-relaxed">
                {question}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
