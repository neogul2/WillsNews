import { NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const { message, topic } = await req.json();
    console.log('Received:', { message, topic });

    // API 키 확인 로그
    console.log('API Key exists:', !!process.env.OPENAI_API_KEY);

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
          한국어로 대화 해주세요. 다른 주제를 이야기하면 다른 주제를 이야기하면 안된다고 주의를 주고, 
          본 주제로 돌아올 수 있게 하세요. 이야기가 끊기지 않게 주제와 관련된 창의적 질문으로 이야기를 이어나가세요.
          학생이 이야기를 많이 할 수 있도록 유도하고, 당신은 너무 많은 이야기를 하진 않도록 주의하세요.`
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

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