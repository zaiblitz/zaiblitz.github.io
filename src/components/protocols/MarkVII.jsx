import { useState, useEffect } from 'react';
import { useZaiblitzAudio } from '../../hooks/useZaiblitzAudio';
import TerminalManager from '../TerminalManager';
import '../../styles/protocols/MarkVII.css';

const terminalData = {
    about: "INITIATING QUERY: ABOUT US\n\n> ZAIBLITZ PROTOCOL is a highly advanced AI-driven architecture and full-stack ecosystem.\n> DEVELOPER: Zaiblitz\n> DIRECTIVE: To build seamless, scalable, and visually stunning web systems.\n> CURRENT ASSETS: React, Vue, Laravel, Cloud Infrastructures.\n\n[ END OF TRANSMISSION ]",
    career: "INITIATING QUERY: CAREERS\n\n> SCANNING DATABASE FOR OPEN POSITIONS...\n\n> POSITION_1: UI/UX HOLOGRAPHIC ENGINEER\n> STATUS: OPEN\n> REQ: React, Visionary Cybernetic Design, WebGL.\n\n> POSITION_2: DATA CORE ARCHITECT\n> STATUS: OPEN\n> REQ: Laravel, High-volume DB Optimization, Sentinel Protocols.\n\n[ END OF TRANSMISSION ]",
    contact: "INITIATING QUERY: CONTACT\n\n> ENCRYPTING CONNECTION...\n> SECURE CHANNEL ESTABLISHED.\n\n> COMMS FREQUENCY: 89.2 MHz\n> EMAIL_RELAY: comms@zaiblitz.net\n> BASE_LOCATION: Sector 7, Neo-Manila\n\n> AWAITING INCOMING TRANSMISSION..."
};

export default function MarkVII() {
    const { initAudio, playBeep } = useZaiblitzAudio();
    const [termState, setTermState] = useState({ open: false, key: 'about' });

    useEffect(() => {
        // Init audio on mount/click
        const handleInit = () => {
            initAudio();
            playBeep(900, 'sine', 0.1, 0.1, 0);
            window.removeEventListener('click', handleInit);
        };
        window.addEventListener('click', handleInit);
        
        const hum = setInterval(() => {
            playBeep(1200, 'sine', 0.5, 0.05, 0);
            playBeep(1000, 'sine', 0.3, 0.03, 500);
        }, 8000);

        return () => {
            clearInterval(hum);
            window.removeEventListener('click', handleInit);
        };
    }, []);

    const handleHover = () => playBeep(1500, 'sine', 0.05, 0.05, 0);

    const openTerminal = (section) => {
        initAudio();
        playBeep(800, 'square', 0.1, 0.1, 0);
        setTermState({ open: true, key: section });
    };

    return (
        <div className="mark-vii-theme">
            <div className="grid"></div>
            <div className="scanline"></div>
            
            <div className="nav-menu">
                <button className="nav-btn" onMouseEnter={handleHover} onClick={() => openTerminal('about')}>ABOUT US</button>
                <button className="nav-btn" onMouseEnter={handleHover} onClick={() => openTerminal('career')}>CAREERS</button>
                <button className="nav-btn" onMouseEnter={handleHover} onClick={() => openTerminal('contact')}>CONTACT</button>
            </div>

            <TerminalManager 
                isOpen={termState.open}
                onClose={() => {
                    playBeep(400, 'sawtooth', 0.1, 0.1, 0);
                    setTermState(prev => ({ ...prev, open: false }));
                }}
                title={`OS // QUERY: ${termState.key.toUpperCase()}`}
                content={terminalData[termState.key]}
                soundPitch={1200}
            />

            <div className="container">
                <div className="panel panel-left" onMouseEnter={handleHover}>
                    <div className="data-header">SYSTEM OVERRIDE // SKILLS</div>
                    
                    <div className="stat-line"><span>FRONTEND</span><span>94%</span></div>
                    <div className="progress-bar"><div className="progress-fill" style={{width: '94%'}}></div></div>
                    
                    <div className="stat-line"><span>BACKEND (LARAVEL)</span><span>88%</span></div>
                    <div className="progress-bar"><div className="progress-fill" style={{width: '88%'}}></div></div>
                    
                    <div className="stat-line"><span>AI INTEGRATION</span><span>90%</span></div>
                    <div className="progress-bar"><div className="progress-fill" style={{width: '90%'}}></div></div>
                    
                    <div className="stat-line"><span>DB ARCHITECTURE</span><span>85%</span></div>
                    <div className="progress-bar"><div className="progress-fill" style={{width: '85%'}}></div></div>
                </div>

                <div className="arc-reactor" onMouseEnter={handleHover}>
                    <div className="arc-inner"></div>
                    <div className="arc-inner-2"></div>
                    <div className="core">
                        <h1>ZAIBLITZ</h1>
                        <p>SOFTWARE ENGINEER</p>
                        <p style={{color: 'var(--hud-alert)', fontSize: '10px', marginTop: '5px'}}>STATUS: ONLINE</p>
                    </div>
                </div>

                <div className="panel panel-right" onMouseEnter={handleHover}>
                    <div className="data-header">TARGET LOG // PROJECTS</div>
                    
                    <div style={{marginBottom: '20px'}}>
                        <div style={{color: '#fff', fontWeight: 'bold'}}>PROJECT ATLAS</div>
                        <div style={{fontSize: '12px', marginTop: '5px'}}>Core mapping system</div>
                        <div style={{color: 'var(--hud-alert)', fontSize: '10px', marginTop: '5px'}}>[ DEPLOYED ]</div>
                    </div>
                    
                    <div style={{marginBottom: '20px'}}>
                        <div style={{color: '#fff', fontWeight: 'bold'}}>PROJECT BEACON</div>
                        <div style={{fontSize: '12px', marginTop: '5px'}}>Real-time comms relay</div>
                        <div style={{color: 'var(--hud-alert)', fontSize: '10px', marginTop: '5px'}}>[ ACTIVE ]</div>
                    </div>
                    
                    <div>
                        <div style={{color: '#fff', fontWeight: 'bold'}}>PROJECT FORGE</div>
                        <div style={{fontSize: '12px', marginTop: '5px'}}>Resource generation engine</div>
                        <div style={{color: 'var(--hud-alert)', fontSize: '10px', marginTop: '5px'}}>[ INITIATED ]</div>
                    </div>
                </div>

                <div className="panel panel-bottom" onMouseEnter={handleHover}>
                    <div>
                        <div className="data-header">SYS_DIAGNOSTICS</div>
                        <div>CPU: OPTIMAL</div>
                        <div>MEM: 64TB AVAILABLE</div>
                    </div>
                    <div style={{textAlign: 'right'}}>
                        <div className="data-header">LOCATION</div>
                        <div>LAT: 14.5995° N</div>
                        <div>LONG: 120.9842° E</div>
                    </div>
                </div>
            </div>
        </div>
    );
}