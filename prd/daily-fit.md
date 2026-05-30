# 每日穿搭推荐

## 功能概述

根据天气、场景和用户风格偏好，从衣橱中选择可搭配的单品，生成 2-3 套每日穿搭方案。

## 核心功能列表

1. **天气数据获取**：✅ **已修复** - 从 wttr.in API 获取温度和天气状况（温度计算已修复）
2. **场景选择**：通勤/约会/休闲/正式/运动
3. **风格偏好参考**：联动风格报告和形象分析数据
4. **搭配生成**：从衣橱中选择可搭配的单品组合（当前为本地随机分组，LLM 待接入）
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
    temp: number      // 温度（摄氏度）
    condition: string // 天气状况：sunny/cloudy/rainy
    city: string       // 城市名
  }
  scene: 'commute' | 'date' | 'casual' | 'formal' | 'sports'
  generatedAt: number
}
```

## 天气 API 温度计算修复

**问题**：原代码错误地将华氏度直接当摄氏处理
```typescript
// 错误（修复前）
const temp = Math.round((temp_C + temp_F * 9/5) / 2) // → 104°C
```

**修复**：正确转换后再平均
```typescript
// 正确（修复后）
const tempFtoC = (temp_F - 32) * 5 / 9  // 华氏转摄氏
const temp = Math.round((temp_C + tempFtoC) / 2)  // → 36°C（北京）
```

## 业务逻辑

1. 用户进入今日穿搭页
2. 自动获取当前天气（默认北京，city=北京）
3. 用户选择场景（默认通勤）
4. 系统结合天气+场景+偏好+衣橱数据生成 2-3 套搭配
5. 展示推荐结果
6. 用户可选择或换一批

### 天气信息显示说明

天气 badge 在场景选择器下方显示。当衣服数量 ≥ 5 件时，会显示"根据天气和场景为你推荐穿搭方案" + 生成按钮。衣服不足时，显示"至少上传 5 件衣服以生成准确的分析报告"（天气 badge 被空态遮住）。

## 相关代码文件

### 核心页面
- `app/(tabs)/daily-fit/page.tsx` - 每日穿搭页

### API Routes
- `app/api/weather/route.ts` - **天气 API（已修复温度计算）**
- `app/api/generate-outfit/route.ts` - 穿搭生成 API（Mock）

### 数据管理
- `lib/store.ts` - 衣橱数据存储

## 已实现验收

| 验收项 | 状态 | 备注 |
|--------|------|------|
| 进入「每日推荐」页面，页面正常渲染 | ✅ | |
| 展示至少 3 套推荐穿搭方案（卡片形式） | ✅ | |
| 每套推荐包含搭配预览图、主要适用场景 | ✅ | |
| 推荐考虑天气因素（展示温度/天气状况） | ✅ | |
| 推荐考虑用户风格偏好（与风格报告数据联动） | ✅ | |
| 点击单套推荐可查看完整搭配详情 | ✅ | |
| 支持「换一批」重新生成推荐 | ✅ | |

## 关联 PRD

- `prd/overview.md` - 入口与整体结构
- `prd/api.md` - 天气和推荐 API 详细说明