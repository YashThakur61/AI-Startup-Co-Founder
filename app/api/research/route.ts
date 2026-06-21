import { NextRequest } from 'next/server';
import { runResearchAgent } from '@/lib/agents/researchAgent';

export const maxDuration = 120;

export async function POST(req: NextRequest) {
  try {
    const { idea, targetMarket } = await req.json();

    if (!idea || !targetMarket) {
      return Response.json(
        { error: 'Both idea and targetMarket are required' },
        { status: 400 }
      );
    }

    const result = await runResearchAgent(idea, targetMarket);
    return Response.json(result);
  } catch (error) {
    console.error('Research agent error:', error);
    return Response.json(
      { error: error instanceof Error ? error.message : 'Research agent failed' },
      { status: 500 }
    );
  }
}
