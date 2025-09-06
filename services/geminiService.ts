
import { GoogleGenAI, Type } from "@google/genai";
import type { ApiResponse, WorldState } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY environment variable not set. Gemini mode will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    story: {
      type: Type.STRING,
      description: "The next part of the story, written in an engaging and descriptive prose. Should be about 2-3 paragraphs long.",
    },
    worldStateChanges: {
      type: Type.OBJECT,
      description: "An object detailing the changes to the world state based on the story.",
      properties: {
        newCharacters: {
          type: Type.ARRAY,
          description: "Any new characters introduced in the story.",
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              description: { type: Type.STRING },
              goal: { type: Type.STRING },
            },
          },
        },
        updatedCharacters: {
          type: Type.ARRAY,
          description: "Updates to existing characters (e.g., new knowledge, changed goals).",
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING, description: "The ID of the character to update." },
              knowledge: { type: Type.ARRAY, items: { type: Type.STRING }, description: "New knowledge gained by the character." },
              goal: { type: Type.STRING, description: "A new or updated goal for the character." },
            },
          },
        },
        newLocations: {
          type: Type.ARRAY,
          description: "Any new locations discovered or mentioned.",
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              description: { type: Type.STRING },
            },
          },
        },
        newEvent: {
          type: Type.OBJECT,
          description: "The primary new event that occurred in this story segment.",
          properties: {
            description: { type: Type.STRING },
            causality: { type: Type.STRING, description: "What caused this event (e.g., 'Player action: ...')." },
          },
        },
      },
    },
  },
  required: ["story", "worldStateChanges"],
};


export const generateStoryOnline = async (
  playerInput: string,
  worldState: WorldState,
  storyHistory: string
): Promise<ApiResponse> => {

  const systemInstruction = `You are the 'Director' agent in Morpheus, a hyper-adaptive AI storytelling engine. Your role is to generate the next chapter of an epic fantasy story based on the player's action and the current world state. You must also act as the 'Loremaster' by identifying and structuring all changes to the world state.

  RULES:
  1. Your entire response MUST be a single, valid JSON object that conforms to the provided schema.
  2. The 'story' field should be a compelling, well-written narrative continuing from the story history.
  3. The 'worldStateChanges' must accurately reflect events, character developments, and discoveries from your generated story.
  4. Make the world feel alive. NPCs should have their own motivations.
  5. Be creative and introduce unexpected twists and subplots.`;

  const prompt = `
  **Previous Story Summary:**
  ${storyHistory}

  **Current World State:**
  ${JSON.stringify(worldState, null, 2)}

  **Player's Action:**
  "${playerInput}"

  Generate the next part of the story and the corresponding world state changes.
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.8,
      },
    });

    const jsonString = response.text.trim();
    const parsedResponse = JSON.parse(jsonString);
    return parsedResponse as ApiResponse;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error("An unknown error occurred while contacting the Gemini API.");
  }
};
