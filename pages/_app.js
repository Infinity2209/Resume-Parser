import '../src/styles/global.css';

import { useEffect } from 'react';
import { initPinecone } from '../utils/vectorDatabase'; // Importing the initPinecone function

export default function MyApp({ Component, pageProps }) {
    useEffect(() => {
        const initializePinecone = async () => {
            if (typeof window === 'undefined') { // Check if running on the server
                await initPinecone(); // Initialize Pinecone client
            }
        };
        initializePinecone();
    }, []); // Add dependency array to avoid running on every render

    return <Component {...pageProps} />;
}
