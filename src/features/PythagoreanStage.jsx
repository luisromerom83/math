import React, { useState, useEffect } from 'react';

const PythagoreanStage = ({ onComplete, tableSize = 10, missingCells = [], allMissing = false, instruction }) => {
    // missingCells is an array of objects: { r: row, c: col }
    const [inputs, setInputs] = useState({});
    const [correctCells, setCorrectCells] = useState({});

    // Reset state when level changes
    useEffect(() => {
        setInputs({});
        setCorrectCells({});
    }, [tableSize, missingCells]);

    const totalMissingCount = allMissing ? tableSize * tableSize : missingCells.length;

    // Check completion
    useEffect(() => {
        if (totalMissingCount > 0 && Object.keys(correctCells).length === totalMissingCount) {
            const timer = setTimeout(() => {
                onComplete();
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [correctCells, totalMissingCount, onComplete]);

    const handleInputChange = (r, c, value) => {
        const key = `${r}-${c}`;
        const numValue = parseInt(value, 10);
        setInputs(prev => ({ ...prev, [key]: value }));

        if (numValue === r * c) {
            setCorrectCells(prev => ({ ...prev, [key]: true }));
        } else {
            setCorrectCells(prev => {
                const next = { ...prev };
                delete next[key];
                return next;
            });
        }
    };

    const renderGrid = () => {
        const rows = [];
        for (let r = 0; r <= tableSize; r++) {
            for (let c = 0; c <= tableSize; c++) {
                const isHeaderRow = r === 0;
                const isHeaderCol = c === 0;
                const isCorner = isHeaderRow && isHeaderCol;
                
                let content = null;
                let isMissing = false;
                let cellStyle = {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: tableSize > 5 ? '1rem' : '1.5rem',
                    border: '1px solid rgba(0,0,0,0.1)',
                    backgroundColor: 'rgba(255,255,255,0.8)',
                    borderRadius: '4px',
                    width: '100%',
                    height: '100%',
                    minHeight: tableSize > 5 ? '40px' : '60px',
                    transition: 'all 0.3s ease'
                };

                if (isCorner) {
                    content = '✖️';
                    cellStyle.backgroundColor = 'var(--color-primary)';
                    cellStyle.color = 'white';
                    cellStyle.border = 'none';
                } else if (isHeaderRow) {
                    content = c;
                    cellStyle.backgroundColor = 'var(--color-secondary)';
                    cellStyle.color = 'var(--color-bg-deep)';
                    cellStyle.border = 'none';
                } else if (isHeaderCol) {
                    content = r;
                    cellStyle.backgroundColor = 'var(--color-secondary)';
                    cellStyle.color = 'var(--color-bg-deep)';
                    cellStyle.border = 'none';
                } else {
                    const isMissingCell = allMissing || missingCells.find(cell => cell.r === r && cell.c === c);
                    const key = `${r}-${c}`;
                    const isCorrect = correctCells[key];

                    if (isMissingCell) {
                        isMissing = true;
                        content = (
                            <input
                                type="number"
                                value={inputs[key] || ''}
                                onChange={(e) => handleInputChange(r, c, e.target.value)}
                                disabled={isCorrect}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    border: 'none',
                                    outline: 'none',
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    fontSize: tableSize > 5 ? '1.2rem' : '1.5rem',
                                    backgroundColor: isCorrect ? 'var(--color-success)' : 'white',
                                    color: isCorrect ? 'white' : '#000000',
                                    borderRadius: '4px',
                                    transition: 'all 0.3s ease',
                                    boxShadow: isCorrect ? '0 0 10px var(--color-success)' : 'inset 0 2px 4px rgba(0,0,0,0.1)'
                                }}
                            />
                        );
                        cellStyle.padding = '0';
                        cellStyle.border = isCorrect ? '2px solid var(--color-success)' : '2px solid var(--color-primary)';
                        if (isCorrect) cellStyle.transform = 'scale(1.05)';
                    } else {
                        content = r * c;
                        cellStyle.color = 'var(--color-text-dim)';
                        cellStyle.backgroundColor = 'rgba(255,255,255,0.5)';
                    }
                }

                rows.push(
                    <div key={`${r}-${c}`} style={cellStyle}>
                        {content}
                    </div>
                );
            }
        }
        return rows;
    };

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center', color: 'var(--color-secondary)' }}>
                {instruction}
            </h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${tableSize + 1}, 1fr)`,
                gap: '4px',
                width: '100%',
                maxWidth: tableSize > 5 ? '600px' : '400px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                padding: '10px',
                borderRadius: '8px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
            }}>
                {renderGrid()}
            </div>
            
            <div style={{ marginTop: '2rem', fontSize: '1.2rem', color: 'var(--color-text-dim)' }}>
                Completa las celdas vacías ({Object.keys(correctCells).length} / {totalMissingCount})
            </div>
        </div>
    );
};

export default PythagoreanStage;
