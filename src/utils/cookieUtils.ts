import Cookies from 'js-cookie';
import { FormData, CustomDetails, CaseType } from '../types';

const FORM_DATA_COOKIE = 'caselabel_form_data';

// Save form data to cookies
export const saveFormData = (formData: FormData): void => {
  Cookies.set(FORM_DATA_COOKIE, JSON.stringify(formData), { expires: 30 }); // Expires in 30 days
};

// Load form data from cookies
export const loadFormData = (): FormData | null => {
  const cookieData = Cookies.get(FORM_DATA_COOKIE);
  
  if (cookieData) {
    try {
      return JSON.parse(cookieData) as FormData;
    } catch (error) {
      console.error('Error parsing form data from cookie:', error);
    }
  }
  
  // Return default form data if no cookie exists
  return {
    caseType: CaseType.MEDIUM,
    tool: null,
    customDetails: {
      ownerName: '',
      contactDetails: '',
      additionalInfo: ''
    }
  };
};

// Clear form data from cookies
export const clearFormData = (): void => {
  Cookies.remove(FORM_DATA_COOKIE);
};