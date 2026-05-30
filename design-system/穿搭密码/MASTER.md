# 设计系统 - 穿搭密码

## 设计取向依据

产品名称「穿搭密码」、Slogan「了解自己，从穿搭开始」、目标用户（26岁职场女生）、核心场景（早晨快速搭配、了解自身风格）。设计方向应温暖柔和、专业可信，帮助用户建立自信而非炫技。工具形态为移动 App，触控操作为主，信息密度适中。

## 设计风格

### 风格名称
**Exaggerated Minimalism**（夸张极简）
- 大留白、突出核心内容
- 强调易读性和操作效率
- 适合时尚、生活方式类产品

### 关键词
Fashion-forward、温暖柔和、专业可信、简约不简单

### 设计取向
- 色彩：Fashion rose（玫红）主色调，暖色系传递温暖自信感
- 字体：标题 Syne（有存在感）+ 正文 Manrope（清晰易读）
- 空间：充足留白，让衣服图片成为视觉焦点
- 动效：轻量、自然，避免喧宾夺主

## 颜色系统

### 主色（Primary）
```
--color-primary: #BE185D      /* 玫红色，主操作、Tab 高亮 */
--color-on-primary: #FFFFFF   /* 白底文字 */
--color-primary-hover: #9D174D /* 悬停态 */
```

### 次要色（Secondary）
```
--color-secondary: #EC4899    /* 粉色，辅助强调 */
--color-accent: #D97706      /* 金色/橙色，CTA 按钮、优惠信息 */
```

### 背景色（Background）
```
--color-background: #FDF2F8   /* 淡粉白，主背景 */
--color-surface: #FFFFFF     /* 白色，卡片/内容区 */
--color-muted: #FBF1F5        /* 淡粉，disabled/次要背景 */
```

### 文字色（Foreground）
```
--color-foreground: #0F172A  /* 深色，主文字 */
--color-foreground-secondary: #6B7280 /* 灰色，次要文字 */
```

### 边框与分割
```
--color-border: #F7E3EB      /* 淡粉边框 */
--color-ring: #BE185D        /* 聚焦环 */
```

### 语义色
```
--color-destructive: #DC2626 /* 红色，删除/危险操作 */
--color-success: #10B981      /* 绿色，成功状态 */
--color-warning: #F59E0B     /* 橙色，警告状态 */
--color-info: #3B82F6         /* 蓝色，信息提示 */
```

## 字体系统

### 字体选择
- **标题**：Syne（Google Fonts）- 400/500/600/700
- **正文**：Manrope（Google Fonts）- 300/400/500/600/700

### 字号阶梯
```
--text-xs: 0.75rem    /* 12px，次要标签 */
--text-sm: 0.875rem   /* 14px，辅助说明 */
--text-base: 1rem     /* 16px，正文基准（移动端最小 16px） */
--text-lg: 1.125rem   /* 18px，小标题 */
--text-xl: 1.25rem    /* 20px，区块标题 */
--text-2xl: 1.5rem    /* 24px，页面标题 */
--text-3xl: 1.875rem  /* 30px，重要标题 */
```

### 行高与字重
- 正文行高：1.5–1.75
- 标题行高：1.2–1.3
- 标题字重：600–700
- 正文字重：400–500

## 圆角与间距

### 圆角
```
--radius-sm: 6px      /* 小按钮、标签 */
--radius-md: 8px      /* 按钮、输入框 */
--radius-lg: 12px      /* 卡片 */
--radius-xl: 16px      /* 大卡片、弹窗 */
--radius-full: 9999px  /* 药丸形标签、圆形按钮 */
```

### 间距（4dp 基准）
```
--space-1: 0.25rem   /* 4px */
--space-2: 0.5rem    /* 8px */
--space-3: 0.75rem   /* 12px */
--space-4: 1rem      /* 16px */
--space-5: 1.25rem   /* 20px */
--space-6: 1.5rem    /* 24px */
--space-8: 2rem      /* 32px */
--space-10: 2.5rem   /* 40px */
--space-12: 3rem     /* 48px */
```

## 阴影系统

### 卡片阴影
```
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05)
--shadow-md: 0 2px 8px rgba(0, 0, 0, 0.08)    /* 常规卡片 */
--shadow-lg: 0 4px 12px rgba(0, 0, 0, 0.12)    /* 浮层/弹窗 */
```

### 状态阴影
```
--shadow-focus: 0 0 0 3px rgba(190, 24, 93, 0.3) /* 聚焦环 */
```

## 组件样式

### 按钮

