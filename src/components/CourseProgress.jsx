import { BookOpen } from 'lucide-react';
import ProgressBar from './ProgressBar';

export default function CourseProgress({ courses, videos }) {
  if (courses.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
      <h3 className="text-lg font-bold mb-4 dark:text-white flex items-center gap-2">
        <BookOpen size={20} className="text-teal-500" /> Course Progress
      </h3>
      <div className="space-y-4">
        {courses.map(course => {
          const courseVideos = videos.filter(v => v.course === course.name);
          const total = courseVideos.length;
          const completed = courseVideos.filter(v => v.completed).length;
          const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

          return (
            <div key={course.id} className="relative">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-semibold text-slate-800 dark:text-slate-200">{course.name}</span>
                <span className="text-slate-500 font-medium">{completed}/{total} ({progress}%)</span>
              </div>
              <ProgressBar progress={progress} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
