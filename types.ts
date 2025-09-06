
export enum EngineMode {
  GEMINI = 'GEMINI',
  LOCAL = 'LOCAL',
}

export enum AgentName {
  LOREMASTER = 'Loremaster',
  DIRECTOR = 'Director',
  ORACLE = 'Oracle',
  PUPPETEER = 'Puppeteer',
}

export interface Character {
  id: string;
  name: string;
  description: string;
  knowledge: string[];
  goal: string;
}

export interface Location {
  id: string;
  name: string;
  description: string;
}

export interface Event {
  id: string;
  turn: number;
  description: string;
  causality: string; // Describes what caused this event
}

export interface WorldState {
  characters: Character[];
  locations: Location[];
  events: Event[];
  worldHistory: string;
}

export interface Agent {
  name: AgentName;
  description: string;
  status: string;
}

export interface StorySegment {
  id: string;
  turn: number;
  text: string;
  author: AgentName.DIRECTOR;
}

export interface MorpheusState {
  story: StorySegment[];
  worldState: WorldState;
  agents: Agent[];
  engineMode: EngineMode;
  isLoading: boolean;
  error: string | null;
  turn: number;
}

export interface ApiResponse {
  story: string;
  worldStateChanges: {
    newCharacters?: Partial<Character>[];
    updatedCharacters?: Partial<Character>[];
    newLocations?: Partial<Location>[];
    newEvent?: Partial<Event>;
  };
}
