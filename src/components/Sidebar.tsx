import React from 'react';
import { ActiveTab } from '../types';
import {
  LayoutDashboard,
  ShieldAlert,
  Server,
  Bug,
  Globe2,
  TrendingUp,
  Sliders,
  LineChart,
  ClipboardCheck,
  History,
  FileText,
  Settings,
  Sparkles,
  ChevronDown,
  Building2,
  Lock,
  X
} from 'lucide-react';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  mobileOpen = false,
  setMobileOpen
}) => {
  const navItems = [
    { id: 'overview' as ActiveTab, label: 'Overview', icon: LayoutDashboard },
    { id: 'risk-intelligence' as ActiveTab, label: 'Risk Intelligence', icon: ShieldAlert },
    { id: 'assets' as ActiveTab, label: 'Assets', icon: Server },
    { id: 'vulnerabilities' as ActiveTab, label: 'Vulnerabilities', icon: Bug, badge: '247' },
    { id: 'threat-intel' as ActiveTab, label: 'Threat Intelligence', icon: Globe2, badge: '3 Alert' },
    { id: 'remediation' as ActiveTab, label: 'Remediation ROI', icon: TrendingUp },
    { id: 'fund-optimizer' as ActiveTab, label: 'Fund Optimizer', icon: Sliders, highlight: true },
    { id: 'what-if' as ActiveTab, label: 'What-If Simulator', icon: LineChart },
    { id: 'forecasting' as ActiveTab, label: 'Risk Forecasting', icon: LineChart },
    { id: 'compliance' as ActiveTab, label: 'Compliance', icon: ClipboardCheck },
    { id: 'audit-trail' as ActiveTab, label: 'Audit Trail', icon: History },
    { id: 'reports' as ActiveTab, label: 'Reports', icon: FileText },
    { id: 'copilot' as ActiveTab, label: 'DIGILEX Copilot', icon: Sparkles, ai: true },
    { id: 'settings' as ActiveTab, label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileOpen?.(false);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileOpen?.(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[250px] bg-[#241E1A] border-r border-[#3D332B] shadow-xl flex flex-col justify-between transition-transform duration-300 ease-in-out lg:sticky lg:top-0 lg:h-screen lg:shrink-0 lg:z-30 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header & Branding */}
        <div className="flex flex-col flex-1 min-h-0">
          <div className="p-5 border-b border-[#3D332B] flex items-center justify-between bg-[#1B1713]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#E5C17C] to-[#C5A059] flex items-center justify-center shadow-lg shadow-[#C5A059]/10 text-[#14100C]">
                <Lock className="w-5 h-5 font-bold text-[#14100C]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg tracking-wider text-white font-sans">
                    DIGILEX
                  </span>
                </div>
                <p className="text-[11px] text-[#C5A059] font-mono tracking-tight font-semibold">
                  Cyber Risk Intelligence
                </p>
              </div>
            </div>

            <button
              onClick={() => setMobileOpen?.(false)}
              className="lg:hidden p-1 text-slate-400 hover:text-white rounded-md hover:bg-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 overflow-y-auto flex-1 scrollbar-none">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-sans transition-all duration-150 group relative ${
                    isActive
                      ? 'bg-[#C5A059]/15 text-[#FAF6EE] font-bold border-l-2 border-[#C5A059] shadow-2xs'
                      : 'text-slate-400 hover:text-white hover:bg-[#3D332B]/50 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive
                          ? 'text-[#C5A059]'
                          : item.ai
                          ? 'text-[#C5A059]'
                          : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.highlight && (
                      <span className="text-[9px] uppercase px-1.5 py-0.5 rounded font-mono font-bold bg-[#C5A059]/20 text-[#FAF6EE] border border-[#C5A059]/40">
                        Knapsack
                      </span>
                    )}
                    {item.badge && (
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-semibold ${
                          item.badge.includes('Alert')
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            : 'bg-[#1B1713] text-slate-300 border border-[#3D332B]'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Org Selector & Admin User */}
        <div className="p-3 border-t border-[#3D332B] bg-[#1B1713] space-y-2.5">
          {/* Org Selector */}
          <div className="bg-[#241E1A] rounded-lg p-2 border border-[#3D332B] flex items-center justify-between cursor-pointer hover:border-[#C5A059]/50 shadow-2xs transition">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-6 h-6 rounded bg-[#C5A059]/15 text-[#C5A059] flex items-center justify-center shrink-0 border border-[#C5A059]/30">
                <Building2 className="w-3.5 h-3.5" />
              </div>
              <div className="truncate">
                <p className="text-[11px] font-bold text-white truncate">Acme Financial Services</p>
                <p className="text-[9px] text-[#C5A059] font-mono">FIN-IN-98102</p>
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-2.5 pt-1 px-1">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-[#241E1A] border border-[#C5A059]/40 flex items-center justify-center text-xs font-mono font-bold text-[#FAF6EE] shadow-2xs">
                SA
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#C5A059] ring-2 ring-[#1B1713]" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">Security Administrator</p>
              <p className="text-[10px] text-slate-400 font-mono truncate">admin@digilex.demo</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
