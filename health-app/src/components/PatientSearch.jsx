// PatientSearch.js

import React, { useState } from 'react';

const appointmentTypes = [
  "General Check-up",
  "Dental Appointment",
  "Eye Check-up",
  "Physical Therapy Session",
  "Psychiatrist Appointment",
  "Dermatology Appointment",
  "Gynecology Appointment",
  "Orthopedic Appointment",
  "Urology Appointment",
  "Cardiology Appointment",
  "Other"
];

const PatientSearch = ({onTypeSelected}) => {
  const [selectedType, setSelectedType] = useState('');

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    onTypeSelected(e.target.value);
  };

  return (
    <div>
      <select
        value={selectedType}
        onChange={handleTypeChange}
      >
        <option value="">Select Appointment Type</option>
        {appointmentTypes.map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
    </div>
  );
};

export default PatientSearch;
