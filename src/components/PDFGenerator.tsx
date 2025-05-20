import React, { useState } from 'react';
import { FormData } from '../types';
import { downloadPDF } from '../utils/pdfUtils';

interface PDFGeneratorProps {
  formData: FormData;
  isValid: boolean;
}

const PDFGenerator: React.FC<PDFGeneratorProps> = ({ formData, isValid }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratePDF = async () => {
    if (!isValid) return;
    
    setIsGenerating(true);
    try {
      await downloadPDF(formData);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('There was an error generating the PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="mt-8">
      <button
        onClick={handleGeneratePDF}
        disabled={!isValid || isGenerating}
        className={`
          w-full py-3 px-4 rounded-md font-medium text-white
          ${isValid 
            ? 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500' 
            : 'bg-gray-400 cursor-not-allowed'}
          transition-colors
        `}
      >
        {isGenerating ? 'Generating PDF...' : 'Download PDF Label'}
      </button>
      
      {!isValid && (
        <p className="mt-2 text-sm text-red-600">
          Please select a case type to generate a PDF.
        </p>
      )}
    </div>
  );
};

export default PDFGenerator;