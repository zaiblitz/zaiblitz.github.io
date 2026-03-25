import { useState, useEffect, useRef } from 'react';
import { useProtocol } from '../../contexts/ProtocolContext';
import { useZaiblitzAudio } from '../../hooks/useZaiblitzAudio';
import { systemSettings } from '../../data/settings';
import TerminalManager from '../shared/TerminalManager';
import '../../styles/protocols/Jarvis.css';

const terminalData = {
    about: "INITIATING QUERY: ABOUT US\n\n> Z.A.I.B.L.I.T.Z. PROTOCOL is a highly advanced AI-driven architecture and full-stack ecosystem.\n> DEVELOPER: Zaiblitz\n> DIRECTIVE: To build seamless, scalable, and visually stunning web systems.\n> CURRENT ASSETS: React, Vue, Laravel, Cloud Infrastructures.\n\n[ END OF TRANSMISSION ]",
    career: "INITIATING QUERY: CAREERS\n\n> SCANNING DATABASE FOR OPEN POSITIONS...\n\n> POSITION_1: UI/UX HOLOGRAPHIC ENGINEER\n> STATUS: OPEN\n> REQ: React, Visionary Cybernetic Design, WebGL.\n\n> POSITION_2: DATA CORE ARCHITECT\n> STATUS: OPEN\n> REQ: Laravel, High-volume DB Optimization, Sentinel Protocols.\n\n[ END OF TRANSMISSION ]",
    contact: "INITIATING QUERY: CONTACT\n\n> ENCRYPTING CONNECTION...\n> SECURE CHANNEL ESTABLISHED.\n\n> COMMS FREQUENCY: 89.2 MHz\n> EMAIL_RELAY: comms@zaiblitz.net\n> BASE_LOCATION: Sector 7, Neo-Manila\n\n> AWAITING INCOMING TRANSMISSION..."
};

const LOG_MESSAGES = [
    "SYSTEM.LOG:: INITIATING...",
    "0x55E9 NETWORK MODULE ALIGN",
    "OK -> SECTOR H-04 SECURED",
    "DATASTREAM: STABLE...",
    "[WARN] ANOMALY DETECTED IN R-4",
    "RE-ROUTING POWER ALIGN...",
    "THERMAL OUTPUT NORMAL",
    "COMMUNICATIONS: ENCRYPTED",
    "ACCESS PROTOCOL ACTIVE...",
    "SYSTEM MAINTAINING OPTIMAL",
    "0x89AA RE-CALIBRATING...",
    "SECURITY PROTOCOL LAYER 7"
];

function Particles() {
    const [particles] = useState(() =>
        Array.from({ length: 150 }, (_, i) => {
            const size = Math.random() * 3;
            return {
                id: i,
                size,
                opacity: Math.random(),
                left: Math.random() * 100,
                top: Math.random() * 100,
                duration: 2 + Math.random() * 3,
            };
        })
    );

    return (
        <div className="jarvis-particles">
            {particles.map(p => (
                <div
                    key={p.id}
                    className="jarvis-particle"
                    style={{
                        width: p.size + 'px',
                        height: p.size + 'px',
                        background: `rgba(0, 243, 255, ${p.opacity})`,
                        left: p.left + '%',
                        top: p.top + '%',
                        animation: `jarvis-fade ${p.duration}s infinite alternate`,
                    }}
                />
            ))}
        </div>
    );
}

function Waveform() {
    const [bars] = useState(() =>
        Array.from({ length: 30 }, (_, i) => ({
            id: i,
            delay: Math.random(),
            duration: 0.8 + Math.random() * 0.8,
        }))
    );

    return (
        <div className="jarvis-waveform">
            {bars.map(b => (
                <div
                    key={b.id}
                    className="jarvis-wave-bar"
                    style={{
                        animationDelay: `${b.delay}s`,
                        animationDuration: `${b.duration}s`,
                    }}
                />
            ))}
        </div>
    );
}

