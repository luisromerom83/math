import React, { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

const GeographyQuizStage = ({ onComplete, country, capital, options, instruction }) => {
    const [selected, setSelected] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    const handleSelect = (option) => {
        if (selected) return; // Prevent multiple clicks

        setSelected(option);
        const correct = option === capital;
        setIsCorrect(correct);

        if (correct) {
            setTimeout(onComplete, 1500);
        } else {
            setTimeout(() => {
                setSelected(null);
                setIsCorrect(null);
            }, 1000);
        }
    };

    return (
        <div style={{ textAlign: 'center', width: '100%', padding: '1rem' }}>
            <h2 style={{ marginBottom: '2rem', color: 'var(--color-secondary)', fontSize: '2rem' }}>
                {instruction}
            </h2>

            <div style={{
                background: 'rgba(255,255,255,0.05)',
                padding: '2rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(255,255,255,0.1)',
                marginBottom: '2rem',
                display: 'inline-block',
                minWidth: '300px'
            }}>
                <span style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                    {country}
                </span>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem',
                width: '100%',
                maxWidth: '600px',
                margin: '0 auto'
            }}>
                {options.map((option) => {
                    const isButtonSelected = selected === option;
                    const statusColor = isButtonSelected
                        ? (isCorrect ? 'var(--color-success)' : 'var(--color-error)')
                        : 'var(--color-surface)';

                    return (
                        <button
                            key={option}
                            onClick={() => handleSelect(option)}
                            disabled={selected !== null}
                            style={{
                                padding: '1.5rem',
                                background: isButtonSelected ? statusColor : 'var(--color-bg-deep)',
                                border: `2px solid ${isButtonSelected ? 'white' : 'var(--color-secondary)'}`,
                                borderRadius: 'var(--radius-md)',
                                color: 'white',
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                cursor: selected ? 'default' : 'pointer',
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                transform: isButtonSelected ? 'scale(1.05)' : 'none',
                                boxShadow: isButtonSelected ? '0 0 20px ' + statusColor : 'none'
                            }}
                        >
                            {option}
                            {isButtonSelected && (
                                isCorrect ? <CheckCircle2 size={24} /> : <XCircle size={24} />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default GeographyQuizStage;
