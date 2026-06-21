import type { ResearchResult, BusinessResult, PlanningResult } from '@/types';

export function getPitchPrompt(
  idea: string,
  targetMarket: string,
  researchData: ResearchResult,
  businessData: BusinessResult,
  planningData: PlanningResult
): { system: string; user: string } {
  return {
    system: `You are a world-class pitch deck consultant who has helped startups raise millions in funding. Create compelling pitch deck content that would impress top-tier VCs.

You MUST respond with valid JSON only. No markdown, no explanation, just a JSON object.

The JSON must have this exact structure:
{
  "slides": [
    {
      "title": "Slide title",
      "content": "Main content for the slide (2-3 sentences)",
      "bulletPoints": ["key point 1", "key point 2"],
      "speakerNotes": "Notes for the presenter"
    }
  ],
  "executiveSummary": "3-4 paragraph executive summary covering problem, solution, market, and ask",
  "elevatorPitch": "30-second elevator pitch (2-3 sentences)",
  "askAmount": "Funding ask amount with justification",
  "useOfFunds": [
    {
      "category": "Category name (e.g., Engineering)",
      "percentage": 40,
      "description": "How the funds will be used"
    }
  ]
}

Create exactly 10 slides: Title, Problem, Solution, Market Opportunity, Business Model, Traction/Validation, Competitive Landscape, Team, Financial Projections, The Ask.
Provide at least 4 use of funds categories that add up to 100%.`,
    user: `Create pitch deck content for this startup:

Idea: ${idea}
Target Market: ${targetMarket}

Research Highlights:
- Market Size: ${researchData.marketSize}
- Growth Rate: ${researchData.growthRate}
- Key Trends: ${researchData.trends.slice(0, 3).join(', ')}

Business Analysis:
- Problem: ${businessData.problemStatement}
- Value Proposition: ${businessData.valueProposition}
- Revenue Model: ${businessData.revenueModel}
- USPs: ${businessData.uniqueSellingPoints.join(', ')}
- Competitive Advantage: ${businessData.competitiveAdvantage}

Product Plan:
- MVP Features: ${planningData.mvpFeatures.filter(f => f.priority === 'must-have').map(f => f.name).join(', ')}
- Timeline: ${planningData.timeline.map(t => `${t.phase} (${t.duration})`).join(' → ')}
- Team Needs: ${planningData.teamStructure.filter(t => t.priority === 'immediate').map(t => t.role).join(', ')}
- Estimated Budget: ${planningData.estimatedBudget}

Create compelling pitch deck content as JSON.`,
  };
}
