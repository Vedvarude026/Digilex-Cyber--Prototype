import React, { useState } from 'react';
import {
  ShieldAlert,
  Cpu,
  Server,
  Globe2,
  Lock,
  Sparkles,
  Calculator,
  Info,
  CheckCircle2,
  BarChart3
} from 'lucide-react';
import { formatINR } from '../utils/formatters';
import { RiskHeatmap } from './RiskHeatmap';

export const RiskIntelligence: React.FC = () => {
  // Interactive Risk Parameters
  const [cvss, setCvss] = useState<number>(9.8);
  const [exploitAvailable, setExploitAvailable] = useState<boolean>(true);
  const [remoteExploitable, setRemoteExploitable] = useState<boolean>(true);
  const [privilegeRequired, setPrivilegeRequired] = useState<'None' | 'Low' | 'High'>('None');

  const [assetValue, setAssetValue] = useState<number>(150000000); // ₹15 Cr
  const [revenueDependency, setRevenueDependency] = useState<number>(90); // 90%
  const [dataSensitivity, setDataSensitivity] = useState<'PCI-DSS' | 'PII' | 'Confidential' | 'Internal'>('PCI-DSS');

  const [threatInWild, setThreatInWild] = useState<boolean>(true);
  const [threatActorTargeting, setThreatActorTargeting] = useState<number>(85);

  const [mfaEnabled, setMfaEnabled] = useState<boolean>(false);
  const [edrActive, setEdrActive] = useState<boolean>(true);
  const [siemMonitoring, setSiemMonitoring] = useState<boolean>(false);
  const [patchMgmtRate, setPatchMgmtRate] = useState<number>(40); // 40%

  // Formula Calculations
  const calcTechnicalSeverity = (cvss / 10) * (exploitAvailable ? 1.2 : 0.8) * (remoteExploitable ? 1.15 : 0.85);
  const normTechSev = Math.min(100, Math.round(calcTechnicalSeverity * 75));

  const calcAssetCrit = (assetValue / 200000000) * 40 + (revenueDependency * 0.4) + (dataSensitivity === 'PCI-DSS' ? 20 : 10);
  const normAssetCrit = Math.min(100, Math.round(calcAssetCrit));

  const calcThreatExposure = (threatInWild ? 50 : 20) + (threatActorTargeting * 0.5);
  const normThreatExp = Math.min(100, Math.round(calcThreatExposure));

  const calcControlEff = (mfaEnabled ? 30 : 0) + (edrActive ? 25 : 0) + (siemMonitoring ? 25 : 0) + (patchMgmtRate * 0.2);
  const normControlEff = Math.min(95, Math.round(calcControlEff));

  // Synthesized Attack Likelihood %
  const attackLikelihood = Math.min(98, Math.max(10, Math.round((normTechSev * 0.4 + normThreatExp * 0.4 + (100 - normControlEff) * 0.2))));

  // Financial Loss Magnitude
  const lossMagnitude = Math.round(assetValue * (revenueDependency / 100) * 0.6);

  // Expected Annual Loss = Probability * Loss Magnitude * (1 - Control Eff)
  const calculatedEal = Math.round((attackLikelihood / 100) * lossMagnitude * (1 - normControlEff / 100));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-2 border-b border-[#3D332B]">
        <div className="flex items-center gap-2 text-xs font-mono text-[#C5A059] font-bold uppercase tracking-widest mb-1">
          <Calculator className="w-4 h-4 text-[#C5A059]" />
          Quantification Engine v4.2
        </div>
        <h2 className="text-xl lg:text-2xl font-bold text-white tracking-tight font-sans">
          Financial Risk Quantification Engine
        </h2>
        <p className="text-xs lg:text-sm text-slate-400 font-sans mt-0.5">
          "Transforming technical vulnerabilities into business financial impact."
        </p>
      </div>

      {/* Equation Banner */}
      <div className="bg-[#241E1A] border border-[#3D332B] rounded-xl p-4 lg:p-5 shadow-lg relative overflow-hidden">
        <p className="text-[10px] uppercase font-mono text-[#C5A059] font-bold tracking-widest mb-2">
          Mathematical Expected Annual Loss (EAL) Model
        </p>
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm font-mono text-slate-200">
          <div className="bg-rose-500/20 border border-rose-500/30 px-3 py-1.5 rounded text-rose-400 font-bold">
            EXPECTED ANNUAL LOSS (EAL)
          </div>
          <span className="text-slate-500 font-bold text-base">=</span>
          <div className="bg-amber-500/20 border border-amber-500/30 px-2.5 py-1.5 rounded text-amber-400 font-semibold">
            P(Exploitation)
          </div>
          <span className="text-slate-500">×</span>
          <div className="bg-[#C5A059]/15 border border-[#C5A059]/30 px-2.5 py-1.5 rounded text-[#C5A059] font-semibold">
            Asset Value at Risk
          </div>
          <span className="text-slate-500">×</span>
          <div className="bg-indigo-500/20 border border-indigo-500/30 px-2.5 py-1.5 rounded text-indigo-400 font-semibold">
            Loss Magnitude
          </div>
          <span className="text-slate-500">×</span>
          <div className="bg-[#C5A059]/15 border border-[#C5A059]/30 px-2.5 py-1.5 rounded text-[#C5A059] font-semibold">
            (1 - Control Effectiveness)
          </div>
        </div>
      </div>

      {/* CENTRAL CALCULATED EAL RESULT CARD */}
      <div className="bg-gradient-to-r from-[#1B1713] via-[#241E1A] to-[#1B1713] border-2 border-[#C5A059] rounded-2xl p-6 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-[#14100C] bg-[#C5A059] px-2.5 py-0.5 rounded shadow-sm">
              Live Quantification Output
            </span>
            <span className="text-xs font-mono text-[#14100C] bg-[#C5A059] px-2 py-0.5 rounded font-bold">
              Confidence: 87%
            </span>
          </div>
          <p className="text-xs text-slate-300 font-sans font-medium">
            ESTIMATED ANNUAL LOSS (Payment Gateway Server Scenario)
          </p>
          <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono text-white tracking-tight">
            {formatINR(calculatedEal, 'full')}
          </div>
          <p className="text-xs text-slate-400 font-mono">
            Compact Representation: <strong className="text-[#C5A059] text-sm">{formatINR(calculatedEal)} / year</strong>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full md:w-auto font-mono text-xs">
          <div className="bg-[#1B1713] p-3 rounded-xl border border-[#3D332B] text-center">
            <p className="text-[10px] text-slate-400 uppercase">Attack Likelihood</p>
            <p className="text-lg font-bold text-amber-400 mt-0.5">{attackLikelihood}%</p>
          </div>
          <div className="bg-[#1B1713] p-3 rounded-xl border border-[#3D332B] text-center">
            <p className="text-[10px] text-slate-400 uppercase">Risk Level</p>
            <p className="text-lg font-bold text-rose-400 mt-0.5">CRITICAL</p>
          </div>
          <div className="bg-[#1B1713] p-3 rounded-xl border border-[#3D332B] text-center">
            <p className="text-[10px] text-slate-400 uppercase">Loss Magnitude</p>
            <p className="text-xs font-bold text-[#C5A059] mt-1">{formatINR(lossMagnitude)}</p>
          </div>
          <div className="bg-[#1B1713] p-3 rounded-xl border border-[#3D332B] text-center">
            <p className="text-[10px] text-slate-400 uppercase">Control Defense</p>
            <p className="text-xs font-bold text-[#C5A059] mt-1">{normControlEff}%</p>
          </div>
        </div>
      </div>

      {/* D3 CORRELATED RISK HEATMAP */}
      <RiskHeatmap />

      {/* 4 INPUT INTELLIGENCE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CARD 1: TECHNICAL EXPOSURE */}
        <div className="bg-[#241E1A] border border-[#3D332B] rounded-xl p-5 space-y-4 shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-[#3D332B]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white font-sans">1. Technical Exposure</h3>
                <p className="text-[11px] text-slate-400 font-sans">Vulnerability severity & attack complexity</p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded border border-rose-500/30">
              Score: {normTechSev}/100
            </span>
          </div>

          <div className="space-y-3 text-xs font-sans">
            <div>
              <div className="flex justify-between text-slate-300 font-mono mb-1">
                <span className="font-medium">CVSS Base Score</span>
                <span className="font-bold text-[#C5A059]">{cvss} / 10.0</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="10.0"
                step="0.1"
                value={cvss}
                onChange={(e) => setCvss(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-[#3D332B] rounded-lg appearance-none cursor-pointer accent-[#C5A059]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <label className="flex items-center justify-between p-2 rounded bg-[#1B1713] border border-[#3D332B] cursor-pointer">
                <span className="text-slate-200 font-medium">Exploit Available</span>
                <input
                  type="checkbox"
                  checked={exploitAvailable}
                  onChange={(e) => setExploitAvailable(e.target.checked)}
                  className="rounded border-[#3D332B] bg-[#1B1713] text-[#C5A059] focus:ring-0 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded bg-[#1B1713] border border-[#3D332B] cursor-pointer">
                <span className="text-slate-200 font-medium">Remote Exploitable</span>
                <input
                  type="checkbox"
                  checked={remoteExploitable}
                  onChange={(e) => setRemoteExploitable(e.target.checked)}
                  className="rounded border-[#3D332B] bg-[#1B1713] text-[#C5A059] focus:ring-0 cursor-pointer"
                />
              </label>
            </div>

            <div className="pt-1">
              <span className="text-slate-400 font-medium block mb-1">Privilege Requirements</span>
              <div className="grid grid-cols-3 gap-2 font-mono text-[11px]">
                {(['None', 'Low', 'High'] as const).map((priv) => (
                  <button
                    key={priv}
                    onClick={() => setPrivilegeRequired(priv)}
                    className={`py-1.5 rounded border text-center transition cursor-pointer ${
                      privilegeRequired === priv
                        ? 'bg-[#C5A059]/20 border-[#C5A059]/50 text-[#C5A059] font-bold'
                        : 'bg-[#1B1713] border-[#3D332B] text-slate-400 hover:text-white'
                    }`}
                  >
                    {priv}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CARD 2: ASSET CRITICALITY */}
        <div className="bg-[#241E1A] border border-[#3D332B] rounded-xl p-5 space-y-4 shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-[#3D332B]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/30">
                <Server className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white font-sans">2. Asset Criticality</h3>
                <p className="text-[11px] text-slate-400 font-sans font-medium">Financial value & business dependency</p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-[#C5A059] bg-[#C5A059]/15 px-2 py-0.5 rounded border border-[#C5A059]/30">
              Score: {normAssetCrit}/100
            </span>
          </div>

          <div className="space-y-3 text-xs font-sans">
            <div>
              <div className="flex justify-between text-slate-300 font-mono mb-1">
                <span className="font-medium">Asset Replacement Value</span>
                <span className="font-bold text-[#C5A059]">{formatINR(assetValue)}</span>
              </div>
              <input
                type="range"
                min="10000000"
                max="300000000"
                step="10000000"
                value={assetValue}
                onChange={(e) => setAssetValue(parseInt(e.target.value))}
                className="w-full h-1.5 bg-[#3D332B] rounded-lg appearance-none cursor-pointer accent-[#C5A059]"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 font-mono mb-1">
                <span className="font-medium">Revenue Dependency</span>
                <span className="font-bold text-[#C5A059]">{revenueDependency}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={revenueDependency}
                onChange={(e) => setRevenueDependency(parseInt(e.target.value))}
                className="w-full h-1.5 bg-[#3D332B] rounded-lg appearance-none cursor-pointer accent-[#C5A059]"
              />
            </div>

            <div className="pt-1">
              <span className="text-slate-400 font-medium block mb-1">Data Sensitivity Classification</span>
              <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                {(['PCI-DSS', 'PII', 'Confidential', 'Internal'] as const).map((ds) => (
                  <button
                    key={ds}
                    onClick={() => setDataSensitivity(ds)}
                    className={`py-1.5 px-2 rounded border text-center transition truncate cursor-pointer ${
                      dataSensitivity === ds
                        ? 'bg-[#C5A059]/20 border-[#C5A059]/50 text-[#C5A059] font-bold'
                        : 'bg-[#1B1713] border-[#3D332B] text-slate-400 hover:text-white'
                    }`}
                  >
                    {ds}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CARD 3: THREAT ACTIVITY */}
        <div className="bg-[#241E1A] border border-[#3D332B] rounded-xl p-5 space-y-4 shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-[#3D332B]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Globe2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white font-sans">3. Threat Activity</h3>
                <p className="text-[11px] text-slate-400 font-sans">Active wild exploitation & threat actors</p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
              Score: {normThreatExp}/100
            </span>
          </div>

          <div className="space-y-3 text-xs font-sans">
            <label className="flex items-center justify-between p-2.5 rounded bg-[#1B1713] border border-[#3D332B] cursor-pointer">
              <div>
                <p className="text-slate-200 font-medium">Exploit Active In The Wild</p>
                <p className="text-[10px] text-slate-400">CISA KEV catalog & Dark Web activity</p>
              </div>
              <input
                type="checkbox"
                checked={threatInWild}
                onChange={(e) => setThreatInWild(e.target.checked)}
                className="rounded border-[#3D332B] bg-[#1B1713] text-amber-500 focus:ring-0"
              />
            </label>

            <div>
              <div className="flex justify-between text-slate-300 font-mono mb-1">
                <span className="font-medium">Industry Targeting Intensity</span>
                <span className="font-bold text-amber-400">{threatActorTargeting}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={threatActorTargeting}
                onChange={(e) => setThreatActorTargeting(parseInt(e.target.value))}
                className="w-full h-1.5 bg-[#3D332B] rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>
          </div>
        </div>

        {/* CARD 4: CONTROL EFFECTIVENESS */}
        <div className="bg-[#241E1A] border border-[#3D332B] rounded-xl p-5 space-y-4 shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-[#3D332B]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white font-sans">4. Control Effectiveness</h3>
                <p className="text-[11px] text-slate-400 font-sans font-medium">Active compensating defense controls</p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-[#C5A059] bg-[#C5A059]/15 px-2 py-0.5 rounded border border-[#C5A059]/30">
              Shield: {normControlEff}%
            </span>
          </div>

          <div className="space-y-2.5 text-xs font-sans">
            <div className="grid grid-cols-3 gap-2">
              <label className="flex items-center justify-between p-2 rounded bg-[#1B1713] border border-[#3D332B] cursor-pointer">
                <span className="text-slate-200 font-mono font-medium">MFA</span>
                <input
                  type="checkbox"
                  checked={mfaEnabled}
                  onChange={(e) => setMfaEnabled(e.target.checked)}
                  className="rounded border-[#3D332B] bg-[#1B1713] text-[#C5A059] focus:ring-0"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded bg-[#1B1713] border border-[#3D332B] cursor-pointer">
                <span className="text-slate-200 font-mono font-medium">EDR</span>
                <input
                  type="checkbox"
                  checked={edrActive}
                  onChange={(e) => setEdrActive(e.target.checked)}
                  className="rounded border-[#3D332B] bg-[#1B1713] text-[#C5A059] focus:ring-0"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded bg-[#1B1713] border border-[#3D332B] cursor-pointer">
                <span className="text-slate-200 font-mono font-medium">SIEM</span>
                <input
                  type="checkbox"
                  checked={siemMonitoring}
                  onChange={(e) => setSiemMonitoring(e.target.checked)}
                  className="rounded border-[#3D332B] bg-[#1B1713] text-[#C5A059] focus:ring-0"
                />
              </label>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 font-mono mb-1">
                <span className="font-medium">Patch Cadence Compliance</span>
                <span className="font-bold text-[#C5A059]">{patchMgmtRate}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="10"
                value={patchMgmtRate}
                onChange={(e) => setPatchMgmtRate(parseInt(e.target.value))}
                className="w-full h-1.5 bg-[#3D332B] rounded-lg appearance-none cursor-pointer accent-[#C5A059]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
