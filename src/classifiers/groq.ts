import OpenAI from "openai";
import { Creator } from "../types/creator";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY!,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function classifyCreator(creator: Creator) {

  const prompt = `
You are helping Shaurya qualify outreach leads.

Shaurya helps personal brands and educational creators get more clicks using curiosity-driven thumbnails.

Ideal clients:
- Personal Brand
- Educational Creator
- Business
- Psychology
- Marketing
- Productivity
- Self Improvement
- Creator Economy

Reject:
- Gaming
- Music
- Entertainment
- Sports
- Kids
- News
- Corporate brands
- Universities
- Media companies

Ask yourself:

Would Shaurya realistically spend time sending this creator an Instagram DM?

Would this creator likely pay $29 for thumbnail strategy?

Be strict.

Creator:

${JSON.stringify(creator, null, 2)}

Return ONLY JSON.

{
  "fit": true,
  "confidence": 95,
  "creatorType": "Personal Brand",
  "primaryTopic": "Business",
  "recommendedAction": "Reach Out",
  "reason": "...",
  "redFlags": []
}
`;

  const completion = await client.chat.completions.create({
    model: "openai/gpt-oss-20b",
    temperature: 0.2,
    response_format: {
      type: "json_object",
    },
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return JSON.parse(
    completion.choices[0].message.content!
  );
}