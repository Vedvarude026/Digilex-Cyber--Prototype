import React from 'react';
import {
  Settings,
  Building,
  Key,
  Database,
  Globe,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { ORG_INFO } from '../data/mockData';

export const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-2 border-b border-[#3D332B]">
        <h2 className="text-xl lg:text-2xl font-bold text-white tracking-tight font-sans">
          Platform Settings & Integration API Keys
        </h2>
        <p className="text-xs lg:text-sm text-slate-400 font-sans mt-0.5">
          Organization profile, currency formatting (₹ INR), security scanners, and API credentials
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ORGANIZATION PROFILE */}
        <div className="bg-[#241E1A] border border-[#3D332B] rounded-xl p-5 space-y-4 shadow-lg">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#3D332B]">
            <Building className="w-5 h-5 text-[#C5A059]" />
            <h3 className="text-base font-bold text-white font-sans">Organization Profile</h3>
          </div>

          <div className="space-y-3 text-xs font-sans">
            <div>
              <label className="text-slate-300 font-bold block mb-1">Company Name</label>
              <input
                type="text"
                value={ORG_INFO.name}
                readOnly
                className="w-full bg-[#1B1713] border border-[#3D332B] text-white p-2.5 rounded font-bold font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 font-mono">
              <div>
                <label className="text-slate-300 font-bold block mb-1 font-sans">Industry Sector</label>
                <input
                  type="text"
                  value={ORG_INFO.industry}
                  readOnly
                  className="w-full bg-[#1B1713] border border-[#3D332B] text-slate-300 p-2.5 rounded"
                />
              </div>
              <div>
                <label className="text-slate-300 font-bold block mb-1 font-sans font-medium">Currency Denomination</label>
                <input
                  type="text"
                  value="Indian Rupee (₹ INR)"
                  readOnly
                  className="w-full bg-[#1B1713] border border-[#3D332B] text-[#C5A059] p-2.5 rounded font-bold"
                />
              </div>
            </div>
          </div>
        </div>

        {/* API & SCANNER INTEGRATIONS */}
        <div className="bg-[#241E1A] border border-[#3D332B] rounded-xl p-5 space-y-4 shadow-lg">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#3D332B]">
            <Key className="w-5 h-5 text-[#C5A059]" />
            <h3 className="text-base font-bold text-white font-sans">Telemetry API Integrations</h3>
          </div>

          <div className="space-y-3 text-xs font-sans">
            {[
              { name: 'Qualys / Tenable Vuln Scanner', status: 'Connected', key: 'pk_live_q9812****' },
              { name: 'CrowdStrike EDR Telemetry', status: 'Connected', key: 'cs_api_77182****' },
              { name: 'AWS CloudTrail & GuardDuty', status: 'Connected', key: 'aws_role_sec****' },
              { name: 'CISA KEV Exploit Feed', status: 'Connected', key: 'cisa_feed_auto' },
            ].map((item, idx) => (
              <div key={idx} className="bg-[#1B1713] p-3 rounded-lg border border-[#3D332B] flex items-center justify-between">
                <div>
                  <p className="font-bold text-white">{item.name}</p>
                  <p className="text-[10px] font-mono text-slate-400 mt-0.5">{item.key}</p>
                </div>
                <span className="text-[10px] font-mono font-bold text-[#C5A059] bg-[#C5A059]/15 px-2 py-0.5 rounded border border-[#C5A059]/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#C5A059]" />
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
