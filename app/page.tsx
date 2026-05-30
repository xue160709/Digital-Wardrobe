import { redirect } from 'next/navigation'

// 根路径重定向到衣橱页面（默认入口）
export default function RootPage() {
  redirect('/wardrobe')
}