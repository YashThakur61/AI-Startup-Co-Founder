import { NextRequest } from 'next/server';
import { runPlanningAgent } from '@/lib/agents/planningAgent';
import type { ResearchResult, BusinessResult } from '@/types';

export const maxDuration = 120;

export async function POST(req: NextRequest) {
  try {
    const { idea, targetMarket, researchData, businessData } = await req.json() as {
      idea: string;
      targetMarket: string;
      researchData: ResearchResult;
      businessData: BusinessResult;
    };

    if (!idea || !targetMarket || !researchData || !businessData) {
      return Response.json(
        { error: 'idea, targetMarket, researchData, and businessData are required' },
        { status: 400 }
      );
    }

    const result = await runPlanningAgent(idea, targetMarket, researchData, businessData);
    return Response.json(result);
  } catch (error) {
    console.error('Planning agent error:', error);
    return Response.json(
      { error: error instanceof Error ? error.message : 'Planning agent failed' },
      { status: 500 }
    );
  }
}
