import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="pt-40 pb-24 px-6 max-w-3xl mx-auto text-center">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-[#E5E5E0] rounded-full text-xs text-[#6B6B6B] mb-8">
        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
        持续更新中
      </div>
      <h1 className="text-5xl md:text-6xl font-semibold leading-[1.1] tracking-tight mb-6">
        记录思考
        <br />
        <span className="text-[#E57035]">分享成长</span>
      </h1>
      <p className="text-xl text-[#6B6B6B] leading-relaxed mb-10 max-w-xl mx-auto">
        我是一名独立创作者，热爱思考与分享，专注于记录生活感悟与技术探索。
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link href="/posts" className="btn-primary">
          阅读文章 <ArrowRight size={18} />
        </Link>
        <Link href="/projects" className="btn-secondary">
          查看作品
        </Link>
      </div>
    </section>
  );
}
