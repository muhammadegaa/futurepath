export async function getMotivationalMessage(
  goal: string, 
  progress: number,
  category: string
): Promise<string> {
  try {
    const response = await fetch('/api/motivation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ goal, progress, category })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.message || getDefaultMotivation(progress);
    
  } catch (error) {
    console.error('Error fetching motivation:', error);
    return getDefaultMotivation(progress);
  }
}

function getDefaultMotivation(progress: number): string {
  if (progress === 0) return "Every journey begins with a single step. Let's make it count!";
  if (progress < 25) return "You've taken the first steps - that's often the hardest part. Keep building momentum!";
  if (progress < 50) return "You're making steady progress! Each step forward is a victory.";
  if (progress < 75) return "You're well past the halfway mark! Your dedication is truly showing.";
  if (progress < 100) return "The finish line is in sight! You've come so far, don't stop now!";
  return "Incredible achievement! Time to set new heights!";
} 

interface GoalAnalysis {
  suggestedCategory: string;
  milestones: string[];
  error?: string;
}

export async function analyzeGoal(goalText: string): Promise<GoalAnalysis> {
  if (!goalText || goalText.length < 3) {
    return {
      suggestedCategory: 'Personal Development',
      milestones: [],
      error: 'Goal text too short'
    };
  }

  try {
    const response = await fetch('/api/analyze-goal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ goal: goalText })
    });
    
    const data = await response.json();
    
    return {
      suggestedCategory: data.suggestedCategory || 'Personal Development',
      milestones: data.milestones || [],
      error: data.error
    };
  } catch (error) {
    console.error('Error analyzing goal:', error);
    return {
      suggestedCategory: 'Personal Development',
      milestones: [],
      error: 'Failed to analyze goal'
    };
  }
} 