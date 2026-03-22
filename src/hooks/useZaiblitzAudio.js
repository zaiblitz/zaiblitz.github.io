import { useEffect, useCallback } from 'react';
import { useProtocol } from '../contexts/ProtocolContext';

// Shared AudioContext across all hook instances
let sharedAudioCtx = null;

export function useZaiblitzAudio() {
    const { config } = useProtocol();

    const initAudio = useCallback(() => {
        if (config.isMuted) return;
        if (!sharedAudioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            sharedAudioCtx = new AudioContext();
        }
        if (sharedAudioCtx.state === 'suspended') {
            sharedAudioCtx.resume();
        }
    }, [config.isMuted]);

    const playBeep = useCallback((freq, type, duration, vol, delay = 0) => {
        if (config.isMuted || !sharedAudioCtx) return;
        
        const ctx = sharedAudioCtx;
        setTimeout(() => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            // Sweep frequency down slightly
            osc.frequency.exponentialRampToValueAtTime(freq * 0.8, ctx.currentTime + duration);
            
            gain.gain.setValueAtTime(vol, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + duration);
        }, delay);
    }, [config.isMuted]);

    const speak = useCallback((text, pitch = 1.0, rate = 0.95) => {
        if (config.isMuted || !window.speechSynthesis) return;
        window.speechSynthesis.cancel(); // Clear queue
        const utter = new SpeechSynthesisUtterance(text);
        const voices = window.speechSynthesis.getVoices();
        const zaiblitzVoice = voices.find(v => v.name.includes('Daniel') || v.name.includes('UK English Male')) || voices.find(v => v.lang.includes('en-GB')) || voices[0];
        if (zaiblitzVoice) utter.voice = zaiblitzVoice;
        utter.pitch = pitch;
        utter.rate = rate;
        window.speechSynthesis.speak(utter);
    }, [config.isMuted]);

    // Pre-load voices
    useEffect(() => {
        if (window.speechSynthesis) {
            window.speechSynthesis.onvoiceschanged = () => {};
        }
    }, []);

    return { initAudio, playBeep, speak };
}