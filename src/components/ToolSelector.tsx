import React, { useEffect, useState } from 'react';
import { MakitaTool } from '../types';
import { makitaTools } from '../utils/mockData';

interface ToolSelectorProps {
  selectedTool: MakitaTool | null;
  onChange: (tool: MakitaTool | null) => void;
}

const ToolSelector: React.FC<ToolSelectorProps> = ({ selectedTool, onChange }) => {
  const [tools, setTools] = useState<MakitaTool[]>([]);

  // Load all tools on component mount
  useEffect(() => {
    setTools(makitaTools);
  }, []);

  return (
    <div className="mb-6">
      <h2 className="form-field-label">Makita Tool</h2>

      {tools.length === 0 ? (
        <p className="text-gray-500">No tools available.</p>
      ) : (
        <div className="form-field">
          <label htmlFor="toolSelector">Select a Tool</label>
          <select
            id="toolSelector"
            value={selectedTool?.id || ''}
            onChange={(e) => {
              const selectedId = e.target.value;
              const tool = selectedId ? tools.find(t => t.id === selectedId) || null : null;
              onChange(tool);
            }}
          >
            <option value="">-- Select a tool --</option>
            {tools.map((tool) => (
              <option key={tool.id} value={tool.id}>
                {tool.name} - Model: {tool.model}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedTool && (
        <div className="mt-4">
          <button
            className="text-sm text-red-500 hover:text-red-700"
            onClick={() => onChange(null)}
          >
            Clear Selection
          </button>
        </div>
      )}
    </div>
  );
};

export default ToolSelector;
