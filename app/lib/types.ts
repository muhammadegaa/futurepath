export type GoalCategory = 'Health' | 'Finance' | 'Personal Development';

export interface GoalAnalysis {
  suggestedCategory: GoalCategory;
  milestones: string[];
  timeframe: string | null;
  specificity: 'vague' | 'specific';
  suggestions: string[];
  error?: string;
}

export interface Goal {
  id: string;
  title: string;
  category: GoalCategory;
  progress: number;
  timeframe?: string;
  milestones: string[];
  lastUpdated: Date;
}
