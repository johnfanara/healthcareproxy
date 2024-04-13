import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getFirestore, collection, addDoc, getDocs, query, where, setDoc, doc} from 'firebase/firestore';

const AdminReportForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [prescription, setPrescription] = useState('');
  const [visitDescription, setVisitDescription] = useState('');
  const [appointmentType, setAppointmentType] = useState('');
  const [otherAppointmentType, setOtherAppointmentType] = useState('');
  const [message, setMessage] = useState('');
  
  const db = getFirestore();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Query the patient based on firstName and lastName
      const querySnapshot = await getPatients(firstName, lastName, dateOfBirth);
      
      let patientId;

      if (querySnapshot.empty) {
        const patientsCol = collection(db, 'patients');
        const patientDocs = await getDocs(patientsCol);
        const patientNumber = patientDocs.size;
        const newPatientId = `patient-${patientNumber.toString().padStart(2, '0')}`;

        const newPatientRef = await addDoc (patientsCol, {
          id: newPatientId,
          firstName: firstName,
          lastName: lastName
        });
        
        patientId = newPatientRef.id;
      } else {
        patientId = querySnapshot.docs[0].id;
      }
      
      // Get the patient notes collection
      const patientNotesCol = collection(db, `patients/${patientId}/patient-notes`);

      // Query patient notes to get the count
      const notesQuerySnapshot = await getDocs(patientNotesCol);
      const numberOfNotes = notesQuerySnapshot.size;

      // Generate next patient note ID
      const nextNoteId = `patient-notes-${numberOfNotes.toString().padStart(2, '0')}`;
      
      const newNoteRef = doc(patientNotesCol, nextNoteId);
      // Create visit note document
      await setDoc(newNoteRef, {
        id: nextNoteId,
        prescription,
        visitDescription,
        appointmentType: appointmentType === 'Other' ? otherAppointmentType : appointmentType,
        appointmentDate: new Date()
      });

      // Reset form fields
      setFirstName('');
      setLastName('');
      setPrescription('');
      setVisitDescription('');
      setAppointmentType('');
      setOtherAppointmentType('');
      setDateOfBirth('');

      setMessage('New visit note added successfully!');

      // Reset message after 3 seconds
      setTimeout(() => {
        setMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error adding visit note:', error);
      setMessage('Failed to add visit note. Please try again.');
    }
  };

  const getPatients = async (firstName, lastName, dateOfBirth) => {
    try {
      // Create a query to filter patients based on firstName and lastName and DOB
      const q = query(
        collection(db, 'patients'),
        where('firstName', '==', firstName),
        where('lastName', '==', lastName),
        where('dateOfBirth', '==', dateOfBirth)
      );

      // Execute the query and get the snapshot
      const querySnapshot = await getDocs(q);

      // Return the query snapshot
      return querySnapshot;
    } catch (error) {
      console.error('Error fetching patients:', error);
      throw error; 
    }
  };

  const handleAppointmentTypeChange = (event) => {
    setAppointmentType(event.target.value);
  };

  return (
    <div className="report-form-container">
      <h1 className="heading">Patient Visit Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <DatePicker
          selected={dateOfBirth}
          onChange={date => setDateOfBirth(date)}
          dateFormat="MM/dd/yyyy"
          placeholderText="Date of Birth"
          showYearDropdown={true}
          scrollableYearDropdown
          yearDropdownItemNumber={60}
          required
        />
        <input
          type="text"
          name="prescription"
          placeholder="Prescription/Medication"
          value={prescription}
          onChange={(e) => setPrescription(e.target.value)}
        />
        <textarea
          name="visitDescription"
          placeholder="Describe the visit"
          value={visitDescription}
          onChange={(e) => setVisitDescription(e.target.value)}
        />
        <div className="appointment-type-container">
          <label>
            <input
              type="radio"
              value="General Check-up"
              checked={appointmentType === 'General Check-up'}
              onChange={handleAppointmentTypeChange}
            />
            General Check-up
          </label>
          <label>
            <input
              type="radio"
              value="Dental Appointment"
              checked={appointmentType === 'Dental Appointment'}
              onChange={handleAppointmentTypeChange}
            />
            Dental Appointment
          </label>
          <label>
            <input
              type="radio"
              value="Eye Check-up"
              checked={appointmentType === 'Eye Check-up'}
              onChange={handleAppointmentTypeChange}
            />
            Eye Check-up
          </label>
          <label>
            <input
              type="radio"
              value="Physical Therapy Session"
              checked={appointmentType === 'Physical Therapy Session'}
              onChange={handleAppointmentTypeChange}
            />
            Physical Therapy Session
          </label>
          <label>
            <input
              type="radio"
              value="Psychiatrist Appointment"
              checked={appointmentType === 'Psychiatrist Appointment'}
              onChange={handleAppointmentTypeChange}
            />
            Psychiatrist Appointment
          </label>
          <label>
            <input
              type="radio"
              value="Dermatology Appointment"
              checked={appointmentType === 'Dermatology Appointment'}
              onChange={handleAppointmentTypeChange}
            />
            Dermatology Appointment
          </label>
          <label>
            <input
              type="radio"
              value="Gynecology Appointment"
              checked={appointmentType === 'Gynecology Appointment'}
              onChange={handleAppointmentTypeChange}
            />
            Gynecology Appointment
          </label>
          <label>
            <input
              type="radio"
              value="Orthopedic Appointment"
              checked={appointmentType === 'Orthopedic Appointment'}
              onChange={handleAppointmentTypeChange}
            />
            Orthopedic Appointment
          </label>
          <label>
            <input
              type="radio"
              value="Urology Appointment"
              checked={appointmentType === 'Urology Appointment'}
              onChange={handleAppointmentTypeChange}
            />
            Urology Appointment
          </label>
          <label>
            <input
              type="radio"
              value="Cardiology Appointment"
              checked={appointmentType === 'Cardiology Appointment'}
              onChange={handleAppointmentTypeChange}
            />
            Cardiology Appointment
          </label>
          <label>
            <input
              type="radio"
              value="Other"
              checked={appointmentType === 'Other'}
              onChange={handleAppointmentTypeChange}
            />
            Other
          </label>
          {appointmentType === 'Other' && (
            <input
              type="text"
              placeholder="Other Appointment Type"
              value={otherAppointmentType}
              onChange={(e) => setOtherAppointmentType(e.target.value)}
            />
          )}
        </div>
        <button type="submit">Submit Report</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminReportForm;