import React, { useState, useEffect } from 'react';
import { DndContext, useSensor, useSensors, MouseSensor, TouchSensor } from '@dnd-kit/core';
import { Draggable } from '../components/Draggable';
import { Droppable } from '../components/Droppable';
import { Check, ArrowRight, Plus, Equal } from 'lucide-react';

const AdvancedOperationStage = ({ onComplete, operand1, operand2, result, instruction }) => {
    // Parse input "1/2" -> { n: 1, d: 2 }
    const parseFrac = (str) => {
        const parts = str.split('/');
        return { n: parseInt(parts[0]), d: parseInt(parts[1]) };
    };

    const op1 = parseFrac(operand1);
    const op2 = parseFrac(operand2);
    // Result is passed for final validation, but we calculate intermediate target too
    const targetRef = parseFrac(result);

    // Phase: 'convert' | 'add'
    const [phase, setPhase] = useState('convert');

    // --- Phase 1 State (Conversion) ---
    const [cuts, setCuts] = useState(1);
    const [conversionSuccess, setConversionSuccess] = useState(false);

    // --- Phase 2 State (Addition) ---
    // Once converted, we have new numerators. 
    // New N1 = Op1.n * (cuts / Op1.d)
    // New N2 = Op2.n * (cuts / Op2.d)
    const [convertedOp1, setConvertedOp1] = useState(null);
    const [convertedOp2, setConvertedOp2] = useState(null);

    const [op1Remaining, setOp1Remaining] = useState([]);
    const [op2Remaining, setOp2Remaining] = useState([]);
    const [resultItems, setResultItems] = useState([]);

    const [finalSuccess, setFinalSuccess] = useState(false);
    const [error, setError] = useState(false);

    // DnD Sensors
    const sensors = useSensors(
        useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
        useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
    );

    useEffect(() => {
        // Reset on new level
        setPhase('convert');
        setCuts(1);
        setConversionSuccess(false);
        setFinalSuccess(false);
        setResultItems([]);
        setError(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [operand1, operand2]);

    // --- Phase 1 Logic ---
    const isCommon = (cuts % op1.d === 0) && (cuts % op2.d === 0);

    const handleConvert = () => {
        if (isCommon) {
            setConversionSuccess(true);

            // Calculate new chunks
            // e.g. 1/2 -> 3/6. We need 3 draggable items.
            const n1 = op1.n * (cuts / op1.d);
            const n2 = op2.n * (cuts / op2.d);

            setConvertedOp1({ n: n1, d: cuts });
            setConvertedOp2({ n: n2, d: cuts });

            setOp1Remaining(Array.from({ length: n1 }, (_, i) => `op1-${i}`));
            setOp2Remaining(Array.from({ length: n2 }, (_, i) => `op2-${i}`));

            setTimeout(() => {
                setPhase('add');
            }, 1000);
        } else {
            setError(true);
            setTimeout(() => setError(false), 2000);
        }
    };

    // --- Phase 2 Logic ---
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return;

        if (over.id === 'result-zone') {
            const id = active.id;
            if (id.startsWith('op1-')) {
                setOp1Remaining(prev => prev.filter(item => item !== id));
                setResultItems(prev => [...prev, id]);
            } else if (id.startsWith('op2-')) {
                setOp2Remaining(prev => prev.filter(item => item !== id));
                setResultItems(prev => [...prev, id]);
            }
        }
    };

    const handleFinalCheck = () => {
        // Target Numerator is based on the COMMON DENOMINATOR (cuts)
        // If 1/2 + 1/3 = 5/6. User moved 5 items.
        // targetRef.n might be simplified or not. 
        // We should check if resultItems.length matches (ConvertedN1 + ConvertedN2)
        const targetTotal = convertedOp1.n + convertedOp2.n;

        if (resultItems.length === targetTotal) {
            setFinalSuccess(true);
            setTimeout(onComplete, 1500);
        } else {
            setError(true);
            setTimeout(() => setError(false), 2000);
        }
    };


    // Helper Renderers
    const renderPizzaOverlay = (fraction, currentCuts, label, isInteractive) => {
        const { n, d } = fraction;
        const color = isInteractive ? 'var(--color-primary)' : '#555'; // Dim if not active yet

        // SVG Math (Corrected)
        const radius = 24;
        const circumference = 2 * Math.PI * radius;
        const dashArray = `${(n / d) * circumference} ${circumference}`;

        const lines = [];
        for (let i = 0; i < currentCuts; i++) {
            const angle = (i * 360) / currentCuts;
            lines.push(
                <line key={i} x1="50" y1="50"
                    x2={50 + 50 * Math.cos(angle * Math.PI / 180)}
                    y2={50 + 50 * Math.sin(angle * Math.PI / 180)}
                    stroke="rgba(255,255,255,1)" strokeWidth="2"
                    style={{ filter: 'drop-shadow(0px 0px 2px rgba(0,0,0,0.5))' }}
                />
            );
        }

        return (
            <div style={{ position: 'relative', width: '120px', height: '120px' }}>
                <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)', overflow: 'visible' }}>
                    <circle cx="50" cy="50" r="48" fill="rgba(255,255,255,0.1)" stroke="white" strokeWidth="2" />
                    <circle cx="50" cy="50" r="24" fill="transparent" stroke={color} strokeWidth="48" strokeDasharray={dashArray} />
                    {lines}
                </svg>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontWeight: 'bold', fontSize: '1.2rem', textShadow: '0 2px 2px black' }}>
                    {label}
                </div>
            </div>
        );
    };

    // Render Draggable Slices for Phase 2
    const renderDraggableSlice = (id, denominator, color) => (
        <Draggable id={id} key={id}>
            <div style={{
                width: '50px', height: '50px', borderRadius: '50%',
                background: `conic-gradient(${color} 0% ${360 / denominator}deg, transparent ${360 / denominator}deg)`,
                border: '1px solid rgba(255,255,255,0.8)',
                cursor: 'grab',
                transform: 'rotate(-90deg)'
            }} />
        </Draggable>
    );

    return (
        <div className="glass-panel" style={{
            width: '100%', maxWidth: '900px', padding: '2rem',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem'
        }}>
            {/* Header */}
            <div style={{ textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.8rem', color: 'var(--color-text-highlight)' }}>{instruction}</h2>
                <p style={{ color: '#ccc' }}>
                    {phase === 'convert'
                        ? 'Paso 1: Encuentra un denominador común.'
                        : 'Paso 2: Suma las fracciones convertidas.'}
                </p>
            </div>

            {/* PHASE 1: CONVERSION SLIDER */}
            {phase === 'convert' && (
                <>
                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                        {renderPizzaOverlay(op1, cuts, operand1, true)}
                        <Plus size={32} />
                        {renderPizzaOverlay(op2, cuts, operand2, true)}
                    </div>

                    <div style={{
                        background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '1rem',
                        display: 'flex', gap: '1rem', alignItems: 'center', flexDirection: 'column', width: '100%', maxWidth: '400px'
                    }}>
                        <div>Cortar en: <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-accent)' }}>{cuts}</span></div>
                        <input type="range" min={1} max={24} step="1" value={cuts} onChange={(e) => setCuts(parseInt(e.target.value))} style={{ width: '100%' }} />
                    </div>

                    <button onClick={handleConvert} className={isCommon ? "animate-pop" : ""} style={{
                        background: isCommon ? 'var(--color-success)' : '#555',
                        color: 'white', padding: '1rem 3rem', borderRadius: '50px', border: 'none',
                        fontSize: '1.2rem', cursor: isCommon ? 'pointer' : 'not-allowed', opacity: isCommon ? 1 : 0.7
                    }}>
                        ¡Convertir! 🔄
                    </button>
                    {error && <div className="animate-shake" style={{ color: 'var(--color-error)' }}>¡Esos cortes no encajan!</div>}
                </>
            )}

            {/* PHASE 2: ADDITION DRAG & DROP */}
            {phase === 'add' && convertedOp1 && (
                <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {/* Converted Op 1 */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ width: '100px', height: '100px', border: '2px dashed rgba(255,255,255,0.3)', borderRadius: '1rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                                {op1Remaining.map(id => renderDraggableSlice(id, cuts, 'var(--color-primary)'))}
                            </div>
                            <span>{convertedOp1.n}/{convertedOp1.d}</span>
                        </div>

                        <Plus />

                        {/* Converted Op 2 */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ width: '100px', height: '100px', border: '2px dashed rgba(255,255,255,0.3)', borderRadius: '1rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                                {op2Remaining.map(id => renderDraggableSlice(id, cuts, 'var(--color-secondary)'))}
                            </div>
                            <span>{convertedOp2.n}/{convertedOp2.d}</span>
                        </div>

                        <Equal />

                        {/* Result */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Droppable id="result-zone">
                                <div style={{
                                    width: '120px', height: '120px',
                                    border: finalSuccess ? '3px solid var(--color-success)' : '3px solid white',
                                    borderRadius: '1rem',
                                    background: 'rgba(255,255,255,0.1)',
                                    display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '2px'
                                }}>
                                    {resultItems.map(id => (
                                        <div key={id} style={{
                                            width: '40px', height: '40px', borderRadius: '50%',
                                            background: `conic-gradient(${id.startsWith('op1') ? 'var(--color-primary)' : 'var(--color-secondary)'} 0% ${360 / cuts}deg, transparent ${360 / cuts}deg)`,
                                            border: '1px solid white', transform: 'rotate(-90deg)'
                                        }} />
                                    ))}
                                </div>
                            </Droppable>
                            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-success)' }}>
                                {resultItems.length}/{cuts}
                            </span>
                        </div>
                    </div>

                    <button onClick={handleFinalCheck} style={{
                        marginTop: '1rem', background: 'var(--color-success)', color: 'white',
                        padding: '1rem 3rem', borderRadius: '50px', border: 'none', fontSize: '1.5rem', cursor: 'pointer'
                    }}>
                        ¡Comprobar Suma! ✅
                    </button>
                    {error && <div className="animate-shake" style={{ color: 'var(--color-error)' }}>¡Faltan piezas para completar la suma!</div>}
                    {finalSuccess && <div className="animate-pop" style={{ color: 'var(--color-success)', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check /> ¡Misión Cumplida!</div>}
                </DndContext>
            )}
        </div>
    );
};

export default AdvancedOperationStage;
