---
title: "OpenClaw 免费接入 QQ、微信、Telegram、飞书！无需 API 密钥调用 GPT-5.4"
category: "免费资源"
date: "2026-04-07"
description: "手把手教你用 OpenClaw 接入 QQ、Telegram、飞书等平台，免费调用 GPT-5.4/MiniMax 等大模型，一个 AI 助手服务所有聊天渠道。"
tags: ["免费资源", "OpenClaw", "教程", "AI"]
readTime: "10 min read"
coverText: "AI ASSISTANT"
---

你有没有遇到过这种情况：

- 在公司用**飞书**
- 和朋友用 **QQ**
- 个人事务用 **Telegram**
- 还有一个 **微信**

四个平台四种习惯，但 AI 助手只在一个地方。

好消息是——**OpenClaw 支持同时接入 10+ 个聊天平台**，一个 AI 实例服务所有渠道。

---

## 为什么选择 OpenClaw？

- **完全免费**：开源项目，无需付费
- **多平台统一**：QQ、Telegram、飞书、微信、企业微信等
- **无需 API 密钥**：可调用免费模型（如 MiniMax、DeepSeek 等）
- **本地运行**：个人电脑即可部署
- **支持 GPT-5.4**：配置简单，模型切换灵活

---

## 准备工作

在开始之前，确保你已经：

1. 安装了 OpenClaw
2. OpenClaw Gateway 正在运行
3. 配置了 AI 模型

还没安装？一行命令搞定：

- **macOS / Linux**：
```bash
curl -fsSL https://clawd.org.cn/install.sh | bash
Windows (PowerShell)：
iwr -useb https://clawd.org.cn/install.ps1 | iex
安装后运行引导向导：
openclaw onboard --install-daemon
第一站：Telegram Bot（最简单，5 分钟）
步骤 1：创建 Bot
打开 Telegram，搜索 @BotFather
发送 /newbot
按提示输入 Bot 名字和用户名
复制 Bot Token（格式：123456789:ABCdefGhIjKlMn...）
步骤 2：获取用户 ID
给 @userinfobot 发任意消息，它会回复你的数字 ID。

步骤 3：配置 OpenClaw
openclaw config set channels.telegram.botToken "你的Bot Token"
openclaw config set channels.telegram.allowedUsers '["你的用户ID"]'
或直接编辑配置文件 ~/.openclaw/openclaw.json：
{
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "123456789:ABCdefGhIjKlMnOpQrStUvWxYz",
      "dmPolicy": "allowlist",
      "allowedUsers": ["7235080851"],
      "streamMode": "partial",
      "dmHistoryLimit": 20
    }
  }
}
步骤 4：重启并测试
openclaw gateway restart
给 Bot 发消息测试！
第二站：飞书 / Lark Bot（10 分钟）
步骤 1：创建飞书应用
访问 飞书开放平台
点击「创建企业自建应用」
填写应用名称和描述
在「凭证与基础信息」页面，记下 App ID 和 App Secret
步骤 2：配置权限
在飞书开放平台的「权限管理」中，开启以下权限：

im:message:receive — 接收消息
im:message:send — 发送消息
im:chat:readonly — 读取群信息
im:resource — 发送文件/图片
步骤 3：启用机器人
在「应用功能」→「机器人」中，开启机器人功能。

步骤 4：配置 OpenClaw
openclaw config set channels.feishu.appId "cli_a5xxxxxxxxxx"
openclaw config set channels.feishu.appSecret "dxxxxxxxxxxxxxxxxxxxxxxxx"
openclaw config set channels.feishu.botName "我的AI助手"
步骤 5：选择连接模式
推荐使用 WebSocket 模式——不需要公网 IP，家里的 Mac mini 就能用。

步骤 6：发布应用
回到飞书开放平台，点击「版本管理与发布」→「创建版本」→「申请发布」。

企业内部应用通常秒过审核。

步骤 7：重启并测试
openclaw gateway restart
在飞书中搜索你的 Bot 名字，发消息测试。
第三站：QQ 机器人（15 分钟）
QQ 机器人需要一个中间层桥接协议，目前最成熟的方案是 NapCat（OneBot v11 协议）。

架构
QQ App ←→ NapCat (OneBot v11) ←WebSocket→ OpenClaw QQ 插件
步骤 1：安装 NapCat
方法一：Docker（推荐）
docker run -d --name napcat \
  -p 3001:3001 \
  -e ACCOUNT=你的QQ号 \
  mlikiowa/napcat-docker:latest
启动后用手机 QQ 扫码登录。

步骤 2：安装 OpenClaw QQ 插件
openclaw skill install openclaw-qq-plugin
步骤 3：配置 OpenClaw
编辑 ~/.openclaw/openclaw.json：
{
  "plugins": {
    "entries": {
      "openclaw-qq-plugin": {
        "napcatWs": "ws://127.0.0.1:3001",
        "napcatToken": "",
        "botQQ": "你的BotQQ号",
        "allowedUsers": ["好友QQ号1", "好友QQ号2"],
        "allowedGroups": ["群号1", "群号2"],
        "groupMention": true,
        "replyQuote": true
      }
    }
  }
}
步骤 4：重启并测试
openclaw gateway restart
给 Bot QQ 号发消息测试。
进阶：让 AI 帮你配置
如果你觉得手动编辑 JSON 太麻烦，可以让 AI 帮你配置：
我要配置 OpenClaw 同时接入 Telegram、飞书和 QQ。
Telegram Bot Token 是 xxx
飞书 App ID 是 xxx，App Secret 是 xxx
NapCat 运行在 ws://127.0.0.1:3001，Bot QQ 号是 xxx
请直接编辑 ~/.openclaw/openclaw.json 配置好所有渠道，
然后重启 gateway。
AI 会自动帮你完成所有配置。
安全最佳实践
多渠道接入意味着攻击面更大，请务必：

使用 allowlist 策略，只允许指定用户/群组使用 Bot
不要用 open 策略，除非你确定只有信任的人能联系到 Bot
定期更换 Token（Telegram Bot Token 可通过 BotFather /revoke 重置）
启用 exec 审批，防止 AI 执行危险命令
常见问题
Q：Bot 在 Telegram 回复但飞书不回复？
检查飞书应用是否已发布。开发中的应用只有管理员能用。

Q：QQ 机器人频繁掉线？
NapCat 登录态可能过期，建议用 Docker 版本并配置自动重连。

Q：多个渠道收到的消息会冲突吗？
不会。每个渠道有独立的会话上下文。如果使用了 LanceDB 记忆插件，长期记忆是跨渠道共享的。

总结
一个 AI 助手，四个入口。

在公司用飞书问它项目进度，回家路上用 Telegram 让它查资料，躺在床上用 QQ 让它帮你写代码——你的 AI 助手不应该被困在一个 App 里。

还没安装 OpenClaw？

OpenClaw 官方文档
OpenClaw GitHub
OpenClaw 中文社区
参考来源
OpenClaw 多平台机器人配置完全教程
OpenClaw 中文社区入门指南
OpenClaw GitHub 仓库
