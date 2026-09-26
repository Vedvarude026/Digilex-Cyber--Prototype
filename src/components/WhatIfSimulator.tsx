import React, { useState } from 'react';
import {
  LineChart as LineChartIcon,
  Sliders,
  Sparkles,
  TrendingDown,
  Clock,
  DollarSign,
  Shield,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { ORG_INFO } from '../data/mockData';
import { formatINR } from '../utils/formatters';

export const WhatIfSimulator: React.FC = () => {
  // Scenario Toggles
  const [scenarios, setScenarios] = useState({
    patchVuln: true,
    enableMfa: true,
    improveMonitoring: false,
    deployEdr: false,
    networkSeg: true,
    delayRemediation: false
  });

  // Interactive Sliders
  const [patchDelayDays, setPatchDelayDays] = useState<number>(15); // 0-180 days
  const [securityInvestment, setSecurityInvestment] = useState<number>(4650000); // ₹46.5 L
  const [controlEffectiveness, setControlEffectiveness] = useState<number>(75); // 0-100%
  const [assetExposure, setAssetExposure] = useState<'Low' | 'Medium' | 'High'>('High');

  const toggleScenario = (key: keyof typeof scenarios) => {
    setScenarios(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Dynamic Computation
  const baseEal = ORG_INFO.totalEal; // ₹4.82 Cr

  // Calculate simulated EAL reduction based on sliders & chips
  let reductionPercent = 0;
  if (scenarios.patchVuln) reductionPercent += 28;
  if (scenarios.enableMfa) reductionPercent += 12;
  if (scenarios.improveMonitoring) reductionPercent += 14;
  if (scenarios.deployEdr) reductionPercent += 10;
  if (scenarios.networkSeg) reductionPercent += 8;

  // Delay penalty
  if (scenarios.delayRemediation || patchDelayDays > 30) {
    const penalty = Math.min(30, (patchDelayDays / 180) * 25);
    reductionPercent = Math.max(0, reductionPercent - penalty);
  }

  // Adjust for control effectiveness & investment
  const investmentBonus = Math.min(15, (securityInvestment / 20000000) * 15);
  const totalReductionRate = Math.min(78, reductionPercent + (controlEffectiveness / 100) * 10 + investmentBonus);

  const simulatedEal = Math.round(baseEal * (1 - totalReductionRate / 100));
  const riskReducedAmount = baseEal - simulatedEal;
  const attackLikelihoodSimulated = Math.max(12, Math.round(72 * (1 - totalReductionRate / 100)));
  const rosiSimulated = securityInvestment > 0 ? (riskReducedAmount / securityInvestment).toFixed(2) : '0';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-2 border-b border-[#3D332B]">
        <div className="flex items-center gap-2 text-xs font-mono text-[#C5A059] font-bold uppercase tracking-widest mb-1">
          <LineChartIcon className="w-4 h-4 text-[#C5A059]" />
          Predictive Decision Sandbox
        </div>
        <h2 className="text-xl lg:text-2xl font-bold text-white tracking-tight font-sans">
          Model Security Decisions Before Spending Money
        </h2>
        <p className="text-xs lg:text-sm text-slate-400 font-sans mt-0.5">
          Simulate strategic security investments, patch delays, and control changes in real-time
        </p>
      </div>

      {/* SCENARIO TOGGLE CHIPS */}
      <div className="bg-[#241E1A] border border-[#3D332B] rounded-xl p-5 space-y-3 shadow-lg">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider font-sans block">
          Scenario Controls: What happens if we...
        </label>

        <div className="flex flex-wrap items-center gap-2.5">
          {[
            { key: 'patchVuln', label: 'Patch Payment Vulnerability' },
            { key: 'enableMfa', label: 'Enable MFA Across Privileged Accounts' },
            { key: 'improveMonitoring', label: 'Improve SIEM SOC Monitoring' },
            { key: 'deployEdr', label: 'Deploy EDR Agent Suite' },
            { key: 'networkSeg', label: 'Isolate SWIFT Network Segment' },
            { key: 'delayRemediation', label: 'Delay Remediation Window' },
          ].map((chip) => {
            const key = chip.key as keyof typeof scenarios;
            const active = scenarios[key];

            return (
              <button
                key={chip.key}
                onClick={() => toggleScenario(key)}
                className={`px-3.5 py-2 rounded-xl text-xs font-sans font-semibold transition flex items-center gap-2 border cursor-pointer ${
                  active
                    ? 'bg-[#C5A059] border-[#C5A059] text-[#14100C] font-extrabold shadow-md shadow-[#C5A059]/20'
                    : 'bg-[#1B1713] border-[#3D332B] text-slate-300 hover:border-slate-500'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${active ? 'bg-[#14100C] animate-pulse' : 'bg-slate-500'}`} />
                <span>{chip.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* INTERACTIVE SLIDERS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SLIDER 1: Patch Delay */}
        <div className="bg-[#241E1A] border border-[#3D332B] rounded-xl p-5 space-y-3 shadow-lg">
          <div className="flex justify-between items-center text-xs font-sans">
            <span className="font-bold text-slate-200 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              Patch Delay Window
            </span>
            <span className="font-mono font-bold text-amber-400">{patchDelayDays} Days</span>
          </div>
          <input
            type="range"
            min="0"
            max="180"
            step="5"
            value={patchDelayDays}
            onChange={(e) => setPatchDelayDays(parseInt(e.target.value))}
            className="w-full h-1.5 bg-[#1B1713] rounded-lg appearance-none cursor-pointer accent-amber-400"
          />
          <p className="text-[11px] text-slate-400 font-sans">
            {patchDelayDays === 0 ? 'Immediate zero-delay patch execution.' : `Delaying remediation increases exposure penalty by ${(patchDelayDays * 0.15).toFixed(1)}%.`}
          </p>
        </div>

        {/* SLIDER 2: Security Investment */}
        <div className="bg-[#241E1A] border border-[#3D332B] rounded-xl p-5 space-y-3 shadow-lg">
          <div className="flex justify-between items-center text-xs font-sans">
            <span className="font-bold text-slate-200 flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-[#C5A059]" />
              Security Investment Budget
            </span>
            <span className="font-mono font-bold text-[#C5A059]">{formatINR(securityInvestment)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="20000000"
            step="500000"
            value={securityInvestment}
            onChange={(e) => setSecurityInvestment(parseInt(e.target.value))}
            className="w-full h-1.5 bg-[#1B1713] rounded-lg appearance-none cursor-pointer accent-[#C5A059]"
          />
          <p className="text-[11px] text-slate-400 font-sans">
            Cap investment to evaluate ROSI returns per rupee allocated.
          </p>
        </div>

        {/* SLIDER 3: Control Effectiveness */}
        <div className="bg-[#241E1A] border border-[#3D332B] rounded-xl p-5 space-y-3 shadow-lg">
          <div className="flex justify-between items-center text-xs font-sans">
            <span className="font-bold text-slate-200 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-[#C5A059]" />
              Control Effectiveness Rate
            </span>
            <span className="font-mono font-bold text-[#C5A059]">{controlEffectiveness}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={controlEffectiveness}
            onChange={(e) => setControlEffectiveness(parseInt(e.target.value))}
            className="w-full h-1.5 bg-[#1B1713] rounded-lg appearance-none cursor-pointer accent-[#C5A059]"
          />
          <p className="text-[11px] text-slate-400 font-sans">
            Compensating control enforcement efficiency.
          </p>
        </div>

        {/* SELECT 4: Asset Exposure */}
        <div className="bg-[#241E1A] border border-[#3D332B] rounded-xl p-5 space-y-3 shadow-lg">
          <div className="flex justify-between items-center text-xs font-sans">
            <span className="font-bold text-slate-200">Asset Exposure Level</span>
            <span className="font-mono font-bold text-[#C5A059]">{assetExposure} Exposure</span>
          </div>
          <div className="grid grid-cols-3 gap-2 font-mono text-xs">
            {(['Low', 'Medium', 'High'] as const).map(lvl => (
              <button
                key={lvl}
                onClick={() => setAssetExposure(lvl)}
                className={`py-2 rounded-lg border text-center font-bold transition cursor-pointer ${
                  assetExposure === lvl
                    ? 'bg-[#C5A059] border-[#C5A059] text-[#14100C]'
                    : 'bg-[#1B1713] border-[#3D332B] text-slate-400 hover:text-white'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-slate-400 font-sans">
            Network visibility & public internet accessibility setting.
          </p>
        </div>
      </div>

      {/* SCENARIO COMPARISON RESULT SUMMARY */}
      <div className="bg-[#241E1A] border-2 border-[#C5A059]/50 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-[#3D332B] pb-3">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase text-[#C5A059] tracking-wider">
              SIMULATION OUTPUT COMPARISON
            </span>
            <h3 className="text-lg font-bold text-white font-sans mt-0.5">
              Current Baseline vs Simulated Posture
            </h3>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#C5A059] bg-[#C5A059]/15 px-3 py-1 rounded-full border border-[#C5A059]/30 font-bold">
            <TrendingDown className="w-4 h-4 text-[#C5A059]" />
            <span>Risk Reduced: {totalReductionRate.toFixed(1)}%</span>
          </div>
        </div>

        {/* Dynamic Transition Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CURRENT STATE */}
          <div className="bg-[#1B1713] p-5 rounded-xl border border-rose-500/30 space-y-3 font-mono">
            <span className="text-xs uppercase text-slate-400 font-bold block border-b border-[#3D332B] pb-2">
              CURRENT STATE (UNTOUCHED)
            </span>
            <div className="space-y-2">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Expected Annual Loss (EAL)</p>
                <p className="text-2xl font-black text-rose-400">{formatINR(baseEal)}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Attack Exploitation Likelihood</p>
                <p className="text-sm font-bold text-amber-400">72% (Critical)</p>
              </div>
            </div>
          </div>

          {/* AFTER SIMULATION */}
          <div className="bg-[#1B1713] p-5 rounded-xl border border-[#C5A059]/40 space-y-3 font-mono relative overflow-hidden">
            <span className="text-xs uppercase text-[#C5A059] font-bold block border-b border-[#C5A059]/20 pb-2">
              AFTER SIMULATION (POST-DECISION)
            </span>
            <div className="space-y-2">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Simulated Expected Annual Loss</p>
                <p className="text-2xl font-black text-[#C5A059]">{formatINR(simulatedEal)}</p>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs pt-1">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Risk Reduction</p>
                  <p className="text-sm font-bold text-[#C5A059]">{totalReductionRate.toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Est. Investment</p>
                  <p className="text-xs font-bold text-[#C5A059] mt-0.5">{formatINR(securityInvestment)}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">ROSI Yield</p>
                  <p className="text-xs font-bold text-[#C5A059] mt-0.5">{rosiSimulated}x</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
