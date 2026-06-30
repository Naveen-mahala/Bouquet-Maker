import { NextResponse } from 'next/server';

const FALLBACK_MESSAGES = [
  "{recipient}, every single petal in this bouquet carries a piece of my heart. Thank you for making ordinary days feel completely magical. ❤️",
  "To the girl who makes my world brighter and sweeter: may these flowers bring a smile to your face today. I love you, {recipient}.",
  "{recipient}, you are the beautiful bloom in the garden of my life. Thank you for your warmth, your laughter, and your love. Forever yours, {sender}.",
  "To my beautiful {recipient}: every bloom here is a small reminder of the joy you bring into my life. I'm so lucky to have you. ❤️",
  "Holding you in my heart today and every day, {recipient}. May these flowers show you even a fraction of the love I feel for you.",
  "Every flower in this arrangement is a whisper of my love for you, {recipient}. Thank you for being my absolute favorite person.",
  "Just a little bouquet to remind you how much you are cherished, {recipient}. You make every moment we share so beautiful.",
  "To my sweet {recipient}: you bring color to my quiet days and joy to my heart. I love you more than words can say. ❤️",
];

export async function POST(req: Request) {
  try {
    const { recipientName, senderName } = await req.json();

    const recipient = recipientName?.trim() || 'Bittu';
    const sender = senderName?.trim() || 'Navi';

    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      console.warn("OpenRouter API key is missing. Using custom fallback message bank.");
      return NextResponse.json({ message: getFallbackMessage(recipient, sender) });
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://localhost:3000', // Optional, for OpenRouter tracking
        'X-Title': 'Dream Bouquet Maker',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are an expert romantic florist writer. Generate a short, cute, romantic, heartfelt message for a girlfriend/partner.
Rules:
- Length: 2 to 4 lines.
- Style: Sweet, emotional, genuine, not cheesy.
- Constraints: Mention recipient name naturally. Mention or imply the sender's love where appropriate.
- Limit: Maximum 60 words.
- Format: Return ONLY the message itself. No quotation marks, no labels (like "To:" or "From:"), no markdown, no emojis in raw headers.`,
          },
          {
            role: 'user',
            content: `Generate a custom love message.
Recipient Name: ${recipient}
Sender Name: ${sender}`,
          },
        ],
        temperature: 0.85,
        max_tokens: 100,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("OpenRouter API returned an error:", errText);
      return NextResponse.json({ message: getFallbackMessage(recipient, sender) });
    }

    const data = await response.json();
    let messageText = data?.choices?.[0]?.message?.content?.trim();

    if (!messageText) {
      return NextResponse.json({ message: getFallbackMessage(recipient, sender) });
    }

    // Clean up surrounding quotes if the LLM outputted them anyway
    messageText = messageText.replace(/^["']|["']$/g, '').trim();

    return NextResponse.json({ message: messageText });
  } catch (error) {
    console.error("Failed to generate AI message, returning fallback:", error);
    // Graceful fallback to avoid exporting empty card
    try {
      const body = await req.clone().json().catch(() => ({}));
      const recipient = body?.recipientName?.trim() || 'Bittu';
      const sender = body?.senderName?.trim() || 'Navi';
      return NextResponse.json({ message: getFallbackMessage(recipient, sender) });
    } catch {
      return NextResponse.json({ message: getFallbackMessage('Bittu', 'Navi') });
    }
  }
}

function getFallbackMessage(recipient: string, sender: string): string {
  const index = Math.floor(Math.random() * FALLBACK_MESSAGES.length);
  const msg = FALLBACK_MESSAGES[index];
  return msg.replace(/{recipient}/g, recipient).replace(/{sender}/g, sender);
}
