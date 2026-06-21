'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  FileText,
  Search,
  BarChart3,
  Layout,
  Presentation,
  Download,
  Sparkles,
  TrendingUp,
  Users,
  Target,
  DollarSign,
  Lightbulb,
  AlertCircle,
  CheckCircle2,
  Clock,
  Briefcase,
  Code2,
  Share2,
  Quote
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { FullReport, Competitor, Feature, TeamMember, PitchSlide } from '@/types';
import ResultCard from '@/components/ResultCard';
import SwotChart from '@/components/SwotChart';
import RoadmapTimeline from '@/components/RoadmapTimeline';

/* ──────────────── Shimmer Skeleton ──────────────── */
function ShimmerBlock({ className }: { className?: string }) {
  return <div className={cn('rounded-2xl bg-white/[0.03] animate-shimmer', className)} />;
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      <div className="hero-grid fixed inset-0 pointer-events-none" />
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-10 relative z-10">
        <ShimmerBlock className="h-12 w-3/4 mb-6" />
        <ShimmerBlock className="h-6 w-1/2 mb-10" />
        <div className="flex gap-4 mb-16">
          <ShimmerBlock className="h-12 w-40" />
          <ShimmerBlock className="h-12 w-40" />
        </div>
        <ShimmerBlock className="h-80 w-full" />
        <ShimmerBlock className="h-64 w-full" />
        <ShimmerBlock className="h-96 w-full" />
      </div>
    </div>
  );
}

/* ──────────────── Helper Components ──────────────── */
function StatCard({ label, value, icon: Icon, colorClass }: { label: string; value: string | number | undefined; icon: any; colorClass: string }) {
  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col gap-4 group hover:border-white/20 transition-all duration-300">
      <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 shadow-inner', colorClass)}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm text-muted-dark uppercase tracking-wider mb-1 font-medium">{label}</p>
        <p className="text-2xl font-bold text-foreground truncate">{value || 'N/A'}</p>
      </div>
    </div>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  const colors: Record<string, string> = {
    'must-have': 'bg-green-500/10 text-green-400 border-green-500/20',
    'should-have': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'nice-to-have': 'bg-white/5 text-muted border-white/10',
  };
  const normalized = priority?.toLowerCase() || '';
  const cls = colors[normalized] || colors['nice-to-have'];
  return (
    <span className={cn('inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border uppercase tracking-wider', cls)}>
      {priority}
    </span>
  );
}

