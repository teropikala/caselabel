import React, { useState } from 'react';
import './App.css';
import { CaseType, FormData, CustomDetails, MakitaTool } from './types';
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
          <h1 className="header-title">Makpac Case Label Generator</h1>
          <p className="header-subtitle">
            Create custom labels for your Makita Makpac tool cases.
          </p>
          <p className="header-subtitle">
            Smaller labels have limited space - choose to display either the tool name or your contact details.
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
            Your data is not stored anywhere
            | <a href="https://github.com/teropikala/caselabel">GitHub</a>
          </p>
          <br/>
          <p>
            Makita® and Makpac® are registered trademarks of Makita Corporation.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
