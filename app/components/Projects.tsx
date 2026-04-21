const projects = [
  {
    title: "健康追踪 App 重设计",
    desc: "为一款健康类应用进行了全面的界面重构，用户留存率提升了 40%。",
    tag: "🎨 界面设计",
    icon: "📱",
  },
  // ... 其他项目数据
];

export default function Projects() {
  return (
    <section id="projects" className="section-padding">
      <div className="text-center mb-16">
        <span className="text-[#E57035] text-xs font-bold tracking-widest uppercase">
          精选作品
        </span>
        <h2 className="text-4xl font-semibold mt-3">最近的项目</h2>
      </div>
      <div className="grid gap-6">
        {projects.map((p, i) => (
          <a
            key={i}
            href="#"
            className="group bg-white border border-[#E5E5E0] p-8 rounded-xl flex flex-col md:flex-row gap-8 transition-all hover:shadow-lg hover:border-[#9CA3AF]"
          >
            <div className="w-full md:w-48 h-36 bg-gradient-to-br from-[#FFF5F0] to-[#FFEDE5] rounded-lg flex items-center justify-center text-4xl">
              {p.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
              <p className="text-[#6B6B6B] mb-4">{p.desc}</p>
              <div className="flex gap-4 text-xs text-[#9CA3AF]">
                <span>{p.tag}</span>
                <span>📅 2024</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
