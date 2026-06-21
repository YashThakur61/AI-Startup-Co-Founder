// Competitor info from research
export interface Competitor {
  name: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  marketShare?: string;
}

// Research Agent output
export interface ResearchResult {
  marketSize: string;
  growthRate: string;
  competitors: Competitor[];
  trends: string[];
  opportunities: string[];
  industrySummary: string;
  targetDemographic: string;
  keyMetrics: { label: string; value: string }[];
}

// SWOT structure
export interface SWOT {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

// Business Agent output
export interface BusinessResult {
  problemStatement: string;
  valueProposition: string;
  revenueModel: string;
  targetCustomers: string;
  uniqueSellingPoints: string[];
  swot: SWOT;
  competitiveAdvantage: string;
}

// Feature for MVP
export interface Feature {
  name: string;
  description: string;
  priority: 'must-have' | 'should-have' | 'nice-to-have';
  effort: 'low' | 'medium' | 'high';
}

// Timeline phase
export interface TimelinePhase {
  phase: string;
  duration: string;
  milestones: string[];
  deliverables: string[];
}

// Team member role
export interface TeamMember {
  role: string;
  responsibilities: string[];
  skills: string[];
  priority: 'immediate' | 'short-term' | 'long-term';
}

// Planning Agent output
export interface PlanningResult {
  mvpFeatures: Feature[];
  timeline: TimelinePhase[];
  teamStructure: TeamMember[];
  techStack: string[];
  estimatedBudget: string;
  launchStrategy: string;
}

// Pitch slide
export interface PitchSlide {
  title: string;
  content: string;
  bulletPoints: string[];
  speakerNotes: string;
}

// Pitch Agent output
export interface PitchResult {
  slides: PitchSlide[];
  executiveSummary: string;
  elevatorPitch: string;
  askAmount: string;
  useOfFunds: { category: string; percentage: number; description: string }[];
}

// Full report combining all agents
export interface FullReport {
  _id?: string;
  startupId: string;
  research: ResearchResult;
  business: BusinessResult;
  planning: PlanningResult;
  pitch: PitchResult;
  createdAt: Date;
}

// Startup input
export interface StartupInput {
  idea: string;
  targetMarket: string;
}

// Agent status for UI
export type AgentStatus = 'waiting' | 'running' | 'completed' | 'error';

// Agent names
export type AgentName = 'research' | 'business' | 'planning' | 'pitch';

// SSE event types
export interface AgentStartEvent {
  type: 'agent-start';
  agent: AgentName;
}

export interface AgentCompleteEvent {
  type: 'agent-complete';
  agent: AgentName;
  result: ResearchResult | BusinessResult | PlanningResult | PitchResult;
}

export interface AgentErrorEvent {
  type: 'agent-error';
  agent: AgentName;
  error: string;
}

export interface PipelineCompleteEvent {
  type: 'pipeline-complete';
  reportId: string;
}

export type SSEEvent = AgentStartEvent | AgentCompleteEvent | AgentErrorEvent | PipelineCompleteEvent;
