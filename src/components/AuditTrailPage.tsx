import React, { useState } from 'react';
import {
  ShieldCheck,
  Clock,
  User,
  Hash,
  CheckCircle2,
  Lock,
  Search,
  Filter
} from 'lucide-react';
import { MOCK_AUDIT_EVENTS } from '../data/mockData';

export const AuditTrailPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [eventTypeFilter, setEventTypeFilter] = useState('ALL');

  const filteredEvents = MOCK_AUDIT_EVENTS.filter((evt) => {
    const matchesSearch =
      evt.actionSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.cryptographicHash.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = eventTypeFilter === 'ALL' || evt.eventType === eventTypeFilter;

    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#3D332B]">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-white tracking-tight font-sans">
            Immutable Audit Trail Log
          </h2>
          <p className="text-xs lg:text-sm text-slate-400 font-sans mt-0.5">
            Cryptographically stamped security decision & optimization event ledger
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#00FF66]/15 border border-[#00FF66]/30 px-3.5 py-1.5 rounded-xl text-[#00FF66] text-xs font-mono font-bold self-start sm:self-auto shrink-0 shadow-lg">
          <ShieldCheck className="w-4 h-4 text-[#00FF66] shrink-0" />
          <span>Ledger Integrity: VERIFIED (SHA-256)</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#241E1A] p-3.5 rounded-xl border border-[#3D332B] shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 bg-[#1B1713] px-3 py-1.5 rounded-lg border border-[#3D332B] w-full sm:w-auto">
          <Search className="w-4 h-4 text-slate-500 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events, actors, hashes..."
            className="bg-transparent text-white placeholder-slate-500 focus:outline-none w-full sm:w-64 font-sans text-xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end font-mono text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-300 font-medium">Event Type:</span>
          <select
            value={eventTypeFilter}
            onChange={(e) => setEventTypeFilter(e.target.value)}
            className="bg-[#1B1713] text-slate-200 border border-[#3D332B] rounded px-2.5 py-1 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#00E5FF]"
          >
            <option value="ALL">All Event Types</option>
            <option value="OPTIMIZATION_EXECUTION">OPTIMIZATION_EXECUTION</option>
            <option value="ASSET_DISCOVERY">ASSET_DISCOVERY</option>
            <option value="CVE_FEED_SYNC">CVE_FEED_SYNC</option>
          </select>
        </div>
      </div>

      {/* EVENT LOG TABLE */}
      <div className="bg-[#241E1A] border border-[#3D332B] rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#3D332B] text-[11px] font-mono uppercase text-slate-400 bg-[#1B1713]">
                <th className="py-3.5 px-4 font-bold w-44">Timestamp (IST)</th>
                <th className="py-3.5 px-4 font-bold w-52">Event Type</th>
                <th className="py-3.5 px-4 font-bold">Action Summary & Details</th>
                <th className="py-3.5 px-4 font-bold w-52">Actor ID</th>
                <th className="py-3.5 px-4 font-bold w-48">Cryptographic Hash</th>
                <th className="py-3.5 px-4 font-bold text-center w-28">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3D332B] text-xs font-sans">
              {filteredEvents.map((evt) => (
                <tr key={evt.id} className="hover:bg-[#1C1C22] transition">
                  {/* Timestamp */}
                  <td className="py-4 px-4 font-mono text-slate-400 text-[11px] whitespace-nowrap align-middle">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="font-medium">{evt.timestamp}</span>
                    </div>
                  </td>

                  {/* Event Type */}
                  <td className="py-4 px-4 align-middle">
                    <span className="inline-block bg-[#00E5FF]/15 border border-[#00E5FF]/30 text-[#00E5FF] font-mono font-bold px-2.5 py-1 rounded text-[11px] whitespace-nowrap">
                      {evt.eventType}
                    </span>
                  </td>

                  {/* Action Summary & Details */}
                  <td className="py-4 px-4 align-middle space-y-1">
                    <p className="font-bold text-white text-xs leading-snug">
                      {evt.actionSummary}
                    </p>
                    <p className="text-[11px] text-slate-400 leading-normal">
                      {evt.details}
                    </p>
                  </td>

                  {/* Actor */}
                  <td className="py-4 px-4 align-middle font-mono text-slate-300 text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="truncate font-semibold">{evt.actor}</span>
                    </div>
                  </td>

                  {/* Cryptographic Hash */}
                  <td className="py-4 px-4 align-middle font-mono text-[10px]">
                    <div className="flex items-center gap-1 text-[#00E5FF] bg-[#1B1713] px-2 py-1 rounded border border-[#3D332B] font-mono truncate max-w-[170px]" title={evt.cryptographicHash}>
                      <Hash className="w-3 h-3 text-[#00E5FF] shrink-0" />
                      <span className="truncate font-mono">{evt.cryptographicHash}</span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-4 align-middle text-center">
                    <span className="inline-flex items-center justify-center gap-1 px-2.5 py-1 rounded bg-[#00FF66]/20 text-[#00FF66] border border-[#00FF66]/30 text-[10px] font-mono font-bold uppercase whitespace-nowrap">
                      <CheckCircle2 className="w-3 h-3 text-[#00FF66]" />
                      STAMPED
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
