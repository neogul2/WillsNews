'use client'

import { NewsCardProps } from '@/types/news'
import * as S from './styles'

type NewsCardComponentProps = Omit<NewsCardProps, 'id'>

export default function NewsCard({ 
  title, 
  description, 
  imageUrl, 
  date,
  category,
  author 
}: NewsCardComponentProps) {
  return (
    <S.Card>
      <S.Image src={imageUrl} alt={title} />
      <S.Category>{category}</S.Category>
      <S.Content>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
        <S.Footer>
          <S.Author>
            {author.avatar && <S.Avatar src={author.avatar} alt={author.name} />}
            <S.AuthorName>{author.name}</S.AuthorName>
          </S.Author>
          <S.Date>{date}</S.Date>
        </S.Footer>
      </S.Content>
    </S.Card>
  )
} 