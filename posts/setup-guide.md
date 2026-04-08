---
title: "咖啡蛤蜊 · 高级功能配置指南"
description: "博客已接入四大功能，部分需要手动配置。以下是详细步骤。"
date: "2026-04-07"
---

# 咖啡蛤蜊 · 高级功能配置指南

博客已接入四大功能，部分需要手动配置。以下是详细步骤。

---

## 一、评论区（Giscus）⏱ 约10分钟

Giscus 是一个基于 GitHub Discussions 的评论系统，免费、无广告、数据自持。

### 第一步：安装 Giscus GitHub App

1. 打开 **https://github.com/apps/giscus**（或搜索 "giscus github app"）
2. 点击 **Install**
3. 选择授权范围：
   - ✅ 选择仓库 → 选择 `huangyiabc120/cafeclam-blog`
   - ✅ 所有仓库（方便以后其他项目也用）
4. 点击 **Install & Authorize**

### 第二步：开启 GitHub Discussions

评论系统依赖 Discussions 功能，需要先开启：

1. 进入仓库 **https://github.com/huangyiabc120/cafeclam-blog**
2. 点击 **Settings**（在顶部菜单）
3. 左侧菜单找到 **General**，往下滚
4. 找到 **Features → Discussions**（勾选它 ✅）
5. 点击 **Enable discussions**

### 第三步：获取 Giscus 配置参数

1. 打开 **https://giscus.app**
2. 在表单里填写：
| 字段 | 填写内容 |
|------|---------|
| **GitHub Repository** | `huangyiabc120/cafeclam-blog` |
| **Page ↔️ Discussion Mapping** | `Page pathname` |
| **Discussion Category** | 点击 **+** 创建一个分类，建议叫「评论区」，类型选 **Open** |
| **Features** | 全部勾选（💬 Reactions、✅ Fixed sidebar）|
| **Theme** | 选择 `Light` 或 `Preferred color scheme`（跟随博客深色模式）|

3. 滚动到最下方，找到 **script** 部分
4. 找到 `data-repo-id` 和 `data-category-id` 两行，**复制冒号后面那串 ID**
   - 例如：`data-repo-id="R_kgDOXXXXXXXX"` 复制 `R_kgDOXXXXXXXX`
   - `data-category-id="DIC_xxxxxxxxxxxxxxxx"` 复制 `DIC_xxxxxxxxxxxxxxxx`

### 第四步：告诉你的 AI 助手

把这两个 ID 发给我，我帮你填进代码里：
```
data-repo-id: R_kgDOXXXXXXXX
data-category-id: DIC_xxxxxxxxxxxxxxxx
```

---

## 二、邮件订阅（Buttondown）⏱ 约10分钟

Buttondown 是一个极简邮件服务，免费支持100 订阅者，发送 newsletter 很方便。

### 注册 Buttondown

1. 打开 **https://buttondown.email**（用 GitHub 账号登录）
2. 点击 **Sign up → Continue with GitHub**
3. 授权后进入仪表盘

### 获取 API Token

1. 点击右上角 **Settings**（齿轮图标）
2. 左侧菜单找到 **Developer**
3. 看到 **API Token** 一行，点击 **Show**，复制 token
4. 你的用户名在 URL 里，比如 `buttondown.email/你的用户名`

### 订阅表单 URL

订阅表单的 `action` 地址格式是：

```
https://buttondown.email/你的用户名?embed=1
```

所以你需要把 `components/SubscriptionForm.jsx` 里的这行：
```javascript
// TODO: 替换为你的 Buttondown API Token
const res = await fetch('https://buttondown.email/api/emails/embed-subscribe/YOUR_USERNAME', {
```

改成：
```javascript
const res = await fetch('https://buttondown.email/api/emails/embed-subscribe/你的用户名', {
```

### 测试订阅

1. 打开博客任意文章
2. 滚动到底部，找到「订阅更新」表单
3. 输入你的邮箱，点击订阅
4. 去邮箱里点验证链接，完成订阅

---

## 三、阅读量统计（无需配置，已就绪 ✅）

阅读量统计用的是 [CountAPI](https://countapi.xyz)，无需注册，直接可用。
数据存储在云端，读者每打开一篇文章自动计数。

---

## 四、Plausible Analytics（无需配置，已就绪 ✅）

**https://hyi-cafeclam.top** 已接入 Plausible Analytics。
无需 Cookie，无需 GDPR 弹窗，隐私优先。访问 **https://plausible.io/hyi-cafeclam.top** 查看统计数据。

---

## 配置完成后

配置好 Giscus 和 Buttondown 后，告诉我，我会帮你更新代码并推送部署。
