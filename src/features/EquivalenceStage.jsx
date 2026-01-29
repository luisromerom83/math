import React, { useState, useEffect } from 'react';
import { DndContext, useSensor, useSensors, MouseSensor, TouchSensor } from '@dnd-kit/core';
import { Draggable } from '../components/Draggable';
import { Droppable } from '../components/Droppable';
import { Equal, Check } from 'lucide-react';

const EquivalenceStage = ({ onComplete, targetFraction, userFraction, instruction, type, shape = 'circle' }) => {
    const [items, setItems] = useState([]);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    // Parse fractions
    const [tNum, tDen] = targetFraction.split('/').map(Number);
    const [uNum, uDen] = userFraction.split('/').map(Number);

    const targetPercentage = (tNum / tDen) * 100;
    const userSlicePercentage = (1 / uDen) * 100;

    // Reset when level changes
    useEffect(() => {
        setItems([]);
        setSuccess(false);
        setError(false);
    }, [targetFraction, userFraction, shape]);

    const sensors = useSensors(
        useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
        useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return;

        if (over.id === 'work-zone') {
            if (type === 'concrete') {
                const newItems = [...items, active.id];
                setItems(newItems);
                setError(false);
            }
        }
    };

    const handleValidate = () => {
        if (items.length === uNum) {
            setSuccess(true);
            setTimeout(onComplete, 2000);
        } else {
            setError(true);
            setTimeout(() => setError(false), 2000);
        }
    };

    const handleReset = () => {
        setItems([]);
        setError(false);
        setSuccess(false);
    };

    const isBar = shape === 'bar';

    // --- RENDER HELPERS ---

    // SVG Pie Chart for Target
    const renderPieTarget = () => {
        const radius = 70;
        const center = 75;
        // Fix: Use the radius of the circle element (radius / 2) for circumference, not the outer radius
        const strokeRadius = radius / 2;
        const circumference = 2 * Math.PI * strokeRadius;
        const strokeDasharray = `${(targetPercentage / 100) * circumference} ${circumference}`;

        return (
            <div style={{ width: 150, height: 150, flexShrink: 0, position: 'relative' }}>
                <svg width="150" height="150" viewBox="0 0 150 150">
                    {/* Background Circle */}
                    <circle cx="75" cy="75" r={radius} fill="#333" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />

                    {/* Filled Slice (using stroke-dasharray trick for simplicity or path) */}
                    {/* We rotate -90deg to start from top */}
                    <circle
                        cx="75" cy="75" r={radius / 2}
                        fill="transparent"
                        stroke="var(--color-secondary)"
                        strokeWidth={radius}
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset="0"
                        transform="rotate(-90 75 75)"
                    />
                    {/* Border overlay for clean look */}
                    <circle cx="75" cy="75" r={radius} fill="transparent" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
                </svg>
            </div>
        );
    };

    const renderBarTarget = () => (
        <div style={{
            width: '200px',
            height: '60px',
            background: `linear-gradient(to right, var(--color-secondary) 0% ${targetPercentage}%, #333 ${targetPercentage}% 100%)`,
            borderRadius: '10px',
            border: '4px solid rgba(255,255,255,0.2)',
            flexShrink: 0
        }}></div>
    );

    const workZoneStyle = isBar ? {
        width: '200px',
        height: '60px',
        background: success ? 'rgba(0, 255, 128, 0.2)' : 'rgba(0,0,0,0.3)',
        border: '4px dashed var(--color-text-dim)',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '10px',
        display: 'flex', // Stack horizontally for bar
        alignItems: 'center'
    } : {
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        background: success ? 'rgba(0, 255, 128, 0.2)' : 'rgba(0,0,0,0.3)',
        border: '4px dashed var(--color-text-dim)',
        position: 'relative',
        overflow: 'hidden'
    };

    const pieceStyle = isBar ? {
        height: '100%',
        width: `${100 / uDen}%`, // Width based on denominator
        background: 'var(--color-primary)',
        borderRight: '2px solid rgba(0,0,0,0.2)'
    } : null;

    return (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2 style={{ color: 'var(--color-secondary)', marginBottom: '1rem', textAlign: 'center' }}>{instruction}</h2>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '2rem',
                    width: '100%',
                    maxWidth: '800px',
                    flexWrap: 'wrap'
                }}>
                    {/* LEFT SIDE: TARGET (LOCKED) */}
                    <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <h3 style={{ marginBottom: '1rem' }}>Meta</h3>

                        {isBar ? renderBarTarget() : renderPieTarget()}

                        <p style={{ fontSize: '1.5rem', marginTop: '1rem', fontWeight: 'bold' }}>{targetFraction}</p>
                    </div>

                    <div style={{ fontSize: '3rem', color: 'white' }}><Equal /></div>

                    {/* RIGHT SIDE: WORK ZONE */}
                    <div className="glass-panel" style={{
                        padding: '2rem',
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                        border: error ? '2px solid red' : success ? '2px solid var(--color-success)' : 'none',
                        transition: 'border 0.3s'
                    }}>
                        <h3 style={{ marginBottom: '1rem' }}>Tu Respuesta</h3>

                        <Droppable id="work-zone" style={workZoneStyle}>
                            {/* Render dropped slices */}
                            {items.map((item, index) => (
                                isBar ? (
                                    <div key={index} style={pieceStyle}></div>
                                ) : (
                                    <div key={index} style={{
                                        position: 'absolute',
                                        width: '100%', height: '100%',
                                        borderRadius: '50%',
                                        background: `conic-gradient(var(--color-primary) 0% ${userSlicePercentage}%, transparent ${userSlicePercentage}% 100%)`,
                                        transform: `rotate(${index * (360 / uDen)}deg)`
                                    }}></div>
                                )
                            ))}

                            {items.length === 0 && (
                                isBar ? (
                                    <div style={{ width: '100%', textAlign: 'center', opacity: 0.5 }}>?</div>
                                ) : (
                                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.5 }}>?</div>
                                )
                            )}
                        </Droppable>

                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1rem' }}>
                            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                                {items.length}/{uDen}
                            </p>
                            {items.length > 0 && !success && (
                                <button onClick={handleReset} style={{ fontSize: '0.8rem', opacity: 0.7, textDecoration: 'underline', color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}>Borrar</button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>

                    {/* TOOLBOX */}
                    {!success && (
                        <Draggable id={`slice-source-${items.length}`} style={{ cursor: 'grab' }}>
                            <div className="hover-scale" style={{
                                padding: '1rem',
                                background: 'var(--color-bg-light)',
                                borderRadius: '1rem',
                                display: 'flex', flexDirection: 'column', alignItems: 'center',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                            }}>
                                {isBar ? (
                                    <div style={{
                                        width: '50px', height: '30px',
                                        background: 'var(--color-primary)',
                                        marginBottom: '0.5rem',
                                        borderRadius: '4px'
                                    }}></div>
                                ) : (
                                    <div style={{
                                        width: 60, height: 60,
                                        borderRadius: '50%',
                                        background: `conic-gradient(var(--color-primary) 0% ${userSlicePercentage}%, transparent ${userSlicePercentage}% 100%)`,
                                        marginBottom: '0.5rem'
                                    }}></div>
                                )}
                                <span style={{ fontWeight: 'bold' }}>1/{uDen}</span>
                            </div>
                        </Draggable>
                    )}

                    {/* Validate Button */}
                    {!success && items.length > 0 && (
                        <button
                            onClick={handleValidate}
                            className="animate-pop"
                            style={{
                                background: 'var(--color-success)',
                                color: 'var(--color-bg-deep)',
                                padding: '1rem 3rem',
                                fontSize: '1.5rem',
                                borderRadius: '50px',
                                fontWeight: 'bold',
                                display: 'flex', alignItems: 'center', gap: '0.5rem',
                                boxShadow: '0 4px 15px rgba(0, 255, 128, 0.4)',
                                border: 'none', cursor: 'pointer'
                            }}
                        >
                            <Check size={28} /> Comprobar
                        </button>
                    )}

                    {error && (
                        <div style={{ color: '#ff3366', fontWeight: 'bold', fontSize: '1.2rem' }} className="animate-shake">
                            ¡Inténtalo de nuevo!
                        </div>
                    )}
                </div>

            </div>
        </DndContext>
    );
};

export default EquivalenceStage;
