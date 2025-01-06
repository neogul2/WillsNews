import { NewsCardProps } from '@/types/news'

export const newsData: NewsCardProps[] = [
  {
    id: 1,
    title: "The Road Ahead",
    description: "The road ahead might be paved - it might not be.",
    imageUrl: "https://images.unsplash.com/photo-1484950763426-56b5bf172dbb?ixlib=rb-4.0.3",
    date: "September 25, 2015",
    category: "PHOTOGRAPHY",
    author: {
      name: "Mat Vogels",
      avatar: "https://i.pravatar.cc/150?img=3"
    }
  },
  {
    id: 2,
    title: "From Top Down",
    description: "Once a year, go someplace you've never been before.",
    imageUrl: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?ixlib=rb-4.0.3",
    date: "September 25, 2015",
    category: "ADVENTURE",
    author: {
      name: "William Wong",
      avatar: "https://i.pravatar.cc/150?img=4"
    }
  },
  {
    id: 3,
    title: "Still Standing Tall",
    description: "Life begins at the end of your comfort zone.",
    imageUrl: "https://images.unsplash.com/photo-1482192505345-5655af888cc4?ixlib=rb-4.0.3",
    date: "September 25, 2015",
    category: "NATURE",
    author: {
      name: "William Wong",
      avatar: "https://i.pravatar.cc/150?img=4"
    }
  }
] 