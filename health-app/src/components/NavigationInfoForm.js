import React, { useState, useEffect } from 'react';
import { getFirestore, collection, setDoc, query, orderBy, limit, getDocs, doc } from 'firebase/firestore';
import '../about.css';
import '../missionStatement.css';


const About = () => {
    const [content, setContent] = useState('');

    useEffect(() => {
        fetch('/aboutfam.txt')
            .then(response => response.text())
            .then(text => setContent(text))
            .catch(err => console.error('Failed to fetch text file:', err));
    }, []);

    return (
        <div className="about-content">
            <h1>About Farmingdale Alliance Medical</h1>
            <pre>{content}</pre>
        </div>
    ); 
};

const MissionStatement = () => {
    const [content, setContent] = useState('');

    useEffect(() => {
        fetch('/missionstatement.txt')
            .then(response => response.text())
            .then(text => setContent(text))
            .catch(err => console.error('Failed to fetch text file: ', err));
    }, []);

    return (
        <div className="mission-statement-container">
            <h1 className="mission-statement-heading">Our Mission Statement</h1>
            <p className="mission-statement-content">{content}</p>
        </div>
    );
};

const Contacts = () => {    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const db = getFirestore();

    const onSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const contactsCol = collection(db, 'contacts');
            const q = query(contactsCol, orderBy('id', 'desc'), limit(1));
            const querySnapshot = await getDocs(q);

            let nextContactId = 'contact-form-01';

            if (!querySnapshot.empty) {
                const lastVisible = querySnapshot.docs[0].data();
                const currentIdNumber = parseInt(lastVisible.id.replace('contact-form-', ''), 10);
                const nextIdNumber = currentIdNumber + 1;
                nextContactId = `contact-form-${nextIdNumber.toString().padStart(2, '0')}`;
            }

            await setDoc(doc(contactsCol, nextContactId), {
                id: nextContactId,
                name: name,
                email: email,
                message: message
            });

            console.log('Message stored!')

            setName('');
            setEmail('');
            setMessage('');
            setErrorMessage("Message sent successfully!")
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        } catch (error) {
            console.error("Contact Us Error");

            setErrorMessage("Error sending message, try again");
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
    };
    return (
        <div>
            <h1>Questions? Contact Us!</h1>
            <form onSubmit={onSubmit}>
                <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Your Name" />
                <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Your Email" />
                <textarea
                    type="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    placeholder="Your Message" />
                <button type="submit">Send</button>
                {errorMessage && <p className="errorMessage">{errorMessage}</p>} 
            </form>
        </div>
    );
};

const Documentation = () => (
    <div>
        <h1>FAM Documentation</h1>
        Documentation Here
    </div>
);

const NavigationInfoForm = ({ formType }) => {
    const renderFormContent = () => {
        switch (formType) {
            case 'about':
                return <About />;
            case 'mission-statement':
                return <MissionStatement />;
            case 'contacts':
                return <Contacts />;
            case 'documentation':
                return <Documentation />;
            default:
                return <div>Select a form...</div>;
        }
    };

    return (
        <div className="info-form">
            {renderFormContent()}
        </div>
    );
};

export default NavigationInfoForm;