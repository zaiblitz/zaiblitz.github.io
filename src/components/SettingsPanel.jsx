import { useState } from 'react';
import { useProtocol } from '../contexts/ProtocolContext';
import { getActiveProtocols } from '../data/settings';
import './SettingsPanel.css';

export default function SettingsPanel() {
    const { config, updateConfig, activateProtocol, rebootToSelector } = useProtocol();
    const [isOpen, setIsOpen] = useState(false);

    const activeProtocols = getActiveProtocols();

    if (!isOpen) {
        return (
            <button className="settings-trigger" onClick={() => setIsOpen(true)}>
                [ SYS_CONFIG ]
            </button>
        );
    }

    return (
        <div className="settings-overlay">
            <div className="settings-panel">
                <div className="settings-header">
                    <span>SYSTEM CONFIGURATION</span>
                    <button className="close-btn" onClick={() => setIsOpen(false)}>[ X ]</button>
                </div>
                
                <div className="settings-section">
                    <h4>ACTIVE PROTOCOL</h4>
                    <div className="protocol-list">
                        {activeProtocols.map(p => (
                            <button 
                                key={p.id}
                                className={`proto-btn ${config.defaultProtocol === p.id ? 'active' : ''}`}
                                onClick={() => {
                                    activateProtocol(p.id);
                                    setIsOpen(false);
                                }}
                            >
                                {p.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="settings-section">
                    <h4>BOOT SEQUENCE</h4>
                    <label className="toggle-label">
                        <input 
                            type="checkbox" 
                            checked={config.skipSelector}
                            onChange={(e) => updateConfig({ skipSelector: e.target.checked })}
                        />
                        Skip Protocol Selector on Startup
                    </label>
                </div>

                <div className="settings-section">
                    <h4>DEFAULT PROTOCOL</h4>
                    <div className="protocol-list">
                        {activeProtocols.map(p => (
                            <button 
                                key={p.id}
                                className={`proto-btn ${config.defaultProtocol === p.id ? 'active' : ''}`}
                                onClick={() => updateConfig({ defaultProtocol: p.id })}
                            >
                                {p.name}
                            </button>
                        ))}
                    </div>
                    <div className="settings-hint">Protocol loaded when selector is skipped</div>
                </div>

                <div className="settings-section">
                    <h4>AUDIO</h4>
                    <label className="toggle-label">
                        <input 
                            type="checkbox" 
                            checked={config.isMuted}
                            onChange={(e) => updateConfig({ isMuted: e.target.checked })}
                        />
                        Mute System Audio
                    </label>
                </div>

                <div className="settings-footer">
                    <button className="reboot-btn" onClick={() => {
                        setIsOpen(false);
                        rebootToSelector();
                    }}>
                        REBOOT TO SELECTOR
                    </button>
                </div>
            </div>
        </div>
    );
}