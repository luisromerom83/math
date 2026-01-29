import React, { useState } from 'react';
import { DndContext, useSensor, useSensors, MouseSensor, TouchSensor } from '@dnd-kit/core';
import { Draggable } from '../components/Draggable';
import { Droppable } from '../components/Droppable';

const AbstractStage = ({ onComplete, fraction = "1/2", instruction = "..." }) => {
    const [matched, setMatched] = useState(false);

    const [numerator, denominator] = fraction.split('/').map(Number);
    const percentage = (numerator / denominator) * 100;

    // Simple logic to generate a wrong answer (e.g. flip numerator/denominator or change one)
    const wrongFraction = denominator === 2 ? "1/4" : "1/2";

    const sensors = useSensors(
        useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
        useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (over && over.id === 'target-image' && active.id === 'correct-text') {
            setMatched(true);
            setTimeout(onComplete, 2000);
        }
    };

    return (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <div style={{ textAlign: 'center', width: '100%' }}>
                <h2 style={{ marginBottom: '2rem', color: 'var(--color-secondary)' }}>{instruction}</h2>

                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
                    {/* Target Image */}
                    <Droppable id="target-image" style={{
                        width: 200, height: 200,
                        background: matched ? 'var(--color-success)' : 'white',
                        borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'background 0.3s'
                    }}>
                        {matched ? (
                            <span style={{ fontSize: '3rem', color: 'var(--color-bg-deep)', fontWeight: 'bold' }}>{fraction}</span>
                        ) : (
                            <div style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                background: `conic-gradient(var(--color-primary) 0% ${percentage}%, #e0e0e0 ${percentage}% 100%)`,
                                border: '2px solid white'
                            }}></div>
                        )}
                    </Droppable>

                    {/* Draggable Number */}
                    {!matched && (
                        <div style={{ display: 'flex', gap: '2rem' }}>
                            <Draggable id="correct-text">
                                <div style={{
                                    padding: '1rem 2rem',
                                    fontSize: '2rem',
                                    fontWeight: 'bold',
                                    background: 'var(--color-bg-deep)',
                                    border: '2px solid var(--color-secondary)',
                                    borderRadius: 'var(--radius-sm)'
                                }}>
                                    {fraction}
                                </div>
                            </Draggable>
                            <Draggable id="wrong-text">
                                <div style={{
                                    padding: '1rem 2rem',
                                    fontSize: '2rem',
                                    fontWeight: 'bold',
                                    background: 'var(--color-bg-deep)',
                                    border: '2px solid var(--color-secondary)',
                                    borderRadius: 'var(--radius-sm)'
                                }}>
                                    {wrongFraction}
                                </div>
                            </Draggable>
                        </div>
                    )}
                </div>
            </div>
        </DndContext>
    );
};

export default AbstractStage;
