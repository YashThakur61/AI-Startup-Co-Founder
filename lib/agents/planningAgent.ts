import { generateJSON } from '@/lib/openai';
import { getPlanningPrompt } from '@/prompts/planningPrompt';
import type { ResearchResult, BusinessResult, PlanningResult } from '@/types';

export async function runPlanningAgent(
  idea: string,
  targetMarket: string,
  researchData: ResearchResult,
  businessData: BusinessResult
): Promise<PlanningResult> {
  const { system, user } = getPlanningPrompt(idea, targetMarket, researchData, businessData);
  const result = await generateJSON<PlanningResult>(system, user);
  return result;
}
