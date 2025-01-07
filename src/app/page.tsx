'use client'

import { useEffect, useState } from 'react'
import styled from 'styled-components'
import NewsCard from '@/components/NewsCard'
import { fetchNewsData } from '@/data/newsData'
import { NewsItem } from '@/types/news'

const Container = styled.main`
  width: 100%;
  min-height: 100vh;
  background: #f9f9f9;
`

const Hero = styled.div`
  width: 100%;
  height: 25vh;
  background-image: url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
  }
`

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: 500;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
`

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  position: relative;
  z-index: 1;
`

const Content = styled.div`
  max-width: 1200px;
  margin: -30px auto 0;
  padding: 0 20px;
  position: relative;
  z-index: 2;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 40px;
  padding: 20px;
`

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
`

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #ff4444;
`

export default function Home() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadNews() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchNewsData();
        const sortedData = data.sort((a, b) => {
          const dateA = new Date(a.날짜.replace(/\./g, '-'));
          const dateB = new Date(b.날짜.replace(/\./g, '-'));
          return dateB.getTime() - dateA.getTime();
        });
        setNewsItems(sortedData);
      } catch (err) {
        setError('Failed to load news data');
        console.error('Error loading news:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadNews();
  }, []);

  return (
    <Container>
      <Hero>
        <HeroTitle>Williams News Adventure</HeroTitle>
        <HeroSubtitle>Explore, Learn, and Grow with Every Article - by dad</HeroSubtitle>
      </Hero>
      <Content>
        <Grid>
          {isLoading ? (
            <LoadingMessage>Loading news...</LoadingMessage>
          ) : error ? (
            <ErrorMessage>{error}</ErrorMessage>
          ) : newsItems.length === 0 ? (
            <LoadingMessage>No news available</LoadingMessage>
          ) : (
            newsItems.map((news, index) => (
              <NewsCard
                key={index}
                title={news.제목}
                description={news.내용}
                category={news.카테고리}
                date={news.날짜}
                author={{
                  name: news.출처,
                  avatar: `https://i.pravatar.cc/150?img=${index + 1}`
                }}
                url={news.출처.startsWith('http') ? news.출처 : `https://${news.출처}`}
                imageUrl={`https://api.microlink.io?url=${encodeURIComponent(news.출처)}&screenshot=true&meta=false&embed=screenshot.url`}
                어휘={news.어휘}
                Miscellaneous={news.Miscellaneous}
                토론={news.토론}
              />
            ))
          )}
        </Grid>
      </Content>
    </Container>
  )
}
