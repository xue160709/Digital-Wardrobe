'use client'

import { Settings, User, Trash2, Info } from 'lucide-react'

export default function MyPage() {
  return (
    <div className="min-h-dvh bg-background pb-8">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h1 className="text-2xl font-heading font-semibold text-foreground">
          我的
        </h1>
      </div>

      {/* User Info */}
      <div className="p-4">
        <div className="bg-surface rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <User size={32} className="text-foreground-secondary" />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-foreground">穿搭用户</h2>
              <p className="text-sm text-foreground-secondary">探索你的专属风格</p>
            </div>
          </div>
        </div>
      </div>

      {/* Settings List */}
      <div className="p-4 space-y-3">
        <div className="bg-surface rounded-lg shadow-sm">
          <button
            className="w-full flex items-center justify-between p-4 hover:bg-muted transition-colors touch-target"
            data-testid="settings-style-report"
          >
            <div className="flex items-center gap-3">
              <Settings size={20} className="text-foreground-secondary" />
              <span className="text-foreground">风格报告</span>
            </div>
            <span className="text-foreground-secondary text-sm">›</span>
          </button>

          <div className="border-t border-border" />

          <button
            className="w-full flex items-center justify-between p-4 hover:bg-muted transition-colors touch-target"
            data-testid="settings-profile"
          >
            <div className="flex items-center gap-3">
              <User size={20} className="text-foreground-secondary" />
              <span className="text-foreground">形象分析</span>
            </div>
            <span className="text-foreground-secondary text-sm">›</span>
          </button>

          <div className="border-t border-border" />

          <button
            className="w-full flex items-center justify-between p-4 hover:bg-muted transition-colors touch-target text-destructive"
            data-testid="settings-clear-data"
          >
            <div className="flex items-center gap-3">
              <Trash2 size={20} />
              <span>清除数据</span>
            </div>
            <span className="text-sm">›</span>
          </button>
        </div>

        {/* About */}
        <div className="bg-surface rounded-lg p-4 shadow-sm">
          <button
            className="w-full flex items-center justify-between hover:bg-muted transition-colors touch-target"
            data-testid="settings-about"
          >
            <div className="flex items-center gap-3">
              <Info size={20} className="text-foreground-secondary" />
              <span className="text-foreground">关于</span>
            </div>
            <span className="text-foreground-secondary text-sm">›</span>
          </button>
        </div>
      </div>

      {/* Version */}
      <div className="text-center text-sm text-foreground-secondary mt-8">
        <p>穿搭密码 v1.0.0</p>
      </div>
    </div>
  )
}