"use client";

import { useState } from "react";
import { Link2, Check, Share2 } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  excerpt: string;
}

export default function ShareButtons({ title, excerpt }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  // 获取当前页面 URL
  const getCurrentUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.href;
    }
    return "";
  };

  const shareToTwitter = () => {
    const url = getCurrentUrl();
    const text = `${title}\n${excerpt}`;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(shareUrl, "_blank", "width=550,height=420");
  };

  const shareToWeibo = () => {
    const url = getCurrentUrl();
    const shareUrl = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&pic=`;
    window.open(shareUrl, "_blank", "width=550,height=420");
  };

  const copyLink = async () => {
    const url = getCurrentUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-[#6B6B6B] flex items-center gap-1">
        <Share2 size={14} />
        分享到
      </span>
      <button
        onClick={shareToTwitter}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-[#1DA1F2] text-white rounded-full hover:bg-[#1a8cd8] transition-colors"
        title="分享到 Twitter"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-3.5 h-3.5"
        >
          <path d="M18.244 2.25h3.308l-7.287 8.36 8.575 11.14H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.878L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        Twitter
      </button>
      <button
        onClick={shareToWeibo}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-[#E6162D] text-white rounded-full hover:bg-[#c91427] transition-colors"
        title="分享到微博"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-3.5 h-3.5"
        >
          <path d="M10.098 20.323c-3.977.391-7.414-1.406-7.672-4.02-.259-2.609 2.759-5.047 6.74-5.441 3.979-.394 7.413 1.404 7.671 4.018.259 2.6-2.759 5.049-6.739 5.443zM9.05 17.219c-.384.616-1.208.884-1.829.602-.612-.279-.793-.991-.406-1.593.379-.595 1.176-.861 1.793-.601.622.263.82.972.442 1.592zm1.27-1.627c-.141.237-.449.353-.689.253-.236-.09-.313-.361-.177-.586.138-.227.436-.346.672-.24.239.09.315.36.194.573zm.176-2.719c-1.893-.493-4.033.45-4.857 2.118-.836 1.704-.026 3.591 1.886 4.21 1.983.64 4.318-.341 5.132-2.179.8-1.793-.201-3.642-2.161-4.149zm7.563-1.224c-.346-.105-.579-.18-.405-.649.384-1.036.425-1.927.002-2.564-.788-1.191-2.931-1.129-5.354-.033-.001-.001-.768.334-.571-.271.378-1.186.32-2.178-.269-2.753-1.334-1.302-4.878.046-7.915 3.016C1.497 10.725 0 13.264 0 15.422c0 4.124 5.292 6.634 10.47 6.634 6.789 0 11.298-3.944 11.298-7.077 0-1.894-1.594-2.969-2.709-3.33z" />
        </svg>
        微博
      </button>
      <button
        onClick={copyLink}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-[#6B6B6B] text-white rounded-full hover:bg-[#4A4A4A] transition-colors"
        title="复制链接"
      >
        {copied ? (
          <>
            <Check size={14} />
            已复制
          </>
        ) : (
          <>
            <Link2 size={14} />
            复制链接
          </>
        )}
      </button>
    </div>
  );
}
