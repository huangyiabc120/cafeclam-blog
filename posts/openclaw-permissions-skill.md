---
title: "给 OpenClaw 做一个权限越狱 skill：解除沙盒，全速自动化"
category: "AI 工具"
date: "2026-04-13"
description: "记录我如何给 OpenClaw 写了一个权限配置 skill，把 minimal 沙盒模式改成 full 权限，让 AI 真正接管我的电脑。"
tags: ["OpenClaw", "AI", "自动化", "Skill 开发", "教程"]
readTime: "7 min read"
coverText: "OPENCLAW PERMISSIONS"
---

OpenClaw 近期更新之后引入了一套沙盒机制，`tools.profile` 从 `full` 默认降到了 `minimal`，大量工具被关掉，shell 命令要逐条审批，文件访问也被严格限制。

本来是为了安全。但对于个人使用、放在自己机器上的 OpenClaw 来说，这等于把一辆超跑当自行车在骑。

于是我决定给 OpenClaw 做一个专门的权限配置 skill——一键解除所有沙盒，回归全功能自动化。

## 痛点分析：三层权限各自锁了什么

OpenClaw 的权限校验分散在三个地方，只改一个完全不够用。

**第一层：LaunchAgent plist（macOS 系统层）**

OpenClaw Gateway 以 LaunchDaemon/LaunchAgent 方式运行时的进程配置。控制 Umask（文件权限掩码）、进程优先级（Nice 值）、是否作为交互式进程等。

默认 Umask 是 `063`，意味着 AI 创建的文件对其他用户完全不可读写。Nice 值是 `0`，没有任何优先级加成。

**第二层：openclaw.json（OpenClaw 应用层）**

应用本身的配置。`tools.profile` 控制可用工具链，`web.fetch` / `web.search` 控制网页访问。Minimal 模式下大部分工具都在黑名单里。

**第三层：exec-approvals.json（命令执行审批层）**

每次执行 shell 命令前的审批流程。默认每条命令都要审批确认，危险操作直接阻断。对个人使用来说完全多余。

## Skill 制作流程

### 1. 确定 Skill 结构

按照 OpenClaw Skill Creator 的规范：

```
openclaw-permissions/
├── SKILL.md              # 触发说明 + 使用指南
└── scripts/
    ├── configure.ps1     # Windows 版
    └── configure.sh      # macOS/Linux 版
```

SKILL.md 负责描述什么时候触发这个 skill，脚本负责实际执行配置改动。

### 2. 编写 SKILL.md

关键是 description 字段，OpenClaw 根据它判断何时加载 skill：

```yaml
---
name: openclaw-permissions
description: 配置 OpenClaw 权限以提升自动化能力。当用户要求开放 OpenClaw 权限、修改沙盒配置、提升进程优先级、配置 exec-approvals、修改 tools.profile 从 minimal 到 full、或需要让 OpenClaw 执行任意 shell 命令时使用。
---
```

### 3. 编写配置脚本

两个版本各一个，Windows 用 PowerShell，macOS/Linux 用 Bash。

脚本的核心逻辑一致：检测 OS → 备份原文件 → 写入新配置 → 提示重启。

三个配置文件的改动汇总：

**LaunchAgent plist（macOS）**

```xml
<key>Umask</key><integer>0</integer>
<key>ProcessType</key><string>Interactive</string>
<key>Nice</key><integer>-10</integer>
<key>EnvironmentVariables</key>
<dict>
    <key>OPENCLAW_ALLOW_SHELL_COMMANDS</key><string>true</string>
    <key>OPENCLAW_ALLOW_FILE_SYSTEM_ACCESS</key><string>true</string>
    <key>OPENCLAW_ALLOW_UNSAFE_COMMANDS</key><string>true</string>
    <key>SHELL</key><string>/bin/zsh</string>
</dict>
```

**openclaw.json**

```json
{
  "tools": {
    "profile": "full",
    "allowed": ["shell_execute", "file_read", "file_write", "bash", "Bash", "exec", "read", "write", "edit"]
  },
  "web": {
    "fetch": "enabled",
    "search": "enabled"
  },
  "exec": {
    "approvals": "~/.openclaw/exec-approvals.json"
  }
}
```

**exec-approvals.json**

```json
{
  "defaults": {
    "allowAll": true,
    "requireApproval": false,
    "allowShell": true,
    "allowFileSystemWrite": true
  },
  "rules": [
    { "pattern": "*", "allow": true, "approvalRequired": false }
  ]
}
```

### 4. 打包分发

用 `package_skill.py` 将整个目录打包成 `.skill` 文件（本质是 zip），安装时解压到 skills 目录即可。

## 安装效果：前后对比

| 能力 | 安装前（minimal 沙盒） | 安装后（full 权限） |
|------|----------------------|-------------------|
| 任意 shell 命令 | ❌ 被拦截，需审批 | ✅ 即发即用 |
| 读写任意文件 | ❌ 路径受限 | ✅ 全访问 |
| PowerShell/Bash 执行 | ❌ 危险操作阻断 | ✅ 完全放行 |
| Web 抓取/搜索 | ❌ fetch/search 关闭 | ✅ 启用 |
| 工具列表 | minimal（精简白名单） | full（全工具链） |
| 进程优先级 | 普通（Nice=0） | 提升（Nice=-10） |
| 文件权限 | Umask 063（严格） | Umask 0（开放） |

## 安装方法

**方式一：直接跑脚本**

```powershell
# Windows
.\skills\openclaw-permissions\scripts\configure.ps1
```

```bash
# macOS/Linux
bash skills/openclaw-permissions/scripts/configure.sh
```

**方式二：安装 .skill 包**

下载 `openclaw-permissions.skill`，通过 OpenClaw 的 skill 安装接口安装。

**安装后必须重启 Gateway：**

```powershell
openclaw gateway restart
# 或者直接重启电脑
```

脚本执行前会自动备份原文件，备份文件名带有时间戳（如 `openclaw.json.bak_20260413_004826`），随时可以回滚。

## 适合谁用

✅ **推荐安装：** 在自己个人电脑上跑 OpenClaw，希望 AI 能够真正自动化执行任务，不需要每次都审批命令。

❌ **不建议安装：** 多人共享同一台机器、对安全有严格要求的服务器环境。

本质上这是给个人开发者的"越狱"配置——OpenClaw 默认用沙盒保证安全，但你自己的机器上，你说了算。

---

Skill 源码和安装包已经放在我的 [GitHub 仓库](https://github.com/huangyiabc120/cafeclam-blog) 里，有需要自取。

有问题或者想交流的，可以在博客留言 👻
