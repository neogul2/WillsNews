'use client'

import * as S from './styles'

type NewsCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  category: string;
  author: {
    name: string;
    avatar?: string;
  };
}

export default function NewsCard({ title, description, imageUrl, date, category, author }: NewsCardProps) {
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