function SyslogTerminal() {
    const [logs, setLogs] = useState([]);
    const idRef = useRef(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().toISOString().substring(11, 21);
            const msg = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)];
            idRef.current += 1;
            setLogs(prev => {
                const next = [...prev, { id: idRef.current, text: `[${now}] ${msg}` }];
                return next.length > 12 ? next.slice(-12) : next;
            });
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="jarvis-syslog-terminal">
            <div className="jarvis-hud-text jarvis-hud-title" style={{ marginLeft: 0, fontSize: '16px', marginBottom: '5px' }}>
                SYSTEM LOGSTREAM
            </div>
            <div className="jarvis-syslog-content">
                {logs.map(l => (
                    <div key={l.id} className="jarvis-log-line">{l.text}</div>
                ))}
            </div>
        </div>
    );
}

export default function Jarvis() {
    const { rebootToSelector } = useProtocol();
    const { initAudio, playBeep } = useZaiblitzAudio();
    const [termState, setTermState] = useState({ open: false, key: 'about' });

    useEffect(() => {
        const handleInit = () => {
            initAudio();
            playBeep(900, 'sine', 0.1, 0.1, 0);
            window.removeEventListener('click', handleInit);
        };
        window.addEventListener('click', handleInit);
        return () => window.removeEventListener('click', handleInit);
    }, []);

    const handleHover = () => playBeep(1500, 'sine', 0.05, 0.05, 0);

    const openTerminal = (section) => {
        initAudio();
        playBeep(800, 'square', 0.1, 0.1, 0);
        setTermState({ open: true, key: section });
    };

    return (
        <div className="jarvis-theme">
            <div className="jarvis-hud-container">
                <Particles />

                <div className="jarvis-hud-text jarvis-main-hub-title">MAIN HUB</div>

                {/* Nav Menu */}
                <div className="jarvis-nav-menu">
                    <button className="jarvis-nav-btn" onMouseEnter={handleHover} onClick={() => openTerminal('about')}>ABOUT US</button>
                    <button className="jarvis-nav-btn" onMouseEnter={handleHover} onClick={() => openTerminal('career')}>CAREERS</button>
                    <button className="jarvis-nav-btn" onMouseEnter={handleHover} onClick={() => openTerminal('contact')}>CONTACT</button>
                </div>

                {systemSettings.selectorEnabled && (
                    <button
                        className="jarvis-back-btn"
                        onClick={() => { playBeep(400, 'sine', 0.2, 0.2, 0); rebootToSelector(); }}
                        onMouseEnter={handleHover}
                        title="Back to Protocol Selector"
                    >
                        ◁
                    </button>
                )}

                {/* CENTER HUB */}
                <div className="jarvis-circle-module jarvis-center-hub">
                    <svg className="jarvis-svg-ring" viewBox="0 0 600 600">
                        <circle cx="300" cy="300" r="290" fill="none" stroke="rgba(0,243,255,0.1)" strokeWidth="2" />
                        <circle className="jarvis-rotating-cw" cx="300" cy="300" r="275" fill="none" stroke="var(--cyan)" strokeWidth="4" strokeDasharray="20 10" />
                        <circle cx="300" cy="300" r="240" fill="rgba(0,150,255,0.05)" stroke="var(--cyan)" strokeWidth="2" />
                        <circle cx="300" cy="300" r="230" fill="none" stroke="rgba(0,243,255,0.4)" strokeWidth="12" />
                        <circle className="jarvis-rotating-ccw" cx="300" cy="300" r="190" fill="none" stroke="var(--cyan)" strokeWidth="15" strokeDasharray="4 20" opacity="0.8" />
                        <circle cx="300" cy="300" r="160" fill="rgba(0,0,0,0.4)" stroke="var(--cyan)" strokeWidth="4" filter="drop-shadow(0 0 10px var(--cyan))" />
                    </svg>

                    <div className="jarvis-center-text">
                        <div className="jarvis-hud-text jarvis-status-text">OS Status: <span style={{ color: 'var(--white)' }}>ACTIVE</span></div>
                        <div className="jarvis-hud-text jarvis-status-text">SYSTEM HEALTH: 98%</div>
                        <div className="jarvis-logotype">Z.A.I.B.L.I.T.Z</div>
                        <Waveform />
                    </div>

                    <div className="jarvis-data-bubble">DATA</div>
                </div>

                {/* Connection Lines */}
                <div className="jarvis-connection-line jarvis-conn-h" style={{ top: '250px', left: '400px', width: '250px', transform: 'rotate(-25deg)', transformOrigin: 'left' }} />
                <div className="jarvis-connection-line jarvis-conn-h" style={{ top: '540px', left: '360px', width: '300px', transform: 'rotate(0deg)', transformOrigin: 'left' }} />
                <div className="jarvis-connection-line jarvis-conn-h" style={{ top: '830px', left: '400px', width: '250px', transform: 'rotate(25deg)', transformOrigin: 'left' }} />

                {/* LEFT MODULES */}

                {/* DIAGNOSTICS */}
                <div className="jarvis-circle-module jarvis-side-module jarvis-mod-diagnostics">
                    <svg className="jarvis-svg-ring" viewBox="0 0 260 260">
                        <circle className="jarvis-rotating-cw" cx="130" cy="130" r="120" fill="none" stroke="var(--cyan)" strokeWidth="2" strokeDasharray="10 5" />
                        <circle cx="130" cy="130" r="110" fill="rgba(0,20,40,0.6)" stroke="rgba(0,243,255,0.5)" strokeWidth="4" />
                        <path d="M 240 130 A 110 110 0 0 1 130 240" fill="none" stroke="var(--cyan)" strokeWidth="6" filter="drop-shadow(0 0 5px var(--cyan))" />
                    </svg>
                    <div className="jarvis-inner-content" style={{ alignItems: 'flex-start', paddingLeft: '20px' }}>
                        <div className="jarvis-hud-text jarvis-hud-title" style={{ marginLeft: '-50px' }}>DIAGNOSTICS</div>
                        <div className="jarvis-bar-chart">
                            {[80, 50, 90, 30, 70].map((h, i) => (
                                <div key={i} className="jarvis-bar">
                                    <div className="jarvis-bar-fill" style={{ height: h + '%' }} />
                                </div>
                            ))}
                        </div>
                        <div style={{ marginTop: '15px', fontSize: '14px', lineHeight: '1.5' }}>
                            RAM: 128TB<br />
                            TEMP: 32°C
                        </div>
                    </div>
                </div>

                {/* POWER GRID */}
                <div className="jarvis-circle-module jarvis-side-module jarvis-mod-power">
                    <svg className="jarvis-svg-ring" viewBox="0 0 260 260">
                        <circle cx="130" cy="130" r="120" fill="rgba(0,20,40,0.6)" stroke="var(--cyan)" strokeWidth="2" />
                        <circle className="jarvis-rotating-ccw" cx="130" cy="130" r="100" fill="none" stroke="var(--cyan)" strokeWidth="10" strokeDasharray="50 10 10 10" />
                    </svg>
                    <div className="jarvis-inner-content">
                        <div className="jarvis-hud-text jarvis-hud-title" style={{ marginLeft: '-120px', fontSize: '16px' }}>POWER GRID</div>
                        <div style={{ fontSize: '32px', fontWeight: 'bold', textShadow: '0 0 10px var(--cyan)' }}>84%</div>
                        <div style={{ fontSize: '12px', marginTop: '5px' }}>STATUS: OPTIMAL</div>
                    </div>
                </div>

                {/* ENVIRONMENT */}
                <div className="jarvis-circle-module jarvis-side-module jarvis-mod-environment">
                    <svg className="jarvis-svg-ring" viewBox="0 0 260 260">
                        <circle cx="130" cy="130" r="120" fill="rgba(0,20,40,0.6)" stroke="var(--cyan)" strokeWidth="2" />
                        <circle cx="130" cy="130" r="110" fill="none" stroke="rgba(0,243,255,0.3)" strokeWidth="1" />
                        <path className="jarvis-rotating-cw" d="M 130 130 L 130 20 A 110 110 0 0 1 240 130 Z" fill="rgba(0,243,255,0.1)" />
                    </svg>
                    <div className="jarvis-target-crosshair" />
                    <div className="jarvis-inner-content" style={{ background: 'rgba(0,0,0,0.5)', borderRadius: '50%' }}>
                        <div className="jarvis-hud-text jarvis-hud-title" style={{ marginLeft: '-100px', fontSize: '14px', position: 'absolute', top: '-30px' }}>ENVIRONMENT</div>
                        <div style={{ fontSize: '28px' }}>☁ 22°C</div>
                        <div style={{ fontSize: '14px', marginTop: '10px' }}>1013hPa</div>
                    </div>
                </div>

                {/* RIGHT MODULES */}

                {/* TARGETING */}
                <div className="jarvis-circle-module jarvis-side-module jarvis-mod-targeting">
                    <svg className="jarvis-svg-ring" viewBox="0 0 260 260">
                        <circle cx="130" cy="130" r="120" fill="rgba(0,20,40,0.6)" stroke="var(--cyan)" strokeWidth="3" strokeDasharray="20 5" />
                        <circle className="jarvis-rotating-cw" cx="130" cy="130" r="90" fill="none" stroke="var(--orange)" strokeWidth="2" strokeDasharray="90 180" opacity="0.8" />
                    </svg>
                    <div className="jarvis-target-crosshair" />
                    <div className="jarvis-inner-content">
                        <div className="jarvis-hud-text jarvis-hud-title" style={{ position: 'absolute', top: '-40px', right: '-50px' }}>TARGETING</div>
                        <div style={{
                            textAlign: 'left',
                            background: 'rgba(0,10,20,0.8)',
                            padding: '10px',
                            border: '1px solid var(--cyan)',
                            position: 'absolute',
                            right: '-80px',
                            width: '180px'
                        }}>
                            <div style={{ fontSize: '12px' }}>Locked Object:</div>
                            <div style={{ fontSize: '16px', color: 'var(--orange)', marginBottom: '10px', fontWeight: 'bold' }}>TARGET ALPHA</div>
                            <div style={{ fontSize: '12px', display: 'flex', justifyContent: 'space-between' }}><span>ETA:</span><span>1:45</span></div>
                            <div style={{ fontSize: '12px', display: 'flex', justifyContent: 'space-between' }}><span>range:</span><span>1.45°</span></div>
                            <div style={{ fontSize: '12px', display: 'flex', justifyContent: 'space-between' }}><span>bearing:</span><span>0.60°</span></div>
                        </div>
                    </div>
                </div>

                {/* COMMUNICATIONS */}
                <div className="jarvis-circle-module jarvis-side-module jarvis-mod-comms">
                    <svg className="jarvis-svg-ring" viewBox="0 0 260 260">
                        <circle cx="130" cy="130" r="120" fill="rgba(0,20,40,0.6)" stroke="rgba(0,243,255,0.4)" strokeWidth="2" />
                        <circle className="jarvis-rotating-cw" cx="130" cy="130" r="110" fill="none" stroke="var(--cyan)" strokeWidth="4" strokeDasharray="1 10" />
                        <circle className="jarvis-rotating-ccw" cx="130" cy="130" r="70" fill="none" stroke="var(--cyan)" strokeWidth="20" strokeDasharray="40 10 10 10" />
                    </svg>
                    <div className="jarvis-inner-content" style={{ alignItems: 'flex-end' }}>
                        <div className="jarvis-hud-text jarvis-hud-title" style={{ position: 'absolute', top: '-20px', right: '-120px' }}>COMMUNICATIONS</div>
                        <div style={{ textAlign: 'right', width: '100%', paddingRight: '20px', fontSize: '12px', background: 'rgba(0,0,0,0.5)' }}>
                            <div style={{ marginBottom: '5px' }}>SIGNAL STRENGTH</div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                                <span>STARK</span>
                                <span style={{ background: 'var(--cyan)', width: '60px', height: '8px' }} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                                <span>POTTS</span>
                                <span style={{ background: 'var(--cyan)', width: '40px', height: '8px' }} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                                <span>RHODES</span>
                                <span style={{ background: 'var(--cyan)', width: '80px', height: '8px' }} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* SYSTEM LOG */}
                <div className="jarvis-circle-module jarvis-side-module jarvis-mod-syslog">
                    <svg className="jarvis-svg-ring" viewBox="0 0 260 260">
                        <circle className="jarvis-rotating-ccw" cx="130" cy="130" r="120" fill="rgba(0,20,40,0.6)" stroke="var(--cyan)" strokeWidth="2" strokeDasharray="100 20" />
                        <circle cx="130" cy="130" r="90" fill="none" stroke="rgba(0,243,255,0.3)" strokeWidth="1" />
                        <path d="M 40 130 A 90 90 0 0 1 130 40" fill="none" stroke="var(--cyan)" strokeWidth="6" />
                    </svg>
                    <div className="jarvis-inner-content">
                        <div className="jarvis-syslog-icon-text jarvis-hud-text">LOGS</div>
                        <div style={{ fontSize: '12px', marginTop: '5px', color: 'var(--white)', fontWeight: 'bold' }}>STREAMING</div>
                    </div>
                    <SyslogTerminal />
                </div>

                {/* BOTTOM NAV */}
                <div className="jarvis-bottom-nav">
                    <div className="jarvis-nav-item" onMouseEnter={handleHover}>
                        <div className="jarvis-nav-icon">
                            <svg viewBox="0 0 24 24">
                                <path d="M5,19H7V11H5V19M11,19H13V5H11V19M17,19H19V15H17V19M2,21H22V23H2V21Z" />
                            </svg>
                        </div>
                        <div className="jarvis-hud-text" style={{ fontSize: '12px' }}>DATA ANALYSIS</div>
                    </div>
                    <div className="jarvis-nav-item" onMouseEnter={handleHover}>
                        <div className="jarvis-nav-icon">
                            <svg viewBox="0 0 24 24">
                                <path d="M12,21L15.6,16.2C14.6,15.4 13.3,15 12,15C10.7,15 9.4,15.4 8.4,16.2L12,21M12,3C7.95,3 4.21,4.34 1.2,6.6L3,9C5.5,7.12 8.62,6 12,6C15.38,6 18.5,7.12 21,9L22.8,6.6C19.79,4.34 16.05,3 12,3M12,9C9.3,9 6.81,9.89 4.8,11.4L6.6,13.8C8.1,12.67 9.97,12 12,12C14.03,12 15.9,12.67 17.4,13.8L19.2,11.4C17.19,9.89 14.7,9 12,9Z" />
                            </svg>
                        </div>
                        <div className="jarvis-hud-text" style={{ fontSize: '12px' }}>NETWORK</div>
                    </div>
                    <div className="jarvis-nav-item" onMouseEnter={handleHover}>
                        <div className="jarvis-nav-icon">
                            <svg viewBox="0 0 24 24">
                                <path d="M15,19L9,16.89V5L15,7.11M20.5,3C20.44,3 20.39,3 20.34,3L15,5.1L9,3L3.36,4.9C3.15,4.97 3,5.15 3,5.38V20.5A0.5,0.5 0 0,0 3.5,21C3.55,21 3.61,21 3.66,20.97L9,18.9L15,21L20.64,19.1C20.85,19 21,18.85 21,18.62V3.5A0.5,0.5 0 0,0 20.5,3Z" />
                            </svg>
                        </div>
                        <div className="jarvis-hud-text" style={{ fontSize: '12px' }}>MAPS</div>
                    </div>
                    <div className="jarvis-nav-item" onMouseEnter={handleHover}>
                        <div className="jarvis-nav-icon">
                            <svg viewBox="0 0 24 24">
                                <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
                            </svg>
                        </div>
                        <div className="jarvis-hud-text" style={{ fontSize: '12px' }}>SETTINGS</div>
                    </div>
                </div>
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
        </div>
    );
}
