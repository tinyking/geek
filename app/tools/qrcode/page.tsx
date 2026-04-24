export const metadata = {
  title: "二维码工具 | 阅微漫记",
  description: "生成与解析二维码，支持文本、链接，纯本地处理，数据不上传",
};

export default function QrcodePage() {
  return (
    <div className="w-full h-screen">
      <iframe
        src="/tools/qrcode.html"
        className="w-full h-full border-0"
        title="二维码工具"
        allow="clipboard-write"
      />
    </div>
  );
}
