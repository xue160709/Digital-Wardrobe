# 穿搭密码 验证清单

最后更新：2026-05-30
测试人员：___
AI Agent：playwright-cli

---

## 环境信息

| 项目 | 值 |
|------|---|
| 服务地址 | http://localhost:3000 |
| 测试工具 | playwright-cli |
| 数据状态 | 内存存储（刷新丢失） |
| 测试图片 | ~/test-clothes.png（需提前准备） |

---

## 用户真实操作路径测试（按流程）

### 路径 1：新增衣服完整流程

```
衣橱(空) → 添加衣服 → 拍照/选图 → AI识别 → 修改标签 → 保存 → 衣橱(有数据)
```

| 步骤 | 功能 | 验证方法 | 预期结果 | 状态 | 备注 |
|------|------|---------|---------|------|------|
| 1.1 | 空状态入口 | 访问 /wardrobe（无数据） | 显示"还没有衣服" | ✅ | |
| 1.2 | 点击添加 | 点击 `add-button` | 跳转到 /upload | ✅ | |
| 1.3 | 选择图片 | 相册按钮 → upload命令 | 显示确认页+预览图 | ✅ | |
| 1.4 | AI识别 | 文件上传后自动触发 | 显示类别/颜色/风格标签 | ✅ | mock数据 |
| 1.5 | 修改类别 | 点击 `category-tops` | 切换类别选中状态 | ✅ | |
| 1.6 | 修改颜色 | 点击 `color-red` | 切换颜色选中状态 | ✅ | |
| 1.7 | 修改风格 | 点击 `style-简约` | 切换风格选中状态 | ✅ | |
| 1.8 | 保存 | 点击 `save-clothing` | 跳转 /wardrobe，新衣服在顶部 | ✅ | |
| 1.9 | 验证添加 | 查看衣橱列表 | 显示刚添加的衣服卡片 | ✅ | 单session内正常 |

### 路径 2：生成每日穿搭

```
衣橱(>=5件) → 今日穿搭 → 选场景 → 生成推荐 → 换一批/看详情
```

| 步骤 | 功能 | 验证方法 | 预期结果 | 状态 | 备注 |
|------|------|---------|---------|------|------|
| 2.1 | 进入页面 | 访问 /daily-fit | 显示天气+场景选择 | ✅ | |
| 2.2 | 场景切换 | 点击 `scene-casual` | 切换到休闲场景 | ✅ | |
| 2.3 | 生成搭配 | 点击 `generate-outfits` | 显示 2-3 套推荐卡片 | ✅ | |
| 2.4 | 刷新 | 点击 `refresh-outfits` | 重新生成推荐 | ✅ | |
| 2.5 | 查看详情 | 点击 `outfit-{id}` | 显示搭配详情弹窗 | ⬜ | |
| 2.6 | 天气信息 | 页面加载 | 显示城市+温度 badge | ⚠️ | 被空态遮住 |

### 路径 3：生成风格报告

```
衣橱(>=5件) → 风格报告 → 生成报告 → 查看图表
```

| 步骤 | 功能 | 验证方法 | 预期结果 | 状态 | 备注 |
|------|------|---------|---------|------|------|
| 3.1 | 进入页面 | 访问 /style-report | 显示页面无崩溃 | ✅ | |
| 3.2 | 空态提示 | 衣服 < 5 件 | 提示"上传更多衣服" | ✅ | |
| 3.3 | 生成报告 | 点击 `generate-insight-btn` | 显示加载→报告内容 | ⬜ | |
| 3.4 | 图表展示 | 报告生成后 | 显示饼图+柱状图 | ⬜ | |
| 3.5 | AI解读 | 报告生成后 | 显示解读文案 | ⬜ | |

### 路径 4：形象分析

```
形象分析 → 肤色测试 → 身材分析 → 保存结果
```

