import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { keyword, volume, distance } = await req.json();

    // TrendScore = Volume / Distance²
    const score = volume / Math.pow(distance, 2);

    // Mock logic for fad-exit velocity
    const velocity = Math.random() * 100; 

    return NextResponse.json({
      keyword,
      score,
      velocity,
      status: 'active',
      recommendation: score > 50 ? 'Immediate Action' : 'Monitor'
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to calculate score' }, { status: 500 });
  }
}
