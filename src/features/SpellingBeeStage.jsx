import React, { useState, useEffect } from 'react';
import { Volume2, Loader } from 'lucide-react';

const SpellingBeeStage = ({ onComplete, onSkip, word, instruction }) => {
    const [input, setInput] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);
    const [isLoadingAudio, setIsLoadingAudio] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);
    const [timeLeft, setTimeLeft] = useState(30);

    // Fetch audio from ElevenLabs when the word changes
    useEffect(() => {
        // Reset state on level change
        setInput('');
        setIsCorrect(false);
        setAudioUrl(null);
        setTimeLeft(30);
        
        
        let active = true;

        const fetchAudio = async () => {
            const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;
            
            if (!apiKey || apiKey === 'your_elevenlabs_api_key_here') {
                console.warn('ElevenLabs API Key is missing. Using native fallback.');
                if (active) setAudioUrl(null);
                
                // Fallback to native speech
                if ('speechSynthesis' in window) {
                    setTimeout(() => {
                        const utterance = new SpeechSynthesisUtterance(word);
                        utterance.lang = 'en-US';
                        window.speechSynthesis.speak(utterance);
                    }, 300);
                }
                return;
            }

            setIsLoadingAudio(true);
            try {
                // Using Laura's voice ID (a free-tier compatible, enthusiastic English voice)
                const voiceId = 'FGY2WhTYpPnrIDTdsKH5'; 
                
                const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`, {
                    method: 'POST',
                    headers: {
                        'xi-api-key': apiKey,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        text: word,
                        model_id: 'eleven_multilingual_v2',
                        voice_settings: {
                            stability: 0.5,
                            similarity_boost: 0.75
                        }
                    })
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch audio from ElevenLabs');
                }

                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                
                if (active) {
                    setAudioUrl(url);
                    // Auto-play once loaded
                    const audio = new Audio(url);
                    audio.play().catch(e => console.log('Auto-play prevented by browser', e));
                }
            } catch (error) {
                console.error(error);
                // Fallback to native speech if ElevenLabs fails
                if (active && 'speechSynthesis' in window) {
                    const utterance = new SpeechSynthesisUtterance(word);
                    utterance.lang = 'en-US';
                    window.speechSynthesis.speak(utterance);
                }
            } finally {
                if (active) setIsLoadingAudio(false);
            }
        };

        fetchAudio();

        return () => {
            active = false;
        };
    }, [word]);

    // Clean up object URL when component unmounts or audioUrl changes to avoid memory leaks
    useEffect(() => {
        return () => {
            if (audioUrl) {
                URL.revokeObjectURL(audioUrl);
            }
        };
    }, [audioUrl]);

    // Timer logic
    useEffect(() => {
        if (isCorrect || timeLeft === 0) return;

        const timerId = setInterval(() => {
            setTimeLeft(prev => Math.max(0, prev - 1));
        }, 1000);

        return () => clearInterval(timerId);
    }, [isCorrect, timeLeft]);

    // Handle time up (stop auto-advancing, wait for user input)
    useEffect(() => {
        // Do nothing, just wait for user to click retry or skip
    }, [timeLeft, isCorrect, word]);

    const handleRetry = () => {
        setTimeLeft(30);
        setInput('');
        setTimeout(() => {
            playAudio();
        }, 100);
    };

    const playAudio = () => {
        if (audioUrl) {
            const audio = new Audio(audioUrl);
            audio.play();
        } else if ('speechSynthesis' in window) {
            // Fallback
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(word);
            utterance.lang = 'en-US';
            window.speechSynthesis.speak(utterance);
        }
    };

    const handleInputChange = (e) => {
        const val = e.target.value;
        setInput(val);

        if (val.trim().toLowerCase() === word.toLowerCase()) {
            setIsCorrect(true);
            setTimeout(() => {
                onComplete();
            }, 1500); // 1.5s delay to show success state
        }
    };

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center', color: 'var(--color-secondary)' }}>
                {instruction}
            </h2>

            <div style={{
                fontSize: '1.8rem',
                fontWeight: 'bold',
                color: timeLeft <= 10 ? 'var(--color-warning)' : 'var(--color-text-dim)',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                background: 'rgba(255,255,255,0.5)',
                borderRadius: '8px',
                animation: timeLeft <= 5 ? 'pulse 1s infinite' : 'none'
            }}>
                ⏱️ 00:{timeLeft.toString().padStart(2, '0')}
            </div>

            <button
                onClick={playAudio}
                disabled={isLoadingAudio}
                style={{
                    background: 'var(--color-primary)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '100px',
                    height: '100px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    cursor: isLoadingAudio ? 'not-allowed' : 'pointer',
                    marginBottom: '2rem',
                    boxShadow: '0 8px 32px rgba(255, 51, 102, 0.4)',
                    transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    opacity: isLoadingAudio ? 0.7 : 1
                }}
            >
                {isLoadingAudio ? (
                    <div style={{ animation: 'spin 1s linear infinite' }}>
                        <Loader size={48} />
                    </div>
                ) : (
                    <Volume2 size={48} />
                )}
            </button>

            <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    disabled={isCorrect || timeLeft === 0}
                    autoFocus
                    placeholder="Escribe la palabra aquí..."
                    autoCapitalize="none"
                    autoComplete="off"
                    spellCheck="false"
                    style={{
                        width: '100%',
                        padding: '1rem',
                        fontSize: '2rem',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        border: isCorrect ? '3px solid var(--color-success)' : '3px solid var(--color-secondary)',
                        borderRadius: '12px',
                        backgroundColor: isCorrect ? 'var(--color-success)' : 'rgba(255,255,255,0.9)',
                        color: isCorrect ? 'white' : 'var(--color-bg-deep)',
                        outline: 'none',
                        boxShadow: isCorrect ? '0 0 20px var(--color-success)' : '0 4px 15px rgba(0,0,0,0.1)',
                        transition: 'all 0.3s ease'
                    }}
                />
            </div>
            
            {isCorrect && (
                <div style={{ marginTop: '1.5rem', fontSize: '1.5rem', color: 'var(--color-success)', fontWeight: 'bold' }} className="animate-pop">
                    ¡Excelente! 🎉
                </div>
            )}

            {timeLeft === 0 && !isCorrect && (
                <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }} className="animate-pop">
                    <div style={{ fontSize: '1.5rem', color: 'var(--color-warning)', fontWeight: 'bold' }}>
                        ¡Tiempo agotado! ⏳
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                            onClick={handleRetry}
                            style={{
                                padding: '0.8rem 1.5rem',
                                fontSize: '1.2rem',
                                background: 'var(--color-primary)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                boxShadow: '0 4px 15px rgba(255, 51, 102, 0.3)'
                            }}
                        >
                            Volver a intentarlo
                        </button>
                        <button
                            onClick={onSkip}
                            style={{
                                padding: '0.8rem 1.5rem',
                                fontSize: '1.2rem',
                                background: 'rgba(255,255,255,0.2)',
                                color: 'var(--color-text)',
                                border: '2px solid rgba(255,255,255,0.3)',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            Saltar palabra
                        </button>
                    </div>
                </div>
            )}

            {timeLeft > 0 && !isCorrect && (
                <button
                    onClick={onSkip}
                    style={{
                        marginTop: '2rem',
                        padding: '0.5rem 1rem',
                        fontSize: '1rem',
                        background: 'transparent',
                        color: 'var(--color-text-dim)',
                        border: '1px solid var(--color-text-dim)',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        opacity: 0.8
                    }}
                >
                    Saltar esta palabra
                </button>
            )}
            
            <style>
                {`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes pulse {
                    0% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.1); opacity: 0.8; color: red; }
                    100% { transform: scale(1); opacity: 1; }
                }
                `}
            </style>
        </div>
    );
};

export default SpellingBeeStage;
