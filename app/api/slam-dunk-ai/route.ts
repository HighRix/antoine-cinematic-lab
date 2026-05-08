import { NextResponse } from 'next/server';

/**
 * AI Texture Lab — generates a basketball design from a "vibe" prompt.
 * Uses Google Gemini if GEMINI_API_KEY is set, otherwise returns 501.
 */
export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'GEMINI_API_KEY not set in .env.local' },
      { status: 501 }
    );
  }

  let prompt: string;
  try {
    const body = await request.json();
    prompt = (body.prompt || '').trim();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!prompt) {
    return NextResponse.json({ error: 'Empty prompt' }, { status: 400 });
  }

  const systemPrompt = `You are a professional 3D product designer specializing in sports equipment.
Your task is to generate a cohesive design configuration for a basketball based on the user's "vibe" prompt.

User Prompt: "${prompt}"

Available Patterns:
- 'classic': Standard pebble grain.
- 'street': Rough outdoor texture, deep channels.
- 'tech': Futuristic nodes, geometric lines, clean look.
- 'cross': Aggressive X-pattern grip.

CRITICAL COLOR LOGIC:
- The 'accentColor' MUST harmonize with the theme.
- "Ice/Frozen/Cold": Whites, Cyans, Pale Blues. Accent = Cyan or bright White.
- "Lava/Fire": Reds, Oranges, Blacks. Accent = bright Orange or Yellow.
- "Dark/Stealth": Blacks, Dark Greys. Accent = subtle neon or white.
- "Luxury/Royal": Gold, Purple, Black, White. Accent = Gold.

Output STRICT JSON only with keys: primaryColor (hex), lineColor (hex), accentColor (hex), texturePattern (one of classic|street|tech|cross), explanation (1 sentence).`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: systemPrompt }] }],
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.9,
          },
        }),
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json(
        { error: `Gemini API error: ${errText.slice(0, 200)}` },
        { status: 502 }
      );
    }

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      return NextResponse.json({ error: 'Empty response' }, { status: 502 });
    }

    const parsed = JSON.parse(text);
    return NextResponse.json(parsed);
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
