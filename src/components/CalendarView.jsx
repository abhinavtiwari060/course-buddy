import { Calendar } from 'lucide-react';

export default function CalendarView({ videos }) {
  // Simple heatmap array
  const last30Days = Array.from({length: 30}, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return d.toDateString();
  });

  const completedMap = {};
  videos.filter(v => v.completed).forEach(v => {
    const dStr = new Date(v.completedAt).toDateString();
    completedMap[dStr] = (completedMap[dStr] || 0) + 1;
  });

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
      <h3 className="text-lg font-bold mb-4 dark:text-white flex items-center gap-2">
        <Calendar size={20} className="text-pink-500" /> Activity Calendar (30 Days)
      </h3>
      <div className="flex flex-wrap gap-1.5 mt-2">
        {last30Days.map((ds, i) => {
          const count = completedMap[ds] || 0;
          let color = 'bg-slate-100 dark:bg-slate-700'; // level 0
          if (count === 1) color = 'bg-pink-200 dark:bg-pink-900/40';
          if (count === 2) color = 'bg-pink-300 dark:bg-pink-800/60';
          if (count >= 3) color = 'bg-pink-500 shadow-sm';

          return (
            <div 
              key={i} 
              title={`${ds}: ${count} videos`}
              className={`w-6 h-6 rounded-md ${color} transition-colors cursor-help hover:ring-2 ring-offset-1 dark:ring-offset-slate-800 ring-pink-400`}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
