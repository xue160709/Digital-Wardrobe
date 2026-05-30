import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const tag = '[api/generate-outfit]'

  try {
    const body = await req.json()
    const { items, scene, weather, profile } = body

    if (!items || !Array.isArray(items) || items.length < 3) {
      console.error(tag, 'fail', { reason: 'insufficient items' })
      return NextResponse.json({ success: false, error: '衣物不足' }, { status: 400 })
    }

    console.log(tag, 'enter', {
      itemCount: items.length,
      scene,
      hasWeather: !!weather,
      hasProfile: !!profile,
    })

    const t0 = Date.now()

    // 简单分组算法（实际项目中应调用 MiniMax LLM）
    const shuffled = [...items].sort(() => Math.random() - 0.5)
    const outfits = []

    for (let i = 0; i < Math.min(3, Math.ceil(shuffled.length / 3)); i++) {
      const start = i * 3
      const outfitItems = shuffled.slice(start, start + 3)

      const sceneReasons: Record<string, string> = {
        commute: '利落干练的通勤穿搭，适合职场环境',
        casual: '轻松自在的休闲风格，周末出行首选',
        date: '温婉优雅的约会装扮，展现女性魅力',
        formal: '端庄得体的正式场合穿搭，彰显品味',
        sports: '舒适透气的运动搭配，活力满满',
      }

      outfits.push({
        id: `outfit-${i}`,
        items: outfitItems,
        reason: sceneReasons[scene] || '适合当前场景的穿搭方案',
      })
    }

    console.log(tag, 'success', { outfitCount: outfits.length, ms: Date.now() - t0 })

    return NextResponse.json({
      success: true,
      result: { outfits },
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'unknown'
    console.error(tag, 'fail', { message })
    return NextResponse.json({ success: false, error: '生成失败' }, { status: 500 })
  }
}