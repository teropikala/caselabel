import React from 'react';
import { CaseType } from '../types';

interface CaseTypeSelectorProps {
  selectedCaseType: CaseType;
  onChange: (caseType: CaseType) => void;
}

const CaseTypeSelector: React.FC<CaseTypeSelectorProps> = ({ selectedCaseType, onChange }) => {
  return (
    <div className="case-type-selector">
      <h2 className="form-field-label">Case Type</h2>
      <div className="case-type-grid">
        {Object.values(CaseType).map((caseType) => (
          <div
            key={caseType}
            className={`case-type-option ${
              selectedCaseType === caseType 
                ? 'case-type-option-selected' 
                : 'case-type-option-unselected'
            }`}
            onClick={() => onChange(caseType)}
          >
            <div className="case-type-title">{caseType}</div>
            <div className="case-type-description">
              {caseType === CaseType.SMALL && 'Type 1'}
              {caseType === CaseType.MEDIUM && 'Type 2'}
              {caseType === CaseType.LARGE && 'Type 3'}
                {caseType === CaseType.EXTRALARGE && 'Type 4'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseTypeSelector;
