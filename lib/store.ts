'use client'

import { ClothingItem, UserProfile } from './types'

// 简单内存存储，后续可升级为 IndexedDB
let wardrobeItems: ClothingItem[] = []
let userProfile: UserProfile | null = null

// 衣橱相关
export function getWardrobeItems(): ClothingItem[] {
  return [...wardrobeItems].sort((a, b) => b.createdAt - a.createdAt)
}

export function addWardrobeItem(item: ClothingItem): void {
  wardrobeItems.unshift(item)
}

export function deleteWardrobeItem(id: string): void {
  wardrobeItems = wardrobeItems.filter(item => item.id !== id)
}

export function updateWardrobeItem(id: string, updates: Partial<ClothingItem>): void {
  wardrobeItems = wardrobeItems.map(item =>
    item.id === id ? { ...item, ...updates } : item
  )
}

export function getWardrobeStats() {
  const categoryBreakdown: Record<string, number> = {}
  const colorBreakdown: Record<string, number> = {}
  const styleBreakdown: Record<string, number> = {}

  wardrobeItems.forEach(item => {
    categoryBreakdown[item.category] = (categoryBreakdown[item.category] || 0) + 1
    colorBreakdown[item.color] = (colorBreakdown[item.color] || 0) + 1
    item.styleTags.forEach(tag => {
      styleBreakdown[tag] = (styleBreakdown[tag] || 0) + 1
    })
  })

  return {
    totalItems: wardrobeItems.length,
    categoryBreakdown,
    colorBreakdown,
    styleBreakdown,
  }
}

// 用户画像相关
export function getUserProfile(): UserProfile | null {
  return userProfile
}

export function saveUserProfile(profile: UserProfile): void {
  userProfile = profile
}

// 内存持久化（后续升级 IndexedDB）
export function exportData() {
  return {
    wardrobeItems,
    userProfile,
    exportedAt: Date.now(),
  }
}

export function importData(data: { wardrobeItems?: ClothingItem[]; userProfile?: UserProfile }) {
  if (data.wardrobeItems) {
    wardrobeItems = data.wardrobeItems
  }
  if (data.userProfile) {
    userProfile = data.userProfile
  }
}