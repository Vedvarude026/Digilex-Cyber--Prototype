import React from 'react';
import { ActiveTab } from '../types';
import {
  Search,
  Bell,
  FileSpreadsheet,
  Menu,
  Activity,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenReportModal: () => void;
  onOpenSearchModal: () => void;
  setMobileOpen?: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenReportModal,
  onOpenSearchModal,
  setMobileOpen
}) => {
  const getBreadcrumb = () => {
    switch (activeTab) {
      case 'overview':
        return { category: 'Overview', title: 'Executive Risk Intelligence' };
      case 'risk-intelligence':
        return { category: 'Risk Quantification', title: 'Financial Risk Engine' };
      case 'assets':
        return { category: 'Inventory', title: 'Asset Intelligence & Discovery' };
      case 'vulnerabilities':
        return { category: 'Intelligence', title: 'Vulnerability Impact Matrix' };
      case 'threat-intel':
        return { category: 'Threats', title: 'Threat Intelligence Feeds' };
      case 'remediation':
        return { category: 'Prioritization', title: 'Remediation ROI Ranking' };
      case 'fund-optimizer':
        return { category: 'Optimization', title: 'Knapsack Fund Optimizer' };
      case 'what-if':
        return { category: 'Simulation', title: 'Interactive What-If Simulator' };
      case 'forecasting':
        return { category: 'Predictive', title: 'Cyber Risk Trajectory Forecast' };
      case 'compliance':
        return { category: 'Governance', title: 'Compliance & Framework Mapping' };
      case 'audit-trail':
        return { category: 'Security', title: 'Immutable Cryptographic Audit Trail' };
      case 'reports':
        return { category: 'Exports', title: 'Executive Risk Reports' };
      case 'copilot':
        return { category: 'AI Assistant', title: 'DIGILEX Decision Copilot' };
      case 'settings':
        return { category: 'System', title: 'Platform Settings & Configurations' };
      default:
        return { category: 'Overview', title: 'Executive Risk Intelligence' };
    }
  };

  const breadcrumb = getBreadcrumb();

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#241E1A]/90 backdrop-blur-md border-b border-[#3D332B] shadow-lg px-4 lg:px-8 flex items-center justify-between">
      {/* Left Title & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileOpen?.(true)}
          className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg bg-[#1B1713] border border-[#3D332B]"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 font-sans">
            <span>{breadcrumb.category}</span>
            <span className="text-slate-500">/</span>
            <span className="text-[#FAF6EE] font-bold">{breadcrumb.title}</span>
          </div>
          <h1 className="text-base lg:text-lg font-bold text-white tracking-tight font-sans">
            {breadcrumb.title}
          </h1>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Live Monitoring Indicator */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/30 text-[#FAF6EE] text-xs font-mono font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A059] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C5A059]"></span>
          </span>
          <span className="font-semibold text-[11px]">Monitoring Active</span>
        </div>

        {/* Global Search Bar */}
        <button
          onClick={onOpenSearchModal}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1B1713] border border-[#3D332B] hover:border-[#C5A059]/50 text-slate-300 hover:text-white text-xs font-sans transition w-36 sm:w-60 justify-between"
        >
          <div className="flex items-center gap-2 truncate">
            <Search className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
            <span className="truncate text-slate-400">Search CVEs, assets...</span>
          </div>
          <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[9px] font-mono bg-[#241E1A] text-slate-300 rounded border border-[#3D332B] shadow-2xs">
            Ctrl K
          </kbd>
        </button>

        {/* Notifications */}
        <button
          onClick={onOpenSearchModal}
          className="relative p-2 rounded-lg bg-[#1B1713] border border-[#3D332B] text-slate-300 hover:text-white transition hover:bg-[#3D332B]"
          title="System Notifications"
        >
          <Bell className="w-4 h-4 text-slate-300" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#C5A059] rounded-full ring-2 ring-[#1B1713]" />
        </button>

        {/* AI Copilot Button */}
        <button
          onClick={() => setActiveTab('copilot')}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C5A059]/15 border border-[#C5A059]/30 text-[#FAF6EE] hover:bg-[#C5A059]/25 text-xs font-bold font-sans transition shadow-2xs cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>Copilot</span>
        </button>

        {/* Generate Report Button */}
        <button
          onClick={onOpenReportModal}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#C5A059] hover:bg-[#B89047] text-[#14100C] font-extrabold text-xs font-sans shadow-lg shadow-[#C5A059]/10 transition active:scale-98 cursor-pointer"
        >
          <FileSpreadsheet className="w-4 h-4 text-[#14100C] stroke-[2.5]" />
          <span className="hidden sm:inline">Generate Executive Report</span>
          <span className="sm:hidden">Report</span>
        </button>
      </div>
    </header>
  );
};
