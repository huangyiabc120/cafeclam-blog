# 咖啡蛤蜊 · CafeClam Blog

复古杂志风博客，基于 Next.js + Vercel。

---

## 一、上传到 GitHub（5分钟）

### 第1步：打开 GitHub 创建仓库
1. 浏览器打开 https://github.com 并登录（账号：huangyiabc120）
2. 点击右上角 **+** → **New repository**
3. 填写：
   - **Repository name**: `cafeclam-blog`
   - **Description**: `咖啡蛤蜊 · 记录真实`
   - 选择 **Private**（或者 Public 都行）
   - 不要勾选任何初始化选项（README 等）
4. 点击 **Create repository**

### 第2步：上传代码
在电脑上打开终端（PowerShell 或者 CMD），运行：

```bash
cd C:\Users\Administrator.DESKTOP-F3F2Q68\.openclaw\workspace\cafeclam-blog

git init
git add .
git commit -m "first commit: cafeclam blog v1.0"
git branch -M main
git remote add origin https://github.com/huangyiabc120/cafeclam-blog.git
git push -u origin main
```

> 如果提示需要登录 GitHub，在弹出的窗口用浏览器登录就行。

---

## 二、连接到 Vercel（3分钟）

1. 打开 https://vercel.com 并登录（用邮箱 hyabc120@gmail.com）
2. 点击 **Add New** → **Project**
3. 在列表中找到刚创建的 `cafeclam-blog`，点击 **Import**
4. 项目设置保持默认，直接点 **Deploy**
5. 等待 1-2 分钟，部署成功！

### 绑定自定义域名（可选）
部署完成后：
1. 进入项目 → **Settings** → **Domains**
2. 输入你想绑定的域名（比如 `cafeclam.com`）
3. 按提示在域名服务商处添加 DNS 记录

---

## 三、写文章（最简单的方法）

每篇文章是一个 `.md` 文件，放在 `posts/` 目录。

### 文章格式：
```
---
title: "文章标题"
category: "生活"          # 分类：生活/观点/随笔/读书/作品
date: "2026-04-06"       # 日期
description: "文章描述"   # 首页显示的简介
tags: ["标签1", "标签2"] # 标签
readTime: "5 min read"    # 阅读时间
coverText: "图片占位文字" # 没有图片时显示
---

正文内容，用 Markdown 写……
```

### 写新文章示例：
在 `posts/` 目录新建文件，比如 `my-first-post.md`，写入上面的格式，保存，然后：
```bash
git add .
git commit -m "新文章：我的第一篇文章"
git push
```
Vercel 会自动检测到更新，重新部署——**不用手动操作！**

---

## 四、本地预览（可选）

如果你想在发布前看到效果：

```bash
cd C:\Users\Administrator.DESKTOP-F3F2Q68\.openclaw\workspace\cafeclam-blog
npm install
npm run dev
```
然后打开 http://localhost:3000

---

## 五、修改博客信息

- **博客名/标题**：编辑 `app/layout.js` 里的内容
- **介绍文字**：编辑 `app/page.js` 的 `header-sub` 部分
- **关于页**：编辑 `app/about/page.js`
- **样式颜色**：编辑 `app/globals.css` 顶部的 `:root` 变量

---

## 目录结构

```
cafeclam-blog/
├── app/
│   ├── globals.css       ← 全部样式
│   ├── layout.js         ← 页面布局
│   ├── page.js          ← 首页
│   ├── about/
│   │   └── page.js      ← 关于页
│   └── posts/[slug]/
│       └── page.js      ← 文章详情页
├── lib/
│   └── posts.js         ← 文章读取工具
├── posts/                ← 放你的文章 .md 文件
├── package.json
└── next.config.js
```

---

有任何问题随时问我！
