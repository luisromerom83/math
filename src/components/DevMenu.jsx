import React, { useState } from 'react';
import { Trash2, Unlock, FastForward, X } from 'lucide-react';

const DevMenu = ({ isOpen, onClose, onReset, onUnlockAll, onSetLevel }) => {
    const [jumpLevel, setJumpLevel] = useState('');

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.8)', zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            <div className="glass-panel" style={{
                background: '#222',
                border: '2px solid red',
                padding: '2rem',
                width: '90%', maxWidth: '400px',
                color: 'white'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ color: 'red', margin: 0 }}>🛠️ Developer Tools</h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                        <X />
                    </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <button onClick={onUnlockAll} style={{
                        padding: '1rem', background: '#444', color: '#0f0', border: '1px solid #0f0',
                        display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'
                    }}>
                        <Unlock size={18} /> Unlock All Levels
                    </button>

                    <button onClick={onReset} style={{
                        padding: '1rem', background: '#444', color: '#f00', border: '1px solid #f00',
                        display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'
                    }}>
                        <Trash2 size={18} /> Reset Progress (Clear Save)
                    </button>

                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                        <input
                            type="number"
                            placeholder="Level ID"
                            value={jumpLevel}
                            onChange={(e) => setJumpLevel(e.target.value)}
                            style={{ flex: 1, padding: '0.5rem', background: '#333', border: '1px solid #666', color: 'white' }}
                        />
                        <button
                            onClick={() => onSetLevel(parseInt(jumpLevel, 10))}
                            style={{ background: 'blue', color: 'white', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer' }}
                        >
                            Jump
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DevMenu;
