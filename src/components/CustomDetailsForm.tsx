import React from 'react';
import { CustomDetails } from '../types';

interface CustomDetailsFormProps {
  customDetails: CustomDetails;
  onChange: (details: CustomDetails) => void;
}

const CustomDetailsForm: React.FC<CustomDetailsFormProps> = ({ customDetails, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({
      ...customDetails,
      [name]: value
    });
  };

  return (
    <div className="mb-6">
      <h2 className="form-field-label">Custom Details</h2>

      <div className="space-y-4">
        <div className="form-field">
          <label htmlFor="ownerName">
            Owner Name
          </label>
          <input
            type="text"
            id="ownerName"
            name="ownerName"
            value={customDetails.ownerName}
            onChange={handleChange}
            placeholder="Enter owner's name"
          />
        </div>

        <div className="form-field">
          <label htmlFor="contactDetails">
            Contact Details
          </label>
          <input
            type="text"
            id="contactDetails"
            name="contactDetails"
            value={customDetails.contactDetails}
            onChange={handleChange}
            placeholder="Phone number or email"
          />
        </div>

        <div className="form-field">
          <label htmlFor="additionalInfo">
            Additional Information
          </label>
          <textarea
            id="additionalInfo"
            name="additionalInfo"
            value={customDetails.additionalInfo}
            onChange={handleChange}
            rows={3}
            placeholder="Any additional information you want to include"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomDetailsForm;
