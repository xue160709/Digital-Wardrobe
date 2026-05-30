# 智能衣橱录入

## 功能概述

拍照或从相册选择衣服图片，AI 自动识别衣服类别、颜色和风格标签，支持手动修正后保存到衣橱列表。

## 核心功能列表

1. **拍照/相册选择**：调用设备相机或相册选择图片
2. **AI 自动识别**：自动识别衣服类别（6类）、颜色（14种）、风格标签（16个）
3. **手动修正**：用户可修改 AI 识别的结果
4. **保存入库**：保存衣服到衣橱列表，支持分类筛选和关键词搜索

## 数据结构

### ClothingItem

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

## 业务逻辑

1. 用户点击「+」按钮
2. 选择拍照或从相册选择
3. 拍照/选图后进入识别中状态
4. AI 识别返回类别+颜色+风格
5. 用户可手动修正标签
6. 确认保存后返回衣橱列表

## 相关代码文件

- `app/(tabs)/wardrobe/page.tsx` - 衣橱列表页
- `app/upload/page.tsx` - 拍照录入页
- `app/api/recognize/route.ts` - 识别 API
- `components/ClothingCard.tsx` - 衣橱卡片组件
- `lib/store.ts` - 衣橱数据存储

## 关联 PRD

- `prd/overview.md` - 入口与整体结构
- `prd/api.md` - 识别 API 详细说明