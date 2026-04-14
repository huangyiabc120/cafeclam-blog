---
title: 学员作品展示
date: 2026-04-15
student: 首批学员
category: 视频作品
description: 学员作品专栏正式上线！发布你的第一个作品吧。
videoUrl: ""
---

欢迎来到学员作品专栏！

这里将展示每一位学员的成长与创作。作品可以是视频、图文或混合形式。

**发布作品方法：**

在 `works/` 目录下创建一个 `.md` 文件，格式如下：

```
---
title: 作品标题
date: 2026-04-15
student: 学员姓名
category: 视频作品
description: 作品描述
videoUrl: "https://www.youtube.com/watch?v=xxx"
---

作品说明正文...
```

**支持的视频格式：**
- YouTube：`videoUrl: "https://www.youtube.com/watch?v=xxx"`
- Bilibili：`videoUrl: "https://www.bilibili.com/video/BVxxx"`
- 直接视频链接（MP4等）
