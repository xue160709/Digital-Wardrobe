# 深度形象分析

## 功能概述

通过肤色测试和身材分析，结合用户穿衣偏好，给出专属风格定位和穿搭建议。

## 核心功能列表

1. **肤色测试**：选择肤色类型（4种：暖浅/暖深/冷浅/冷深）
2. **身材分析**：手动选择身形类型（5种：苹果/梨形/沙漏/H型/倒三角）
3. **风格定位**：结合肤色+身材+偏好，给出风格关键词
4. **穿搭建议**：按场景（通勤/约会/休闲/正式/运动）给出颜色禁忌、款式推荐
5. **结果持久化**：分析结果保存在本地

## 数据结构

### UserProfile

```typescript
interface UserProfile {
  skinTone?: 'warm-light' | 'warm-deep' | 'cool-light' | 'cool-deep'
  bodyType?: 'apple' | 'pear' | 'hourglass' | 'h-shape' | 'inverted-triangle'
  stylePreferences: string[]
  createdAt: number
  updatedAt: number
}
```

## 业务逻辑

1. 新用户进入形象分析页，显示引导页
2. 用户选择肤色类型
3. 用户选择身材类型
4. 系统综合分析生成风格定位
5. 展示分场景穿搭建议
6. 结果持久化到本地

## 相关代码文件

- `app/(tabs)/profile/page.tsx` - 形象分析页
- `lib/store.ts` - 用户画像存储

## 关联 PRD

- `prd/overview.md` - 入口与整体结构