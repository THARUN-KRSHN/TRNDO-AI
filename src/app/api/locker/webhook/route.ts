import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // TRNDO AI Agentic Parsing Logic
        // 1. Multilingual parsing (Malayalam + Hinglish)
        // 2. Intent Detection
        // 3. Auto-tagging

        const message = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
        const text = message?.text?.body || '';

        // Mock Intent Detection
        let intent = 'General';
        if (text.toLowerCase().includes('price') || text.toLowerCase().includes('rate')) intent = 'Price Query';
        if (text.toLowerCase().includes('order') || text.toLowerCase().includes('stock')) intent = 'Order';

        return NextResponse.json({
            received: true,
            parsedIntent: intent,
            sender: message?.from,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
    }
}

export async function GET(req: Request) {
    // WhatsApp Webhook Verification
    const { searchParams } = new URL(req.url);
    const hubMode = searchParams.get('hub.mode');
    const hubToken = searchParams.get('hub.verify_token');
    const hubChallenge = searchParams.get('hub.challenge');

    if (hubMode === 'subscribe' && hubToken === process.env.WHATSAPP_VERIFY_TOKEN) {
        return new Response(hubChallenge, { status: 200 });
    }

    return new Response('Forbidden', { status: 403 });
}
