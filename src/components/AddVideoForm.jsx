import { useState } from 'react';
import { detectPlatform } from '../utils/helpers';
import { Video } from 'lucide-react';

export default function AddVideoForm({ courses, onAddVideo }) {
  const [formData, setFormData] = useState({
    title: '',
    link: '',
    hours: '0',
    minutes: '0',
    seconds: '0',
    course: '',
    tag: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.link || !formData.course) return;

    const totalSeconds = (parseInt(formData.hours || 0) * 3600) + 
                         (parseInt(formData.minutes || 0) * 60) + 
                         parseInt(formData.seconds || 0);

    if (totalSeconds <= 0) return alert('Please enter a valid duration greater than 0');

    onAddVideo({
      id: Date.now().toString(),
      title: formData.title,
      link: formData.link,
      platform: detectPlatform(formData.link),
      duration: totalSeconds,
      course: formData.course,
      tag: formData.tag,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null,
      notes: '',
      order: Date.now() // added for drag and drop priority
    });

    setFormData({ title: '', link: '', hours: '0', minutes: '0', seconds: '0', course: formData.course, tag: '' });
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
      <h3 className="text-lg font-bold mb-5 dark:text-white flex items-center gap-2">
        <Video size={20} className="text-indigo-500" />
        Add New Video
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Video Title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-shadow"
            required
          />
          <input
            type="url"
            placeholder="Video Link (YouTube/Telegram)"
            value={formData.link}
            onChange={(e) => setFormData({...formData, link: e.target.value})}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-shadow"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={formData.course}
            onChange={(e) => setFormData({...formData, course: e.target.value})}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-shadow appearance-none"
            required
          >
            <option value="" disabled>Select Course</option>
            {courses.map(course => (
              <option key={course.id} value={course.name}>{course.name}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Tag (e.g. Array)"
            value={formData.tag}
            onChange={(e) => setFormData({...formData, tag: e.target.value})}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-shadow"
          />
          <div className="flex gap-2 items-center">
            <input
              type="number" min="0" placeholder="HH" value={formData.hours}
              onChange={(e) => setFormData({...formData, hours: e.target.value})}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-2 py-2.5 text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-shadow"
            />
            <span className="text-slate-500">:</span>
            <input
              type="number" min="0" max="59" placeholder="MM" value={formData.minutes}
              onChange={(e) => setFormData({...formData, minutes: e.target.value})}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-2 py-2.5 text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-shadow"
            />
            <span className="text-slate-500">:</span>
            <input
              type="number" min="0" max="59" placeholder="SS" value={formData.seconds}
              onChange={(e) => setFormData({...formData, seconds: e.target.value})}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-2 py-2.5 text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-shadow"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white w-full py-3 rounded-xl font-medium transition-colors mt-2 shadow-md shadow-indigo-200 dark:shadow-none"
        >
          Add Video
        </button>
      </form>
    </div>
  );
}
