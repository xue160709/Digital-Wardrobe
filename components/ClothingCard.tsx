'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { ClothingItem, CATEGORY_LABELS } from '@/lib/types'

interface ClothingCardProps {
  item: ClothingItem
  onDelete: (id: string) => void
  index: number
}

export function ClothingCard({ item, onDelete, index }: ClothingCardProps) {
  const [showDelete, setShowDelete] = useState(false)

  return (
    <div
      className="relative bg-surface rounded-lg shadow-md overflow-hidden"
      data-testid={`clothing-card-${index}`}
      style={{ aspectRatio: '3/4' }}
    >
      {/* Image */}
      <div className="relative w-full h-full">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={CATEGORY_LABELS[item.category]}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <span className="text-foreground-secondary text-sm">无图片</span>
          </div>
        )}

        {/* Delete Button */}
        <button
          onClick={() => onDelete(item.id)}
          className="absolute top-2 right-2 p-2 bg-destructive/80 text-white rounded-full opacity-0 hover:opacity-100 transition-opacity touch-target"
          data-testid={`delete-${item.id}`}
          aria-label="删除"
          onMouseEnter={() => setShowDelete(true)}
          onMouseLeave={() => setShowDelete(false)}
          onFocus={() => setShowDelete(true)}
          onBlur={() => setShowDelete(false)}
        >
          <Trash2 size={16} />
        </button>

        {/* Category Tag */}
        <div className="absolute bottom-2 left-2">
          <span className="px-2 py-1 bg-foreground/70 text-white text-xs font-medium rounded-full">
            {CATEGORY_LABELS[item.category]}
          </span>
        </div>

        {/* Color Dot */}
        <div className="absolute bottom-2 right-2">
          <div
            className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
            style={{ backgroundColor: getColorHex(item.color) }}
            title={item.color}
          />
        </div>
      </div>
    </div>
  )
}

function getColorHex(colorName: string): string {
  const colorMap: Record<string, string> = {
    black: '#000000',
    white: '#FFFFFF',
    gray: '#9CA3AF',
    red: '#EF4444',
    orange: '#F97316',
    yellow: '#EAB308',
    green: '#22C55E',
    blue: '#3B82F6',
    purple: '#A855F7',
    pink: '#EC4899',
    brown: '#92400E',
    beige: '#D4C4A8',
    navy: '#1E3A5F',
    multicolor: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #ffe66d)',
  }
  return colorMap[colorName.toLowerCase()] || '#9CA3AF'
}