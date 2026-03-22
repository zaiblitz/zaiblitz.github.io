import { createContext, useContext, useState, useEffect } from 'react';
import { systemSettings, getActiveProtocols } from '../data/settings';

const ProtocolContext = createContext();

export function ProtocolProvider({ children }) {
    const [config, setConfig] = useState(() => {
        const saved = localStorage.getItem('zaiblitz_os_config');
        const base = saved ? JSON.parse(saved) : { isMuted: false };
        // File-based settings always take priority
        return {
            ...base,
            skipSelector: !systemSettings.selectorEnabled,
            defaultProtocol: base.defaultProtocol || systemSettings.defaultProtocol,
        };
    });

    const [activeProtocol, setActiveProtocol] = useState(() => {
        const active = getActiveProtocols();
        const skip = !systemSettings.selectorEnabled;
        if (skip) {
            const defProto = config.defaultProtocol || systemSettings.defaultProtocol;
            const isActive = active.some(p => p.id === defProto);
            return isActive ? defProto : (active[0]?.id || null);
        }
        return null;
    });

    const [returnToSelector, setReturnToSelector] = useState(false);

    useEffect(() => {
        localStorage.setItem('zaiblitz_os_config', JSON.stringify(config));
    }, [config]);

    const updateConfig = (newSettings) => {
        setConfig(prev => ({ ...prev, ...newSettings }));
    };

    const activateProtocol = (protocolId) => {
        const active = getActiveProtocols();
        const isActive = active.some(p => p.id === protocolId);
        if (!isActive) return; // reject inactive protocols
        setActiveProtocol(protocolId);
        if (config.skipSelector) {
            updateConfig({ defaultProtocol: protocolId });
        }
    };

    const rebootToSelector = () => {
        setReturnToSelector(true);
        setActiveProtocol(null);
    };

    return (
        <ProtocolContext.Provider value={{
            config,
            updateConfig,
            activeProtocol,
            activateProtocol,
            rebootToSelector,
            returnToSelector,
            setReturnToSelector
        }}>
            {children}
        </ProtocolContext.Provider>
    );
}

export const useProtocol = () => useContext(ProtocolContext);
