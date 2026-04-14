import { Search, Filter } from 'lucide-react';

export default function FilterBar({ filters, setFilters, courses }) {
  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          placeholder="Search videos by title..."
          value={filters.search}
          onChange={(e) => setFilters({...filters, search: e.target.value})}
          className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-shadow"
        />
      </div>
      
      <div className="flex gap-2 flex-wrap sm:flex-nowrap">
        <select
          value={filters.course}
          onChange={(e) => setFilters({...filters, course: e.target.value})}
          className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-shadow appearance-none min-w-[120px]"
        >
          <option value="All">All Courses</option>
          {courses.map(course => (
            <option key={course.id} value={course.name}>{course.name}</option>
          ))}
        </select>
        
        <select
          value={filters.status}
          onChange={(e) => setFilters({...filters, status: e.target.value})}
          className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-shadow appearance-none min-w-[120px]"
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          value={filters.platform}
          onChange={(e) => setFilters({...filters, platform: e.target.value})}
          className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-shadow appearance-none min-w-[140px]"
        >
          <option value="All">All Platforms</option>
          <option value="YouTube">YouTube</option>
          <option value="Telegram">Telegram</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </div>
  );
}
