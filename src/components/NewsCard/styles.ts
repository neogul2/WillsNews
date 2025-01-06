import styled from 'styled-components'

export const Card = styled.div`
  position: relative;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  background: white;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`

export const Image = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`

export const Category = styled.span`
  position: absolute;
  top: 20px;
  left: 20px;
  background: #ff7f50;
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`

export const Content = styled.div`
  padding: 24px;
`

export const Title = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 12px;
  font-weight: 500;
`

export const Description = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
`

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #eee;
`

export const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`

export const AuthorName = styled.span`
  font-size: 0.9rem;
  color: #666;
`

export const Date = styled.span`
  font-size: 0.9rem;
  color: #999;
` 