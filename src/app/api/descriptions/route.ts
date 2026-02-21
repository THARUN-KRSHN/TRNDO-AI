import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { item, location, occasion } = await req.json();

        const response = await fetch('https://descriptionmakeaton-production-577a.up.railway.app/get_description', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                item,
                location: location || 'IN-KL',
                occasion: occasion || 'General'
            }),
        });

        if (!response.ok) {
            throw new Error(`Description API responded with status: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Description API Proxy Error:', error);
        return NextResponse.json({ error: error.message || 'Failed to fetch description' }, { status: 500 });
    }
}
