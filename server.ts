import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Google GenAI Client with standard header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Quick Insights Endpoint using Gemini 3.8 Flash
app.post('/api/quick-insights', async (req, res) => {
  try {
    const { orgInfo } = req.body || {};

    const prompt = `You are an automated CISO Cyber Risk Intelligence engine. Analyze this live organizational posture for DIGILEX:
- Total Expected Annual Loss (EAL): ₹${orgInfo?.totalEal ? (orgInfo.totalEal / 10000000).toFixed(2) : '4.85'} Crore (+8.4% 30-day risk spike)
- Optimizable Risk: ₹${orgInfo?.optimizableRisk ? (orgInfo.optimizableRisk / 10000000).toFixed(2) : '1.85'} Crore (-12.5% 30-day unmitigated risk reduction)
- Current Security Budget: ₹${orgInfo?.currentBudget ? (orgInfo.currentBudget / 100000).toFixed(2) : '50.00'} Lakh (3.68x ROSI Efficiency Return)
- Top Risk Asset: Payment Gateway Server (CVE-2026-48291, CVSS 9.8, EAL ₹1.92 Cr)
- Sector Exposure Concentration: Payment Processing (43.5% of total organization risk)

Generate 4 short, distinct, high-impact automated "Quick Insight" cards for the Executive Overview dashboard.
Each card must be concise, executive-focused, and provide a clear takeaway. Include key figures in ₹ INR where applicable.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: "You generate concise automated CISO executive risk insights in structured JSON format.",
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              category: { type: Type.STRING, description: "Category tag like 'Loss Surge Alert', 'ROSI Gain', 'Top Threat', 'MTTR Speed'" },
              title: { type: Type.STRING, description: "Card headline, 3-6 words" },
              summary: { type: Type.STRING, description: "Top level automated executive summary, 15-25 words" },
              metricTag: { type: Type.STRING, description: "Key stat badge like '+8.4% 30d', '₹1.85 Cr Savings', '3.68x Return'" },
              badgeColor: { type: Type.STRING, description: "'rose' | 'amber' | 'emerald' | 'gold'" }
            },
            required: ["id", "category", "title", "summary", "metricTag", "badgeColor"]
          }
        }
      }
    });

    const jsonText = response.text || '[]';
    const insights = JSON.parse(jsonText);
    res.json({ success: true, insights });
  } catch (err: any) {
    console.error("Gemini Quick Insights Error:", err);
    // Provide high-quality automated fallbacks
    res.json({
      success: false,
      error: err.message,
      insights: [
        {
          id: "1",
          category: "Loss Surge Alert",
          title: "Payment Gateway Threat Surge",
          summary: "Unpatched RCE CVE-2026-48291 on Payment Server accounts for 39.6% of organizational EAL. Immediate hotfix eliminates ₹1.45 Cr risk.",
          metricTag: "+8.4% 30d EAL",
          badgeColor: "rose"
        },
        {
          id: "2",
          category: "Knapsack Optimization",
          title: "₹1.85 Cr Optimizable Risk",
          summary: "Allocating ₹50L budget across top 3 ranked assets mitigates ₹1.84 Cr in expected loss, achieving 3.68x Return on Security Investment.",
          metricTag: "₹1.85 Cr Savings",
          badgeColor: "emerald"
        },
        {
          id: "3",
          category: "Patch Speed Gains",
          title: "MTTR Reduced to 14.2 Days",
          summary: "Mean patch time dropped 17.9% over 30 days due to automated patch ranking, reducing threat exposure windows significantly.",
          metricTag: "-17.9% MTTR",
          badgeColor: "emerald"
        },
        {
          id: "4",
          category: "Sector Focus",
          title: "E-Commerce Concentration",
          summary: "Payment processing represents 43.5% of total operational risk exposure. Prioritizing API defense secures top revenue stream.",
          metricTag: "43.5% Sector Risk",
          badgeColor: "gold"
        }
      ]
    });
  }
});

// Setup Vite middleware in dev or static serving in prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true, host: '0.0.0.0' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
