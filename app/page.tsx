import { Search, BarChart3, Layout, Presentation, Sparkles, Zap, Brain, Rocket, ArrowRight, ChevronRight } from 'lucide-react';
import IdeaForm from '@/components/IdeaForm';

const features = [
  {
    icon: Search,
    title: 'Research Agent',
    description: 'Deep market analysis, competitor research, and trend identification powered by real-time web search.',
    gradient: 'from-blue-500 to-cyan-400',
    glow: 'shadow-blue-500/20',
    number: '01',
  },
  {
    icon: BarChart3,
    title: 'Business Agent',
    description: 'SWOT analysis, value proposition, revenue model, and competitive positioning strategy.',
    gradient: 'from-violet-500 to-purple-400',
    glow: 'shadow-violet-500/20',
    number: '02',
  },
  {
    icon: Layout,
    title: 'Planning Agent',
    description: 'MVP features, product roadmap, team structure, tech stack, and budget estimation.',
    gradient: 'from-amber-500 to-orange-400',
    glow: 'shadow-amber-500/20',
    number: '03',
  },
  {
    icon: Presentation,
    title: 'Pitch Agent',
    description: 'Investor-ready pitch deck, executive summary, and use-of-funds breakdown.',
    gradient: 'from-emerald-500 to-green-400',
    glow: 'shadow-emerald-500/20',
    number: '04',
  },
];

