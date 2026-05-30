'use client'

import { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { Loader2, RefreshCw } from 'lucide-react'
import { getWardrobeStats, getWardrobeItems } from '@/lib/store'
import { EmptyState } from '@/components/EmptyState'
import { COLOR_LABELS, CATEGORY_LABELS } from '@/lib/types'

const COLORS = ['#BE185D', '#EC4899', '#D97706', '#10B981', '#3B82F6', '#8B5CF6', '#F59E0B']

export default function StyleReportPage() {
  const [stats, setStats] = useState<ReturnType<typeof getWardrobeStats> | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [insight, setInsight] = useState<string>('')

  const loadStats = () => {
    const wardrobeStats = getWardrobeStats()
    setStats(wardrobeStats)
    setIsLoading(false)
  }

  useEffect(() => {
    loadStats()
  }, [])

  const generateReport = async () => {
    if (!stats || stats.totalItems < 5) return

    setIsGenerating(true)

    try {
      const response = await fetch('/api/generate-style-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stats }),
      })

      const data = await response.json()

      if (data.success && data.result?.insight) {
        setInsight(data.result.insight)
      } else {
        // 降级：使用静态文案
        setInsight(generateFallbackInsight(stats))
      }
    } catch {
      setInsight(generateFallbackInsight(stats))
    } finally {
      setIsGenerating(false)
    }
  }

  const generateFallbackInsight = (s: ReturnType<typeof getWardrobeStats>) => {
    const topStyle = Object.entries(s.styleBreakdown).sort((a, b) => b[1] - a[1])[0]
    const topColor = Object.entries(s.colorBreakdown).sort((a, b) => b[1] - a[1])[0]

    let text = `你的衣橱共有 ${s.totalItems} 件衣服。`
    if (topStyle) {
      text += `最喜欢的风格是「${topStyle[0]}」（${topStyle[1]}件），`
    }
    if (topColor) {
      text += `最常穿的颜色是「${COLOR_LABELS[topColor[0]] || topColor[0]}」（${topColor[1]}件）。`
    }
    return text
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    )
  }

  if (!stats || stats.totalItems < 5) {
    return (
      <div className="min-h-dvh bg-background">
        <div className="p-4">
          <h1 className="text-2xl font-heading font-semibold text-foreground mb-4">
            风格报告
          </h1>
        </div>
        <EmptyState type="insufficient-items" />
      </div>
    )
  }

  // 准备图表数据
  const colorData = Object.entries(stats.colorBreakdown)
    .map(([name, value]) => ({
      name: COLOR_LABELS[name] || name,
      value,
      color: name,
    }))
    .sort((a, b) => b.value - a.value)

  const styleData = Object.entries(stats.styleBreakdown)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6)

  return (
    <div className="min-h-dvh bg-background pb-8">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h1 className="text-2xl font-heading font-semibold text-foreground">
          风格报告
        </h1>
        <p className="text-sm text-foreground-secondary mt-1">
          基于 {stats.totalItems} 件衣服的分析
        </p>
      </div>

      <div className="p-4 space-y-8">
        {/* Color Preferences */}
        <section>
          <h2 className="text-lg font-heading font-semibold mb-3">色彩偏好</h2>
          <div className="bg-surface rounded-lg p-4 shadow-sm">
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={colorData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {colorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value}件`, '']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {colorData.map((item, index) => (
                <div key={item.name} className="flex items-center gap-1.5 text-sm">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-foreground-secondary">{item.name} ({item.value})</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Style Distribution */}
        <section>
          <h2 className="text-lg font-heading font-semibold mb-3">风格分布</h2>
          <div className="bg-surface rounded-lg p-4 shadow-sm">
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={styleData} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" width={60} tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(value) => [`${value}件`]} />
                  <Bar dataKey="value" fill="#BE185D" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* Category Breakdown */}
        <section>
          <h2 className="text-lg font-heading font-semibold mb-3">品类统计</h2>
          <div className="bg-surface rounded-lg p-4 shadow-sm">
            <div className="space-y-3">
              {Object.entries(stats.categoryBreakdown)
                .sort((a, b) => b[1] - a[1])
                .map(([cat, count]) => (
                  <div key={cat} className="flex items-center justify-between">
                    <span className="text-sm text-foreground-secondary">
                      {CATEGORY_LABELS[cat as keyof typeof CATEGORY_LABELS] || cat}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${(count / stats.totalItems) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-6 text-right">{count}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* AI Insight */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-heading font-semibold">AI 解读</h2>
            <button
              onClick={generateReport}
              disabled={isGenerating}
              className="p-2 text-primary hover:bg-muted rounded-full transition-colors touch-target disabled:opacity-50"
              data-testid="generate-insight"
              aria-label="重新生成解读"
            >
              <RefreshCw size={18} className={isGenerating ? 'animate-spin' : ''} />
            </button>
          </div>
          <div className="bg-surface rounded-lg p-4 shadow-sm">
            {isGenerating ? (
              <div className="flex items-center gap-3 text-foreground-secondary">
                <Loader2 size={20} className="animate-spin" />
                <span className="text-sm">分析中...</span>
              </div>
            ) : insight ? (
              <p className="text-foreground leading-relaxed">{insight}</p>
            ) : (
              <button
                onClick={generateReport}
                className="w-full py-3 bg-primary text-on-primary font-medium rounded-lg hover:bg-primary-hover transition-colors touch-target"
                data-testid="generate-insight-btn"
              >
                生成解读
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}