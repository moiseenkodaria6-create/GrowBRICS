import { GoogleGenAI } from "@google/genai";

declare const process: { env: { API_KEY: string } };

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeJob = async (jobTitle: string, jobDescription: string, userRole: string): Promise<string> => {
  try {
    const prompt = `
      You are a career coach. 
      I am a ${userRole}.
      I am looking at a job posting for "${jobTitle}".
      
      Job Description: "${jobDescription}"
      
      Please provide a concise 3-bullet point summary on how I should prepare for an interview for this specific role. 
      Focus on key skills to highlight. Keep it encouraging and professional.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Unable to generate analysis at this time.";
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Sorry, I couldn't analyze this job right now. Please ensure your API key is configured.";
  }
};