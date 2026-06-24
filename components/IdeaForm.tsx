'use client';

import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Rocket, Upload, FileText, Loader2, X, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function IdeaForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [idea, setIdea] = useState('');
  const [targetMarket, setTargetMarket] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const charCount = idea.length;
  const isValid = charCount >= 20 && targetMarket.trim().length > 0;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setFileName(file.name);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type === 'application/pdf') {
      setFileName(file.name);
    }
  }, []);

  const removeFile = () => {
    setFileName(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || isLoading) return;
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('idea', idea);
      formData.append('targetMarket', targetMarket);
      const file = fileInputRef.current?.files?.[0];
      if (file) {
        formData.append('file', file);
      }

      const res = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to start analysis');
      const data = await res.json();
      router.push('/dashboard?id=' + data.startupId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="glass-card rounded-2xl p-8 md:p-10 relative overflow-hidden">
        {/* Decorative corner glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative space-y-6">
          {/* Idea Textarea */}
          <div>
            <label htmlFor="idea" className="block text-sm font-medium text-foreground mb-2">
              Your Startup Idea
            </label>
            <div className="relative">
              <textarea
                id="idea"
                rows={4}
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="Describe your startup idea in detail — what problem does it solve, who is it for, and how does it work?"
                className={cn(
                  'glow-input w-full rounded-xl border bg-white/[0.03] px-4 py-3.5 text-[15px] text-foreground leading-relaxed',
                  'placeholder:text-muted-dark/70 resize-none',
                  'focus:outline-none',
                  charCount > 0 && charCount < 20
                    ? 'border-warning/40'
                    : 'border-white/10'
                )}
              />
              <span className={cn(
                'absolute bottom-3 right-3 text-xs font-medium',
                charCount === 0 ? 'text-muted-dark/50' : charCount < 20 ? 'text-warning' : 'text-success'
              )}>
                {charCount}/20
              </span>
            </div>
          </div>

          {/* Target Market */}
          <div>
            <label htmlFor="targetMarket" className="block text-sm font-medium text-foreground mb-2">
              Target Market
            </label>
            <input
              id="targetMarket"
              type="text"
              value={targetMarket}
              onChange={(e) => setTargetMarket(e.target.value)}
              placeholder="e.g., Small business owners, Gen Z consumers, Healthcare providers"
              className="glow-input w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-[15px] text-foreground placeholder:text-muted-dark/70 focus:outline-none"
            />
          </div>

          {/* PDF Upload Drop Zone */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Upload Business Plan <span className="text-muted-dark">(Optional)</span>
            </label>
            <input ref={fileInputRef} type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
            {fileName ? (
              <div className="flex items-center gap-3 rounded-xl border border-blue-500/20 bg-blue-500/5 px-4 py-3.5">
                <FileText className="w-5 h-5 text-blue-400 shrink-0" />
                <span className="flex-1 truncate text-sm text-foreground">{fileName}</span>
                <button type="button" onClick={removeFile} className="rounded-lg p-1 text-muted-dark hover:text-foreground hover:bg-white/5 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                className={cn(
                  'w-full flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-6',
                  'text-sm text-muted-dark transition-all duration-300',
                  isDragOver
                    ? 'border-blue-500/50 bg-blue-500/5 text-blue-400'
                    : 'border-white/10 hover:border-white/20 hover:bg-white/[0.02]'
                )}
              >
                <Upload className="w-5 h-5" />
                <span>Drop PDF here or <span className="text-blue-400 font-medium">browse</span></span>
              </button>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isValid || isLoading}
            className={cn(
              'btn-gradient w-full flex items-center justify-center gap-3 rounded-xl px-6 py-4',
              'text-base font-semibold text-white',
              'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-none'
            )}
          >
            <span className="relative z-10 flex items-center gap-3">
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Launching AI Agents...
                </>
              ) : (
                <>
                  Analyze My Startup
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </span>
          </button>
        </div>
      </div>
    </form>
  );
}
