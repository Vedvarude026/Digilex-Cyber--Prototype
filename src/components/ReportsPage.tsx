import React, { useState } from 'react';
import {
  FileText,
  Download,
  Eye,
  CheckCircle2,
  FileCode,
  PieChart,
  ShieldAlert
} from 'lucide-react';
import { ExecutiveReportModal } from './ExecutiveReportModal';

export const ReportsPage: React.FC = () => {
  const [showExecutiveModal, setShowExecutiveModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-2 border-b border-[#3D332B]">
        <h2 className="text-xl lg:text-2xl font-bold text-white tracking-tight font-sans">
          Executive Reports & Board Briefings
        </h2>
        <p className="text-xs lg:text-sm text-slate-400 font-sans mt-0.5">
          Generate board-ready executive summaries, CISO risk intelligence dossiers, and auditor compliance logs
        </p>
      </div>

      {/* REPORT TEMPLATES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* TEMPLATE 1: CISO & Board Executive Summary */}
        <div className="bg-[#241E1A] border-2 border-[#00E5FF]/60 rounded-xl p-5 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-[#00E5FF]/15 text-[#00E5FF] border border-[#00E5FF]/30 w-fit">
              <PieChart className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-[#00E5FF] uppercase tracking-widest bg-[#00E5FF]/15 px-2 py-0.5 rounded border border-[#00E5FF]/30">
                RECOMMENDED FOR BOARD
              </span>
              <h3 className="text-base font-bold text-white font-sans mt-2">
                CISO & Board Executive Briefing
              </h3>
              <p className="text-xs text-slate-400 font-sans mt-1">
                High-level financial risk exposure in ₹ INR, Expected Annual Loss (EAL), top 5 financial vulnerabilities, and optimized portfolio budget breakdown.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-[#3D332B] flex items-center justify-between">
            <button
              onClick={() => setShowExecutiveModal(true)}
              className="w-full py-2.5 rounded-lg bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-black font-extrabold text-xs font-sans shadow-md shadow-[#00E5FF]/20 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>Preview & Export PDF Report</span>
            </button>
          </div>
        </div>

        {/* TEMPLATE 2: Auditor Compliance & Controls Ledger */}
        <div className="bg-[#241E1A] border border-[#3D332B] rounded-xl p-5 space-y-4 shadow-lg flex flex-col justify-between">
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-[#00FF66]/15 text-[#00FF66] border border-[#00FF66]/30 w-fit">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-[#00FF66] uppercase tracking-widest bg-[#00FF66]/15 px-2 py-0.5 rounded border border-[#00FF66]/30">
                AUDIT READY
              </span>
              <h3 className="text-base font-bold text-white font-sans mt-2">
                Auditor ISO 27001 & CERT-In Ledger
              </h3>
              <p className="text-xs text-slate-400 font-sans mt-1">
                Detailed control gap findings mapped to ISO 27001:2022 Annex A, NIST CSF 2.0, and cryptographically verified event logs.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-[#3D332B]">
            <button
              onClick={() => alert('Exporting Auditor Compliance Ledger (JSON/CSV)...')}
              className="w-full py-2.5 rounded-lg bg-[#1C1C22] hover:bg-[#3D332B] border border-[#2D2D38] text-slate-200 font-bold text-xs font-sans transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export Auditor Ledger (CSV)</span>
            </button>
          </div>
        </div>

        {/* TEMPLATE 3: Security Operations Remediation Roadmap */}
        <div className="bg-[#241E1A] border border-[#3D332B] rounded-xl p-5 space-y-4 shadow-lg flex flex-col justify-between">
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/30 w-fit">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-500/15 px-2 py-0.5 rounded border border-amber-500/30">
                TECHNICAL ROADMAP
              </span>
              <h3 className="text-base font-bold text-white font-sans mt-2">
                SecOps ROI Remediation Action Plan
              </h3>
              <p className="text-xs text-slate-400 font-sans mt-1">
                Prioritized patch tickets sorted by ROSI yield, cost estimates, target assets, and team assignments.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-[#3D332B]">
            <button
              onClick={() => alert('Exporting SecOps Remediation Tickets...')}
              className="w-full py-2.5 rounded-lg bg-[#1C1C22] hover:bg-[#3D332B] border border-[#2D2D38] text-slate-200 font-bold text-xs font-sans transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export SecOps Tickets (Jira / JSON)</span>
            </button>
          </div>
        </div>
      </div>

      {showExecutiveModal && (
        <ExecutiveReportModal onClose={() => setShowExecutiveModal(false)} />
      )}
    </div>
  );
};
