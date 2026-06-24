import { cn } from '@/lib/utils';
import { Calendar, Flag, Package } from 'lucide-react';
import type { TimelinePhase } from '@/types';

interface RoadmapTimelineProps {
  phases: TimelinePhase[];
}

export default function RoadmapTimeline({ phases }: RoadmapTimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-5 top-0 bottom-0 timeline-line" />

      <div className="space-y-6">
        {phases.map((phase, i) => (
          <div
            key={i}
            className={cn('relative pl-14 animate-fade-up', `delay-${(i + 1) * 100}`)}
          >
            {/* Dot */}
            <div className={cn(
              'absolute left-3 top-1 w-5 h-5 rounded-full border-2 border-blue-500 bg-background',
              'flex items-center justify-center',
            )}>
              <div className="w-2 h-2 rounded-full bg-blue-500" />
            </div>

            <div className="glass-card rounded-xl p-5">
              {/* Phase header */}
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <h4 className="font-semibold text-foreground">{phase.phase}</h4>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-medium text-blue-400">
                  <Calendar className="w-3 h-3" />
                  {phase.duration}
                </span>
              </div>

              {/* Milestones */}
              {phase.milestones?.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs font-medium text-muted-dark uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Flag className="w-3 h-3" /> Milestones
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {phase.milestones.map((m, j) => (
                      <span key={j} className="inline-flex items-center px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-foreground/80">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Deliverables */}
              {phase.deliverables?.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-muted-dark uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Package className="w-3 h-3" /> Deliverables
                  </p>
                  <ul className="space-y-1.5">
                    {phase.deliverables.map((d, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-foreground/80">
                        <span className="w-1 h-1 rounded-full bg-violet-400 shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
