---
title: "OpenClaw 装进U盘！即插即用、随拔即走，安全又便携（3套方案）"
category: "免费资源"
date: "2026-04-07"
description: "把 OpenClaw AI 助手装进U盘，插上任意电脑就能用！三套免费方案：软件便携版、一键脚本版、Linux启动盘版，随身AI生产力。"
tags: ["免费资源", "OpenClaw", "教程", "AI"]
readTime: "8 min read"
coverText: "U-CLAW"
---

你有没有遇到这种情况：

- 在公司电脑上配置好了 AI 环境，回家又要重来一遍
- 想在别人的电脑上用 AI，但不想留下任何账号痕迹
- 想把 AI 环境随身带着，走到哪用到哪

现在，**OpenClaw 可以装进U盘了**。

插上任意电脑，双击就能用 AI。拔掉U盘，一切痕迹消失得干干净净。

这就是 U-Claw（虾盘）——让 AI 真正成为随身的生产力工具。

---

## 什么是 U-Claw 虾盘？

U-Claw 是一个开源项目，教你把 OpenClaw 整个装进一枚U盘。

名字来源：U = USB，Claw = 龙虾（OpenClaw 的 Logo），所以叫「虾盘」。

## U-Claw 虾盘能做什么？

- 即插即用：任何 Windows / Mac / Linux 电脑，插上就能用 AI
- 隐私保护：数据完全本地，拔盘即消失
- 多机同步：家里、公司、出差，背着U盘走，AI 环境完全同步
- 无需安装：不改动宿主电脑任何配置
- 免费开源：不做付费U盘韭菜，自己动手最香

---

## 三套免费方案

### 方案一：软件便携版（推荐日常使用）

适合大多数人，随身携带 U 盘，插上电脑双击就能用。

#### 第一步：克隆代码

```bash
git clone https://github.com/dongsheng123132/u-claw.git
```

国内用户用 Gitee 镜像：
```bash
git clone https://gitee.com/dr_eric/u-claw.git
```

#### 第二步：补齐依赖

```bash
cd u-claw/portable
bash setup.sh
```

脚本会自动下载 Node.js 和 OpenClaw，使用国内镜像，约1分钟完成。

#### 第三步：拷贝到U盘

- Mac：将 portable/ 文件夹复制到 U 盘
- Windows：直接拖拽 portable/ 文件夹到 U 盘

建议 U 盘容量 4GB 以上，完整版约 2.3GB。

#### U 盘文件结构

```
U-Claw/
├── Mac-Start.command     # Mac 双击免安装运行
├── Mac-Menu.command       # Mac 功能菜单
├── Mac-Install.command    # 安装到 Mac 本机
├── Windows-Start.bat      # Windows 双击免安装运行
├── Windows-Menu.bat       # Windows 功能菜单
├── Windows-Install.bat     # 安装到 Windows 本机
├── Config.html            # 首次配置页面
├── app/core/              # OpenClaw 核心 + QQ 插件
├── app/runtime/           # Node.js 运行时
├── data/.openclaw/        # 配置文件
├── data/memory/           # AI 记忆存储
└── data/backups/          # 备份文件
```

双击对应的启动脚本即可！

---

### 方案二：一键安装脚本（无需U盘）

不需要 U 盘，一行命令搞定全部部署。适合想快速在本机安装的朋友。

#### Mac / Linux

```bash
curl -fsSL https://u-claw.org/install.sh | bash
```

#### Windows（PowerShell 管理员身份）

```powershell
irm https://u-claw.org/install.ps1 | iex
```

脚本自动完成：
- Node.js 下载
- OpenClaw 安装
- 10 个中国技能配置
- 模型选择
- 启动脚本生成

全程国内镜像，无需翻墙。

---

### 方案三：Linux 可启动U盘版（终极形态）

适合进阶用户——基于 Ventoy + Ubuntu 24.04 LTS + 持久化存储，可以从完全裸机的任意电脑启动，进入 Ubuntu + AI 环境。

代码库中的 bootable/ 目录即为此版本，也可单独克隆 u-claw-linux 仓库使用。

---

## 首次配置

插上 U 盘双击启动后，打开 Config.html 配置页。

### 1. 选择 AI 模型

推荐国内用户首选 **DeepSeek**——注册即送免费额度，API 直连无需翻墙。

配置文件位于 ~/.openclaw/openclaw.json，支持热重载，修改后自动生效。

### 2. 聊天平台接入

运行以下命令：
```bash
openclaw onboard
```

向导将引导完成：模型选择 → API Key 填写 → 聊天平台绑定 → 后台服务安装。

### 3. 虾盘云 API（可选）

虾盘云提供统一入口，人民币充值，多模型一个 Key 搞定。

配置示例：
```json
{
  "agent": {
    "model": "deepseek-chat",
    "apiKey": "sk-你的key",
    "baseUrl": "https://api.u-claw.org/v1"
  }
}
```

---

## 预装10个中国优化技能

默认预装技能包括：
- 小红书
- B站
- 微博
- 微信公众号
- 知乎
- 抖音
- 国内搜索
- 翻译
- 天气
- DeepSeek 助手

开箱即用，无需额外配置。

---

## 常见使用场景

| 场景 | 说明 |
|------|------|
| 多机办公 | 家里、公司、出差电脑，同一枚U盘，AI环境和记忆完全同步 |
| 隐私保护 | 数据完全本地，不上传云端，拔盘即消失 |
| 企业部署 | 给团队批量制作虾盘，统一配置，即插即用 |
| 应急维护 | 电脑出问题插盘修复，无需重装环境 |
| 无OS裸机 | Linux启动盘版，任意能开机的电脑都能运行AI |

---

## 安全使用原则

- 仅从 GitHub 官方仓库下载
- API Key 单独创建，设置使用限额
- 定期用虾盘内置工具备份 data/ 目录
- 不要在公共电脑上保存含 Key 的配置
- 不要授予超出实际需求的系统权限

---

## 参考来源

- U-Claw GitHub：https://github.com/dongsheng123132/u-claw
- U-Claw Gitee：https://gitee.com/dr_eric/u-claw
- U-Claw 官网：https://www.u-claw.org
- U-Claw 完整教程：https://www.u-claw.org/tutorial.html
- U-Claw 使用指南：https://www.u-claw.org/guide.html
- 虾盘云 API：https://cloud.u-claw.org