| 步骤 | 功能 | 验证方法 | 预期结果 | 状态 | 备注 |
|------|------|---------|---------|------|------|
| 4.1 | 进入页面 | 访问 /profile | 默认显示肤色 Tab | ✅ | |
| 4.2 | 肤色选择 | 点击 `skin-warm-light` | 选中肤色高亮 | ✅ | |
| 4.3 | 下一步 | 点击 `next-to-body` | 切换到身材 Tab | ✅ | |
| 4.4 | 身材选择 | 点击 `body-apple` | 选中身材高亮 | ✅ | |
| 4.5 | 保存 | 点击 `save-profile` | 保存并显示结果 | ✅ | |
| 4.6 | 重新测试 | 点击 `retest` | 重置分析数据 | ✅ | |
| 4.7 | Tab切换 | 点击 `tab-result` | 显示分析结果页 | ✅ | |

---

## 功能模块独立测试

### 1. 衣橱模块（/wardrobe）

| 功能 | 验证方法 | 预期结果 | 状态 | 备注 |
|------|---------|---------|------|------|
| 筛选全部 | 点击 `filter-all` | 显示全部衣服 | ✅ | |
| 筛选上衣 | 点击 `filter-tops` | 只显示上衣 | ✅ | |
| 筛选下装 | 点击 `filter-bottoms` | 只显示下装 | ✅ | |
| 筛选裙子 | 点击 `filter-dresses` | 只显示裙装 | ✅ | |
| 筛选外套 | 点击 `filter-outerwear` | 只显示外套 | ✅ | |
| 筛选鞋子 | 点击 `filter-shoes` | 只显示鞋子 | ✅ | |
| 筛选配饰 | 点击 `filter-accessories` | 只显示配饰 | ✅ | |
| 搜索展开 | 点击 `search-toggle` | 显示搜索输入框 | ✅ | |
| 搜索执行 | 输入关键词 → 搜索 | 过滤列表 | ⬜ | |
| 添加入口 | 点击 `add-button` | 跳转 /upload | ✅ | |
| 空状态 | 无衣服时 | 显示 EmptyState | ✅ | |
| 衣服卡片 | 有衣服时 | 显示 `clothing-card-{index}` | ⬜ | |

### 2. 拍照录入（/upload）

| 功能 | 验证方法 | 预期结果 | 状态 | 备注 |
|------|---------|---------|------|------|
| 页面渲染 | 直接访问 /upload | 显示拍照引导页 | ✅ | |
| 拍照按钮 | 点击 `capture-button` | 调起系统相机（需手动测试） | ⚠️ | playwright 无法模拟相机 |
| 相册上传 | `album-button` → `upload`命令 | 显示确认页+预览图 | ✅ | ✅ 已验证 |
| AI识别 | 文件上传后 | 显示类别/颜色/风格标签 | ✅ | mock数据 |
| 修改标签 | 点击 `category-tops` 等 | 切换选中状态 | ✅ | ✅ 已验证 |
| 关闭 | 点击 `close-upload` | 返回 /wardrobe | ✅ | |
| 取消上传 | 点击 `cancel-upload` | 清空图片回到拍照页 | ⬜ | |
| 错误提示 | 上传失败时 | 显示 `upload-error` | ⬜ | |
| 保存 | 点击 `save-clothing` | 保存成功→跳转衣橱 | ✅ | ✅ 已验证 |

### 3. 今日穿搭（/daily-fit）

| 功能 | 验证方法 | 预期结果 | 状态 | 备注 |
|------|---------|---------|------|------|
| 页面渲染 | 访问 /daily-fit | 200，无崩溃 | ✅ | |
| 天气信息 | 页面加载 | 显示城市+温度 | ⚠️ | 被空态遮住 |
| 场景切换-通勤 | 点击 `scene-commute` | 切换场景 | ✅ | |
| 场景切换-休闲 | 点击 `scene-casual` | 切换场景 | ✅ | |
| 场景切换-约会 | 点击 `scene-date` | 切换场景 | ✅ | |
| 场景切换-正式 | 点击 `scene-formal` | 切换场景 | ✅ | |
| 场景切换-运动 | 点击 `scene-sports` | 切换场景 | ✅ | |
| 生成搭配 | 点击 `generate-outfits` | 显示推荐卡片 | ✅ | |
| 刷新 | 点击 `refresh-outfits` | 重新生成 | ✅ | |
| 查看详情 | 点击 `outfit-{id}` | 显示详情 | ⬜ | |
| 空态提示 | 衣服 < 5 件 | 显示"去添加"链接 | ✅ | |

### 4. 风格报告（/style-report）

