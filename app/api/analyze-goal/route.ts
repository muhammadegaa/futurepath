import { NextResponse } from 'next/server';
import { analyzeGoalMock } from '@/app/lib/mock-ai';

export async function POST(request: Request) {
  try {
    const { goal } = await request.json();
    const analysis = analyzeGoalMock(goal);
    
    return NextResponse.json({
      suggestedCategory: analysis.suggestedCategory,
      milestones: analysis.milestones,
      specificity: analysis.specificity,
      timeframe: null,
      suggestions: ['Break down your goal into smaller steps']
    });
  } catch (error) {
    console.error('Analysis Error:', error);
    return NextResponse.json({
      suggestedCategory: 'Personal Development',
      milestones: [],
      timeframe: null,
      suggestions: ['Please provide a more specific goal'],
      specificity: 'vague' as const
    });
  }
} 