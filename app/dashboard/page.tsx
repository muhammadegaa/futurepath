'use client';

import { useEffect, useState } from 'react';
import { Sparkles, Plus } from 'lucide-react';
import Link from 'next/link';
import type { Goal } from '@/app/lib/types';
import GoalCard from '@/app/components/GoalCard';
import ThemeToggle from '@/app/components/ThemeToggle';

export default function DashboardPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await fetch('/api/goals');
      if (!response.ok) throw new Error('Failed to fetch goals');
      const data = await response.json();
      setGoals(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProgressUpdate = async (id: string, newProgress: number) => {
    try {
      const response = await fetch(`/api/goals/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ progress: newProgress }),
      });
      
      if (!response.ok) throw new Error('Failed to update progress');
      await fetchGoals();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-purple-600" />
            <h1 className="text-2xl font-bold dark:text-white">Your Goals</h1>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link
              href="/goal"
              className="flex items-center space-x-2 px-4 py-2 bg-purple-50 dark:bg-purple-900/20 
                         text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-100 
                         dark:hover:bg-purple-900/30 transition-all duration-200"
            >
              <Plus className="w-5 h-5" />
              <span>New Goal</span>
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full mx-auto" />
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your goals...</p>
          </div>
        ) : goals.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="max-w-sm mx-auto space-y-4">
              <p className="text-gray-600 dark:text-gray-400">No goals yet. Start by creating one!</p>
              <Link
                href="/goal"
                className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-all duration-200"
              >
                Create Your First Goal
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-6">
            {goals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onProgressUpdate={handleProgressUpdate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 