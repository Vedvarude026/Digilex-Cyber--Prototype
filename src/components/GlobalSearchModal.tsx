import React, { useState } from 'react';
import { Search, X, Server, Bug, Globe2, ArrowRight } from 'lucide-react';
import { MOCK_ASSETS, MOCK_VULNERABILITIES, MOCK_THREAT_FEEDS } from '../data/mockData';
import { ActiveTab } from '../types';
import { formatINR } from '../utils/formatters';

interface GlobalSearchModalProps {
  isOpen?: boolean;
  onClose: () => void;
  setActiveTab?: (tab: ActiveTab) => void;
  onSelectTab?: (tab: ActiveTab) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen = true,
  onClose,
  setActiveTab,
  onSelectTab
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredAssets = query.trim()
    ? MOCK_ASSETS.filter(
        a => a.name.toLowerCase().includes(query.toLowerCase()) ||
             a.ipAddress.includes(query) ||
             a.type.toLowerCase().includes(query.toLowerCase())
      )
    : MOCK_ASSETS.slice(0, 3);

  const filteredVulns = query.trim()
    ? MOCK_VULNERABILITIES.filter(
        v => v.cveId.toLowerCase().includes(query.toLowerCase()) ||
             v.assetName.toLowerCase().includes(query.toLowerCase()) ||
             v.description.toLowerCase().includes(query.toLowerCase())
      )
    : MOCK_VULNERABILITIES.slice(0, 3);

  const filteredThreats = query.trim()
    ? MOCK_THREAT_FEEDS.filter(
        t => t.title.toLowerCase().includes(query.toLowerCase()) ||
             t.description.toLowerCase().includes(query.toLowerCase())
      )
    : MOCK_THREAT_FEEDS.slice(0, 2);

  const handleSelectTab = (tab: ActiveTab) => {
    if (onSelectTab) {
      onSelectTab(tab);
    } else if (setActiveTab) {
      setActiveTab(tab);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 p-4">
      <div className="bg-[#241E1A] border border-[#3D332B] rounded-2xl max-w-2xl w-full p-5 text-slate-200 shadow-2xl relative">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 bg-[#1B1713] px-3.5 py-2.5 rounded-xl border border-[#3D332B] focus-within:border-[#C5A059]">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search vulnerabilities, CVEs, assets, IP addresses..."
            className="w-full bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none font-sans"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-slate-400 hover:text-white cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          )}
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white cursor-pointer">
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-[#241E1A] text-slate-300 rounded border border-[#3D332B] shadow-2xs">ESC</kbd>
          </button>
        </div>

        {/* Results Sections */}
        <div className="mt-4 space-y-4 max-h-[420px] overflow-y-auto pr-1">
          {/* Vulnerabilities */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 font-mono">
              <span className="flex items-center gap-1.5"><Bug className="w-3.5 h-3.5 text-[#C5A059]" /> Vulnerabilities ({filteredVulns.length})</span>
              <button onClick={() => handleSelectTab('vulnerabilities')} className="text-[#C5A059] hover:underline flex items-center gap-1 cursor-pointer font-bold">
                View all <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-1.5">
              {filteredVulns.map(v => (
                <div
                  key={v.cveId}
                  onClick={() => handleSelectTab('vulnerabilities')}
                  className="bg-[#1B1713] hover:bg-[#3D332B]/50 p-2.5 rounded-xl border border-[#3D332B] flex items-center justify-between cursor-pointer transition"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-[#C5A059] bg-[#C5A059]/15 px-1.5 py-0.5 rounded border border-[#C5A059]/30">{v.cveId}</span>
                      <span className="text-xs text-white font-bold font-sans truncate">{v.assetName}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate max-w-md mt-0.5">{v.description}</p>
                  </div>
                  <div className="text-right font-mono text-xs">
                    <span className="text-rose-400 font-bold block">{formatINR(v.eal)}</span>
                    <span className="text-[10px] text-slate-400 font-medium">CVSS {v.cvssScore}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Assets */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 font-mono">
              <span className="flex items-center gap-1.5"><Server className="w-3.5 h-3.5 text-[#C5A059]" /> Assets ({filteredAssets.length})</span>
              <button onClick={() => handleSelectTab('assets')} className="text-[#C5A059] hover:underline flex items-center gap-1 cursor-pointer font-bold">
                View all <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-1.5">
              {filteredAssets.map(a => (
                <div
                  key={a.id}
                  onClick={() => handleSelectTab('assets')}
                  className="bg-[#1B1713] hover:bg-[#3D332B]/50 p-2.5 rounded-xl border border-[#3D332B] flex items-center justify-between cursor-pointer transition"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded bg-[#C5A059]/15 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059]">
                      <Server className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{a.name}</p>
                      <p className="text-[10px] font-mono text-slate-400">{a.ipAddress} • {a.type}</p>
                    </div>
                  </div>
                  <div className="text-right font-mono text-xs">
                    <span className="text-white font-bold block">EAL {formatINR(a.eal)}</span>
                    <span className="text-[10px] text-amber-400 font-bold">{a.vulnerabilitiesCount} Vulns</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Threat Feeds */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 font-mono">
              <span className="flex items-center gap-1.5"><Globe2 className="w-3.5 h-3.5 text-amber-400" /> Threat Intelligence</span>
              <button onClick={() => handleSelectTab('threat-intel')} className="text-[#C5A059] hover:underline flex items-center gap-1 cursor-pointer font-bold">
                View feed <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-1.5">
              {filteredThreats.map(t => (
                <div
                  key={t.id}
                  onClick={() => handleSelectTab('threat-intel')}
                  className="bg-[#1B1713] hover:bg-[#3D332B]/50 p-2.5 rounded-xl border border-[#3D332B] flex items-center justify-between cursor-pointer transition"
                >
                  <div>
                    <p className="text-xs font-bold text-rose-400">{t.title}</p>
                    <p className="text-[11px] text-slate-400 truncate max-w-md">{t.description}</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-rose-400 shrink-0 ml-2">{formatINR(t.potentialEal)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
