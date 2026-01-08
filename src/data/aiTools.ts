import { Category } from '../types';

export const defaultCategories: Category[] = [
  {
    id: "ai-chat",
    title: "Chat & Assistant",
    color: "bg-blue-500", // 藍色 = 溝通、對話、智慧
    bookmarks: [
      {
        id: "chatgpt",
        title: "ChatGPT",
        url: "https://chat.openai.com",
        quotaInfo: "免費版每月有使用限制",
      },
      {
        id: "gemini",
        title: "Gemini",
        url: "https://gemini.google.com",
        quotaInfo: "免費版每日 60 次查詢",
      },
      {
        id: "claude",
        title: "Claude",
        url: "https://claude.ai",
        quotaInfo: "免費版每日有對話限制",
      },
      {
        id: "perplexity",
        title: "Perplexity",
        url: "https://perplexity.ai",
        quotaInfo: "免費版每日 5 次 Pro 搜尋",
      },
      {
        id: "copilot",
        title: "Microsoft Copilot",
        url: "https://copilot.microsoft.com",
        quotaInfo: "免費版有功能限制",
      },
      {
        id: "grok",
        title: "Grok",
        url: "https://grok.com",
        quotaInfo: "X Premium 用戶專享",
      },
      {
        id: "deepseek",
        title: "DeepSeek",
        url: "https://chat.deepseek.com",
        quotaInfo: "免費版有使用限制",
      },
      {
        id: "kuse-ai",
        title: "Kuse.ai",
        url: "https://kuse.ai",
        quotaInfo: "每日免費 10 次查詢",
      },
      {
        id: "felo-ai",
        title: "Felo",
        url: "https://felo.ai",
        quotaInfo: "每日贈送 200 點數",
      },
    ],
  },
  {
    id: "ai-browser",
    title: "AI Browser",
    color: "bg-orange-500", // 橙色 = 瀏覽、探索、連接
    bookmarks: [
      {
        id: "comet-browser",
        title: "Comet Browser",
        url: "https://comet.perplexity.ai",
        quotaInfo: "Perplexity 推出的 AI 瀏覽器",
      },
      {
        id: "atlas-browser",
        title: "Atlas Browser",
        url: "https://chatgpt.com/zh-Hant/atlas/",
        quotaInfo: "OpenAI 推出的 AI 瀏覽器",
      },
      {
        id: "fello-browser",
        title: "Fello AI",
        url: "https://fello.ai",
        quotaInfo: "AI 驅動的智能瀏覽器",
      },
    ],
  },
  {
    id: "ai-agents",
    title: "AI Agents",
    color: "bg-emerald-600", // 翠綠色 = 智能代理、自動執行
    bookmarks: [
      {
        id: "langchain",
        title: "LangChain",
        url: "https://langchain.com",
        quotaInfo: "開源框架免費使用",
      },
      {
        id: "firecrawl",
        title: "Firecrawl",
        url: "https://firecrawl.dev/agent",
        quotaInfo: "5 free daily runs",
      },
      {
        id: "dify-ai",
        title: "Dify AI",
        url: "https://dify.ai",
        quotaInfo: "開源平台，支援雲端或自架",
      },
      {
        id: "genspark",
        title: "Genspark",
        url: "https://www.genspark.ai/",
        quotaInfo: "100 credits/day",
      },
      {
        id: "crew-ai",
        title: "CrewAI",
        url: "https://crewai.com",
        quotaInfo: "免費版有使用限制",
      },
      {
        id: "autogen",
        title: "AutoGen",
        url: "https://microsoft.github.io/autogen",
        quotaInfo: "微軟開源專案",
      },
    ],
  },
  {
    id: "no-code",
    title: "No-Code",
    color: "bg-violet-500", // 紫色 = 魔法、簡化、創新
    bookmarks: [
      {
        id: "lovable-dev",
        title: "Lovable.dev",
        url: "https://lovable.dev",
        quotaInfo: "每月免費 5 個專案",
      },
      {
        id: "replit",
        title: "Replit",
        url: "https://replit.com",
        quotaInfo: "免費版 500MB 儲存空間",
      },
      {
        id: "v0-dev",
        title: "v0.dev",
        url: "https://v0.dev",
        quotaInfo: "每月免費 200 次生成",
      },
      {
        id: "glide",
        title: "Glide",
        url: "https://glideapps.com",
        quotaInfo: "1 editor",
        appUrl: "https://shareholder-gift.glide.page",
      },
      {
        id: "webflow",
        title: "Webflow",
        url: "https://webflow.com",
        quotaInfo: "免費版 2 個專案",
      },
      {
        id: "framer",
        title: "Framer",
        url: "https://framer.com",
        quotaInfo: "免費版 3 個網站",
      },
      {
        id: "wix",
        title: "Wix Studio",
        url: "https://wix.com/studio",
        quotaInfo: "免費版有 Wix 品牌",
      },
      {
        id: "adalo",
        title: "Adalo",
        url: "https://adalo.com",
        quotaInfo: "200 Records Per App",
      },
    ],
  },
  {
    id: "low-code",
    title: "Low-Code",
    color: "bg-indigo-500", // 靛藍色 = 平衡、效率、專業
    bookmarks: [
      {
        id: "retool",
        title: "Retool",
        url: "https://retool.com",
        quotaInfo: "免費版 5 個用戶",
      },
      {
        id: "supabase",
        title: "Supabase",
        url: "https://supabase.com",
        quotaInfo: "免費版 500MB 資料庫",
      },
      {
        id: "firebase",
        title: "Firebase",
        url: "https://firebase.google.com",
        quotaInfo: "免費版 Spark 方案",
      },
      {
        id: "airtable",
        title: "Airtable",
        url: "https://airtable.com",
        quotaInfo: "免費版 1200 筆記錄",
      },
    ],
  },
  {
    id: "ide",
    title: "IDE",
    color: "bg-slate-600", // 石板灰 = 工具、穩定、專業
    bookmarks: [
      {
        id: "vscode",
        title: "Visual Studio Code",
        url: "https://code.visualstudio.com",
        quotaInfo: "完全免費使用",
      },
      {
        id: "antigravity",
        title: "Antigravity",
        url: "https://antigravity.google/",
        quotaInfo: "Generous weekly rate limits",
      },
      {
        id: "kiro-dev",
        title: "Kiro.dev",
        url: "https://kiro.dev",
        quotaInfo: "50 credits",
      },
      {
        id: "warp-dev",
        title: "Warp.dev",
        url: "https://warp.dev",
        quotaInfo: "免費版有功能限制",
      },
      {
        id: "cursor",
        title: "Cursor",
        url: "https://cursor.sh",
        quotaInfo: "AI 原生編輯器",
      },
      {
        id: "windsurf",
        title: "Windsurf",
        url: "https://codeium.com/windsurf",
        quotaInfo: "AI-first IDE，免費使用",
      },
    ],
  },
  {
    id: "ide-extensions",
    title: "IDE Extensions",
    color: "bg-zinc-500", // 鋅灰色 = 擴展、插件、增強
    bookmarks: [
      {
        id: "github-copilot",
        title: "GitHub Copilot",
        url: "https://github.com/features/copilot",
        quotaInfo: "免費版每月 2000 次補全",
      },
      {
        id: "continue-dev",
        title: "Continue.dev",
        url: "https://continue.dev",
        quotaInfo: "bring your own API keys",
      },
    ],
  },
  {
    id: "ai-automation",
    title: "Automation",
    color: "bg-amber-500", // 琥珀色 = 自動化、效率、能量
    bookmarks: [
      {
        id: "refly-ai",
        title: "Refly.ai",
        url: "https://refly.ai",
        quotaInfo: "每日可獲取新積分: 100點",
      },
      {
        id: "relay-app",
        title: "Relay.app",
        url: "https://relay.app",
        quotaInfo: "500 free AI credits/mo",
      },
      {
        id: "zapier-ai",
        title: "Zapier",
        url: "https://zapier.com/ai",
        quotaInfo: "100 tasks per month",
      },
      {
        id: "make-ai",
        title: "Make.com",
        url: "https://make.com",
        quotaInfo: "1,000 credits/month",
      },
    ],
  },
  {
    id: "ai-design",
    title: "Design & Creative",
    color: "bg-rose-500", // 玫瑰色 = 創意、藝術、美感
    bookmarks: [
      {
        id: "midjourney",
        title: "Midjourney",
        url: "https://midjourney.com",
        quotaInfo: "免費試用 25 張圖片",
      },
      {
        id: "stable-diffusion",
        title: "Stable Diffusion",
        url: "https://stablediffusionweb.com",
        quotaInfo: "每日可獲取新積分: 20點",
      },
      {
        id: "canva-ai",
        title: "Canva AI",
        url: "https://canva.com/ai",
        quotaInfo: "免費版每月 50 次 AI 生成",
      },
      {
        id: "figma-ai",
        title: "Figma AI",
        url: "https://figma.com",
        quotaInfo: "免費版有功能限制",
      },
    ],
  },
  {
    id: "ai-productivity",
    title: "Productivity",
    color: "bg-teal-500", // 青綠色 = 生產力、成長、平衡
    bookmarks: [
      {
        id: "notion-ai",
        title: "Notion AI",
        url: "https://notion.so/ai",
        quotaInfo: "免費版每月 20 次 AI 回應",
      },
      {
        id: "gamma",
        title: "Gamma",
        url: "https://gamma.app",
        quotaInfo: "免費版每月 400 AI 點數",
      },
      {
        id: "wayin-ai",
        title: "Wayin AI",
        url: "https://wayin.ai",
        quotaInfo: "每天免費工具點數: 30",
      },
    ],
  },
];