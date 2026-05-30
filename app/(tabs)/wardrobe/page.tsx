'use client'

import { useState, useEffect } from 'react'
import { Plus, Search, Filter } from 'lucide-react'
import Link from 'next/link'
import { ClothingItem, CATEGORY_LABELS } from '@/lib/types'
import { getWardrobeItems, deleteWardrobeItem } from '@/lib/store'
import { ClothingCard } from '@/components/ClothingCard'
import { EmptyState } from '@/components/EmptyState'

const CATEGORIES = [
  { key: 'all', label: '全部' },
  { key: 'tops', label: '上衣' },
  { key: 'bottoms', label: '下装' },
  { key: 'dresses', label: '裙装' },
  { key: 'outerwear', label: '外套' },
  { key: 'shoes', label: '鞋子' },
  { key: 'accessories', label: '配饰' },
]

export default function WardrobePage() {
  const [items, setItems] = useState<ClothingItem[]>([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  const loadItems = () => {
    const allItems = getWardrobeItems()
    setItems(allItems)
  }

  useEffect(() => {
    loadItems()
    // 监听storage变化（其他页面修改后同步）
    window.addEventListener('storage', loadItems)
    return () => window.removeEventListener('storage', loadItems)
  }, [])

  const filteredItems = items.filter(item => {
    // 分类筛选
    if (activeCategory !== 'all' && item.category !== activeCategory) {
      return false
    }
    // 搜索筛选
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        item.color.toLowerCase().includes(query) ||
        item.styleTags.some(tag => tag.toLowerCase().includes(query)) ||
        CATEGORY_LABELS[item.category].toLowerCase().includes(query)
      )
    }
    return true
  })

  const handleDelete = (id: string) => {
    deleteWardrobeItem(id)
    loadItems()
  }

  return (
    <div className="min-h-dvh bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-2xl font-heading font-semibold text-foreground">
              我的衣橱
            </h1>
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 touch-target rounded-md hover:bg-muted transition-colors"
              aria-label="搜索"
              data-testid="search-toggle"
            >
              <Search size={22} className="text-foreground-secondary" />
            </button>
          </div>

          {/* Search Bar */}
          {showSearch && (
            <div className="mb-3">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索衣服..."
                  className="w-full h-11 pl-10 pr-4 bg-surface border border-border rounded-lg text-base focus:border-primary focus:shadow-focus transition-all"
                  data-testid="search-input"
                />
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-secondary"
                />
              </div>
            </div>
          )}

          {/* Filter Bar */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-4 px-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all touch-target ${
                  activeCategory === cat.key
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-muted text-foreground-secondary hover:bg-border'
                }`}
                data-testid={`filter-${cat.key}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4">
        {filteredItems.length === 0 ? (
          <EmptyState
            type={items.length === 0 ? 'empty-wardrobe' : 'no-results'}
            onAction={items.length === 0 ? () => {} : undefined}
          />
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredItems.map((item, index) => (
              <ClothingCard
                key={item.id}
                item={item}
                onDelete={handleDelete}
                index={index}
              />
            ))}
          </div>
        )}
      </div>

      {/* Floating Add Button */}
      <Link
        href="/upload"
        className="fixed right-4 bottom-24 z-40 flex items-center justify-center w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg hover:bg-primary-hover active:scale-95 transition-all"
        data-testid="add-button"
        aria-label="添加衣服"
      >
        <Plus size={28} strokeWidth={2.5} />
      </Link>
    </div>
  )
}