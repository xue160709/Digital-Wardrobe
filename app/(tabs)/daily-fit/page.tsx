'use client'

import { useState, useEffect } from 'react'
import { Cloud, Sun, CloudRain, RefreshCw, Loader2, MapPin } from 'lucide-react'
import { getWardrobeItems, getWardrobeStats, getUserProfile } from '@/lib/store'
import { ClothingItem, SceneType, SCENE_LABELS, CATEGORY_LABELS } from '@/lib/types'
import { EmptyState } from '@/components/EmptyState'

const SCENES: SceneType[] = ['commute', 'casual', 'date', 'formal', 'sports']

const WEATHER_ICONS: Record<string, React.ReactNode> = {
  sunny: <Sun size={24} className="text-yellow-500" />,
  cloudy: <Cloud size={24} className="text-gray-400" />,
  rainy: <CloudRain size={24} className="text-blue-400" />,
}

interface OutfitRecommendation {
  id: string
  items: ClothingItem[]
  reason: string
}

export default function DailyFitPage() {
  const [weather, setWeather] = useState<{ temp: number; condition: string; city: string } | null>(null)
  const [isLoadingWeather, setIsLoadingWeather] = useState(true)
  const [selectedScene, setSelectedScene] = useState<SceneType>('commute')
  const [recommendations, setRecommendations] = useState<OutfitRecommendation[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [hasEnoughClothes, setHasEnoughClothes] = useState(true)

  useEffect(() => {
    fetchWeather()
    checkWardrobe()
  }, [])

  const fetchWeather = async () => {
    setIsLoadingWeather(true)
    try {
      const response = await fetch('/api/weather?city=北京')
      const data = await response.json()
      if (data.success) {
        setWeather(data.result)
      } else {
        // 降级
        setWeather({ temp: 22, condition: 'sunny', city: '北京' })
      }
    } catch {
      setWeather({ temp: 22, condition: 'sunny', city: '北京' })
    } finally {
      setIsLoadingWeather(false)
    }
  }

  const checkWardrobe = () => {
    const stats = getWardrobeStats()
    setHasEnoughClothes(stats.totalItems >= 5)
  }

  const generateRecommendations = async () => {
    if (!hasEnoughClothes) return

    setIsGenerating(true)

    try {
      const items = getWardrobeItems()
      const profile = getUserProfile()

      const response = await fetch('/api/generate-outfit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          scene: selectedScene,
          weather,
          profile,
        }),
      })

      const data = await response.json()

      if (data.success && data.result?.outfits) {
        setRecommendations(data.result.outfits)
      } else {
        // 降级：本地随机生成
        setRecommendations(generateFallbackOutfits(items))
      }
    } catch {
      const items = getWardrobeItems()
      setRecommendations(generateFallbackOutfits(items))
    } finally {
      setIsGenerating(false)
    }
  }

  const generateFallbackOutfits = (items: ClothingItem[]): OutfitRecommendation[] => {
    if (items.length < 3) return []

    // 简单随机分组
    const shuffled = [...items].sort(() => Math.random() - 0.5)
    const outfits: OutfitRecommendation[] = []

    for (let i = 0; i < Math.min(3, Math.ceil(shuffled.length / 3)); i++) {
      const start = i * 3
      const outfitItems = shuffled.slice(start, start + 3)

      outfits.push({
        id: `outfit-${i}`,
        items: outfitItems,
        reason: SCENE_LABELS[selectedScene] + '穿搭推荐',
      })
    }

    return outfits
  }

  const handleSceneChange = (scene: SceneType) => {
    setSelectedScene(scene)
    setRecommendations([])
  }

  const handleRefresh = () => {
    generateRecommendations()
  }

  const getWeatherIcon = (condition: string) => {
    return WEATHER_ICONS[condition] || <Sun size={24} className="text-yellow-500" />
  }

  if (!hasEnoughClothes) {
    return (
      <div className="min-h-dvh bg-background">
        <div className="p-4">
          <h1 className="text-2xl font-heading font-semibold text-foreground mb-4">
            今日穿搭
          </h1>
        </div>
        <EmptyState type="insufficient-items" />
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-background pb-8">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h1 className="text-2xl font-heading font-semibold text-foreground">
          今日穿搭
        </h1>

        {/* Weather Badge */}
        {weather && (
          <div className="flex items-center gap-2 mt-2 text-sm text-foreground-secondary">
            {isLoadingWeather ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <>
                <MapPin size={14} />
                <span>{weather.city}</span>
                {getWeatherIcon(weather.condition)}
                <span>{weather.temp}°C</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Scene Selector */}
      <div className="p-4 border-b border-border">
        <p className="text-sm text-foreground-secondary mb-3">选择场景</p>
        <div className="flex flex-wrap gap-2">
          {SCENES.map((scene) => (
            <button
              key={scene}
              onClick={() => handleSceneChange(scene)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all touch-target ${
                selectedScene === scene
                  ? 'bg-primary text-on-primary'
                  : 'bg-muted text-foreground-secondary hover:bg-border'
              }`}
              data-testid={`scene-${scene}`}
            >
              {SCENE_LABELS[scene]}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {recommendations.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              {isGenerating ? (
                <Loader2 size={40} className="animate-spin text-primary" />
              ) : (
                <Cloud size={40} className="text-foreground-secondary" />
              )}
            </div>
            {isGenerating ? (
              <p className="text-foreground-secondary">正在为你搭配...</p>
            ) : (
              <>
                <p className="text-foreground-secondary mb-6">
                  根据天气和场景为你推荐穿搭方案
                </p>
                <button
                  onClick={handleRefresh}
                  className="px-6 py-3 bg-primary text-on-primary font-medium rounded-lg shadow-sm hover:bg-primary-hover transition-colors touch-target"
                  data-testid="generate-outfits"
                >
                  开始搭配
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {recommendations.map((outfit) => (
              <div
                key={outfit.id}
                className="bg-surface rounded-lg shadow-sm overflow-hidden"
                data-testid={`outfit-${outfit.id}`}
              >
                {/* Outfit Items */}
                <div className="flex gap-2 p-3 overflow-x-auto">
                  {outfit.items.map((item, idx) => (
                    <div
                      key={item.id}
                      className="flex-shrink-0 w-24"
                      style={{ aspectRatio: '3/4' }}
                    >
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={CATEGORY_LABELS[item.category]}
                          className="w-full h-full object-cover rounded-md"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted rounded-md flex items-center justify-center">
                          <span className="text-xs text-foreground-secondary">
                            {CATEGORY_LABELS[item.category]}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Reason */}
                <div className="px-3 pb-3">
                  <p className="text-sm text-foreground-secondary">{outfit.reason}</p>
                </div>
              </div>
            ))}

            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              disabled={isGenerating}
              className="w-full py-3 border border-border text-foreground-secondary font-medium rounded-lg hover:bg-muted transition-colors touch-target flex items-center justify-center gap-2"
              data-testid="refresh-outfits"
            >
              {isGenerating ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <RefreshCw size={18} />
              )}
              换一批
            </button>
          </div>
        )}
      </div>
    </div>
  )
}