import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "联系 | 阅微漫记",
  description: "与我取得联系",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-32 section-padding">
        <div className="text-center mb-16">
          <span className="text-[#E57035] text-xs font-bold tracking-widest uppercase">
            联系方式
          </span>
          <h1 className="text-4xl font-semibold mt-3">取得联系</h1>
        </div>
        <div className="max-w-md mx-auto">
          <p className="text-[#6B6B6B] text-center mb-8">
            有任何想法或合作意向，欢迎与我联系。
          </p>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[#6B6B6B] mb-1"
              >
                您的姓名
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-3 rounded-lg border border-[#E5E5E0] bg-white focus:outline-none focus:border-[#E57035]"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#6B6B6B] mb-1"
              >
                电子邮箱
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 rounded-lg border border-[#E5E5E0] bg-white focus:outline-none focus:border-[#E57035]"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-[#6B6B6B] mb-1"
              >
                您的留言
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-[#E5E5E0] bg-white focus:outline-none focus:border-[#E57035] resize-none"
              />
            </div>
            <button type="submit" className="btn-primary w-full justify-center">
              发送消息
            </button>
          </form>
          <div className="mt-12 text-center">
            <p className="text-sm text-[#6B6B6B] mb-4">或者通过以下方式联系我</p>
            <div className="flex justify-center gap-6">
              <a
                href="https://x.com/tinyking86"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6B6B6B] hover:text-black transition-colors"
              >
                Twitter
              </a>
              <a
                href="https://github.com/tinyking"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6B6B6B] hover:text-black transition-colors"
              >
                GitHub
              </a>
              <a
                href="mailto:tinyking86@gmail.com"
                className="text-[#6B6B6B] hover:text-black transition-colors"
              >
                邮箱
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
