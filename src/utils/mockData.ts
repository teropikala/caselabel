import { MakitaTool, CaseType } from '../types';

// Mock data for Makita tools
export const makitaTools: MakitaTool[] = [
  // Small case tools
  {
    id: 'df001g',
    name: 'Cordless Driver Drill',
    model: 'DF001G',
    caseType: CaseType.SMALL
  },
  {
    id: 'td001g',
    name: 'Cordless Impact Driver',
    model: 'TD001G',
    caseType: CaseType.SMALL
  },
  {
    id: 'hr140d',
    name: 'Cordless Rotary Hammer',
    model: 'HR140D',
    caseType: CaseType.SMALL
  },
  
  // Medium case tools
  {
    id: 'dhr280',
    name: 'Cordless Combination Hammer',
    model: 'DHR280',
    caseType: CaseType.MEDIUM
  },
  {
    id: 'dga519',
    name: 'Cordless Angle Grinder',
    model: 'DGA519',
    caseType: CaseType.MEDIUM
  },
  {
    id: 'djr360',
    name: 'Cordless Recipro Saw',
    model: 'DJR360',
    caseType: CaseType.MEDIUM
  },
  
  // Large case tools
  {
    id: 'dhs780',
    name: 'Cordless Circular Saw',
    model: 'DHS780',
    caseType: CaseType.LARGE
  },
  {
    id: 'dls110',
    name: 'Cordless Slide Compound Miter Saw',
    model: 'DLS110',
    caseType: CaseType.LARGE
  },
  {
    id: 'dpt353',
    name: 'Cordless Pin Nailer',
    model: 'DPT353',
    caseType: CaseType.LARGE
  }
];

// Helper function to get tools by case type
export const getToolsByCaseType = (caseType: CaseType): MakitaTool[] => {
  return makitaTools.filter(tool => tool.caseType === caseType);
};

// Helper function to find a tool by ID
export const getToolById = (id: string): MakitaTool | undefined => {
  return makitaTools.find(tool => tool.id === id);
};