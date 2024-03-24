// PatientSearch.js

import React, { useState } from 'react';

const appointmentTypes = ["Check-up", "Prescription", "Lab Work", "Consultation"];

const PatientSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm, "with filter:", selectedType);
    // Implement your search logic here
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div>
        {appointmentTypes.map(type => (
          <label key={type}>
            <input
              type="radio"
              value={type}
              name="appointmentType"
              checked={selectedType === type}
              onChange={(e) => setSelectedType(e.target.value)}
            />
            {type}
          </label>
        ))}
      </div>
      <button onClick={handleSearch}>Submit Search</button>
    </div>
  );
};

export default PatientSearch;
