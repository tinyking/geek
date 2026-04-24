export const metadata = {
  title: "封面生成器 | 阅微漫记",
  description: "快速生成文章封面图，支持多种配色、装饰风格与光影叠加，可导出 PNG",
};

export default function CoverPage() {
  return (
    <div className="w-full h-screen">
      <iframe
        src="/tools/cover.html"
        className="w-full h-full border-0"
        title="封面生成器"
        allow="clipboard-write"
      />
    </div>
  );
}
