import { useRef, useState, useCallback, useEffect } from 'react';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

export function useVoiceCommand({ onResult, onListening }) {
    const recognitionRef = useRef(null);
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const supported = !!SpeechRecognition;

    const stop = useCallback(() => {
        if (recognitionRef.current) {
            recognitionRef.current.abort();
            recognitionRef.current = null;
        }
        setIsListening(false);
    }, []);

    const listen = useCallback(() => {
        if (!supported || isListening) return;

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 3;
        recognition.continuous = false;

        recognition.onstart = () => {
            setIsListening(true);
            onListening?.(true);
        };

        recognition.onresult = (event) => {
            const results = event.results[0];
            // Collect all alternatives for better matching
            const texts = [];
            for (let i = 0; i < results.length; i++) {
                texts.push(results[i].transcript.toLowerCase().trim());
            }
            const primary = texts[0] || '';
            setTranscript(primary);
            onResult?.(primary, texts);
        };

        recognition.onerror = () => {
            setIsListening(false);
            onListening?.(false);
        };

        recognition.onend = () => {
            setIsListening(false);
            onListening?.(false);
        };

        recognitionRef.current = recognition;
        recognition.start();
    }, [supported, isListening, onResult, onListening]);

    useEffect(() => {
        return () => stop();
    }, [stop]);

    return { listen, stop, isListening, transcript, supported };
}
