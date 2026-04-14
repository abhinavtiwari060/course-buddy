import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import StreakCard from './components/StreakCard';
import AddCourseForm from './components/AddCourseForm';
import AddVideoForm from './components/AddVideoForm';
import VideoCard from './components/VideoCard';
import FilterBar from './components/FilterBar';
import CompletedFeed from './components/CompletedFeed';
import Quotes from './components/Quotes';
import Pomodoro from './components/Pomodoro';
import Badges from './components/Badges';
import CalendarView from './components/CalendarView';
import CourseProgress from './components/CourseProgress';
import GoalAnalytics from './components/GoalAnalytics';
import DataTools from './components/DataTools';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Lightbulb, GripVertical, LayoutDashboard, Video, BarChart2, BookOpen } from 'lucide-react';

// ── Active tab navigation ─────────────────────────────────────────────────────
const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { id: 'videos',    label: 'Videos',    icon: <Video size={18} /> },
  { id: 'analytics', label: 'Analytics', icon: <BarChart2 size={18} /> },
  { id: 'courses',   label: 'Courses',   icon: <BookOpen size={18} /> },
];

export default function App() {
  const [courses, setCourses] = useLocalStorage('studyflow_courses', []);
  const [videos,  setVideos]  = useLocalStorage('studyflow_videos',  []);
  const [streak,  setStreak]  = useLocalStorage('studyflow_streak',  { count: 0, lastDate: null });
  const [goalTarget, setGoalTarget] = useLocalStorage('studyflow_goal', 3);
  const [activeTab, setActiveTab] = useState('dashboard');

  const [filters, setFilters] = useState({
    search: '',
    course: 'All',
    status: 'Pending',
    platform: 'All',
  });

  const [randomSuggestion, setRandomSuggestion] = useState(null);

  // ── Streak logic ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!streak.lastDate) return;
    const today = new Date().toDateString();
    const last  = new Date(streak.lastDate);
    const diff  = Math.ceil((new Date(today) - last) / 86_400_000);
    if (diff > 1) setStreak({ count: 0, lastDate: null });
  }, []);

  const updateStreak = () => {
    const today = new Date().toDateString();
    if (streak.lastDate === today) return;
    const last = streak.lastDate ? new Date(streak.lastDate) : null;
    const diff = last ? Math.ceil((new Date(today) - last) / 86_400_000) : 2;
    setStreak({ count: diff === 1 ? streak.count + 1 : 1, lastDate: today });
  };

  // ── Random suggestion ───────────────────────────────────────────────────────
  useEffect(() => {
    const pending = videos.filter(v => !v.completed);
    setRandomSuggestion(pending.length > 0 ? pending[Math.floor(Math.random() * pending.length)] : null);
  }, [videos]);

  // ── CRUD handlers ───────────────────────────────────────────────────────────
  const handleAddCourse  = (c)  => setCourses(prev => [...prev, c]);

  const handleAddVideo   = (v)  => setVideos(prev => [v, ...prev]);

  const handleToggleComplete = (id) =>
    setVideos(prev =>
      prev.map(v => {
        if (v.id !== id) return v;
        const completing = !v.completed;
        if (completing) updateStreak();
        return { ...v, completed: completing, completedAt: completing ? new Date().toISOString() : null };
      })
    );

  const handleUpdateNotes = (id, notes) =>
    setVideos(prev => prev.map(v => (v.id === id ? { ...v, notes } : v)));

  // ── Drag-and-drop ───────────────────────────────────────────────────────────
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const displayed  = getFiltered();
    const movedVideo = displayed[result.source.index];
    const targetVideo= displayed[result.destination.index];
    if (!movedVideo || !targetVideo) return;
    setVideos(prev => {
      const idxA = prev.findIndex(v => v.id === movedVideo.id);
      const idxB = prev.findIndex(v => v.id === targetVideo.id);
      const next  = [...prev];
      [next[idxA], next[idxB]] = [next[idxB], next[idxA]];
      return next;
    });
  };

  // ── Filtered list ───────────────────────────────────────────────────────────
  const getFiltered = () =>
    videos.filter(v => {
      const q   = filters.search.toLowerCase();
      const matchSearch  = v.title.toLowerCase().includes(q)
                        || (v.tag   || '').toLowerCase().includes(q)
                        || (v.notes || '').toLowerCase().includes(q)
                        || v.course.toLowerCase().includes(q);
      const matchCourse  = filters.course   === 'All' || v.course    === filters.course;
      const matchStatus  = filters.status   === 'All'
                        || (filters.status  === 'Completed' &&  v.completed)
                        || (filters.status  === 'Pending'   && !v.completed);
      const matchPlatform= filters.platform === 'All' || v.platform  === filters.platform;
      return matchSearch && matchCourse && matchStatus && matchPlatform;
    }).sort((a, b) => Number(b.completed) - Number(a.completed));

  const filteredVideos   = getFiltered();
  const completedVideos  = videos.filter(v => v.completed);

  // ── UI ──────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />

      {/* Tab bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-[65px] z-10">
        <div className="max-w-7xl mx-auto px-4 flex gap-1 overflow-x-auto">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap
                ${activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              {tab.icon}{tab.label}
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">

        {/* ── DASHBOARD TAB ─── */}
        {activeTab === 'dashboard' && (
          <>
            <Dashboard videos={videos} />
            <Quotes />
            <GoalAnalytics
              videos={videos}
              streak={streak.count}
              goalTarget={goalTarget}
              onUpdateGoal={setGoalTarget}
            />
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CalendarView videos={videos} />
              <Badges videos={videos} streak={streak.count} />
            </div>
          </>
        )}

        {/* ── VIDEOS TAB ─── */}
        {activeTab === 'videos' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: video list */}
            <div className="lg:col-span-2 space-y-6">

              {/* Suggestion banner */}
              {randomSuggestion && (
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-100 dark:border-indigo-800/30 rounded-2xl p-5 flex items-center gap-5 shadow-sm">
                  <div className="bg-white dark:bg-slate-800 p-3 rounded-full shadow-sm text-yellow-500 flex-shrink-0">
                    <Lightbulb size={28} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Next to Watch</span>
                    <p className="font-medium text-slate-800 dark:text-slate-200 truncate mt-0.5">{randomSuggestion.title}</p>
                  </div>
                  <button
                    onClick={() => window.open(randomSuggestion.link, '_blank')}
                    className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex-shrink-0"
                  >
                    Watch
                  </button>
                </div>
              )}

              <FilterBar filters={filters} setFilters={setFilters} courses={courses} />

              {/* Drag-and-drop list */}
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="videos">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      {filteredVideos.map((video, idx) => (
                        <Draggable key={video.id} draggableId={video.id} index={idx}>
                          {(prov, snapshot) => (
                            <div
                              ref={prov.innerRef}
                              {...prov.draggableProps}
                              className={`relative ${snapshot.isDragging ? 'opacity-80 scale-[1.02] shadow-xl' : ''} transition-transform`}
                            >
                              {/* Drag handle */}
                              <div
                                {...prov.dragHandleProps}
                                className="absolute top-3 right-3 cursor-grab text-slate-300 dark:text-slate-600 hover:text-indigo-400 z-10"
                                title="Drag to reorder"
                              >
                                <GripVertical size={18} />
                              </div>
                              <VideoCard
                                video={video}
                                onToggleComplete={handleToggleComplete}
                                onUpdateNotes={handleUpdateNotes}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}

                      {filteredVideos.length === 0 && (
                        <div className="col-span-full py-16 text-center text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                          No videos match your filters.
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>

            {/* Right sidebar */}
            <div className="space-y-6">
              <StreakCard streak={streak.count} />
              <Pomodoro />
              <AddCourseForm onAddCourse={handleAddCourse} />
              <AddVideoForm courses={courses} onAddVideo={handleAddVideo} />
            </div>
          </div>
        )}

        {/* ── ANALYTICS TAB ─── */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <GoalAnalytics
              videos={videos}
              streak={streak.count}
              goalTarget={goalTarget}
              onUpdateGoal={setGoalTarget}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CalendarView videos={videos} />
              <Badges videos={videos} streak={streak.count} />
            </div>
            <CompletedFeed videos={completedVideos} />
            <DataTools
              videos={videos}
              courses={courses}
              setVideos={setVideos}
              setCourses={setCourses}
            />
          </div>
        )}

        {/* ── COURSES TAB ─── */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <CourseProgress courses={courses} videos={videos} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AddCourseForm onAddCourse={handleAddCourse} />
              <AddVideoForm courses={courses} onAddVideo={handleAddVideo} />
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
