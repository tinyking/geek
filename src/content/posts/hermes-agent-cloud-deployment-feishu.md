---
title: Hermes Agent 云端部署与飞书集成手册
date: 2026-04-22
excerpt: 本手册指导用户在 Hugging Face Spaces 上部署 Hermes Agent 智能体网关，并集成 OpenRouter（Minimax 模型）与飞书机器人。
tags:
  - Hermes
  - 部署
  - 飞书
  - 教程
readingTime: 10
---

本手册旨在指导用户在 Hugging Face Spaces 上部署 Hermes Agent 智能体网关，并集成 OpenRouter（Minimax 模型）与飞书机器人。

## 一、环境准备

### 1. 账号需求

- **Hugging Face**: 用于托管 Agent 服务。
- **OpenRouter**: 用于调用大模型（推荐 Minimax-M2.5 免费版）。
- **飞书开放平台**: 用于创建机器人交互界面。

### 2. 核心凭证

| 凭证名称 | 获取来源 | 说明 |
|---------|---------|------|
| `OPENROUTER_API_KEY` | OpenRouter.ai | 用于调用大模型 |
| `FEISHU_APP_ID` | 飞书开放平台 | 机器人身份标识 |
| `FEISHU_APP_SECRET` | 飞书开放平台 | 机器人鉴权密钥 |
| `API_SERVER_KEY` | 自定义 | 访问网关的密码（如 `my_secret_key`） |

## 二、容器环境配置 (Dockerfile)

为解决 Python 3.12 兼容性及 `agent.transports` 模块缺失的 Bug，必须使用 Python 3.11 并采取**源码物理植入**方案。

```dockerfile
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
```

## 三、引导脚本 (boot.py)

该脚本负责在容器启动时，将 Secrets 中的变量自动同步至 Hermes 的多重配置路径（`.env` 与 `config.yaml`）。

```python
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
    config_content = f"provider: openrouter\nmodel: {target_model}\nagent:\n  provider: openrouter\n  model: {target_model}"

    # 4. 多路径配置注入 (地毯式覆盖)
    possible_paths = [os.path.expanduser("~/.hermes"), "/app/.hermes"]
    for path in possible_paths:
        os.makedirs(path, exist_ok=True)
        # 写入 .env
        with open(os.path.join(path, ".env"), "w") as f:
            f.write(f"OPENROUTER_API_KEY={or_key}\nAPI_SERVER_KEY={server_key}\n")
            f.write(f"FEISHU_APP_ID={feishu_id}\nFEISHU_APP_SECRET={feishu_secret}\nFEISHU_ENABLED=true\n")
            f.write("API_SERVER_ENABLED=true\nAPI_SERVER_PORT=7860\nAPI_SERVER_HOST=0.0.0.0\nGATEWAY_ALLOW_ALL_USERS=true\n")
        # 写入 config.yaml
        with open(os.path.join(path, "config.yaml"), "w") as f:
            f.write(config_content)

    # 5. 启动网关
    subprocess.run(["hermes", "gateway"])

if __name__ == "__main__":
    main()
```

## 四、飞书端关键设置

### 1. 启用机器人能力

进入飞书开放平台 -> 应用详情 -> **添加应用能力** -> 选择 **「机器人」** -> 点击启用。

### 2. 权限申请 (API 权限)

必须勾选以下权限，否则将无法接收消息或回复：

- `im:message` (读取和发送消息)
- `im:message.p2p_msg:readonly` (单聊消息)
- `im:message:send_as_bot` (以机器人身份发送)

### 3. 事件订阅 (回调地址)

- **请求地址**: `https://[你的Space名称].hf.space/gateway/feishu/events`
- **订阅事件**: 添加「接收消息」事件。

### 4. 版本发布 (极其重要)

所有配置修改后，必须在 **「版本管理与发布」** 中创建一个新版本并申请上线，配置才会生效。

## 五、常见问题排查 (FAQ)

### Q: 为什么飞书端没有输入框？

**A**: 请确认：1. 机器人能力已开启；2. 已创建版本并发布上线；3. 你的账号在应用的「可用范围」内。

### Q: 报错 `No models provided` 怎么办？

**A**: 这是由于配置路径不一致导致。手册中的 `boot.py` 采用了多路径覆盖方案，请确保已点击 Hugging Face 的 **Factory Rebuild** 彻底重置容器。

### Q: 报错 `Missing Authentication header` 怎么办？

**A**:

1. 检查 `OPENROUTER_API_KEY` 是否正确。
2. 如果使用火山引擎等兼容接口，必须确保 `Base URL` 精确到 `/v3` 且不带末尾斜杠，并使用 `ep-` 开头的接入点 ID。

## 六、首次运行

1. 在飞书打开机器人对话框。
2. 输入 `/sethome` 将当前聊天设为主频道。
3. 发送任意文字测试对话。