/* ──────────────── Main Report Page ──────────────── */
export default function ReportPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [report, setReport] = useState<FullReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${(totalScroll / windowHeight) * 100}%`;
      setScrollProgress(parseFloat(scroll));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/report/${id}`)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to load report (${res.status})`);
        return res.json();
      })
      .then(data => {
        setReport(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <LoadingSkeleton />;

  if (error || !report) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 pt-20">
        <div className="glass-card p-10 rounded-3xl text-center max-w-md animate-scale-in">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold mb-3">Failed to Load Report</h2>
          <p className="text-muted mb-8 leading-relaxed">{error || 'Report not found.'}</p>
          <Link href="/" className="btn-gradient inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-white font-medium">
            <ArrowLeft className="w-5 h-5" /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const { research, business, planning, pitch } = report;

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden pb-32">
      {/* Scroll Progress Indicator */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* Backgrounds */}
      <div className="hero-grid fixed inset-0 pointer-events-none" />
      <div className="hero-glow fixed inset-0 pointer-events-none" />

      {/* Header Section */}
      <div className="relative z-10 pt-16 pb-12">
        <div className="max-w-5xl mx-auto px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-dark hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4 animate-fade-in">
                <Sparkles className="w-4 h-4" /> Comprehensive Analysis
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 animate-slide-up">
                Startup <span className="gradient-text-hero">Blueprint</span>
              </h1>
              {report.createdAt && (
                <p className="text-muted text-lg animate-slide-up delay-100">
                  Generated {new Date(report.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 animate-slide-up delay-200">
              <a href={`/api/download/report?id=${id}`} className="btn-gradient inline-flex items-center gap-2 px-5 py-3 rounded-xl text-white font-medium shadow-lg shadow-blue-500/20">
                <Download className="w-4.5 h-4.5" /> Full PDF
              </a>
              <a href={`/api/download/pitch?id=${id}`} className="relative group inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium transition-all shadow-lg shadow-purple-500/20">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-md" />
                <Presentation className="w-4.5 h-4.5" /> Pitch Deck
              </a>
              <button onClick={() => navigator.clipboard.writeText(window.location.href)} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-foreground font-medium transition-all">
                <Share2 className="w-4.5 h-4.5" /> Share
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="relative z-10 max-w-5xl mx-auto px-6 space-y-12">
        {/* ═══ Section 1: Market Research ═══ */}
        <section className="scroll-mt-24" id="research">
          <ResultCard title="Market Research" icon={<Search className="w-5 h-5" />} className="delay-100">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
              <StatCard label="Market Size" value={research?.marketSize} icon={TrendingUp} colorClass="text-blue-400" />
              <StatCard label="Competitors" value={research?.competitors?.length || 0} icon={Target} colorClass="text-purple-400" />
              <StatCard label="Trends" value={research?.trends?.length || 0} icon={Lightbulb} colorClass="text-amber-400" />
            </div>

            {/* Competitors Chips */}
            {research?.competitors && research.competitors.length > 0 && (
              <div className="mb-10">
                <h4 className="text-lg font-semibold text-foreground mb-4">Competitor Landscape</h4>
                <div className="flex flex-wrap gap-3">
                  {research.competitors.map((comp: Competitor, i: number) => (
                    <div key={i} className="inline-flex items-center gap-3 px-4 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] hover:border-white/20 transition-colors cursor-default group">
                      <div className="w-2 h-2 rounded-full bg-red-400 group-hover:animate-pulse" />
                      <span className="text-sm font-medium">{comp.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trends Timeline */}
            {research?.trends && research.trends.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-4">Key Market Trends</h4>
                <div className="space-y-4">
                  {research.trends.map((trend: string, i: number) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
                      <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 mt-0.5">
                        <TrendingUp className="w-4 h-4 text-blue-400" />
                      </div>
                      <p className="text-muted leading-relaxed">{trend}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </ResultCard>
        </section>

        {/* ═══ Section 2: SWOT Analysis ═══ */}
        <section className="scroll-mt-24" id="swot">
          <ResultCard title="SWOT Analysis" icon={<BarChart3 className="w-5 h-5" />} className="delay-200">
            {business?.swot ? (
              <SwotChart swot={business.swot} />
            ) : (
              <p className="text-muted">No SWOT analysis available.</p>
            )}
          </ResultCard>
        </section>

        {/* ═══ Section 3: Business Analysis ═══ */}
        <section className="scroll-mt-24" id="business">
          <ResultCard title="Business Model" icon={<Briefcase className="w-5 h-5" />} className="delay-300">
            {/* Value Proposition Quote */}
            {business?.valueProposition && (
              <div className="relative p-8 md:p-10 rounded-3xl bg-gradient-to-br from-blue-600/10 to-violet-600/10 border border-blue-500/20 mb-8 overflow-hidden group">
                <Quote className="absolute -top-4 -left-4 w-32 h-32 text-blue-500/10 -rotate-12 group-hover:scale-110 transition-transform duration-700" />
                <h4 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-4 relative z-10">Value Proposition</h4>
                <p className="text-xl md:text-2xl font-medium text-foreground leading-relaxed relative z-10">
                  "{business.valueProposition}"
                </p>
              </div>
            )}

            {/* Revenue Model */}
            {business?.revenueModel && (
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Revenue Model</h4>
                  <p className="text-muted leading-relaxed">{business.revenueModel}</p>
                </div>
              </div>
            )}
          </ResultCard>
        </section>

        {/* ═══ Section 4: MVP Roadmap ═══ */}
        <section className="scroll-mt-24" id="roadmap">
          <ResultCard title="MVP Roadmap & Team" icon={<Layout className="w-5 h-5" />} className="delay-400">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Timeline */}
              <div>
                <h4 className="text-xl font-bold text-foreground mb-6">Execution Timeline</h4>
                {planning?.timeline ? (
                  <RoadmapTimeline phases={planning.timeline} />
                ) : (
                  <p className="text-muted">No timeline available.</p>
                )}
              </div>

              {/* Team Structure */}
              <div>
                <h4 className="text-xl font-bold text-foreground mb-6">Required Team</h4>
                {planning?.teamStructure && planning.teamStructure.length > 0 ? (
                  <div className="space-y-4">
                    {planning.teamStructure.map((member: TeamMember, i: number) => (
                      <div key={i} className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] transition-colors">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0 shadow-inner">
                            <Users className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h5 className="font-semibold text-foreground text-lg">{member.role}</h5>
                            {member.priority && <span className="text-xs text-muted-dark uppercase tracking-wider">{member.priority} Priority</span>}
                          </div>
                        </div>
                        {member.skills && member.skills.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {member.skills.map((skill: string, j: number) => (
                              <span key={j} className="px-2.5 py-1 rounded-lg bg-white/5 text-xs text-muted font-medium border border-white/10">
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted">No team structure available.</p>
                )}
              </div>
            </div>
          </ResultCard>
        </section>

        {/* ═══ Section 5: Pitch Deck ═══ */}
        <section className="scroll-mt-24" id="pitch">
          <ResultCard title="Pitch Deck Preview" icon={<Presentation className="w-5 h-5" />} className="delay-500">
            {pitch?.slides && pitch.slides.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pitch.slides.map((slide: PitchSlide, i: number) => (
                  <div key={i} className="aspect-video p-6 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 flex flex-col relative group overflow-hidden">
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="flex items-start justify-between mb-4 relative z-10">
                      <h5 className="font-bold text-lg text-foreground pr-8">{slide.title}</h5>
                      <span className="text-4xl font-black text-white/5 absolute top-2 right-4 select-none">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    
                    <div className="flex-1 relative z-10">
                      {slide.content && <p className="text-sm text-muted line-clamp-3 mb-3">{slide.content}</p>}
                      {slide.bulletPoints && slide.bulletPoints.length > 0 && (
                        <ul className="space-y-1.5">
                          {slide.bulletPoints.slice(0, 3).map((bp: string, j: number) => (
                            <li key={j} className="flex items-start gap-2 text-xs text-muted-dark">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1" />
                              <span className="line-clamp-1">{bp}</span>
                            </li>
                          ))}
                          {slide.bulletPoints.length > 3 && (
                            <li className="text-xs text-blue-400 font-medium italic mt-2">+ {slide.bulletPoints.length - 3} more points</li>
                          )}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted">No pitch deck slides available.</p>
            )}
          </ResultCard>
        </section>
      </main>
    </div>
  );
}