**主按钮（Primary）**
- 背景：--color-primary
- 文字：--color-on-primary
- 圆角：--radius-md
- 高度：44px（触控友好）
- 悬停：--color-primary-hover
- 按下：opacity 0.9

**次要按钮（Secondary）**
- 背景：transparent
- 边框：1px solid --color-border
- 文字：--color-foreground
- 圆角：--radius-md

**危险按钮（Destructive）**
- 背景：--color-destructive
- 文字：#FFFFFF

**浮动按钮（FAB）**
- 背景：--color-primary
- 阴影：--shadow-lg
- 位置：右下角，距边缘 16px，距底部 Tab Bar 上方 16px
- 尺寸：56x56px（触控友好）

### 卡片

**衣橱卡片（ClothingCard）**
- 背景：--color-surface
- 圆角：--radius-lg
- 阴影：--shadow-md
- 图片：aspect-ratio 3/4（竖长方形适配衣服）
- 标签：药丸形，显示在图片右下角或卡片底部

**穿搭方案卡片（OutfitCard）**
- 背景：--color-surface
- 圆角：--radius-lg
- 多图展示：水平排列 3-5 件衣服缩略图
- 场景标签：药丸形，左上角

### 输入框

- 背景：--color-surface
- 边框：1px solid --color-border
- 圆角：--radius-md
- 高度：44px
- 聚焦：边框变为 --color-primary，阴影 --shadow-focus

### Tab Bar（底部导航）

- 高度：56px + safe-area-bottom
- 背景：--color-surface（可加顶部细线分隔）
- 图标：24x24px，线宽一致
- 文字：12px
- 选中态：图标+文字变为 --color-primary
- 未选中：--color-foreground-secondary

### Toast 提示

- 背景：--color-foreground（深色）
- 文字：#FFFFFF
- 圆角：--radius-md
- 位置：顶部，距状态栏下方 16px
- 自动消失：3-5 秒

## 图标规范

- 使用 SVG 图标（Heroicons 或 Lucide）
- 线宽：1.5px 或 2px（统一）
- 颜色：跟随当前文字色（currentColor）
- 触控热区：至少 44x44px（图标本身可小，但热区要大）

## 动效原则

- 时长：微交互 150–300ms
- 缓动：ease-out 进入，ease-in 离开
- 原则：动效表达因果，不打断操作
- 列表入场：逐项延迟 30–50ms
- 骨架屏：loading 时使用，不阻塞内容滚动

## 响应式断点

| 断点 | 宽度 | 布局 |
|------|------|------|
| Mobile S | 320–374px | 2列网格，紧凑间距 |
| Mobile M | 375–413px | 2列网格（默认） |
| Mobile L | 414–479px | 2列网格，稍宽间距 |
| Tablet | 480px+ | 可考虑 3 列网格 |

## 无障碍要求

- 对比度：正文 ≥ 4.5:1，大字 ≥ 3:1
- 触控目标：≥ 44×44pt
- 聚焦状态：可见焦点环（2–4px）
- motion：尊重 prefers-reduced-motion
- 图标按钮：aria-label 提供描述

## 全局 CSS 变量

```css
:root {
  /* Colors */
  --color-primary: #BE185D;
  --color-on-primary: #FFFFFF;
  --color-primary-hover: #9D174D;
  --color-secondary: #EC4899;
  --color-accent: #D97706;
  --color-background: #FDF2F8;
  --color-surface: #FFFFFF;
  --color-muted: #FBF1F5;
  --color-foreground: #0F172A;
  --color-foreground-secondary: #6B7280;
  --color-border: #F7E3EB;
  --color-ring: #BE185D;
  --color-destructive: #DC2626;
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-info: #3B82F6;

  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;

  /* Border Radius */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 2px 8px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 4px 12px rgba(0, 0, 0, 0.12);

  /* Font Families */
  --font-heading: 'Syne', sans-serif;
  --font-body: 'Manrope', sans-serif;
}
```

## Google Fonts 引入

```css
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&family=Syne:wght@400;500;600;700&display=swap');
```

## 落地注意事项

1. **颜色应用**：所有颜色必须使用 CSS 变量，不硬编码 hex
2. **图片优先**：衣橱核心是展示衣服，设计要让衣服图片成为视觉焦点
3. **触控友好**：所有可点击元素最小 44×44pt
4. **安全边距**：移动端左右至少 16px，避免内容贴边
5. **Tab Bar**：固定底部，高度 56px + safe-area-bottom
6. **空态设计**：空衣橱、空结果都要有引导插图，不能留白