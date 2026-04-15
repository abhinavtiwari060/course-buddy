import { useState } from 'react';
import { detectPlatform } from '../utils/helpers';
import { Video } from 'lucide-react';

export default function AddVideoForm({ courses, onAddVideo }) {
  const [formData, setFormData] = useState({
    title: '', link: '', hours: '0', minutes: '0', seconds: '0', course: '', tag: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.link || !formData.course) return;

    const totalSeconds =
      (parseInt(formData.hours   || 0) * 3600) +
      (parseInt(formData.minutes || 0) * 60)   +
       parseInt(formData.seconds || 0);

    if (totalSeconds <= 0) { alert('Please enter a valid duration greater than 0'); return; }

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
      order: Date.now(),
      thumbnail: detectPlatform(formData.link) === 'YouTube' ? `https://i.ytimg.com/vi/${extractVideoId(formData.link)}/mqdefault.jpg` : null
    });

    setFormData({ title: '', link: '', hours: '0', minutes: '0', seconds: '0', course: formData.course, tag: '' });
  };

  function extractVideoId(url) {
    try {
      const u = new URL(url);
      if (u.hostname === 'youtu.be') return u.pathname.slice(1);
      return u.searchParams.get('v') || null;
    } catch {
      return null;
    }
  }

  const inputCls = "w-full text-sm bg-white/50 dark:bg-slate-900/50 border border-orange-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:text-white transition-shadow";
  const numCls  = "w-full text-sm bg-white/50 dark:bg-slate-900/50 border border-orange-200 dark:border-slate-700 rounded-xl px-2 py-2.5 text-center focus:outline-none focus:ring-2 focus:ring-orange-500 dark:text-white transition-shadow";

  return (
    <div className="glass-card p-6 rounded-3xl relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-amber-500/10 dark:bg-amber-500/5 rounded-tl-full pointer-events-none" />
      <h3 className="text-xl font-bold mb-5 dark:text-white flex items-center gap-2 relative z-10">
        <Video size={22} className="text-orange-500" />
        Add Content Manually
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10">
        <div className="grid grid-cols-1 gap-4">
          <input type="text" placeholder="Video Title" required value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className={inputCls} />
          <input type="url" placeholder="Video Link (YouTube/Telegram)" required value={formData.link}
            onChange={(e) => setFormData({...formData, link: e.target.value})}
            className={inputCls} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select required value={formData.course}
            onChange={(e) => setFormData({...formData, course: e.target.value})}
            className={inputCls + " appearance-none"}>
            <option value="" disabled>Select Course</option>
            {courses.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>
          <input type="text" placeholder="Tag (e.g. Array)" value={formData.tag}
            onChange={(e) => setFormData({...formData, tag: e.target.value})}
            className={inputCls} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 ml-1">Duration (HH:MM:SS)</label>
          <div className="flex gap-2 items-center">
            <input type="number" min="0" placeholder="HH" value={formData.hours}
              onChange={(e) => setFormData({...formData, hours: e.target.value})} className={numCls} />
            <span className="text-orange-400 font-bold">:</span>
            <input type="number" min="0" max="59" placeholder="MM" value={formData.minutes}
              onChange={(e) => setFormData({...formData, minutes: e.target.value})} className={numCls} />
            <span className="text-orange-400 font-bold">:</span>
            <input type="number" min="0" max="59" placeholder="SS" value={formData.seconds}
              onChange={(e) => setFormData({...formData, seconds: e.target.value})} className={numCls} />
          </div>
        </div>
        <button type="submit"
          className="btn-primary w-full py-3 rounded-xl transition-colors mt-2">
          Add Video manually
        </button>
      </form>
    </div>
  );
}
