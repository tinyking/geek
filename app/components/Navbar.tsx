import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAFAF8]/80 backdrop-blur-md border-b border-[#E5E5E0]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          阅微漫记
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/posts"
            className="text-sm text-[#6B6B6B] hover:text-black transition-colors"
          >
            文章
          </Link>
          <Link
            href="/about"
            className="text-sm text-[#6B6B6B] hover:text-black transition-colors"
          >
            关于
          </Link>
          <Link
            href="/skills"
            className="text-sm text-[#6B6B6B] hover:text-black transition-colors"
          >
            技能
          </Link>
          <Link
            href="/projects"
            className="text-sm text-[#6B6B6B] hover:text-black transition-colors"
          >
            作品
          </Link>
          <Link
            href="/tools"
            className="text-sm text-[#6B6B6B] hover:text-black transition-colors"
          >
            工具
          </Link>
          <Link
            href="/contact"
            className="bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:opacity-80 transition-opacity"
          >
            联系我
          </Link>
        </div>
      </div>
    </nav>
  );
}
