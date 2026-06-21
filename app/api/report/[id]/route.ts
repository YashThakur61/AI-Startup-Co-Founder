import { connectToDatabase } from '@/lib/db/mongodb';
import Report from '@/lib/db/models/Report';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return Response.json({ error: 'Report ID is required' }, { status: 400 });
    }

    await connectToDatabase();

    const report = await Report.findById(id);

    if (!report) {
      return Response.json({ error: 'Report not found' }, { status: 404 });
    }

    return Response.json(report);
  } catch (error) {
    console.error('GET /api/report/[id] error:', error);
    return Response.json(
      { error: 'Failed to fetch report' },
      { status: 500 }
    );
  }
}
