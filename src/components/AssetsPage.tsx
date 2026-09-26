import React, { useState } from 'react';
import {
  Server,
  Play,
  CheckCircle2,
  Filter,
  Search,
  ShieldAlert,
  Loader2,
  HardDrive,
  Database,
  Cloud,
  Laptop,
  Cpu
} from 'lucide-react';
import { MOCK_ASSETS } from '../data/mockData';
import { Asset, RiskLevel } from '../types';
import { formatINR, getRiskColorClass } from '../utils/formatters';
import { TablePagination } from './TablePagination';

export const AssetsPage: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>(MOCK_ASSETS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCriticality, setSelectedCriticality] = useState<string>('ALL');
  const [selectedEnv, setSelectedEnv] = useState<string>('ALL');

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  // Discovery Scan Simulation State
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [newAssetDiscovered, setNewAssetDiscovered] = useState(false);

  const handleRunDiscovery = () => {
    setScanning(true);
    setScanProgress(0);
    setNewAssetDiscovered(false);

    setTimeout(() => setScanProgress(23), 500);
    setTimeout(() => setScanProgress(67), 1200);
    setTimeout(() => {
      setScanProgress(100);
      setScanning(false);
      setNewAssetDiscovered(true);

      // Add a newly discovered asset to state
      const newlyFound: Asset = {
        id: `NEW-DISCOVERED-${Math.floor(Math.random() * 899 + 100)}`,
        name: 'PAY-SETTLE-GW-03',
        type: 'Settlement Processing Gateway',
        ipAddress: '10.0.12.199',
        environment: 'Production',
        criticality: 'HIGH',
        owner: 'Merchant Operations',
        dataClassification: 'PCI-DSS',
        vulnerabilitiesCount: 5,
        eal: 3800000,
        assetValue: 40000000
      };

      setAssets(prev => [newlyFound, ...prev]);
    }, 2000);
  };

  const filteredAssets = assets.filter(a => {
    const matchesSearch =
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.ipAddress.includes(searchQuery) ||
      a.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.type.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCrit = selectedCriticality === 'ALL' || a.criticality === selectedCriticality;
    const matchesEnv = selectedEnv === 'ALL' || a.environment === selectedEnv;

    return matchesSearch && matchesCrit && matchesEnv;
  });

  // Paginated Assets
  const paginatedAssets = filteredAssets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getAssetIcon = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes('db') || t.includes('database')) return Database;
    if (t.includes('cloud') || t.includes('aws') || t.includes('k8s')) return Cloud;
    if (t.includes('endpoint') || t.includes('laptop')) return Laptop;
    if (t.includes('api') || t.includes('gateway')) return Cpu;
    return HardDrive;
  };

  return (
    <div className="space-y-6">
      {/* Header & Run Scan Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#3D332B]">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-white tracking-tight font-sans">
            Asset Intelligence & Discovery
          </h2>
          <p className="text-xs lg:text-sm text-slate-400 font-sans mt-0.5">
            Real-time active network scanning, classification, and financial risk mapping
          </p>
        </div>

        <button
          onClick={handleRunDiscovery}
          disabled={scanning}
          className="px-4 py-2 rounded-lg bg-[#C5A059] hover:bg-[#B89047] disabled:bg-[#3D332B] disabled:text-slate-500 text-[#14100C] font-extrabold text-xs font-sans shadow-lg transition flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          {scanning ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-[#14100C]" />
              <span>Scanning ({scanProgress}%)...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-[#14100C] text-[#14100C]" />
              <span>Run Asset Discovery</span>
            </>
          )}
        </button>
      </div>

      {/* Discovery Progress Bar Banner */}
      {scanning && (
        <div className="bg-[#241E1A] border border-[#C5A059]/40 rounded-xl p-4 space-y-2 shadow-lg animate-pulse">
          <div className="flex items-center justify-between text-xs font-mono text-[#C5A059]">
            <span>Scanning network subnet 10.0.0.0/16...</span>
            <span className="font-bold">{scanProgress}%</span>
          </div>
          <div className="w-full bg-[#1B1713] rounded-full h-2 overflow-hidden border border-[#3D332B]">
            <div
              className="bg-[#C5A059] h-2 rounded-full transition-all duration-300"
              style={{ width: `${scanProgress}%` }}
            />
          </div>
        </div>
      )}

      {newAssetDiscovered && (
        <div className="bg-[#C5A059]/15 border border-[#C5A059]/30 rounded-lg p-3 text-[#C5A059] text-xs font-sans flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
            <span>New asset discovered: <strong>PAY-SETTLE-GW-03</strong> (10.0.12.199). Financial risk mapped: ₹38.00 L.</span>
          </div>
          <button onClick={() => setNewAssetDiscovered(false)} className="text-[#C5A059] font-bold hover:underline cursor-pointer">
            Dismiss
          </button>
        </div>
      )}

      {/* Criticality Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#241E1A] p-3 rounded-lg border border-rose-500/30 shadow-lg">
          <p className="text-[10px] font-mono uppercase text-slate-400 font-bold">Critical Infrastructure</p>
          <p className="text-lg font-mono font-bold text-rose-400 mt-0.5">3 Assets</p>
          <p className="text-[10px] text-slate-400 font-medium">Total EAL: {formatINR(39500000)}</p>
        </div>
        <div className="bg-[#241E1A] p-3 rounded-lg border border-amber-500/30 shadow-lg">
          <p className="text-[10px] font-mono uppercase text-slate-400 font-bold">High Criticality</p>
          <p className="text-lg font-mono font-bold text-amber-400 mt-0.5">3 Assets</p>
          <p className="text-[10px] text-slate-400 font-medium">Total EAL: {formatINR(9100000)}</p>
        </div>
        <div className="bg-[#241E1A] p-3 rounded-lg border border-[#C5A059]/30 shadow-lg">
          <p className="text-[10px] font-mono uppercase text-slate-400 font-bold">Medium Criticality</p>
          <p className="text-lg font-mono font-bold text-[#C5A059] mt-0.5">12 Assets</p>
          <p className="text-[10px] text-slate-400 font-medium">Total EAL: {formatINR(1200000)}</p>
        </div>
        <div className="bg-[#241E1A] p-3 rounded-lg border border-[#C5A059]/30 shadow-lg">
          <p className="text-[10px] font-mono uppercase text-slate-400 font-bold">Low / Endpoints</p>
          <p className="text-lg font-mono font-bold text-[#C5A059] mt-0.5">36 Assets</p>
          <p className="text-[10px] text-slate-400 font-medium">Total EAL: {formatINR(280000)}</p>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-[#241E1A] p-3.5 rounded-xl border border-[#3D332B] shadow-lg flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 w-full md:w-auto bg-[#1B1713] px-3 py-1.5 rounded-lg border border-[#3D332B]">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search assets, IPs, owners..."
            className="bg-transparent text-white placeholder-slate-500 focus:outline-none w-full md:w-60 font-sans text-xs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
          <div className="flex items-center gap-1.5 text-slate-400 font-medium">
            <Filter className="w-3.5 h-3.5" />
            <span>Criticality:</span>
          </div>
          <select
            value={selectedCriticality}
            onChange={(e) => {
              setSelectedCriticality(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-[#1B1713] text-slate-200 border border-[#3D332B] rounded px-2.5 py-1 font-mono text-xs font-medium focus:outline-none"
          >
            <option value="ALL">All Criticalities</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>

          <span className="text-slate-600">|</span>

          <span className="text-slate-400 font-medium">Env:</span>
          <select
            value={selectedEnv}
            onChange={(e) => {
              setSelectedEnv(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-[#1B1713] text-slate-200 border border-[#3D332B] rounded px-2.5 py-1 font-mono text-xs font-medium focus:outline-none"
          >
            <option value="ALL">All Environments</option>
            <option value="Production">Production</option>
            <option value="Staging">Staging</option>
            <option value="Corporate Network">Corporate Network</option>
          </select>
        </div>
      </div>

      {/* Asset Grid / Table */}
      <div className="bg-[#241E1A] border border-[#3D332B] rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#3D332B] text-[11px] font-mono uppercase text-slate-400 bg-[#1B1713]">
                <th className="py-3 px-4 font-bold">Asset Details</th>
                <th className="py-3 px-3 font-bold">IP Address</th>
                <th className="py-3 px-3 font-bold">Environment</th>
                <th className="py-3 px-3 font-bold text-center">Criticality</th>
                <th className="py-3 px-3 font-bold">Classification</th>
                <th className="py-3 px-3 font-bold">Owner</th>
                <th className="py-3 px-3 font-bold text-center">Vulns</th>
                <th className="py-3 px-3 font-bold text-right">EAL Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3D332B] text-xs font-sans">
              {paginatedAssets.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400 text-xs">
                    No assets found matching your criteria.
                  </td>
                </tr>
              ) : (
                paginatedAssets.map((asset) => {
                const Icon = getAssetIcon(asset.type);
                const critStyle = getRiskColorClass(asset.criticality);

                return (
                  <tr key={asset.id} className="hover:bg-[#1B1713] transition">
                    <td className="py-3.5 px-4 font-medium text-slate-200 align-middle">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded bg-[#1B1713] border border-[#3D332B] text-[#C5A059] shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-white text-xs">{asset.name}</p>
                          <p className="text-[11px] text-slate-400 font-sans">{asset.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 font-mono text-[#C5A059] font-semibold align-middle">
                      {asset.ipAddress}
                    </td>
                    <td className="py-3.5 px-3 align-middle">
                      <span className="px-2 py-0.5 rounded bg-[#1B1713] border border-[#3D332B] text-slate-300 font-mono text-[11px] font-medium">
                        {asset.environment}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-center align-middle">
                      <span className={`px-2 py-0.5 rounded border font-mono font-bold text-[10px] ${critStyle.badge}`}>
                        {asset.criticality}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 align-middle">
                      <span className="px-2 py-0.5 rounded bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30 text-[11px] font-mono font-bold">
                        {asset.dataClassification}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-slate-300 align-middle">
                      {asset.owner}
                    </td>
                    <td className="py-3.5 px-3 text-center font-mono font-bold text-amber-400 align-middle">
                      {asset.vulnerabilitiesCount}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-bold text-rose-400 align-middle">
                      {formatINR(asset.eal)}
                    </td>
                  </tr>
                );
              }))}
            </tbody>
          </table>
        </div>

        {/* Table Pagination Bar */}
        <TablePagination
          currentPage={currentPage}
          totalItems={filteredAssets.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
          itemName="assets"
        />
      </div>
    </div>
  );
};
