import { NextRequest, NextResponse } from 'next/server';
import { extractMetadataFromPDFText } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { pdfText, fileName } = body;

    if (!pdfText || typeof pdfText !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid pdfText parameter' },
        { status: 400 }
      );
    }

    const extractionResult = await extractMetadataFromPDFText(pdfText);

    return NextResponse.json({
      success: true,
      fileName: fileName || 'uploaded_paper.pdf',
      data: extractionResult.data,
      validation: extractionResult.validation,
      isAiGenerated: extractionResult.isAiGenerated,
      extractedAt: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('PDF Extraction Error:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to extract metadata from PDF' },
      { status: 500 }
    );
  }
}
