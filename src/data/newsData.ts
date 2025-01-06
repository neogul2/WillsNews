import { NewsItem } from '@/types/news';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx4k52QFP4n3bC3KB8_XjpDXIpICBrThwOLaP4ty8bCgwZs_jyFl77b3LRQ0eyy9Adr/exec';

export async function fetchNewsData(): Promise<NewsItem[]> {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching news data:', error);
    return [];
  }
} 