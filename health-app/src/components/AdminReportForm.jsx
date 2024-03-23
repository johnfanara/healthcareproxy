import React, { useState } from 'react';
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore';


const AdminReportForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [prescription, setPrescription] = useState('');
  const [visitDescription, setVisitDescription] = useState('');
  const [message, setMessage] = useState('');

  const db = getFirestore();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
     
      // Query the patient based on firstName and lastName
      const querySnapshot = await getPatients(firstName, lastName);
    
      if (querySnapshot.empty) {
        setMessage('Patient not found. Please check the details and try again.');
        return;
      }

      
      // Assuming there's only one patient with the provided details
      const patientId = querySnapshot.docs[0].id;
      console.log(patientId);
     // Get the patient notes collection
      const patientNotesCol = collection(db, `patients/${patientId}/patient-notes`);

      // Query patient notes to get the count
      const notesQuerySnapshot = await getDocs(patientNotesCol);
      const numberOfNotes = notesQuerySnapshot.size;


      // Generate next patient note ID
      const nextNoteId = `patient-notes-${numberOfNotes.toString().padStart(2, '0')}`;


      // Create visit note document
      await addDoc(patientNotesCol, nextNoteId, {
        id: nextNoteId,
        firstName,
        lastName,
        prescription,
        visitDescription
      });
    
      setFirstName('');
      setLastName('');
      setPrescription('');
      setVisitDescription('');

      setMessage('New visit note added successfully!');

      setTimeout(() =>{
        setMessage('');
      }, 3000);

    } catch (error) {
      console.error('Error adding visit note:', error);
      setMessage('Failed to add visit note. Please try again.');
    }
  };

  const getPatients = async (firstName, lastName) => {
    try {
      // Create a query to filter patients based on firstName and lastName
      const q = query(
        collection(db, 'patients'),
        where('firstName', '==', firstName),
        where('lastName', '==', lastName)
      );

      // Execute the query and get the snapshot
      const querySnapshot = await getDocs(q);

      // Return the query snapshot
      return querySnapshot;
    } catch (error) {
      console.error('Error fetching patients:', error);
      throw error; // You might want to handle this error in your UI
    }
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
        <button type="submit">Submit Report</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminReportForm;

