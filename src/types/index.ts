// Define the types of MakPac cases
export enum CaseType {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  EXTRALARGE = 'extra large'
}

// Define the structure for a Makita tool
export interface MakitaTool {
  name: string;
  model: string;
  description: string;
}

// Define the structure for custom details
export interface CustomDetails {
  ownerName: string;
  contactDetails: string;
  additionalInfo: string;
}

// Define the structure for the form data
export interface FormData {
  caseType: CaseType;
  tool: MakitaTool | null;
  customDetails: CustomDetails;
}