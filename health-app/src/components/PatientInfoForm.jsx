import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs, doc } from 'firebase/firestore';

const PatientInfoForm = ({ email }) => {
    const [patientNotes, setPatientNotes] = useState([]);
    const [patientName, setPatientName] = useState('');
    const db = getFirestore();

    const getNoteNumber = (noteId) => {
        const match = noteId.match(/\d+$/);
        return match ? parseInt(match[0], 10) + 1 : null;
    };

    useEffect(() => {
        const fetchPatientNotes = async () => {
            const patientsCol = collection(db, 'patients');
            const q = query(patientsCol, where('email', '==', email));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const patientDoc = querySnapshot.docs[0];
                const patientData = patientDoc.data();
                const patientId = patientDoc.id;
                setPatientName(`${patientData.firstName} ${patientData.lastName}`);

                console.log("Patient ID: ", patientId);
                const patientNotesCol = collection(db, `patients/${patientId}/patient-notes`);
                const notesSnapshot = await getDocs(patientNotesCol);

                const notes = notesSnapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.data().id,
                    appointmentDate: doc.data().appointmentDate ? doc.data().appointmentDate.toDate().toString() : 'No date provided'
                })).sort((a, b) => {
                    const numberA = getNoteNumber(a.id);
                    const numberB = getNoteNumber(b.id);
                    return numberA - numberB;
                });

                setPatientNotes(notes);
            }
        };

        if (email) {
            fetchPatientNotes();
        }
    }, [email, db]);

    return (
        <div>
            <h2>Patient Notes for {patientName}</h2>
            <hr style={{ borderTop: '3px solid #bbb', marginBottom: '20px'}} />
            {patientNotes.length ? (
                patientNotes.map((note) => (
                    <div key={note.id}>
                        <div style={{ backgroundColor: '#f8f8f8', padding: '10px', borderRadius: '8px', marginBottom: '20px' }}>
                            <h3>Visit {getNoteNumber(note.id)}</h3>
                            <p>Date: {note.appointmentDate ? note.appointmentDate : 'Date not available'}</p>
                            <p>Appointment Type: {note.appointmentType}</p>
                            <p>Prescription: {note.prescription}</p>
                            <p>Visit Description: {note.visitDescription}</p>
                        </div>
                        <hr style={{ borderTop: '3px solid #bbb', marginBottom: '20px'}} />
                    </div>
                ))
            ) : (
                <p>No notes found for this patient</p>
            )}
        </div>
    );
};

export default PatientInfoForm;