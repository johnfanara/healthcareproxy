import React, { useState } from 'react';

const PatientInfoForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    visitType: {
      checkUp: false,
      prescription: false,
      labWork: false,
      firstVisit: false,
      other: false,
    },
    description: '',
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      visitType: type === 'checkbox'
        ? { ...prevFormData.visitType, [name]: checked }
        : prevFormData.visitType,
      [name]: type !== 'checkbox' ? value : prevFormData[name],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    // Implement your submit logic here (e.g., sending data to an API)
  };

  return (
    <div className="report-form-container"> {/* Apply the same styling as the AdminReportForm */}
      <h2 style={{ color: '#3f3939' }}>Patient Information Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="initialFormInput" // Apply the same input styles as in the AdminReportForm
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />
        <input
          className="initialFormInput" // Same class for consistent styling
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />
        <input
          className="initialFormInput" // Same class for consistent styling
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <div className="visitType-checkboxes"> {/* Additional class for styling checkboxes if needed */}
          <label>
            <input
              type="checkbox"
              name="checkUp"
              checked={formData.visitType.checkUp}
              onChange={handleChange}
            />
            Check-up
          </label>
          <label>
            <input
              type="checkbox"
              name="prescription"
              checked={formData.visitType.prescription}
              onChange={handleChange}
            />
            Prescription
          </label>
          <label>
            <input
              type="checkbox"
              name="labWork"
              checked={formData.visitType.labWork}
              onChange={handleChange}
            />
            Lab Work
          </label>
          <label>
            <input
              type="checkbox"
              name="firstVisit"
              checked={formData.visitType.firstVisit}
              onChange={handleChange}
            />
            First Visit
          </label>
          <label>
            <input
              type="checkbox"
              name="other"
              checked={formData.visitType.other}
              onChange={handleChange}
            />
            Other
          </label>
        </div>
        <textarea
          className="initialFormInput" // Same class for consistent styling
          name="description"
          placeholder="Description (optional)"
          value={formData.description}
          onChange={handleChange}
        />
        <button 
          className="report-form-container button" // Apply the same button styles as in the AdminReportForm
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PatientInfoForm;
