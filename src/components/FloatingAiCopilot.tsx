import React, { useState } from 'react';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  Terminal,
  Copy,
  Check
} from 'lucide-react';
import { formatINR } from '../utils/formatters';

interface FloatingMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const FloatingAiCopilot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<FloatingMessage[]>([
    {
      id: '1',
      sender: 'assistant',
      text: 'DIGILEX Copilot active. Ask me about expected annual loss in ₹ INR or 0/1 Knapsack optimization.',
      timestamp: 'Just now'
    }
  ]);

  const handleSend = () => {
    if (!inputQuery.trim()) return;

    const userMsg: FloatingMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputQuery,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    const query = inputQuery;
    setInputQuery('');

    setTimeout(() => {
      let aiText = `Analyzing query "${query}"... Based on current telemetry, Payment Server CVE-2026-48291 carries ₹1.92 Crore EAL risk. Recommended action: Immediate patch (${formatINR(500000)} cost, ${formatINR(14500000)} reduction).`;

      if (query.toLowerCase().includes('budget') || query.toLowerCase().includes('knapsack')) {
        aiText = `Optimal 0/1 Knapsack portfolio allocates ₹48.5 Lakh to reduce ₹1.84 Crore of annualized risk across 4 key assets.`;
      }

      const aiMsg: FloatingMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    }, 500);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 font-sans">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-3 rounded-full bg-[#C5A059] hover:bg-[#B89047] text-[#14100C] font-extrabold text-xs shadow-lg flex items-center gap-2 border border-[#C5A059] transition cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-[#14100C] fill-[#14100C]" />
          <span>Ask DIGILEX Copilot</span>
        </button>
      )}

      {isOpen && (
        <div className="bg-[#241E1A] border-2 border-[#C5A059]/40 rounded-2xl w-80 sm:w-96 shadow-2xl overflow-hidden flex flex-col h-[28rem]">
          {/* Drawer Header */}
          <div className="bg-[#1B1713] px-4 py-3 border-b border-[#3D332B] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              <span className="text-xs font-bold text-white">DIGILEX AI Copilot</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded bg-[#241E1A] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex items-start gap-2 ${
                  m.sender === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 text-[10px] font-bold ${
                    m.sender === 'user'
                      ? 'bg-[#C5A059] text-[#14100C] font-extrabold'
                      : 'bg-[#1B1713] text-[#C5A059] border border-[#3D332B]'
                  }`}
                >
                  {m.sender === 'user' ? 'U' : <Bot className="w-3.5 h-3.5" />}
                </div>

                <div
                  className={`rounded-lg p-2.5 text-xs ${
                    m.sender === 'user'
                      ? 'bg-[#C5A059]/15 text-white border border-[#C5A059]/30 font-medium'
                      : 'bg-[#1B1713] text-slate-200 border border-[#3D332B]'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-2 border-t border-[#3D332B] bg-[#1B1713] flex items-center gap-1.5">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask Copilot..."
              className="bg-[#241E1A] text-white placeholder-slate-400 text-xs px-3 py-2 rounded-lg border border-[#3D332B] focus:outline-none w-full"
            />
            <button
              onClick={handleSend}
              className="p-2 bg-[#C5A059] hover:bg-[#B89047] text-[#14100C] font-bold rounded-lg shrink-0 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
