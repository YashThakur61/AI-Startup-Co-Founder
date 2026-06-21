import { NextRequest } from 'next/server';
import { runBusinessAgent } from '@/lib/agents/businessAgent';
import type { ResearchResult } from '@/types';

export const maxDuration = 120;

export async function POST(req: NextRequest) {
  try {
    const { idea, targetMarket, researchData } = await req.json() as {
      idea: string;
      targetMarket: string;
      researchData: ResearchResult;
    };

    if (!idea || !targetMarket || !researchData) {
      return Response.json(
        { error: 'idea, targetMarket, and researchData are required' },
        { status: 400 }
      );
    }

    const result = await runBusinessAgent(idea, targetMarket, researchData);
    return Response.json(result);
  } catch (error) {
    console.error('Business agent error:', error);
    return Response.json(
      { error: error instanceof Error ? error.message : 'Business agent failed' },
      { status: 500 }
    );
  }
}
