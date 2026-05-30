# API 接入方案

## 概述

本项目使用 Next.js API Routes 作为 BFF（Backend for Frontend），所有外部 API 通过服务端代理，API Key 不暴露给客户端。

## API 清单

### 1. 衣物识别 /api/recognize

**用途**：拍照录入时识别衣服类别、颜色、风格

**当前实现**：Mock 数据（待接入 MiniMax Vision）

**降级**：识别失败返回空标签，用户手动填写

### 2. 风格报告生成 /api/generate-style-report

**用途**：基于衣橱数据生成风格分析报告和 AI 解读

**当前实现**：本地统计 + 规则生成文案

**降级**：报告生成失败返回静态兜底模板

### 3. 每日穿搭推荐 /api/generate-outfit

**用途**：基于天气、场景、偏好生成穿搭方案

**当前实现**：本地随机分组

**降级**：推荐生成失败返回空列表 + 友好提示

### 4. 天气 API /api/weather

**用途**：获取当前天气数据

**实现**：调用 wttr.in（免费无需 Key）

**降级**：请求失败默认"晴，20-25°C"

## 待接入 API

### MiniMax LLM

- **模型**：`MiniMax-M2.7` 或 `MiniMax-M2.7-highspeed`
- **用途**：衣物识别（Vision）、风格报告生成、穿搭推荐生成
- **Key 存储**：`.env.local`（服务端环境变量）
- **调用方式**：通过 Next.js API Route 代理

### MiniMax Vision（如支持图片输入）

- **用途**：衣物识别（替代当前 mock）
- **实现方式**：将图片 Base64 传入 LLM

## 安全约束

1. API Key 只存在于服务端环境变量
2. 客户端通过 API Route 间接调用
3. 所有 API 调用包含日志（入口、参数脱敏、成功/失败、耗时）
4. 敏感数据（肤色/身材）仅本地存储，不上传