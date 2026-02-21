import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: Request) {
    try {
        const geminiKey = process.env.GEMINI_API_KEY || '';
        const openRouterKey = process.env.OPENROUTER_API_KEY || '';
        const { prompt, language = 'Malayalam' } = await req.json();

        const keyword = prompt.toLowerCase().includes('for "')
            ? prompt.split('for "')[1].split('"')[0]
            : prompt.split(' ')[0];

        let caption = "";
        let modelUsed = "";

        // ✍️ UNIVERSAL CAPTION ENGINE

        // Strategy A: Official Google Gemini
        if (geminiKey && geminiKey !== 'your_gemini_api_key_here') {
            const genAI = new GoogleGenerativeAI(geminiKey);
            const textModels = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash", "gemini-pro"];

            const captionPrompt = `Write a short, engaging social media caption for this: "${prompt}". Language: ${language}. Local to Irinjalakuda, Kerala. Include emojis and #Irinjalakuda #TRNDOAI. Text only.`;

            for (const name of textModels) {
                try {
                    const model = genAI.getGenerativeModel({ model: name });
                    const result = await model.generateContent(captionPrompt);
                    caption = result.response.text();
                    modelUsed = `Google ${name}`;
                    break;
                } catch (e) { continue; }
            }
        }

        // Strategy B: OpenRouter (Gemini Free)
        if (!caption && openRouterKey && openRouterKey !== 'your_openrouter_api_key_here') {
            try {
                const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${openRouterKey}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "model": "google/gemini-2.0-flash-exp:free",
                        "messages": [
                            { "role": "user", "content": `Write a short social media caption for this: "${prompt}". Language: ${language}. #Irinjalakuda #TRNDOAI. Text only.` }
                        ]
                    })
                });
                const data = await response.json();
                if (data.choices?.[0]?.message?.content) {
                    caption = data.choices[0].message.content;
                    modelUsed = "OpenRouter Gemini Free";
                }
            } catch (e) { console.error("OR Error:", e); }
        }

        // Final Caption Fallback
        if (!caption) {
            caption = language === 'Malayalam'
                ? `പുതിയ ട്രെൻഡ് "${keyword}" ഇന്നുതന്നെ സ്വന്തമാക്കൂ! ഇരിങ്ങാലക്കുടയിലെ നിങ്ങളുടെ പ്രിയപ്പെട്ട സ്റ്റോറിൽ ഇപ്പോൾ ലഭ്യമാണ്. 🌟 #Irinjalakuda #TRNDOAI`
                : `Get the new "${keyword}" trend today! Available now at your favorite Irinjalakuda store. 🌟 #Irinjalakuda #TRNDOAI`;
        }

        return NextResponse.json({
            caption: caption.trim(),
            modelUsed,
            generatedAt: new Date().toISOString()
        });

    } catch (error: any) {
        console.error('Studio Error:', error);
        return NextResponse.json({ error: 'AI Generation failed', details: error.message }, { status: 500 });
    }
}
