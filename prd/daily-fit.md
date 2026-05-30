# 每日穿搭推荐

## 功能概述

根据天气、场景和用户风格偏好，从衣橱中选择可搭配的单品，生成 2-3 套每日穿搭方案。

## 核心功能列表

1. **天气数据获取**：从天气 API 获取温度和天气状况
2. **场景选择**：通勤/约会/休闲/正式/运动
3. **风格偏好参考**：联动风格报告和形象分析数据
4. **搭配生成**：从衣橱中选择可搭配的单品组合
5. **推荐结果展示**：2-3 套方案，每套含搭配图示+说明

## 数据结构

### FitRecommendation

```typescript
interface FitRecommendation {
  id: string
  outfits: {
    id: string
    items: ClothingItem[]
    reason: string
  }[]
  weather?: {
    temp: number
    condition: string
    city: string
  }
  scene: 'commute' | 'date' | 'casual' | 'formal' | 'sports'
  generatedAt: number
}
```

## 业务逻辑

1. 用户进入今日穿搭页
2. 自动获取当前天气（默认北京）
3. 用户选择场景（默认通勤）
4. 系统结合天气+场景+偏好+衣橱数据生成 2-3 套搭配
5. 展示推荐结果
6. 用户可选择或换一批

## 相关代码文件

- `app/(tabs)/daily-fit/page.tsx` - 每日穿搭页
- `app/api/weather/route.ts` - 天气 API
- `app/api/generate-outfit/route.ts` - 穿搭生成 API
- `lib/store.ts` - 衣橱数据存储

## 关联 PRD

- `prd/overview.md` - 入口与整体结构
- `prd/api.md` - 天气和推荐 API 详细说明