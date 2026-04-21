import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "作品 | 阅微漫记",
  description: "我的作品集",
};

export default function ProjectsPage() {
  const projects = [
    {
      title: "健康追踪 App 重设计",
      desc: "为一款健康类应用进行了全面的界面重构，用户留存率提升了 40%。",
      tag: "🎨 界面设计",
      year: "2024",
    },
    {
      title: "个人博客系统",
      desc: "基于 Next.js 开发的个人博客系统，支持 Markdown 写作、标签分类、全文搜索。",
      tag: "💻 全栈开发",
      year: "2024",
    },
    {
      title: "品牌视觉设计",
      desc: "为初创公司打造完整的品牌视觉识别系统，包括 Logo、色彩、字体规范。",
      tag: "🎨 品牌设计",
      year: "2023",
    },
    {
      title: "效率工具插件",
      desc: "浏览器效率插件开发，帮助用户快速收集和整理网页信息。",
      tag: "💻 前端开发",
      year: "2023",
    },
  ];

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-32 section-padding">
        <div className="text-center mb-16">
          <span className="text-[#E57035] text-xs font-bold tracking-widest uppercase">
            精选作品
          </span>
          <h1 className="text-4xl font-semibold mt-3">我的作品</h1>
        </div>
        <div className="max-w-4xl mx-auto grid gap-6">
          {projects.map((project, i) => (
            <article
              key={i}
              className="group bg-white border border-[#E5E5E0] p-8 rounded-xl flex flex-col md:flex-row gap-8 transition-all hover:shadow-lg hover:border-[#9CA3AF]"
            >
              <div className="w-full md:w-48 h-36 bg-gradient-to-br from-[#FFF5F0] to-[#FFEDE5] rounded-lg flex items-center justify-center text-4xl shrink-0">
                {project.tag.startsWith("🎨") ? "🎨" : "💻"}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
                <p className="text-[#6B6B6B] mb-4">{project.desc}</p>
                <div className="flex gap-4 text-xs text-[#9CA3AF]">
                  <span>{project.tag}</span>
                  <span>📅 {project.year}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
