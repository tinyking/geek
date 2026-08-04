// 公众号专辑数据：首页 dossier 与专辑详情页共享
export interface SeriesArticle {
  no: string;
  date: string;
  title: string;
  url: string;
}

export interface Series {
  id: string;       // URL slug
  tab: string;      // SERIES 01
  title: string;    // 人生 Debug
  desc: string;     // 介绍
  status: string;   // 连载中 / 已完结 / 不定期更新
  articles: SeriesArticle[];
}

export const SERIES: Series[] = [
  {
    id: "life-debug",
    tab: "SERIES 01",
    title: "人生 Debug",
    desc: "把生活当程序，把烦恼当 Bug。一组以调试为隐喻的随笔，记录情绪、关系与节奏的修复日志。",
    status: "连载中",
    articles: [
      { no: "001", date: "2026.07.22", title: "凌晨三点的崩溃：如何给自己写一份错误报告", url: "#" },
      { no: "002", date: "2026.07.08", title: "情绪内存泄漏：找出那些偷偷耗尽你的引用", url: "#" },
      { no: "003", date: "2026.06.21", title: "重启不是解决一切：谈休息与重启的边界", url: "#" },
      { no: "004", date: "2026.06.02", title: "版本控制你的人生：从 commit 信息学会复盘", url: "#" }
    ]
  },
  {
    id: "maboyong-diary",
    tab: "SERIES 02",
    title: "马伯庸式日记",
    desc: "以考据与细节为骨、以虚构与想象为皮。模仿马伯庸笔法，把日常琐碎写成历史档案。",
    status: "连载中",
    articles: [
      { no: "001", date: "2026.07.15", title: "地铁九号线见闻录：早高峰的人种志观察", url: "#" },
      { no: "002", date: "2026.06.30", title: "咖啡馆考古笔记：一张杯垫背后的丝绸之路", url: "#" },
      { no: "003", date: "2026.05.18", title: "外卖考：从一份麻辣烫还原当代市井生活", url: "#" }
    ]
  },
  {
    id: "indie-toolbox",
    tab: "SERIES 03",
    title: "独立开发者的工具箱",
    desc: "写给独立开发者的工具清单。不是推荐，是使用三年后的反思——哪些值得留下，哪些应当抛弃。",
    status: "已完结",
    articles: [
      { no: "001", date: "2026.04.26", title: "我用过最值的 12 款付费工具（按 ROI 排序）", url: "#" },
      { no: "002", date: "2026.04.10", title: "记账这件小事：从随手记到 Beancount 的进阶之路", url: "#" },
      { no: "003", date: "2026.03.22", title: "为什么我把所有笔记迁回了 Markdown", url: "#" },
      { no: "004", date: "2026.03.05", title: "自动化你的周报：一条命令完成一周总结", url: "#" },
      { no: "005", date: "2026.02.14", title: "静态网站的浪漫：把博客当作长跑而非短跑", url: "#" }
    ]
  },
  {
    id: "city-roaming",
    tab: "SERIES 04",
    title: "城市漫游学",
    desc: "用脚步丈量城市。把每一次漫步当作田野调查，记录街道、声响与瞬时的光。",
    status: "不定期更新",
    articles: [
      { no: "001", date: "2026.05.30", title: "北京胡同拓扑学：从烟袋斜街到杨梅竹斜街", url: "#" },
      { no: "002", date: "2026.04.18", title: "上海梧桐树下的微型城市：法租界散步指南", url: "#" },
      { no: "003", date: "2026.03.12", title: "成都的下午四点：玉林路上一杯茶的体积", url: "#" }
    ]
  }
];

export const STATUS_CLASS: Record<string, string> = {
  "连载中": "run",
  "已完结": "ok",
  "不定期更新": "maint"
};
