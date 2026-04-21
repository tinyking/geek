import { notFound } from "next/navigation";
import Link from "next/link";
import { marked } from "marked";
import hljs from "highlight.js";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ShareButtons from "./ShareButtons";
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

// 自定义渲染器
const renderer = new marked.Renderer();

renderer.code = function ({ text, lang }: { text: string; lang?: string }) {
  let highlighted: string;
  if (lang && hljs.getLanguage(lang)) {
    try {
      highlighted = hljs.highlight(text, { language: lang }).value;
    } catch {
      highlighted = hljs.highlightAuto(text).value;
    }
  } else {
    highlighted = hljs.highlightAuto(text).value;
  }
  return `<pre><code class="language-${lang || ""}">${highlighted}</code></pre>`;
};

// 配置 marked
marked.setOptions({
  renderer,
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

  // 分享链接
  const postUrl = `https://geek.tinyking.vercel.app/posts/${slug}`;

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
              [&>pre]:bg-[#282c34] [&>pre]:text-[#abb2bf] [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:my-4 [&>pre]:overflow-x-auto
              [&>pre>code]:bg-transparent [&>pre>code]:text-[#abb2bf] [&>pre>code]:whitespace-pre-wrap [&>pre>code]:break-words [&>pre>code]:text-sm [&>pre>code]:leading-relaxed
              [&_code]:bg-[#F5F5F0] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:text-[#E57035]
              [&_strong]:font-semibold [&_strong]:text-[#1A1A1A]
              [&_em]:italic
              [&_a]:text-[#E57035] [&_a]:underline [&_a]:hover:text-[#C55A20]
              /* 表格样式 */
              [&>table]:w-full [&>table]:border-collapse [&>table]:my-6 [&>table]:text-sm
              [&>table]:border [&>table]:border-[#E5E5E0] [&>table]:rounded-lg [&>table]:overflow-hidden
              [&>table_th]:bg-[#F5F5F0] [&>table_th]:px-4 [&>table_th]:py-3 [&>table_th]:text-left [&>table_th]:font-semibold [&>table_th]:text-[#1A1A1A] [&>table_th]:border-b [&>table_th]:border-[#E5E5E0]
              [&>table_td]:px-4 [&>table_td]:py-3 [&>table_td]:text-[#4A4A4A] [&>table_td]:border-b [&>table_td]:border-[#E5E5E0]
              [&>table_tr]:bg-white [&>table_tr]:hover:bg-[#FAFAF8]
              [&>table_tr:last-child_td]:border-b-0
              /* Highlight.js 语法高亮颜色 */
              [&_.hljs-keyword]:text-[#c678dd]
              [&_.hljs-string]:text-[#98c379]
              [&_.hljs-number]:text-[#d19a66]
              [&_.hljs-comment]:text-[#5c6370] [&_.hljs-comment]:italic
              [&_.hljs-function]:text-[#61afef]
              [&_.hljs-class]:text-[#e5c07b]
              [&_.hljs-variable]:text-[#e06c75]
              [&_.hljs-built_in]:text-[#e6c07b]
              [&_.hljs-type]:text-[#56b6c2]
              [&_.hljs-params]:text-[#abb2bf]
              [&_.hljs-title]:text-[#61afef]
              [&_.hljs-attr]:text-[#d19a66]
              [&_.hljs-attribute]:text-[#98c379]
              [&_.hljs-symbol]:text-[#56b6c2]
              [&_.hljs-bullet]:text-[#61afef]
              [&_.hljs-addition]:text-[#98c379]
              [&_.hljs-deletion]:text-[#e06c75]
              [&_.hljs-selector-class]:text-[#e5c07b]
              [&_.hljs-selector-id]:text-[#e5c07b]
              [&_.hljs-selector-tag]:text-[#e06c75]
              [&_.hljs-name]:text-[#e06c75]
              [&_.hljs-tag]:text-[#abb2bf]
              [&_.hljs-punctuation]:text-[#abb2bf]"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {/* 分享按钮 */}
          <div className="mt-10 pt-6 border-t border-[#E5E5E0]">
            <ShareButtons
              title={post.title}
              url={postUrl}
              excerpt={post.excerpt}
            />
          </div>

          {/* 文章底部 */}
          <footer className="mt-8 pt-8 border-t border-[#E5E5E0]">
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
