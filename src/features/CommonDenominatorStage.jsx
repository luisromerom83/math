import React, { useState, useEffect } from 'react';
import { Draggable } from '../components/Draggable';
import { Droppable } from '../components/Droppable';
import { Check, Scissors } from 'lucide-react';

const CommonDenominatorStage = ({ onComplete, fraction1, fraction2, instruction }) => {
    // Parse input "1/2" -> { n: 1, d: 2 }
    const parseFrac = (str) => {
        const parts = str.split('/');
        return { n: parseInt(parts[0]), d: parseInt(parts[1]) };
    };

    const f1 = parseFrac(fraction1);
    const f2 = parseFrac(fraction2);

    // Initial multiplier logic
    // We want the user to find a COMMON Denominator. 
    // The slider usually controls the "Total Cuts".
    // Range: max(d1, d2) to d1*d2 (or slightly higher like 20 or 24).
    const maxRange = 24;
    const [cuts, setCuts] = useState(1);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    // Check if current cuts is a common denominator AND if it works visually
    // Visually: The new grid lines (e.g. 6ths) must align with the old grid lines (e.g. halves).
    // This is true if cuts % d == 0.
    const isCommon = (cuts % f1.d === 0) && (cuts % f2.d === 0);

    const handleCheck = () => {
        if (isCommon) {
            setSuccess(true);
            setTimeout(onComplete, 1500);
        } else {
            setError(true);
            setTimeout(() => setError(false), 2000);
        }
    };

    // Render a pizza with base cuts and overlay cuts
    // baseFraction: the original fraction (e.g., 1/2) - used for coloring the "value"
    // currentCuts: the user's slider value - used for the grid lines
    // currentCuts: the user's slider value - used for the grid lines
    const renderPizza = (fraction, currentCuts, label) => {
        const { n, d } = fraction;
        const color = 'var(--color-primary)';

        // Calculate SVG paths
        // Base Circle has r=24. Circumference = 2 * PI * 24 ≈ 150.796
        const radius = 24;
        const circumference = 2 * Math.PI * radius;
        const dashArray = `${(n / d) * circumference} ${circumference}`;

        // 2. Grid Lines: Drawn based on `currentCuts`
        // We create lines at 360/currentCuts degrees
        const lines = [];
        for (let i = 0; i < currentCuts; i++) {
            const angle = (i * 360) / currentCuts;
            lines.push(
                <line
                    key={i}
                    x1="50" y1="50"
                    x2={50 + 50 * Math.cos(angle * Math.PI / 180)}
                    y2={50 + 50 * Math.sin(angle * Math.PI / 180)}
                    stroke="rgba(255,255,255,1)"
                    strokeWidth="2"
                    style={{ filter: 'drop-shadow(0px 0px 2px rgba(0,0,0,0.5))' }}
                />
            );
        }

        // Validity Indicator for THIS fraction
        // Does the current cut count respect this fraction's boundaries?
        const isValidForThis = currentCuts % d === 0;
        const indicatorColor = isValidForThis ? 'var(--color-success)' : 'var(--color-error)';

        return (
            <div style={{ position: 'relative', width: '150px', height: '150px', margin: '0 1rem' }}>
                <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)', overflow: 'visible' }}>
                    {/* Background Circle */}
                    <circle cx="50" cy="50" r="48" fill="rgba(255,255,255,0.1)" stroke="white" strokeWidth="2" />

                    {/* Value Slice (The colored part) - Using stroke method */}
                    <circle cx="50" cy="50" r="24" fill="transparent" stroke={color} strokeWidth="48"
                        strokeDasharray={dashArray}
                    />

                    {/* Grid Overlay */}
                    {lines}
                </svg>

                {/* Status Indicator */}
                <div style={{
                    position: 'absolute', bottom: '-2rem', left: '50%', transform: 'translateX(-50%)',
                    color: indicatorColor, fontWeight: 'bold'
                }}>
                    {isValidForThis ? <Check size={20} /> : <span style={{ fontSize: '1.2rem' }}>⚠️</span>}
                </div>

                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '1.5rem', fontWeight: 'bold', textShadow: '0 2px 4px black' }}>
                    {label}
                </div>
            </div>
        );
    };

    return (
        <div className="glass-panel" style={{
            width: '100%', maxWidth: '800px', padding: '2rem',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem'
        }}>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--color-text-highlight)', textAlign: 'center' }}>
                {instruction}
            </h2>

            <p style={{ fontSize: '1rem', color: '#ccc', textAlign: 'center' }}>
                Encuentra un número de cortes que funcione para ambas fracciones.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', alignItems: 'center' }}>
                {renderPizza(f1, cuts, fraction1)}
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>vs</div>
                {renderPizza(f2, cuts, fraction2)}
            </div>

            {/* Controls */}
            <div style={{
                background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '1rem', margin: '1rem 0',
                display: 'flex', gap: '1rem', alignItems: 'center', flexDirection: 'column', width: '100%', maxWidth: '400px'
            }}>
                <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                    Cortar en: <span style={{ color: 'var(--color-accent)', fontSize: '1.5rem', fontWeight: 'bold' }}>{cuts}</span> partes
                </div>

                <input
                    type="range"
                    min={1}
                    max={maxRange}
                    step="1"
                    value={cuts}
                    onChange={(e) => setCuts(parseInt(e.target.value))}
                    style={{ width: '100%', cursor: 'pointer' }}
                />

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => setCuts(c => Math.max(c - 1, Math.max(f1.d, f2.d)))}
                        style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', background: '#444', color: 'white', border: 'none', cursor: 'pointer' }}>
                        -
                    </button>
                    <button onClick={() => setCuts(c => Math.min(c + 1, maxRange))}
                        style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', background: '#444', color: 'white', border: 'none', cursor: 'pointer' }}>
                        +
                    </button>
                </div>
            </div>

            <button onClick={handleCheck} className={isCommon ? "animate-pop" : ""} style={{
                marginTop: '1rem',
                background: isCommon ? 'var(--color-success)' : '#555',
                color: 'white',
                border: 'none',
                padding: '1rem 3rem',
                fontSize: '1.5rem',
                borderRadius: '50px',
                cursor: isCommon ? 'pointer' : 'not-allowed',
                opacity: isCommon ? 1 : 0.7,
                transition: 'all 0.3s',
                boxShadow: isCommon ? '0 4px 15px rgba(76, 201, 240, 0.4)' : 'none'
            }}>
                ¡Cortar! ✂️
            </button>

            {success && <div className="animate-pop" style={{ color: 'var(--color-success)', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check /> ¡Exacto! Es un Denominador Común.</div>}
            {error && <div className="animate-shake" style={{ color: 'var(--color-error)', fontSize: '1.2rem' }}>¡Esos cortes no encajan con ambos! Intenta otro número.</div>}

        </div>
    );
};

export default CommonDenominatorStage;
