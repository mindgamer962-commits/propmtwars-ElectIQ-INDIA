import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn("VITE_GEMINI_API_KEY is not defined. AI Chat will not function correctly.");
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

export const chatWithGemini = async (prompt, history = []) => {
  if (!genAI) {
    throw new Error("Gemini API Key is missing. Please check your environment variables.");
  }

  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: "You are an expert Indian Civic Assistant for the ElectIQ platform. Your goal is to help users understand the Indian electoral process, voter registration (Form 6, etc.), EVMs, VVPATs, and Model Code of Conduct. Be concise, non-partisan, and accurate according to the Election Commission of India (ECI) guidelines. Always encourage users to visit voters.eci.gov.in for official actions.",
  });

  const chat = model.startChat({
    history: history.map(msg => ({
      role: msg.type === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }],
    })),
  });

  const result = await chat.sendMessage(prompt);
  const response = await result.response;
  return response.text();
};
