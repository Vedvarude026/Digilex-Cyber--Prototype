import React, { useState } from 'react';
import {
  ClipboardCheck,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Clock,
  Search,
  Filter
} from 'lucide-react';
import { MOCK_COMPLIANCE_CONTROLS } from '../data/mockData';

export const CompliancePage: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredControls = MOCK_COMPLIANCE_CONTROLS.filter(item => {
    const matchesSearch =
      item.finding.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.controlGap.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.iso27001.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nistCsf.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.certIn.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'ALL' || item.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-2 border-b border-[#3D332B]">
        <h2 className="text-xl lg:text-2xl font-bold text-white tracking-tight font-sans">
          Compliance Intelligence & Framework Mapping
        </h2>
        <p className="text-xs lg:text-sm text-slate-400 font-sans mt-0.5">
          Mapping technical risk findings directly to ISO 27001:2022, NIST CSF 2.0, and CERT-In Directions
        </p>
      </div>

      {/* COMPLIANCE SCORE CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
        <div className="bg-[#241E1A] border border-[#3D332B] p-4.5 rounded-xl space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white">ISO 27001:2022</span>
            <span className="text-xs text-[#00FF66] font-bold bg-[#00FF66]/15 px-2.5 py-0.5 rounded border border-[#00FF66]/30">
              82% Compliant
            </span>
          </div>
          <div className="w-full bg-[#1B1713] h-2 rounded-full overflow-hidden border border-[#3D332B]">
            <div className="bg-[#00FF66] h-2 rounded-full transition-all duration-500 shadow-sm shadow-[#00FF66]/50" style={{ width: '82%' }} />
          </div>
          <p className="text-[11px] text-slate-400 font-sans leading-snug">
            A.12.6.1 Technical Vulnerability Management
          </p>
        </div>

        <div className="bg-[#241E1A] border border-[#3D332B] p-4.5 rounded-xl space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white">NIST CSF 2.0</span>
            <span className="text-xs text-amber-400 font-bold bg-amber-500/15 px-2.5 py-0.5 rounded border border-amber-500/30">
              76% Compliant
            </span>
          </div>
          <div className="w-full bg-[#1B1713] h-2 rounded-full overflow-hidden border border-[#3D332B]">
            <div className="bg-amber-400 h-2 rounded-full transition-all duration-500 shadow-sm shadow-amber-400/50" style={{ width: '76%' }} />
          </div>
          <p className="text-[11px] text-slate-400 font-sans leading-snug">
            PR.AA Identity Management & Access Control
          </p>
        </div>

        <div className="bg-[#241E1A] border border-[#3D332B] p-4.5 rounded-xl space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white">CERT-In Directions 2022</span>
            <span className="text-xs text-[#00FF66] font-bold bg-[#00FF66]/15 px-2.5 py-0.5 rounded border border-[#00FF66]/30">
              91% Compliant
            </span>
          </div>
          <div className="w-full bg-[#1B1713] h-2 rounded-full overflow-hidden border border-[#3D332B]">
            <div className="bg-[#00FF66] h-2 rounded-full transition-all duration-500 shadow-sm shadow-[#00FF66]/50" style={{ width: '91%' }} />
          </div>
          <p className="text-[11px] text-slate-400 font-sans leading-snug">
            6-Hour Mandatory Cyber Incident Reporting
          </p>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-[#241E1A] p-3.5 rounded-xl border border-[#3D332B] shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 bg-[#1B1713] px-3 py-1.5 rounded-lg border border-[#3D332B] w-full sm:w-auto">
          <Search className="w-4 h-4 text-slate-500 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search findings, control gaps..."
            className="bg-transparent text-white placeholder-slate-500 focus:outline-none w-full sm:w-64 font-sans text-xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end font-mono text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-300 font-medium">Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-[#1B1713] text-slate-200 border border-[#3D332B] rounded px-2.5 py-1 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#00E5FF]"
          >
            <option value="ALL">All Statuses</option>
            <option value="Needs Attention">Needs Attention</option>
            <option value="In Progress">In Progress</option>
            <option value="Compliant">Compliant</option>
          </select>
        </div>
      </div>

      {/* COMPLIANCE MAPPING TABLE */}
      <div className="bg-[#241E1A] border border-[#3D332B] rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#3D332B] text-[11px] font-mono uppercase text-slate-400 bg-[#1B1713]">
                <th className="py-3.5 px-4 font-bold w-64">Security Finding</th>
                <th className="py-3.5 px-4 font-bold min-w-[220px]">Control Gap</th>
                <th className="py-3.5 px-4 font-bold w-36">ISO 27001</th>
                <th className="py-3.5 px-4 font-bold w-36">NIST CSF 2.0</th>
                <th className="py-3.5 px-4 font-bold w-36">CERT-In</th>
                <th className="py-3.5 px-4 font-bold text-center w-36">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3D332B] text-xs font-sans">
              {filteredControls.map((item) => {
                const isNeedsAttention = item.status === 'Needs Attention';
                const isInProgress = item.status === 'In Progress';

                return (
                  <tr key={item.id} className="hover:bg-[#1C1C22] transition">
                    {/* Security Finding */}
                    <td className="py-4 px-4 font-bold text-white leading-snug align-middle">
                      {item.finding}
                    </td>

                    {/* Control Gap */}
                    <td className="py-4 px-4 text-slate-300 leading-relaxed align-middle">
                      {item.controlGap}
                    </td>

                    {/* ISO 27001 */}
                    <td className="py-4 px-4 font-mono text-[#00E5FF] font-bold align-middle whitespace-nowrap">
                      {item.iso27001}
                    </td>

                    {/* NIST CSF 2.0 */}
                    <td className="py-4 px-4 font-mono text-[#00E5FF] font-bold align-middle whitespace-nowrap">
                      {item.nistCsf}
                    </td>

                    {/* CERT-In */}
                    <td className="py-4 px-4 font-mono text-amber-400 font-bold align-middle whitespace-nowrap">
                      {item.certIn}
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4 text-center align-middle">
                      <span
                        className={`inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-md text-[10px] font-mono font-bold uppercase whitespace-nowrap border ${
                          isNeedsAttention
                            ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                            : isInProgress
                            ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                            : 'bg-[#00FF66]/20 text-[#00FF66] border-[#00FF66]/30'
                        }`}
                      >
                        {isNeedsAttention && <AlertCircle className="w-3 h-3 text-rose-400 shrink-0" />}
                        {isInProgress && <Clock className="w-3 h-3 text-amber-400 shrink-0" />}
                        {!isNeedsAttention && !isInProgress && <CheckCircle2 className="w-3 h-3 text-[#00FF66] shrink-0" />}
                        <span>{item.status}</span>
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
