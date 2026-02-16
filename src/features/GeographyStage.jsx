import React, { useState } from 'react';
import { DndContext, useSensor, useSensors, MouseSensor, TouchSensor } from '@dnd-kit/core';
import { Draggable } from '../components/Draggable';
import { Droppable } from '../components/Droppable';
import { Globe } from 'lucide-react';

const GeographyStage = ({ onComplete, country, capital, options, instruction }) => {
    const [matched, setMatched] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const sensors = useSensors(
        useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
        useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (over && over.id === 'country-target' && active.id === capital) {
            setMatched(true);
            setTimeout(onComplete, 1500);
        } else if (over && over.id === 'country-target') {
            // Wrong answer feedback
            setSelectedOption(active.id);
            setTimeout(() => setSelectedOption(null), 1000);
        }
    };

    return (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <div style={{ textAlign: 'center', width: '100%' }}>
                <h2 style={{ marginBottom: '2rem', color: 'var(--color-secondary)' }}>{instruction}</h2>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '3rem'
                }}>
                    {/* Country Target */}
                    <Droppable id="country-target" style={{
                        width: '280px',
                        height: '180px',
                        background: matched ? 'var(--color-success)' : 'rgba(255,255,255,0.05)',
                        border: '3px dashed ' + (matched ? 'var(--color-success)' : 'rgba(255,255,255,0.2)'),
                        borderRadius: 'var(--radius-lg)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <Globe size={48} style={{
                            marginBottom: '1rem',
                            color: matched ? 'white' : 'var(--color-primary)',
                            opacity: matched ? 1 : 0.5
                        }} />
                        <span style={{
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            color: matched ? 'white' : 'var(--color-text)'
                        }}>
                            {country}
                        </span>

                        {matched && (
                            <div style={{
                                position: 'absolute',
                                top: 0, left: 0, right: 0, bottom: 0,
                                background: 'var(--color-success)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '2.5rem',
                                color: 'white',
                                fontWeight: 'bold'
                            }} className="animate-pop">
                                {capital}
                            </div>
                        )}
                    </Droppable>

                    {/* Options (Draggables) */}
                    {!matched && (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '1.5rem',
                            width: '100%',
                            maxWidth: '500px'
                        }}>
                            {options.map((option) => (
                                <Draggable key={option} id={option}>
                                    <div style={{
                                        padding: '1rem',
                                        background: 'var(--color-bg-deep)',
                                        border: '2px solid ' + (selectedOption === option ? 'var(--color-error)' : 'var(--color-secondary)'),
                                        borderRadius: 'var(--radius-md)',
                                        fontSize: '1.2rem',
                                        fontWeight: '600',
                                        cursor: 'grab',
                                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                        transition: 'transform 0.2s',
                                        textAlign: 'center'
                                    }}>
                                        {option}
                                    </div>
                                </Draggable>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </DndContext>
    );
};

export default GeographyStage;
