import { NextRequest, NextResponse } from 'next/server'

interface StatsData {
  totalItems: number
  styleBreakdown?: Record<string, number>
  colorBreakdown?: Record<string, number>
}

export async function POST(req: NextRequest) {
  const tag = '[api/generate-style-report]'

  try {
    const body = await req.json()
    const stats: StatsData = body.stats

    if (!stats) {
      console.error(tag, 'fail', { reason: 'missing stats' })
      return NextResponse.json({ success: false, error: '缺少统计数据' }, { status: 400 })
    }

    console.log(tag, 'enter', { totalItems: stats.totalItems })

    const t0 = Date.now()

    // 实际项目中调用 MiniMax LLM 生成风格解读
    // 当前 MVP 使用本地分析生成文案
    const styleEntries = Object.entries(stats.styleBreakdown || {})
      .sort((a, b) => b[1] - a[1])
    const colorEntries = Object.entries(stats.colorBreakdown || {})
      .sort((a, b) => b[1] - a[1])

    const topStyle = styleEntries[0]
    const topColor = colorEntries[0]

    let insight = `你的衣橱共有 ${stats.totalItems} 件衣服。`

    if (topStyle) {
      const styleLabels: Record<string, string> = {
        '简约': '简洁大方，注重剪裁和质感',
        '休闲': '放松舒适，适合日常穿着',
        '正式': '端庄得体，适合工作场合',
        '甜美': '柔和温馨，带有女性化元素',
        '酷帅': '个性鲜明，帅气干练',
        '文艺': '气质独特，富有书卷气',
        '优雅': '精致高贵，女人味十足',
        '街头': '随性自由，潮流感强',
      }
      insight += `最喜欢的风格是「${topStyle[0]}」，${styleLabels[topStyle[0]] || '特点鲜明'}。`
    }

    if (topColor) {
      const colorLabels: Record<string, string> = {
        'black': '沉稳内敛',
        'white': '干净纯粹',
        'gray': '低调百搭',
        'blue': '沉静理智',
        'pink': '温柔浪漫',
        'brown': '温暖复古',
        'beige': '柔和自然',
        'navy': '深邃内敛',
      }
      insight += `最常穿的颜色是${colorLabels[topColor[0]] || '富有特色'}的「${topColor[0]}」。`
    }

    console.log(tag, 'success', { insightLength: insight.length, ms: Date.now() - t0 })

    return NextResponse.json({
      success: true,
      result: { insight },
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'unknown'
    console.error(tag, 'fail', { message })
    return NextResponse.json({ success: false, error: '生成失败' }, { status: 500 })
  }
}