import React from 'react';
import { X, Map, Star, Circle, CheckCircle } from 'lucide-react';

const LevelMenu = ({ isOpen, onClose, modules, onSelectModule }) => {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            background: 'rgba(43, 11, 58, 0.95)',
            zIndex: 2000,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: '2rem'
        }}>
            <button onClick={onClose} style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'transparent', color: 'white', border: 'none' }}>
                <X size={32} />
            </button>

            <h2 style={{ fontSize: '2.5rem', color: 'var(--color-secondary)', marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Map size={40} /> Mapa de Aventura
            </h2>

            <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem',
                width: '100%', maxWidth: '1000px'
            }}>
                {modules.map((mod, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            if (!mod.locked) {
                                onSelectModule(mod.startIndex);
                                onClose();
                            }
                        }}
                        style={{
                            background: 'rgba(255,255,255,0.1)',
                            border: mod.active ? '2px solid var(--color-secondary)' : '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '1rem',
                            padding: '2rem',
                            textAlign: 'left',
                            cursor: mod.locked ? 'not-allowed' : 'pointer',
                            opacity: mod.locked ? 0.5 : 1,
                            position: 'relative',
                            transition: 'transform 0.2s',
                            display: 'flex', flexDirection: 'column', gap: '0.5rem'
                        }}
                        className={!mod.locked ? 'hover-scale' : ''}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <span style={{
                                background: mod.color || 'var(--color-primary)',
                                width: '40px', height: '40px', borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1.2rem'
                            }}>
                                {mod.icon || '🚀'}
                            </span>
                            {mod.completed ? <CheckCircle color="var(--color-success)" /> : !mod.locked ? <Circle size={16} /> : null}
                        </div>
                        <h3 style={{ fontSize: '1.2rem' }}>{mod.title}</h3>
                        <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>{mod.levels} Niveles</p>

                        {mod.locked && (
                            <div style={{
                                position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', borderRadius: '1rem',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                🔒 Bloqueado
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LevelMenu;
