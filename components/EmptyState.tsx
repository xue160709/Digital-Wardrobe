'use client'

import Link from 'next/link'
import { Shirt, Search, Plus } from 'lucide-react'

interface EmptyStateProps {
  type: 'empty-wardrobe' | 'no-results' | 'insufficient-items'
  onAction?: () => void
}

export function EmptyState({ type, onAction }: EmptyStateProps) {
  const content = {
    'empty-wardrobe': {
      icon: Shirt,
      title: '还没有衣服',
      description: '添加第一件衣服，开启你的穿搭之旅',
      action: '添加衣服',
      href: '/upload',
    },
    'no-results': {
      icon: Search,
      title: '暂无匹配',
      description: '试试换个关键词或筛选条件',
      action: undefined,
      href: undefined,
    },
    'insufficient-items': {
      icon: Shirt,
      title: '衣服不够',
      description: '至少上传 5 件衣服以生成准确的分析报告',
      action: '去添加',
      href: '/wardrobe',
    },
  }

  const { icon: Icon, title, description, action, href } = content[type]

  return (
    <div
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
      data-testid={`empty-state-${type}`}
    >
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
        <Icon size={40} className="text-foreground-secondary" />
      </div>
      <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
        {title}
      </h3>
      <p className="text-sm text-foreground-secondary mb-6 max-w-xs">
        {description}
      </p>
      {action && href && (
        <Link
          href={href}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-on-primary font-medium rounded-lg shadow-sm hover:bg-primary-hover transition-colors touch-target"
          data-testid="empty-state-action"
          onClick={onAction}
        >
          <Plus size={18} />
          {action}
        </Link>
      )}
    </div>
  )
}