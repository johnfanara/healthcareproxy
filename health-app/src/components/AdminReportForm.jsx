import React, { useState } from 'react';


const AdminReportForm = () => {
  const [patientId, setPatientId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [prescription, setPrescription] = useState('');
  const [visitDescription, setVisitDescription] = useState('');

  

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would typically handle the form submission, e.g., sending data to a backend server
    console.log({
      patientId,
      firstName,
      lastName,
      prescription,
      visitDescription,
    });
  };

  return (
    <div className= "report-form-container">
      <h1 className="heading">Patient Notes</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="patientId"
          placeholder="Enter Patient ID"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
        />
        <input
          type="text"
          name="firstName"
          placeholder="Enter Patient First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Enter Patient Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          name="prescription"
          placeholder="Enter Prescription/Medication"
          value={prescription}
          onChange={(e) => setPrescription(e.target.value)}
        />
        <textarea
          name="visitDescription"
          placeholder="Describe the visit"
          value={visitDescription}
          onChange={(e) => setVisitDescription(e.target.value)}
        />
        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
};

export default AdminReportForm;
