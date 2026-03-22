import { useState, useEffect, useRef } from 'react';
import { useZaiblitzAudio } from '../../hooks/useZaiblitzAudio';
import './TerminalManager.css';

export default function TerminalManager({ isOpen, onClose, title, content, typeSpeed = 30, soundPitch = 1200, isDiag = false }) {
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const bodyRef = useRef(null);
    const { playBeep } = useZaiblitzAudio();

    useEffect(() => {
        if (!isOpen) {
            setDisplayedText('');
            setIsTyping(false);
            return;
        }

        setIsTyping(true);
        let i = 0;
        setDisplayedText('');

        const timer = setInterval(() => {
            if (i < content.length) {
                const char = content.charAt(i);
                setDisplayedText(prev => prev + char);
                
                // Typing sound
                if (char !== ' ' && char !== '\n' && (i % 2 === 0)) {
                    playBeep(soundPitch + Math.random() * 200, isDiag ? 'square' : 'square', 0.02, 0.02, 0);
                }
                
                i++;
                if (bodyRef.current) {
                    bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
                }
            } else {
                clearInterval(timer);
                setIsTyping(false);
                playBeep(soundPitch * 0.5, 'sine', 0.2, 0.05, 0); // End sound
            }
        }, typeSpeed);

        return () => clearInterval(timer);
    }, [isOpen, content, typeSpeed, soundPitch, isDiag, playBeep]);

    if (!isOpen) return null;

    return (
        <>
            <div className="term-mngr-overlay" onClick={onClose}></div>
            <div className={`term-mngr-popup ${isDiag ? 'diag-theme' : ''}`}>
                <div className="term-mngr-header">
                    <span className="term-title">{title}</span>
                    <span className="term-close" onClick={onClose}>[ TERMINATE ]</span>
                </div>
                <div className="term-mngr-body" ref={bodyRef}>
                    {displayedText.split('\n').map((line, idx) => (
                        <span key={idx}>
                            {line}
                            <br />
                        </span>
                    ))}
                    <span className="term-mngr-cursor"></span>
                </div>
            </div>
        </>
    );
}