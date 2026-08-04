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
      { no: "001", date: "2026.07.07", title: "你不是不够努力，你是欠了一屁股「人生技术债」", url: "#" },
      { no: "002", date: "2026.07.14", title: "人生代码审查：把你欠的债，一笔一笔列出来", url: "#" },
      { no: "003", date: "2026.07.21", title: "认知接口：你和世界对话的协议，可能早就过时了", url: "#" },
      { no: "004", date: "2026.07.28", title: "灰度发布：为什么人生重大转型，不应该一次性重启系统", url: "#" },
      { no: "005", date: "2026.08.04", title: "单点故障：你的人生里，有没有一件事一旦崩了，整个系统都会停摆？", url: "#" }
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
    id: "learn-from-chairman-mao",
    tab: "SERIES 03",
    title: "请教员当老师",
    desc: "通过和 AI 共读拆解《毛选》，学习教员的强大能力。",
    status: "连载中",
    articles: [
      { no: "001", date: "2026.04.26", title: "人到中年，我为什么开始跟着教员学战略思维", url: "#" },
      { no: "002", date: "2026.04.10", title: "《中国社会各阶级的分析》：谁是我们的敌人", url: "#" },
      { no: "003", date: "2026.03.22", title: "《矛盾论》：抓主要矛盾的方法论", url: "#" },
      { no: "004", date: "2026.03.05", title: "《实践论》：从感性认识到理性认识", url: "#" },
      { no: "005", date: "2026.02.14", title: "《反对本本主义》：没有调查就没有发言权", url: "#" }
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
