export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
  readingTime: number;
}

// 模拟文章数据（后续可以改为从文件系统或数据库读取）
export const posts: Post[] = [
  {
    slug: "how-to-build-a-personal-website",
    title: "如何搭建一个个人网站",
    date: "2024-04-15",
    excerpt: "分享从零开始搭建个人网站的完整流程，包括技术选型、设计思路和部署方案。",
    content: `
## 为什么要有个人网站

在这个信息爆炸的时代，拥有一个属于自己的网络空间变得尤为重要。个人网站不仅是展示自己的窗口，更是记录成长、分享思考的平台。

## 技术选型

在搭建这个网站时，我选择了以下技术栈：

- **Next.js** - React 框架，支持服务端渲染和静态生成
- **TypeScript** - 类型安全，提升开发体验
- **Tailwind CSS** - 原子化 CSS，快速构建界面

这套技术栈的优势在于：

1. 开发效率高
2. 性能优秀
3. 部署简单
4. 易于维护

## 设计原则

网站设计遵循以下原则：

- **简洁** - 少即是多，去除不必要的装饰
- **可读** - 排版清晰，阅读体验优先
- **温暖** - 配色柔和，传递温度

## 部署方案

推荐使用 Vercel 部署，它与 Next.js 无缝集成，只需连接 GitHub 仓库即可自动部署。

## 结语

搭建个人网站是一个持续迭代的过程，不必追求一步到位。先上线，再优化。
    `,
    tags: ["技术", "Next.js", "建站"],
    readingTime: 5,
  },
  {
    slug: "my-reading-notes-2024",
    title: "2024 年阅读笔记",
    date: "2024-04-10",
    excerpt: "整理 2024 年读过的好书，分享读书笔记和心得体会。",
    content: `
## 前言

阅读是我生活中不可或缺的一部分。今年给自己定了一个小目标：读完 24 本书。这里记录下阅读的痕迹。

## 技术类

### 《代码整洁之道》

这是一本值得反复阅读的经典。核心观点：

- 代码是写给人看的，顺便让机器执行
- 命名是最重要也是最难的事
- 函数应该只做一件事

### 《重构》

重构不是一蹴而就的，而是持续进行的小步改进。书中提到的"代码坏味道"清单非常实用。

## 非技术类

### 《原则》

Ray Dalio 的人生和工作原则。印象最深的一点：把生活当作一个不断进化的系统，从错误中学习。

### 《思考，快与慢》

人类思维的两种模式：快思考和慢思考。理解这一点，有助于做出更好的决策。

## 结语

读书不在多，而在精。找到对自己有启发的书，深入阅读并实践，比泛泛而读更有价值。
    `,
    tags: ["阅读", "笔记", "成长"],
    readingTime: 8,
  },
  {
    slug: "design-principles-i-believe",
    title: "我信奉的设计原则",
    date: "2024-03-28",
    excerpt: "总结多年来在设计和开发过程中形成的设计理念和原则。",
    content: `
## 设计的本质

设计不是装饰，而是解决问题。好的设计应该是隐形的，用户不会注意到设计本身，只会享受使用的过程。

## 核心原则

### 1. 少即是多

去除一切不必要的元素，只保留最核心的内容。每一个元素都应该有存在的理由。

### 2. 一致性

保持视觉和交互的一致性，降低用户的认知负担。一致的颜色、字体、间距和交互模式，让用户感到熟悉和安心。

### 3. 留白

留白不是浪费空间，而是给内容呼吸的余地。适当的留白能让重要信息更加突出。

### 4. 层次感

通过大小、颜色、粗细来建立视觉层次，引导用户的视线流动。

### 5. 可访问性

设计应该对所有用户友好，包括视力障碍用户。对比度、字体大小、交互区域都需要考虑。

## 结语

这些原则不是教条，而是思考的起点。每个项目都有其独特性，灵活运用才能创造好的设计。
    `,
    tags: ["设计", "思考", "原则"],
    readingTime: 4,
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getAllPosts(): Post[] {
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostsByTag(tag: string): Post[] {
  return posts
    .filter((post) => post.tags.includes(tag))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort();
}
