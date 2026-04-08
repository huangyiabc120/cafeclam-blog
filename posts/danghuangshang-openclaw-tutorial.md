---
title: "当皇上 × OpenClaw：三省六部皆AI，一行命令起王朝"
description: "以明朝内阁制为蓝本，用 OpenClaw 框架构建的多 Agent 协作系统。一台服务器 + OpenClaw = 一支 7×24 在线的 AI 朝廷。司礼监接旨、内阁优化 Prompt、六部各司其职、都察院自动审查代码。"
date: "2026-04-09"
tags:
  - OpenClaw
  - AI Agent
  - 多Agent协作
  - 自动化
  - 教程
---

# 当皇上 × OpenClaw：三省六部皆AI，一行命令起王朝

### 一行命令起王朝，三省六部皆AI。千里之外调百官，万事不劳御驾亲。

> 以明朝内阁制为蓝本，用 [OpenClaw](https://github.com/openclaw/openclaw) 框架构建的多 Agent 协作系统。
> 一台服务器 + OpenClaw = 一支 7×24 在线的 AI 朝廷。

**AI 朝廷**是一个开箱即用的多 Agent 协作系统。你是皇帝，AI 是你的大臣。在 Discord 或飞书 @某个 Agent，大臣们就会立刻执行。司礼监接旨、内阁优化 Prompt、六部各司其职、都察院自动审查代码。**管理 AI 团队的高效模版。**

---

## 🚀 快速开始

> 🔴 **新手请用云服务器**，不要在个人电脑上安装。

### 1️⃣ 选择制度

安装时可选择三种制度：

| 制度 | 特点 | 适用场景 | Agent |
|------|------|---------|-------|
| **明朝内阁制** | 司礼监 + 内阁 + 六部，快速迭代 | 个人项目 | 18 个 |
| **唐朝三省制** | 中书→门下→尚书，制衡审核 | 偏好严谨流程的项目 | 14 个 |
| **现代企业制** | CEO/CTO/CFO，国际化 | 创业团队 | 14 个 |

### 2️⃣ 一键安装

**方式一：本地安装（推荐）**
```bash
git clone https://github.com/wanikua/danghuangshang.git
cd danghuangshang
bash scripts/full-install.sh
```

**方式二：远程一键安装**

Linux / macOS:
```bash
bash <(curl -fsSL https://raw.githubusercontent.com/wanikua/danghuangshang/main/scripts/full-install.sh)
```

Windows (PowerShell):
```powershell
powershell -ExecutionPolicy Bypass -File (New-Object Net.WebClient).DownloadString('https://raw.githubusercontent.com/wanikua/danghuangshang/main/install.ps1')
```

**方式三：已有 OpenClaw？精简版**
```bash
bash <(curl -fsSL https://raw.githubusercontent.com/wanikua/danghuangshang/main/install-lite.sh)
```

### 3️⃣ 配置 + 启动

1. 按提示填入 LLM API Key + Discord Bot Token
2. `openclaw gateway start`
3. 在 Discord @你的 Bot 说话 — 完成！

---

## 🏛️ 朝廷架构

本项目提供 **三种制度** 供选择，各有侧重：

| 制度 | 特点 | 流程 |
|------|------|------|
| **明朝内阁制**（默认） | 司礼监 + 内阁二元调度 | 司礼监接旨 → 内阁优化 → 六部执行 |
| **唐朝三省制** | 三权分立、互相制衡 | 中书起草 → 门下审核 → 尚书执行 |
| **现代企业制** | 扁平管理、英文沟通 | CEO 决策 → Board 审议 → CxO 执行 |

### 明朝内阁制流程

```
皇帝（你）下旨
  ▼
司礼监（大内总管）── 接旨
  │
  ├─→ 内阁（首辅）── Prompt 增强：理解意图、引导追问、生成执行计划
  │ ←─┘ 返回优化后的 Prompt + Plan
  │
  ├─→ @兵部 @户部 @礼部 …（按 Plan 派发）
  │
  └─→ 都察院 ── 代码 push 到 GitHub 时自动审查
       └─→ ✅ 通过 / ❌ 打回修改
```

### 完整机构表

| 机构 | 角色 | 在本项目中 |
|------|------|-----------|
| **司礼监** | 大内总管 | 接旨 → 送内阁优化 → 派发六部 |
| **内阁** | 首辅大学士 | Prompt 增强、追问、生成计划、重大决策审议 |
| **都察院** | 左都御史 | GitHub push 自动代码审查 |
| **兵部** | 尚书 | 软件工程：编码、架构、Bug 调试 |
| **户部** | 尚书 | 财务运营：成本分析、预算管控 |
| **礼部** | 尚书 | 品牌营销：文案、社媒运营 |
| **工部** | 尚书 | 运维：DevOps、CI/CD |
| **吏部** | 尚书 | 项目管理、团队协调 |
| **刑部** | 尚书 | 法务合规、知识产权 |

### 与明朝制度的映射

| 明朝 | 本项目 |
|------|--------|
| 皇帝下旨 → 司礼监批红 | 用户 @司礼监 → 接旨调度 |
| 内阁票拟（起草方案） | 内阁 Prompt 增强 + Plan |
| 司礼监代批（下发执行） | 用优化后 Prompt 派发六部 |
| 都察院纠劾百官 | GitHub push 自动审查 |
| 内阁封驳权 | 内阁可否决不合理方案 |

---

## ⚙️ 核心能力

| 能力 | 说明 |
|------|------|
| **多 Agent 协作** | 18+ 独立 Bot，@谁谁回复，@everyone 全员响应 |
| **内阁前置优化** | 用户指令自动经内阁 Prompt 增强后再派发 |
| **都察院自动审查** | 代码 push 到 GitHub 自动触发代码审查 |
| **独立记忆** | 每个 Agent 独立工作区 + memory，越用越懂你 |
| **60+ Skill** | GitHub、Notion、浏览器、Cron、TTS…… |
| **定时任务** | 自动写日报/周报、健康检查、代码备份 |
| **沙箱隔离** | Docker 容器隔离，Agent 代码执行互不干扰 |
| **多平台** | Discord / 飞书 / Slack / Telegram / WebUI |

### 60+ 内置 Skill

| 类别 | Skill |
|------|-------|
| 开发 | GitHub（Issue/PR/CI）、Coding Agent |
| 文档 | Notion（数据库/页面/自动汇报） |
| 信息 | 浏览器自动化、Web 搜索、Web 抓取 |
| 自动化 | Cron 定时任务、心跳自检 |
| 媒体 | TTS 语音、截图、视频帧提取 |
| 运维 | tmux 远程控制、Shell 命令执行 |
| 通信 | Discord、Slack、飞书、Telegram… |
| 扩展 | OpenClaw Hub 社区 Skill |

---

## 🔄 切换制度

**本地安装：**
```bash
bash scripts/switch-regime.sh tang-sansheng  # 唐朝三省制
bash scripts/switch-regime.sh modern-ceo     # 现代企业制
bash scripts/switch-regime.sh ming-neige     # 明朝内阁制
```

**远程安装：**
```bash
bash <(curl -fsSL https://raw.githubusercontent.com/wanikua/danghuangshang/main/scripts/switch-regime.sh)
```

---

## ⚠️ Discord 多 Bot 安全配置（必读）

**默认配置已安全**：新版安装脚本已设置 `"allowBots": "mentions"`，Bot 只在被 @ 时响应其他 Bot，避免消息循环。

如果你使用旧版配置，请确保 Discord 配置中有：
```json
"discord": {
  "allowBots": "mentions"  // ✅ 只响应被 @ 的 Bot
}
```

**⚠️ 禁止使用 `"allowBots": true`** — 会导致 Bot 互相触发，引发消息风暴！

---

## 🧠 记忆备份

Agent 的记忆是长期积累的资产，丢失不可逆。内置备份脚本，一行命令守护所有 Agent 记忆。

```bash
# 立即备份
bash scripts/memory-backup.sh

# 查看现有备份
bash scripts/memory-backup.sh -l

# 从备份恢复
bash scripts/memory-backup.sh -s daily/2026-03-15.tar.gz
```

---

## 📦 更多

- 🖥️ **GUI 管理界面** — React + TypeScript + Vite，内置仪表盘、会话管理、Cron 可视化
- 📱 **接入飞书** — WebSocket 长连接，无需公网 IP
- 📝 **接入 Notion** — 自动写日报周报
- 🏥 **配置诊断** — `openclaw doctor` 或诊断脚本

---

*项目来源：[wanikua/danghuangshang](https://github.com/wanikua/danghuangshang) | MIT License*
