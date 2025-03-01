export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { resumeText, jobDescription } = req.body;

        // Call Google Gemini API for summarization and matching
        const summary = await summarizeResume(resumeText);
        const matches = await matchCandidates(jobDescription);

        res.status(200).json({ summary, matches });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

const summarizeResume = async (resumeText) => {
    const response = await fetch('https://api.gemini.com/summarize', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer YOUR_API_KEY`
        },
        body: JSON.stringify({ text: resumeText })
    });

    if (!response.ok) {
        throw new Error('Failed to summarize resume');
    }

    const data = await response.json();
    return data.summary; // Assuming the API returns a summary field
};


const matchCandidates = async (jobDescription) => {
    const response = await fetch('https://api.gemini.com/match', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer YOUR_API_KEY`
        },
        body: JSON.stringify({ description: jobDescription })
    });

    if (!response.ok) {
        throw new Error('Failed to match candidates');
    }

    const data = await response.json();
    return data.matches; // Assuming the API returns a matches field
};
