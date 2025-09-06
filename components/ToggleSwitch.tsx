
import React from 'react';

interface ToggleSwitchProps {
  label: string;
  option1: string;
  option2: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, option1, option2, enabled, onChange }) => {
  return (
    <div className="flex items-center justify-between">
      <span className="mr-3 text-sm font-medium text-gray-300">{label}</span>
      <div className="flex items-center p-1 bg-gray-800 rounded-lg">
        <button
          onClick={() => onChange(false)}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${!enabled ? 'bg-purple-600 text-white shadow' : 'text-gray-400'}`}
        >
          {option1}
        </button>
        <button
          onClick={() => onChange(true)}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${enabled ? 'bg-purple-600 text-white shadow' : 'text-gray-400'}`}
        >
          {option2}
        </button>
      </div>
    </div>
  );
};

export default ToggleSwitch;
