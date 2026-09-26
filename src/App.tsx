import React, { useState } from 'react';
import { ActiveTab } from './types';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { ExecutiveOverview } from './components/ExecutiveOverview';
import { RiskIntelligence } from './components/RiskIntelligence';
import { AssetsPage } from './components/AssetsPage';
import { VulnerabilitiesPage } from './components/VulnerabilitiesPage';
import { RemediationRanking } from './components/RemediationRanking';
import { FundOptimizer } from './components/FundOptimizer';
import { WhatIfSimulator } from './components/WhatIfSimulator';
import { ForecastingPage } from './components/ForecastingPage';
import { CompliancePage } from './components/CompliancePage';
import { AuditTrailPage } from './components/AuditTrailPage';
import { ThreatIntelPage } from './components/ThreatIntelPage';
import { ReportsPage } from './components/ReportsPage';
import { AiCopilotPage } from './components/AiCopilotPage';
import { SettingsPage } from './components/SettingsPage';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { ExecutiveReportModal } from './components/ExecutiveReportModal';
import { FloatingAiCopilot } from './components/FloatingAiCopilot';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <ExecutiveOverview setActiveTab={setActiveTab} onSelectPriority={() => setActiveTab('remediation')} />;
      case 'risk-intelligence':
        return <RiskIntelligence />;
      case 'assets':
        return <AssetsPage />;
      case 'vulnerabilities':
        return <VulnerabilitiesPage />;
      case 'remediation':
        return <RemediationRanking setActiveTab={setActiveTab} />;
      case 'fund-optimizer':
        return <FundOptimizer />;
      case 'what-if':
        return <WhatIfSimulator />;
      case 'forecasting':
        return <ForecastingPage />;
      case 'compliance':
        return <CompliancePage />;
      case 'audit-trail':
        return <AuditTrailPage />;
      case 'threat-intel':
        return <ThreatIntelPage />;
      case 'reports':
        return <ReportsPage />;
      case 'copilot':
        return <AiCopilotPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <ExecutiveOverview setActiveTab={setActiveTab} onSelectPriority={() => setActiveTab('remediation')} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#181512] text-slate-100 flex font-sans antialiased selection:bg-[#C5A059] selection:text-[#181512]">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenSearchModal={() => setShowSearchModal(true)}
          onOpenReportModal={() => setShowReportModal(true)}
          setMobileOpen={setMobileOpen}
        />

        {/* View Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto max-w-7xl w-full mx-auto">
          {renderContent()}
        </main>
      </div>

      {/* Global Modals */}
      {showSearchModal && (
        <GlobalSearchModal
          onClose={() => setShowSearchModal(false)}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            setShowSearchModal(false);
          }}
        />
      )}

      {showReportModal && (
        <ExecutiveReportModal isOpen={showReportModal} onClose={() => setShowReportModal(false)} />
      )}

      {/* Floating Copilot Drawer */}
      <FloatingAiCopilot />
    </div>
  );
};

export default App;
