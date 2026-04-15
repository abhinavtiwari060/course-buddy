import ThemeToggle from './ThemeToggle';
import { BookOpen, Zap } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="navbar-blur flex justify-between items-center py-3 px-6 bg-white/80 dark:bg-slate-900/80 border-b border-orange-200/60 dark:border-slate-800 sticky top-0 z-20 shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="btn-primary p-2.5 rounded-xl flex items-center justify-center">
            <BookOpen size={22} />
          </div>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white dark:border-slate-900 pulse-dot" />
        </div>
        <div>
          <h1 className="text-xl font-black grad-text leading-none tracking-tight">
            Course Buddy
          </h1>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium tracking-widest uppercase leading-none mt-0.5">
            Learn · Track · Grow
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 dark:bg-slate-800 border border-orange-200 dark:border-slate-700 text-xs text-orange-600 dark:text-orange-400 font-semibold">
          <Zap size={12} fill="currentColor" />
          Focus Mode
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
}
