import { notFound } from "next/navigation";
import Link from "next/link";
import { marked } from "marked";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getPostBySlug, getAllPosts } from "../utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return { title: "未找到文章" };
  }
  return {
    title: `${post.title} | 阅微漫记`,
    description: post.excerpt,
  };
}

// 配置 marked
marked.setOptions({
  breaks: true,
  gfm: true,
});

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const htmlContent = await marked(post.content);

  return (
    <main className="min-h-screen">
      <Navbar />
      <article className="pt-32 section-padding">
        <div className="max-w-2xl mx-auto">
          {/* 返回链接 */}
          <Link
            href="/posts"
            className="inline-flex items-center gap-1 text-sm text-[#6B6B6B] hover:text-[#E57035] transition-colors mb-8"
          >
            ← 返回文章列表
          </Link>

          {/* 文章头部 */}
          <header className="mb-10">
            <h1 className="text-3xl md:text-4xl font-semibold leading-tight mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-[#6B6B6B]">
              <time dateTime={post.date}>{post.date}</time>
              <span>·</span>
              <span>{post.readingTime} 分钟阅读</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs bg-[#F5F5F0] rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* 文章内容 */}
          <div
            className="prose prose-neutral max-w-none
              [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:text-[#1A1A1A]
              [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mt-8 [&>h3]:mb-3 [&>h3]:text-[#1A1A1A]
              [&>p]:mb-4 [&>p]:text-[#4A4A4A] [&>p]:leading-relaxed
              [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-4 [&>ul]:text-[#4A4A4A] [&>ul]:space-y-1
              [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-4 [&>ol]:text-[#4A4A4A] [&>ol]:space-y-1
              [&>blockquote]:border-l-4 [&>blockquote]:border-[#E57035] [&>blockquote]:pl-4 [&>blockquote]:py-2 [&>blockquote]:my-4 [&>blockquote]:bg-[#FFFAF5] [&>blockquote]:text-[#6B6B6B] [&>blockquote]:italic
              [&>pre]:bg-[#1A1A1A] [&>pre]:text-white [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:my-4 [&>pre]:overflow-x-auto
              [&>pre>code]:bg-transparent [&>pre>code]:text-white [&>pre>code]:whitespace-pre-wrap [&>pre>code]:break-words
              [&_code]:bg-[#F5F5F0] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:text-[#E57035]
              [&_strong]:font-semibold [&_strong]:text-[#1A1A1A]
              [&_em]:italic
              [&_a]:text-[#E57035] [&_a]:underline [&_a]:hover:text-[#C55A20]"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {/* 文章底部 */}
          <footer className="mt-16 pt-8 border-t border-[#E5E5E0]">
            <Link
              href="/posts"
              className="inline-flex items-center gap-1 text-sm text-[#6B6B6B] hover:text-[#E57035] transition-colors"
            >
              ← 返回文章列表
            </Link>
          </footer>
        </div>
      </article>
      <Footer />
    </main>
  );
}
