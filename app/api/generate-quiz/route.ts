import { NextRequest, NextResponse } from 'next/server';
import { generateQuizQuestions } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { topic, difficulty, count } = body;

    const questions = await generateQuizQuestions(
      topic || 'Antarctica & Bharati Station',
      difficulty || 'Medium',
      count || 10
    );

    return NextResponse.json({
      success: true,
      topic: topic || 'Antarctica & Bharati Station',
      difficulty: difficulty || 'Medium',
      questions,
      generatedAt: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('Quiz Generation Error:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to generate quiz questions' },
      { status: 500 }
    );
  }
}
