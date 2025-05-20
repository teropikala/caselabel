import React, { useEffect, useState } from 'react';
import './App.css';
import { CaseType, FormData, CustomDetails, MakitaTool } from './types';
import { saveFormData, loadFormData } from './utils/cookieUtils';
import CaseTypeSelector from './components/CaseTypeSelector';
import ToolSelector from './components/ToolSelector';
import CustomDetailsForm from './components/CustomDetailsForm';
import PDFGenerator from './components/PDFGenerator';

function App() {
  // Initialize form data state
  const [formData, setFormData] = useState<FormData>({
    caseType: CaseType.MEDIUM,
    tool: null,
    customDetails: {
      ownerName: '',
      contactDetails: '',
      additionalInfo: ''
    }
  });

  // Load saved data from cookies on initial render
  useEffect(() => {
    const savedData = loadFormData();
    if (savedData) {
      setFormData(savedData);
    }
  }, []);

  // Save data to cookies whenever it changes
  useEffect(() => {
    saveFormData(formData);
  }, [formData]);

  // Handle case type change
  const handleCaseTypeChange = (caseType: CaseType) => {
    setFormData(prev => ({
      ...prev,
      caseType
    }));
  };

  // Handle tool selection change
  const handleToolChange = (tool: MakitaTool | null) => {
    setFormData(prev => ({
      ...prev,
      tool
    }));
  };

  // Handle custom details change
  const handleCustomDetailsChange = (customDetails: CustomDetails) => {
    setFormData(prev => ({
      ...prev,
      customDetails
    }));
  };

  // Check if form is valid for PDF generation
  const isFormValid = Boolean(formData.caseType);

  return (
    <div className="app-container">
      <div className="app-content">
        <header className="header">
          <h1 className="header-title">Makita MakPac Case Label Generator</h1>
          <p className="header-subtitle">
            Create custom labels for your Makita MakPac tool cases
          </p>
        </header>

        <main className="main-content">
          <CaseTypeSelector 
            selectedCaseType={formData.caseType} 
            onChange={handleCaseTypeChange} 
          />

          <ToolSelector 
            selectedTool={formData.tool} 
            onChange={handleToolChange} 
          />

          <CustomDetailsForm 
            customDetails={formData.customDetails} 
            onChange={handleCustomDetailsChange} 
          />

          <PDFGenerator 
            formData={formData} 
            isValid={isFormValid} 
          />
        </main>

        <footer className="footer">
          <p>
            This tool is for generating labels for Makita MakPac tool cases.
            Your data is only stored in your browser cookies.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
