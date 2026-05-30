export interface ClothingItem {
  id: string
  imageUrl: string
  category: 'tops' | 'bottoms' | 'dresses' | 'outerwear' | 'shoes' | 'accessories'
  color: string
  colorType: 'warm' | 'cool' | 'neutral'
  styleTags: string[]
  createdAt: number
}

export interface UserProfile {
  skinTone?: 'warm-light' | 'warm-deep' | 'cool-light' | 'cool-deep'
  bodyType?: 'apple' | 'pear' | 'hourglass' | 'h-shape' | 'inverted-triangle'
  stylePreferences: string[]
  wardrobeStats?: {
    totalItems: number
    categoryBreakdown: Record<string, number>
    colorBreakdown: Record<string, number>
    styleBreakdown: Record<string, number>
  }
  createdAt: number
  updatedAt: number
}

export interface StyleReport {
  colorPreferences: { name: string; percentage: number; hex: string }[]
  topStyles: { name: string; count: number }[]
  styleKeywords: string[]
  occasionBreakdown: { name: string; percentage: number }[]
  insight: string
  generatedAt: number
}

export interface FitRecommendation {
  id: string
  outfits: {
    id: string
    items: ClothingItem[]
    reason: string
  }[]
  weather?: {
    temp: number
    condition: string
    city: string
  }
  scene: 'commute' | 'date' | 'casual' | 'formal' | 'sports'
  generatedAt: number
}

export type SceneType = 'commute' | 'date' | 'casual' | 'formal' | 'sports'

export const CATEGORY_LABELS: Record<ClothingItem['category'], string> = {
  tops: '上衣',
  bottoms: '下装',
  dresses: '裙装',
  outerwear: '外套',
  shoes: '鞋子',
  accessories: '配饰',
}

export const COLOR_LABELS: Record<string, string> = {
  black: '黑色',
  white: '白色',
  gray: '灰色',
  red: '红色',
  orange: '橙色',
  yellow: '黄色',
  green: '绿色',
  blue: '蓝色',
  purple: '紫色',
  pink: '粉色',
  brown: '棕色',
  beige: '米色',
  navy: '藏蓝',
  multicolor: '多色',
}

export const STYLE_TAGS = [
  '简约', '休闲', '正式', '甜美', '酷帅', '文艺', '优雅', '街头',
  '复古', '田园', '商务', '运动', '波西米亚', '韩风', '日系', '欧美'
]

export const SCENE_LABELS: Record<SceneType, string> = {
  commute: '通勤',
  date: '约会',
  casual: '休闲',
  formal: '正式',
  sports: '运动',
}