const stats = [
  { value: '4', label: 'AI Agents' },
  { value: '10+', label: 'Pitch Slides' },
  { value: '< 2min', label: 'Full Report' },
  { value: '∞', label: 'Possibilities' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Background Effects */}
      <div className="hero-grid fixed inset-0" />
      <div className="hero-radial fixed inset-0" />

      {/* Large ambient glow orbs */}
      <div className="fixed top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-accent/8 blur-[120px] animate-float" />
      <div className="fixed top-[10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-500/6 blur-[140px] animate-float delay-300" />
      <div className="fixed bottom-[-5%] left-[20%] w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px] animate-float delay-500" />
      <div className="fixed bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full bg-emerald-500/4 blur-[100px] animate-float delay-700" />

      {/* Orbiting dots */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none hidden lg:block">
        <div className="absolute w-2.5 h-2.5 rounded-full bg-accent-light/40 animate-orbit" style={{ top: '0%', left: '50%' }} />
        <div className="absolute w-2 h-2 rounded-full bg-purple-400/35 animate-orbit delay-200" style={{ top: '50%', left: '100%' }} />
        <div className="absolute w-3 h-3 rounded-full bg-cyan-400/25 animate-orbit delay-500" style={{ top: '100%', left: '50%' }} />
        <div className="absolute w-1.5 h-1.5 rounded-full bg-amber-400/35 animate-orbit delay-700" style={{ top: '50%', left: '0%' }} />
      </div>

      {/* Floating accent shapes */}
      <div className="fixed top-32 right-[15%] w-4 h-4 rounded-full bg-accent/50 animate-float delay-100 hidden lg:block" />
      <div className="fixed top-48 left-[12%] w-3 h-3 rounded-full bg-purple-400/50 animate-float delay-400 hidden lg:block" />
      <div className="fixed bottom-60 right-[20%] w-3.5 h-3.5 rounded-full bg-emerald-400/40 animate-float delay-200 hidden lg:block" />
      <div className="fixed bottom-80 left-[18%] w-2 h-2 rounded-full bg-amber-400/40 animate-float delay-600 hidden lg:block" />

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center min-h-screen px-6 py-24">
          {/* Badge */}
          <div className="animate-slide-up mb-10">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-accent/25 bg-accent/10 backdrop-blur-md text-base font-medium text-accent-light shadow-lg shadow-accent/5">
              <Sparkles className="w-5 h-5" />
              <span>Powered by 4 AI Agents</span>
              <Zap className="w-4.5 h-4.5 text-amber-400" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-center max-w-6xl leading-[1.05] animate-slide-up delay-75 tracking-tight">
            <span className="gradient-text-warm">AI Startup</span>
            <br />
            <span className="gradient-text-warm">Co-Founder</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-8 text-xl md:text-2xl text-muted text-center max-w-3xl leading-relaxed animate-slide-up delay-150">
            Transform your startup idea into a comprehensive business plan, SWOT analysis,
            MVP roadmap, and investor-ready pitch deck — <span className="text-foreground/80 font-medium">in under 2 minutes</span>.
          </p>

          {/* Pipeline indicator */}
          <div className="flex items-center gap-4 mt-10 animate-slide-up delay-200">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/60 backdrop-blur-sm border border-border/40">
              <Brain className="w-4.5 h-4.5 text-blue-400" />
              <span className="text-sm font-medium text-muted">Research</span>
            </div>
            <ArrowRight className="w-4 h-4 text-muted/40" />
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/60 backdrop-blur-sm border border-border/40">
              <BarChart3 className="w-4.5 h-4.5 text-purple-400" />
              <span className="text-sm font-medium text-muted">Analyze</span>
            </div>
            <ArrowRight className="w-4 h-4 text-muted/40" />
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/60 backdrop-blur-sm border border-border/40">
              <Layout className="w-4.5 h-4.5 text-amber-400" />
              <span className="text-sm font-medium text-muted">Plan</span>
            </div>
            <ArrowRight className="w-4 h-4 text-muted/40" />
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/60 backdrop-blur-sm border border-border/40">
              <Rocket className="w-4.5 h-4.5 text-emerald-400" />
              <span className="text-sm font-medium text-muted">Pitch</span>
            </div>
          </div>

          {/* IdeaForm */}
          <div className="w-full max-w-3xl mt-16 animate-slide-up delay-300">
            <IdeaForm />
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mt-16 animate-slide-up delay-400">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-muted mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Feature Cards Section */}
        <section className="px-6 pb-40">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm text-sm font-medium text-muted mb-6 animate-fade-in">
                <Brain className="w-4 h-4 text-accent-light" />
                How It Works
              </div>
              <h2 className="text-4xl md:text-6xl font-extrabold gradient-text mb-6 tracking-tight">
                Four AI Agents, One Vision
              </h2>
              <p className="text-muted text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
                Our intelligent pipeline works sequentially, each agent building on the last to deliver a complete startup strategy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const delayClass = index === 0 ? 'delay-75' : index === 1 ? 'delay-150' : index === 2 ? 'delay-300' : 'delay-500';
                return (
                  <div
                    key={feature.title}
                    className={`group relative rounded-3xl animate-slide-up ${delayClass} transition-all duration-500`}
                  >
                    {/* Hover glow */}
                    <div className={`absolute -inset-0.5 bg-gradient-to-br ${feature.gradient} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />

                    <div className="glass-card relative p-10 rounded-3xl hover:border-accent/30 transition-all duration-500 h-full">
                      {/* Step number watermark */}
                      <div className="absolute top-6 right-8 text-6xl font-black text-foreground/[0.03] select-none">
                        {feature.number}
                      </div>

                      {/* Icon container */}
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-7 group-hover:scale-110 group-hover:shadow-2xl ${feature.glow} transition-all duration-300 shadow-lg`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>

                      {/* Step label */}
                      <div className="text-sm font-semibold text-muted/50 mb-2 tracking-widest uppercase">
                        Step {index + 1}
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-foreground mb-4">
                        {feature.title}
                      </h3>

                      {/* Description */}
                      <p className="text-base text-muted leading-relaxed mb-6">
                        {feature.description}
                      </p>

                      {/* Learn more hint */}
                      <div className="flex items-center gap-1.5 text-sm font-medium text-accent-light/60 group-hover:text-accent-light transition-colors">
                        <span>Learn more</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>

                      {/* Bottom accent line */}
                      <div className={`absolute bottom-0 left-6 right-6 h-1 rounded-full w-0 group-hover:w-[calc(100%-3rem)] bg-gradient-to-r ${feature.gradient} transition-all duration-700 opacity-80`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 pb-32">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="glass-card rounded-3xl p-12 md:p-16 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-accent/10 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-purple-500/10 blur-3xl" />
              <div className="relative">
                <h3 className="text-3xl md:text-5xl font-bold gradient-text-warm mb-6">
                  Ready to Build Your Startup?
                </h3>
                <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-8">
                  Enter your idea above and let our AI agents create your complete business strategy in minutes.
                </p>
                <div className="flex items-center justify-center gap-2 text-accent-light font-medium text-lg">
                  <Sparkles className="w-5 h-5" />
                  <span>Scroll up to get started</span>
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 border-t border-border/30 py-10 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-base text-muted/60">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center">
                <Rocket className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="font-semibold">AI Startup Co-Founder</span>
            </div>
            <p className="text-sm text-muted/40">
              Built with AI agents • Powered by GPT-4o & Next.js
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
