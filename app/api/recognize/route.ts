import { NextRequest, NextResponse } from 'next/server'

const tag = '[api/recognize]'

// SiliconFlow API 配置
const SILICONFLOW_API_KEY = process.env.SILICONFLOW_API_KEY
const VISION_MODEL = process.env.VISION_MODEL || 'Qwen/Qwen3-VL-8B-Instruct'

// 颜色名称到 key 的映射（用于将 AI 返回的中文颜色名转为 key）
const COLOR_NAME_TO_KEY: Record<string, string> = {
  '黑色': 'black', '白色': 'white', '灰色': 'gray', '红色': 'red',
  '橙色': 'orange', '黄色': 'yellow', '绿色': 'green', '蓝色': 'blue',
  '紫色': 'purple', '粉色': 'pink', '棕色': 'brown', '米色': 'beige',
  '藏蓝': 'navy', '多色': 'multicolor', '酒红': 'red', '深红': 'red',
}

function normalizeColorName(colorName: string): string {
  return COLOR_NAME_TO_KEY[colorName] || colorName.toLowerCase()
}

/**
 * 使用 SiliconFlow Vision API 识别衣服
 */
async function recognizeWithVision(imageUrl: string) {
  const apiUrl = 'https://api.siliconflow.cn/v1/chat/completions'

  const prompt = `你是一个专业的服装识别AI。请分析这张图片中的衣服，并返回JSON格式的识别结果。
要求：
1. 只返回有效的JSON，不要有其他文字
2. JSON格式如下：
{
  "category": "tops|bottoms|dresses|outerwear|shoes|accessories",
  "color": {"primary": "#颜色hex", "name": "颜色中文名"},
  "styleTags": ["风格1", "风格2"],
  "confidence": 0.0-1.0
}
3. category只选择一个最匹配的
4. color只选择一个主色
5. styleTags选择1-3个最匹配的风格标签

颜色可选：黑色、白色、灰色、红色、橙色、黄色、绿色、蓝色、紫色、粉色、棕色、米色、藏蓝
风格可选：简约、休闲、正式、甜美、酷帅、文艺、街头、复古、田园、商务、运动、韩风、日系、欧美`

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SILICONFLOW_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: VISION_MODEL,
      messages: [{
        role: 'user',
        content: [
          { type: 'text', text: prompt },
          { type: 'image_url', image_url: { url: imageUrl } }
        ]
      }]
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`SiliconFlow API error: ${response.status} - ${error}`)
  }

  const data = await response.json()
  const content = data.choices?.[0]?.message?.content

  if (!content) {
    throw new Error('No response content from vision model')
  }

  // 解析 JSON 响应
  try {
    // 尝试提取 JSON（可能有 markdown 格式）
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    let parsed
    if (jsonMatch) {
      parsed = JSON.parse(jsonMatch[0])
    } else {
      parsed = JSON.parse(content)
    }

    // 标准化返回格式：确保 category 和 color 是字符串 key
    // color 可能是中文名或 key，需要转换
    const colorValue = parsed.color?.name || parsed.color || 'black'
    const normalizedColor = normalizeColorName(colorValue)

    return {
      category: parsed.category || 'tops',
      color: normalizedColor, // 使用 key 如 'red'
      colorName: colorValue,   // 保留原始中文名
      styleTags: parsed.styleTags || ['简约'],
      confidence: parsed.confidence || 0.8,
    }
  } catch (parseError) {
    throw new Error(`Failed to parse vision response: ${content}`)
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { imageUrl } = body

    if (!imageUrl) {
      console.error(tag, 'fail', { reason: 'missing imageUrl' })
      return NextResponse.json({ success: false, error: '缺少图片' }, { status: 400 })
    }

    // 脱敏：只记录 URL 长度，不记录原文
    const inputLen = imageUrl.length
    console.log(tag, 'enter', { inputLen, model: VISION_MODEL })

    const t0 = Date.now()

    // 调用视觉模型识别
    const result = await recognizeWithVision(imageUrl)

    console.log(tag, 'success', { result, ms: Date.now() - t0 })

    return NextResponse.json({
      success: true,
      result,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'unknown'
    console.error(tag, 'fail', { message })
    return NextResponse.json({ success: false, error: `识别失败: ${message}` }, { status: 500 })
  }
}