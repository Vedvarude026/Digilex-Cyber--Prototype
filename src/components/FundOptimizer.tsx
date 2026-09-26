import React, { useState } from 'react';
import {
  Sliders,
  Sparkles,
  CheckCircle2,
  DollarSign,
  TrendingDown,
  ShieldCheck,
  Zap,
  RotateCcw
} from 'lucide-react';
import { OPTIMIZATION_PORTFOLIO_ITEMS, ORG_INFO } from '../data/mockData';
import { OptimizationItem } from '../types';
import { formatINR } from '../utils/formatters';

export const FundOptimizer: React.FC = () => {
  const [budget, setBudget] = useState<number>(5000000); // ₹50.00 Lakh
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>(
    OPTIMIZATION_PORTFOLIO_ITEMS.filter(i => i.defaultSelected).map(i => i.id)
  );

  const [isOptimizedView, setIsOptimizedView] = useState<boolean>(false);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  // Preset Buttons
  const presetBudgets = [
    { label: '₹10 L', value: 1000000 },
    { label: '₹25 L', value: 2500000 },
    { label: '₹50 L', value: 5000000 },
    { label: '₹1 Cr', value: 10000000 },
    { label: '₹2 Cr', value: 20000000 },
  ];

  // Selected totals
  const totalSelectedInvestment = selectedItemIds.reduce((sum, id) => {
    const item = OPTIMIZATION_PORTFOLIO_ITEMS.find(i => i.id === id);
    return sum + (item ? item.cost : 0);
  }, 0);

  const totalProjectedReduction = selectedItemIds.reduce((sum, id) => {
    const item = OPTIMIZATION_PORTFOLIO_ITEMS.find(i => i.id === id);
    return sum + (item ? item.riskReduction : 0);
  }, 0);

  const unusedBudget = Math.max(0, budget - totalSelectedInvestment);
  const remainingEal = Math.max(0, ORG_INFO.totalEal - totalProjectedReduction);
  const overallRosi = totalSelectedInvestment > 0 ? (totalProjectedReduction / totalSelectedInvestment).toFixed(2) : '0';

  const toggleItem = (id: string) => {
    setSelectedItemIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // 0/1 Knapsack Solver Simulation
  const handleRunKnapsackOptimization = () => {
    setIsCalculating(true);

    setTimeout(() => {
      // 0/1 Knapsack optimization algorithm over items
      const items = [...OPTIMIZATION_PORTFOLIO_ITEMS];
      const capacity = budget;

      // Dynamic programming / Greedy heuristic for knapsack
      let currentCost = 0;
      const optimalIds: string[] = [];

      // Sort items by value density (Risk Reduction / Cost)
      const sortedByDensity = [...items].sort((a, b) => (b.riskReduction / b.cost) - (a.riskReduction / a.cost));

      for (const item of sortedByDensity) {
        if (currentCost + item.cost <= capacity) {
          optimalIds.push(item.id);
          currentCost += item.cost;
        }
      }

      setSelectedItemIds(optimalIds);
      setIsCalculating(false);
      setIsOptimizedView(true);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-2 border-b border-[#3D332B]">
        <div className="flex items-center gap-2 text-xs font-mono text-[#C5A059] uppercase tracking-widest mb-1">
          <Sliders className="w-4 h-4 text-[#C5A059]" />
          0/1 Knapsack Decision Engine
        </div>
        <h2 className="text-xl lg:text-2xl font-bold text-white tracking-tight font-sans">
          Cybersecurity Fund Optimizer
        </h2>
        <p className="text-xs lg:text-sm text-slate-400 font-sans mt-0.5">
          "Maximize risk reduction within your cybersecurity budget."
        </p>
      </div>

      {/* TOP SECTION: BUDGET SLIDER & PRESETS */}
      <div className="bg-[#241E1A] border border-[#3D332B] rounded-xl p-5 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider font-sans block">
              Available Security Budget Cap
            </label>
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#C5A059] mt-0.5 block">
              {formatINR(budget)}
            </span>
          </div>

          {/* Presets */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-mono">Preset:</span>
            {presetBudgets.map(p => (
              <button
                key={p.label}
                onClick={() => setBudget(p.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                  budget === p.value
                    ? 'bg-[#C5A059] text-[#14100C] shadow-md shadow-[#C5A059]/10'
                    : 'bg-[#1B1713] border border-[#3D332B] text-slate-300 hover:border-slate-500'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Slider */}
        <div>
          <input
            type="range"
            min="500000"
            max="50000000"
            step="500000"
            value={budget}
            onChange={(e) => setBudget(parseInt(e.target.value))}
            className="w-full h-2 bg-[#1B1713] rounded-lg appearance-none cursor-pointer accent-[#C5A059]"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
            <span>₹5 L (Min)</span>
            <span>₹50 L (Default)</span>
            <span>₹5 Cr (Max Cap)</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 border-t border-[#3D332B] flex items-center justify-between">
          <button
            onClick={() => setSelectedItemIds([])}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-sans cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Clear Selection
          </button>

          <button
            onClick={handleRunKnapsackOptimization}
            disabled={isCalculating}
            className="px-5 py-2.5 rounded-xl bg-[#C5A059] hover:bg-[#B89047] text-[#14100C] font-extrabold text-xs font-sans shadow-lg shadow-[#C5A059]/10 transition flex items-center gap-2 cursor-pointer"
          >
            <Zap className="w-4 h-4 text-[#14100C] fill-[#14100C]" />
            <span>{isCalculating ? 'Computing Optimal Portfolio...' : 'Optimize Portfolio (0/1 Knapsack)'}</span>
          </button>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
        <div className="bg-[#241E1A] p-3.5 rounded-xl border border-[#3D332B] shadow-lg">
          <p className="text-[10px] uppercase text-slate-400 font-bold">Total Selected Investment</p>
          <p className={`text-xl font-extrabold mt-1 ${totalSelectedInvestment > budget ? 'text-rose-400' : 'text-[#C5A059]'}`}>
            {formatINR(totalSelectedInvestment)}
          </p>
          <p className="text-[10px] text-slate-500 mt-0.5">Budget Cap: {formatINR(budget)}</p>
        </div>

        <div className="bg-[#241E1A] p-3.5 rounded-xl border border-[#3D332B] shadow-lg">
          <p className="text-[10px] uppercase text-slate-400 font-bold">Unused Budget</p>
          <p className="text-xl font-extrabold text-slate-200 mt-1">
            {formatINR(unusedBudget)}
          </p>
          <p className="text-[10px] text-slate-500 mt-0.5">Capital Efficiency</p>
        </div>

        <div className="bg-[#241E1A] p-3.5 rounded-xl border border-[#3D332B] shadow-lg">
          <p className="text-[10px] uppercase text-slate-400 font-bold">Projected Risk Reduction</p>
          <p className="text-xl font-extrabold text-[#C5A059] mt-1">
            {formatINR(totalProjectedReduction)}
          </p>
          <p className="text-[10px] text-[#C5A059] font-bold mt-0.5">ROSI Yield: {overallRosi}x</p>
        </div>

        <div className="bg-[#241E1A] p-3.5 rounded-xl border border-[#3D332B] shadow-lg">
          <p className="text-[10px] uppercase text-slate-400 font-bold">Remaining EAL Exposure</p>
          <p className="text-xl font-extrabold text-rose-400 mt-1">
            {formatINR(remainingEal)}
          </p>
          <p className="text-[10px] text-slate-500 mt-0.5">Baseline: {formatINR(ORG_INFO.totalEal)}</p>
        </div>
      </div>

      {/* OPTIMIZED PORTFOLIO SUMMARY RESULT BANNER (Shown when optimized) */}
      {isOptimizedView && (
        <div className="bg-[#1B1713] border-2 border-[#C5A059] rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#C5A059] text-[#14100C] font-black">
                <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono font-bold text-[#14100C] bg-[#C5A059] px-2 py-0.5 rounded shadow-xs">
                  OPTIMIZED SECURITY PORTFOLIO GENERATED
                </span>
                <h3 className="text-lg font-bold text-white font-sans mt-1">
                  Optimal Risk Reduction Strategy
                </h3>
              </div>
            </div>

            <div className="text-right font-mono text-xs">
              <span className="text-[#C5A059] font-bold text-base block">{overallRosi}x Return</span>
              <span className="text-slate-400">ROSI Yield Per Rupee</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs pt-1">
            <div className="bg-[#241E1A] p-3 rounded-lg border border-[#C5A059]/30">
              <span className="text-slate-400 text-[10px] block">Budget Used</span>
              <span className="text-white font-bold text-sm">{formatINR(totalSelectedInvestment)} / {formatINR(budget)}</span>
            </div>
            <div className="bg-[#241E1A] p-3 rounded-lg border border-[#C5A059]/30">
              <span className="text-slate-400 text-[10px] block">Annual Risk Reduction</span>
              <span className="text-[#C5A059] font-bold text-sm">{formatINR(totalProjectedReduction)}</span>
            </div>
            <div className="bg-[#241E1A] p-3 rounded-lg border border-[#C5A059]/30">
              <span className="text-slate-400 text-[10px] block">Remaining Exposure</span>
              <span className="text-rose-400 font-bold text-sm">{formatINR(remainingEal)}</span>
            </div>
            <div className="bg-[#241E1A] p-3 rounded-lg border border-[#C5A059]/30">
              <span className="text-slate-400 text-[10px] block">Optimal Actions</span>
              <span className="text-[#C5A059] font-bold text-sm">{selectedItemIds.length} Selected</span>
            </div>
          </div>

          <div className="pt-2">
            <p className="text-xs font-bold text-white font-sans mb-2">Recommended Actions Checklist:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans">
              {selectedItemIds.map(id => {
                const item = OPTIMIZATION_PORTFOLIO_ITEMS.find(i => i.id === id);
                if (!item) return null;
                return (
                  <div key={id} className="flex items-center gap-2 bg-[#241E1A] p-2 rounded border border-[#C5A059]/30 text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <span className="truncate font-semibold">{item.action} ({formatINR(item.cost)})</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* OPTIMIZATION ACTIONS SELECTION MATRIX */}
      <div className="bg-[#241E1A] border border-[#3D332B] rounded-xl overflow-hidden shadow-lg p-5 space-y-3">
        <h3 className="text-base font-bold text-white font-sans">
          Remediation Investment Selection Matrix
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#3D332B] text-[11px] font-mono uppercase text-slate-400 bg-[#1B1713]">
                <th className="py-3 px-3 text-center">Select</th>
                <th className="py-3 px-4">Action Item</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3 text-right">Investment Cost</th>
                <th className="py-3 px-3 text-right">Risk Reduction</th>
                <th className="py-3 px-3 text-center">ROSI</th>
                <th className="py-3 px-3 text-right">Priority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3D332B] text-xs font-sans">
              {OPTIMIZATION_PORTFOLIO_ITEMS.map((item) => {
                const isSelected = selectedItemIds.includes(item.id);

                return (
                  <tr
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`transition cursor-pointer ${
                      isSelected ? 'bg-[#C5A059]/10 font-medium' : 'hover:bg-[#1B1713] text-slate-300'
                    }`}
                  >
                    <td className="py-3.5 px-3 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}} // handled by row onClick
                        className="w-4 h-4 rounded border-[#3D332B] bg-[#1B1713] text-[#C5A059] focus:ring-0 cursor-pointer"
                      />
                    </td>
                    <td className="py-3.5 px-4 font-bold text-white">
                      {item.action}
                    </td>
                    <td className="py-3.5 px-3 font-mono text-[#C5A059]">
                      <span className="bg-[#1B1713] px-2 py-0.5 rounded border border-[#3D332B] text-[11px] font-semibold text-[#C5A059]">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono text-slate-300">
                      {formatINR(item.cost)}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-bold text-[#C5A059]">
                      {formatINR(item.riskReduction)}
                    </td>
                    <td className="py-3.5 px-3 text-center font-mono font-bold text-[#C5A059] text-sm">
                      {item.rosi}x
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold border ${
                        item.priority === 'Fix First'
                          ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                          : item.priority === 'High Priority'
                          ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                          : 'bg-[#1B1713] text-slate-300 border-[#3D332B]'
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
