import React, { useState, useEffect } from 'react';
import { HelpCircle, CheckCircle2, XCircle, ChevronRight } from 'lucide-react';

const GeographyInputStage = ({ onComplete, country, capital, instruction }) => {
    const [input, setInput] = useState('');
    const [status, setStatus] = useState('idle'); // idle, success, error
    const [attempts, setAttempts] = useState(0);

    // Normalize comparison: remove accents, spaces and lowercase
    const normalize = (str) =>
        str?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim() || "";

    const handleSubmit = (e) => {
        if (e) e.preventDefault();
        if (status !== 'idle') return;

        if (normalize(input) === normalize(capital)) {
            setStatus('success');
            setTimeout(() => onComplete(), 1500);
        } else {
            setStatus('error');
            setAttempts(prev => prev + 1);
            setTimeout(() => setStatus('idle'), 2000);
        }
    };

    const handleSkip = () => {
        setStatus('skipped');
    };

    // Create a hint/placeholder for the input: B _ _ o _ a
    const getHint = () => {
        return capital.split('').map((char, i) => {
            if (char === ' ') return '  ';
            if (i === 0 || i === capital.length - 1 || i % 3 === 0) return char;
            return '_';
        }).join(' ');
    };

    return (
        <div style={{ textAlign: 'center', width: '100%', maxWidth: '500px' }}>
            <h2 style={{ color: 'var(--color-secondary)', marginBottom: '1rem' }}>{instruction}</h2>

            <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>{country}</div>
                <div style={{
                    fontSize: '1.2rem',
                    letterSpacing: '4px',
                    color: 'var(--color-text-dim)',
                    marginBottom: '2rem',
                    fontFamily: 'monospace'
                }}>
                    {getHint()}
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={status !== 'idle' && status !== 'error'}
                        placeholder="Escribe la capital..."
                        autoFocus
                        className="glass-panel"
                        style={{
                            width: '100%',
                            padding: '1rem',
                            fontSize: '1.2rem',
                            textAlign: 'center',
                            border: status === 'success' ? '2px solid var(--color-success)' :
                                status === 'error' ? '2px solid var(--color-primary)' : '1px solid rgba(255,255,255,0.2)',
                            background: 'rgba(255,255,255,0.05)',
                            color: 'white',
                            outline: 'none'
                        }}
                    />

                    {status === 'idle' && (
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                type="submit"
                                style={{
                                    flex: 2,
                                    padding: '1rem',
                                    background: 'var(--color-secondary)',
                                    color: 'var(--color-bg-deep)',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    fontWeight: 'bold',
                                    cursor: 'pointer'
                                }}
                            >
                                Comprobar
                            </button>
                            <button
                                type="button"
                                onClick={handleSkip}
                                style={{
                                    flex: 1,
                                    padding: '1rem',
                                    background: 'rgba(255,255,255,0.1)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    cursor: 'pointer'
                                }}
                            >
                                <HelpCircle size={20} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                                Saltar
                            </button>
                        </div>
                    )}
                </form>

                <div style={{ marginTop: '1.5rem', minHeight: '3rem' }}>
                    {status === 'success' && (
                        <div className="animate-pop" style={{ color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                            <CheckCircle2 /> ¡Excelente!
                        </div>
                    )}
                    {status === 'error' && (
                        <div className="animate-pop" style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                            <XCircle /> Inténtalo de nuevo
                        </div>
                    )}
                    {status === 'skipped' && (
                        <div className="animate-pop" style={{ textAlign: 'center' }}>
                            <p style={{ color: 'var(--color-warning)', marginBottom: '1rem' }}>
                                La respuesta era: <strong style={{ fontSize: '1.2rem', color: 'white' }}>{capital}</strong>
                            </p>
                            <button
                                onClick={onComplete}
                                style={{
                                    padding: '0.8rem 2rem',
                                    background: 'var(--color-info)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '2rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    margin: '0 auto'
                                }}
                            >
                                Siguiente <ChevronRight size={18} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GeographyInputStage;
