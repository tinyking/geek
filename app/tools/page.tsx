import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "工具收藏 | 阅微漫记",
  description: "收集的有意思的工具和网站",
};

interface Tool {
  name: string;
  desc: string;
  url: string;
  category: string;
  icon: string;
}

const tools: Tool[] = [
  // 设计工具
  {
    name: "Figma",
    desc: "强大的在线协作设计工具，支持界面设计、原型制作",
    url: "https://figma.com",
    category: "设计",
    icon: "🎨",
  },
  {
    name: "Unsplash",
    desc: "高质量免费图片资源，适合各种设计项目",
    url: "https://unsplash.com",
    category: "设计",
    icon: "🖼️",
  },
  {
    name: "Coolors",
    desc: "配色方案生成器，快速创建和谐的色彩组合",
    url: "https://coolors.co",
    category: "设计",
    icon: "🎭",
  },
  // 开发工具
  {
    name: "Raycast",
    desc: "macOS 效率启动器，替代 Spotlight 的强大工具",
    url: "https://raycast.com",
    category: "开发",
    icon: "⚡",
  },
  {
    name: "CodePen",
    desc: "前端代码在线编辑和分享平台",
    url: "https://codepen.io",
    category: "开发",
    icon: "💻",
  },
  {
    name: "Carbon",
    desc: "代码片段美化工具，生成精美的代码图片",
    url: "https://carbon.now.sh",
    category: "开发",
    icon: "📸",
  },
  {
    name: "Excalidraw",
    desc: "手绘风格的在线白板工具，适合绘制示意图",
    url: "https://excalidraw.com",
    category: "开发",
    icon: "✏️",
  },
  // 写作工具
  {
    name: "Notion",
    desc: "多功能笔记和协作工具，支持数据库、看板等多种视图",
    url: "https://notion.so",
    category: "写作",
    icon: "📝",
  },
  {
    name: "Obsidian",
    desc: "本地优先的知识管理工具，支持双向链接",
    url: "https://obsidian.md",
    category: "写作",
    icon: "🔮",
  },
  {
    name: "Flomo",
    desc: "轻量级碎片化笔记工具，记录灵感和想法",
    url: "https://flomoapp.com",
    category: "写作",
    icon: "💡",
  },
  // 效率工具
  {
    name: "Linear",
    desc: "现代项目管理工具，界面简洁高效",
    url: "https://linear.app",
    category: "效率",
    icon: "📊",
  },
  {
    name: "Arc Browser",
    desc: "重新设计的浏览器，提供全新的标签页管理体验",
    url: "https://arc.net",
    category: "效率",
    icon: "🌐",
  },
  {
    name: "CleanShot X",
    desc: "macOS 截图录屏工具，功能强大且易用",
    url: "https://cleanshot.com",
    category: "效率",
    icon: "📷",
  },
];

const categories = [...new Set(tools.map((t) => t.category))];

export default function ToolsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-32 section-padding">
        <div className="text-center mb-16">
          <span className="text-[#E57035] text-xs font-bold tracking-widest uppercase">
            工具收藏
          </span>
          <h1 className="text-4xl font-semibold mt-3">收集的好工具</h1>
          <p className="text-[#6B6B6B] mt-4 max-w-xl mx-auto">
            日常使用中发现的有意思的工具和网站，持续更新中...
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-12">
          {/* 文章工具 */}
          <div>
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#E57035] rounded-full" />
              文章工具
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                href="/tools/article-tools"
                className="group bg-white border border-[#E5E5E0] p-5 rounded-xl transition-all hover:shadow-md hover:border-[#9CA3AF]"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✍️</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold group-hover:text-[#E57035] transition-colors">
                      文章工具箱
                    </h3>
                    <p className="text-[#6B6B6B] text-sm mt-1 line-clamp-2">
                      封面生成、二维码、Markdown 转微信/X 排版，写作必备工具集
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {categories.map((category) => (
            <div key={category}>
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#E57035] rounded-full" />
                {category}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tools
                  .filter((t) => t.category === category)
                  .map((tool, i) => (
                    <a
                      key={i}
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-white border border-[#E5E5E0] p-5 rounded-xl transition-all hover:shadow-md hover:border-[#9CA3AF]"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{tool.icon}</span>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold group-hover:text-[#E57035] transition-colors">
                            {tool.name}
                          </h3>
                          <p className="text-[#6B6B6B] text-sm mt-1 line-clamp-2">
                            {tool.desc}
                          </p>
                        </div>
                      </div>
                    </a>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
