export function analyzeGoalMock(goal: string) {
  return {
    suggestedCategory: goal.toLowerCase().includes('health') ? 'Health' :
                      goal.toLowerCase().includes('money') ? 'Finance' :
                      'Personal Development',
    milestones: [
      'Start with small steps',
      'Build consistent habits',
      'Track your progress',
      'Celebrate small wins'
    ],
    specificity: 'moderate'
  };
}

export function getMotivationMock(progress: number) {
  if (progress === 0) return "Every journey begins with a single step. Let's make it count!";
  if (progress < 25) return "You've taken the first steps. Keep building momentum!";
  if (progress < 50) return "You're making steady progress! Each step counts.";
  if (progress < 75) return "You're well past halfway! Your dedication shows.";
  if (progress < 100) return "The finish line is in sight! Keep pushing!";
  return "Incredible achievement! Time to set new goals!";
} 