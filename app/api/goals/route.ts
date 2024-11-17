import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';
import type { Goal } from '@/app/lib/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { data, error } = await supabase
      .from('goals')
      .insert([
        {
          title: body.title,
          category: body.category,
          progress: 0,
        }
      ])
      .select()
      .single();
    
    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error('Error creating goal:', err);
    return NextResponse.json(
      { error: 'Failed to create goal' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const { data, error } = await supabase
    .from('goals')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    return NextResponse.json(
      { error: 'Failed to fetch goals' },
      { status: 500 }
    );
  }
  
  return NextResponse.json(data);
}
