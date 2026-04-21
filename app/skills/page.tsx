import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "技能 | 阅微漫记",
  description: "我的专业技能",
};

export default function SkillsPage() {
  const skills = [
    {
      category: "设计",
      items: [
        { name: "UI/UX 设计", desc: "用户界面设计、交互原型、设计系统搭建" },
        { name: "品牌设计", desc: "视觉识别、Logo 设计、品牌指南" },
        { name: "插画设计", desc: "矢量插画、图标设计、视觉元素创作" },
      ],
    },
    {
      category: "开发",
      items: [
        { name: "前端开发", desc: "React、Next.js、TypeScript、Tailwind CSS" },
        { name: "后端开发", desc: "Node.js、Python、数据库设计" },
        { name: "全栈开发", desc: "端到端应用开发、部署运维" },
      ],
    },
    {
      category: "写作",
      items: [
        { name: "技术写作", desc: "技术博客、教程文档、开源项目文档" },
        { name: "生活随笔", desc: "生活感悟、旅行游记、阅读笔记" },
        { name: "内容创作", desc: "公众号文章、社交媒体内容" },
      ],
    },
  ];

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-32 section-padding">
        <div className="text-center mb-16">
          <span className="text-[#E57035] text-xs font-bold tracking-widest uppercase">
            专业技能
          </span>
          <h1 className="text-4xl font-semibold mt-3">我的技能</h1>
        </div>
        <div className="max-w-4xl mx-auto space-y-12">
          {skills.map((group) => (
            <div key={group.category}>
              <h2 className="text-2xl font-semibold mb-6 text-center">
                {group.category}
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {group.items.map((skill, i) => (
                  <div
                    key={i}
                    className="bg-white border border-[#E5E5E0] p-6 rounded-xl"
                  >
                    <h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
                    <p className="text-[#6B6B6B] text-sm">{skill.desc}</p>
                  </div>
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
