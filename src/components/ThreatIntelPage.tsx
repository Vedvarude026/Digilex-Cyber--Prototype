import React from 'react';
import {
  Globe2,
  Flame,
  AlertOctagon,
  ShieldAlert,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { MOCK_THREAT_FEEDS } from '../data/mockData';
import { formatINR } from '../utils/formatters';

export const ThreatIntelPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-2 border-b border-[#3D332B]">
        <h2 className="text-xl lg:text-2xl font-bold text-white tracking-tight font-sans">
          Threat Intelligence Radar & Exploit Feeds
        </h2>
        <p className="text-xs lg:text-sm text-slate-400 font-sans mt-0.5">
          Real-time threat actor tracking, dark web vulnerability chatter, and targeted industry campaigns
        </p>
      </div>

      {/* THREAT FEEDS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOCK_THREAT_FEEDS.map((feed) => (
          <div key={feed.id} className="bg-[#241E1A] border border-[#3D332B] rounded-xl p-5 space-y-3 shadow-lg flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <span className="text-xs font-mono font-bold text-rose-400 bg-rose-500/20 px-2.5 py-1 rounded border border-rose-500/30">
                  {feed.threatType}
                </span>
                <span className="text-[11px] font-mono text-slate-400 font-medium flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-500" />
                  {feed.dateAdded}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white font-sans">{feed.title}</h3>
                <p className="text-xs text-amber-400 font-mono font-semibold mt-1">
                  Target Sectors: {feed.targetSectors.join(', ')}
                </p>
              </div>

              <p className="text-xs text-slate-300 font-sans leading-relaxed bg-[#1B1713] p-3 rounded border border-[#3D332B]">
                {feed.description}
              </p>
            </div>

            <div className="flex items-center justify-between text-xs font-mono pt-3 border-t border-[#3D332B]">
              <span className="text-slate-400 font-medium">Affected Assets: <strong className="text-[#00E5FF] font-bold">{feed.affectedAssetsCount}</strong></span>
              <span className="text-slate-400 font-medium">Potential EAL: <strong className="text-rose-400 font-bold">{formatINR(feed.potentialEal)}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
