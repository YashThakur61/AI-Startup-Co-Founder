'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Rocket, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-[#0f172a]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
            <Rocket className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg text-foreground tracking-tight hidden sm:block">
            AI Co-Founder
          </span>
        </Link>

        {/* Right side */}
        {!isHome && (
          <Link
            href="/"
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium',
              'bg-gradient-to-r from-blue-600 to-violet-600 text-white',
              'hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5',
              'transition-all duration-300'
            )}
          >
            <Plus className="w-4 h-4" />
            New Analysis
          </Link>
        )}
      </div>
    </nav>
  );
}
