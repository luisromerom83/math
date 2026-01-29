import React from 'react';
import { useDraggable } from '@dnd-kit/core';

export function Draggable(props) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: props.id,
        data: props.data,
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${isDragging ? 1.1 : 1})`,
        cursor: 'grab',
        touchAction: 'none',
        zIndex: isDragging ? 100 : 1,
        opacity: isDragging ? 0.8 : 1,
        transition: isDragging ? 'none' : 'transform 0.2s ease, opacity 0.2s ease',
        ...props.style
    } : {
        cursor: 'grab',
        touchAction: 'none',
        transition: 'transform 0.2s ease',
        ...props.style
    };

    const handleClick = () => {
        const el = document.getElementById('instruction-toast');
        if (el) {
            el.classList.remove('hidden');
            el.classList.add('animate-pop');
            // Reset animation
            el.style.animation = 'none';
            el.offsetHeight; /* trigger reflow */
            el.style.animation = null;

            setTimeout(() => el.classList.add('hidden'), 2000);
        }
    };

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes} onClick={handleClick}>
            {props.children}
        </div>
    );
}
