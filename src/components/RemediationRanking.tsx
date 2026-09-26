import React from 'react';
import {
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Award,
  Zap,
  ArrowRight
} from 'lucide-react';
import { OPTIMIZATION_PORTFOLIO_ITEMS } from '../data/mockData';
import { formatINR } from '../utils/formatters';
import { ActiveTab } from '../types';

interface RemediationRankingProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const RemediationRanking: React.FC<RemediationRankingProps> = ({ setActiveTab }) => {
  // Sort by ROSI yield descending
  const sortedItems = [...OPTIMIZATION_PORTFOLIO_ITEMS].sort((a, b) => b.rosi - a.rosi);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-2 border-b border-[#3D332B]">
        <h2 className="text-xl lg:text-2xl font-bold text-white tracking-tight font-sans">
          Fix What Matters Financially
        </h2>
        <p className="text-xs lg:text-sm text-slate-400 font-sans mt-0.5">
          ROI-based security remediation ranking algorithm maximizing risk reduction per rupee spent
        </p>
      </div>

      {/* Formula & Algorithm Banner */}
      <div className="bg-[#241E1A] border border-[#3D332B] rounded-xl p-5 shadow-lg space-y-3">
        <p className="text-[10px] uppercase font-mono text-[#C5A059] font-bold tracking-widest">
          Remediation Value & Return On Security Investment (ROSI) Algorithm
        </p>

        <div className="flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm font-mono text-slate-200">
          <div className="bg-[#C5A059]/15 border border-[#C5A059]/30 px-3 py-1.5 rounded text-[#C5A059] font-bold">
            REMEDIATION VALUE
          </div>
          <span className="text-slate-500 font-bold text-base">=</span>
          <div className="bg-[#C5A059]/15 border border-[#C5A059]/30 px-3 py-1.5 rounded text-[#C5A059] font-bold">
            Annualized Risk Reduction (₹)
          </div>
          <span className="text-slate-500 font-bold text-base">÷</span>
          <div className="bg-amber-500/20 border border-amber-500/30 px-3 py-1.5 rounded text-amber-400 font-bold">
            Remediation Investment Cost (₹)
          </div>
        </div>

        <div className="pt-2 border-t border-[#3D332B] flex flex-wrap items-center justify-between text-xs font-mono text-slate-400">
          <span>Efficiency Metric: <strong className="text-[#C5A059]">Risk Points Eliminated Per ₹10,000 Invested</strong></span>
          <button
            onClick={() => setActiveTab('fund-optimizer')}
            className="text-[#C5A059] hover:underline font-sans font-bold flex items-center gap-1 cursor-pointer"
          >
            <span>Run Budget Knapsack Optimization</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* TOP RANKED ACTION HIGHLIGHT (Rank #1) */}
      {sortedItems.length > 0 && (
        <div className="bg-[#1B1713] border-2 border-[#C5A059] rounded-2xl p-6 shadow-xl relative overflow-hidden space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C5A059] text-[#14100C] flex items-center justify-center font-black font-mono text-lg shadow-sm">
                #1
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-[#14100C] font-extrabold tracking-widest bg-[#C5A059] px-2 py-0.5 rounded shadow-xs">
                  TOP RECOMMENDATION — FIX FIRST
                </span>
                <h3 className="text-lg font-bold text-white font-sans mt-1">
                  {sortedItems[0].action}
                </h3>
              </div>
            </div>

            <div className="bg-[#241E1A] border border-[#3D332B] px-4 py-2 rounded-xl text-right font-mono self-start sm:self-auto shadow-sm">
              <span className="text-[10px] text-slate-400 uppercase block font-bold">ROSI Yield</span>
              <span className="text-2xl font-black text-[#C5A059]">{sortedItems[0].rosi}x Return</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono pt-2">
            <div className="bg-[#241E1A] p-3 rounded-xl border border-[#3D332B] shadow-sm">
              <span className="text-[10px] text-slate-400 uppercase block font-bold">Remediation Cost</span>
              <span className="text-white font-extrabold text-sm mt-0.5">{formatINR(sortedItems[0].cost)}</span>
            </div>
            <div className="bg-[#241E1A] p-3 rounded-xl border border-[#3D332B] shadow-sm">
              <span className="text-[10px] text-slate-400 uppercase block font-bold">Risk Reduced</span>
              <span className="text-[#C5A059] font-extrabold text-sm mt-0.5">{formatINR(sortedItems[0].riskReduction)}</span>
            </div>
            <div className="bg-[#241E1A] p-3 rounded-xl border border-[#3D332B] shadow-sm">
              <span className="text-[10px] text-slate-400 uppercase block font-bold">Affected Asset</span>
              <span className="text-[#C5A059] font-extrabold text-xs mt-0.5 truncate block">{sortedItems[0].assetName}</span>
            </div>
            <div className="bg-[#241E1A] p-3 rounded-xl border border-[#3D332B] shadow-sm">
              <span className="text-[10px] text-slate-400 uppercase block font-bold">Action Priority</span>
              <span className="text-rose-400 font-extrabold text-xs mt-0.5 uppercase block">FIX FIRST</span>
            </div>
          </div>
        </div>
      )}

      {/* RANKED REMEDIATION TABLE */}
      <div className="bg-[#241E1A] border border-[#3D332B] rounded-xl overflow-hidden shadow-lg space-y-3 p-5">
        <h3 className="text-base font-bold text-white font-sans flex items-center gap-2">
          <Award className="w-4 h-4 text-[#C5A059]" />
          Ranked Remediation Actions & ROI Yield
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#3D332B] text-[11px] font-mono uppercase text-slate-400 bg-[#1B1713]">
                <th className="py-3 px-4 font-bold">Rank</th>
                <th className="py-3 px-4 font-bold">Action Item</th>
                <th className="py-3 px-3 font-bold">Asset Target</th>
                <th className="py-3 px-3 font-bold text-right">Cost</th>
                <th className="py-3 px-3 font-bold text-right">Risk Reduction</th>
                <th className="py-3 px-3 font-bold text-center">ROSI</th>
                <th className="py-3 px-3 font-bold text-right">Recommendation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3D332B] text-xs font-sans">
              {sortedItems.map((item, index) => {
                const isFirst = index === 0;

                return (
                  <tr
                    key={item.id}
                    className={`transition ${isFirst ? 'bg-[#C5A059]/10 font-medium' : 'hover:bg-[#1B1713]'}`}
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-300 align-middle">
                      <span className={`w-6 h-6 rounded-full inline-flex items-center justify-center text-xs ${isFirst ? 'bg-[#C5A059] text-[#14100C] font-black' : 'bg-[#1B1713] text-slate-300'}`}>
                        {index + 1}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-white align-middle">
                      {item.action}
                    </td>
                    <td className="py-3.5 px-3 font-mono text-[#C5A059] font-semibold align-middle">
                      {item.assetName}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono text-slate-300 align-middle">
                      {formatINR(item.cost)}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-bold text-[#C5A059] align-middle">
                      {formatINR(item.riskReduction)}
                    </td>
                    <td className="py-3.5 px-3 text-center font-mono font-black text-[#C5A059] text-sm align-middle">
                      {item.rosi}x
                    </td>
                    <td className="py-3.5 px-3 text-right align-middle">
                      <span className={`px-2.5 py-1 rounded font-mono text-[10px] uppercase font-bold border ${
                        item.priority === 'Fix First'
                          ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                          : item.priority === 'High Priority'
                          ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                          : 'bg-[#C5A059]/15 text-[#C5A059] border-[#C5A059]/30'
                      }`}>
                        {item.priority}
                      </span>
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
