import FormInput from '../src/components/FormInput';
import FormTextarea from '../src/components/FormTextarea';
import FileUpload from '../src/components/FileUpload';
import { parseResume } from '../src/services/resumeParserService'; // Importing the resume parser service
import { storeCandidateProfile } from '../src/services/vectorDatabaseService'; // Importing the vector database service
import { useState, useEffect } from 'react';
import Modal from '../src/components/Modal';

export default function Home() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [resume, setResume] = useState(null);
    const [skills, setSkills] = useState(''); // Add state for skills
    const [resumeText, setResumeText] = useState('');
    const [keywords, setKeywords] = useState({ skills: [], experience: [], education: [] });
    const [bubbles, setBubbles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleFileUpload = async (event) => {
        const file = event.target.files[0]; // Get the file from the event
        if (file) {
            setResume(file); // Set the resume state
            const { text, keywords: extractedKeywords } = await parseResume(file);
            console.log("Extracted text:", text); // Debugging log
            console.log("Extracted keywords:", extractedKeywords); // Debugging log

            setResumeText(text);
            setKeywords(extractedKeywords);
        } else {
            console.log("No file selected."); // Log if no file is selected
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !resume || !skills) {
            alert("Please fill in all required fields.");
            return;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        try {
            await storeCandidateProfile({ name, email, linkedin, resumeText, skills });
            resetForm();
            setSuccessMessage("Submission successful!");
            setIsModalOpen(true);
        } catch (error) {
            setSuccessMessage("Submission failed: " + error.message);
            setIsModalOpen(true);
        }
    };

    const resetForm = () => {
        setName('');
        setEmail('');
        setLinkedin('');
        setResume(null); // This will clear the file input
        setSkills('');
    };

    useEffect(() => {
        const bubbleCount = 5;
        const newBubbles = [];
        for (let i = 0; i < bubbleCount; i++) {
            newBubbles.push(<div className="bubble" key={i} />);
        }
        setBubbles(newBubbles);
    }, []);

return (
  <div>
    <h1>Resume Parser</h1> {/* Adding a title for clarity */}

            <h1>Resume Parser</h1> {/* Added a title for the page */}
            {isModalOpen && <Modal message={successMessage} onClose={() => setIsModalOpen(false)} />}
            {bubbles}
            <h1>Candidate Submission Form</h1>
            <form onSubmit={handleSubmit}>
                <FormInput label="Name:" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                <FormInput label="Email:" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <FormInput label="LinkedIn URL:" type="url" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
                <FileUpload label="Resume:" onChange={(e) => handleFileUpload(e)} accept=".pdf" required />
                <FormTextarea label="Skills & Experience:" value={skills} onChange={(e) => setSkills(e.target.value)} required />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
