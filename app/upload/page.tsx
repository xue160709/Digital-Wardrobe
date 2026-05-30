'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Camera, Image, X, Check, Loader2 } from 'lucide-react'
import { ClothingItem, CATEGORY_LABELS, COLOR_LABELS, STYLE_TAGS } from '@/lib/types'
import { addWardrobeItem } from '@/lib/store'

const CATEGORIES = Object.entries(CATEGORY_LABELS)
const COLORS = Object.entries(COLOR_LABELS)

export default function UploadPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [step, setStep] = useState<'capture' | 'confirm'>('capture')
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isRecognizing, setIsRecognizing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [category, setCategory] = useState<ClothingItem['category'] | ''>('')
  const [color, setColor] = useState('')
  const [selectedStyles, setSelectedStyles] = useState<string[]>([])

  const handleCapture = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Create preview URL
    const reader = new FileReader()
    reader.onload = (ev) => {
      const url = ev.target?.result as string
      setImageUrl(url)
      setStep('confirm')
      // 自动识别（模拟）
      autoRecognize(url)
    }
    reader.readAsDataURL(file)
  }

  const autoRecognize = async (url: string) => {
    setIsRecognizing(true)
    setError(null)

    try {
      const response = await fetch('/api/recognize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: url }),
      })

      const data = await response.json()

      if (data.success && data.result) {
        if (data.result.category) setCategory(data.result.category)
        if (data.result.color) setColor(data.result.color)
        if (data.result.styleTags?.length) setSelectedStyles(data.result.styleTags)
      }
    } catch {
      // 识别失败，使用默认空值，用户手动填写
    } finally {
      setIsRecognizing(false)
    }
  }

  const toggleStyle = (style: string) => {
    setSelectedStyles(prev =>
      prev.includes(style)
        ? prev.filter(s => s !== style)
        : [...prev, style]
    )
  }

  const handleSave = async () => {
    if (!imageUrl || !category || !color) {
      setError('请完善信息')
      return
    }

    setIsSaving(true)
    setError(null)

    try {
      const item: ClothingItem = {
        id: `clothing-${Date.now()}`,
        imageUrl,
        category,
        color,
        colorType: 'neutral',
        styleTags: selectedStyles,
        createdAt: Date.now(),
      }

      addWardrobeItem(item)
      // 触发 storage 事件通知其他页面
      window.dispatchEvent(new Event('storage'))
      router.push('/wardrobe')
    } catch {
      setError('保存失败，请重试')
      setIsSaving(false)
    }
  }

  const handleClose = () => {
    router.push('/wardrobe')
  }

  if (step === 'capture') {
    return (
      <div className="min-h-dvh flex flex-col bg-foreground">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 p-4">
          <button
            onClick={handleClose}
            className="p-2 bg-foreground/50 text-white rounded-full touch-target"
            aria-label="关闭"
            data-testid="close-upload"
          >
            <X size={24} />
          </button>
        </div>

        {/* Camera/Upload Area */}
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="text-center text-white mb-8">
            <Camera size={64} className="mx-auto mb-4 opacity-80" />
            <h2 className="text-xl font-heading font-semibold mb-2">拍摄衣服照片</h2>
            <p className="text-sm text-white/70">
              将衣服平铺或挂起拍摄，确保光线充足
            </p>
          </div>

          <button
            onClick={handleCapture}
            className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:bg-primary-hover active:scale-95 transition-all"
            data-testid="capture-button"
            aria-label="拍照"
          >
            <Camera size={36} />
          </button>

          <p className="text-white/60 text-sm mt-4">或</p>

          <button
            onClick={handleCapture}
            className="mt-4 px-6 py-3 bg-white/20 text-white rounded-lg font-medium hover:bg-white/30 transition-colors touch-target"
            data-testid="album-button"
          >
            <Image size={18} className="inline mr-2" />
            从相册选择
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
          data-testid="file-input"
        />
      </div>
    )
  }

  // Confirm step
  return (
    <div className="min-h-dvh bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={handleClose}
            className="p-2 -ml-2 text-foreground-secondary hover:text-foreground touch-target rounded-md"
            aria-label="取消"
            data-testid="cancel-upload"
          >
            <X size={24} />
          </button>
          <h1 className="text-lg font-heading font-semibold">确认衣服信息</h1>
          <button
            onClick={handleSave}
            disabled={isSaving || !category || !color}
            className="p-2 -mr-2 text-primary disabled:opacity-50 touch-target rounded-md"
            aria-label="保存"
            data-testid="save-clothing"
          >
            {isSaving ? <Loader2 size={24} className="animate-spin" /> : <Check size={24} />}
          </button>
        </div>
      </div>

      {/* Preview */}
      {imageUrl && (
        <div className="relative aspect-[3/4] bg-muted mx-4 mt-4 rounded-lg overflow-hidden">
          <img src={imageUrl} alt="预览" className="w-full h-full object-contain" />
          {isRecognizing && (
            <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
              <div className="text-white text-center">
                <Loader2 size={32} className="animate-spin mx-auto mb-2" />
                <p className="text-sm">AI 识别中...</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Form */}
      <div className="p-4 space-y-6">
        {error && (
          <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg" data-testid="upload-error">
            {error}
          </div>
        )}

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">类别</label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(([key, label]) => (
              <button
                key={key}
                onClick={() => setCategory(key as ClothingItem['category'])}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all touch-target ${
                  category === key
                    ? 'bg-primary text-on-primary'
                    : 'bg-muted text-foreground-secondary hover:bg-border'
                }`}
                data-testid={`category-${key}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Color */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">颜色</label>
          <div className="flex flex-wrap gap-2">
            {COLORS.map(([key, label]) => (
              <button
                key={key}
                onClick={() => setColor(key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all touch-target ${
                  color === key
                    ? 'bg-primary text-on-primary'
                    : 'bg-muted text-foreground-secondary hover:bg-border'
                }`}
                data-testid={`color-${key}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Style Tags */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">风格（可多选）</label>
          <div className="flex flex-wrap gap-2">
            {STYLE_TAGS.map((style) => (
              <button
                key={style}
                onClick={() => toggleStyle(style)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all touch-target ${
                  selectedStyles.includes(style)
                    ? 'bg-primary text-on-primary'
                    : 'bg-muted text-foreground-secondary hover:bg-border'
                }`}
                data-testid={`style-${style}`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}