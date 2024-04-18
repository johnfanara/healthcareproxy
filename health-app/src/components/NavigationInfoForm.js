import React, { useState, useEffect } from 'react';

const About = () => {
    const [content, setContent] = useState('');

    useEffect(() => {
        fetch('/aboutfam.txt')
            .then(response => response.text())
            .then(text => setContent(text))
            .catch(err => console.error('Failed to fetch text file:', err));
    }, []);

    return (
        <div>
            <h1>About Farmingdale Alliance Medical</h1>
            <pre>{content}</pre>
        </div>
    ); 
};

const MissionStatement = () => (
    <div>Mission Statement Content...</div>
);

const Contacts = () => (
    <form>
        <input type="text" placeholder="Your Name" />
                        <input type="email" placeholder="Your Email" />
                        <textarea placeholder="Your Message" />
                        <button type="submit">Send</button>
    </form>
);

const Help = () => (
    <div>Help content...</div>
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
            case 'help':
                return <Help />;
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