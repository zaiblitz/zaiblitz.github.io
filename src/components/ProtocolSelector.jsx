import { useState } from 'react';
import { useProtocol } from '../contexts/ProtocolContext';
import { useZaiblitzAudio } from '../hooks/useZaiblitzAudio';
import { getActiveProtocols } from '../data/settings';
import '../styles/ProtocolSelector.css';

const hoverSounds = {
    hulkbuster: (beep) => { beep(300, 'sawtooth', 0.15, 0.2, 0); beep(280, 'square', 0.1, 0.1, 50); },
    stealth:    (beep) => { beep(500, 'sine', 0.1, 0.1, 0); },
    diag:       (beep) => { beep(1500, 'square', 0.05, 0.05, 0); },
    legacy:     (beep) => { beep(900, 'sine', 0.1, 0.1, 0); },
    mark:       (beep) => { beep(600, 'sine', 0.1, 0.2, 0); beep(800, 'sine', 0.1, 0.1, 50); },
};

const selectSounds = {
    hulkbuster: (beep) => { beep(150, 'sawtooth', 0.5, 0.5, 0); },
    stealth:    (beep) => { beep(400, 'sine', 0.8, 0.3, 0); },
    diag:       (beep) => { beep(2000, 'square', 0.3, 0.2, 0); },
    legacy:     (beep) => { beep(600, 'sine', 0.3, 0.3, 0); },
    mark:       (beep) => { beep(800, 'sine', 0.4, 0.4, 0); },
};

export default function ProtocolSelector() {
    const { activateProtocol } = useProtocol();
    const { initAudio, playBeep, speak } = useZaiblitzAudio();
    const [booted, setBooted] = useState(false);
    const [statusText, setStatusText] = useState("> STANDBY...");

    const activeProtocols = getActiveProtocols();

    const handleBoot = () => {
        initAudio();
        setBooted(true);
        
        playBeep(220, 'sine', 0.8, 0.4, 0);
        playBeep(440, 'triangle', 0.5, 0.4, 300);
        playBeep(880, 'sine', 0.3, 0.3, 500);

        setTimeout(() => speak("Systems online. Welcome sir. Awaiting protocol selection.", 0.9, 0.9), 1000);

        const txt = "> SECURE CONNECTION ESTABLISHED... VERIFYING BIOMETRICS... READY.";
        let i = 0;
        setStatusText("");
        
        setTimeout(() => {
            const typer = setInterval(() => {
                if(i < txt.length) {
                    setStatusText(prev => prev + txt.charAt(i));
                    if(txt.charAt(i) !== ' ') playBeep(1200 + Math.random()*200, 'square', 0.05, 0.02, 0);
                    i++;
                } else {
                    clearInterval(typer);
                }
            }, 40);
        }, 800);
    };

    const handleHover = (type) => {
        const fn = hoverSounds[type] || hoverSounds.mark;
        fn(playBeep);
    };

    const handleSelect = (proto) => {
        speak(proto.voiceLine, proto.voicePitch, proto.voiceRate);
        const fn = selectSounds[proto.hoverType] || selectSounds.mark;
        fn(playBeep);
        setTimeout(() => activateProtocol(proto.id), 600);
    };

    return (
        <div className="selector-theme">
            {!booted && (
                <div className="init-overlay" onClick={handleBoot}>
                    <h2 className="standby-text">[ SYSTEM STANDBY ]</h2>
                    <div className="click-prompt">CLICK TO INITIALIZE Z.A.I.B.L.I.T.Z. PROTOCOL</div>
                </div>
            )}
            
            <div className="scanlines"></div>

            <div className="header">
                <h1 className="title">Z.A.I.B.L.I.T.Z.</h1>
                <div className="subtitle">SYSTEM INITIALIZED // AWAITING PROTOCOL SELECTION</div>
            </div>

            <div className="options-container">
                {activeProtocols.map(proto => (
                    <div 
                        key={proto.id}
                        className={`option-card ${proto.cardClass}`}
                        onMouseEnter={() => handleHover(proto.hoverType)}
                        onClick={() => handleSelect(proto)}
                    >
                        <div className={`card-icon ${proto.hoverType === 'stealth' ? 'stealth-icon' : ''} ${proto.hoverType === 'diag' ? 'diag-icon' : ''} ${proto.hoverType === 'legacy' ? 'legacy-icon' : ''}`}>
                            <div className={`card-inner-icon ${proto.hoverType === 'stealth' ? 'stealth-inner' : ''} ${proto.hoverType === 'diag' ? 'diag-inner' : ''} ${proto.hoverType === 'legacy' ? 'legacy-inner' : ''}`}></div>
                        </div>
                        <div className="option-title">{proto.name}</div>
                        <div className="option-desc">{proto.description}</div>
                    </div>
                ))}
            </div>

            <div className="sel-status-text">{statusText}</div>
        </div>
    );
}