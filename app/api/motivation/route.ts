import { NextResponse } from 'next/server';
import { getMotivationMock } from '@/app/lib/mock-ai';

export async function POST(request: Request) {
  try {
    const { progress } = await request.json();
    return NextResponse.json({
      message: getMotivationMock(progress)
    });
  } catch (error) {
    console.error('Motivation Error:', error);
    return NextResponse.json({
      message: getMotivationMock(0)
    });
  }
} 