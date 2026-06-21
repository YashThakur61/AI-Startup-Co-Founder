import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import Report from '@/lib/db/models/Report';
import { generateReportPDF } from '@/lib/pdf/generateReport';

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

    const pdfBytes = await generateReportPDF(report as any);
    const buffer = Buffer.from(pdfBytes);

    return new Response(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="business-plan.pdf"',
        'Content-Length': pdfBytes.length.toString(),
      },
    });
  } catch (error) {
    console.error('Download report PDF error:', error);
    return Response.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}
