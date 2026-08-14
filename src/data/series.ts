// 公众号专辑元数据：首页 dossier 与专辑详情页共享
// 文章列表数据已迁移至 src/content/series-articles/*.md（Content Collections）
export interface Series {
  id: string;       // URL slug
  tab: string;      // SERIES 01
  title: string;    // 人生 Debug
  desc: string;     // 介绍
  status: string;   // 连载中 / 已完结 / 不定期更新
}

export const SERIES: Series[] = [
  {
    id: "life-debug",
    tab: "SERIES 01",
    title: "人生 Debug",
    desc: "把生活当程序，把烦恼当 Bug。一组以调试为隐喻的随笔，记录情绪、关系与节奏的修复日志。",
    status: "连载中",
  },
  {
    id: "maboyong-diary",
    tab: "SERIES 02",
    title: "马伯庸式日记",
    desc: "以考据与细节为骨、以虚构与想象为皮。模仿马伯庸笔法，把日常琐碎写成历史档案。",
    status: "连载中",
  },
  {
    id: "learn-from-chairman-mao",
    tab: "SERIES 03",
    title: "请教员当老师",
    desc: "通过和 AI 共读拆解《毛选》，学习教员的强大能力。",
    status: "连载中",
  },
];

export const STATUS_CLASS: Record<string, string> = {
  "连载中": "run",
  "已完结": "ok",
  "不定期更新": "maint"
};
