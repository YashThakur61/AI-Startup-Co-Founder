import { generateJSON } from '@/lib/openai';
import { searchMarket, searchCompetitors, searchTrends } from '@/lib/tavily';
import { getResearchPrompt } from '@/prompts/researchPrompt';
import type { ResearchResult } from '@/types';

export async function runResearchAgent(
  idea: string,
  targetMarket: string
): Promise<ResearchResult> {
  // Step 1: Search for market data using Tavily
  const [marketResults, competitorResults, trendResults] = await Promise.all([
    searchMarket(`${idea} ${targetMarket} market size TAM revenue`),
    searchCompetitors(idea, targetMarket),
    searchTrends(targetMarket),
  ]);

  // Step 2: Compile search context
  const searchContext = [
    '--- Market Data ---',
    ...marketResults.map(r => `${r.title}: ${r.content}`),
    '',
    '--- Competitor Data ---',
    ...competitorResults.map(r => `${r.title}: ${r.content}`),
    '',
    '--- Industry Trends ---',
    ...trendResults.map(r => `${r.title}: ${r.content}`),
  ].join('\n');

  // Step 3: Generate research analysis with GPT-4o
  const { system, user } = getResearchPrompt(idea, targetMarket, searchContext);
  const result = await generateJSON<ResearchResult>(system, user);

  return result;
}
