'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Shirt, CalendarDays, BarChart3, User, Heart } from 'lucide-react'

const tabs = [
  { href: '/wardrobe', label: '衣橱', icon: Shirt },
  { href: '/daily-fit', label: '今日', icon: CalendarDays },
  { href: '/style-report', label: '报告', icon: BarChart3 },
  { href: '/profile', label: '形象', icon: User },
  { href: '/my', label: '我的', icon: Heart },
]

export function TabBar() {
  const pathname = usePathname()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-border"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0)' }}
    >
      <div className="flex items-center justify-around h-14">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href || pathname?.startsWith(tab.href + '/')
          const Icon = tab.icon

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center w-16 h-full touch-target transition-colors duration-150 ${
                isActive ? 'text-primary' : 'text-foreground-secondary'
              }`}
              aria-label={tab.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] mt-0.5 font-medium">{tab.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}