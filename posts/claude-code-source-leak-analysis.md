---
title: "Claude Code 51万行源码泄露，我扒出来了超多好东西！"
description: "Claude Code 源码因 npm 包配置失误意外泄露，51.2万行 TypeScript 源码在线裸奔。本文深入分析泄露内容，从系统提示词设计到未上线的隐藏功能，带你看看真正顶级 Agent 工程是怎么搭建的。"
date: "2026-04-09"
tags:
  - AI
  - Claude
  - Agent
  - 技术分析
---

# Claude Code 51万行源码泄露，我扒出来了超多好东西！

前不久，一条愚人节前夜的"假新闻"刷屏：[Claude Code](https://www.uisdc.com/tag/claude-code) 的整套 CLI 源码因为一个 npm 包配置失误，把 59.8MB 的 .map 文件直接推到了公开仓库。1900 多个文件，51.2 万行 TypeScript，全部在线裸奔。

最先发现的是一个叫 Chaofan Shou 的开发者，他注意到公开的 npm 包里有异常大的 .map 文件。点开一看——里面是完整的 TypeScript 源码映射，相当于把 51.2 万行源码全部还原了出来。他发推爆料，半小时内星标破 5k。

之后 Anthropic 很快把 .map 文件从 npm 包里删掉了，GitHub 上的克隆仓库也陆续被 DMCA 下架。

我觉得真正有意思的地方，不是"哇源码泄露了"，而是**泄露的是什么，能从里面学到什么**。

---

## 先说清楚：泄露的不是模型，是 Agent 的骨架

很多人看到源码泄露第一反应是：无敌了，我能搓出来一个媲美 Claude 的模型！

不可能。

原因很简单：这次泄露的是**客户端工程代码**，不是模型本身。模型权重、训练数据、RLHF 的细节，一行都没有。

但这不代表这份代码没价值。恰恰相反，**对做 AI 产品、做 Agent 的人来说，这份代码的价值可能超过你想象。**

Claude Code 目前算是公认的最强天花板 Agent 终端编程工具。这次意外泄露，相当于让大家看到了真正跑在生产环境里的顶级 Agent 工程是怎么搭建的。

从架构图能看出来，Claude Code 不是一个简单的 CLI 封装，而是一个有完整分层设计的系统：

用户交互层往下走，经过 Agent 核心层（上下文管理、记忆系统、多 Agent 协调），再到工具层（40 多个独立工具模块），最后才是底层的 API 调用。每一层都有自己的职责边界，工具层的每个模块都有独立的沙箱和审计日志。

---

## 从提示词设计，我能学到什么

我自己一个目录一个目录翻下来，印象最深的不是功能列表，而是**每个工具目录里都有一个 `prompt.ts`**。

这是 Anthropic 写的生产级系统提示词，直接对模型下指令，约束每个工具的行为边界。这些提示词不是写给用户看的文档，是写给模型看的行为规范。

### 1. BashTool 的提示词：怎么把"不能犯错"写进规范

BashTool/prompt.ts 里有一段 Git 安全协议，写得极其精细，节选几条：

> Git Safety Protocol:
> - NEVER update the git config
> - NEVER run destructive git commands (push --force, reset --hard, checkout .) unless the user explicitly requests these actions
> - NEVER skip hooks (--no-verify, --no-gpg-sign) unless the user explicitly requests it
> - CRITICAL: Always create NEW commits rather than amending, unless the user explicitly requests a git amend. When a pre-commit hook fails, the commit did NOT happen — so --amend would modify the PREVIOUS commit, which may result in destroying work or losing previous changes.
> - When staging files, prefer adding specific files by name rather than using "git add -A" or "git add .", which can accidentally include sensitive files (.env, credentials) or large binaries

你看这个写法，每一条都在回答一个问题：**什么情况下模型最容易出错，出错了后果是什么，所以绝对不能做。**

这不是在给模型描述能力，而是在给模型画红线，而且红线画得非常具体——不是：`请小心操作 git` 而是：`pre-commit hook 失败时 commit 根本没有发生，这种情况下 amend 会改掉上一个 commit，所以永远不用 amend，除非用户明确要求。`

模型理解了逻辑，才能在没见过的边界情况下也做出正确判断。

同一个文件里还有一段工具优先级约束：

> IMPORTANT: Avoid using this tool to run find, grep, cat, head, tail, sed, awk, or echo commands. Instead, use the appropriate dedicated tool:
> - File search: Use GlobTool (NOT find or ls)
> - Content search: Use GrepTool (NOT grep or rg)
> - Read files: Use FileReadTool (NOT cat/head/tail)
> - Edit files: Use FileEditTool (NOT sed/awk)
> - Write files: Use FileWriteTool (NOT echo >/cat <<EOF)

**专用工具比通用命令更安全、更可审计、更容易做权限控制。** 工具的颗粒度越细，安全性就越可控。

### 2. AgentTool 的提示词：Multi-Agent 协作的核心逻辑

然后是 AgentTool/prompt.ts，这是多 Agent 调度的核心，里面有一段话让我停了很久：

> Brief the agent like a smart colleague who just walked into the room — it hasn't seen this conversation, doesn't know what you've tried, doesn't understand why this task matters.

翻译过来：**给 Agent 写 prompt，就像在跟一个刚走进房间的聪明同事沟通。** 它没看过这段对话，不知道你试过什么，不理解这个任务的背景。你得给够背景，让它能自己做判断，而不只是执行一条窄指令。

源码里还有一句非常直接的提醒：

> Never delegate understanding. Don't write "based on your findings, fix the bug" or "based on the research, implement it." Those phrases push synthesis onto the agent instead of doing it yourself. Write prompts that prove you understood: include file paths, line numbers, what specifically to change.

**不要把理解过程外包给 Agent。** 不要写"根据你的发现修复这个 bug"，而是要自己先理解，然后给出具体的文件路径、行号，要改什么。

这是一个很反直觉但极其重要的设计原则。很多人做 Agent 协作失败，根本原因就是子 Agent 没有足够的上下文去做判断，只能机械执行，遇到边界情况直接挂掉或者做错。Anthropic 在这里直接告诉调度层的模型：你要把足够的背景信息打包给子 Agent，不能只给任务指令。

### 3. 并发调度：影响性能和成本的细节

> Launch multiple agents concurrently whenever possible, to maximize performance; to do that, use a single message with multiple tool uses.

**并行任务要在同一条消息里一次性发出多个 tool call，而不是顺序发。**

顺序发一个等一个，每次都有延迟，上下文也越来越长。并行发出去，等所有结果回来再汇总，速度快，Token 消耗也更可控。

### 4. 从提示词能学到什么

综合起来，Anthropic 写生产级 Agent 提示词有几个核心原则：

**第一，约束比能力更重要。** 提示词的重心不是描述模型有什么能力，而是画清楚什么情况下不能做、为什么不能做。

**第二，规则要带逻辑。** 不是"不要 amend"，而是"pre-commit hook 失败时 commit 没有发生，这时 amend 会改掉上一个 commit 导致丢失工作，所以不能 amend"。带逻辑的规则让模型能举一反三。

**第三，工具颗粒度要细。** 专用工具比通用命令更安全、更可审计、更容易做权限控制。

**第四，子 Agent 的上下文要显式传递。** 不要期望子 Agent 自己理解背景，要在提示词里打包足够的上下文，包括文件路径、已排除的方案、为什么这样决策。

**第五，理解在协调层完成，不要外包。** 协调层要先想清楚，再委托。"根据你的发现做什么"是无效的，"在 src/auth.ts 第 47 行做什么具体修改"才是有效的。

---

## 架构层面的决策设计

### ① 自研终端 UI 引擎

`ink/` 目录是整个源码里最让我意外的地方。

Anthropic 没有用现成的终端 UI 库，而是从头自己实现了一套完整的终端渲染引擎——包括布局计算（用的是 yoga 布局引擎）、事件系统、键盘处理、滚动、颜色渲染，全部自研。这套引擎叫 **Ink**，是 React 风格的声明式终端 UI。

做这个选择，说明他们对终端交互体验的控制欲非常强，不接受任何第三方的不确定性。

### ② 记忆系统的独立性

`memdir/` 单独拆成了一个完整的子系统，有自己的扫描、整理、过期管理、团队同步逻辑。

在 Claude Code 里，记忆不是随便存几个文件，而是一套有生命周期的数据管理系统。支持个人记忆和团队记忆分离，有专门的 secret 扫描（防止把敏感信息存进记忆），还有自动过期清理机制。

这个设计的复杂度远超预期。很多人做 AI 工具的"记忆功能"就是写个 txt，Anthropic 这里搞了一个接近数据库的东西。

### ③ Undercover Mode：最戏剧性的那个细节

源码里有个 `utils/undercover.ts`，功能很简单：叫 Anthropic 员工在公共代码仓库操作时，自动激活，抹除提交记录里的所有 AI 生成痕迹，且无法手动关闭。

---

## Buddy：目前唯一能亲手体验的功能

源码里发现的那些功能大多数还没上线，但 **Buddy** 是例外。就在 4 月 1 日，这个功能悄悄开放了。

Buddy 是 Claude Code 内置的电子宠物系统。它以 ASCII 艺术的形式坐在你的输入框旁边，观察你的对话，偶尔用语音泡泡冒出来说点什么。

### 宠物命中注定，无法重抽

系统用你的账号 UUID 加上盐值 `friend-2026-401`，经过 Mulberry32 PRNG 哈希算法，确定性地生成你的宠物。

宠物的外观属性（物种、稀有度、帽子、眼睛）每次都从账号 ID 重新实时计算，**不储存在本地配置文件里**。

本地只存两样东西：宠物的名字，和 Claude 给它生成的 Soul 描述（人格设定）。

### 18 种物种，5 级稀有度

稀有度系统，和所有抽卡游戏一样，Buddy 有 5 个稀有度等级。稀有度越高，属性值越高，解锁的装饰也越多：

- 普通：没有帽子
- 稀有及以上：解锁礼帽、螺旋桨帽
- 史詩以上：解锁光环
- 传说级：全解锁加顶级属性值

闪光（Shiny）变体独立于稀有度，有 1% 的额外概率触发。一只闪光传说级宠物的出现概率仅为 **0.01%**，相当于只有万分之一。

### 宠物有自己的 Soul

每只宠物第一次孵化时，Claude 会为它生成一个专属的名字和人格描述，存在你的本地配置里。

这个 Soul 设计很有意思，因为它是 Claude 生成的，不是预设模板。比如一只叫 Kettle（水壶）的宠物，它的灵魂描述是：

> 智慧但永远在生闷气，用酸溜溜的比喻说事，耐心好像圣人，但你要是同一个问题问两遍就炸了。

从产品设计角度来看，这个设计很聪明。你的宠物不只是一个 ASCII 小图，它有名字、有人格、有回应方式，这让用户对它产生情感连接的成本低了很多。

### 怎么召唤你的宠物

前置条件：安装了 Claude Code CLI，有 Claude Pro 或更高订阅，版本更新到最新。

然后在 Claude Code 终端里输入：

```
/buddy
```

几个常用指令：

- `/buddy` — 召唤宠物
- `/buddy name [新名字]` — 给宠物改名
- `/buddy reset` — 重置宠物（不推荐）

宠物完全**不计入 Claude Code 使用额度**，随便撸，不扣钱。

---

## 那些锁着的门：未上线的隐藏功能

Buddy 是那个已经开了窗的房间，但源码里还有很多锁着的门。

### Kairos：主动助手模式

这是最颠覆认知的一个。Kairos 是一套完全不同的交互范式——Claude 不再等你开口，而是 24 小时在线的主动助手，有每日日志，可以主动给你推文件、发通知、更新进度。

从随传随到的工具到有自己日程表的同事，如果 Kairos 上线，使用方式会发生根本性的变化。

### Auto-Dream：后台记忆整理

你不用 Claude Code 的时候，它在后台自动启动"做梦"进程，整理你积累下来的所有记忆碎片，避免长期使用后上下文越来越乱。

### Daemon：变身后台守护进程

让 Claude Code 像数据库服务一样常驻内存，随时响应调用，不需要每次冷启动。配合 Kairos 的主动模式，这就是"永远在线的 Claude"。

### Ultraplan：30 分钟云端规划

`/ultraplan` 触发，系统在云端启动一个远程 Claude Code 实例，调用 Opus 4.6，花最多 30 分钟深度探索你的项目，分析可行性、规划执行步骤，提前找出坑。

### Ultrareview：Bug 舰队

`/ultrareview` 触发，默认 5 个 Agent，最多 20 个，每个从不同角度并行审查你的代码，10 到 25 分钟出报告。纯粹的暴力美学。

---

## 功能没有做错，但安全边界还没设好

有一种说法是模型在等。Claude 4.7 据说已经训练完了，代号神话（Mythos）的新模型也准备好了，但就是没发。功能在等模型，模型在等时机。

但我倾向于另一个解释：**在等安全基础设施跟上来。**

你把上面那些功能组合起来想想：Kairos 主动操作你的系统，Daemon 常驻后台持续运行，UDS Inbox 打通多个实例互相通信，Ultrareview 一次性拉起 20 个 Agent 并行工作，Teleport 把你的完整上下文打包传输……

这些功能单独看都很酷，但组合在一起意味着什么？

**意味着一个被恶意指令控制的 Claude Code，将会是互联网灾难。**

这是 Anthropic 一直在说的 AI 安全问题，但在 Claude Code 这个具体产品上，风险面比大模型本身更具体、更实际。

所以我的判断是：功能没有做错，做好了。但安全边界还没设好。在安全防护跟上来之前，这些功能只能在灰度里慢慢放。

**做好边界，比做好功能难得多。** 这是做 AI 产品和做传统软件产品最大的区别之一——传统软件的边界是代码逻辑写死的，而 AI 产品的边界需要用提示词、权限模型、审计日志一层层叠出来。

---

*本文参考资料来源：优设网 | 原文链接：https://www.uisdc.com/claude-code-4*
