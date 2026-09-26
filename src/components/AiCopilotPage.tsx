import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  Terminal,
  Copy,
  Check,
  Bot,
  User,
  ShieldCheck,
  Cpu,
  ArrowRight
} from 'lucide-react';
import { formatINR } from '../utils/formatters';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  codeSnippet?: string;
  codeLang?: string;
  timestamp: string;
}

export const AiCopilotPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'assistant',
      text: 'Hello! I am DIGILEX AI Cyber Risk Intelligence Copilot. I analyze your security posture, quantify Expected Annual Loss in ₹ INR, and optimize fund allocation using 0/1 Knapsack algorithms.\n\nHow can I assist your executive team today?',
      timestamp: 'Just now'
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const promptChips = [
    'Explain top vulnerability on Payment Server in ₹ INR',
    'How do I justify ₹50 Lakh security budget to the CFO?',
    'Show optimal Knapsack remediation allocation under ₹25 Lakh',
    'Generate Ansible patch script for CVE-2026-48291'
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');

    // Simulated AI response generation
    setTimeout(() => {
      let aiText = '';
      let snippet: string | undefined = undefined;
      let lang: string | undefined = undefined;

      const q = query.toLowerCase();

      if (q.includes('payment') || q.includes('cve-2026-48291') || q.includes('top vulnerability')) {
        aiText = `### Financial Risk Analysis: Payment Gateway Server\n\n**Vulnerability:** CVE-2026-48291 (Remote Code Execution in Payment Gateway API)\n- **Expected Annual Loss (EAL):** ${formatINR(19200000)} (₹1.92 Crore / year)\n- **Remediation Cost:** ${formatINR(500000)} (₹5 Lakh)\n- **Annual Risk Reduced:** ${formatINR(14500000)} (₹1.45 Crore)\n- **ROSI Yield:** **29.0x Return**\n\n**Executive Recommendation:** Recommend immediate priority patching. Delaying patch window beyond 15 days increases exploitation likelihood by 34%.`;
        snippet = `// DIGILEX Emergency Remediation Hotfix
// Target: PAY-SETTLE-GW-01 (10.0.12.44)
sudo systemctl stop pay-gateway-api
sudo apt-get update && sudo apt-get install --only-upgrade pay-gateway-core=2.4.1-patch1
sudo systemctl restart pay-gateway-api
curl -f http://10.0.12.44:8080/healthcheck`;
        lang = 'bash';
      } else if (q.includes('cfo') || q.includes('justify') || q.includes('budget')) {
        aiText = `### CFO Board Briefing Note\n\n**Subject:** Security Capital Allocation Justification\n\n- **Requested Budget:** ₹50,00,000 (₹50 Lakh)\n- **Baseline Exposure:** ${formatINR(48200000)} (₹4.82 Crore EAL)\n- **Projected Risk Reduction:** ${formatINR(18400000)} (₹1.84 Crore EAL eliminated)\n- **Capital Efficiency (ROSI):** **3.68x Return** per Rupee spent.\n\nEvery ₹1.00 invested in this optimized portfolio eliminates ₹3.68 of expected breach loss over 12 months.`;
      } else if (q.includes('knapsack') || q.includes('25 lakh')) {
        aiText = `### 0/1 Knapsack Optimal Allocation (Cap: ₹25 Lakh)\n\nSelected 2 highest yield actions:\n1. **Patch Payment Server CVE-2026-48291** | Cost: ₹5.0 L | Reduced: ₹1.45 Cr | ROSI: 29.0x\n2. **Enable MFA Across Privileged Accounts** | Cost: ₹2.0 L | Reduced: ₹58 L | ROSI: 29.0x\n\n- **Total Investment:** ₹7.0 Lakh\n- **Risk Eliminated:** ₹2.03 Crore\n- **Unused Budget:** ₹18.0 Lakh`;
      } else {
        aiText = `Analyzing DIGILEX risk telemetry for query: "${query}"...\n\nBased on real-time CVE feeds and asset criticality models, your current organization Expected Annual Loss is **${formatINR(48200000)}**. Implementing top ranked remediation actions reduces 38% of financial exposure within 30 days.`;
        snippet = `# DIGILEX Security Telemetry Query
SELECT asset_name, cve_id, eal_inr, rosi_yield 
FROM risk_intelligence_db 
WHERE priority = 'FIX_IMMEDIATELY' 
ORDER BY rosi_yield DESC;`;
        lang = 'sql';
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: aiText,
        codeSnippet: snippet,
        codeLang: lang,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    }, 600);
  };

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  return (
    <div className="h-[calc(100vh-7rem)] flex flex-col space-y-4">
      {/* Header */}
      <div className="pb-2 border-b border-[#3D332B] flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#C5A059] font-bold uppercase tracking-widest mb-0.5">
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            AI Cyber Intelligence Assistant
          </div>
          <h2 className="text-xl font-bold text-white font-sans">
            DIGILEX Executive AI Copilot
          </h2>
        </div>

        <span className="text-xs font-mono font-bold text-[#C5A059] bg-[#C5A059]/15 px-3 py-1 rounded-full border border-[#C5A059]/30">
          Model: Gemini 2.5 Risk Engine
        </span>
      </div>

      {/* CHAT MESSAGES AREA */}
      <div className="flex-1 overflow-y-auto bg-[#241E1A] border border-[#3D332B] rounded-xl p-4 space-y-4 shadow-lg">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-3 ${
              m.sender === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                m.sender === 'user'
                  ? 'bg-[#C5A059] text-[#14100C] font-extrabold'
                  : 'bg-[#1B1713] border border-[#3D332B] text-[#C5A059]'
              }`}
            >
              {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-2xl rounded-xl p-4 text-xs font-sans leading-relaxed space-y-2 ${
                m.sender === 'user'
                  ? 'bg-[#C5A059]/15 border border-[#C5A059]/30 text-white font-medium'
                  : 'bg-[#1B1713] border border-[#3D332B] text-slate-200'
              }`}
            >
              <div className="whitespace-pre-line">{m.text}</div>

              {m.codeSnippet && (
                <div className="mt-3 bg-[#1B1713] border border-[#3D332B] rounded-lg overflow-hidden font-mono text-[11px] text-slate-100">
                  <div className="bg-[#241E1A] px-3 py-1.5 border-b border-[#3D332B] flex items-center justify-between text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-[#C5A059]" />
                      {m.codeLang || 'snippet'}
                    </span>
                    <button
                      onClick={() => copyToClipboard(m.codeSnippet!, m.id)}
                      className="text-slate-300 hover:text-white flex items-center gap-1 text-[10px] cursor-pointer"
                    >
                      {copiedCodeId === m.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#C5A059]" />
                          <span className="text-[#C5A059]">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-3 text-[#C5A059] overflow-x-auto">{m.codeSnippet}</pre>
                </div>
              )}

              <span className="text-[10px] text-slate-400 block text-right font-mono mt-1">
                {m.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* QUICK PROMPT CHIPS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-400 font-mono text-[11px] font-bold shrink-0">Prompts:</span>
        {promptChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(chip)}
            className="px-3 py-1 rounded-full bg-[#1B1713] hover:bg-[#3D332B] border border-[#3D332B] text-slate-300 font-medium text-[11px] font-sans whitespace-nowrap transition cursor-pointer"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* INPUT BAR */}
      <div className="bg-[#241E1A] border border-[#3D332B] p-2.5 rounded-xl flex items-center gap-2 shadow-lg">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask DIGILEX AI about vulnerability EAL, budget optimization, or risk models..."
          className="bg-transparent text-white placeholder-slate-400 text-xs font-sans focus:outline-none w-full px-2"
        />
        <button
          onClick={() => handleSend()}
          className="px-4 py-2 rounded-lg bg-[#C5A059] hover:bg-[#B89047] text-[#14100C] font-extrabold text-xs font-sans shadow-md shadow-[#C5A059]/20 transition flex items-center gap-1 shrink-0 cursor-pointer"
        >
          <span>Ask Copilot</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
