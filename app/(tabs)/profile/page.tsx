'use client'

import { useState, useEffect } from 'react'
import { User, Droplet, Ruler, Sparkles, Loader2 } from 'lucide-react'
import { getUserProfile, saveUserProfile } from '@/lib/store'
import { UserProfile } from '@/lib/types'
import { EmptyState } from '@/components/EmptyState'

const SKIN_TONES = [
  { key: 'warm-light', label: '暖色调-浅春型', description: '皮肤偏黄，色调温暖，适合暖色系', color: '#F5DEB3' },
  { key: 'warm-deep', label: '暖色调-深秋型', description: '皮肤偏深，色调温暖，适合浓郁暖色', color: '#D2691E' },
  { key: 'cool-light', label: '冷色调-浅冬型', description: '皮肤偏白，色调冷峻，适合冷色系', color: '#FFE4E1' },
  { key: 'cool-deep', label: '冷色调-深冬型', description: '皮肤偏深，色调冷峻，适合深冷色', color: '#8B4513' },
]

const BODY_TYPES = [
  { key: 'apple', label: '苹果型', description: '腹部偏胖，四肢纤细', icon: '🍎' },
  { key: 'pear', label: '梨型', description: '臀部偏宽，肩胸较窄', icon: '🍐' },
  { key: 'hourglass', label: '沙漏型', description: '肩胸和臀部宽，腰细', icon: '⏳' },
  { key: 'h-shape', label: 'H型', description: '肩胸、腰、臀宽度接近', icon: '📏' },
  { key: 'inverted-triangle', label: '倒三角型', description: '肩胸宽，臀部窄', icon: '🔻' },
]

const STYLE_SUGGESTIONS = [
  { style: '优雅通勤风', colors: ['米色', '藏蓝', '驼色'], desc: '适合职场和正式场合' },
  { style: '文艺清新风', colors: ['白色', '浅蓝', '草木绿'], desc: '日常和休闲场合' },
  { style: '轻奢名媛风', colors: ['黑色', '酒红', '香槟金'], desc: '约会和重要场合' },
  { style: '简约休闲风', colors: ['灰色', '浅粉', '天蓝'], desc: '周末和旅行' },
]

const SCENE_ADVICE = {
  commute: { label: '通勤', advice: '建议选择剪裁利落、颜色稳重的搭配，避免过于花哨' },
  casual: { label: '休闲', advice: '以舒适为主，可加入一些亮色点缀，提升活力感' },
  date: { label: '约会', advice: '可选择柔和色调和带有女性元素的设计，营造温婉气质' },
  formal: { label: '正式', advice: '选择深色系和质感好的面料，搭配简约配饰' },
}