| 功能 | 验证方法 | 预期结果 | 状态 | 备注 |
|------|---------|---------|------|------|
| 页面渲染 | 访问 /style-report | 200，无崩溃 | ✅ | |
| 空态 | 衣服 < 5 件 | 显示提示 | ✅ | |
| 生成报告 | 点击 `generate-insight-btn` | 生成并展示报告 | ⬜ | |
| 饼图 | 有数据时 | 显示颜色分布饼图 | ⬜ | |
| 柱状图 | 有数据时 | 显示风格占比柱状图 | ⬜ | |
| AI解读 | 有数据时 | 显示解读文案 | ⬜ | |

### 5. 形象分析（/profile）

| 功能 | 验证方法 | 预期结果 | 状态 | 备注 |
|------|---------|---------|------|------|
| 页面渲染 | 访问 /profile | 200，无崩溃 | ✅ | |
| Tab-肤色 | 点击 `tab-skin` | 显示肤色测试 | ✅ | |
| Tab-身材 | 点击 `tab-body` | 显示身材分析 | ✅ | |
| Tab-结果 | 点击 `tab-result` | 显示分析结果 | ✅ | |
| 肤色选项 | 点击 `skin-{key}` | 选中效果 | ✅ | |
| 身材选项 | 点击 `body-{key}` | 选中效果 | ✅ | |
| 下一步 | 点击 `next-to-body` | Tab间切换 | ✅ | |
| 保存 | 点击 `save-profile` | 保存+跳转结果 | ✅ | |
| 重新测试 | 点击 `retest` | 重置数据 | ✅ | |
| 结果持久化 | 保存后刷新 | 数据仍存在 | ⬜ | |

### 6. 我的（/my）

| 功能 | 验证方法 | 预期结果 | 状态 | 备注 |
|------|---------|---------|------|------|
| 页面渲染 | 访问 /my | 200，显示设置列表 | ✅ | |
| 风格报告入口 | 点击 `settings-style-report` | 跳转 /style-report | ✅ | |
| 形象分析入口 | 点击 `settings-profile` | 跳转 /profile | ✅ | |
| 清除数据 | 点击 `settings-clear-data` | 清空衣橱+画像 | ⬜ | |
| 关于 | 点击 `settings-about` | 显示关于弹窗/抽屉 | ⬜ | |

### 7. 路由验证

| 路由 | 验证方法 | 预期结果 | 状态 | 备注 |
|------|---------|---------|------|------|
| / | 访问根路径 | 307 → /wardrobe | ✅ | |
| /wardrobe | 直接访问 | 200，显示衣橱 | ✅ | |
| /daily-fit | 直接访问 | 200，显示今日穿搭 | ✅ | |
| /style-report | 直接访问 | 200，显示风格报告 | ✅ | |
| /profile | 直接访问 | 200，显示形象分析 | ✅ | |
| /my | 直接访问 | 200，显示我的 | ✅ | |
| /upload | 直接访问 | 200，显示上传页 | ✅ | |

### 8. API 验证

| 接口 | 验证方法 | 预期结果 | 状态 | 备注 |
|------|---------|---------|------|------|
| GET /api/weather?city=Beijing | curl | 200，temp:36°C | ✅ | |
| GET /api/weather?city=上海 | curl（需编码） | 200，正常返回 | ⚠️ | 编码问题待修复 |
| POST /api/recognize | 上传图片 | ✅ 返回识别结果（真实 AI） | ✅ | SiliconFlow Qwen-VL |
| POST /api/generate-outfit | 有衣服时 | 返回穿搭方案 | ⬜ | |
| POST /api/generate-style-report | 有>=5件衣服 | 返回报告数据 | ⬜ | |

---

## 拍照上传测试方案（详细）

### 方案 A：setInputFiles 模拟文件选择（推荐）⭐⭐⭐

**原理**：playwright 的 `setInputFiles` 可直接触发 `<input type="file">` 的 `onChange`，模拟用户从相册选择图片。

**前置准备**：
```bash
# 创建测试图片（白色背景 + 红色矩形，模拟衣服轮廓）
convert -size 300x300 xc:white \
  -fill red -draw "rectangle 50,50 250,250" \
  ~/test-clothes.png
```

