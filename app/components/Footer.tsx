export default function Footer() {
  return (
    <footer className="border-t border-[#E5E5E0] py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[#6B6B6B]">
          © {new Date().getFullYear()} 阅微漫记. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://x.com/tinyking86"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#6B6B6B] hover:text-black transition-colors"
          >
            Twitter
          </a>
          <a
            href="https://github.com/tinyking"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#6B6B6B] hover:text-black transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
