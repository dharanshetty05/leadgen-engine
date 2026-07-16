// // import { GoogleGenAI } from "@google/genai";
// import { Creator } from "../types/creator";

// import dotenv from "dotenv";
// dotenv.config();

// // const ai = new GoogleGenAI({
// //     apiKey: process.env.GEMINI_API_KEY!,
// // });

// export async function classifyCreator(creator: Creator) {

//     const prompt = `
// You are working as the lead qualification assistant for Shaurya.

// ========================
// ABOUT SHAURYA
// ========================

// Shaurya is NOT a graphic designer.

// He is a Thumbnail Strategist.

// He helps personal brands and educational creators get more clicks with simple, curiosity-driven thumbnails.

// His offer:

// - 1 Custom Thumbnail
// - Thumbnail Strategy
// - Curiosity-driven concept
// - Click psychology explanation
// - 48-hour delivery
// - $29

// He believes creators hire him for better click packaging, NOT better graphics.

// ========================
// IDEAL CLIENT PROFILE
// ========================

// Creator Type

// - Personal Brand
// - Educational Creator
// - Expert-based Creator
// - Commentary Creator

// Topics

// - Self Improvement
// - Psychology
// - Business
// - Marketing
// - Productivity
// - Personal Branding
// - Creator Economy
// - Educational Content
// - Case Studies

// Preferred Subscriber Count

// 10k - 200k

// Mindset

// The creator probably believes:

// "My content is good, but people aren't clicking."

// The creator values strategy, experimentation and improving CTR.

// ========================
// POOR FIT
// ========================

// Reject if the creator is primarily:

// - Gaming
// - Entertainment
// - Music
// - Kids content
// - Sports
// - News
// - TV channel
// - Media company
// - Corporate brand
// - University
// - Government
// - Podcast network
// - Meme content

// Reject if the channel is NOT primarily built around an individual creator or expert.

// ========================
// HOW TO THINK
// ========================

// Imagine Shaurya is about to spend time personally sending an Instagram DM.

// Ask yourself:

// 1. Would Shaurya realistically reach out to this creator?

// 2. Does this creator appear likely to benefit from curiosity-driven thumbnail strategy?

// 3. Is thumbnail packaging likely to have a meaningful impact on this creator's growth?

// 4. Would this creator realistically pay $29 for this service?

// If the answer is uncertain,

// return fit = false.

// Be STRICT.

// It is much better to reject a creator than recommend a poor lead.

// ========================
// CREATOR
// ========================

// ${JSON.stringify(creator, null, 2)}

// ========================
// OUTPUT
// ========================

// Return ONLY valid JSON.

// {
//   "fit": true,
//   "confidence": 95,
//   "creatorType": "Personal Brand",
//   "primaryTopic": "Business",
//   "thumbnailOpportunity": "High",
//   "recommendedAction": "Reach Out",
//   "reason": "...",
//   "redFlags": []
// }

// Rules:

// - confidence must be 0-100
// - thumbnailOpportunity must be High, Medium or Low
// - recommendedAction must be Reach Out or Skip
// - redFlags must always be an array
// - Return JSON only.
// - Do not wrap the JSON in markdown.
// `;

//     const response = await ai.models.generateContent({
//         model: "gemini-2.0-flash",
//         contents: prompt,
//     });

//     const cleaned = response.text
//         ?.replace(/```json/g, "")
//         .replace(/```/g, "")
//         .trim();

//     return JSON.parse(cleaned!);
// }