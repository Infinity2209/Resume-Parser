import { client } from '../utils/vectorDatabase.js'; // Importing the client from vectorDatabase.js

export const storeCandidateProfile = async (profile, keywords = {}, additionalInfo = {}) => {
    const index = client.Index('candidate-profiles');
    const vector = await createVector(profile);
    await index.upsert([{ id: profile.email, values: vector, keywords: keywords, additionalInfo: additionalInfo }]);
};

export const retrieveCandidateProfiles = async (jobDescription) => {
    const index = client.Index('candidate-profiles');
    const vector = await createVector({ jobDescription });
    const results = await index.query({ vector, top_k: 5 });
    return results.matches;
};

export const searchCandidateProfiles = async (jobDescription) => {
    const profiles = await retrieveCandidateProfiles(jobDescription);
    return profiles;
};
