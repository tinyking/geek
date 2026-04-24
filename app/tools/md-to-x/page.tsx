export const metadata = {
  title: "MD → X 排版 | 阅微漫记",
  description: "将 Markdown 转换为适合 X（Twitter）发布的格式，支持长推文拆分",
};

export default function MdToXPage() {
  return (
    <div className="w-full h-screen">
      <iframe
        src="/tools/md-to-x.html"
        className="w-full h-full border-0"
        title="MD → X 排版"
        allow="clipboard-write"
      />
    </div>
  );
}
