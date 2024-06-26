import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import PatientSearch from './PatientSearch';
import { formatDate } from '../funcs/functions';

const PatientInfoForm = ({ email }) => {
    const [patientNotes, setPatientNotes] = useState([]);
    const [patientName, setPatientName] = useState('');
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [patientData, setPatientData] = useState(null);
    const db = getFirestore();

    const getNoteNumber = (noteId) => {
        const match = noteId.match(/\d+$/);
        return match ? parseInt(match[0], 10) + 1 : null;
    };
    
    const filterNotesByType = (type) => {
        const filtered = patientNotes.filter(note => type ? note.appointmentType === type : true);
        setFilteredNotes(filtered);
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
                setPatientData({ ...patientData, patientId})

                console.log("Patient ID: ", patientId);
                const patientNotesCol = collection(db, `patients/${patientId}/patient-notes`);
                const notesSnapshot = await getDocs(patientNotesCol);

                const notes = notesSnapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.data().id,
                    appointmentDate: formatDate(doc.data().appointmentDate ? doc.data().appointmentDate.toDate().toString() : '')
                })).sort((a, b) => {
                    const numberA = getNoteNumber(a.id);
                    const numberB = getNoteNumber(b.id);
                    return numberA - numberB;
                });

                setPatientNotes(notes);
                setFilteredNotes(notes);
            }
        };
        if (email) {
            fetchPatientNotes();
        }
    }, [email, db]);

    return (
        <div className="patient-info-container">
            <h2>Patient Notes for {patientName}</h2>
            {patientData && <PatientSearch onTypeSelected={filterNotesByType} patientData={patientData} patientNotes={filteredNotes} />}
            <hr style={{ borderTop: '3px solid #bbb', marginBottom: '20px'}} />
            {filteredNotes.length ? (
                filteredNotes.map((note) => (
                    <div key={note.id}>
                        <div className="visit-container">
                            <h3>Visit {getNoteNumber(note.id)}</h3>
                            <p>Date: {note.appointmentDate}</p>
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