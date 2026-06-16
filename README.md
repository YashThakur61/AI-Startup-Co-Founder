# 🚀 AI Startup Co-Founder

> An AI-powered platform that acts as your personal startup advisor — validate ideas, analyze markets, generate business plans, and create investor-ready pitch decks in minutes.

---

## 🎯 What is this?

Most founders struggle with:
- ❌ Validating if their idea is viable
- ❌ Understanding the competitive landscape
- ❌ Defining what to build first (MVP)
- ❌ Creating execution plans
- ❌ Building investor-ready pitch decks

**AI Startup Co-Founder** solves all of this.

Just enter your startup idea + target market → and 4 AI agents work together to give you a **complete business plan in minutes.**

---

## ✨ Features

- 🔍 **Market Research** — TAM, competitors, trends & opportunities
- 💼 **Business Analysis** — Value proposition, revenue model & SWOT
- 📋 **Product Strategy** — MVP features, roadmap & team structure
- 🎤 **Pitch Deck Generation** — Investor-ready PPT & PDF
- ⚡ **Live Streaming UI** — See agents work in real time
- 📄 **PDF Download** — Full business plan as a downloadable PDF
- 🗄️ **Report Storage** — All reports saved and accessible anytime

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 15, TypeScript, Tailwind CSS, shadcn/ui |
| **Backend** | Next.js API Routes |
| **AI** | OpenAI GPT-4o |
| **Search** | Tavily API |
| **Database** | MongoDB Atlas |
| **PDF** | pdf-lib |
| **Streaming** | Vercel AI SDK |
| **Deploy** | Vercel |

---

## 🤖 Agent Pipeline

```
User Input (Idea + Market)
        ↓
┌─────────────────────────────────────┐
│  🔍 Research Agent                  │
│  → Market size, competitors, trends │
└──────────────────┬──────────────────┘
                   ↓
┌─────────────────────────────────────┐
│  💼 Business Agent                  │
│  → SWOT, value prop, revenue model  │
└──────────────────┬──────────────────┘
                   ↓
┌─────────────────────────────────────┐
│  📋 Planning Agent                  │
│  → MVP features, roadmap, team      │
└──────────────────┬──────────────────┘
                   ↓
┌─────────────────────────────────────┐
│  🎤 Pitch Agent                     │
│  → Pitch deck, PDF, exec summary    │
└─────────────────────────────────────┘
        ↓
  📥 Download Reports
```

---

## 📁 Project Structure

```
ai-startup-cofounder/
├── app/
│   ├── page.tsx                  → Home page (idea input)
│   ├── dashboard/
│   │   └── page.tsx              → Live agent progress
│   ├── report/[id]/
│   │   └── page.tsx              → Full report view
│   └── api/
│       ├── analyze/route.ts      → Full pipeline trigger
│       ├── research/route.ts     → Research agent
│       ├── business/route.ts     → Business agent
│       ├── planning/route.ts     → Planning agent
│       └── pitch/route.ts        → Pitch deck generator
├── components/
│   ├── IdeaForm.tsx              → Startup idea input
│   ├── AgentProgress.tsx         → Live progress UI
│   ├── StreamingOutput.tsx       → Real-time streaming
│   ├── SwotChart.tsx             → SWOT visualization
│   └── RoadmapTimeline.tsx       → MVP timeline
├── lib/
│   ├── agents/                   → Agent logic
│   ├── db/                       → MongoDB connection & models
│   ├── tools/                    → Search & PDF tools
│   └── utils/                    → Helpers
├── prompts/                      → LLM prompt templates
└── types/                        → TypeScript types
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/YashThakur61/ai-startup-cofounder.git
cd ai-startup-cofounder
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root:

```bash
OPENAI_API_KEY=your_openai_key
MONGODB_URI=your_mongodb_connection_string
TAVILY_API_KEY=your_tavily_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Get your API keys

| Service | Free Tier | Link |
|---------|-----------|------|
| OpenAI | $5 free credit | [platform.openai.com](https://platform.openai.com) |
| Tavily | 1000 searches/month | [tavily.com](https://tavily.com) |
| MongoDB Atlas | Free 512MB | [mongodb.com/atlas](https://mongodb.com/atlas) |

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 📸 Screenshots

> Coming soon — UI in progress 🚧

---

## 📦 Final Deliverables

After running the full pipeline, you get:

- ✅ PDF Business Plan
- ✅ SWOT Analysis Report
- ✅ MVP Feature Roadmap
- ✅ Investor Pitch Deck (PPT + PDF)

---

## 🗺️ Roadmap

- [x] Research Agent
- [x] Business Agent
- [x] Planning Agent
- [x] Pitch Deck Agent
- [x] Streaming UI
- [x] PDF Download
- [ ] Multi-language support
- [ ] Voice input
- [ ] PDF upload for idea input
- [ ] Share report via link

---

## 🙋‍♂️ Author

**Yash Thakur**

Built during internship @ [Surfboard Ventures](https://surfboardventures.com)

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat&logo=linkedin)](https://linkedin.com/in/your-profile)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black?style=flat&logo=github)](https://github.com/YashThakur61)

---

## 📄 License

MIT License — feel free to use and build on this!

---

> Made with ❤️ using Next.js + OpenAI