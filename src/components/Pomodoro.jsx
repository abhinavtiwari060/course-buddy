import { useState, useEffect } from 'react';
import { Timer, Pause, Play, RotateCcw } from 'lucide-react';

export default function Pomodoro() {
  const [mode, setMode] = useState('pomodoro'); // pomodoro, shortBreak
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

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
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 text-center">
      <h3 className="text-lg font-bold mb-4 dark:text-white flex items-center justify-center gap-2">
        <Timer size={20} className="text-red-500" /> Focus Mode
      </h3>
      
      <div className="flex justify-center gap-2 mb-6">
        <button 
          onClick={() => setTimerMode('pomodoro')} 
          className={`px-3 py-1 text-sm rounded-full ${mode === 'pomodoro' ? 'bg-red-100 text-red-600 dark:bg-red-900/30' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
        >
          25m Focus
        </button>
        <button 
          onClick={() => setTimerMode('shortBreak')} 
          className={`px-3 py-1 text-sm rounded-full ${mode === 'shortBreak' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
        >
          5m Break
        </button>
      </div>

      <div className="text-6xl font-black tabular-nums text-slate-800 dark:text-white mb-6">
        {mins}:{secs}
      </div>

      <div className="flex justify-center gap-4">
        <button 
          onClick={toggle}
          className={`p-4 rounded-full text-white transition-colors shadow-md ${isActive ? 'bg-amber-500 hover:bg-amber-600' : 'bg-red-500 hover:bg-red-600'}`}
        >
          {isActive ? <Pause fill="currentColor" size={24} /> : <Play fill="currentColor" size={24} />}
        </button>
        <button 
          onClick={reset}
          className="p-4 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
        >
          <RotateCcw size={24} />
        </button>
      </div>
    </div>
  );
}
