import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '拍照录入 - 穿搭密码',
}

export default function UploadLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-dvh bg-background">
      {children}
    </div>
  )
}