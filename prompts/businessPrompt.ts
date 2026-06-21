import type { ResearchResult } from '@/types';

export function getBusinessPrompt(
  idea: string,
  targetMarket: string,
  researchData: ResearchResult
): { system: string; user: string } {
  return {
    system: `You are a seasoned business strategist and startup consultant who has helped launch hundreds of successful companies. Analyze the startup idea and research data to create a comprehensive business analysis.

You MUST respond with valid JSON only. No markdown, no explanation, just a JSON object.

The JSON must have this exact structure:
{
  "problemStatement": "Clear description of the problem being solved (2-3 sentences)",
  "valueProposition": "Unique value proposition statement",
  "revenueModel": "Detailed revenue model description with pricing strategy",
  "targetCustomers": "Detailed description of ideal customer segments",
  "uniqueSellingPoints": ["USP 1", "USP 2", "USP 3"],
  "swot": {
    "strengths": ["at least 4 strengths"],
    "weaknesses": ["at least 4 weaknesses"],
    "opportunities": ["at least 4 opportunities"],
    "threats": ["at least 4 threats"]
  },
  "competitiveAdvantage": "Description of sustainable competitive advantage"
}

Make the analysis specific and actionable, not generic.`,
    user: `Create a business analysis for this startup:

Idea: ${idea}
Target Market: ${targetMarket}

Market Research Data:
- Market Size: ${researchData.marketSize}
- Growth Rate: ${researchData.growthRate}
- Key Competitors: ${researchData.competitors.map(c => c.name).join(', ')}
- Industry Trends: ${researchData.trends.join(', ')}
- Opportunities: ${researchData.opportunities.join(', ')}
- Industry Summary: ${researchData.industrySummary}

Provide a comprehensive business analysis as JSON.`,
  };
}
