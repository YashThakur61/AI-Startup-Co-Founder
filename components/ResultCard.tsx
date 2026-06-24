import { cn } from '@/lib/utils';

interface ResultCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  delay?: string;
}

export default function ResultCard({ title, icon, children, className, delay }: ResultCardProps) {
  return (
    <div className={cn('glass-card rounded-2xl overflow-hidden animate-slide-in', delay, className)}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/[0.06] flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-violet-500/20 flex items-center justify-center text-blue-400">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>
      {/* Body */}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}
