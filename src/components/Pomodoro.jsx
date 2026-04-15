import { useState, useEffect } from 'react';
import { Timer, Pause, Play, RotateCcw } from 'lucide-react';

export default function Pomodoro() {
  const [mode, setMode] = useState('pomodoro'); // pomodoro, shortBreak
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  // Total duration for progress ring
  const totalTime = mode === 'pomodoro' ? 25 * 60 : 5 * 60;
  const progressPercent = ((totalTime - timeLeft) / totalTime) * 100;

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      if (Notification.permission === 'granted') {
        new Notification("Time's up!", { body: mode === 'pomodoro' ? 'Take a break!' : 'Back to work!' });
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode]);

  const toggle = () => {
    if (!isActive && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
    setIsActive(!isActive);
  };
  
  const reset = () => {
    setIsActive(false);
    setTimeLeft(mode === 'pomodoro' ? 25 * 60 : 5 * 60);
  };

  const setTimerMode = (m) => {
    setMode(m);
    setIsActive(false);
    setTimeLeft(m === 'pomodoro' ? 25 * 60 : 5 * 60);
  };

  const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const secs = (timeLeft % 60).toString().padStart(2, '0');

  return (
    <div className="glass-card p-6 rounded-3xl text-center relative overflow-hidden">
      {/* Decorative BG element */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 dark:bg-orange-500/5 rounded-full blur-2xl" />

      <h3 className="text-xl font-black mb-5 dark:text-white flex items-center justify-center gap-2 relative z-10">
        <Timer size={24} className="text-orange-500 animate-pulse" /> Focus Block
      </h3>
      
      <div className="flex justify-center gap-2 mb-8 relative z-10">
        <button 
          onClick={() => setTimerMode('pomodoro')} 
          className={`px-4 py-1.5 text-sm font-bold rounded-xl transition-all ${mode === 'pomodoro' ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
        >
          25m Focus
        </button>
        <button 
          onClick={() => setTimerMode('shortBreak')} 
          className={`px-4 py-1.5 text-sm font-bold rounded-xl transition-all ${mode === 'shortBreak' ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
        >
          5m Break
        </button>
      </div>

      <div className="flex justify-center mb-8 relative z-10">
        <div 
          className="pomo-ring shadow-lg" 
          style={{ '--progress': `${progressPercent}%` }}
        >
          <div className="pomo-inner shadow-inner">
            <div className={`text-4xl font-black tabular-nums tracking-tighter ${isActive ? 'grad-text pulse' : 'text-slate-800 dark:text-white'}`}>
              {mins}:{secs}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 relative z-10">
        <button 
          onClick={toggle}
          className={`p-4 rounded-2xl text-white transition-all transform hover:scale-105 shadow-xl ${isActive ? 'bg-amber-500 shadow-amber-500/30' : 'bg-orange-500 shadow-orange-500/30'}`}
        >
          {isActive ? <Pause fill="currentColor" size={24} /> : <Play fill="currentColor" size={24} className="ml-1" />}
        </button>
        <button 
          onClick={reset}
          className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all transform hover:scale-105 shadow-sm"
        >
          <RotateCcw size={24} />
        </button>
      </div>
    </div>
  );
}
