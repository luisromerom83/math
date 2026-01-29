import React, { useState, useEffect } from 'react';
import { DndContext, useSensor, useSensors, MouseSensor, TouchSensor } from '@dnd-kit/core';
import { Draggable } from '../components/Draggable';
import { Droppable } from '../components/Droppable';
import { Star, Check } from 'lucide-react';

const ConcreteStage = ({ onComplete, targetCount = 2, totalSlices = 4, instruction = "Arrastra..." }) => {
    const [plateItems, setPlateItems] = useState([]);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    // Reset state when props change (new level)
    useEffect(() => {
        setPlateItems([]);
        setSuccess(false);
        setError(false);
    }, [targetCount, totalSlices, instruction]);

    const sensors = useSensors(
        useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
        useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
    );

    const sliceAngle = 360 / totalSlices;

    // Helper to generate source slice IDs
    const sourceSlices = Array.from({ length: totalSlices }, (_, i) => `slice-${i}`);

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (over && over.id === 'plate') {
            if (!plateItems.includes(active.id)) {
                const newItems = [...plateItems, active.id];
                setPlateItems(newItems);
                setError(false);
                // Removed auto-check
            }
        }
    };

    const handleDoubleClick = (id) => {
        if (!plateItems.includes(id)) {
            setPlateItems([...plateItems, id]);
            setError(false);
        }
    };

    const handleValidate = () => {
        if (plateItems.length === targetCount) {
            setSuccess(true);
            setTimeout(() => {
                onComplete && onComplete();
            }, 2000);
        } else {
            setError(true);
            setTimeout(() => setError(false), 2000);
        }
    };

    const handleReset = () => {
        setPlateItems([]);
        setError(false);
    };

    return (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>

                <div className="instructions glass-panel" style={{ marginBottom: '2rem', padding: '1rem', textAlign: 'center' }}>
                    <h2 style={{ color: 'var(--color-secondary)' }}>{instruction}</h2>
                    <p>Arrastra {targetCount} rebanadas y luego comprueba.</p>
                </div>

                <div style={{ display: 'flex', gap: '4rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>

                    {/* Source: Slices */}
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', width: '250px', justifyContent: 'center' }}>
                        {sourceSlices.map((id) => (
                            !plateItems.includes(id) && !success && (
                                <Draggable key={id} id={id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <div
                                        onDoubleClick={() => handleDoubleClick(id)}
                                        style={{
                                            width: '80px', height: '80px',
                                            position: 'relative',
                                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                                            filter: 'drop-shadow(0 4px 4px rgba(0,0,0,0.2))'
                                        }}>
                                        {/* Dynamic CSS Slice Shape based on conic-gradient */}
                                        <div style={{
                                            width: '100%', height: '100%',
                                            borderRadius: '50%',
                                            background: `conic-gradient(var(--color-primary) 0deg ${sliceAngle}deg, transparent ${sliceAngle}deg 360deg)`,
                                            transform: `rotate(-${sliceAngle / 2}deg)` // Center the slice visually
                                        }}></div>
                                    </div>
                                </Draggable>
                            )
                        ))}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                        {/* Target: Plate */}
                        <Droppable id="plate" style={{
                            width: '300px', height: '300px',
                            background: success ? 'rgba(0, 255, 128, 0.2)' : 'rgba(255,255,255,0.1)',
                            borderRadius: '50%',
                            border: error ? '4px solid red' : success ? '4px solid var(--color-success)' : '4px dashed var(--color-text-dim)',
                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                            position: 'relative',
                            overflow: 'hidden',
                            transition: 'border 0.3s, background 0.3s'
                        }}>
                            {plateItems.length === 0 && (
                                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '1.5rem' }}>Suelta Aquí</span>
                            )}

                            {/* Render items on plate */}
                            {plateItems.map((item, index) => (
                                <div key={item} style={{
                                    position: 'absolute',
                                    width: '100%', height: '100%',
                                    borderRadius: '50%',
                                    left: 0, top: 0,
                                    transform: `rotate(${index * sliceAngle}deg)`,
                                    pointerEvents: 'none'
                                }}>
                                    <div style={{
                                        width: '100%', height: '100%',
                                        borderRadius: '50%',
                                        background: `conic-gradient(var(--color-primary) 0deg ${sliceAngle}deg, transparent ${sliceAngle}deg 360deg)`,
                                        borderRight: '1px solid rgba(255,255,255,0.2)'
                                    }}></div>
                                </div>
                            ))}

                            {success && (
                                <div className="animate-pop" style={{
                                    position: 'absolute', zIndex: 10,
                                    background: 'white', color: 'var(--color-bg-deep)',
                                    padding: '1rem 2rem', borderRadius: 'var(--radius-md)',
                                    fontWeight: 'bold', fontSize: '1.5rem',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                                    top: '50%', left: '50%', transform: 'translate(-50%, -50%)'
                                }}>
                                    ¡Bien! {targetCount}/{totalSlices}
                                </div>
                            )}
                        </Droppable>

                        {/* Validate Button */}
                        {!success && plateItems.length > 0 && (
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button onClick={handleReset} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '0.5rem 1rem', borderRadius: '20px', cursor: 'pointer' }}>
                                    Borrar
                                </button>
                                <button
                                    onClick={handleValidate}
                                    className="animate-pop"
                                    style={{
                                        background: 'var(--color-success)',
                                        color: 'var(--color-bg-deep)',
                                        padding: '0.8rem 2rem',
                                        fontSize: '1.2rem',
                                        borderRadius: '50px',
                                        fontWeight: 'bold',
                                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                                        boxShadow: '0 4px 15px rgba(0, 255, 128, 0.4)',
                                        border: 'none', cursor: 'pointer'
                                    }}
                                >
                                    <Check size={24} /> Comprobar
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </DndContext>
    );
};

export default ConcreteStage;
