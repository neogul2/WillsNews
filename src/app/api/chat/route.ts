import { NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const { message, topic } = await req.json();
    
    // 디버깅을 위한 로그 추가
    console.log('API Route - Request received:', { message, topic });
    console.log('API Key:', process.env.OPENAI_API_KEY ? 'exists' : 'missing');

    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key is not configured');
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `당신은 ${topic}에 대해 토론하는 선생님입니다.  
          초등학교 6학년 학생의 수준에 맞춰 이해하기 쉽게 설명하고, 비판적 사고를 촉진하도록 도와주세요.
          한국어로 대화 해주세요.`
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    console.log('OpenAI Response received');

    return NextResponse.json({
      response: completion.choices[0].message.content
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ 
      error: '죄송합니다. 대화 처리 중 오류가 발생했습니다.',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { 
      status: 500 
    });
  }
}