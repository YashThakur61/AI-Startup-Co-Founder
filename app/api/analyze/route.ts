import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import Startup from '@/lib/db/models/Startup';
import { runPipeline } from '@/lib/agents/orchestrator';
import type { SSEEvent } from '@/types';

export const maxDuration = 300;
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';
    let idea = '';
    let targetMarket = '';
    let file: File | null = null;

    if (contentType.includes('application/json')) {
      const body = await req.json();
      idea = body.idea;
      targetMarket = body.targetMarket;
    } else {
      const formData = await req.formData();
      idea = formData.get('idea') as string;
      targetMarket = formData.get('targetMarket') as string;
      file = formData.get('file') as File | null;
    }

    if (!idea || !targetMarket) {
      return Response.json(
        { error: 'Both idea and targetMarket are required' },
        { status: 400 }
      );
    }

    if (idea.length < 20) {
      return Response.json(
        { error: 'Startup idea must be at least 20 characters' },
        { status: 400 }
      );
    }

    let businessPlanText = '';
    if (file && file.type === 'application/pdf') {
      try {
        // Hide require from Turbopack to prevent DOMMatrix reference error
        const { PDFParse } = eval("require('pdf-parse')");
        const buffer = Buffer.from(await file.arrayBuffer());
        const parser = new PDFParse({ data: buffer });
        const pdfData = await parser.getText();
        businessPlanText = pdfData.text.substring(0, 3000);
      } catch (err) {
        console.error('PDF Parse Error:', err);
      }
    }

    await connectToDatabase();

    const startup = await Startup.create({
      idea,
      targetMarket,
      businessPlanText,
      status: 'pending',
    });

    return Response.json({ startupId: startup._id.toString() });
  } catch (error) {
    console.error('POST /api/analyze error:', error);
    return Response.json(
      { error: 'Failed to create startup analysis' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');

  if (!id) {
    return Response.json({ error: 'Missing startup id' }, { status: 400 });
  }

  try {
    await connectToDatabase();
    const startup = await Startup.findById(id);

    if (!startup) {
      return Response.json({ error: 'Startup not found' }, { status: 404 });
    }

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        function sendEvent(event: SSEEvent) {
          const data = `event: ${event.type}\ndata: ${JSON.stringify(event)}\n\n`;
          controller.enqueue(encoder.encode(data));
        }

        try {
          await runPipeline(startup.idea, startup.targetMarket, {
            onAgentStart: (agent) => {
              sendEvent({ type: 'agent-start', agent: agent as SSEEvent['type'] extends 'agent-start' ? never : any });
            },
            onAgentComplete: (agent, result) => {
              sendEvent({
                type: 'agent-complete',
                agent: agent as any,
                result: result as any,
              });
            },
            onAgentError: (agent, error) => {
              sendEvent({
                type: 'agent-error',
                agent: agent as any,
                error,
              });
            },
            onPipelineComplete: (reportId) => {
              sendEvent({
                type: 'pipeline-complete',
                reportId,
              });
            },
          });
        } catch (error) {
          console.error('Pipeline error:', error);
          const errorMessage = error instanceof Error ? error.message : 'Pipeline failed';
          const data = `event: pipeline-error\ndata: ${JSON.stringify({ type: 'pipeline-error', error: errorMessage })}\n\n`;
          controller.enqueue(encoder.encode(data));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
        'X-Accel-Buffering': 'no',
      },
    });
  } catch (error) {
    console.error('GET /api/analyze error:', error);
    return Response.json(
      { error: 'Failed to start analysis' },
      { status: 500 }
    );
  }
}
