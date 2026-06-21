import { connectToDatabase } from '@/lib/db/mongodb';
import Startup from '@/lib/db/models/Startup';
import Report from '@/lib/db/models/Report';
import { runResearchAgent } from './researchAgent';
import { runBusinessAgent } from './businessAgent';
import { runPlanningAgent } from './planningAgent';
import { runPitchAgent } from './pitchAgent';
import type { ResearchResult, BusinessResult, PlanningResult, PitchResult } from '@/types';

export interface OrchestratorCallbacks {
  onAgentStart: (agent: string) => void;
  onAgentComplete: (agent: string, result: unknown) => void;
  onAgentError: (agent: string, error: string) => void;
  onPipelineComplete: (reportId: string) => void;
}

export async function runPipeline(
  idea: string,
  targetMarket: string,
  callbacks: OrchestratorCallbacks
): Promise<string> {
  await connectToDatabase();

  // Create startup record
  const startup = await Startup.create({
    idea,
    targetMarket,
    status: 'processing',
  });

  const startupId = startup._id.toString();

  try {
    // Agent 1: Research
    callbacks.onAgentStart('research');
    let researchData: ResearchResult;
    try {
      researchData = await runResearchAgent(idea, targetMarket);
      callbacks.onAgentComplete('research', researchData);
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Research agent failed';
      callbacks.onAgentError('research', msg);
      throw error;
    }

    // Agent 2: Business
    callbacks.onAgentStart('business');
    let businessData: BusinessResult;
    try {
      businessData = await runBusinessAgent(idea, targetMarket, researchData);
      callbacks.onAgentComplete('business', businessData);
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Business agent failed';
      callbacks.onAgentError('business', msg);
      throw error;
    }

    // Agent 3: Planning
    callbacks.onAgentStart('planning');
    let planningData: PlanningResult;
    try {
      planningData = await runPlanningAgent(idea, targetMarket, researchData, businessData);
      callbacks.onAgentComplete('planning', planningData);
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Planning agent failed';
      callbacks.onAgentError('planning', msg);
      throw error;
    }

    // Agent 4: Pitch
    callbacks.onAgentStart('pitch');
    let pitchData: PitchResult;
    try {
      pitchData = await runPitchAgent(idea, targetMarket, researchData, businessData, planningData);
      callbacks.onAgentComplete('pitch', pitchData);
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Pitch agent failed';
      callbacks.onAgentError('pitch', msg);
      throw error;
    }

    // Save report to MongoDB
    const report = await Report.create({
      startupId,
      research: researchData,
      business: businessData,
      planning: planningData,
      pitch: pitchData,
    });

    const reportId = report._id.toString();

    // Update startup status
    await Startup.findByIdAndUpdate(startupId, {
      status: 'completed',
      reportId,
    });

    callbacks.onPipelineComplete(reportId);
    return reportId;
  } catch (error) {
    await Startup.findByIdAndUpdate(startupId, { status: 'failed' });
    throw error;
  }
}
