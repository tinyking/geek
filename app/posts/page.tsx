import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getAllPosts, getAllTags } from "./utils";

export const metadata = {
  title: "文章 | 阅微漫记",
  description: "我的文章和思考",
};

export default function PostsPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-32 section-padding">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <span className="text-[#E57035] text-xs font-bold tracking-widest uppercase">
              思考与记录
            </span>
            <h1 className="text-4xl font-semibold mt-3">文章</h1>
            <p className="text-[#6B6B6B] mt-4">
              记录想法、分享经验、沉淀思考
            </p>
          </div>

          {/* 标签筛选 */}
          <div className="flex flex-wrap gap-2 mb-10">
            <span className="text-sm text-[#6B6B6B] mr-2">标签：</span>
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/posts?tag=${encodeURIComponent(tag)}`}
                className="px-3 py-1 text-sm bg-white border border-[#E5E5E0] rounded-full hover:border-[#E57035] hover:text-[#E57035] transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>

          {/* 文章列表 */}
          <div className="space-y-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group border-b border-[#E5E5E0] pb-8 last:border-b-0"
              >
                <Link href={`/posts/${post.slug}`}>
                  <h2 className="text-xl font-semibold group-hover:text-[#E57035] transition-colors mb-2">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-[#6B6B6B] mb-3">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-[#9CA3AF]">
                  <time dateTime={post.date}>{post.date}</time>
                  <span>·</span>
                  <span>{post.readingTime} 分钟阅读</span>
                  <span>·</span>
                  <div className="flex gap-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-[#F5F5F0] rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
