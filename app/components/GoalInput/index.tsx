'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { GoalCategory } from '@/app/lib/types';
import { Target, Brain, Wallet } from 'lucide-react';
import { analyzeGoal } from '@/app/lib/watson';

const categories = [
  { id: 'Health', label: 'Health & Fitness', icon: Target },
  { id: 'Finance', label: 'Finance & Career', icon: Wallet },
  { id: 'Personal Development', label: 'Personal Growth', icon: Brain },
];

export default function GoalInput() {
  const router = useRouter();
  const [goal, setGoal] = useState('');
  const [category, setCategory] = useState<GoalCategory>('Personal Development');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal.trim()) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: goal, category }),
      });
      
      if (!response.ok) throw new Error('Failed to create goal');
      router.push('/dashboard');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTitleChange = async (value: string) => {
    setTitle(value);
    setError('');
    setSuggestions([]); // Clear previous suggestions
    
    if (value.length >= 5) {
      setLoading(true);
      try {
        const analysis = await analyzeGoal(value);
        if (analysis.error) {
          console.warn('Goal analysis warning:', analysis.error);
        }
        setCategory((analysis.suggestedCategory as GoalCategory) || 'Personal Development');
        setSuggestions(analysis.milestones || []);
      } catch (err) {
        console.error('Error analyzing goal:', err);
        setCategory('Personal Development');
      } finally {
        setLoading(false);
      }
    } else {
      setCategory('Personal Development');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label 
          htmlFor="goal" 
          className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
        >
          What&apos;s your goal?
        </label>
        <input
          type="text"
          id="goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                   rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                   shadow-sm dark:placeholder-gray-400"
          placeholder="e.g., Run a marathon in 6 months"
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label 
          htmlFor="category" 
          className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
        >
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value as GoalCategory)}
          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                   rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                   shadow-sm"
          disabled={isSubmitting}
        >
          <option value="Health">Health & Fitness</option>
          <option value="Finance">Finance & Career</option>
          <option value="Personal Development">Personal Growth</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-4 rounded-lg text-white font-medium 
                 bg-gradient-to-r from-blue-500 to-purple-600 
                 hover:opacity-90 transition-all duration-200 shadow-sm 
                 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Creating...' : 'Create Goal'}
      </button>
    </form>
  );
}
