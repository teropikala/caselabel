import React from 'react';
import { FormData } from '../types';
import { downloadPDF } from '../utils/pdfUtils';

interface PDFGeneratorProps {
  formData: FormData;
  isValid: boolean;
}

const PDFGenerator: React.FC<PDFGeneratorProps> = ({ formData, isValid }) => {

  const handleGeneratePDF = async () => {
    if (!isValid) return;

    try {
      await downloadPDF(formData);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('There was an error generating the PDF. Please try again.');
    }
  };

  return (
    <div>
      <button onClick={handleGeneratePDF} className="button">
        Download PDF
      </button>
    </div>
  );
};

export default PDFGenerator;
