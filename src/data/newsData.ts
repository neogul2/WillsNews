import { NewsItem } from '@/types/news';

interface RawNewsItem {
  날짜: string;
  제목: string;
  내용: string;
  카테고리: string;
  출처: string;
  어휘: string;
  Miscellaneous: string;
}

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw2cBFM2s2Akg0ZazGBWhzn6S1_ojiceAYkhTIZcsCz4CVNldcD8BwZDrx1kdV4c3x0/exec';

export async function fetchNewsData(): Promise<NewsItem[]> {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL);
    
    if (!response.ok) {
      console.error('Response not OK:', response.status);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Raw data from Google Sheet:', data);
    console.log('Fetched data:', data);

    if (!Array.isArray(data)) {
      console.error('Data is not an array:', data);
      throw new Error('Invalid data format received');
    }

    return data
      .filter((item: RawNewsItem) => item && item.날짜 && item.제목)
      .map((item: RawNewsItem) => ({
        날짜: formatDate(item.날짜),
        제목: item.제목?.trim() || '',
        내용: item.내용?.trim() || '',
        카테고리: item.카테고리?.trim() || '',
        출처: item.출처?.trim() || '',
        어휘: item.어휘?.trim() || '',
        Miscellaneous: item.Miscellaneous?.trim() || ''
      }));

  } catch (error) {
    console.error('Error fetching news data:', error);
    return [];
  }
}

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      return dateStr;
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  } catch {
    return dateStr;
  }
} 