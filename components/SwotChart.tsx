import { cn } from '@/lib/utils';
import { Shield, AlertTriangle, TrendingUp, Zap } from 'lucide-react';
import type { SWOT } from '@/types';

const quadrants = [
  { key: 'strengths' as const, label: 'Strengths', icon: Shield, color: 'text-green-400', bg: 'swot-strength', border: 'border-green-500/20' },
  { key: 'weaknesses' as const, label: 'Weaknesses', icon: AlertTriangle, color: 'text-red-400', bg: 'swot-weakness', border: 'border-red-500/20' },
  { key: 'opportunities' as const, label: 'Opportunities', icon: TrendingUp, color: 'text-blue-400', bg: 'swot-opportunity', border: 'border-blue-500/20' },
  { key: 'threats' as const, label: 'Threats', icon: Zap, color: 'text-amber-400', bg: 'swot-threat', border: 'border-amber-500/20' },
];

interface SwotChartProps {
  swot: SWOT;
}

export default function SwotChart({ swot }: SwotChartProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {quadrants.map((q, i) => {
        const Icon = q.icon;
        const items = swot[q.key] || [];
        return (
          <div
            key={q.key}
            className={cn(
              'rounded-xl border p-5 animate-scale-in',
              q.bg, q.border,
              `delay-${(i + 1) * 100}`
            )}
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center bg-white/5', q.color)}>
                <Icon className="w-4 h-4" />
              </div>
              <h4 className={cn('font-semibold text-sm', q.color)}>{q.label}</h4>
              <span className="ml-auto text-xs text-muted-dark bg-white/5 px-2 py-0.5 rounded-full">
                {items.length}
              </span>
            </div>
            <ul className="space-y-2">
              {items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-foreground/80">
                  <span className={cn('mt-1.5 w-1.5 h-1.5 rounded-full shrink-0', q.color.replace('text-', 'bg-'))} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
