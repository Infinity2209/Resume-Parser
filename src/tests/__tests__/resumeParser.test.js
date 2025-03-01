import { parseResume } from '../services/resumeParserService.js';
import { storeCandidateProfile } from '../services/vectorDatabaseService.js';

describe('Resume Parser Tests', () => {
    test('should parse resume and extract keywords', async () => {
        const mockFile = new File(['mock resume content'], 'resume.pdf', { type: 'application/pdf' });
        const result = await parseResume(mockFile);
        
        expect(result).toHaveProperty('text');
        expect(result).toHaveProperty('keywords');
        expect(result.keywords.skills).toBeInstanceOf(Array);
        expect(result.keywords.experience).toBeInstanceOf(Array);
        expect(result.keywords.education).toBeInstanceOf(Array);
    });

    test('should store candidate profile with keywords', async () => {
        const profile = { email: 'test@example.com', name: 'Test Candidate' };
        const keywords = { skills: ['JavaScript'], experience: ['2 years'], education: ['Bachelor\'s Degree'] };
        
        await storeCandidateProfile(profile, keywords);
        // Add assertions to verify that the profile was stored correctly in the vector database
    });
});
