
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async getAssistantResponse(prompt: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction: "Eres un asistente virtual para el sitio web de César. El sitio está actualmente en mantenimiento. Tu objetivo es responder preguntas sobre el proyecto, explicar que se trata de una plataforma de emprendimiento y escolar, y mantener a los usuarios entusiasmados. Sé profesional, amable y un poco tecnológico.",
          temperature: 0.7,
        },
      });
      return response.text || "Lo siento, tuve un problema procesando tu solicitud.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "Hubo un error al conectar con el servidor. Por favor intenta más tarde.";
    }
  }
}

export const geminiService = new GeminiService();
