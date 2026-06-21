import { NextRequest } from 'next/server';
import { runPitchAgent } from '@/lib/agents/pitchAgent';
import type { ResearchResult, BusinessResult, PlanningResult } from '@/types';

export const maxDuration = 120;

export async function POST(req: NextRequest) {
  try {
    const { idea, targetMarket, researchData, businessData, planningData } = await req.json() as {
      idea: string;
      targetMarket: string;
      researchData: ResearchResult;
      businessData: BusinessResult;
      planningData: PlanningResult;
    };

    if (!idea || !targetMarket || !researchData || !businessData || !planningData) {
      return Response.json(
        { error: 'idea, targetMarket, researchData, businessData, and planningData are required' },
        { status: 400 }
      );
    }

    const result = await runPitchAgent(idea, targetMarket, researchData, businessData, planningData);
    return Response.json(result);
  } catch (error) {
    console.error('Pitch agent error:', error);
    return Response.json(
      { error: error instanceof Error ? error.message : 'Pitch agent failed' },
      { status: 500 }
    );
  }
}
