import React, { useState, useEffect } from 'react';
import { DndContext, useSensor, useSensors, MouseSensor, TouchSensor } from '@dnd-kit/core';
import { Draggable } from '../components/Draggable';
import { Droppable } from '../components/Droppable';

const PictorialStage = ({ onComplete, fraction = "1/2", instruction = "..." }) => {
    const [matched, setMatched] = useState(false);

    // Parsing fraction for visual logic
    const [numerator, denominator] = fraction.split('/').map(Number);
    const percentage = (numerator / denominator) * 100;

    // Generate a wrong option (randomly different percentage)
    const wrongPercentage = percentage === 50 ? 25 : 50;

    const sensors = useSensors(
        useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
        useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (over && over.id === 'match-slot' && active.id === 'correct-pie') {
            setMatched(true);
            setTimeout(onComplete, 2000);
        }
    };

    return (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <div style={{ textAlign: 'center', width: '100%' }}>
                <h2 style={{ marginBottom: '2rem', color: 'var(--color-secondary)' }}>{instruction}</h2>

                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
                    {/* Draggable Options */}
                    {!matched && (
                        <div style={{ display: 'flex', gap: '2rem' }}>
                            <Draggable id="wrong-pie">
                                <div style={{
                                    width: 100, height: 100,
                                    borderRadius: '50%',
                                    border: '4px solid white',
                                    background: `conic-gradient(var(--color-bg-deep) 0% ${wrongPercentage}%, white ${wrongPercentage}% 100%)`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                                }}>
                                </div>
                            </Draggable>
                            <Draggable id="correct-pie">
                                <div style={{
                                    width: 100, height: 100,
                                    borderRadius: '50%',
                                    border: '4px solid white',
                                    background: `conic-gradient(var(--color-primary) 0% ${percentage}%, white ${percentage}% 100%)`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                                }}>
                                </div>
                            </Draggable>
                        </div>
                    )}

                    {/* Drop Zone */}
                    <Droppable id="match-slot" style={{
                        width: 150, height: 150,
                        border: '4px dashed var(--color-text-dim)',
                        borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: matched ? 'var(--color-success)' : 'transparent'
                    }}>
                        {matched ? (
                            <span style={{ fontSize: '2rem' }}>¡Correcto!</span>
                        ) : (
                            <span>{fraction}</span>
                        )}
                    </Droppable>
                </div>
            </div>
        </DndContext>
    );
};

export default PictorialStage;
