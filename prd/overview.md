# 产品概述

## 基本信息

- **产品名称**：穿搭密码
- **Slogan**：了解自己，从穿搭开始
- **工具形态**：移动 App（基于 Web 的原生体验）

## 用户画像

林小暖，26岁，互联网公司运营专员，每天早上出门前总是站在衣柜前发呆——明明衣服不少，却总觉得没衣服穿。她想要了解自己的穿衣风格，找到最适合自己的搭配，但每次买衣服都靠感觉入手，穿出来却总觉得哪里不对。她的核心痛点是：不知道自己适合什么风格，买衣服容易踩雷，出门搭配花费大量时间。

## 核心功能 MVP

1. **智能衣橱录入**：拍照自动识别衣服类别、颜色、风格标签，支持手动补充信息
2. **风格分析报告**：基于衣橱数据，分析用户的穿衣偏好、色系倾向、风格关键词，生成可视化报告
3. **深度形象分析**：AI 分析用户肤色、身材特点，给出专属风格定位和穿搭建议
4. **每日穿搭推荐**：根据天气、场景和用户风格偏好，智能推荐当日穿搭方案

## 交互流程

- 打开 App，进入首页「我的衣橱」查看所有衣服
- 点击「+」拍照上传新衣服，AI 自动识别并归类
- 进入「风格报告」查看自己的穿衣风格分析
- 进入「形象分析」完成肤色、身材测试，获取专属风格建议
- 在「每日推荐」获取 AI 穿搭建议，快速选择出门搭配

## 技术架构

- **框架**：Next.js App Router + TypeScript
- **样式**：Tailwind CSS + 全局 CSS 变量
- **状态**：React useState + useEffect（当前 MVP 内存存储）
- **图表**：Recharts
- **图标**：Lucide React

## 目录结构

```
app/
├── (tabs)/              # Tab 导航组
│   ├── wardrobe/        # 衣橱 Tab
│   ├── daily-fit/      # 今日穿搭 Tab
│   ├── style-report/   # 风格报告 Tab
│   ├── profile/        # 形象分析 Tab
│   └── my/             # 我的 Tab
├── upload/             # 拍照录入
├── api/                # API Routes
│   ├── recognize/       # 衣物识别
│   ├── generate-style-report/  # 风格报告生成
│   ├── generate-outfit/  # 穿搭推荐生成
│   └── weather/         # 天气 API
├── globals.css         # 全局样式 + CSS 变量
└── layout.tsx          # 根布局

components/             # 可复用组件
├── TabBar.tsx         # 底部导航栏
├── ClothingCard.tsx  # 衣橱卡片
└── EmptyState.tsx     # 空态引导

lib/
├── types.ts          # TypeScript 类型定义
└── store.ts         # 内存状态管理
```

## 数据结构

### ClothingItem（衣物）

```typescript
interface ClothingItem {
  id: string
  imageUrl: string
  category: 'tops' | 'bottoms' | 'dresses' | 'outerwear' | 'shoes' | 'accessories'
  color: string
  colorType: 'warm' | 'cool' | 'neutral'
  styleTags: string[]
  createdAt: number
}
```

### UserProfile（用户画像）

```typescript
interface UserProfile {
  skinTone?: 'warm-light' | 'warm-deep' | 'cool-light' | 'cool-deep'
  bodyType?: 'apple' | 'pear' | 'hourglass' | 'h-shape' | 'inverted-triangle'
  stylePreferences: string[]
  createdAt: number
  updatedAt: number
}
```

## 设计系统

- **风格**：Exaggerated Minimalism（夸张极简）
- **主色**：#BE185D（玫红）
- **背景**：#FDF2F8（淡粉白）
- **字体**：Syne（标题）+ Manrope（正文）
- 完整设计系统见 `design-system/穿搭密码/MASTER.md`

## 后续文档

各核心模块的详细文档：
- `prd/wardrobe.md` - 智能衣橱录入
- `prd/style-report.md` - 风格分析报告
- `prd/profile.md` - 深度形象分析
- `prd/daily-fit.md` - 每日穿搭推荐
- `prd/api.md` - API 接入方案