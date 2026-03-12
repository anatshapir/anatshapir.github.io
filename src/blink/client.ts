import { createClient } from '@blinkdotnew/sdk'

export const blink = createClient({
  projectId: import.meta.env.VITE_BLINK_PROJECT_ID || 'anat-favorites-hub-id4aws1q',
  auth: { mode: 'managed' },
})

export interface Material {
  id: string
  title: string
  description: string
  category: 'teaching' | 'general'
  subcategory: string
  content: string
  linkUrl: string
  imageUrl: string
  userId: string
  createdAt: string
  updatedAt: string
}

export interface Subcategory {
  id: string
  name: string
  category: 'teaching' | 'general'
  userId: string
  createdAt: string
}
