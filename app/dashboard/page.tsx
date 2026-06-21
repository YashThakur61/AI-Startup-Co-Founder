'use client';

import { useState, useEffect, useRef, Suspense, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  AlertCircle,
  ArrowRight,
  Loader2,
  Sparkles,
  Search,
  BarChart3,
  Layout,
  Presentation,
  Rocket
} from 'lucide-react';
import type { AgentName, AgentStatus } from '@/types';
import AgentProgress from '@/components/AgentProgress';
import StreamingOutput from '@/components/StreamingOutput';

const AGENT_CONFIG: { name: AgentName; label: string; description: string; icon: typeof Search }[] = [
  { name: 'research', label: 'Research Agent', description: 'Analyzing market landscape and competitors', icon: Search },
  { name: 'business', label: 'Business Agent', description: 'Building business strategy and SWOT analysis', icon: BarChart3 },
  { name: 'planning', label: 'Planning Agent', description: 'Creating MVP roadmap and team structure', icon: Layout },
  { name: 'pitch', label: 'Pitch Agent', description: 'Crafting investor-ready pitch deck', icon: Presentation },
];

type AgentState = Record<AgentName, { status: AgentStatus; result: any }>;

function DashboardContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const eventSourceRef = useRef<EventSource | null>(null);

  const [agents, setAgents] = useState<AgentState>({
    research: { status: 'waiting', result: null },
    business: { status: 'waiting', result: null },
    planning: { status: 'waiting', result: null },
    pitch: { status: 'waiting', result: null },
  });
  const [reportId, setReportId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const updateAgent = useCallback((name: AgentName, update: Partial<AgentState[AgentName]>) => {
    setAgents(prev => ({
      ...prev,
      [name]: { ...prev[name], ...update },
    }));
  }, []);

  useEffect(() => {
    if (!id) return;

    const es = new EventSource(`/api/analyze?id=${id}`);
    eventSourceRef.current = es;

    es.addEventListener('agent-start', (e: MessageEvent) => {
      try {
        const data = JSON.parse(e.data);
        updateAgent(data.agent as AgentName, { status: 'running' });
      } catch { /* ignore parse errors */ }
    });

    es.addEventListener('agent-complete', (e: MessageEvent) => {
      try {
        const data = JSON.parse(e.data);
        updateAgent(data.agent as AgentName, { status: 'completed', result: data.result });
      } catch { /* ignore parse errors */ }
    });

    es.addEventListener('agent-error', (e: MessageEvent) => {
      try {
        const data = JSON.parse(e.data);
        updateAgent(data.agent as AgentName, { status: 'error', result: data.error || data.message });
        setError(`Agent "${data.agent}" encountered an error: ${data.error || data.message}`);
      } catch { /* ignore parse errors */ }
    });

    es.addEventListener('pipeline-complete', (e: MessageEvent) => {
      try {
        const data = JSON.parse(e.data);
        setReportId(data.reportId);
        es.close();
      } catch { /* ignore parse errors */ }
    });

    es.onerror = () => {
      if (es.readyState === EventSource.CLOSED) return;
      setError('Connection to the analysis pipeline was lost. Please try again.');
      es.close();
    };

    return () => {
      es.close();
      eventSourceRef.current = null;
    };
  }, [id, updateAgent]);

  // No ID state
  if (!id) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
        <div className="glass-card p-10 rounded-3xl text-center max-w-md animate-scale-in">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold mb-3">No Analysis Found</h2>
          <p className="text-muted mb-8 leading-relaxed">
            We couldn't find an analysis ID. Please head back to the home page to start a new one.
          </p>
          <Link
            href="/"
            className="btn-gradient inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-white font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const agentProgressData = AGENT_CONFIG.map(a => ({
    name: a.name,
    label: a.label,
    description: a.description,
    status: agents[a.name].status,
  }));

  const allCompleted = Object.values(agents).every(a => a.status === 'completed');
  const anyRunning = Object.values(agents).some(a => a.status === 'running');

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden pb-32">
      {/* Background effects */}
      <div className="hero-grid fixed inset-0 pointer-events-none" />
      <div className="hero-glow fixed inset-0 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-10">
        {/* Top Badge */}
        <div className="flex justify-center mb-10 animate-fade-up">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md shadow-lg">
            <Rocket className="w-4.5 h-4.5 text-blue-400" />
            <span className="text-sm font-medium text-foreground tracking-wide">
              {allCompleted ? 'Analysis Complete' : 'AI Agents Analyzing Startup'}
            </span>
            {anyRunning && (
              <span className="flex items-center gap-1.5 ml-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-glow-pulse" />
              </span>
            )}
            {allCompleted && (
              <span className="flex items-center gap-1.5 ml-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
              </span>
            )}
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-8 animate-slide-in">
            <div className="flex items-start gap-3 px-5 py-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <p className="text-sm leading-relaxed">{error}</p>
            </div>
          </div>
        )}

        {/* Top Section — Agent Progress */}
        <section className="mb-12">
          <AgentProgress agents={agentProgressData} />
        </section>

        {/* Main — Streaming Outputs */}
        <section className="space-y-4 mb-16">
          {AGENT_CONFIG.map((agent, index) => {
            const delayClass = index === 0 ? 'delay-100' : index === 1 ? 'delay-200' : index === 2 ? 'delay-300' : 'delay-400';
            return (
              <div key={agent.name} className={`animate-fade-up ${delayClass}`}>
                <StreamingOutput
                  agentName={agent.name}
                  label={agent.label}
                  status={agents[agent.name].status}
                  result={agents[agent.name].result}
                />
              </div>
            );
          })}
        </section>

        {/* View Report Button */}
        {allCompleted && reportId && (
          <div className="flex justify-center animate-scale-in delay-500">
            <Link
              href={`/report/${reportId}`}
              className="group btn-gradient flex items-center gap-3 px-8 py-5 rounded-2xl text-white font-semibold text-lg shadow-xl shadow-blue-500/20"
            >
              <Sparkles className="w-5 h-5" />
              <span>View Full Report</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
          <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
            <span className="text-sm font-medium">Loading dashboard...</span>
          </div>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
