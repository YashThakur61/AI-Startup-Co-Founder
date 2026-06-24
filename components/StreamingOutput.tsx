'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp, Search, BarChart3, Layout, Presentation, TrendingUp, Users, Lightbulb, Target } from 'lucide-react';
import type { AgentName, AgentStatus, ResearchResult, BusinessResult, PlanningResult, PitchResult } from '@/types';

const agentConfig: Record<AgentName, { icon: typeof Search; color: string; label: string }> = {
  research: { icon: Search, color: 'text-blue-400', label: 'Market Research' },
  business: { icon: BarChart3, color: 'text-violet-400', label: 'Business Analysis' },
  planning: { icon: Layout, color: 'text-amber-400', label: 'Product Planning' },
  pitch: { icon: Presentation, color: 'text-emerald-400', label: 'Pitch Deck' },
};

interface StreamingOutputProps {
  agentName: AgentName;
  label: string;
  status: AgentStatus;
  result: ResearchResult | BusinessResult | PlanningResult | PitchResult | null;
}

function Stat({ label, value, icon: Icon }: { label: string; value: string | number; icon: typeof TrendingUp }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
      <Icon className="w-4 h-4 text-blue-400 shrink-0" />
      <div className="min-w-0">
        <p className="text-xs text-muted-dark">{label}</p>
        <p className="text-sm font-medium text-foreground truncate">{String(value)}</p>
      </div>
    </div>
  );
}

function ResearchPreview({ data }: { data: ResearchResult }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Stat label="Market Size" value={data.marketSize} icon={TrendingUp} />
      <Stat label="Growth Rate" value={data.growthRate} icon={TrendingUp} />
      <Stat label="Competitors" value={`${data.competitors?.length || 0} found`} icon={Target} />
      <Stat label="Trends" value={`${data.trends?.length || 0} identified`} icon={Lightbulb} />
    </div>
  );
}

function BusinessPreview({ data }: { data: BusinessResult }) {
  return (
    <div className="space-y-3">
      <div className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
        <p className="text-xs text-muted-dark mb-1">Value Proposition</p>
        <p className="text-sm text-foreground line-clamp-2">{data.valueProposition}</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Stat label="SWOT Items" value={
          (data.swot?.strengths?.length || 0) + (data.swot?.weaknesses?.length || 0) +
          (data.swot?.opportunities?.length || 0) + (data.swot?.threats?.length || 0)
        } icon={BarChart3} />
        <Stat label="USPs" value={`${data.uniqueSellingPoints?.length || 0} points`} icon={Lightbulb} />
      </div>
    </div>
  );
}

function PlanningPreview({ data }: { data: PlanningResult }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Stat label="MVP Features" value={`${data.mvpFeatures?.length || 0} features`} icon={Layout} />
      <Stat label="Timeline" value={`${data.timeline?.length || 0} phases`} icon={TrendingUp} />
      <Stat label="Team Size" value={`${data.teamStructure?.length || 0} roles`} icon={Users} />
      <Stat label="Budget" value={data.estimatedBudget || 'TBD'} icon={Target} />
    </div>
  );
}

function PitchPreview({ data }: { data: PitchResult }) {
  return (
    <div className="space-y-3">
      <div className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
        <p className="text-xs text-muted-dark mb-1">Elevator Pitch</p>
        <p className="text-sm text-foreground line-clamp-2">{data.elevatorPitch}</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Stat label="Slides" value={`${data.slides?.length || 0} slides`} icon={Presentation} />
        <Stat label="Ask Amount" value={data.askAmount || 'N/A'} icon={TrendingUp} />
      </div>
    </div>
  );
}

export default function StreamingOutput({ agentName, label, status, result }: StreamingOutputProps) {
  const [expanded, setExpanded] = useState(true);
  const config = agentConfig[agentName];
  const Icon = config.icon;

  if (status === 'waiting') return null;

  return (
    <div className={cn('glass-card rounded-xl overflow-hidden animate-slide-in transition-all duration-500')}>
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-5 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-3">
          <Icon className={cn('w-5 h-5', config.color)} />
          <span className="font-medium text-foreground text-sm">{config.label}</span>
          {status === 'running' && (
            <span className="flex items-center gap-1.5 text-xs text-blue-400">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Processing...
            </span>
          )}
        </div>
        {expanded ? <ChevronUp className="w-4 h-4 text-muted-dark" /> : <ChevronDown className="w-4 h-4 text-muted-dark" />}
      </button>

      {/* Body */}
      {expanded && (
        <div className="px-5 pb-5 border-t border-white/[0.06] pt-4">
          {status === 'running' && !result && (
            <div className="space-y-3">
              <div className="h-4 rounded-lg animate-shimmer bg-white/5" />
              <div className="h-4 rounded-lg animate-shimmer bg-white/5 w-3/4" />
              <div className="h-4 rounded-lg animate-shimmer bg-white/5 w-1/2" />
            </div>
          )}
          {result && agentName === 'research' && <ResearchPreview data={result as ResearchResult} />}
          {result && agentName === 'business' && <BusinessPreview data={result as BusinessResult} />}
          {result && agentName === 'planning' && <PlanningPreview data={result as PlanningResult} />}
          {result && agentName === 'pitch' && <PitchPreview data={result as PitchResult} />}
        </div>
      )}
    </div>
  );
}
