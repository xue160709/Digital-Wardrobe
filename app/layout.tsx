import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '穿搭密码 - 了解自己，从穿搭开始',
  description: '你的智能穿搭助手，帮助你了解穿衣风格，获取每日穿搭推荐',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  )
}