import { getDocument } from 'pdfjs-dist/build/pdf';
import { GlobalWorkerOptions } from 'pdfjs-dist/build/pdf';

GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';

export const parseResume = async (file) => {
    const pdfData = await file.arrayBuffer();
    const pdfDoc = await getDocument({ data: pdfData }).promise;
    const numPages = pdfDoc.numPages;
    let text = '';

    for (let i = 1; i <= numPages; i++) {
        const page = await pdfDoc.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map(item => item.str).join(' ');
        text += pageText + '\n';
    }
    return text;    
};
