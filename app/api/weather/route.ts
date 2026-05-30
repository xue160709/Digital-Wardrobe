import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const tag = '[api/weather]'

  try {
    const { searchParams } = new URL(req.url)
    const city = searchParams.get('city') || '北京'

    console.log(tag, 'enter', { city })

    const t0 = Date.now()

    // 使用 wttr.in API（免费无需 Key）
    // 注意：实际项目中应使用更可靠的数据源，这里作为 MVP 演示
    try {
      const response = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`, {
        next: { revalidate: 1800 }, // 缓存 30 分钟
      })

      if (!response.ok) {
        throw new Error('Weather API unavailable')
      }

      const data = await response.json()
      const current = data.current_condition?.[0]

      if (current) {
        // 正确：先统一转换为摄氏温度，再求平均
        // 华氏转摄氏：(temp_F - 32) * 5/9
        const tempFtoC = (parseInt(current.temp_F, 10) - 32) * 5 / 9
        const temp = Math.round((parseInt(current.temp_C, 10) + tempFtoC) / 2)
        const condition = getConditionFromCode(current.weatherCode)

        console.log(tag, 'success', { city, temp, condition, ms: Date.now() - t0 })

        return NextResponse.json({
          success: true,
          result: {
            temp,
            condition,
            city,
          },
        })
      }
    } catch {
      // wttr.in 不可用时返回降级数据
    }

    // 降级：返回默认天气
    console.log(tag, 'fallback', { city, reason: 'API unavailable' })

    return NextResponse.json({
      success: true,
      result: {
        temp: 22,
        condition: 'sunny',
        city,
      },
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'unknown'
    console.error(tag, 'fail', { message })
    return NextResponse.json({ success: false, error: '获取天气失败' }, { status: 500 })
  }
}

function getConditionFromCode(code: string): string {
  const weatherCode = parseInt(code, 10)
  if (weatherCode === 113) return 'sunny'
  if (weatherCode >= 116 && weatherCode <= 119) return 'cloudy'
  if (weatherCode >= 176 && weatherCode <= 263) return 'rainy'
  if (weatherCode >= 266 && weatherCode <= 299) return 'rainy'
  if (weatherCode >= 302 && weatherCode <= 359) return 'rainy'
  return 'sunny'
}