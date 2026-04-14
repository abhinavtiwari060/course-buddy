import ThemeToggle from './ThemeToggle';
import { BookOpen } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="bg-indigo-600 p-2 rounded-lg text-white">
          <BookOpen size={24} />
        </div>
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
          Course Buddy
        </h1>
      </div>
      <div>
        <ThemeToggle />
      </div>
    </nav>
  );
}
