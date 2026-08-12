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
      { no: "005", date: "2026.08.04", title: "单点故障：你的人生里，有没有一件事一旦崩了，整个系统都会停摆？", url: "#" },
      { no: "006", date: "2026.08.07", title: "依赖注入：谁在替你的系统兜底？你有没有把人生交给了错误的依赖？", url: "#" },
      { no: "007", date: "2026.08.09", title: "重构 vs 打补丁：有些问题，不是修一下就好了", url: "#" },
      { no: "008", date: "2026.08.11", title: "版本号：你有没有记录过，自己已经升级到了哪个版本？", url: "#" }
    ]
  },
  {
    id: "maboyong-diary",
    tab: "SERIES 02",
    title: "马伯庸式日记",
    desc: "以考据与细节为骨、以虚构与想象为皮。模仿马伯庸笔法，把日常琐碎写成历史档案。",
    status: "连载中",
    articles: [
      { no: "001", date: "2026.07.30", title: "马伯庸式打卡日记 · Day 1：铁板炒饼与 Langchain 的带劲", url: "#" },
      { no: "002", date: "2026.07.31", title: "马伯庸式打卡日记 · Day 2：抄字一小时与 qq 农场的白萝卜", url: "#" },
      { no: "003", date: "2026.08.03", title: "马伯庸式打卡日记 · Day 3：俊凯交接与 FDE 的前线叙事", url: "#" },
      { no: "004", date: "2026.08.04", title: "马伯庸式打卡日记 · Day 4：地铁上的举棋不定与落子无悔", url: "#" },
      { no: "005", date: "2026.08.05", title: "马伯庸式打卡日记 · Day 5：皮肤上的白色颗粒与肌肤甲错", url: "#" },
      { no: "006", date: "2026.08.06", title: "马伯庸式打卡日记 · Day 6：黑蝉盛夏与焦虑的蛰伏", url: "#" },
      { no: "007", date: "2026.08.07", title: "马伯庸式打卡日记 · Day 7：雨夜踩水与椰子被退的承诺", url: "#" },
      { no: "008", date: "2026.08.10", title: "马伯庸式打卡日记 · Day 8：钢笔换签字笔与工具之隐", url: "#" }
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
      { no: "002", date: "2026.04.10", title: "《中国社会各阶级的分析》：我的中年敌友地图", url: "#" },
      { no: "003", date: "2026.03.22", title: "《湖南农民运动考察报告》：我的中年调查清单", url: "#" },
      { no: "004", date: "2026.03.05", title: "《中国的红色政权为什么能够存在》：我的中年根据地", url: "#" },
      { no: "005", date: "2026.02.14", title: "《星星之火，可以燎原》：我的小动作能燎原吗", url: "#" },
      { no: "006", date: "2026.08.07", title: "反对本本主义 · 撕掉我人生的「本本」", url: "#" },
      { no: "007", date: "2026.08.11", title: "实践论 · 道理都懂，为什么做不到", url: "#" }
    ]
  }
];

export const STATUS_CLASS: Record<string, string> = {
  "连载中": "run",
  "已完结": "ok",
  "不定期更新": "maint"
};
