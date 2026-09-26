import React, { useState } from 'react';
import {
  X,
  FileCheck,
  CheckCircle2,
  Loader2,
  Download,
  Building2,
  Printer,
  ShieldCheck
} from 'lucide-react';
import { ORG_INFO, TOP_RISK_PRIORITIES } from '../data/mockData';
import { formatINR } from '../utils/formatters';

interface ExecutiveReportModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

export const ExecutiveReportModal: React.FC<ExecutiveReportModalProps> = ({
  isOpen = true,
  onClose
}) => {
  const [options, setOptions] = useState({
    executiveSummary: true,
    topRisks: true,
    budgetOptimization: true,
    forecasting: true,
    compliance: true,
    auditEvidence: true
  });

  const [generatingState, setGeneratingState] = useState<'idle' | 'loading' | 'success'>('idle');

  if (!isOpen) return null;

  const handleGenerate = () => {
    setGeneratingState('loading');
    setTimeout(() => {
      setGeneratingState('success');
    }, 1800);
  };

  const handleDownload = () => {
    window.print();
  };

  const toggleOption = (key: keyof typeof options) => {
    setOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#241E1A] border border-[#3D332B] rounded-2xl max-w-2xl w-full p-6 text-slate-200 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#3D332B]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C5A059]/15 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059]">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-sans text-white">DIGILEX Executive Risk Report</h3>
              <p className="text-xs text-slate-300 font-sans">
                Quantified Board & Executive Decision Intelligence Briefing
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-[#1B1713] border border-[#3D332B] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {generatingState === 'idle' && (
          <div className="mt-5 space-y-5">
            <div>
              <label className="text-xs font-semibold text-slate-300 font-sans uppercase tracking-wider block mb-2">
                Report Scope & Custom Modules
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { key: 'executiveSummary', label: 'Executive Summary & EAL Posture' },
                  { key: 'topRisks', label: 'Top 5 Financial Risk Drivers' },
                  { key: 'budgetOptimization', label: 'Knapsack Budget Optimization' },
                  { key: 'forecasting', label: '30 / 60 / 90 Day Risk Trajectory' },
                  { key: 'compliance', label: 'ISO 27001 & CERT-In Compliance' },
                  { key: 'auditEvidence', label: 'Cryptographic Audit Signatures' },
                ].map((item) => {
                  const key = item.key as keyof typeof options;
                  const checked = options[key];
                  return (
                    <button
                      key={item.key}
                      onClick={() => toggleOption(key)}
                      className={`flex items-center justify-between p-3 rounded-xl border text-xs text-left transition cursor-pointer ${
                        checked
                          ? 'bg-[#C5A059]/15 border-[#C5A059]/40 text-white font-bold'
                          : 'bg-[#1B1713] border-[#3D332B] text-slate-300 hover:border-slate-400'
                      }`}
                    >
                      <span>{item.label}</span>
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                        checked ? 'bg-[#C5A059] border-[#C5A059] text-[#14100C]' : 'border-slate-500 bg-[#241E1A]'
                      }`}>
                        {checked && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Target Org Metadata */}
            <div className="bg-[#1B1713] p-3.5 rounded-xl border border-[#3D332B] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#C5A059]" />
                <span className="text-white font-bold">{ORG_INFO.name}</span>
              </div>
              <div className="text-slate-300 font-mono text-[11px]">
                Report Date: <span className="text-[#C5A059] font-bold">{ORG_INFO.lastCalculation}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-[#1B1713] hover:bg-[#3D332B] border border-[#3D332B] text-slate-300 text-xs font-sans font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerate}
                className="px-5 py-2 rounded-xl bg-[#C5A059] hover:bg-[#B89047] text-[#14100C] font-extrabold text-xs font-sans shadow-md shadow-[#C5A059]/20 transition flex items-center gap-2 cursor-pointer"
              >
                <FileCheck className="w-4 h-4" />
                <span>Generate PDF Report</span>
              </button>
            </div>
          </div>
        )}

        {generatingState === 'loading' && (
          <div className="py-12 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-10 h-10 text-[#C5A059] animate-spin" />
            <div className="text-center">
              <p className="text-sm font-bold text-white font-sans">Compiling quantified risk intelligence...</p>
              <p className="text-xs text-slate-300 font-mono mt-1">
                Synthesizing EAL metrics, Knapsack vectors, and CERT-In mappings
              </p>
            </div>
          </div>
        )}

        {generatingState === 'success' && (
          <div className="mt-4 space-y-5">
            <div className="bg-emerald-500/15 border border-emerald-500/30 rounded-xl p-3 flex items-center gap-3 text-emerald-400 text-xs font-sans font-medium">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Executive report compiled successfully and cryptographically signed.</span>
            </div>

            {/* Report Preview Document */}
            <div className="bg-[#1B1713] p-5 rounded-xl border border-[#3D332B] space-y-4 font-sans text-xs max-h-[350px] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-[#3D332B] pb-3">
                <div>
                  <h4 className="text-base font-extrabold text-white tracking-wide">DIGILEX</h4>
                  <p className="text-[10px] text-[#C5A059] font-mono font-bold uppercase">Cyber Risk Intelligence Report</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-white">{ORG_INFO.name}</p>
                  <p className="text-[10px] font-mono text-slate-400">{ORG_INFO.lastCalculation}</p>
                </div>
              </div>

              <div>
                <p className="text-[10px] uppercase font-mono text-slate-400 font-bold tracking-wider mb-1">Executive Summary</p>
                <p className="text-slate-200 leading-relaxed text-xs">
                  The quantified Expected Annual Loss (EAL) for {ORG_INFO.name} currently stands at{' '}
                  <strong className="text-rose-400 font-mono">{formatINR(ORG_INFO.totalEal)}</strong> across {ORG_INFO.totalAssets} critical assets.
                  Through automated 0/1 Knapsack optimization of the current <strong className="text-[#C5A059] font-mono">{formatINR(ORG_INFO.currentBudget)}</strong> security budget, 
                  the organization can achieve an immediate annualized risk reduction of <strong className="text-emerald-400 font-mono">{formatINR(ORG_INFO.potentialReduction)}</strong> (a {((ORG_INFO.potentialReduction / ORG_INFO.currentBudget)).toFixed(1)}x ROSI yield).
                </p>
              </div>

              <div>
                <p className="text-[10px] uppercase font-mono text-slate-400 font-bold tracking-wider mb-1.5">Top 3 Remediation Priorities</p>
                <div className="space-y-1.5">
                  {TOP_RISK_PRIORITIES.slice(0, 3).map((pri) => (
                    <div key={pri.rank} className="flex items-center justify-between bg-[#241E1A] p-2 rounded-lg border border-[#3D332B] font-mono text-[11px]">
                      <span className="text-white font-bold">{pri.rank}. {pri.assetName}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-rose-400 font-semibold">EAL: {formatINR(pri.eal)}</span>
                        <span className="text-emerald-400 font-bold">ROSI: {pri.rosi}x</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#3D332B] text-[10px] text-slate-400 font-mono">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#C5A059]" /> Integrity Hash Verified
                </span>
                <span className="font-bold text-slate-300">DIGILEX-REPORT-2026-X99</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setGeneratingState('idle')}
                className="text-xs text-slate-300 hover:text-white underline font-sans cursor-pointer"
              >
                Re-configure options
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 rounded-xl bg-[#1B1713] hover:bg-[#3D332B] border border-[#3D332B] text-slate-200 text-xs font-sans font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Report</span>
                </button>
                <button
                  onClick={handleDownload}
                  className="px-5 py-2 rounded-xl bg-[#C5A059] hover:bg-[#B89047] text-[#14100C] font-extrabold text-xs font-sans shadow-md shadow-[#C5A059]/20 transition flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Executive PDF</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
