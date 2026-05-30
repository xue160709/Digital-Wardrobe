# PRD 文档索引

本文档为「穿搭密码」项目的 PRD 文档体系索引，记录各模块 PRD 之间的关系与入口。

## 文档结构

```
prd/
├── README.md          # 本文档，索引与总体结构
├── overview.md        # 产品概述与总目标
├── wardrobe.md        # 智能衣橱录入模块
├── style-report.md     # 风格分析报告模块
├── profile.md          # 深度形象分析模块
├── daily-fit.md        # 每日穿搭推荐模块
└── api.md              # API 接入方案
```

## 模块关系

```
用户入口（App）
├── 衣橱 Tab (wardrobe) → prd/wardrobe.md
├── 今日穿搭 Tab (daily-fit) → prd/daily-fit.md
├── 风格报告 Tab (style-report) → prd/style-report.md
├── 形象分析 Tab (profile) → prd/profile.md
└── 我的 Tab (my) → prd/overview.md

共用水渠：
├── 拍照录入 → prd/wardrobe.md（2.1 智能衣橱录入）
├── API Routes → prd/api.md
└── 数据类型定义 → prd/overview.md（数据结构章节）
```

## 入口说明

- **新开发者**：先读 `prd/README.md` 了解结构，再按任务选读对应模块
- **继续开发**：以 `TODO.md` 为准，找到对应模块文档参考实现细节
- **不要读** `prd.original.md`（归档原始总目标，仅供回顾）

## 更新规则

- 模块 PRD 由 `update-prd` Skill 维护
- 新增模块时在此索引追加
- 文档与代码同步更新，参见 `update-prd` Skill 规范