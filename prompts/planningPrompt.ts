import type { ResearchResult, BusinessResult } from '@/types';

export function getPlanningPrompt(
  idea: string,
  targetMarket: string,
  researchData: ResearchResult,
  businessData: BusinessResult
): { system: string; user: string } {
  return {
    system: `You are an experienced product manager and technical architect who specializes in building MVPs and creating product roadmaps for startups. Create a detailed product plan.

You MUST respond with valid JSON only. No markdown, no explanation, just a JSON object.

The JSON must have this exact structure:
{
  "mvpFeatures": [
    {
      "name": "Feature name",
      "description": "Feature description",
      "priority": "must-have | should-have | nice-to-have",
      "effort": "low | medium | high"
    }
  ],
  "timeline": [
    {
      "phase": "Phase name (e.g., Phase 1: Foundation)",
      "duration": "Duration (e.g., 4 weeks)",
      "milestones": ["milestone1", "milestone2"],
      "deliverables": ["deliverable1", "deliverable2"]
    }
  ],
  "teamStructure": [
    {
      "role": "Role title",
      "responsibilities": ["resp1", "resp2"],
      "skills": ["skill1", "skill2"],
      "priority": "immediate | short-term | long-term"
    }
  ],
  "techStack": ["Technology 1", "Technology 2"],
  "estimatedBudget": "Estimated budget range for MVP",
  "launchStrategy": "Detailed launch strategy description"
}

Provide at least 8 MVP features, 4 timeline phases, 5 team members, and 6 tech stack items.`,
    user: `Create a product plan for this startup:

Idea: ${idea}
Target Market: ${targetMarket}

Market Context:
- Market Size: ${researchData.marketSize}
- Competitors: ${researchData.competitors.map(c => `${c.name}: ${c.description}`).join('; ')}

Business Context:
- Problem: ${businessData.problemStatement}
- Value Prop: ${businessData.valueProposition}
- Revenue Model: ${businessData.revenueModel}
- Competitive Advantage: ${businessData.competitiveAdvantage}

Provide a comprehensive product plan as JSON.`,
  };
}
