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
    slug: "hermes-agent-cloud-deployment-feishu",
    title: "Hermes Agent 云端部署与飞书集成手册",
    date: "2026-04-22",
    excerpt: "本手册指导用户在 Hugging Face Spaces 上部署 Hermes Agent 智能体网关，并集成 OpenRouter（Minimax 模型）与飞书机器人。",
    content: `
本手册旨在指导用户在 Hugging Face Spaces 上部署 Hermes Agent 智能体网关，并集成 OpenRouter（Minimax 模型）与飞书机器人。

## 一、环境准备

### 1. 账号需求

- **Hugging Face**: 用于托管 Agent 服务。
- **OpenRouter**: 用于调用大模型（推荐 Minimax-M2.5 免费版）。
- **飞书开放平台**: 用于创建机器人交互界面。

### 2. 核心凭证

| 凭证名称 | 获取来源 | 说明 |
|---------|---------|------|
| \`OPENROUTER_API_KEY\` | OpenRouter.ai | 用于调用大模型 |
| \`FEISHU_APP_ID\` | 飞书开放平台 | 机器人身份标识 |
| \`FEISHU_APP_SECRET\` | 飞书开放平台 | 机器人鉴权密钥 |
| \`API_SERVER_KEY\` | 自定义 | 访问网关的密码（如 \`my_secret_key\`） |

## 二、容器环境配置 (Dockerfile)

为解决 Python 3.12 兼容性及 \`agent.transports\` 模块缺失的 Bug，必须使用 Python 3.11 并采取**源码物理植入**方案。

\`\`\`dockerfile
FROM python:3.11-slim

WORKDIR /app

# 安装系统工具
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

# 物理克隆源码以修复模块路径 Bug
RUN git clone https://github.com/NousResearch/hermes-agent.git /app/hermes-source
RUN ln -s /app/hermes-source/agent /app/agent

# 安装依赖
RUN pip install --no-cache-dir pydantic-ai httpx openai
RUN pip install -e "/app/hermes-source[all]"

# 环境变量与路径锁定
ENV PYTHONPATH="/app:$PYTHONPATH"
ENV API_SERVER_ENABLED=true
ENV API_SERVER_PORT=7860
ENV API_SERVER_HOST=0.0.0.0

COPY boot.py /app/boot.py
CMD ["python", "-u", "/app/boot.py"]
\`\`\`

## 三、引导脚本 (boot.py)

该脚本负责在容器启动时，将 Secrets 中的变量自动同步至 Hermes 的多重配置路径（\`.env\` 与 \`config.yaml\`）。

\`\`\`python
import os
import subprocess

def main():
    print("🚀 正在启动 Hermes Agent (OpenRouter + 飞书集成版)...")

    # 1. 读取 Secrets
    or_key = os.environ.get("OPENROUTER_API_KEY", "").strip()
    server_key = os.environ.get("API_SERVER_KEY", "default_key").strip()
    feishu_id = os.environ.get("FEISHU_APP_ID", "").strip()
    feishu_secret = os.environ.get("FEISHU_APP_SECRET", "").strip()

    # 2. 锁定模型 (经过测试最稳定的免费模型)
    target_model = "minimax/minimax-m2.5:free"

    # 3. 配置文件内容定义
    config_content = f"provider: openrouter\\nmodel: {target_model}\\nagent:\\n  provider: openrouter\\n  model: {target_model}"

    # 4. 多路径配置注入 (地毯式覆盖)
    possible_paths = [os.path.expanduser("~/.hermes"), "/app/.hermes"]
    for path in possible_paths:
        os.makedirs(path, exist_ok=True)
        # 写入 .env
        with open(os.path.join(path, ".env"), "w") as f:
            f.write(f"OPENROUTER_API_KEY={or_key}\\nAPI_SERVER_KEY={server_key}\\n")
            f.write(f"FEISHU_APP_ID={feishu_id}\\nFEISHU_APP_SECRET={feishu_secret}\\nFEISHU_ENABLED=true\\n")
            f.write("API_SERVER_ENABLED=true\\nAPI_SERVER_PORT=7860\\nAPI_SERVER_HOST=0.0.0.0\\nGATEWAY_ALLOW_ALL_USERS=true\\n")
        # 写入 config.yaml
        with open(os.path.join(path, "config.yaml"), "w") as f:
            f.write(config_content)

    # 5. 启动网关
    subprocess.run(["hermes", "gateway"])

if __name__ == "__main__":
    main()
\`\`\`

## 四、飞书端关键设置

### 1. 启用机器人能力

进入飞书开放平台 -> 应用详情 -> **添加应用能力** -> 选择 **「机器人」** -> 点击启用。

### 2. 权限申请 (API 权限)

必须勾选以下权限，否则将无法接收消息或回复：

- \`im:message\` (读取和发送消息)
- \`im:message.p2p_msg:readonly\` (单聊消息)
- \`im:message:send_as_bot\` (以机器人身份发送)

### 3. 事件订阅 (回调地址)

- **请求地址**: \`https://[你的Space名称].hf.space/gateway/feishu/events\`
- **订阅事件**: 添加「接收消息」事件。

### 4. 版本发布 (极其重要)

所有配置修改后，必须在 **「版本管理与发布」** 中创建一个新版本并申请上线，配置才会生效。

## 五、常见问题排查 (FAQ)

### Q: 为什么飞书端没有输入框？

**A**: 请确认：1. 机器人能力已开启；2. 已创建版本并发布上线；3. 你的账号在应用的「可用范围」内。

### Q: 报错 \`No models provided\` 怎么办？

**A**: 这是由于配置路径不一致导致。手册中的 \`boot.py\` 采用了多路径覆盖方案，请确保已点击 Hugging Face 的 **Factory Rebuild** 彻底重置容器。

### Q: 报错 \`Missing Authentication header\` 怎么办？

**A**:

1. 检查 \`OPENROUTER_API_KEY\` 是否正确。
2. 如果使用火山引擎等兼容接口，必须确保 \`Base URL\` 精确到 \`/v3\` 且不带末尾斜杠，并使用 \`ep-\` 开头的接入点 ID。

## 六、首次运行

1. 在飞书打开机器人对话框。
2. 输入 \`/sethome\` 将当前聊天设为主频道。
3. 发送任意文字测试对话。
    `,
    tags: ["Hermes", "部署", "飞书", "教程"],
    readingTime: 10,
  },
  {
    slug: "hermes-agent-orange-book",
    title: "深度拆解：Hermes Agent 从入门到精通橙皮书",
    date: "2026-04-21",
    excerpt: "Hermes Agent 是 Nous Research 发布的开源自主AI智能体框架，核心特色是「持久化记忆」与「自我进化」能力——它不是又一个 OpenClaw，而是 Harness Engineering 概念的第一次产品化。",
    content: `
> 作者：花叔（公众号「花叔」· B站「AI进化论-花生」）
> 基于 Hermes Agent v0.7.0 编写

## 一句话定位

Hermes Agent 是 Nous Research 发布的**开源自主AI智能体框架**，核心特色是 **「持久化记忆」与「自我进化」能力** ——它不是又一个OpenClaw，而是**Harness Engineering概念的第一次产品化**：从「你给AI造缰绳」变成「AI自己给自己造缰绳」。

## 全书结构：5大板块 · 17章

\`\`\`
Part 1 概念（2章）      → 为什么不是又一个Agent？它是什么？
Part 2 核心机制（4章）   → 学习循环 / 三层记忆 / Skill系统 / 工具与MCP
Part 3 动手搭建（5章）   → 安装配置 / 首次对话 / 多平台 / 自定义Skill / MCP集成
Part 4 实战场景（4章）   → 知识助手 / 开发自动化 / 内容创作 / 多Agent编排
Part 5 深度思考（2章）   → vs OpenClaw/Claude Code / 自改进边界
\`\`\`

---

## Part 1：概念

### 不是又一个Agent：从Harness到Hermes

**核心论点**：2026年初AI编程圈出现共识——瓶颈不是模型，是环境。LangChain团队实验证明，用同一个模型只调整「缰绳」配置，成绩从52.8%涨到66.5%，排名从Top 30跳到Top 5。Mitchell Hashimoto（Terraform创造者）将此命名为 **Harness Engineering**——每次AI犯错就加一条规则，让它永远不再犯同一个错。

**Hermes做了什么**：把Harness Engineering的五个组件全部内建，从手动实现变成自动运行：

| Harness五组件 | 手动实现方式 | Hermes内建系统 |
|--------------|------------|---------------|
| **指令层** | 手写CLAUDE.md / AGENTS.md | Skill系统（markdown文件，自动创建+自改进） |
| **约束层** | 配置hooks / linter / CI | Tool permissions + sandbox + toolset按需启用 |
| **反馈层** | 人工审查 / 评估者Agent | 自改进学习循环（完成后自动复盘优化） |
| **记忆层** | 手动维护knowledge base | 三层记忆（会话/持久/Skill）+ Honcho用户建模 |
| **编排层** | 自己搭多Agent pipeline | 子Agent委派 + cron调度 |

**与OpenClaw的本质区别**：OpenClaw给你配置即行为的系统，记忆功能完善但主要靠人工编写和维护；Hermes把五个维度全部内建，让它们自动运转。

### Hermes Agent全景：60秒看懂

- **发布方**：Nous Research（开源AI研究实验室，以Hermes模型家族闻名）
- **核心Slogan**：The Agent That Grows With You（和你一起成长的Agent）
- **GitHub Stars**：2个月飙到27000+
- **开源协议**：MIT
- **模型自由**：支持200+种模型（OpenAI、Anthropic、Gemini、OpenRouter等）

---

## Part 2：核心机制

### 学习循环：Agent自己给自己造缰绳

这是Hermes最核心的机制——**自改进学习循环**：

\`\`\`
接收任务 → 执行 → 复盘 → 改进Skill → 下次更快更准
\`\`\`

- Agent完成任务后自动复盘
- 识别可优化的环节
- 自动修改或创建Skill文件
- 形成正向循环：用得越多越聪明

### 三层记忆：从金鱼到老友

| 记忆层级 | 作用 | 技术实现 |
|---------|------|---------|
| **会话记忆 (Session Memory)** | 处理当前对话上下文 | 对话历史 |
| **持久记忆 (Persistent Memory)** | 跨会话记住用户偏好、事实和历史交互 | SQLite + FTS5全文检索 |
| **技能记忆 (Skill Memory)** | 从任务执行中萃取成功模式，下次直接调用 | Markdown Skill文件 |

**关键区别**：传统AI助手是「金鱼」（每次对话都失忆），Hermes是「老友」（越用越懂你）。

### Skill系统：会自我进化的能力

- Skill以**Markdown文件**形式存在，可读、可审计、可回滚
- Agent可以**自动创建**新Skill
- Agent可以**自动修改**已有Skill（基于任务复盘）
- 不是黑箱权重，而是透明文本——改了什么，你能看到diff

### 40+工具与MCP：连接一切

- **内置工具**：终端执行、文件操作、网页检索、浏览器自动化、视觉、语音生成等40+
- **MCP协议**：支持Model Context Protocol，可连接任意MCP兼容工具
- **工具权限**：沙箱机制，工具集需显式配置，Agent不能随意获取新权限

---

## Part 3：动手搭建

### 安装与配置：三种方式

- Docker部署（推荐）
- 本地Python安装
- 云端部署

### 第一次对话：让Hermes认识你

- 初始配置向导
- 用户偏好设定
- 记忆系统激活

### 多平台接入：在哪都能找到它

支持接入的平台：
- **通讯**：Telegram、Discord、Slack、WhatsApp、Signal
- **邮件**：IMAP/SMTP
- **智能家居**：Home Assistant
- **关键特性**：跨平台记忆和技能同步共享

### 自定义Skill：教Hermes新技能

- 手动编写Skill文件
- Skill文件格式与结构
- 从任务日志自动生成Skill

### MCP集成：连接你的工具栈

- MCP服务器配置
- 常用MCP工具集成示例
- 自定义MCP工具开发

---

## Part 4：实战场景

### 个人知识助手：跨会话记忆的威力

- 利用持久记忆实现知识积累
- 跨会话上下文衔接
- Honcho用户建模实现个性化

### 开发自动化：代码审查到部署

- 代码审查自动化
- CI/CD流程集成
- 利用Skill记忆固定开发模式

### 内容创作：从调研到成稿

- 调研→大纲→成稿的完整工作流
- Skill记忆写作风格和偏好
- 跨会话持续迭代内容

### 多Agent编排：让三匹马同时跑

- 子Agent委派机制
- cron定时任务调度
- 多Agent协作模式

---

## Part 5：深度思考

### Hermes vs OpenClaw vs Claude Code：不是选择题

| 维度 | Hermes Agent | OpenClaw | Claude Code |
|------|-------------|----------|-------------|
| **核心理念** | 自改进Agent | 配置即行为 | 商业级编程助手 |
| **记忆系统** | 三层自动记忆 | Daily Logs + MEMORY.md + 语义搜索 | 项目上下文理解 |
| **Skill/能力** | 自动创建+自改进 | 人工编写维护Skill生态 | 内建编程能力 |
| **开源** | MIT开源 | 开源 | 闭源 |
| **适用场景** | 重复性结构性工作 | 一次性复杂任务/代码助手 | 专业编程场景 |
| **投资回报** | 随时间递增 | 即时回报 | 订阅制 |

**核心洞察**：Hermes适合有大量重复性工作、希望AI越用越懂你的用户；OpenClaw适合即插即用的一次性任务。

### 自改进Agent的边界：它能走多远

**技术层面受控**：
- Skill文件是可读markdown，不是黑箱
- 记忆数据在本地（SQLite），可查看删除
- 工具权限有沙箱，需显式配置

**实际层面的问题**：
- **审计悖论**：自主Agent的价值在于不用盯着，但安全需要你盯着——你会真的每天去看Agent改了哪些Skill吗？
- **反馈信号天花板**：自改进依赖「判断自己的改进是好是坏」，但「更好」是谁定义的？
- **方向vs效率**：自改进让Agent在已知方向上越跑越快，但方向本身还是得人来定

**开源vs闭源信任问题**：
- 开源（Hermes）：信任自己的审计能力，MIT许可但后果自负
- 闭源（Claude Code）：信任商业动机，有商业压力保证行为可预测

**花叔的核心判断**：

> 自改进Agent是这个领域最让人兴奋的方向，但它的天花板由人的参与程度决定。完全放手不管的自改进Agent，会在效率上赢、在方向上输。最好的状态可能是：**让Agent在「怎么做」上自改进，你只管「做什么」和「别做什么」。**

---

## 核心洞察提炼

### 1. Harness Engineering的第一次产品化

Hermes不是「又一个Agent工具」，它代表了一个范式转变：从手动给AI造缰绳 → AI自己给自己造缰绳。Harness Engineering五组件（指令层/约束层/反馈层/记忆层/编排层）全部内建并自动化。

### 2. Skill系统的双重意义

- **技术意义**：Markdown格式，可读、可审计、可回滚，不是黑箱
- **哲学意义**：Skill记忆是「程序化记忆」——不是记住信息，而是记住「怎么做」。这是从「知识积累」到「能力进化」的质变。

### 3. 自改进的信任困境

技术上受控 ≠ 实际上受控。「你能看到代码」和「你看了代码」是两回事。自改进Agent的真正挑战不在技术，而在**反馈信号的质量**——Agent不知道自己不知道什么。

### 4. 人与Agent的最佳关系

\`\`\`
人管：做什么 + 别做什么（方向与边界）
Agent管：怎么做（执行与优化）
\`\`\`

这是on the loop而不是in the loop——不是审查每一行代码，而是理解整个系统在做什么、为什么这么做。
    `,
    tags: ["AI", "Agent", "Hermes", "开源"],
    readingTime: 15,
  },
  {
    slug: "code-review-assistant-prompt",
    title: "Code Review 助手提示词模板",
    date: "2026-04-21",
    excerpt: "一个用于 AI 辅助代码审查的提示词模板，涵盖可维护性、性能、安全性与健壮性等评估维度。",
    content: `
你现在是一位资深的 **[Java]** 开发工程师和代码审查专家。请帮我评估以下代码的质量，并提供重构建议。

## 背景信息

- **技术栈：** [Java、Spring、Dubbo]

## 评估维度

请从以下几个方面进行极其严格的审查：

### 1. 可维护性

代码结构是否清晰，命名是否语义化，是否过度耦合。

### 2. 性能

是否有不必要的循环、多余的数据库查询或内存消耗。

### 3. 安全性与健壮性

边界条件和异常错误是否被正确捕获和处理。

## 输出格式要求

请按以下结构输出你的反馈：

- **总体评价：** 简短概括这段代码的现状（1-2句话）。
- **Code Review 意见：** 按优先级（🔴 高危 / 🟡 警告 / 🟢 建议优化）列出具体问题，并解释原因。
- **重构演示：** 给出重构后的代码，并用注释标明核心修改点。不要省略原有的核心逻辑。

## 待评估的内容

\`\`\`java
// 在此处粘贴需要评估的代码
\`\`\`
    `,
    tags: ["AI", "代码审查", "提示词"],
    readingTime: 3,
  },
  {
    slug: "obsidian-thino-plugin",
    title: "别让灵感在等待中溜走！这款插件，把 Obsidian 变成了地表的「碎片笔记」王者",
    date: "2026-04-21",
    excerpt: "如果你也是 Obsidian 的重度用户，一定被这个问题困扰过：想要随手记下一句灵感、一段话、或者是当天的开销，非得先打开软件、找到文件夹、新建文档、想个标题……这一套流程下来，灵感早就飞了。",
    content: `
如果你也是 **Obsidian** 的重度用户，一定被这个问题困扰过：

想要随手记下一句灵感、一段话、或者是当天的开销，非得先打开软件、找到文件夹、新建文档、想个标题……这一套流程下来，**灵感早就飞了。**

今天，我要安利一款真正改变 Obsidian 使用节奏的「神仙级」插件——**Thino**。

---

## 什么是 Thino？

简单来说，**Thino** 是一个让 Obsidian 具备「微博/朋友圈」式记录体验的插件。

它不再让你面对冷冰冰的文档列表，而是在 Obsidian 内部提供了一个**极简的瀑布流输入框**。你可以像发动态一样，快速敲下文字，回车即保存。

---

## 为什么它是我心目中的年度最佳插件？

### 1. 碎片化记录的「终极方案」

Thino 的核心逻辑是 **Memo（闪念笔记）**。它将你的每一条记录按时间线排列。不需要纠结放在哪个文件夹，也不需要想标题，你需要做的只有一件事：**输入，然后发送。**

### 2. 强大的「多端同步」潜力

通过配合官方提供的 Web 版本或移动端适配，你可以实现「手机记录，电脑沉淀」。那些散落在微信文件传输助手、备忘录里的废话，终于有了一个统一的归宿。

### 3. 智能日历与回顾

Thino 自带了一个非常直观的日历热力图。

- **按天查看**：哪天高产，哪天偷懒，一目了然。
- **快速回顾**：就像刷朋友圈一样回顾自己的思考历程，这种反馈感真的会上瘾。

### 4. 无缝衔接 Obsidian 生态

Thino 记录的所有内容，本质上依然是 **Markdown**。它支持标签（#Tag）、双链（[[]]），甚至可以直接将某条闪念笔记一键转化为长文章。

---

## 核心功能一览

| 功能模块 | 亮点描述 |
| --- | --- |
| 快速捕获 | 支持置顶输入框，快捷键唤起，丝滑不中断 |
| 多库管理 | 可以自由指定 Thino 数据的存储位置 |
| 多维过滤 | 支持按标签、关键词、日期快速筛选笔记 |
| 精美 UI | 颜值极高，支持多种主题色，强迫症福音 |

---

## 它是如何改变我的工作流的？

在遇到 Thino 之前，我的 Obsidian 是一个巨大的「图书馆」，厚重但难以随时翻开；有了 Thino 之后，它变成了我的「随身笔记本」。

- **早晨**：快速记下今天的 3 个待办事项。
- **午后**：看到一段触动的话，直接复制进来。
- **深夜**：记录一段情绪，或者一个突然蹦出来的项目灵感。

这些碎片化的「砖块」，最终都会通过 Thino 变成我知识大厦的一部分。

---

## 如何获取？

Thino 由国内知名的 Obsidian 社区团队 **PKMer** 开发，对中文语境支持极佳。

1. 在 Obsidian 插件市场搜索 \`Thino\` 即可安装。
2. 更多高级玩法和配套工具，可以访问官方说明文档：https://pkmer.cn/products/thino/

---

**💡 最后聊聊：**

你现在是用什么工具记录碎片的？是发给微信小号，还是记在手机备忘录？欢迎在评论区分享你的笔记流！
    `,
    tags: ["Obsidian", "效率工具", "笔记"],
    readingTime: 5,
  },
  {
    slug: "rocketmq-subscription-inconsistency",
    title: "排查指南：RocketMQ 订阅关系不一致，消息去哪儿了？",
    date: "2026-04-21",
    excerpt: "在分布式系统的日常维护中，RocketMQ作为核心的消息中间件，承载着数据的异步解耦与削峰填谷。你是否遇见过这种现象：明明发了大量消息，后端消费却「漏掉」了一部分？",
    content: `
在分布式系统的日常维护中，RocketMQ作为核心的消息中间件，承载着数据的异步解耦与削峰填谷。

你是否遇见过这种现象：明明发了大量消息，后端消费却「漏掉」了一部分？或者消费进度反复跳跃？

这种情况，往往指向了一个极易被忽略的隐患：**订阅关系不一致（Subscription Inconsistency）**

## 一、现象还原：为什么报错？

在RocketMQ的集群模式下，负载均衡是基于「消费者组（Consumer Group）」来实现的。Broker默认认为：**同一组内的所有实例，其消费逻辑、订阅的主题（Topic）以及过滤规则（Tag）必须完全一致。**

如果组内成员「各执己见」，例如：

- 实例 A 订阅了 Topic_X
- 实例 B 订阅了 Topic_Y

当Broker分配消息时，就会陷入混乱。就像一个快递员把原本属于A的包裹送到了只愿意接受B包裹的收货点，结果只能是拒收或丢弃。

## 二、核心影响：不只是延迟

> **警惕以下风险：**
> - **消息丢失**：部分消息被分配到了未订阅该Topic的实例上，导致消息被「静默丢弃」
> - **消费抖动**：Rebalance（消费负载）频繁触发，导致消费链路极不稳定。
> - **进度倒退**：Offset（消费点位）提交冲突，可能引发重复消费或消费断层。

## 三、深度排查：哪些场景容易「踩坑」？

### 1. 灰度发布陷阱

在应用发布过程中，新旧代码并存。若新版本修改了订阅的Topic或Tag，但保留了相同的Consumer Group，就会造成短暂的不一致。

### 2. 配置项污染

多个微服务或不同的功能模块为了省事，共用了同一个consumerGroup名称。

### 3. 动态订阅逻辑

代码逻辑中根据环境变量动态修改订阅参数，导致集群中不同环境的机器配置偏差。

## 四、避坑指南：如何规范化使用？

### 1. 强一致性原则

确保代码中consumer.subscribe(topic, tag)的参数在全量实例中保持物理一致。

### 2. 消费者隔离

不同的业务逻辑、不同的Topic消费需求，务必申请独立的Consumer Group。不要让不相关的人物混在一个组里。

### 3. 发布规范

涉及到订阅关系变更时，建议采用「先听后发」或者更换Group名称的方式平滑过渡。

\`\`\`java
// 最佳实践示例

DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("CID_UNIQUE_BIZ_GROUP");

consumer.subscribe("TOPIC_CORE_DATA", "*"); // 确保所有节点此处代码一致
\`\`\`

## 结语

保持订阅关系的整洁与统一，是消息队列稳定运行的基础。下次遇到消费「灵异事件」，不妨先检查一下控制台的订阅一致性状态。
    `,
    tags: ["RocketMQ", "中间件", "排查指南"],
    readingTime: 6,
  },
  {
    slug: "how-to-build-a-personal-website",
    title: "如何搭建一个个人网站",
    date: "2026-04-15",
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
    date: "2026-04-10",
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

重构不是一蹴而就的，而是持续进行的小步改进。书中提到的「代码坏味道」清单非常实用。

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
    date: "2026-03-28",
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
