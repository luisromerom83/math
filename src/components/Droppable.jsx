import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export function Droppable(props) {
    const { isOver, setNodeRef } = useDroppable({
        id: props.id,
        data: props.data,
    });

    const style = {
        opacity: isOver ? 1 : 0.9,
        transform: isOver ? 'scale(1.02)' : 'scale(1)',
        transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
    };

    return (
        <div ref={setNodeRef} style={{ ...style, ...props.style }}>
            {props.children}
        </div>
    );
}
