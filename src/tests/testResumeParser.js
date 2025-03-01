import { parseResume } from '../services/resumeParserService.js';
import { storeCandidateProfile, searchCandidateProfiles } from '../services/vectorDatabaseService.js';


const testResumeParsing = async () => {
    const file = new File(['sample resume content'], 'sample_resume.pdf', { type: 'application/pdf' });
    const { text, keywords } = await parseResume(file);
    console.log('Parsed Text:', text);
    console.log('Extracted Keywords:', keywords);

    const profile = { email: 'test@example.com', name: 'Test User' };
    await storeCandidateProfile(profile, keywords);
    console.log('Profile stored successfully.');

    const jobDescription = 'Looking for a software engineer with experience in JavaScript and React.';
    const results = await searchCandidateProfiles(jobDescription);
    console.log('Search Results:', results);
};

testResumeParsing();
