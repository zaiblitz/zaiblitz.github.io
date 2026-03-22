import { useState, useEffect } from 'react';
import { useZaiblitzAudio } from '../../hooks/useZaiblitzAudio';
import TerminalManager from '../TerminalManager';
import '../../styles/protocols/Diagnostic.css';

const terminalData = {
    about: ">> EXAMINING ROOT DIRECTORY...\n\n> ZAIBLITZ SYSTEMS\n> STRUCTURAL INTEGRITY: MAXIMUM\n> FOCUS: Building high-performance, modular applications with raw coding precision.\n> [ DIAGNOSTIC COMPLETE ]",
    career: ">> RUNNING PERSONNEL QUERY...\n\n> NO ANOMALIES FOUND.\n> REQUIRED CLASSES:\n  - DIAGNOSTIC UX ENGINEER [OPEN]\n  - DATABASE RELAY TECHNICIAN [OPEN]\n\n> AWAITING CANDIDATE DATA.",
    contact: ">> PINGING RELAY NODE...\n\n> NODE RESPONDED: comms@zaiblitz.net\n> LATENCY: 12ms\n> CONNECTION ROUTE: SECURED, ENCRYPTED, TRACEABLE."
};

export default function Diagnostic() {
    const { initAudio, playBeep } = useZaiblitzAudio();
    const [termState, setTermState] = useState({ open: false, key: 'about' });

    useEffect(() => {
        const handleInit = () => {
            initAudio();
            window.removeEventListener('click', handleInit);
        };
        window.addEventListener('click', handleInit);
        return () => window.removeEventListener('click', handleInit);
    }, []);

    const handleHover = () => playBeep(2000, 'square', 0.05, 0.02, 0);

    const openTerminal = (section) => {
        initAudio();
        playBeep(1200, 'sawtooth', 0.1, 0.1, 0);
        setTermState({ open: true, key: section });
    };

    return (
        <div className="diagnostic-theme">
            
            <div className="nav-menu">
                <button className="nav-btn" onMouseEnter={handleHover} onClick={() => openTerminal('about')}>ABOUT</button>
                <button className="nav-btn" onMouseEnter={handleHover} onClick={() => openTerminal('career')}>CAREERS</button>
                <button className="nav-btn" onMouseEnter={handleHover} onClick={() => openTerminal('contact')}>CONTACT</button>
            </div>

            <TerminalManager 
                isOpen={termState.open}
                onClose={() => {
                    playBeep(800, 'sawtooth', 0.1, 0.1, 0);
                    setTermState(prev => ({ ...prev, open: false }));
                }}
                title={`DIAG // ${termState.key.toUpperCase()}`}
                content={terminalData[termState.key]}
                soundPitch={2400}
                typeSpeed={20}
                isDiag={true}
            />

            <div className="reticle-container">
                <div className="targeting-bracket"></div>
                <div className="central-designation" style={{position: 'absolute'}}>
                    <h1>ZAIBLITZ</h1>
                    <p>DIAGNOSTIC SCHEMATIC</p>
                </div>
            </div>

            <div className="panel p-top-left panel-hover" onMouseEnter={handleHover}>
                <div className="panel-heading">NODE INTEGRITY</div>
                <div className="data-line"><span>ROUTING</span><span>OK</span></div>
                <div className="data-line"><span>MEMORY ALLOCATION</span><span>STABLE</span></div>
                <div className="data-line"><span>SERVER LOAD</span><span>12%</span></div>
            </div>

            <div className="panel p-bottom-left panel-hover" onMouseEnter={handleHover}>
                <div className="panel-heading">PROJECT PIPELINE</div>
                <div className="data-line"><span>ATLAS.SYS</span><span>100%</span></div>
                <div className="data-line"><span>BEACON.SYS</span><span>ACTIVE</span></div>
                <div className="data-line"><span>FORGE.SYS</span><span>BUILDING...</span></div>
            </div>

            <div className="panel p-top-right panel-hover" onMouseEnter={handleHover}>
                <div className="panel-heading">FRAMEWORK SPECS</div>
                <div className="data-line"><span>REACT CORE</span><span>v19.x</span></div>
                <div className="data-line"><span>LARAVEL API</span><span>v11.x</span></div>
                <div className="data-line"><span>TAILWIND/CSS</span><span>3.4.x</span></div>
            </div>

            <div className="panel p-bottom-right panel-hover" onMouseEnter={handleHover}>
                <div className="panel-heading">COORDINATES</div>
                <div className="data-line"><span>LAT</span><span>14.5995 N</span></div>
                <div className="data-line"><span>LNG</span><span>120.9842 E</span></div>
            </div>
            
        </div>
    );
}