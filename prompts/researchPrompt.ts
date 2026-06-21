export function getResearchPrompt(idea: string, targetMarket: string, searchContext: string): {
  system: string;
  user: string;
} {
  return {
    system: `You are an expert market research analyst with deep knowledge of startup ecosystems, venture capital, and market analysis. Your task is to provide comprehensive market research for a startup idea.

You MUST respond with valid JSON only. No markdown, no explanation, just a JSON object.

The JSON must have this exact structure:
{
  "marketSize": "Total addressable market size with dollar amount",
  "growthRate": "Annual growth rate percentage",
  "competitors": [
    {
      "name": "Competitor name",
      "description": "What they do",
      "strengths": ["strength1", "strength2"],
      "weaknesses": ["weakness1", "weakness2"],
      "marketShare": "estimated market share"
    }
  ],
  "trends": ["trend1", "trend2", "trend3"],
  "opportunities": ["opportunity1", "opportunity2"],
  "industrySummary": "2-3 paragraph industry overview",
  "targetDemographic": "Detailed description of target demographic",
  "keyMetrics": [
    { "label": "Metric name", "value": "Metric value" }
  ]
}

Provide at least 4 competitors, 5 trends, 4 opportunities, and 5 key metrics.`,
    user: `Analyze this startup idea for the ${targetMarket} market:

Startup Idea: ${idea}
Target Market: ${targetMarket}

${searchContext ? `Here is recent market research data to incorporate:\n${searchContext}` : ''}

Provide comprehensive market research as JSON.`,
  };
}