**测试步骤**：
```bash
# 1. 打开上传页面
playwright-cli goto http://localhost:3000/upload

# 2. 模拟文件选择（核心步骤）
playwright-cli setInputFiles "data-testid=file-input" ~/test-clothes.png

# 3. 等待确认页渲染
sleep 2

# 4. 截图确认页
playwright-cli screenshot --filename=test-results/upload-confirm.png

# 5. 修改标签（可选）
playwright-cli click "data-testid=category-tops"

# 6. 保存
playwright-cli click "data-testid=save-clothing"

# 7. 等待跳转，截图衣橱
sleep 2
playwright-cli screenshot --filename=test-results/wardrobe-after-upload.png
```

**优点**：✅ 真实模拟文件选择流程，✅ 可测试完整确认页，✅ 不需要修改代码
**缺点**：⚠️ 无法测试相机调起（需要真机手动测）

---

### 方案 B：Mock API 返回测试 UI

**原理**：直接 mock `/api/recognize` 返回假数据，专注测试 UI 流程。

**前置修改**（临时）：
```typescript
// app/api/recognize/route.ts
if (process.env.NODE_ENV === 'test') {
  return NextResponse.json({
    success: true,
    result: {
      category: 'tops',
      color: { primary: '#DC2626', name: '红色' },
      styleTags: ['简约', '休闲'],
      confidence: 0.95
    }
  })
}
```

**测试步骤**：
```bash
NODE_ENV=test playwright-cli goto http://localhost:3000/upload
# ... 后续步骤同方案A
```

**优点**：✅ 快，✅ 不依赖真实 API
**缺点**：⚠️ 需要改代码，⚠️ 无法测试真实图片处理逻辑

---

### 方案 C：本地开发服务器 + 手动测试

**原理**：启动本地 server + 人工手动测试相机功能。

**步骤**：
1. AI Agent 先跑自动化测试（方案 A）
2. 人工手动测试相机调起
3. 将人工测试结果补充到备注

**优点**：✅ 完整覆盖，✅ 相机真实测试
**缺点**：⚠️ 需要人工介入

---

### 推荐：方案 A + 方案 C 组合

| 测试类型 | 使用方案 | 执行者 |
|---------|---------|--------|
| 文件选择、确认页、标签修改、保存 | 方案 A | AI Agent 自动 |
| 相机调起（需摄像头） | 方案 C | 人工手动 |
| API 识别准确性 | 方案 B | AI Agent + Mock |

---

## data-testid 参考表

### 衣橱（wardrobe）
| 元素 | data-testid |
|------|-------------|
| 搜索按钮 | `search-toggle` |
| 搜索输入框 | `search-input` |
| 筛选-全部 | `filter-all` |
| 筛选-上衣 | `filter-tops` |
| 筛选-下装 | `filter-bottoms` |
| 筛选-裙装 | `filter-dresses` |
| 筛选-外套 | `filter-outerwear` |
| 筛选-鞋子 | `filter-shoes` |
| 筛选-配饰 | `filter-accessories` |
| 添加按钮 | `add-button` |
| 衣服卡片 | `clothing-card-{index}` |

### 上传（upload）
| 元素 | data-testid |
|------|-------------|
| 关闭按钮 | `close-upload` |
| 拍照按钮 | `capture-button` |
| 相册按钮 | `album-button` |
| 文件输入 | `file-input` |
| 取消按钮 | `cancel-upload` |
| 保存按钮 | `save-clothing` |
| 错误提示 | `upload-error` |
| 类别选择 | `category-{key}` |
| 颜色选择 | `color-{key}` |
| 风格选择 | `style-{style}` |

### 今日穿搭（daily-fit）
| 元素 | data-testid |
|------|-------------|
| 场景-通勤 | `scene-commute` |
| 场景-休闲 | `scene-casual` |
| 场景-约会 | `scene-date` |
| 场景-正式 | `scene-formal` |
| 场景-运动 | `scene-sports` |
| 生成搭配 | `generate-outfits` |
| 刷新 | `refresh-outfits` |
| 穿搭卡片 | `outfit-{id}` |

### 风格报告（style-report）
| 元素 | data-testid |
|------|-------------|
| 生成解读按钮 | `generate-insight-btn` |

