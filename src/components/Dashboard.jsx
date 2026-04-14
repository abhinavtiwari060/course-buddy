import ProgressBar from './ProgressBar';
import { formatDuration } from '../utils/helpers';
import { Clock, PlayCircle, CheckCircle2, TrendingUp } from 'lucide-react';

export default function Dashboard({ videos }) {
  const total            = videos.length;
  const completedVideos  = videos.filter(v => v.completed);
  const completed        = completedVideos.length;
  const remaining        = total - completed;
  const progress         = total === 0 ? 0 : Math.round((completed / total) * 100);
  const totalWatchSecs   = completedVideos.reduce((a, v) => a + (Number(v.duration) || 0), 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Total */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400 mb-2">
          <PlayCircle size={20} />
          <h3 className="font-medium">Total Videos</h3>
        </div>
        <p className="text-3xl font-bold dark:text-white">{total}</p>
      </div>

      {/* Completed */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-3 text-green-600 dark:text-green-400 mb-2">
          <CheckCircle2 size={20} />
          <h3 className="font-medium">Completed</h3>
        </div>
        <p className="text-3xl font-bold dark:text-white">{completed}</p>
      </div>

      {/* Progress */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400 mb-2">
          <TrendingUp size={20} />
          <h3 className="font-medium">Progress</h3>
        </div>
        <div className="flex items-end gap-2 mb-2">
          <p className="text-3xl font-bold dark:text-white">{progress}%</p>
          <span className="text-sm text-slate-500 mb-1">({remaining} left)</span>
        </div>
        <ProgressBar progress={progress} />
      </div>

      {/* Watch time */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-3 text-purple-600 dark:text-purple-400 mb-2">
          <Clock size={20} />
          <h3 className="font-medium">Watch Time</h3>
        </div>
        <p className="text-2xl font-bold dark:text-white break-words">{formatDuration(totalWatchSecs)}</p>
      </div>
    </div>
  );
}
