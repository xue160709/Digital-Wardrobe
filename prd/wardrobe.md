# 智能衣橱录入

## 功能概述

拍照或从相册选择衣服图片，AI 自动识别衣服类别、颜色和风格标签，支持手动修正后保存到衣橱列表。

## 核心功能列表

1. **拍照/相册选择**：调用设备相机或相册选择图片
2. **AI 自动识别**：✅ **已接入 SiliconFlow Vision API** - 真实识别衣服类别（6类）、颜色（14种）、风格标签（16个）
3. **手动修正**：用户可修改 AI 识别的结果
4. **保存入库**：保存衣服到衣橱列表，支持分类筛选和关键词搜索

## 数据结构

### ClothingItem

```typescript
interface ClothingItem {
  id: string
  imageUrl: string
  category: 'tops' | 'bottoms' | 'dresses' | 'outerwear' | 'shoes' | 'accessories'
  color: string        // 颜色 key，如 'red', 'blue'
  colorName: string   // 原始中文名，如 '红色'
  colorHex: string    // 颜色 HEX 值
  styleTags: string[]
  createdAt: number
}
```

### AI 识别结果格式

```typescript
interface RecognizeResult {
  category: 'tops' | 'bottoms' | 'dresses' | 'outerwear' | 'shoes' | 'accessories'
  color: string           // 颜色 key
  colorName: string      // 中文名
  styleTags: string[]     // 风格标签数组
  confidence: number     // 置信度 0-1
}
```

## 业务逻辑

1. 用户点击「+」按钮
2. 选择拍照或从相册选择
3. 拍照/选图后进入识别中状态
4. **SiliconFlow Vision API 识别**返回类别+颜色+风格
5. 用户可手动修正标签
6. 确认保存后返回衣橱列表

## AI 识别流程

```
用户选择图片
    ↓
FileReader 读取为 Base64
    ↓
POST /api/recognize { imageUrl: "data:image/png;base64,..." }
    ↓
SiliconFlow Qwen/Qwen3-VL-8B-Instruct
    ↓
返回 { category, color, colorName, styleTags, confidence }
    ↓
前端填充表单，用户可修正
```

## 相关代码文件

### 核心页面
- `app/(tabs)/wardrobe/page.tsx` - 衣橱列表页
- `app/upload/page.tsx` - 拍照录入页
- `app/page.tsx` - 根路径（重定向到 /wardrobe）

### API Routes
- `app/api/recognize/route.ts` - **AI 识别 API（SiliconFlow Vision）**
- `app/api/weather/route.ts` - 天气 API

### 组件
- `components/ClothingCard.tsx` - 衣橱卡片组件
- `components/EmptyState.tsx` - 空状态组件

### 数据管理
- `lib/store.ts` - 衣橱数据存储
- `lib/types.ts` - 类型定义

## 已实现验收（2026-05-30）

| 验收项 | 状态 |
|--------|------|
| 点击「+」可调起相机拍摄 | ✅ |
| 拍照后 AI 自动识别并展示类别/颜色/风格标签 | ✅ |
| 用户可手动修改 AI 识别的标签 | ✅ |
| 录入完成后衣服出现在衣橱列表顶部 | ✅ |
| 衣橱列表支持按类别筛选 | ✅ |
| 衣橱列表支持关键词搜索 | ✅ |

## 关联 PRD

- `prd/overview.md` - 入口与整体结构
- `prd/api.md` - **已更新** - 识别 API 详细说明