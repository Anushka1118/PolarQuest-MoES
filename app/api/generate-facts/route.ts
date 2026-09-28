import { NextRequest, NextResponse } from 'next/server';
import { generatePolarFactCards } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const count = typeof body.count === 'number' ? body.count : 10;
    const offset = typeof body.offset === 'number' ? body.offset : 0;

    const cards = await generatePolarFactCards(count, offset);

    return NextResponse.json({
      success: true,
      count: cards.length,
      offset,
      cards,
      generatedAt: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('Fact Cards Generation Error:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to generate polar fact cards' },
      { status: 500 }
    );
  }
}
