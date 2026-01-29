import React, { useState, useEffect } from 'react';
import { DndContext, useSensor, useSensors, MouseSensor, TouchSensor } from '@dnd-kit/core';
import { Draggable } from '../components/Draggable';
import { Droppable } from '../components/Droppable';
import { Plus, Equal, Check } from 'lucide-react';

const OperationStage = ({ onComplete, operand1, operand2, result, instruction, operation }) => {
    // Parse fractions "1/4" -> {n:1, d:4}
    const parseFrac = (str) => {
        const parts = str.split('/');
        return { n: parseInt(parts[0]), d: parseInt(parts[1]) };
    };

    const op1 = parseFrac(operand1);
    const op2 = parseFrac(operand2);
    const target = parseFrac(result);

    // State for slices in the result container
    const [resultItems, setResultItems] = useState([]);

    // State to track if source items are "used" (moved to result)
    // We start with n items available for Op1 and Op2
    // Actually, we can just allow infinite dragging from source OR move them.
    // "Move them" is more intuitive: "Take this slice and put it there".
    const [op1Remaining, setOp1Remaining] = useState(Array.from({ length: op1.n }, (_, i) => `op1-${i}`));
    const [op2Remaining, setOp2Remaining] = useState(Array.from({ length: op2.n }, (_, i) => `op2-${i}`));

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        // Reset when exercise changes
        setResultItems([]);
        setOp1Remaining(Array.from({ length: op1.n }, (_, i) => `op1-${i}`));
        setOp2Remaining(Array.from({ length: op2.n }, (_, i) => `op2-${i}`));
        setSuccess(false);
        setError(false);
    }, [operand1, operand2]);

    const sensors = useSensors(
        useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
        useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return;

        if (over.id === 'result-zone') {
            const id = active.id;
            // Determine source
            if (id.startsWith('op1-')) {
                setOp1Remaining(prev => prev.filter(item => item !== id));
                setResultItems(prev => [...prev, id]);
            } else if (id.startsWith('op2-')) {
                setOp2Remaining(prev => prev.filter(item => item !== id));
                setResultItems(prev => [...prev, id]);
            }
        }
    };

    const handleCheck = () => {
        // Validation: Must have total slices equal to target numerator
        // AND all slices must be used from sources (since n1 + n2 = total)
        // Actually, sometimes n1+n2 might be > target if subtraction? But this is addition.
        // For addition: result n = op1.n + op2.n. So we expect ALL slices to be moved.

        if (resultItems.length === target.n) {
            setSuccess(true);
            setTimeout(onComplete, 1500);
        } else {
            setError(true);
            setTimeout(() => setError(false), 2000);
        }
    };

    // Helper to render a pizza slice (reused SVG logic ideally, but simplified here)
    // We assume circles for uniformity in this module for now.
    const renderSlice = (id, denominator, color) => (
        <Draggable id={id} key={id}>
            <div style={{
                width: '60px', height: '60px', borderRadius: '50%',
                background: `conic-gradient(${color} 0% ${360 / denominator}deg, transparent ${360 / denominator}deg)`,
                border: '2px solid rgba(255,255,255,0.5)',
                cursor: 'grab',
                transform: 'rotate(-90deg)' // Start from top
            }} />
        </Draggable>
    );

    return (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <div className="glass-panel" style={{
                width: '100%', maxWidth: '800px', padding: '2rem',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem'
            }}>
                <h2 style={{ fontSize: '1.8rem', color: 'var(--color-text-highlight)' }}>
                    {instruction}
                </h2>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>

                    {/* OPERAND 1 */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{
                            width: '120px', height: '120px', border: '2px dashed rgba(255,255,255,0.3)', borderRadius: '1rem',
                            display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '5px',
                            background: 'rgba(0,0,0,0.2)'
                        }}>
                            {op1Remaining.map(id => renderSlice(id, op1.d, 'var(--color-primary)'))}
                        </div>
                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{operand1}</span>
                    </div>

                    <Plus size={32} />

                    {/* OPERAND 2 */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{
                            width: '120px', height: '120px', border: '2px dashed rgba(255,255,255,0.3)', borderRadius: '1rem',
                            display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '5px',
                            background: 'rgba(0,0,0,0.2)'
                        }}>
                            {op2Remaining.map(id => renderSlice(id, op2.d, 'var(--color-secondary)'))}
                        </div>
                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{operand2}</span>
                    </div>

                    <Equal size={32} />

                    {/* RESULT ZONE */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                        <Droppable id="result-zone">
                            <div style={{
                                width: '140px', height: '140px',
                                border: success ? '3px solid var(--color-success)' : error ? '3px solid var(--color-error)' : '3px solid white',
                                borderRadius: '1rem',
                                display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '5px',
                                background: success ? 'rgba(76, 201, 240, 0.2)' : 'rgba(255,255,255,0.1)',
                                transition: 'all 0.3s'
                            }}>
                                {resultItems.map(id => (
                                    <div key={id} style={{
                                        width: '50px', height: '50px', borderRadius: '50%',
                                        background: `conic-gradient(${id.startsWith('op1') ? 'var(--color-primary)' : 'var(--color-secondary)'} 0% ${360 / target.d}deg, transparent ${360 / target.d}deg)`,
                                        border: '1px solid white',
                                        transform: 'rotate(-90deg)'
                                    }} />
                                ))}
                            </div>
                        </Droppable>
                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-success)' }}>{resultItems.length > 0 ? `${resultItems.length}/${target.d}` : '?'}</span>
                    </div>

                </div>

                <div style={{ height: '2rem' }}>
                    {success && <div className="animate-pop" style={{ color: 'var(--color-success)', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check /> ¡Correcto!</div>}
                    {error && <div className="animate-shake" style={{ color: 'var(--color-error)', fontSize: '1.2rem' }}>¡Faltan piezas!</div>}
                </div>
            </div>

            {/* Validation Button (Manual) */}
            <button onClick={handleCheck} style={{
                marginTop: '1rem',
                background: 'var(--color-success)',
                color: 'var(--color-bg-deep)',
                border: 'none',
                padding: '1rem 3rem',
                fontSize: '1.5rem',
                borderRadius: '50px',
                cursor: 'pointer',
                opacity: (op1Remaining.length === 0 && op2Remaining.length === 0) ? 1 : 0.5,
                transform: 'scale(1)',
                transition: 'transform 0.2s',
                boxShadow: '0 4px 15px rgba(76, 201, 240, 0.4)'
            }}>
                ¡Comprobar!
            </button>
        </DndContext>
    );
};

export default OperationStage;
