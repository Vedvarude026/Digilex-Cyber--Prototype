import React, { useState } from 'react';
import {
  Bug,
  Filter,
  ArrowUpDown,
  Search,
  AlertOctagon,
  ShieldAlert,
  Flame,
  Globe,
  ExternalLink,
  CheckCircle2,
  XCircle,
  X
} from 'lucide-react';
import { MOCK_VULNERABILITIES } from '../data/mockData';
import { Vulnerability } from '../types';
import { formatINR, getRiskColorClass } from '../utils/formatters';
import { TablePagination } from './TablePagination';

export const VulnerabilitiesPage: React.FC = () => {
  const [vulns] = useState<Vulnerability[]>(MOCK_VULNERABILITIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState<string>('ALL');
  const [sortOption, setSortOption] = useState<string>('EAL_DESC');
  const [selectedVuln, setSelectedVuln] = useState<Vulnerability | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  // Filter & Sort Logic
  const filteredVulns = vulns.filter(v => {
    const matchesSearch =
      v.cveId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.assetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filterMode === 'CRITICAL') return v.cvssSeverity === 'CRITICAL';
    if (filterMode === 'HIGH') return v.cvssSeverity === 'HIGH';
    if (filterMode === 'KNOWN_EXPLOITED') return v.knownExploited;
    if (filterMode === 'PATCH_AVAILABLE') return v.patchAvailable;
    if (filterMode === 'CLOUD') return v.isCloudAsset;
    if (filterMode === 'INTERNET_FACING') return v.isInternetFacing;

    return true;
  });

  const sortedVulns = [...filteredVulns].sort((a, b) => {
    if (sortOption === 'EAL_DESC') return b.eal - a.eal;
    if (sortOption === 'ROSI_DESC') return b.rosi - a.rosi;
    if (sortOption === 'CVSS_DESC') return b.cvssScore - a.cvssScore;
    if (sortOption === 'NEWEST') return b.discoveredDate.localeCompare(a.discoveredDate);
    return 0;
  });

  // Paginated Vulnerabilities
  const paginatedVulns = sortedVulns.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-2 border-b border-[#3D332B]">
        <h2 className="text-xl lg:text-2xl font-bold text-white tracking-tight font-sans">
          Vulnerability Intelligence & Attack Synthesis
        </h2>
        <p className="text-xs lg:text-sm text-slate-400 font-sans mt-0.5">
          Real-time vulnerability impact mapping, exploitation likelihood, and financial risk ranking
        </p>
      </div>

      {/* Summary Stat Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-[#241E1A] p-3 rounded-lg border border-[#3D332B] shadow-lg">
          <p className="text-[10px] font-mono uppercase text-slate-400 font-bold">Total Vulns</p>
          <p className="text-xl font-mono font-extrabold text-white mt-0.5">247</p>
        </div>
        <div className="bg-[#241E1A] p-3 rounded-lg border border-rose-500/30 shadow-lg">
          <p className="text-[10px] font-mono uppercase text-slate-400 font-bold">Critical (CVSS 9.0+)</p>
          <p className="text-xl font-mono font-extrabold text-rose-400 mt-0.5">12</p>
        </div>
        <div className="bg-[#241E1A] p-3 rounded-lg border border-amber-500/30 shadow-lg">
          <p className="text-[10px] font-mono uppercase text-slate-400 font-bold">High (CVSS 7.0-8.9)</p>
          <p className="text-xl font-mono font-extrabold text-amber-400 mt-0.5">46</p>
        </div>
        <div className="bg-[#241E1A] p-3 rounded-lg border border-[#C5A059]/30 shadow-lg">
          <p className="text-[10px] font-mono uppercase text-slate-400 font-bold">Medium (CVSS 4.0-6.9)</p>
          <p className="text-xl font-mono font-extrabold text-[#C5A059] mt-0.5">103</p>
        </div>
        <div className="bg-[#241E1A] p-3 rounded-lg border border-[#C5A059]/30 shadow-lg">
          <p className="text-[10px] font-mono uppercase text-slate-400 font-bold">Low Severity</p>
          <p className="text-xl font-mono font-extrabold text-[#C5A059] mt-0.5">86</p>
        </div>
      </div>

      {/* ATTACK LIKELIHOOD SYNTHESIS PANEL */}
      <div className="bg-[#241E1A] border border-amber-500/30 rounded-xl p-5 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" />
              <h3 className="text-base font-bold text-white font-sans">Attack Likelihood Intelligence Synthesis</h3>
            </div>
            <p className="text-xs text-slate-400 font-sans mt-0.5">
              Composite organizational exploitation probability calculated across active threat vectors
            </p>
          </div>

          <div className="flex items-center gap-3 bg-[#1B1713] border border-amber-500/40 px-4 py-2 rounded-xl text-amber-400 font-mono self-start sm:self-auto shadow-sm">
            <span className="text-2xl font-black text-amber-400">72%</span>
            <div className="text-left leading-tight">
              <span className="text-[10px] uppercase block font-bold text-amber-400">HIGH LIKELIHOOD</span>
              <span className="text-[9px] text-slate-400 font-sans font-medium">OF EXPLOITATION</span>
            </div>
          </div>
        </div>

        {/* Probability Component Bars */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2 text-xs font-sans">
          <div className="bg-[#1B1713] p-2.5 rounded border border-[#3D332B] shadow-sm">
            <span className="text-slate-400 block text-[10px] font-medium">Technical Exploitability</span>
            <span className="text-rose-400 font-mono font-bold text-sm">+22%</span>
          </div>
          <div className="bg-[#1B1713] p-2.5 rounded border border-[#3D332B] shadow-sm">
            <span className="text-slate-400 block text-[10px] font-medium">Exploit Available</span>
            <span className="text-rose-400 font-mono font-bold text-sm">+18%</span>
          </div>
          <div className="bg-[#1B1713] p-2.5 rounded border border-[#3D332B] shadow-sm">
            <span className="text-slate-400 block text-[10px] font-medium">Active Threat Activity</span>
            <span className="text-amber-400 font-mono font-bold text-sm">+16%</span>
          </div>
          <div className="bg-[#1B1713] p-2.5 rounded border border-[#3D332B] shadow-sm">
            <span className="text-slate-400 block text-[10px] font-medium">Internet Exposure</span>
            <span className="text-amber-400 font-mono font-bold text-sm">+12%</span>
          </div>
          <div className="bg-[#1B1713] p-2.5 rounded border border-[#3D332B] shadow-sm">
            <span className="text-slate-400 block text-[10px] font-medium">Weak Monitoring</span>
            <span className="text-[#C5A059] font-mono font-bold text-sm">+4%</span>
          </div>
        </div>
      </div>

      {/* Toolbar: Search, Filters & Sorting */}
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
            placeholder="Search CVEs, asset names, descriptions..."
            className="bg-transparent text-white placeholder-slate-500 focus:outline-none w-full md:w-64 font-sans text-xs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
          <button
            onClick={() => {
              setFilterMode('ALL');
              setCurrentPage(1);
            }}
            className={`px-2.5 py-1 rounded font-mono text-xs font-bold transition cursor-pointer ${filterMode === 'ALL' ? 'bg-[#C5A059] text-[#14100C]' : 'bg-[#1B1713] text-slate-300 hover:text-white'}`}
          >
            All
          </button>
          <button
            onClick={() => {
              setFilterMode('CRITICAL');
              setCurrentPage(1);
            }}
            className={`px-2.5 py-1 rounded font-mono text-xs font-bold transition cursor-pointer ${filterMode === 'CRITICAL' ? 'bg-rose-500 text-white' : 'bg-[#1B1713] text-slate-300 hover:text-white'}`}
          >
            Critical
          </button>
          <button
            onClick={() => {
              setFilterMode('KNOWN_EXPLOITED');
              setCurrentPage(1);
            }}
            className={`px-2.5 py-1 rounded font-mono text-xs font-bold transition cursor-pointer ${filterMode === 'KNOWN_EXPLOITED' ? 'bg-amber-500 text-black' : 'bg-[#1B1713] text-slate-300 hover:text-white'}`}
          >
            Known Exploited
          </button>

          <span className="text-slate-600">|</span>

          <div className="flex items-center gap-1.5 text-slate-400 font-medium">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Sort:</span>
          </div>
          <select
            value={sortOption}
            onChange={(e) => {
              setSortOption(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-[#1B1713] text-slate-200 border border-[#3D332B] rounded px-2 py-1 font-mono text-xs font-medium focus:outline-none"
          >
            <option value="EAL_DESC">Highest EAL</option>
            <option value="ROSI_DESC">Highest ROSI</option>
            <option value="CVSS_DESC">Highest CVSS</option>
            <option value="NEWEST">Newest CVE</option>
          </select>
        </div>
      </div>

      {/* VULNERABILITY TABLE */}
      <div className="bg-[#241E1A] border border-[#3D332B] rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#3D332B] text-[11px] font-mono uppercase text-slate-400 bg-[#1B1713]">
                <th className="py-3 px-4 font-bold">CVE Identifier</th>
                <th className="py-3 px-3 font-bold">Affected Asset</th>
                <th className="py-3 px-3 font-bold text-center">CVSS</th>
                <th className="py-3 px-3 font-bold">Exploit Status</th>
                <th className="py-3 px-3 font-bold text-center">KEV</th>
                <th className="py-3 px-3 font-bold text-center">Patch</th>
                <th className="py-3 px-3 font-bold text-right">EAL Loss</th>
                <th className="py-3 px-3 font-bold text-right">Cost</th>
                <th className="py-3 px-3 font-bold text-center">ROSI</th>
                <th className="py-3 px-3 font-bold text-center">Priority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3D332B] text-xs font-sans">
              {paginatedVulns.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-slate-400 text-xs">
                    No vulnerabilities found matching your search or filters.
                  </td>
                </tr>
              ) : (
                paginatedVulns.map((v) => {
                const cvssStyle = getRiskColorClass(v.cvssSeverity);

                return (
                  <tr
                    key={v.cveId}
                    onClick={() => setSelectedVuln(v)}
                    className="hover:bg-[#1B1713] transition cursor-pointer group"
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-[#C5A059] align-middle">
                      <span className="bg-[#C5A059]/10 px-2 py-0.5 rounded border border-[#C5A059]/30 group-hover:border-[#C5A059]">
                        {v.cveId}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-bold text-slate-200 align-middle">
                      {v.assetName}
                    </td>
                    <td className="py-3.5 px-3 text-center font-mono align-middle">
                      <span className={`px-2 py-0.5 rounded border font-bold text-[11px] ${cvssStyle.badge}`}>
                        {v.cvssScore}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-mono align-middle">
                      <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${v.exploitStatus === 'ACTIVE' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-[#1B1713] text-slate-300 border border-[#3D332B]'}`}>
                        {v.exploitStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-center align-middle">
                      {v.knownExploited ? (
                        <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 font-mono font-bold text-[10px]">
                          YES
                        </span>
                      ) : (
                        <span className="text-slate-500 font-mono text-[10px]">NO</span>
                      )}
                    </td>
                    <td className="py-3.5 px-3 text-center align-middle">
                      {v.patchAvailable ? (
                        <CheckCircle2 className="w-4 h-4 text-[#C5A059] inline" />
                      ) : (
                        <XCircle className="w-4 h-4 text-slate-500 inline" />
                      )}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-bold text-rose-400 align-middle">
                      {formatINR(v.eal)}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono text-slate-300 align-middle">
                      {formatINR(v.remediationCost)}
                    </td>
                    <td className="py-3.5 px-3 text-center font-mono font-bold text-[#C5A059] align-middle">
                      {v.rosi}x
                    </td>
                    <td className="py-3.5 px-3 text-center align-middle">
                      <span className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase whitespace-nowrap ${v.priority === 'Fix Immediately' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-[#1B1713] text-slate-300 border border-[#3D332B]'}`}>
                        {v.priority}
                      </span>
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
          totalItems={sortedVulns.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
          itemName="vulnerabilities"
        />
      </div>

      {/* DETAIL DRAWER / MODAL */}
      {selectedVuln && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#241E1A] border border-[#3D332B] rounded-xl max-w-xl w-full p-6 text-slate-200 shadow-2xl relative space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-[#3D332B]">
              <div>
                <span className="text-xs font-mono font-bold text-[#C5A059] bg-[#C5A059]/15 px-2 py-0.5 rounded border border-[#C5A059]/30">
                  {selectedVuln.cveId}
                </span>
                <h3 className="text-base font-bold text-white font-sans mt-2">
                  {selectedVuln.assetName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedVuln(null)}
                className="p-1 text-slate-400 hover:text-white rounded-lg bg-[#1B1713] border border-[#3D332B] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300 font-sans leading-relaxed bg-[#1B1713] p-3 rounded border border-[#3D332B]">
              {selectedVuln.description}
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-[#1B1713] p-2.5 rounded border border-[#3D332B]">
                <span className="text-slate-400 block text-[10px] font-bold">Expected Annual Loss</span>
                <span className="text-rose-400 font-bold text-base">{formatINR(selectedVuln.eal)}</span>
              </div>
              <div className="bg-[#1B1713] p-2.5 rounded border border-[#3D332B]">
                <span className="text-slate-400 block text-[10px] font-bold">Remediation Cost</span>
                <span className="text-slate-200 font-bold text-base">{formatINR(selectedVuln.remediationCost)}</span>
              </div>
              <div className="bg-[#1B1713] p-2.5 rounded border border-[#3D332B]">
                <span className="text-slate-400 block text-[10px] font-bold">ROSI Yield</span>
                <span className="text-[#C5A059] font-bold text-base">{selectedVuln.rosi}x</span>
              </div>
              <div className="bg-[#1B1713] p-2.5 rounded border border-[#3D332B]">
                <span className="text-slate-400 block text-[10px] font-bold">CVSS Score</span>
                <span className="text-amber-400 font-bold text-base">{selectedVuln.cvssScore} / 10.0</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end">
              <button
                onClick={() => setSelectedVuln(null)}
                className="px-4 py-2 rounded bg-[#C5A059] hover:bg-[#B89047] text-[#14100C] font-extrabold text-xs font-sans cursor-pointer"
              >
                Close Analysis
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
