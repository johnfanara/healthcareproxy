import React, { useState } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AdminSearch = () => {
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [message, setMessage] = useState('');

  const db = getFirestore();
  
  const handleSearch = async () => {
    if (!lastName || !dateOfBirth) {
      setMessage('Please provide last name and date of birth.');
      return;
    }

    //Firestore requires dates to be stored as timestamps
    //Accounts for the timestamp and checks if time is within DOB
    const startOfDay = new Date(dateOfBirth.setHours(0, 0, 0, 0));
    const endOfDay = new Date(dateOfBirth.setHours(23, 59, 59, 999));

    try {
      const patientsCol = collection(db, 'patients');
      const q = query(patientsCol,
        where('lastName', '==', lastName),
        where('dateOfBirth', '>=', startOfDay),
        where('dateOfBirth', '<=', endOfDay)
      );
      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        dateOfBirth: doc.data().dateOfBirth.toDate()
      }));
      setSearchResults(results);
      if (results.length === 0) {
        setMessage('No patients found for provided last name and date of birth.');
        setTimeout(() => {
          setMessage('');
        }, 3000);
      }
    } catch (error) {
      console.error("Error searching patients: ", error);
      setMessage('Failed to perform search');
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  };
  return (
    <div>
      <h2>Search For Patient</h2>
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
        required
      />
      <DatePicker
        selected={dateOfBirth}
        onChange={(date) => setDateOfBirth(date)}
        dateFormat="MM/dd/yyyy"
        placeholderText="Date of Birth"
        showYearDropdown={true}
        scrollableYearDropdown
        yearDropdownItemNumber={60}
        required     
      />
      <button onClick={handleSearch}>Search</button>
      {searchResults.length > 0 && (
        <div>
          <h3>Search Results:</h3>
          <ul>
            {searchResults.map(patient => (
              <li key={patient.id}>{patient.id}: {patient.firstName} {patient.lastName} - DOB: {patient.dateOfBirth.toLocaleDateString()}</li>
            ))}
          </ul>
        </div>
      )}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AdminSearch;