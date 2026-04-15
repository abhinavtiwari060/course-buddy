import { Search } from 'lucide-react';

export default function FilterBar({ filters, setFilters, courses }) {
  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-orange-100 dark:border-slate-700 flex flex-col md:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400" size={18} />
        <input
          type="text"
          placeholder="Search title, tag, notes, course..."
          value={filters.search}
          onChange={(e) => setFilters({...filters, search: e.target.value})}
          className="w-full pl-10 pr-4 py-2 bg-orange-50 dark:bg-slate-900 border border-orange-100 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 dark:text-white transition-shadow"
        />
      </div>

      <div className="flex gap-2 flex-wrap sm:flex-nowrap">
        {[
          { key: 'course', all: 'All Courses', options: courses.map(c => c.name) },
          { key: 'status', all: 'All Status',  options: ['Pending', 'Completed'] },
          { key: 'platform', all: 'All Platforms', options: ['YouTube', 'Telegram', 'Other'] },
        ].map(({ key, all, options }) => (
          <select
            key={key}
            value={filters[key]}
            onChange={(e) => setFilters({...filters, [key]: e.target.value})}
            className="bg-orange-50 dark:bg-slate-900 border border-orange-100 dark:border-slate-700 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 dark:text-white transition-shadow appearance-none min-w-[120px]"
          >
            <option value="All">{all}</option>
            {options.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        ))}
      </div>
    </div>
  );
}
