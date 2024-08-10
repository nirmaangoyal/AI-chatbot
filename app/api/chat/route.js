import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { jsPDF } from 'jspdf';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const systemPrompt = `
You are a travel assistant specialized in creating itineraries.
Your main focus is on generating detailed, well-formatted travel plans.
Each itinerary should be visually appealing, include useful resources, external links for booking cars, hotels, etc., and be formatted in Markdown for easy rendering.
At the end of the conversation, provide an option for the user to download the itinerary as a PDF.
`;

export async function POST(req) {
  try {
    const data = await req.json();

    if (!data.messages || !Array.isArray(data.messages)) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'system', content: systemPrompt }, ...data.messages],
    });

    const responseContent = completion.choices[0].message.content.trim();

    return NextResponse.json({ messages: [{ role: 'assistant', content: responseContent }] });

  } catch (error) {
    console.error("Error in POST:", error);
    return NextResponse.json({ error: "An error occurred while processing your request." }, { status: 500 });
  }
}
