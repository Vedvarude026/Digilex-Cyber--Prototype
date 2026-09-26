import React from 'react';
import {
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Calendar,
  BarChart2
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { FORECAST_TRAJECTORY_DATA, ORG_INFO } from '../data/mockData';
import { formatINR } from '../utils/formatters';

export const ForecastingPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-2 border-b border-[#3D332B]">
        <h2 className="text-xl lg:text-2xl font-bold text-white tracking-tight font-sans">
          Cyber Risk Trajectory Forecast
        </h2>
        <p className="text-xs lg:text-sm text-slate-400 font-sans mt-0.5">
          30 / 60 / 90 Day predictive financial risk exposure model
        </p>
      </div>

      {/* 3 Projections Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
        <div className="bg-[#241E1A] p-4 rounded-xl border border-[#3D332B] shadow-lg space-y-2">
          <span className="text-[10px] uppercase text-slate-400 font-bold flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[#C5A059]" /> 30-Day Projection
          </span>
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-xs text-rose-400 font-semibold block">No Patch: ₹5.12 Cr</span>
              <span className="text-xs text-[#C5A059] block font-bold">Optimized: ₹4.01 Cr</span>
            </div>
            <span className="text-xs text-[#C5A059] bg-[#C5A059]/15 px-2 py-0.5 rounded border border-[#C5A059]/30 font-bold">
              -₹1.11 Cr Gap
            </span>
          </div>
        </div>

        <div className="bg-[#241E1A] p-4 rounded-xl border border-[#3D332B] shadow-lg space-y-2">
          <span className="text-[10px] uppercase text-slate-400 font-bold flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[#C5A059]" /> 60-Day Projection
          </span>
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-xs text-rose-400 font-semibold block">No Patch: ₹5.74 Cr</span>
              <span className="text-xs text-[#C5A059] block font-bold">Optimized: ₹3.48 Cr</span>
            </div>
            <span className="text-xs text-[#C5A059] bg-[#C5A059]/15 px-2 py-0.5 rounded border border-[#C5A059]/30 font-bold">
              -₹2.26 Cr Gap
            </span>
          </div>
        </div>

        <div className="bg-[#241E1A] p-4 rounded-xl border border-[#3D332B] shadow-lg space-y-2">
          <span className="text-[10px] uppercase text-slate-400 font-bold flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[#C5A059]" /> 90-Day Projection
          </span>
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-xs text-rose-400 font-semibold block">No Patch: ₹6.45 Cr</span>
              <span className="text-xs text-[#C5A059] block font-bold">Optimized: ₹2.91 Cr</span>
            </div>
            <span className="text-xs text-[#C5A059] bg-[#C5A059]/15 px-2 py-0.5 rounded border border-[#C5A059]/30 font-bold">
              -₹3.54 Cr Gap
            </span>
          </div>
        </div>
      </div>

      {/* MAIN TRAJECTORY FORECAST CHART */}
      <div className="bg-[#241E1A] border border-[#3D332B] rounded-xl p-5 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-white font-sans flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#C5A059]" />
              90-Day Risk Trajectory Forecast Curve
            </h3>
            <p className="text-xs text-slate-400 font-sans">
              Comparing unmitigated exposure escalation vs prioritized remediation path
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono font-semibold">
            <span className="flex items-center gap-1.5 text-rose-400">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
              Scenario A: No Remediation
            </span>
            <span className="flex items-center gap-1.5 text-[#C5A059]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C5A059] inline-block" />
              Scenario B: Prioritized
            </span>
          </div>
        </div>

        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={FORECAST_TRAJECTORY_DATA} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3D332B" />
              <XAxis dataKey="stage" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12, fontFamily: 'JetBrains Mono' }} />
              <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'JetBrains Mono' }} tickFormatter={(v) => formatINR(v)} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-[#1B1713] border border-[#3D332B] p-3 rounded-lg shadow-xl text-xs font-mono">
                        <p className="text-white font-bold">{label}</p>
                        <p className="text-rose-400 font-semibold mt-1">Scenario A (No Patch): {formatINR(payload[0]?.value as number)}</p>
                        <p className="text-[#C5A059] font-bold">Scenario B (Prioritized): {formatINR(payload[1]?.value as number)}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line type="monotone" dataKey="unpatched" stroke="#f43f5e" strokeWidth={3} dot={{ fill: '#f43f5e', r: 5 }} />
              <Line type="monotone" dataKey="optimized" stroke="#C5A059" strokeWidth={3} dot={{ fill: '#C5A059', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* FORECAST DRIVERS */}
      <div className="bg-[#241E1A] border border-[#3D332B] rounded-xl p-5 space-y-4 shadow-lg">
        <h3 className="text-base font-bold text-white font-sans flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          Primary Forecast Risk Escalation Drivers
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-sans">
          <div className="bg-[#1B1713] p-3.5 rounded-lg border border-[#3D332B] space-y-1">
            <span className="text-[10px] font-mono uppercase text-rose-400 font-bold block">Contribution: +42%</span>
            <p className="font-bold text-white">Unpatched Critical CVEs</p>
            <p className="text-slate-400 text-[11px]">CVE-2026-48291 active exploit availability in zero-day forums.</p>
          </div>

          <div className="bg-[#1B1713] p-3.5 rounded-lg border border-[#3D332B] space-y-1">
            <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">Contribution: +28%</span>
            <p className="font-bold text-white">Active Exploit Campaign</p>
            <p className="text-slate-400 text-[11px]">Targeted threat activity against financial payment subnets.</p>
          </div>

          <div className="bg-[#1B1713] p-3.5 rounded-lg border border-[#3D332B] space-y-1">
            <span className="text-[10px] font-mono uppercase text-[#C5A059] font-bold block">Contribution: +18%</span>
            <p className="font-bold text-white">Internet Exposure</p>
            <p className="text-slate-400 text-[11px]">Publicly facing payment endpoints without rate limiting WAF.</p>
          </div>

          <div className="bg-[#1B1713] p-3.5 rounded-lg border border-[#3D332B] space-y-1">
            <span className="text-[10px] font-mono uppercase text-[#C5A059] font-bold block">Contribution: +12%</span>
            <p className="font-bold text-white">Patch Delay Window</p>
            <p className="text-slate-400 text-[11px]">Standard SLA gap allowing weaponized scanners time to probe.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
