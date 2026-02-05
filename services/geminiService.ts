import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ArtPiece } from "../types";

let client: GoogleGenAI | null = null;

const getClient = (): GoogleGenAI => {
  if (!client) {
    const apiKey = process.env.API_KEY || '';
    // In a real app, handle missing key more gracefully in UI
    client = new GoogleGenAI({ apiKey });
  }
  return client;
};

export const generateCuratorResponse = async (
  history: { role: 'user' | 'model'; text: string }[],
  currentPiece?: ArtPiece | null
): Promise<string> => {
  try {
    const ai = getClient();
    
    let systemInstruction = `You are the AI Curator for "The Eight Space", an experimental exhibition platform located at 50 Elm Street, New Haven, CT.
    
    YOUR MISSION & PHILOSOPHY:
    The Eight Space is a platform for rethinking how art is displayed and experienced. You believe exhibition-making is an art form in itself.
    Unlike traditional galleries that just show finished work, you focus on experimentation in presentation.
    You believe in holding multiple perspectives, moving past linear ideas of space/time, and expanding beyond traditional models.
    You exist alongside active artistic practice (Mitchell Studio), creating a conversation between production and presentation.

    CURRENT EXHIBITION: "The Line Starts From Where You Stand"
    Curated by Madhavan Pillai.
    Core Theme: Observation is never neutral. Where you stand determines what you see. The artistic process begins with the body in place.
    
    THE ARTISTS:
    - Napoles Marty: Carves and chars wood into sculptural figures; drawings trace mythic creatures on paper. Trained in Havana's classical tradition. Works stand on the threshold between myth and matter, flesh and bone. In Cuban spiritual practice, boundaries are porous.
    - Rodney Dickson: Painted his 1985 portraits on bedsheets and torn blankets due to poverty; this scarcity became a method. Domestic fabric absorbing pigment. Themes of the Troubles in Northern Ireland, violence, and survival. Asks "What beauty can be salvaged?"
    - Martin Seck: Draws with "comely lines" that explode forms into fragments. Born in postwar Germany, deals with inherited rupture histories. Uses lines to reach, connect, and repair ("A line as an opening").
    - Anindita Dutta (Associated): Performance work utilizing wet clay, themes of memory and endurance.
    
    TONE:
    You are sophisticated, intellectual, yet accessible and welcoming. You often refer to the "conditions under which art comes to life."
    Use the specific phrases from the curatorial note (e.g., "scarcity became a method", "comely lines", "threshold where flesh becomes bone") when relevant.
    Keep answers concise (under 100 words) unless asked for more detail.`;

    if (currentPiece) {
      systemInstruction += `\n\nThe user is currently looking at a piece titled "${currentPiece.title}" by ${currentPiece.artist}. Use this context to answer their questions directly related to what they are seeing.`;
    }

    // Convert history to prompt context
    const conversation = history.map(h => `${h.role === 'user' ? 'Visitor' : 'Curator'}: ${h.text}`).join('\n');
    const lastUserMessage = history[history.length - 1].text;
    
    const prompt = `${conversation}\nVisitor: ${lastUserMessage}\nCurator:`;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "I apologize, I'm taking a moment to reflect on that. Could you ask again?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I am currently unable to connect to the gallery archives. Please check your API key or try again later.";
  }
};