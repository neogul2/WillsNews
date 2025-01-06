'use client'

import styled from 'styled-components'
import NewsCard from '@/components/NewsCard'
import { newsData } from '@/data/newsData'

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

export default function Home() {
  return (
    <Container>
      <Hero>
        <HeroTitle>William's News Adventure </HeroTitle>
        <HeroSubtitle>Explore, Learn, and Grow with Every Article - by dad </HeroSubtitle>
      </Hero>
      <Content>
        <Grid>
          {newsData.map(({ id, ...news }) => (
            <NewsCard
              key={id}
              {...news}
            />
          ))}
        </Grid>
      </Content>
    </Container>
  )
}
