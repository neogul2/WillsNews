export interface NewsCardProps {
  id: number
  title: string
  description: string
  imageUrl: string
  date: string
  category: string
  author: {
    name: string
    avatar?: string
  }
} 