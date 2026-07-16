import { GoogleGenAI } from "@google/genai";
import { Creator } from "../types/creator";

import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
});

export async function classifyCreator(creator: Creator) {

    const prompt = `
You are helping a thumbnail strategist qualify outreach leads.

Ideal clients:

- Personal brands
- Educational creators
- Business
- Marketing
- Productivity
- Psychology
- Self Improvement
- Creator Economy

Reject:

- Gaming
- Music
- Kids
- Entertainment
- Sports
- News
- Corporate brands
- TV channels

Creator:

${JSON.stringify(creator, null, 2)}

Return ONLY valid JSON.

{
    "fit": true,
    "confidence": 95,
    "reason": "..."
}
`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });

    return response.text;
}