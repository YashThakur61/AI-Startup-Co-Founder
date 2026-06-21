import { generateJSON } from '@/lib/openai';
import { getPitchPrompt } from '@/prompts/pitchPrompt';
import type { ResearchResult, BusinessResult, PlanningResult, PitchResult } from '@/types';

export async function runPitchAgent(
  idea: string,
  targetMarket: string,
  researchData: ResearchResult,
  businessData: BusinessResult,
  planningData: PlanningResult
): Promise<PitchResult> {
  const { system, user } = getPitchPrompt(idea, targetMarket, researchData, businessData, planningData);
  const result = await generateJSON<PitchResult>(system, user);
  return result;
}
