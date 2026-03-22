import { useState, useEffect } from 'react';
import { useProtocol } from '../../contexts/ProtocolContext';
import { useZaiblitzAudio } from '../../hooks/useZaiblitzAudio';
import { systemSettings } from '../../data/settings';
import TerminalManager from '../shared/TerminalManager';
import '../../styles/protocols/Stealth.css';

const terminalData = {
    about: ">> DECRYPTING: ABOUT_US.DAT\n\n> ZAIBLITZ PROTOCOL is an advanced development initiative.\n> SPECIALIZATION: Scalable web infrastructure, AI-enhanced logic, and cybernetic UI/UX.\n\n> STATUS: Operating seamlessly from the shadows.\n[ END OF FILE ]",
    career: ">> DECRYPTING: CAREERS.DAT\n\n> SCANNING NETWORK FOR OPPORTUNITIES...\n> FOUND: 2 OPEN DIRECTIVES\n\n> OPTION_A: STEALTH INTEGRATION SPECIALIST\n> REQUIREMENT: Master-level JavaScript and API manipulation.\n\n> OPTION_B: CORE SYSTEMS GUARDIAN\n> REQUIREMENT: Laravel architecture, DB Security protocols.\n\n[ END OF FILE ]",
    contact: ">> ESTABLISHING P2P CONNECTION...\n\n> FREQUENCY: ENCRYPTED\n> LOCAL RELAY: comms@zaiblitz.net\n> LAT/LONG: CLASSIFIED\n\n> AWAITING TRANSMISSION..."
};

export default function Stealth() {
    const { rebootToSelector } = useProtocol();
    const { initAudio, playBeep } = useZaiblitzAudio();
    const [termState, setTermState] = useState({ open: false, key: 'about' });

    useEffect(() => {
        const handleInit = () => {
            initAudio();
            window.removeEventListener('click', handleInit);
        };
        window.addEventListener('click', handleInit);

        return () => {
            window.removeEventListener('click', handleInit);
        };
    }, []);

    const handleHover = () => playBeep(1200, 'sine', 0.05, 0.05, 0);

    const openTerminal = (section) => {
        initAudio();
        playBeep(600, 'sawtooth', 0.15, 0.1, 0);
        setTermState({ open: true, key: section });
    };

    return (
        <div className="stealth-theme">
            <div className="radar-sweep"></div>
            
            <div className="nav-menu">
                {systemSettings.selectorEnabled && <button className="nav-btn back-btn" onMouseEnter={handleHover} onClick={() => { playBeep(300, 'sine', 0.15, 0.1, 0); rebootToSelector(); }} title="Back to Protocol Selector">◁</button>}
                <button className="nav-btn" onMouseEnter={handleHover} onClick={() => openTerminal('about')}>ABOUT_US</button>
                <button className="nav-btn" onMouseEnter={handleHover} onClick={() => openTerminal('career')}>CAREERS</button>
                <button className="nav-btn" onMouseEnter={handleHover} onClick={() => openTerminal('contact')}>COMMS</button>
            </div>

            <TerminalManager 
                isOpen={termState.open}
                onClose={() => {
                    playBeep(300, 'square', 0.1, 0.1, 0);
                    setTermState(prev => ({ ...prev, open: false }));
                }}
                title={`SYS // DIRECTIVE: ${termState.key.toUpperCase()}`}
                content={terminalData[termState.key]}
                soundPitch={1000}
                typeSpeed={25}
            />

            <div className="layout-grid">
                <div className="radar-container panel" onMouseEnter={handleHover}>
                    <div className="radar-ring r-1"></div>
                    <div className="radar-ring r-2"></div>
                    <div className="radar-ring r-3"></div>
                    <div className="radar-center">
                        <h2>ZAIBLITZ</h2>
                        <p>STEALTH PROTOCOL</p>
                        <div style={{color: 'var(--hud-alert)', fontSize: '10px', marginTop: '20px'}}>[ MONITORED ZONE ]</div>
                    </div>
                </div>

                <div className="center-feed">
                    <div className="feed-log">&gt; INITIALIZING LOCAL ENVIRONMENT... OK</div>
                    <div className="feed-log">&gt; BYPASSING FIREWALL SECURITIES... 99%</div>
                    <div className="feed-log">&gt; ALL SYSTEMS NOMINAL. READY FOR INPUT.</div>
                </div>

                <div className="diagnostics">
                    <div className="data-block panel" onMouseEnter={handleHover}>
                        <div className="block-title">SYS_CAPACITIES</div>
                        <div className="skill-row">
                            <div className="skill-name"><span>FRONTEND</span><span>96%</span></div>
                            <div className="bar"><div className="fill" style={{width: '96%'}}></div></div>
                        </div>
                        <div className="skill-row">
                            <div className="skill-name"><span>BACKEND/LARAVEL</span><span>89%</span></div>
                            <div className="bar"><div className="fill" style={{width: '89%'}}></div></div>
                        </div>
                        <div className="skill-row">
                            <div className="skill-name"><span>CLOUD OPS</span><span>91%</span></div>
                            <div className="bar"><div className="fill" style={{width: '91%'}}></div></div>
                        </div>
                    </div>

                    <div className="data-block panel" onMouseEnter={handleHover}>
                        <div className="block-title">PROJECT_ARCHIVE</div>
                        <div style={{fontSize: '0.8rem', marginBottom: '8px'}}>&gt; ATLAS <span style={{float: 'right', color: 'var(--hud-alert)'}}>DEPLOYED</span></div>
                        <div style={{fontSize: '0.8rem', marginBottom: '8px'}}>&gt; BEACON <span style={{float: 'right', color: 'var(--hud-alert)'}}>ACTIVE</span></div>
                        <div style={{fontSize: '0.8rem', marginBottom: '8px'}}>&gt; FORGE <span style={{float: 'right', color: 'var(--hud-alert)'}}>COMPILING</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
}