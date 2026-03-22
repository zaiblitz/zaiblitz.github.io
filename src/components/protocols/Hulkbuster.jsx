import { useState, useEffect } from 'react';
import { useProtocol } from '../../contexts/ProtocolContext';
import { useZaiblitzAudio } from '../../hooks/useZaiblitzAudio';
import { systemSettings } from '../../data/settings';
import '../../styles/protocols/Hulkbuster.css';

export default function Hulkbuster() {
    const { rebootToSelector } = useProtocol();
    const { initAudio, playBeep } = useZaiblitzAudio();
    const [timecode, setTimecode] = useState("00:00:00:00");

    useEffect(() => {
        const handleInit = () => {
            initAudio();
            playBeep(200, 'sawtooth', 0.2, 0.1, 0);
            window.removeEventListener('click', handleInit);
        };
        window.addEventListener('click', handleInit);

        const clockInterval = setInterval(() => {
            const d = new Date();
            setTimecode(
                String(d.getHours()).padStart(2, '0') + ':' + 
                String(d.getMinutes()).padStart(2, '0') + ':' + 
                String(d.getSeconds()).padStart(2, '0') + ':' + 
                String(Math.floor(d.getMilliseconds() / 10)).padStart(2, '0')
            );
        }, 50);

        const engineHum = setInterval(() => {
            playBeep(60, 'sawtooth', 1.0, 0.05, 0);
            playBeep(55, 'square', 0.8, 0.03, 100);
        }, 5000);

        return () => {
            clearInterval(clockInterval);
            clearInterval(engineHum);
            window.removeEventListener('click', handleInit);
        };
    }, []);

    const handleHover = () => {
        playBeep(300, 'square', 0.1, 0.05, 0); // Harder tech sound
    };

    return (
        <div className="hulkbuster-theme">
            <div className="hud-wrapper">
                <div className="top-bar">
                    {systemSettings.selectorEnabled && (
                        <button className="back-btn" onClick={() => { playBeep(150, 'sawtooth', 0.2, 0.15, 0); rebootToSelector(); }} onMouseEnter={handleHover} title="Back to Protocol Selector">
                            <span className="back-icon">◁</span>
                        </button>
                    )}
                    <div className="title">ZAIBLITZ_OS v4.2</div>
                    <div className="timecode">{timecode}</div>
                </div>

                <div className="panel" onMouseEnter={handleHover}>
                    <div className="section-title">CORE PROTOCOLS</div>
                    
                    <div className="skill-item">
                        <div className="skill-name">REACT / VITE ENGAGED</div>
                        <div className="skill-track"><div className="skill-fill" style={{width: '95%'}}></div></div>
                    </div>
                    <div className="skill-item">
                        <div className="skill-name">LARAVEL BACKEND</div>
                        <div className="skill-track"><div className="skill-fill" style={{width: '88%'}}></div></div>
                    </div>
                    <div className="skill-item">
                        <div className="skill-name">DATABASE MGMT</div>
                        <div className="skill-track"><div className="skill-fill" style={{width: '85%'}}></div></div>
                    </div>
                    <div className="skill-item">
                        <div className="skill-name">UI / UX ARCHITECTURE</div>
                        <div className="skill-track"><div className="skill-fill" style={{width: '92%'}}></div></div>
                    </div>
                </div>

                <div className="center-display" onMouseEnter={handleHover}>
                    <div className="hexa-grid"></div>
                    <div className="ring ring-1"></div>
                    <div className="ring ring-2"></div>
                    <div className="main-avatar">
                        <h2>ZAIBLITZ</h2>
                        <p>FULL STACK DEV</p>
                        <div style={{marginTop: '20px', fontSize: '10px', color: 'var(--primary)'}}>SYSTEM: NOMINAL</div>
                    </div>
                </div>

                <div className="panel" onMouseEnter={handleHover}>
                    <div className="section-title">MISSION LOGS</div>
                    
                    <div className="project-card" onMouseEnter={handleHover}>
                        <div className="proj-title">PROJECT_ATLAS</div>
                        <div className="proj-desc">Mapping algorithms deployed. Efficiency at 99.8%.</div>
                    </div>
                    <div className="project-card" onMouseEnter={handleHover}>
                        <div className="proj-title">PROJECT_BEACON</div>
                        <div className="proj-desc">Signal relay established. Awaiting incoming connections.</div>
                    </div>
                    <div className="project-card" onMouseEnter={handleHover}>
                        <div className="proj-title">PROJECT_FORGE</div>
                        <div className="proj-desc">Resource compiler activated. Building assets.</div>
                    </div>
                </div>

                <div className="bottom-bar">
                    <div className="status-feed">
                        <span style={{color: 'var(--primary)'}}>&gt; INITIALIZING...</span>
                        <span>&gt; LOADING FRAMEWORKS... OK</span>
                        <span>&gt; ESTABLISHING DATABASE SYNC... OK</span>
                        <span>&gt; AWAITING COMMAND</span>
                    </div>
                    
                    <div style={{textAlign: 'right', fontSize: '12px'}}>
                        <div style={{color: 'var(--secondary)'}}>POWER: 100%</div>
                        <div style={{color: 'var(--text-dim)', marginTop: '5px'}}>SHIELDS: MAXIMUM</div>
                    </div>
                </div>
            </div>
        </div>
    );
}