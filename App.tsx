
import React, { useState, useRef, useEffect } from 'react';
import { useMorpheusEngine } from './hooks/useMorpheusEngine';
import { EngineMode, AgentName } from './types';
import Card from './components/Card';
import Button from './components/Button';
import ToggleSwitch from './components/ToggleSwitch';
import AgentPanel from './components/AgentPanel';
import { BrainCircuitIcon, BookIcon, ClapperboardIcon, LightbulbIcon, UsersIcon, AlertTriangleIcon } from './components/Icon';
import type { Character, Location } from './types';

const AGENT_ICONS: Record<AgentName, React.ReactNode> = {
  [AgentName.LOREMASTER]: <BookIcon className="w-5 h-5"/>,
  [AgentName.DIRECTOR]: <ClapperboardIcon className="w-5 h-5"/>,
  [AgentName.ORACLE]: <LightbulbIcon className="w-5 h-5"/>,
  [AgentName.PUPPETEER]: <UsersIcon className="w-5 h-5"/>,
};

const App: React.FC = () => {
  const { state, setEngineMode, advanceStory, resetStory } = useMorpheusEngine();
  const [playerInput, setPlayerInput] = useState('');
  const storyEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    storyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.story]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerInput.trim() && !state.isLoading) {
      advanceStory(playerInput.trim());
      setPlayerInput('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col p-4 gap-4" style={{
        backgroundImage: 'radial-gradient(circle at top left, rgba(128, 0, 128, 0.1), transparent 40%), radial-gradient(circle at bottom right, rgba(0, 0, 255, 0.1), transparent 40%)'
    }}>
      <header className="flex flex-col sm:flex-row justify-between items-center p-4 bg-gray-800/30 border border-gray-700 rounded-lg backdrop-blur-sm">
        <div className="flex items-center mb-4 sm:mb-0">
          <BrainCircuitIcon className="w-8 h-8 mr-3 text-purple-400"/>
          <h1 className="text-3xl font-bold tracking-tighter text-white">Morpheus</h1>
        </div>
        <div className="flex items-center space-x-4">
          <ToggleSwitch
            label="AI Engine:"
            option1="Local (Offline)"
            option2="Gemini (Online)"
            enabled={state.engineMode === EngineMode.GEMINI}
            onChange={(enabled) => setEngineMode(enabled ? EngineMode.GEMINI : EngineMode.LOCAL)}
          />
          <Button onClick={resetStory} variant="secondary">Reset Story</Button>
        </div>
      </header>
      
      {state.error && (
        <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg flex items-center">
            <AlertTriangleIcon className="w-5 h-5 mr-3"/>
            <strong>Error:</strong><span className="ml-2">{state.error}</span>
        </div>
      )}

      <main className="flex-grow grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Left Sidebar: Agents */}
        <aside className="lg:col-span-1 flex flex-col gap-4">
            {state.agents.map(agent => (
                <AgentPanel key={agent.name} agent={agent} icon={AGENT_ICONS[agent.name]}/>
            ))}
        </aside>

        {/* Center: Story and Input */}
        <div className="lg:col-span-2 flex flex-col gap-4 h-[80vh]">
          <Card title="Story" icon={<ClapperboardIcon className="w-5 h-5"/>} className="flex-grow flex flex-col">
            <div className="overflow-y-auto flex-grow pr-2 space-y-6 text-gray-300 leading-relaxed">
              {state.story.map((segment) => (
                <div key={segment.id}>
                    <p className="whitespace-pre-wrap">{segment.text}</p>
                </div>
              ))}
              <div ref={storyEndRef} />
            </div>
          </Card>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={playerInput}
              onChange={(e) => setPlayerInput(e.target.value)}
              placeholder="What do you do next?"
              className="flex-grow bg-gray-700/80 border border-gray-600 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              disabled={state.isLoading}
            />
            <Button type="submit" isLoading={state.isLoading} disabled={!playerInput.trim()}>
              Send
            </Button>
          </form>
        </div>
        
        {/* Right Sidebar: World State */}
        <aside className="lg:col-span-1 flex flex-col gap-4">
            <Card title="Characters" icon={<UsersIcon className="w-5 h-5"/>} className="flex-shrink-0">
                <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                    {state.worldState.characters.map((char: Character) => (
                        <div key={char.id} className="text-sm">
                            <p className="font-semibold text-purple-300">{char.name}</p>
                            <p className="text-gray-400 italic">Goal: {char.goal}</p>
                        </div>
                    ))}
                </div>
            </Card>
            <Card title="Locations" icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>} className="flex-shrink-0">
                 <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                    {state.worldState.locations.map((loc: Location) => (
                         <div key={loc.id} className="text-sm">
                            <p className="font-semibold text-teal-300">{loc.name}</p>
                            <p className="text-gray-400">{loc.description}</p>
                        </div>
                    ))}
                </div>
            </Card>
            <Card title="Causal Event Graph" icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2Z"/><path d="M6 8a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2Z"/><path d="m12 16 2 2 4-4"/></svg>} className="flex-grow">
                 <div className="space-y-3 h-full max-h-48 overflow-y-auto pr-2">
                    {state.worldState.events.slice().reverse().map(event => (
                        <div key={event.id} className="text-xs border-l-2 border-gray-600 pl-2">
                             <p className="font-semibold text-gray-300">[Turn {event.turn}] {event.description}</p>
                             <p className="text-gray-500">Cause: {event.causality}</p>
                        </div>
                    ))}
                 </div>
            </Card>
        </aside>
      </main>
    </div>
  );
};

export default App;
