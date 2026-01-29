import React from 'react';

const ProgressBar = ({ current, total, label }) => {
    const percentage = Math.min(100, (current / total) * 100);

    return (
        <div style={{ width: '100%', maxWidth: '600px', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                <span>{label}</span>
                <span>{current} / {total}</span>
            </div>
            <div style={{
                width: '100%',
                height: '10px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '5px',
                overflow: 'hidden'
            }}>
                <div style={{
                    width: `${percentage}%`,
                    height: '100%',
                    background: 'var(--color-secondary)',
                    borderRadius: '5px',
                    transition: 'width 0.5s ease-out'
                }}></div>
            </div>
        </div>
    );
};

export default ProgressBar;
