import { MakitaTool } from '../types';
import toolsJson from '../tools.json';

// Transform the tools from JSON to match the MakitaTool interface and sort by name
export const makitaTools: MakitaTool[] = toolsJson
  .map((tool, index) => ({
    name: tool.name,
    model: tool.model,
    description: tool.description,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));
