import styled, { keyframes } from 'styled-components'

const hoverAnimation = keyframes`
  0% {
    transform: translateY(0);
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  }
  100% {
    transform: translateY(-10px);
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.15);
  }
`

export const Card = styled.div`
  position: relative;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    animation: ${hoverAnimation} 0.3s forwards;
  }
`

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: white;
`

export const Category = styled.span`
  background: #ff7f50;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`

export const Date = styled.span`
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
`

export const Image = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  display: block;
`

export const Content = styled.div`
  padding: 24px;
  background: white;
`

export const Title = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin: 0;
  font-weight: 500;
  line-height: 1.4;
`

export const Description = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
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