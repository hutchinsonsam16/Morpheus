
import { useState, useCallback } from 'react';
import type { MorpheusState, WorldState, Character, Location, Event, ApiResponse } from '../types';
// Fix: Import AgentName to use its enum values.
import { EngineMode, AgentName } from '../types';
import { INITIAL_MORPHEUS_STATE } from '../constants';
import { generateStoryOffline } from '../services/localModelService';
import { generateStoryOnline } from '../services/geminiService';

export const useMorpheusEngine = () => {
  const [state, setState] = useState<MorpheusState>(INITIAL_MORPHEUS_STATE);

  const setEngineMode = useCallback((mode: EngineMode) => {
    setState(prevState => ({ ...prevState, engineMode: mode }));
  }, []);

  const advanceStory = useCallback(async (playerInput: string) => {
    setState(prevState => ({ ...prevState, isLoading: true, error: null }));

    try {
      const storyHistory = state.story.map(s => s.text).join('\n\n');
      let apiResponse: ApiResponse;

      if (state.engineMode === EngineMode.LOCAL) {
        apiResponse = await generateStoryOffline(playerInput, state.worldState, state.turn);
      } else {
        if (!process.env.API_KEY) {
            throw new Error("Gemini API key is not configured. Please set the API_KEY environment variable.");
        }
        apiResponse = await generateStoryOnline(playerInput, state.worldState, storyHistory);
      }

      // Process the response and update state - The "Loremaster" at work
      setState(prevState => {
        const newWorldState: WorldState = JSON.parse(JSON.stringify(prevState.worldState));
        const turn = prevState.turn;

        // Add new story segment
        const newStorySegment = {
          id: `story-${turn}`,
          turn,
          text: apiResponse.story,
          // Fix: The 'author' property must be of type 'AgentName.DIRECTOR' to match the 'StorySegment' interface.
          author: AgentName.DIRECTOR,
        };

        // Process world state changes
        const changes = apiResponse.worldStateChanges;

        if (changes.newCharacters) {
          changes.newCharacters.forEach((char, index) => {
            newWorldState.characters.push({
              id: `char-${Date.now()}-${index}`,
              name: char.name || 'Unknown',
              description: char.description || '',
              knowledge: char.knowledge || [],
              goal: char.goal || '',
            });
          });
        }
        
        if (changes.updatedCharacters) {
            changes.updatedCharacters.forEach(update => {
                const char = newWorldState.characters.find(c => c.id === update.id);
                if (char) {
                    if(update.knowledge) char.knowledge.push(...update.knowledge);
                    if(update.goal) char.goal = update.goal;
                }
            });
        }
        
        if (changes.newLocations) {
            changes.newLocations.forEach((loc, index) => {
                newWorldState.locations.push({
                    id: `loc-${Date.now()}-${index}`,
                    name: loc.name || 'Unknown',
                    description: loc.description || ''
                });
            });
        }

        if (changes.newEvent) {
          const newEvent: Event = {
            id: `evt-${turn}`,
            turn,
            description: changes.newEvent.description || 'An unknown event occurred.',
            causality: changes.newEvent.causality || `Caused by player action: ${playerInput}`,
          };
          newWorldState.events.push(newEvent);
        }

        return {
          ...prevState,
          story: [...prevState.story, newStorySegment],
          worldState: newWorldState,
          isLoading: false,
          turn: turn + 1,
        };
      });

    } catch (error) {
      console.error("Failed to advance story:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      setState(prevState => ({ ...prevState, isLoading: false, error: errorMessage }));
    }
  }, [state.engineMode, state.story, state.worldState, state.turn]);

  const resetStory = useCallback(() => {
    setState(INITIAL_MORPHEUS_STATE);
  }, []);

  return { state, setEngineMode, advanceStory, resetStory };
};
