---
title: 深度拆解：Hermes Agent 从入门到精通橙皮书
date: 2026-04-21
excerpt: Hermes Agent 是 Nous Research 发布的开源自主AI智能体框架，核心特色是「持久化记忆」与「自我进化」能力——它不是又一个 OpenClaw，而是 Harness Engineering 概念的第一次产品化。
tags:
  - AI
  - Agent
  - Hermes
  - 开源
readingTime: 15
---

> 作者：花叔（公众号「花叔」· B站「AI进化论-花生」）
> 基于 Hermes Agent v0.7.0 编写

## 一句话定位

Hermes Agent 是 Nous Research 发布的**开源自主AI智能体框架**，核心特色是 **「持久化记忆」与「自我进化」能力** ——它不是又一个OpenClaw，而是**Harness Engineering概念的第一次产品化**：从「你给AI造缰绳」变成「AI自己给自己造缰绳」。

## 全书结构：5大板块 · 17章

```
Part 1 概念（2章）      → 为什么不是又一个Agent？它是什么？
Part 2 核心机制（4章）   → 学习循环 / 三层记忆 / Skill系统 / 工具与MCP
Part 3 动手搭建（5章）   → 安装配置 / 首次对话 / 多平台 / 自定义Skill / MCP集成
Part 4 实战场景（4章）   → 知识助手 / 开发自动化 / 内容创作 / 多Agent编排
Part 5 深度思考（2章）   → vs OpenClaw/Claude Code / 自改进边界
```

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

```
接收任务 → 执行 → 复盘 → 改进Skill → 下次更快更准
```

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

```
人管：做什么 + 别做什么（方向与边界）
Agent管：怎么做（执行与优化）
```

这是on the loop而不是in the loop——不是审查每一行代码，而是理解整个系统在做什么、为什么这么做。
