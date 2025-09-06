
import type { ApiResponse, WorldState } from '../types';

const mockResponses = [
  {
    story: "You cautiously step into the Whispering Woods. A twig snaps to your left. A pair of glowing red eyes pierces the gloom, belonging to a massive shadow beast. It lunges!",
    worldStateChanges: {
      newEvent: {
        description: 'A shadow beast attacked in the Whispering Woods.',
        causality: 'Player entered the woods.',
      },
    },
  },
  {
    story: "Deciding the woods are too dangerous for now, you return to Silverhaven. The city is alive with activity. You overhear whispers of a high-stakes card game in the 'Salty Siren' tavern, where a map to a hidden treasure is said to be the prize.",
    worldStateChanges: {
      newEvent: {
        description: "Learned of a treasure map in the Salty Siren tavern.",
        causality: "Player returned to Silverhaven and gathered information."
      },
      updatedCharacters: [
        { id: 'npc-1', knowledge: ['The treasure map game at the Salty Siren'] }
      ]
    },
  },
    {
    story: "You seek out Elara in the city's shadowed alleys. She smirks, 'Information is never free, ranger.' She offers a trade: details about the treasure map in exchange for retrieving a stolen ledger from a corrupt merchant.",
    worldStateChanges: {
      newEvent: {
        description: "Elara offered a quest: retrieve a stolen ledger for map info.",
        causality: "Player sought out Elara."
      },
      updatedCharacters: [
        { id: 'npc-1', goal: "Acquire the merchant's stolen ledger via the player." }
      ]
    },
  }
];

// This service simulates a local, offline model.
export const generateStoryOffline = async (
  prompt: string,
  _worldState: WorldState,
  turn: number
): Promise<ApiResponse> => {
  console.log("Local Model generating for prompt:", prompt);
  
  // Simulate processing time
  await new Promise(res => setTimeout(res, 750));

  const response = mockResponses[(turn-1) % mockResponses.length];

  return response as ApiResponse;
};
