'use client'

import { useState } from 'react'
import styled from 'styled-components'

const ChatContainer = styled.div`
  margin-top: 20px;
  border-top: 1px solid #eee;
  padding-top: 20px;
`

const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`

const ChatTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin: 0;
`

const MessagesContainer = styled.div`
  height: 300px;
  overflow-y: auto;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  background: #f8f9fa;
`

const MessageWrapper = styled.div<{ $isUser: boolean }>`
  margin: 10px 0;
  padding: 10px 15px;
  border-radius: 15px;
  max-width: 80%;
  ${props => props.$isUser ? `
    background: #007bff;
    color: white;
    margin-left: auto;
  ` : `
    background: white;
    color: #333;
    margin-right: auto;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  `}
`

const InputContainer = styled.div`
  display: flex;
  gap: 10px;
`

const Input = styled.input`
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`

const SendButton = styled.button`
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;

  &:hover {
    background: #0056b3;
  }
`

interface Message {
  text: string;
  isUser: boolean;
}

interface ChatBotProps {
  topic: string;
}

export default function ChatBot({ topic }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    { text: '비밀번호를 입력하세요.', isUser: false }
  ]);
  const [input, setInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    if (!isAuthenticated) {
      if (input === '0211') {
        setIsAuthenticated(true);
        setMessages(prev => [...prev, { text: `안녕하세요! ${topic}에 대해 토론해보고 싶으신가요?`, isUser: false }]);
      } else {
        setMessages(prev => [...prev, { text: '비밀번호가 틀렸습니다. 다시 시도하세요.', isUser: false }]);
      }
      return;
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          topic: topic
        }),
      });

      if (!response.ok) {
        throw new Error('API response was not ok');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setMessages(prev => [...prev, { text: data.response, isUser: false }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        text: '죄송합니다. 일답을 처리하는 중에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.', 
        isUser: false 
      }]);
    }
  };

  return (
    <ChatContainer>
      <ChatHeader>
        <ChatTitle>토론하기</ChatTitle>
      </ChatHeader>
      <MessagesContainer>
        {messages.map((message, index) => (
          <MessageWrapper key={index} $isUser={message.isUser}>
            {message.text}
          </MessageWrapper>
        ))}
      </MessagesContainer>
      <InputContainer>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="메시지를 입력하세요..."
        />
        <SendButton onClick={handleSend}>보내기</SendButton>
      </InputContainer>
    </ChatContainer>
  );
} 