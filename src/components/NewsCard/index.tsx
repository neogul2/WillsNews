'use client'

import { useCallback } from 'react'
import Swal from 'sweetalert2'
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
  url: string;
  어휘?: string;
  Miscellaneous?: string;
  토론?: string;
}

export default function NewsCard({ 
  title, 
  description, 
  imageUrl, 
  date, 
  category, 
  author,
  url,
  어휘,
  Miscellaneous,
  토론
}: NewsCardProps) {
  
  const handleClick = useCallback(() => {
    Swal.fire({
      title,
      html: `
        <div style="text-align: left; padding-top: 20px;">
          <div class="news-section">
            <img src="${imageUrl}" alt="${title}" class="news-image" />
          </div>

          <div class="news-section">
            <h3 class="news-label">내용</h3>
            <p class="news-content">${description}</p>
          </div>
          
          ${어휘 ? `
          <div class="news-section">
            <h3 class="news-label">어휘</h3>
            <div class="vocabulary-content">
              ${어휘.split('.').map(item => 
                item.trim() && `<p class="vocabulary-item">${item.trim()}</p>`
              ).filter(Boolean).join('')}
            </div>
          </div>
          ` : ''}
          
          ${Miscellaneous ? `
          <div class="news-section">
            <h3 class="news-label">지식</h3>
            <p class="news-content">${Miscellaneous}</p>
          </div>
          ` : ''}

          ${토론 ? `
          <div class="news-section">
            <h3 class="news-label">토론</h3>
            <p class="news-content">${토론}</p>
          </div>
          ` : ''}

          <div class="news-section news-meta">
            <div class="meta-item">
              <h3 class="news-label">날짜</h3>
              <p class="news-content">${date}</p>
            </div>
            <div class="meta-item">
              <h3 class="news-label">카테고리</h3>
              <p class="news-content">${category}</p>
            </div>
          </div>

          <div class="news-link-container">
            <a href="${url}" target="_blank" class="news-link">원문 보기</a>
          </div>
        </div>
      `,
      showConfirmButton: false,
      showCloseButton: true,
      width: '700px',
      customClass: {
        container: 'news-modal',
        title: 'news-modal-title'
      }
    });
  }, [title, description, imageUrl, date, category, url, 어휘, Miscellaneous, 토론]);

  return (
    <S.Card onClick={handleClick}>
      <S.TopBar>
        <S.Category>{category}</S.Category>
        <S.Date>{date}</S.Date>
      </S.TopBar>
      <S.Image src={imageUrl} alt={title} />
      <S.Content>
        <S.Title>{title}</S.Title>
      </S.Content>
    </S.Card>
  )
} 