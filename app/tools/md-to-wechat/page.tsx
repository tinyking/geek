export const metadata = {
  title: "MD → 微信排版 | 阅微漫记",
  description: "将 Markdown 转换为微信公众号可用的富文本格式，一键复制粘贴",
};

export default function MdToWechatPage() {
  return (
    <div className="w-full h-screen">
      <iframe
        src="/tools/md-to-wechat.html"
        className="w-full h-full border-0"
        title="MD → 微信排版"
        allow="clipboard-write"
      />
    </div>
  );
}
