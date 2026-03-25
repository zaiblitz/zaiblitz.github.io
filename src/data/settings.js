/**
 * Z.A.I.B.L.I.T.Z. Protocol Settings
 * 
 * Master configuration for available protocols.
 * Toggle `active` to show/hide protocols in the selector and settings panel.
 * Set `selectorEnabled` to false to skip the selector and load `defaultProtocol` directly.
 */

export const protocols = [
    {
        id: 'legacy',
        name: 'STANDARD VIEW',
        description: 'Initialize localized portfolio databanks. Original web presentation matrix.',
        cardClass: 'legacy-protocol',
        hoverType: 'legacy',
        voiceLine: 'Loading standard portfolio matrix.',
        voicePitch: 0.9,
        voiceRate: 0.9,
        voiceKeywords: ['standard', 'standard view', 'legacy', 'portfolio', 'default'],
        active: true,
    },
    {
        id: 'mark_vii',
        name: 'MARK VII HUD',
        description: 'Engage classic Z.A.I.B.L.I.T.Z. interface. Holographic command terminals and spherical focus.',
        cardClass: 'alpha-protocol',
        hoverType: 'mark',
        voiceLine: 'Engaging Mark Seven Holographic Display.',
        voicePitch: 0.9,
        voiceRate: 0.9,
        voiceKeywords: ['mark', 'mark 7', 'mark seven', 'mark vii', 'holographic'],
        active: true,
    },
    {
        id: 'hulkbuster',
        name: 'HULKBUSTER OS',
        description: 'Deploy high-contrast tactical overlay. Orange diagnostics and rigid tracking grids.',
        cardClass: 'bleeding-edge',
        hoverType: 'hulkbuster',
        voiceLine: 'Deploying Hulkbuster Operating System.',
        voicePitch: 0.7,
        voiceRate: 0.9,
        voiceKeywords: ['hulkbuster', 'hulk', 'buster', 'tactical', 'orange'],
        active: true,
    },
    {
        id: 'stealth',
        name: 'NIGHT PROTOCOL',
        description: 'Engage stealth-based asymmetric HUD. Off-center radar sweeping and dark aesthetics.',
        cardClass: 'stealth-protocol',
        hoverType: 'stealth',
        voiceLine: 'Stealth protocol engaged. Running silent.',
        voicePitch: 0.8,
        voiceRate: 0.85,
        voiceKeywords: ['stealth', 'night', 'night protocol', 'silent', 'dark'],
        active: false,
    },
    {
        id: 'jarvis',
        name: 'JARVIS HUD',
        description: 'Engage full-spectrum holographic command center. Circular modules and real-time system telemetry.',
        cardClass: 'jarvis-protocol',
        hoverType: 'mark',
        voiceLine: 'Initializing Jarvis Heads Up Display.',
        voicePitch: 0.9,
        voiceRate: 0.9,
        voiceKeywords: ['jarvis', 'jarvis hud', 'hub', 'holographic', 'command center'],
        active: true,
    },
    {
        id: 'diagnostic',
        name: 'DIAGNOSTIC MODE',
        description: 'Engage Wireframe Schematic View. Targeting brackets and rigid monospace terminals.',
        cardClass: 'diag-protocol',
        hoverType: 'diag',
        voiceLine: 'Diagnostic mode activated. Scanning systems.',
        voicePitch: 1.1,
        voiceRate: 1.1,
        voiceKeywords: ['diagnostic', 'diagnostics', 'wireframe', 'schematic', 'scan'],
        active: true,
    },
];

export const systemSettings = {
    /** Show the protocol selector on startup */
    selectorEnabled: true,

    /** Protocol to load when selector is disabled */
    defaultProtocol: 'legacy',
};

/** Helper: get only active protocols */
export const getActiveProtocols = () => protocols.filter(p => p.active);

/** Helper: find protocol by id */
export const getProtocol = (id) => protocols.find(p => p.id === id);
