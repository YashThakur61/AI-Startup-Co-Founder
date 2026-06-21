import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import Report from '@/lib/db/models/Report';
import { generatePitchPDF } from '@/lib/pdf/generatePitch';

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');

    if (!id) {
      return Response.json({ error: 'Report ID is required' }, { status: 400 });
    }

    await connectToDatabase();
    const report = await Report.findById(id);

    if (!report) {
      return Response.json({ error: 'Report not found' }, { status: 404 });
    }

    const pdfBytes = await generatePitchPDF(report as any);
    const buffer = Buffer.from(pdfBytes);

    return new Response(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="pitch-deck.pdf"',
        'Content-Length': pdfBytes.length.toString(),
      },
    });
  } catch (error) {
    console.error('Download pitch PDF error:', error);
    return Response.json(
      { error: 'Failed to generate pitch deck PDF' },
      { status: 500 }
    );
  }
}
