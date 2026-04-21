import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "关于 | 阅微漫记",
  description: "了解阅微漫记的故事",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-32 section-padding">
        <div className="text-center mb-16">
          <span className="text-[#E57035] text-xs font-bold tracking-widest uppercase">
            关于我
          </span>
          <h1 className="text-4xl font-semibold mt-3">个人简介</h1>
        </div>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[#6B6B6B] text-lg leading-relaxed mb-8">
            这里是阅微漫记，一个用于记录思考、分享作品的个人空间。
            愿以文字留存时光，以作品传递温度。
          </p>
          <p className="text-[#6B6B6B] text-lg leading-relaxed mb-8">
            热爱思考与创作，专注于记录生活感悟与技术探索。
            相信文字的力量，也相信好的设计能让生活更美好。
          </p>
          <p className="text-[#6B6B6B] text-lg leading-relaxed">
            在这里，你会找到我的思考随笔、技术笔记、设计作品，
            以及一切值得被记录的美好事物。
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
