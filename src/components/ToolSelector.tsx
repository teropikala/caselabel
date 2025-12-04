import React, { useEffect, useState } from 'react';
import { MakitaTool } from '../types';
import { makitaTools } from '../utils/toolsData';

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
          <select
            id="toolSelector"
            value={selectedTool ? `${selectedTool.name}|${selectedTool.model}` : ''}
            onChange={(e) => {
              const selectedId = e.target.value;
              if (!selectedId) {
                onChange(null);
                return;
              }
              const [name, model] = selectedId.split('|');
              const tool = tools.find(t => t.name === name && t.model === model) || null;
              onChange(tool);
            }}
          >
            <option value="">-- Select a tool --</option>
            {tools.map((tool) => (
              <option key={`${tool.name}|${tool.model}`} value={`${tool.name}|${tool.model}`}>
                {tool.name} - {tool.model}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default ToolSelector;
