# API 接入方案

## 概述

本项目使用 Next.js API Routes 作为 BFF（Backend for Frontend），所有外部 API 通过服务端代理，API Key 不暴露给客户端。

## API 清单

### 1. 衣物识别 /api/recognize

**用途**：拍照录入时识别衣服类别、颜色、风格

**实现**：✅ **已接入真实 AI** - SiliconFlow Vision API
- **模型**：`Qwen/Qwen3-VL-8B-Instruct`
- **Provider**：SiliconFlow（https://www.siliconflow.cn/）
- **调用方式**：POST，图片 Base64 传入 LLM
- **返回格式**：
  ```json
  {
    "success": true,
    "result": {
      "category": "tops",
      "color": "red",
      "colorName": "红色",
      "styleTags": ["简约", "休闲"],
      "confidence": 0.95
    }
  }
  ```

**降级**：识别失败返回空标签，用户手动填写

### 2. 风格报告生成 /api/generate-style-report

**用途**：基于衣橱数据生成风格分析报告和 AI 解读

**当前实现**：本地统计 + 规则生成文案（MiniMax LLM 待接入）

**降级**：报告生成失败返回静态兜底模板

### 3. 每日穿搭推荐 /api/generate-outfit

**用途**：基于天气、场景、偏好生成穿搭方案

**当前实现**：本地随机分组（MiniMax LLM 待接入）

**降级**：推荐生成失败返回空列表 + 友好提示

### 4. 天气 API /api/weather

**用途**：获取当前天气数据

**实现**：调用 wttr.in（免费无需 Key）

**温度计算修复**（2026-05-30）：
- 原问题：`(temp_C + temp_F * 9/5) / 2` 错误地把华氏当摄氏平均
- 修复后：`(temp_C + (temp_F - 32) * 5/9) / 2` 正确转换为摄氏后平均

**降级**：请求失败默认"晴，20-25°C"

## 已接入 API

### SiliconFlow Vision API

| 项目 | 值 |
|------|---|
| **API Key** | 存储在 `.env.local` 的 `SILICONFLOW_API_KEY` |
| **视觉模型** | `VISION_MODEL` = `Qwen/Qwen3-VL-8B-Instruct` |
| **端点** | `https://api.siliconflow.cn/v1/chat/completions` |
| **用途** | 衣物图片识别（类别/颜色/风格） |

### MiniMax LLM

| 项目 | 值 |
|------|---|
| **API Key** | 存储在 `.env.local` 的 `MINIMAX_API_KEY` |
| **模型** | `abab6.5s-chat` |
| **端点** | `https://api.minimaxi.com/v1/chat/completions` |
| **用途** | 风格报告生成、穿搭推荐生成（待接入） |

## 待接入 API

| 功能 | API | 状态 |
|------|-----|------|
| 衣物识别 | ✅ SiliconFlow Vision | **已完成** |
| 风格报告 | MiniMax LLM | 待接入 |
| 穿搭推荐 | MiniMax LLM | 待接入 |

## 安全约束

1. API Key 只存在于服务端环境变量（`.env.local`，不提交到 Git）
2. 客户端通过 API Route 间接调用
3. 所有 API 调用包含日志（入口、参数脱敏、成功/失败、耗时）
4. 敏感数据（肤色/身材）仅本地存储，不上传