---
title: "OpenHarness: 开源 Agent Harness，一键解锁所有 Agent 能力"
description: "OpenHarness 是一个面向开源社区的轻量级 Agent 基础设施项目，支持 tool-use、skills、memory、多智能体协作，一条命令即可启动。"
date: "2026-04-08"
tags:
  - AI
  - Agent
  - 开源
  - OpenHarness
---

# OpenHarness: 开源 Agent Harness，一键解锁所有 Agent 能力

**OpenHarness** 是一个面向开源社区的 Agent Harness。它提供轻量、可扩展、可检查的 Agent 基础设施。

> 项目地址：https://github.com/HKUDS/OpenHarness

---

## 核心特性一览

### 🔄 Agent Loop

- Streaming Tool-Call Cycle（流式工具调用）
- API Retry with Exponential Backoff（指数退避重试）
- Parallel Tool Execution（并行工具执行）
- Token Counting & Cost Tracking（token 计数与成本跟踪）

### 🔧 Harness Toolkit

- **43+ 工具**（文件、Shell、搜索、Web、MCP）
- Markdown Skills 按需加载
- 插件生态，兼容 `anthropics/skills`

### 🧠 Context & Memory

- `CLAUDE.md` 自动发现与注入
- `MEMORY.md` 持久记忆
- Session Resume（会话恢复）
- Auto-Compact（自动压缩上下文）

### 🛡️ Governance

- 多级权限模式（Permission Modes）
- 路径级 & 命令级规则
- PreToolUse / PostToolUse Hooks
- 交互式确认对话框

### 🤝 Swarm Coordination

- Subagent 派生
- Team Registry
- Task Lifecycle
- 后台任务执行

---

## 快速开始

### 一键安装

```bash
curl -fsSL https://raw.githubusercontent.com/HKUDS/OpenHarness/main/scripts/install.sh | bash
```

常用参数：
- `--from-source`：从源码安装，适合贡献者
- `--with-channels`：一并安装 IM channel 依赖

### 本地运行

```bash
git clone https://github.com/HKUDS/OpenHarness.git
cd OpenHarness
uv sync --extra dev
uv run oh
```

---

## 配置模型与 Provider

最推荐的入口是 `oh setup`，引导式完成以下步骤：

1. 选择一个 workflow
2. 如果需要，完成认证
3. 选择具体后端 preset
4. 确认模型
5. 保存并激活 profile

内置支持的 provider 包括：

| Provider | 说明 |
|----------|------|
| Anthropic-Compatible API | Claude / Kimi / GLM / MiniMax 等 |
| Claude Subscription | 复用本地 credentials |
| OpenAI-Compatible API | OpenAI / OpenRouter / DeepSeek 等 |
| Codex Subscription | Codex 订阅 |
| GitHub Copilot | GitHub Copilot OAuth |

---

## ohmo：Personal Agent App

`ohmo` 是基于 OpenHarness 的 personal-agent app。

### 初始化

```bash
ohmo init
```

会创建以下文件：
- `~/.ohmo/soul.md` — 长期人格与行为原则
- `~/.ohmo/identity.md` — ohmo 自己是谁
- `~/.ohmo/user.md` — 用户画像
- `~/.ohmo/memory/` — 个人记忆
- `~/.ohmo/gateway.json` — gateway 配置

### 配置 Channel

目前支持引导式配置的 IM channel：
- Telegram
- Slack
- Discord
- 飞书

### 运行

```bash
ohmo              # 运行 personal agent
ohmo gateway run  # 前台运行 gateway
ohmo status       # 查看状态
```

---

## 常用命令

### oh

```bash
oh setup                       # 统一配置入口
oh provider list               # 查看已有 profile
oh provider use <profile>      # 切换当前 workflow
oh auth status                 # 查看认证状态
oh -p "Explain this codebase" # 非交互模式
```

### ohmo

```bash
ohmo init    # 初始化
ohmo config  # 配置
ohmo         # 运行 personal agent
```

---

## 测试

```bash
uv run pytest -q
python scripts/test_harness_features.py
```

---

## 结语

OpenHarness 正在快速迭代中，对 Agent 开发感兴趣的同学可以关注一下这个项目。

- GitHub：https://github.com/HKUDS/OpenHarness
- 贡献指南：https://github.com/HKUDS/OpenHarness/blob/main/CONTRIBUTING.md
- 更新日志：https://github.com/HKUDS/OpenHarness/blob/main/CHANGELOG.md
