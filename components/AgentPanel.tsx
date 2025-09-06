
import React from 'react';
import type { Agent } from '../types';
import Card from './Card';

interface AgentPanelProps {
  agent: Agent;
  icon: React.ReactNode;
}

const AgentPanel: React.FC<AgentPanelProps> = ({ agent, icon }) => {
  return (
    <Card title={agent.name} icon={icon} className="h-full">
      <p className="text-sm text-gray-400">{agent.description}</p>
    </Card>
  );
};

export default AgentPanel;
