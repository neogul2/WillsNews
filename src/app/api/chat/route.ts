import { NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const { message, topic, language } = await req.json();
    console.log('API Route - Request received:', { message, topic });

    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key is not configured');
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an expert educator helping a 6th-grade student develop critical thinking skills about ${topic}.
          Use ${language === 'ko' ? 'Korean' : 'English'} language for all responses.

          Key Teaching Principles:
          1. Guide structured responses:
             - Encourage complete sentences and well-formed arguments
             - Ask for examples and evidence to support claims
             - Help develop "Because... Therefore..." style reasoning
          
          2. Use the Socratic method effectively:
             - Ask ONE focused question at a time
             - Guide students to expand on brief answers
             - Help them connect ideas logically
          
          3. When responding to brief or simple answers:
             - Acknowledge their point
             - Ask for elaboration: "Can you explain why you think that?"
             - Guide them to consider causes and effects
          
          4. Periodically summarize the discussion:
             - After 3-4 exchanges, provide a brief analysis
             - Point out logical connections they've made
             - Highlight areas of growth in their reasoning
          
          5. Maintain discussion quality:
             - Discourage one-word or simple answers
             - Guide them to structure arguments with clear points
             - Help them build on previous statements
          
          Enrich Discussion with Facts:
          - Share relevant historical or scientific facts
          - Connect facts to student's arguments
          - Use facts to encourage deeper thinking

          Communication Style:
          - Clear and encouraging
          - Focus on logical development
          - Guide towards structured arguments
          - Connect ideas across the discussion`
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