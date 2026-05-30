import { TabBar } from '@/components/TabBar'

export default function TabsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-dvh flex flex-col bg-background">
      <main className="flex-1 pb-20">
        {children}
      </main>
      <TabBar />
    </div>
  )
}