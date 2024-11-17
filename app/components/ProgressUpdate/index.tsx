'use client';

import { useState } from 'react';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProgressUpdateProps {
  currentProgress: number;
  onUpdate: (newProgress: number) => Promise<void>;
}

export default function ProgressUpdate({ currentProgress, onUpdate }: ProgressUpdateProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleProgressUpdate = async () => {
    setIsUpdating(true);
    const newProgress = Math.min(100, currentProgress + 25);
    
    await onUpdate(newProgress);
    
    if (newProgress === 100) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
    
    setIsUpdating(false);
  };

  return (
    <button
      onClick={handleProgressUpdate}
      disabled={isUpdating || currentProgress >= 100}
      className={`w-full mt-4 py-3 px-4 rounded-xl font-medium flex items-center justify-center space-x-2
        ${currentProgress >= 100 
          ? 'bg-green-50 text-green-600 dark:bg-green-900/20' 
          : 'bg-purple-50 text-purple-600 hover:bg-purple-100 dark:bg-purple-900/20 dark:hover:bg-purple-900/30'
        } transition-all duration-200`}
    >
      {currentProgress >= 100 ? (
        <>
          <CheckCircle2 className="w-5 h-5" />
          <span>Completed!</span>
        </>
      ) : (
        <>
          <ChevronRight className="w-5 h-5" />
          <span>{isUpdating ? 'Updating...' : 'Update Progress'}</span>
        </>
      )}
    </button>
  );
} 