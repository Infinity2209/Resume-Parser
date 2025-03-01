import { getDocument } from 'pdfjs-dist';
import { GlobalWorkerOptions } from 'pdfjs-dist';



GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

export const parseResume = async (file) => {
    try {
        const pdfData = await file.arrayBuffer();
        const pdfDoc = await getDocument({ data: pdfData }).promise; // For text-based PDFs
        const ocrText = await Tesseract.recognize(file, 'eng'); // For OCR processing
        // let text = ''; // Declare text variable here

        text += ocrText.data.text + '\n'; // Append OCR text


        const numPages = pdfDoc.numPages;
        // let text = '';


        const keywords = {
            skills: [],
            experience: [],
            education: [],
            certifications: [],
            projects: [],
            additionalInfo: [] // Moved additionalInfo to the end for better organization
        };


        for (let i = 1; i <= numPages; i++) {
            const page = await pdfDoc.getPage(i);
            const content = await page.getTextContent();
            const pageText = content.items.map(item => item.str).join(' ');
            text += pageText + '\n';
        }

        // Extract keywords from the text
        const lines = text.split('\n'); // Split text into lines for keyword extraction
        const refinedKeywords = { // Refined keyword extraction logic
            skills: [],
            experience: [],
            education: [],
            certifications: [],
            projects: [],
            additionalInfo: []
        };

        lines.forEach((line, index) => {

            const lowerCaseLine = line.toLowerCase();
            if (lowerCaseLine.includes('skills') || lowerCaseLine.includes('skill') || lowerCaseLine.includes('expertise') || lowerCaseLine.includes('proficient in')) {

                refinedKeywords.skills.push(line); // Use refined keywords object

            } else if (lowerCaseLine.includes('experience') || lowerCaseLine.includes('work history') || lowerCaseLine.includes('professional experience') || lowerCaseLine.includes('employment history') || lowerCaseLine.includes('job history')) {

                refinedKeywords.experience.push(line); // Use refined keywords object

            } else if (lowerCaseLine.includes('education') || lowerCaseLine.includes('degree') || lowerCaseLine.includes('certification') || lowerCaseLine.includes('qualification') || lowerCaseLine.includes('certifications') || lowerCaseLine.includes('academic')) {

                refinedKeywords.education.push(line); // Use refined keywords object

            } else if (lowerCaseLine.includes('certification') || lowerCaseLine.includes('certifications')) {
                refinedKeywords.certifications.push(line); // Use refined keywords object

            } else if (lowerCaseLine.includes('project') || lowerCaseLine.includes('projects')) {
                refinedKeywords.projects.push(line); // Use refined keywords object

            }
        });

        console.log("Extracted text:", text); // Debugging log
        console.log("Extracted keywords:", refinedKeywords); // Debugging log

        return { text, keywords: refinedKeywords }; // Return refined keywords


    } catch (error) {
        console.error("Error parsing PDF:", error);
        throw new Error("Failed to parse the resume. Please ensure the file is a valid PDF. Error details: " + error.message);

    }
};
