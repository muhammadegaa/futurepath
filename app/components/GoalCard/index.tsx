'use client';

import { useState, useEffect } from 'react';
import { Target, Brain, Wallet } from 'lucide-react';
import { getMotivationalMessage } from '@/app/lib/watson';
import ProgressUpdate from '../ProgressUpdate';
import type { Goal } from '@/app/lib/types';

const categoryIcons = {
  Health: Target,
  Finance: Wallet,
  'Personal Development': Brain,
};

interface GoalCardProps {
  goal: Goal;
  onProgressUpdate: (id: string, newProgress: number) => Promise<void>;
}

export default function GoalCard({ goal, onProgressUpdate }: GoalCardProps) {
  const [motivation, setMotivation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const Icon = categoryIcons[goal.category];

  useEffect(() => {
    async function fetchMotivation() {
      setIsLoading(true);
      try {
        const message = await getMotivationalMessage(goal.title, goal.progress, goal.category);
        setMotivation(message);
      } catch (error) {
        console.error('Error fetching motivation:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMotivation();
  }, [goal.progress, goal.title, goal.category]);

  const getProgressColor = (progress: number) => {
    if (progress < 25) return 'from-red-500 to-orange-500';
    if (progress < 50) return 'from-orange-500 to-yellow-500';
    if (progress < 75) return 'from-yellow-500 to-green-500';
    return 'from-green-500 to-emerald-500';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-800 transition-all duration-200">
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <Icon className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-xl font-semibold">{goal.title}</h2>
          </div>
          <span className="px-3 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-600 rounded-full text-sm font-medium">
            {goal.category}
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 dark:text-gray-400">Progress</span>
            <span className="font-medium text-purple-600">{goal.progress}%</span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3">
            <div
              className={`bg-gradient-to-r ${getProgressColor(goal.progress)} h-3 rounded-full transition-all duration-500 ease-out`}
              style={{ width: `${goal.progress}%` }}
            />
          </div>
          
          <div className="min-h-[4rem] flex items-center justify-center">
            {isLoading ? (
              <div className="animate-pulse flex space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-.3s]" />
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-.5s]" />
              </div>
            ) : motivation ? (
              <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                "{motivation}"
              </p>
            ) : null}
          </div>
        </div>

        <ProgressUpdate 
          currentProgress={goal.progress}
          onUpdate={(newProgress) => onProgressUpdate(goal.id, newProgress)}
        />
      </div>
    </div>
  );
}
