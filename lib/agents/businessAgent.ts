import { generateJSON } from '@/lib/openai';
import { getBusinessPrompt } from '@/prompts/businessPrompt';
import type { ResearchResult, BusinessResult } from '@/types';

export async function runBusinessAgent(
  idea: string,
  targetMarket: string,
  researchData: ResearchResult
): Promise<BusinessResult> {
  const { system, user } = getBusinessPrompt(idea, targetMarket, researchData);
  const result = await generateJSON<BusinessResult>(system, user);
  return result;
}
