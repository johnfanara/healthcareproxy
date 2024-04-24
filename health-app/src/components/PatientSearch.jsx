import React, { useState } from 'react';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import { formatDate } from '../funcs/functions';

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

const PatientSearch = ({onTypeSelected, patientData, patientNotes}) => {
  const [selectedType, setSelectedType] = useState('');

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    onTypeSelected(e.target.value);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Date", "Type", "Prescription", "Description"];
    const tableRows = [];

    patientNotes.forEach(note => {
      const noteData = [
        formatDate(note.appointmentDate),
        note.appointmentType,
        note.prescription,
        note.visitDescription,
      ];
      tableRows.push(noteData);
    });

    doc.text(`Patient Records for ${patientData.firstName} ${patientData.lastName}`, 14, 15);
    autoTable(doc, { head: [tableColumn], body: tableRows, startY: 20 });

    doc.save(`${patientData.patientId}-records.pdf`);
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
      <button onClick={downloadPDF}>Download PDF</button>
    </div>
  );
};

export default PatientSearch;