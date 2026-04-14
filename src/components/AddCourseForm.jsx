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
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
      <h3 className="text-lg font-bold mb-4 dark:text-white flex items-center gap-2">
        <PlusCircle size={20} className="text-indigo-500" />
        Add New Course
      </h3>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="e.g. Data Structures"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-shadow"
          required
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl font-medium transition-colors whitespace-nowrap"
        >
          Add
        </button>
      </form>
    </div>
  );
}
