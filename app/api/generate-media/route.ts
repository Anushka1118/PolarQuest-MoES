import { NextRequest, NextResponse } from 'next/server';
import { generateMediaFromResearch } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, author, station, abstract, keyFindings } = body;

    if (!title || !station) {
      return NextResponse.json(
        { error: 'Paper title and station are required for media generation' },
        { status: 400 }
      );
    }

    const mediaOutput = await generateMediaFromResearch({
      title,
      author: author || 'MoES Polar Research Team',
      station,
      abstract: abstract || 'Polar expedition research record.',
      keyFindings: keyFindings || ['Polar telemetry baseline updated.'],
    });

    return NextResponse.json({
      success: true,
      media: mediaOutput,
      generatedAt: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('Media Generation Error:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to generate media content' },
      { status: 500 }
    );
  }
}
