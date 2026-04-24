import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata = {
  title: "文章工具 | 阅微漫记",
  description: "封面生成、二维码工具、Markdown 排版工具集合",
};

const tools = [
  {
    href: "/tools/cover",
    name: "封面生成器",
    desc: "快速生成文章封面图，支持多种配色、装饰风格与光影叠加，可导出 PNG。",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        stroke="white"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="3" width="18" height="14" rx="2" />
        <path d="M2 13.5l4.5-4.5 3.5 3.5 3.5-4.5 6.5 6.5" />
        <line x1="6" y1="20" x2="16" y2="20" />
        <line x1="11" y1="17" x2="11" y2="20" />
      </svg>
    ),
    gradient: "from-blue-900 to-blue-600",
  },
  {
    href: "/tools/qrcode",
    name: "二维码工具",
    desc: "生成与解析二维码，支持文本、链接，纯本地处理，数据不上传。",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        stroke="white"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="7" height="7" rx="1" />
        <rect x="3.5" y="3.5" width="4" height="4" rx="0.5" fill="white" stroke="none" />
        <rect x="13" y="2" width="7" height="7" rx="1" />
        <rect x="14.5" y="3.5" width="4" height="4" rx="0.5" fill="white" stroke="none" />
        <rect x="2" y="13" width="7" height="7" rx="1" />
        <rect x="3.5" y="14.5" width="4" height="4" rx="0.5" fill="white" stroke="none" />
        <rect x="13" y="13" width="2" height="2" fill="white" stroke="none" />
        <rect x="17" y="13" width="2" height="2" fill="white" stroke="none" />
        <rect x="13" y="17" width="2" height="2" fill="white" stroke="none" />
        <rect x="17" y="17" width="2" height="2" fill="white" stroke="none" />
      </svg>
    ),
    gradient: "from-violet-900 to-violet-600",
  },
  {
    href: "/tools/md-to-wechat",
    name: "MD → 微信排版",
    desc: "将 Markdown 转换为微信公众号可用的富文本格式，一键复制粘贴。",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        stroke="white"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 3h8l4 4v12H5V3z" />
        <path d="M13 3v4h4" />
        <line x1="8" y1="11" x2="14" y2="11" />
        <line x1="8" y1="14" x2="12" y2="14" />
      </svg>
    ),
    gradient: "from-slate-700 to-slate-500",
  },
  {
    href: "/tools/md-to-x",
    name: "MD → X 排版",
    desc: "将 Markdown 转换为适合 X（Twitter）发布的格式，支持长推文拆分。",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        stroke="white"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 3h8l4 4v12H5V3z" />
        <path d="M13 3v4h4" />
        <line x1="8" y1="11" x2="14" y2="11" />
        <line x1="8" y1="14" x2="12" y2="14" />
      </svg>
    ),
    gradient: "from-slate-700 to-slate-500",
  },
];

export default function ArticleToolsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-32 section-padding pb-24">
        <div className="text-center mb-16">
          <span className="text-[#E57035] text-xs font-bold tracking-widest uppercase">
            文章工具
          </span>
          <h1 className="text-4xl font-semibold mt-3">写作工具箱</h1>
          <p className="text-[#6B6B6B] mt-4 max-w-xl mx-auto text-sm leading-relaxed">
            按照约定格式写作，其他的交给工具。封面、公众号排版、X 排版——打开即用，点击完成。
          </p>
          <Link
            href="/tools"
            className="inline-flex items-center gap-1.5 mt-6 text-sm text-[#6B6B6B] hover:text-[#111] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 12L6 8l4-4" />
            </svg>
            返回工具收藏
          </Link>
        </div>

        <div className="max-w-2xl mx-auto grid sm:grid-cols-2 gap-4">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group bg-white border border-[#E5E5E0] rounded-2xl p-6 flex flex-col gap-4 transition-all hover:shadow-lg hover:border-[#9CA3AF] hover:-translate-y-0.5"
            >
              <div
                className={`w-11 h-11 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center flex-shrink-0`}
              >
                {tool.icon}
              </div>
              <div>
                <h3 className="font-semibold text-[15px] text-[#111] group-hover:text-[#E57035] transition-colors">
                  {tool.name}
                </h3>
                <p className="text-[#6B6B6B] text-sm mt-1.5 leading-relaxed">
                  {tool.desc}
                </p>
              </div>
              <span className="inline-flex items-center text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 w-fit">
                已上线
              </span>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
