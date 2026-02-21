import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { occasion } = await req.json();

        const response = await fetch('https://trend-production-aefb.up.railway.app/get_trends', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ occasion }),
        });

        if (!response.ok) {
            throw new Error(`Backend responded with status: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Trend API Proxy Error:', error);
        return NextResponse.json({ error: error.message || 'Failed to fetch trends' }, { status: 500 });
    }
}
