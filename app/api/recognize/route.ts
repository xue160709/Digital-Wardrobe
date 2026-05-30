import { NextRequest, NextResponse } from 'next/server'

// 衣物识别 API Route
// 入口日志在调用方（upload/page.tsx）已记录，这里仅记录服务端处理

// 模拟 AI 识别结果（实际项目中应调用 MiniMax 或第三方图像识别 API）
function mockRecognize(imageUrl: string) {
  const categories = ['tops', 'bottoms', 'dresses', 'outerwear', 'shoes', 'accessories']
  const colors = ['black', 'white', 'gray', 'blue', 'pink', 'brown', 'beige', 'navy']
  const styles = ['简约', '休闲', '正式', '甜美', '文艺', '街头']

  // 随机返回识别结果
  const randomCategory = categories[Math.floor(Math.random() * categories.length)]
  const randomColor = colors[Math.floor(Math.random() * colors.length)]
  const randomStyles = styles.sort(() => Math.random() - 0.5).slice(0, 2)

  return {
    category: randomCategory,
    color: randomColor,
    styleTags: randomStyles,
  }
}

export async function POST(req: NextRequest) {
  const tag = '[api/recognize]'

  try {
    const body = await req.json()
    const { imageUrl } = body

    if (!imageUrl) {
      console.error(tag, 'fail', { reason: 'missing imageUrl' })
      return NextResponse.json({ success: false, error: '缺少图片' }, { status: 400 })
    }

    // 记录输入长度（脱敏：不记录图片原文）
    const inputLen = imageUrl.length
    console.log(tag, 'enter', { inputLen })

    const t0 = Date.now()

    // 实际项目中这里调用 MiniMax Vision API 或其他图像识别服务
    // 当前为 MVP 使用 mock 数据
    const result = mockRecognize(imageUrl)

    console.log(tag, 'success', { result, ms: Date.now() - t0 })

    return NextResponse.json({
      success: true,
      result,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'unknown'
    console.error(tag, 'fail', { message })
    return NextResponse.json({ success: false, error: '识别失败' }, { status: 500 })
  }
}