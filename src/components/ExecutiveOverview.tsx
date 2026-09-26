import React from 'react';
import {
  TrendingUp,
  ShieldAlert,
  Zap,
  ArrowUpRight,
  ArrowRight,
  DollarSign,
  AlertTriangle,
  ExternalLink,
  Sliders,
  CheckCircle2,
  ChevronUp,
  ChevronDown,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { ORG_INFO, SECTOR_RISK_DATA, FORECAST_TRAJECTORY_DATA, TOP_RISK_PRIORITIES } from '../data/mockData';
import { formatINR, getRiskColorClass } from '../utils/formatters';
import { ActiveTab, TopRiskPriority } from '../types';

interface QuickInsight {
  id: string;
  category: string;
  title: string;
  summary: string;
  metricTag: string;
  badgeColor: string;
}

interface ExecutiveOverviewProps {
  setActiveTab: (tab: ActiveTab) => void;
  onSelectPriority?: (priority: TopRiskPriority) => void;
}

export const ExecutiveOverview: React.FC<ExecutiveOverviewProps> = ({
  setActiveTab,
  onSelectPriority
}) => {
  const [insights, setInsights] = React.useState<QuickInsight[]>([
    {
      id: "1",
      category: "Loss Surge Alert",
      title: "Payment Gateway Threat Surge",
      summary: "Unpatched RCE CVE-2026-48291 on Payment Server accounts for 39.6% of organizational EAL. Immediate hotfix eliminates ₹1.45 Cr risk.",
      metricTag: "+8.4% 30d EAL",
      badgeColor: "rose"
    },
    {
      id: "2",
      category: "Knapsack Optimization",
      title: "₹1.85 Cr Optimizable Risk",
      summary: "Allocating ₹50L budget across top 3 ranked assets mitigates ₹1.84 Cr in expected loss, achieving 3.68x Return on Security Investment.",
      metricTag: "₹1.85 Cr Savings",
      badgeColor: "emerald"
    },
    {
      id: "3",
      category: "Patch Speed Gains",
      title: "MTTR Reduced to 14.2 Days",
      summary: "Mean patch time dropped 17.9% over 30 days due to automated patch ranking, reducing threat exposure windows significantly.",
      metricTag: "-17.9% MTTR",
      badgeColor: "emerald"
    },
    {
      id: "4",
      category: "Sector Focus",
      title: "E-Commerce Concentration",
      summary: "Payment processing represents 43.5% of total operational risk exposure. Prioritizing API defense secures top revenue stream.",
      metricTag: "43.5% Sector Risk",
      badgeColor: "gold"
    }
  ]);
  const [isLoadingInsights, setIsLoadingInsights] = React.useState<boolean>(false);

  const fetchQuickInsights = React.useCallback(async () => {
    setIsLoadingInsights(true);
    try {
      const res = await fetch('/api/quick-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orgInfo: ORG_INFO, topPriorities: TOP_RISK_PRIORITIES })
      });
      const data = await res.json();
      if (data && data.insights && Array.isArray(data.insights) && data.insights.length > 0) {
        setInsights(data.insights);
      }
    } catch (err: any) {
      console.error("Failed to fetch quick insights:", err);
    } finally {
      setIsLoadingInsights(false);
    }
  }, []);

  React.useEffect(() => {
    fetchQuickInsights();
  }, [fetchQuickInsights]);
  return (
    <div className="space-y-6">
      {/* Top Greeting & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#3D332B]">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-white tracking-tight font-sans">
            Good evening, Security Team
          </h2>
          <p className="text-xs lg:text-sm text-slate-300 font-sans mt-0.5">
            Here is your organization's quantified cyber risk posture.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 self-start sm:self-auto">
          <div className="flex items-center gap-2 bg-[#1B1713] px-3.5 py-2 rounded-lg border border-[#3D332B] shadow-2xs">
            <span className="text-[10px] uppercase font-mono text-slate-400 tracking-wider">30d Posture:</span>
            <span className="inline-flex items-center gap-0.5 text-xs font-mono font-bold text-rose-400 bg-rose-500/15 px-2 py-0.5 rounded border border-rose-500/30" title="Overall EAL risk increase over last 30 days">
              <ChevronUp className="w-3.5 h-3.5 stroke-[2.5]" />
              +8.4%
            </span>
          </div>

          <div className="flex items-center gap-3 bg-[#1B1713] px-3.5 py-2 rounded-lg border border-[#3D332B] shadow-2xs">
            <div className="w-2 h-2 rounded-full bg-[#C5A059] animate-ping shrink-0" />
            <div className="text-left">
              <p className="text-[10px] uppercase font-mono text-slate-400 tracking-wider">Last Risk Calculation</p>
              <p className="text-xs font-mono font-bold text-[#C5A059]">{ORG_INFO.lastCalculation}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 30-Day Key Risk Metric Trend Summary Bar */}
      <div className="bg-[#1B1713] border border-[#3D332B] rounded-xl p-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-sans">
        <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#241E1A] border border-[#3D332B]">
          <span className="text-slate-400 text-[11px]">30d Risk Exposure</span>
          <span className="inline-flex items-center gap-1 font-mono font-bold text-rose-400 bg-rose-500/15 px-2 py-0.5 rounded border border-rose-500/30 text-[11px]" title="Risk increased over last 30 days">
            <ChevronUp className="w-3.5 h-3.5 stroke-[2.5]" />
            +8.4%
          </span>
        </div>

        <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#241E1A] border border-[#3D332B]">
          <span className="text-slate-400 text-[11px]">30d Critical Vulns</span>
          <span className="inline-flex items-center gap-1 font-mono font-bold text-rose-400 bg-rose-500/15 px-2 py-0.5 rounded border border-rose-500/30 text-[11px]" title="12 active critical vulns, up by 2 in last 30 days">
            <ChevronUp className="w-3.5 h-3.5 stroke-[2.5]" />
            +16.7%
          </span>
        </div>

        <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#241E1A] border border-[#3D332B]">
          <span className="text-slate-400 text-[11px]">30d Mean Patch Time</span>
          <span className="inline-flex items-center gap-1 font-mono font-bold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/30 text-[11px]" title="Remediation speed improved, MTTR down 3.1 days">
            <ChevronDown className="w-3.5 h-3.5 stroke-[2.5]" />
            -17.9%
          </span>
        </div>

        <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#241E1A] border border-[#3D332B]">
          <span className="text-slate-400 text-[11px]">30d ROSI Return</span>
          <span className="inline-flex items-center gap-1 font-mono font-bold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/30 text-[11px]" title="Security return on investment increased over last 30 days">
            <ChevronUp className="w-3.5 h-3.5 stroke-[2.5]" />
            +14.2%
          </span>
        </div>
      </div>

      {/* Primary KPI Cards (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* CARD 1: Total Expected Annual Loss */}
        <div className="bg-[#241E1A] border border-rose-500/30 hover:border-rose-500/60 p-4 rounded-xl shadow-lg relative overflow-hidden group transition">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300 font-sans">
              Total Expected Annual Loss
            </span>
            <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-3 flex items-baseline justify-between gap-2">
            <span className="text-2xl lg:text-3xl font-extrabold font-mono text-white tracking-tight">
              {formatINR(ORG_INFO.totalEal)}
            </span>
            <span className="inline-flex items-center text-xs font-mono text-rose-400 font-bold bg-rose-500/20 px-2 py-0.5 rounded border border-rose-500/30 shrink-0" title="Expected annual loss increase over last 30 days">
              <ChevronUp className="w-3.5 h-3.5 mr-0.5 stroke-[2.5]" /> +8.4%
              <span className="text-[10px] text-rose-300/80 font-sans font-normal ml-1">30d</span>
            </span>
          </div>

          <div className="mt-3 pt-2.5 border-t border-[#3D332B] flex items-center justify-between text-[11px] font-sans">
            <span className="text-slate-400">Exposure Status:</span>
            <span className="text-rose-400 font-bold font-mono bg-rose-500/20 px-2 py-0.5 rounded border border-rose-500/30">
              Critical Exposure
            </span>
          </div>
        </div>

        {/* CARD 2: Top Risk Driver */}
        <div className="bg-[#241E1A] border border-[#3D332B] hover:border-amber-500/60 p-4 rounded-xl shadow-lg relative overflow-hidden group transition">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300 font-sans">
              Top Risk Driver
            </span>
            <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-bold text-white font-sans truncate">
                Payment Gateway Server
              </p>
              <span className="inline-flex items-center text-[11px] font-mono text-rose-400 font-bold bg-rose-500/20 px-1.5 py-0.5 rounded border border-rose-500/30 shrink-0" title="Risk exposure surge over last 30 days">
                <ChevronUp className="w-3.5 h-3.5 mr-0.5 stroke-[2.5]" /> +5.2%
                <span className="text-[9px] text-rose-300/80 font-sans font-normal ml-0.5">30d</span>
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1 font-mono text-xs">
              <span className="text-rose-400 font-bold">EAL: {formatINR(19200000)}/yr</span>
            </div>
          </div>

          <div className="mt-2.5 pt-2 border-t border-[#3D332B] flex items-center justify-between text-[11px] font-mono">
            <span className="text-[#C5A059] bg-[#C5A059]/10 px-1.5 py-0.5 rounded border border-[#C5A059]/30 font-semibold">
              CVE-2026-48291
            </span>
            <span className="text-rose-400 font-bold bg-rose-500/20 px-2 py-0.5 rounded border border-rose-500/30">
              9.8 Critical
            </span>
          </div>
        </div>

        {/* CARD 3: Optimizable Risk */}
        <div className="bg-[#241E1A] border border-[#3D332B] hover:border-[#C5A059]/60 p-4 rounded-xl shadow-lg relative overflow-hidden group transition">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300 font-sans">
              Optimizable Risk
            </span>
            <div className="p-1.5 rounded-lg bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/30">
              <Zap className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-3 flex items-baseline justify-between gap-2">
            <span className="text-2xl lg:text-3xl font-extrabold font-mono text-[#C5A059] tracking-tight">
              {formatINR(ORG_INFO.optimizableRisk)}
            </span>
            <span className="inline-flex items-center text-xs font-mono text-emerald-400 font-bold bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30 shrink-0" title="Unmitigated risk reduced by 12.5% over last 30 days">
              <ChevronDown className="w-3.5 h-3.5 mr-0.5 stroke-[2.5]" /> -12.5%
              <span className="text-[10px] text-emerald-300/80 font-sans font-normal ml-1">30d</span>
            </span>
          </div>

          <div className="mt-3 pt-2.5 border-t border-[#3D332B] flex items-center justify-between text-[11px]">
            <button
              onClick={() => setActiveTab('fund-optimizer')}
              className="text-[#C5A059] hover:text-zinc-200 font-bold font-sans flex items-center gap-1 group-hover:underline cursor-pointer"
            >
              <span>Run Knapsack Optimizer</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* CARD 4: Current Security Budget */}
        <div className="bg-[#241E1A] border border-[#3D332B] hover:border-emerald-500/60 p-4 rounded-xl shadow-lg relative overflow-hidden group transition">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300 font-sans">
              Current Security Budget
            </span>
            <div className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-3 flex items-baseline justify-between gap-2">
            <span className="text-2xl lg:text-3xl font-extrabold font-mono text-white tracking-tight">
              {formatINR(ORG_INFO.currentBudget)}
            </span>
            <span className="inline-flex items-center text-xs font-mono text-emerald-400 font-bold bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30 shrink-0" title="ROSI Return efficiency gain over last 30 days">
              <ChevronUp className="w-3.5 h-3.5 mr-0.5 stroke-[2.5]" /> +14.2%
              <span className="text-[10px] text-emerald-300/80 font-sans font-normal ml-1">30d</span>
            </span>
          </div>

          <div className="mt-3 pt-2.5 border-t border-[#3D332B] flex items-center justify-between text-[11px]">
            <span className="text-slate-400 font-sans">ROSI Efficiency:</span>
            <span className="text-emerald-400 font-mono font-bold">3.68x Return</span>
          </div>
        </div>
      </div>

      {/* QUICK INSIGHT CARDS SECTION (Gemini API Automated Summaries) */}
      <div className="bg-[#241E1A] border border-[#3D332B] hover:border-[#C5A059]/40 rounded-xl p-4 shadow-lg space-y-3 transition">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#3D332B]/60 pb-2.5">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-[#C5A059]/15 border border-[#C5A059]/30 text-[#C5A059]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-sans flex items-center gap-2">
                Automated Quick Insights
                <span className="text-[10px] font-mono text-[#C5A059] bg-[#C5A059]/15 px-2 py-0.5 rounded border border-[#C5A059]/30 font-semibold">
                  Gemini API
                </span>
              </h3>
              <p className="text-[11px] text-slate-300 font-sans mt-0.5">
                Top-level automated executive risk summaries generated from live telemetry
              </p>
            </div>
          </div>

          <button
            onClick={fetchQuickInsights}
            disabled={isLoadingInsights}
            className="px-3 py-1.5 rounded-lg bg-[#1B1713] hover:bg-[#3D332B] border border-[#3D332B] text-xs font-bold font-sans text-[#C5A059] flex items-center gap-1.5 transition cursor-pointer disabled:opacity-50 self-start sm:self-auto"
            title="Re-query Gemini API for updated automated summaries"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingInsights ? 'animate-spin' : ''}`} />
            <span>Refresh Insights</span>
          </button>
        </div>

        {/* Quick Insight Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {isLoadingInsights
            ? [1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-[#1B1713] border border-[#3D332B] rounded-lg p-3 space-y-2 animate-pulse">
                  <div className="flex justify-between">
                    <div className="h-3 bg-[#3D332B] rounded w-1/3"></div>
                    <div className="h-3 bg-[#3D332B] rounded w-1/4"></div>
                  </div>
                  <div className="h-4 bg-[#3D332B] rounded w-3/4"></div>
                  <div className="h-10 bg-[#3D332B] rounded w-full"></div>
                </div>
              ))
            : insights.map((insight) => (
                <div
                  key={insight.id}
                  className="bg-[#1B1713] border border-[#3D332B] hover:border-[#C5A059]/60 rounded-lg p-3.5 shadow transition flex flex-col justify-between space-y-2 group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C5A059]">
                        {insight.category}
                      </span>
                      <span
                        className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                          insight.badgeColor === 'rose'
                            ? 'text-rose-400 bg-rose-500/15 border-rose-500/30'
                            : insight.badgeColor === 'emerald'
                            ? 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30'
                            : insight.badgeColor === 'amber'
                            ? 'text-amber-400 bg-amber-500/15 border-amber-500/30'
                            : 'text-[#C5A059] bg-[#C5A059]/15 border-[#C5A059]/30'
                        }`}
                      >
                        {insight.metricTag}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-white font-sans group-hover:text-[#C5A059] transition">
                      {insight.title}
                    </h4>

                    <p className="text-[11px] text-slate-300 font-sans leading-relaxed mt-1">
                      {insight.summary}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#3D332B]/60 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1 text-[#C5A059]">
                      <Sparkles className="w-3 h-3" />
                      Gemini Automated
                    </span>
                    <span className="text-slate-400">Live Posture</span>
                  </div>
                </div>
              ))}
        </div>
      </div>

      {/* MULTI-CHART EXECUTIVE VIEW (Split Screen) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT CARD: Cyber Risk Trajectory */}
        <div className="lg:col-span-7 bg-[#241E1A] border border-[#3D332B] rounded-xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-base font-bold text-white font-sans flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#C5A059]" />
                  Cyber Risk Trajectory
                </h3>
                <p className="text-xs text-slate-300 font-sans">
                  Projected organizational exposure over 90 days
                </p>
              </div>

              <div className="flex items-center gap-3 text-[11px] font-mono">
                <span className="flex items-center gap-1.5 text-rose-400 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                  No Remediation
                </span>
                <span className="flex items-center gap-1.5 text-[#C5A059] font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C5A059] inline-block" />
                  Prioritized Remediation
                </span>
              </div>
            </div>

            {/* Recharts Trajectory Line Chart */}
            <div className="h-64 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={FORECAST_TRAJECTORY_DATA}
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#3D332B" vertical={false} />
                  <XAxis
                    dataKey="stage"
                    stroke="#64748b"
                    tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'JetBrains Mono' }}
                  />
                  <YAxis
                    stroke="#64748b"
                    tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                    tickFormatter={(v) => formatINR(v)}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-[#1B1713] border border-[#3D332B] p-3 rounded-lg shadow-2xl text-xs font-mono">
                            <p className="text-white font-bold mb-1.5">{label}</p>
                            <p className="text-rose-400 font-bold">
                              Unpatched Exposure: {formatINR(payload[0]?.value as number)}
                            </p>
                            <p className="text-[#C5A059] font-bold">
                              Optimized Exposure: {formatINR(payload[1]?.value as number)}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="unpatched"
                    name="Unpatched Exposure"
                    stroke="#f43f5e"
                    strokeWidth={3}
                    dot={{ fill: '#f43f5e', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="optimized"
                    name="Optimized Exposure"
                    stroke="#C5A059"
                    strokeWidth={3}
                    dot={{ fill: '#C5A059', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#3D332B] flex items-center justify-between text-xs text-slate-300 font-sans">
            <span className="flex items-center gap-1.5">
              <span>Day 60 Forecast Gap: <strong className="text-[#C5A059] font-mono">₹2.26 Cr Risk Saved</strong></span>
              <span className="inline-flex items-center gap-0.5 text-emerald-400 font-mono text-[11px] font-bold bg-emerald-500/15 px-1.5 py-0.5 rounded border border-emerald-500/30" title="Projected risk decrease over 60 days">
                <ChevronDown className="w-3 h-3 stroke-[2.5]" /> -32.8%
              </span>
            </span>
            <button
              onClick={() => setActiveTab('forecasting')}
              className="text-[#C5A059] hover:text-zinc-200 font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>Full Forecast Analysis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* RIGHT CARD: Risk Exposure by Business Sector */}
        <div className="lg:col-span-5 bg-[#241E1A] border border-[#3D332B] rounded-xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="mb-2">
              <h3 className="text-base font-bold text-white font-sans">
                Risk Exposure by Business Sector
              </h3>
              <p className="text-xs text-slate-300 font-sans">
                Financial Expected Annual Loss per operational domain
              </p>
            </div>

            {/* Recharts Horizontal Bar Chart */}
            <div className="h-64 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={SECTOR_RISK_DATA}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#3D332B" horizontal={false} />
                  <XAxis
                    type="number"
                    stroke="#64748b"
                    tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                    tickFormatter={(v) => formatINR(v)}
                  />
                  <YAxis
                    type="category"
                    dataKey="sector"
                    stroke="#64748b"
                    tick={{ fill: '#cbd5e1', fontSize: 11, fontFamily: 'Plus Jakarta Sans' }}
                    width={100}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-[#1B1713] border border-[#3D332B] p-2.5 rounded-lg shadow-2xl text-xs font-mono">
                            <p className="text-white font-bold">{data.sector}</p>
                            <p className="text-[#C5A059] font-bold">EAL: {data.label}</p>
                            <p className="text-slate-400 text-[10px]">{data.percentage}% of total organizational risk</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="eal" radius={[0, 4, 4, 0]}>
                    {SECTOR_RISK_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color === '#2563eb' ? '#C5A059' : entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#3D332B] flex items-center justify-between text-xs text-slate-300 font-sans">
            <span className="flex items-center gap-1">
              <span>Highest Concentration: <strong className="text-rose-400 font-mono">Payments (43.5%)</strong></span>
              <span className="inline-flex items-center gap-0.5 text-rose-400 font-mono text-[11px] font-bold bg-rose-500/15 px-1.5 py-0.5 rounded border border-rose-500/30 ml-1" title="Sector concentration grew by 2.1% in 30 days">
                <ChevronUp className="w-3 h-3 stroke-[2.5]" /> +2.1% 30d
              </span>
            </span>
            <button
              onClick={() => setActiveTab('assets')}
              className="text-[#C5A059] hover:text-zinc-200 font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>Inspect Assets</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* TOP RISK PRIORITIES TABLE */}
      <div className="bg-[#241E1A] border border-[#3D332B] rounded-xl p-5 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-white font-sans flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              Highest Financial Risk Exposure
            </h3>
            <p className="text-xs text-slate-300 font-sans">
              Ranked by Expected Annual Loss (EAL) with 30-day performance trend indicators
            </p>
          </div>

          <button
            onClick={() => setActiveTab('remediation')}
            className="px-3 py-1.5 rounded-lg bg-[#1B1713] hover:bg-[#3D332B] border border-[#3D332B] text-[#C5A059] text-xs font-bold font-sans flex items-center gap-1.5 self-start sm:self-auto transition cursor-pointer"
          >
            <span>View Full Ranking Engine</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#3D332B] text-[11px] font-mono uppercase text-slate-300 bg-[#1B1713]">
                <th className="py-3 px-3 text-center">Priority</th>
                <th className="py-3 px-3">Asset</th>
                <th className="py-3 px-3">Vulnerability</th>
                <th className="py-3 px-3 text-center">CVSS</th>
                <th className="py-3 px-3 text-center">Likelihood</th>
                <th className="py-3 px-3 text-right">EAL (30d Trend)</th>
                <th className="py-3 px-3 text-right">Remediation Cost</th>
                <th className="py-3 px-3 text-center">ROSI</th>
                <th className="py-3 px-3 text-center">Action</th>
                <th className="py-3 px-3 text-right">Analysis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3D332B] text-xs font-sans">
              {TOP_RISK_PRIORITIES.map((item) => {
                const colorStyle = getRiskColorClass(item.cvssScore >= 9.0 ? 'CRITICAL' : item.cvssScore >= 8.0 ? 'HIGH' : 'MEDIUM');

                return (
                  <tr key={item.rank} className="hover:bg-[#1B1713]/60 transition group">
                    <td className="py-3.5 px-3 text-center font-mono font-bold text-slate-400">
                      #{item.rank}
                    </td>
                    <td className="py-3.5 px-3 font-bold text-white">
                      {item.assetName}
                    </td>
                    <td className="py-3.5 px-3 font-mono text-[#C5A059]">
                      <span className="bg-[#C5A059]/10 px-2 py-0.5 rounded border border-[#C5A059]/30 text-[11px] font-bold whitespace-nowrap text-[#C5A059]">
                        {item.cveId}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-center font-mono">
                      <span className={`px-2 py-0.5 rounded border font-bold text-[11px] ${colorStyle.badge}`}>
                        {item.cvssScore}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-center font-sans">
                      <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded text-[11px] font-bold whitespace-nowrap ${item.likelihood === 'Critical' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>
                        {item.likelihood}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-bold text-rose-400 whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <span>{formatINR(item.eal)}</span>
                        {item.trend30d && (
                          <span
                            className={`inline-flex items-center gap-0.5 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                              item.trend30d.isNegativeImpact
                                ? 'text-rose-400 bg-rose-500/15 border-rose-500/30'
                                : 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30'
                            }`}
                            title={`${item.trend30d.value} performance change over last 30 days`}
                          >
                            {item.trend30d.isIncrease ? (
                              <ChevronUp className="w-3 h-3 stroke-[2.5]" />
                            ) : (
                              <ChevronDown className="w-3 h-3 stroke-[2.5]" />
                            )}
                            {item.trend30d.value}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono text-slate-300">
                      {formatINR(item.remediationCost)}
                    </td>
                    <td className="py-3.5 px-3 text-center font-mono font-bold text-emerald-400">
                      {item.rosi}x
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30 font-mono text-[11px] font-bold whitespace-nowrap">
                        {item.action}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={() => {
                          if (typeof onSelectPriority === 'function') {
                            onSelectPriority(item);
                          } else if (typeof setActiveTab === 'function') {
                            setActiveTab('remediation');
                          }
                        }}
                        className="px-2.5 py-1 rounded bg-[#1B1713] hover:bg-[#C5A059] hover:text-[#14100C] border border-[#3D332B] text-[#C5A059] text-[11px] font-bold font-sans transition flex items-center gap-1 ml-auto cursor-pointer"
                      >
                        <span>View Analysis</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
