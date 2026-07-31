/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#fafaf8',
          warm: '#fafaf8',
          card: '#ffffff',
        },
        ink: {
          primary: '#1a1a1a',
          secondary: '#6b6b6b',
          tertiary: '#767268',
          muted: '#9ca3af',
        },
        accent: {
          DEFAULT: '#e57035',
          hover: '#c85a25',
          light: '#fff5f0',
          lighter: '#ffede5',
        },
        border: {
          DEFAULT: '#e5e5e0',
          hover: '#767268',
        },
        semantic: {
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444',
          info: '#3b82f6',
        },
      },
      fontFamily: {
        sans: ['"Noto Sans SC"', '"PingFang SC"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"SF Mono"', 'Monaco', 'Consolas', 'monospace'],
      },
      maxWidth: {
        content: '48rem',
        full: '72rem',
      },
    },
  },
  plugins: [],
}
