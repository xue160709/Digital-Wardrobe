# 穿搭密码

智能穿搭助手 - 了解自己，从穿搭开始。

## 技术栈

- **框架**：Next.js 16（App Router + TypeScript）
- **样式**：Tailwind CSS + 全局 CSS 变量
- **图表**：Recharts
- **图标**：Lucide React
- **包管理器**：npm

## 运行

```bash
npm install
npm run dev
```

访问 http://localhost:3000

## 项目结构

```
app/
├── (tabs)/           # 底部 Tab 导航
│   ├── wardrobe/    # 衣橱 Tab
│   ├── daily-fit/   # 今日穿搭 Tab
│   ├── style-report/# 风格报告 Tab
│   ├── profile/     # 形象分析 Tab
│   └── my/          # 我的 Tab
├── upload/          # 拍照录入
└── api/             # API Routes

components/          # 可复用组件
lib/                 # 类型定义、状态管理
prd/                 # PRD 文档体系
design-system/      # 设计系统
```

## 功能

- **衣橱管理**：拍照/相册录入，AI 自动识别标签，分类筛选搜索
- **风格报告**：色系饼图、风格分布、穿衣偏好分析
- **形象分析**：肤色测试、身材分析、专属风格定位
- **每日推荐**：天气感知、场景匹配、智能穿搭方案

## 配置

如需启用 AI 功能，在项目根目录创建 `.env.local`：

```env
MINIMAX_API_KEY=你的_Token_Plan_API_Key
```

获取 API Key：https://platform.minimaxi.com/user-center/payment/token-plan

## 文档

- [TODO.md](TODO.md) - 开发计划与任务
- [CLAUDE.md](CLAUDE.md) - 项目协作说明
- [prd/README.md](prd/README.md) - PRD 文档索引