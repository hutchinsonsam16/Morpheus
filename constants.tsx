
import React from 'react';
import type { WorldState, Agent, MorpheusState } from './types';
import { AgentName, EngineMode } from './types';

export const INITIAL_WORLD_STATE: WorldState = {
  characters: [
    {
      id: 'char-1',
      name: 'Kaelen',
      description: 'A grizzled ranger with a mysterious past, haunted by the memory of a lost city.',
      knowledge: ['Ancient ruins in the Whispering Woods', 'Weaknesses of shadow beasts'],
      goal: 'Find the lost city of Aeridor',
    },
    {
      id: 'npc-1',
      name: 'Elara',
      description: 'A cunning rogue and information broker in the city of Silverhaven.',
      knowledge: ['Secret tunnels beneath the city', 'Political scandals of the merchant guild'],
      goal: 'Become the leader of the Thieves Guild',
    }
  ],
  locations: [
    {
      id: 'loc-1',
      name: 'The Whispering Woods',
      description: 'An ancient forest, unnaturally quiet and shrouded in a perpetual mist.'
    },
    {
      id: 'loc-2',
      name: 'Silverhaven',
      description: 'A bustling port city known for its trade and its corruption.'
    }
  ],
  events: [
    {
      id: 'evt-0',
      turn: 0,
      description: 'The story begins.',
      causality: 'Initial state'
    }
  ],
  worldHistory: 'A world of fading magic and rising tensions between kingdoms.'
};

export const AGENTS: Agent[] = [
  {
    name: AgentName.LOREMASTER,
    description: 'Guardian of State Integrity. Maintains the single source of truth for the world.',
    status: 'Idle'
  },
  {
    name: AgentName.DIRECTOR,
    description: 'Narrative & Pacing Agent. Generates prose and controls the story\'s flow.',
    status: 'Idle'
  },
  {
    name: AgentName.ORACLE,
    description: 'Player Insight Agent. Analyzes player choices to provide suggestions.',
    status: 'Idle'
  },
  {
    name: AgentName.PUPPETEER,
    description: 'NPC & Faction Agent. Manages autonomous actions of non-player characters.',
    status: 'Idle'
  },
];

export const INITIAL_MORPHEUS_STATE: MorpheusState = {
  story: [
    {
      id: 'story-0',
      turn: 0,
      text: "The air grows cold. You stand at the edge of the Whispering Woods, the last bastion of civilization, Silverhaven, at your back. A choice lies before you. What do you do?",
      author: AgentName.DIRECTOR
    }
  ],
  worldState: INITIAL_WORLD_STATE,
  agents: AGENTS,
  engineMode: EngineMode.LOCAL, // Default to offline mode
  isLoading: false,
  error: null,
  turn: 1,
};
