import { useState } from 'react';
import { PlusCircle } from 'lucide-react';

export default function AddCourseForm({ onAddCourse }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddCourse({ id: Date.now().toString(), name: name.trim() });
    setName('');
  };

  return (
    <div className="glass-card p-6 rounded-3xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 dark:bg-orange-500/5 rounded-bl-full pointer-events-none" />
      <h3 className="text-xl font-bold mb-5 dark:text-white flex items-center gap-2 relative z-10">
        <PlusCircle size={22} className="text-orange-500" />
        New Subject
      </h3>
      <form onSubmit={handleSubmit} className="flex gap-2 relative z-10">
        <input
          type="text"
          placeholder="e.g. Data Structures"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 bg-white/50 dark:bg-slate-900/50 border border-orange-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:text-white transition-shadow text-sm"
          required
        />
        <button
          type="submit"
          className="btn-primary px-6 py-2.5 rounded-xl text-sm transition-colors whitespace-nowrap shadow-sm shadow-orange-200 dark:shadow-none"
        >
          Add
        </button>
      </form>
    </div>
  );
}
