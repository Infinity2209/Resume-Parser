import { PineconeClient } from '@pinecone-database/pinecone';

const client = new PineconeClient();

export const initPinecone = async () => {
    await client.init({
        apiKey: 'YOUR_PINECONE_API_KEY',
        environment: 'YOUR_PINECONE_ENVIRONMENT',
    });
};

export const storeCandidateProfile = async (profile) => {
    const index = client.Index('candidate-profiles');
    const vector = await createVector({ text: profile.text, keywords: profile.keywords });
    // const vector = await createVector({ text: profile.text, keywords: profile.keywords }); // Removed redeclaration


    await index.upsert([{ id: profile.email, values: vector }]);
};

const createVector = async ({ text, keywords }) => {

    // Example logic for creating a vector (this should be replaced with actual embedding logic)
    let vector = []; // Initialize an empty vector
    return vector; // Return the generated vector
};


export const searchCandidates = async (jobDescription) => {
    const index = client.Index('candidate-profiles');
    const vector = await createVector({ jobDescription });
    const results = await index.query({ vector, top_k: 5 });
    return results.matches;
};
