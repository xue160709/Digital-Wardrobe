# 风格分析报告

## 功能概述

基于用户衣橱中的衣服数据，统计并可视化用户的穿衣偏好（色系、风格、品类），生成风格分析报告和 AI 解读。

## 核心功能列表

1. **衣橱数据统计**：统计各品类数量、颜色分布、风格占比
2. **偏好色系分析**：按颜色频率加权，生成饼图
3. **风格关键词提取**：出现最高的 3-5 个风格标签
4. **可视化报告**：色系饼图 + 风格柱状图
5. **AI 解读文案**：一段话总结用户穿衣风格

## 数据结构

### StyleReport

```typescript
interface StyleReport {
  colorPreferences: { name: string; percentage: number; hex: string }[]
  topStyles: { name: string; count: number }[]
  styleKeywords: string[]
  occasionBreakdown: { name: string; percentage: number }[]
  insight: string
  generatedAt: number
}
```

## 业务逻辑

1. 用户进入风格报告页
2. 检查衣橱衣服数量（≥5 件）
3. 若不足，显示引导页
4. 若充足，读取衣橱数据并统计
5. 生成可视化图表
6. 生成 AI 解读文案

## 相关代码文件

- `app/(tabs)/style-report/page.tsx` - 风格报告页
- `app/api/generate-style-report/route.ts` - 报告生成 API
- `lib/store.ts` - 衣橱数据存储

## 关联 PRD

- `prd/overview.md` - 入口与整体结构
- `prd/api.md` - 报告生成 API 详细说明