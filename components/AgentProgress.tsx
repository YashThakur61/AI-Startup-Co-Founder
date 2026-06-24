'use client';

import { cn } from '@/lib/utils';
import { Search, BarChart3, Layout, Presentation, Loader2, CheckCircle2, Circle, XCircle } from 'lucide-react';
import type { AgentName, AgentStatus } from '@/types';

interface Agent {
  name: AgentName;
  label: string;
  description: string;
  status: AgentStatus;
}

const agentMeta: Record<AgentName, { icon: typeof Search; color: string; gradient: string; bg: string }> = {
  research: { icon: Search, color: 'text-blue-400', gradient: 'from-blue-500 to-blue-600', bg: 'bg-blue-500' },
  business: { icon: BarChart3, color: 'text-violet-400', gradient: 'from-violet-500 to-purple-600', bg: 'bg-violet-500' },
  planning: { icon: Layout, color: 'text-amber-400', gradient: 'from-amber-500 to-orange-500', bg: 'bg-amber-500' },
  pitch: { icon: Presentation, color: 'text-emerald-400', gradient: 'from-emerald-500 to-green-500', bg: 'bg-emerald-500' },
};

function StatusIcon({ status }: { status: AgentStatus }) {
  switch (status) {
    case 'running':
      return <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />;
    case 'completed':
      return <CheckCircle2 className="w-5 h-5 text-green-400" />;
    case 'error':
      return <XCircle className="w-5 h-5 text-red-400" />;
    default:
      return <Circle className="w-5 h-5 text-muted-dark/50" />;
  }
}

function StatusBadge({ status }: { status: AgentStatus }) {
  const styles: Record<AgentStatus, string> = {
    waiting: 'bg-white/5 text-muted-dark border-white/10',
    running: 'bg-blue-500/10 text-blue-400 border-blue-500/20 status-running',
    completed: 'bg-green-500/10 text-green-400 border-green-500/20',
    error: 'bg-red-500/10 text-red-400 border-red-500/20',
  };
  const labels: Record<AgentStatus, string> = {
    waiting: 'Waiting',
    running: 'Running...',
    completed: 'Done ✅',
    error: 'Failed',
  };
  return (
    <span className={cn('inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border', styles[status])}>
      {labels[status]}
    </span>
  );
}

interface AgentProgressProps {
  agents: Agent[];
}

export default function AgentProgress({ agents }: AgentProgressProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {agents.map((agent, i) => {
        const meta = agentMeta[agent.name];
        const Icon = meta.icon;
        const isActive = agent.status === 'running';
        const isDone = agent.status === 'completed';

        return (
          <div
            key={agent.name}
            className={cn(
              'glass-card rounded-xl p-5 transition-all duration-500 animate-fade-up',
              isActive && 'border-blue-500/20 bg-blue-500/[0.03]',
              isDone && 'border-green-500/15',
              `delay-${(i + 1) * 100}`,
            )}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={cn('w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg', meta.gradient)}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm">{agent.label}</h4>
                  <p className="text-xs text-muted-dark mt-0.5">{agent.description}</p>
                </div>
              </div>
              <StatusBadge status={agent.status} />
            </div>

            {/* Progress bar */}
            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden mt-2">
              <div
                className={cn(
                  'h-full rounded-full transition-all duration-1000',
                  agent.status === 'waiting' && 'w-0',
                  agent.status === 'running' && 'animate-progress bg-gradient-to-r from-blue-500 to-violet-500',
                  agent.status === 'completed' && 'w-full bg-gradient-to-r from-green-500 to-emerald-400',
                  agent.status === 'error' && 'w-full bg-red-500',
                )}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