### 形象分析（profile）
| 元素 | data-testid |
|------|-------------|
| Tab-肤色 | `tab-skin` |
| Tab-身材 | `tab-body` |
| Tab-结果 | `tab-result` |
| 肤色选项 | `skin-{key}` |
| 身材选项 | `body-{key}` |
| 下一步 | `next-to-body` |
| 保存 | `save-profile` |
| 重新测试 | `retest` |

### 我的（my）
| 元素 | data-testid |
|------|-------------|
| 风格报告入口 | `settings-style-report` |
| 形象分析入口 | `settings-profile` |
| 清除数据 | `settings-clear-data` |
| 关于 | `settings-about` |

### 通用组件
| 元素 | data-testid |
|------|-------------|
| 衣服卡片 | `clothing-card-{index}` |
| 删除衣服 | `delete-{item.id}` |
| 空状态 | `empty-state-{type}` |
| 空状态操作 | `empty-state-action` |

---

## AI Agent 测试 Prompt（完整版）

```markdown
## 测试任务

请使用 playwright-cli 对「穿搭密码」项目进行完整自动化验证。

### 环境
- 服务地址：http://localhost:3000
- 数据状态：内存存储，刷新丢失
- 测试图片：~/test-clothes.png（需提前用 ImageMagick 创建）

### 准备测试图片
```bash
convert -size 300x300 xc:white \
  -fill red -draw "rectangle 50,50 250,250" \
  ~/test-clothes.png
```

### 完整测试流程

#### 路径 1：新增衣服完整流程
```bash
# 1. 进入上传页
playwright-cli goto http://localhost:3000/upload

# 2. 模拟文件选择（核心）
playwright-cli setInputFiles "data-testid=file-input" ~/test-clothes.png
sleep 2

# 3. 截图确认页
playwright-cli screenshot --filename=test-results/01-upload-confirm.png

# 4. 修改标签
playwright-cli click "data-testid=category-tops"
playwright-cli screenshot --filename=test-results/02-upload-category.png

# 5. 保存
playwright-cli click "data-testid=save-clothing"
sleep 2

# 6. 验证衣橱有新衣服
playwright-cli goto http://localhost:3000/wardrobe
playwright-cli screenshot --filename=test-results/03-wardrobe-with-item.png
```

#### 路径 2：添加多件衣服 + 生成穿搭
```bash
# 重复路径1，添加至少5件衣服后测试：
playwright-cli goto http://localhost:3000/daily-fit
playwright-cli screenshot --filename=test-results/04-daily-fit-weather.png
playwright-cli click "data-testid=scene-casual"
playwright-cli click "data-testid=generate-outfits"
sleep 2
playwright-cli screenshot --filename=test-results/05-daily-fit-outfits.png
```

#### 路径 3：风格报告
```bash
playwright-cli goto http://localhost:3000/style-report
playwright-cli screenshot --filename=test-results/06-style-report-empty.png
playwright-cli click "data-testid=generate-insight-btn"
sleep 3
playwright-cli screenshot --filename=test-results/07-style-report-result.png
```

#### 路径 4：形象分析完整流程
```bash
playwright-cli goto http://localhost:3000/profile
playwright-cli screenshot --filename=test-results/08-profile-skin.png
playwright-cli click "data-testid=skin-warm-light"
playwright-cli click "data-testid=next-to-body"
playwright-cli screenshot --filename=test-results/09-profile-body.png
playwright-cli click "data-testid=body-apple"
playwright-cli click "data-testid=save-profile"
sleep 2
playwright-cli screenshot --filename=test-results/10-profile-result.png
```

### 要求

1. 每完成一项，在验证清单对应行的"状态"列打 ✅
2. 如果失败，记录错误信息到"备注"列
3. 截图保存到 `test-results/` 目录，命名格式：`{序号}-{功能名}.png`
4. 返回测试报告（含通过/失败/跳过数量）
```

---

## 测试执行检查清单

- [ ] 测试图片已创建（~/test-clothes.png）
- [ ] dev server 运行中（lsof -i :3000）
- [ ] test-results/ 目录存在
- [ ] 路径 1-4 全部执行完成
- [ ] 所有截图已保存
- [ ] TESTING_CHECKLIST.md 状态列已更新
- [ ] 发现的问题已记录到备注