type TabType = 'skin' | 'body' | 'result'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>('skin')
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [hasProfile, setHasProfile] = useState(false)

  // 肤色测试
  const [selectedSkin, setSelectedSkin] = useState<string | null>(null)

  // 身材测试
  const [selectedBody, setSelectedBody] = useState<string | null>(null)

  const loadProfile = () => {
    const userProfile = getUserProfile()
    setProfile(userProfile)
    setHasProfile(!!userProfile)
    if (userProfile?.skinTone) setSelectedSkin(userProfile.skinTone)
    if (userProfile?.bodyType) setSelectedBody(userProfile.bodyType)
  }

  useEffect(() => {
    loadProfile()
  }, [])

  const handleSkinSelect = (skin: string) => {
    setSelectedSkin(skin)
  }

  const handleBodySelect = (body: string) => {
    setSelectedBody(body)
  }

  const handleSave = () => {
    if (!selectedSkin || !selectedBody) return

    const newProfile: UserProfile = {
      skinTone: selectedSkin as UserProfile['skinTone'],
      bodyType: selectedBody as UserProfile['bodyType'],
      stylePreferences: [],
      createdAt: profile?.createdAt || Date.now(),
      updatedAt: Date.now(),
    }

    saveUserProfile(newProfile)
    setProfile(newProfile)
    setHasProfile(true)
    setActiveTab('result')
  }

  const getSkinToneInfo = (key: string) => SKIN_TONES.find(s => s.key === key)
  const getBodyTypeInfo = (key: string) => BODY_TYPES.find(b => b.key === key)

  const suggestedStyle = profile?.skinTone
    ? STYLE_SUGGESTIONS[Math.abs(profile.skinTone.charCodeAt(0) + profile.bodyType!.charCodeAt(0)) % STYLE_SUGGESTIONS.length]
    : STYLE_SUGGESTIONS[0]

  if (!hasProfile) {
    return (
      <div className="min-h-dvh bg-background pb-8">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <h1 className="text-2xl font-heading font-semibold text-foreground">
            形象分析
          </h1>
          <p className="text-sm text-foreground-secondary mt-1">
            了解你的专属风格定位
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab('skin')}
            className={`flex-1 flex flex-col items-center py-4 text-sm font-medium transition-colors ${
              activeTab === 'skin' ? 'text-primary border-b-2 border-primary' : 'text-foreground-secondary'
            }`}
            data-testid="tab-skin"
          >
            <Droplet size={20} className="mb-1" />
            肤色测试
          </button>
          <button
            onClick={() => setActiveTab('body')}
            className={`flex-1 flex flex-col items-center py-4 text-sm font-medium transition-colors ${
              activeTab === 'body' ? 'text-primary border-b-2 border-primary' : 'text-foreground-secondary'
            }`}
            data-testid="tab-body"
          >
            <Ruler size={20} className="mb-1" />
            身材分析
          </button>
          <button
            onClick={() => setActiveTab('result')}
            className={`flex-1 flex flex-col items-center py-4 text-sm font-medium transition-colors ${
              activeTab === 'result' ? 'text-primary border-b-2 border-primary' : 'text-foreground-secondary'
            }`}
            data-testid="tab-result"
          >
            <Sparkles size={20} className="mb-1" />
            分析结果
          </button>
        </div>

        <div className="p-4">
          {activeTab === 'skin' && (
            <div className="space-y-4">
              <p className="text-sm text-foreground-secondary mb-6">
                选择最接近你自然肤色的选项（无需美颜或化妆后的效果）
              </p>
              <div className="grid grid-cols-2 gap-4">
                {SKIN_TONES.map((skin) => (
                  <button
                    key={skin.key}
                    onClick={() => handleSkinSelect(skin.key)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      selectedSkin === skin.key
                        ? 'border-primary bg-muted'
                        : 'border-border hover:border-primary/50'
                    }`}
                    data-testid={`skin-${skin.key}`}
                  >
                    <div
                      className="w-full h-16 rounded-md mb-3 border border-border"
                      style={{ backgroundColor: skin.color }}
                    />
                    <h3 className="font-medium text-foreground">{skin.label}</h3>
                    <p className="text-xs text-foreground-secondary mt-1">{skin.description}</p>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setActiveTab('body')}
                disabled={!selectedSkin}
                className="w-full py-3 bg-primary text-on-primary font-medium rounded-lg disabled:opacity-50 touch-target"
                data-testid="next-to-body"
              >
                下一步
              </button>
            </div>
          )}

          {activeTab === 'body' && (
            <div className="space-y-4">
              <p className="text-sm text-foreground-secondary mb-6">
                选择最接近你身材特点的选项
              </p>
              <div className="space-y-3">
                {BODY_TYPES.map((body) => (
                  <button
                    key={body.key}
                    onClick={() => handleBodySelect(body.key)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      selectedBody === body.key
                        ? 'border-primary bg-muted'
                        : 'border-border hover:border-primary/50'
                    }`}
                    data-testid={`body-${body.key}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{body.icon}</span>
                      <div>
                        <h3 className="font-medium text-foreground">{body.label}</h3>
                        <p className="text-xs text-foreground-secondary">{body.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={handleSave}
                disabled={!selectedSkin || !selectedBody}
                className="w-full py-3 bg-primary text-on-primary font-medium rounded-lg disabled:opacity-50 touch-target"
                data-testid="save-profile"
              >
                完成分析
              </button>
            </div>
          )}

          {activeTab === 'result' && (
            <div className="text-center py-12">
              <Loader2 size={32} className="animate-spin text-primary mx-auto mb-4" />
              <p className="text-foreground-secondary">完成分析后查看结果</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  // 有画像时显示结果
  return (
    <div className="min-h-dvh bg-background pb-8">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h1 className="text-2xl font-heading font-semibold text-foreground">
          形象分析
        </h1>
        <p className="text-sm text-foreground-secondary mt-1">
          你的专属风格定位
        </p>
      </div>

      <div className="p-4 space-y-6">
        {/* Skin Tone Result */}
        {profile?.skinTone && (
          <section className="bg-surface rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Droplet size={20} className="text-primary" />
              <h2 className="font-heading font-semibold">肤色类型</h2>
            </div>
            {(() => {
              const info = getSkinToneInfo(profile.skinTone!)
              return info ? (
                <div className="flex items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-lg border border-border"
                    style={{ backgroundColor: info.color }}
                  />
                  <div>
                    <p className="font-medium">{info.label}</p>
                    <p className="text-sm text-foreground-secondary">{info.description}</p>
                  </div>
                </div>
              ) : null
            })()}
          </section>
        )}

        {/* Body Type Result */}
        {profile?.bodyType && (
          <section className="bg-surface rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <User size={20} className="text-primary" />
              <h2 className="font-heading font-semibold">身材类型</h2>
            </div>
            {(() => {
              const info = getBodyTypeInfo(profile.bodyType!)
              return info ? (
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{info.icon}</span>
                  <div>
                    <p className="font-medium">{info.label}</p>
                    <p className="text-sm text-foreground-secondary">{info.description}</p>
                  </div>
                </div>
              ) : null
            })()}
          </section>
        )}

        {/* Style Suggestion */}
        {profile?.skinTone && profile?.bodyType && (
          <section className="bg-surface rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={20} className="text-primary" />
              <h2 className="font-heading font-semibold">推荐风格</h2>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <h3 className="font-medium text-foreground mb-2">{suggestedStyle.style}</h3>
              <p className="text-sm text-foreground-secondary mb-3">{suggestedStyle.desc}</p>
              <div className="flex flex-wrap gap-2">
                {suggestedStyle.colors.map((color) => (
                  <span key={color} className="px-3 py-1 bg-surface text-sm rounded-full">
                    {color}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Scene-based Advice */}
        <section className="bg-surface rounded-lg p-4 shadow-sm">
          <h2 className="font-heading font-semibold mb-3">场合穿搭建议</h2>
          <div className="space-y-4">
            {Object.entries(SCENE_ADVICE).map(([key, { label, advice }]) => (
              <div key={key} className="border-b border-border pb-3 last:border-0">
                <h3 className="text-sm font-medium text-foreground mb-1">{label}</h3>
                <p className="text-xs text-foreground-secondary">{advice}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Re-test Button */}
        <button
          onClick={() => {
            setHasProfile(false)
            setSelectedSkin(null)
            setSelectedBody(null)
            setActiveTab('skin')
          }}
          className="w-full py-3 border border-border text-foreground-secondary font-medium rounded-lg hover:bg-muted transition-colors touch-target"
          data-testid="retest"
        >
          重新测试
        </button>
      </div>
    </div>
  )
}