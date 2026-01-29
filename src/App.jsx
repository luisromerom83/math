import React, { useState } from 'react';
import './index.css';
import ConcreteStage from './features/ConcreteStage';
import PictorialStage from './features/PictorialStage';
import AbstractStage from './features/AbstractStage';
import EquivalenceStage from './features/EquivalenceStage';
import OperationStage from './features/OperationStage';
import CommonDenominatorStage from './features/CommonDenominatorStage';
import AdvancedOperationStage from './features/AdvancedOperationStage';
import ProgressBar from './components/ProgressBar';
import LevelMenu from './components/LevelMenu';
import DevMenu from './components/DevMenu';
import { exercises } from './data/exercises';
import { Map, ChevronLeft as BadgeChevronLeft, ChevronRight as BadgeChevronRight } from 'lucide-react';

function App() {
    // Load saved progress
    const savedMax = parseInt(localStorage.getItem('mathQuest_maxLevel') || '0', 10);

    // If we have a saved max, start there? Or start at 0? 
    // Usually start at max reached or 0. Let's start at max reached so they resume.
    const [levelIndex, setLevelIndex] = useState(savedMax);
    const [maxReached, setMaxReached] = useState(savedMax);

    const [gameState, setGameState] = useState('menu'); // menu, playing, won
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Developer Mode State
    const [devClicks, setDevClicks] = useState(0);
    const [showDevMenu, setShowDevMenu] = useState(false);

    const handleDevClick = () => {
        const newCount = devClicks + 1;
        setDevClicks(newCount);
        if (newCount >= 5) {
            setShowDevMenu(true);
            setDevClicks(0);
        }
    };

    const handleDevReset = () => {
        localStorage.removeItem('mathQuest_maxLevel');
        setMaxReached(0);
        setLevelIndex(0);
        setGameState('menu');
        setShowDevMenu(false);
        window.location.reload(); // Force clean slate
    };

    const handleDevUnlockAll = () => {
        const allUnlocked = exercises.length - 1;
        localStorage.setItem('mathQuest_maxLevel', allUnlocked.toString());
        setMaxReached(allUnlocked);
        setShowDevMenu(false);
        alert('🔓 All Levels Unlocked!');
    };

    const handleDevJump = (levelId) => {
        // levelId corresponds to the visual ID (e.g. 101), we need the index
        // Or if they input the index directly? Let's assume index for simplicity or find by ID
        // Let's implement Find By ID for safety
        const idx = exercises.findIndex(e => e.id === levelId);
        if (idx !== -1) {
            setLevelIndex(idx);
            setGameState('playing');
            setShowDevMenu(false);
        } else {
            alert('Level ID not found. Try 1, 101, etc.');
        }
    };

    // Define Modules based on indexes
    const modules = [
        { id: 'math-basic', title: 'Fundamentos', startIndex: 0, count: 30, icon: '🍕', color: 'var(--color-primary)' },
        { id: 'equivalence', title: 'Equivalencias', startIndex: exercises.findIndex(e => e.module === 'equivalence'), count: 30, icon: '⚖️', color: 'var(--color-secondary)' },
        { id: 'sum-same', title: 'Sumas (Mismo Denom.)', startIndex: exercises.findIndex(e => e.module === 'sum-same'), count: 10, icon: '➕', color: 'var(--color-accent)' },
        { id: 'common-denom', title: 'Denominador Común', startIndex: exercises.findIndex(e => e.module === 'common-denom'), count: 10, icon: '✂️', color: 'var(--color-warning)' },
        { id: 'sum-diff', title: 'Sumas Avanzadas', startIndex: exercises.findIndex(e => e.module === 'sum-diff'), count: 10, icon: '🚀', color: 'var(--color-success)' },
    ].map(m => {
        const isStarted = levelIndex >= m.startIndex;
        const isPast = levelIndex >= m.startIndex + m.count;

        // Progression Check
        let isLocked = false;

        // 1. Hard lock (if explicitly set in config, e.g., features not ready)
        if (m.locked || m.startIndex === -1) {
            isLocked = true;
        }
        // 2. Progression lock (if haven't reached the start level)
        else if (maxReached < m.startIndex) {
            isLocked = true;
        }

        // 3. Developer Override (Unlock All)
        // If maxReached is huge (999 or total length), unlock everything visual
        if (maxReached >= exercises.length - 1) {
            isLocked = false;
        }

        return {
            ...m,
            // If it's a stub (startIndex -1) and forced unlocked, it's still "active" but clicking needs safety
            locked: isLocked,
            active: isStarted && !isPast,
            completed: isPast,
            levels: m.count
        };
    });

    const currentLevel = exercises[levelIndex];

    // Calculate Relative Progress
    const currentModule = modules.find(m => m.active) || modules[0];
    const relativeLevel = levelIndex - currentModule.startIndex + 1;

    const handleLevelComplete = () => {
        const nextLevel = levelIndex + 1;

        // Save progress
        if (nextLevel > maxReached) {
            setMaxReached(nextLevel);
            localStorage.setItem('mathQuest_maxLevel', nextLevel.toString());
        }

        if (levelIndex < exercises.length - 1) {
            setLevelIndex(nextLevel);
        } else {
            setGameState('won');
        }
    };

    const handlePrevLevel = () => {
        if (levelIndex > 0) {
            setLevelIndex(prev => prev - 1);
            setGameState('playing');
        }
    };

    const handleNextLevel = () => {
        if (levelIndex < maxReached && levelIndex < exercises.length - 1) {
            setLevelIndex(prev => prev + 1);
            setGameState('playing');
        }
    };

    const startGame = () => {
        setLevelIndex(0);
        setGameState('playing');
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }}>
            <header className="glass-panel" style={{
                padding: '1rem 2rem',
                marginBottom: '2rem',
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                maxWidth: '800px',
                alignItems: 'center'
            }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <button onClick={() => setIsMenuOpen(true)} style={{
                        background: 'rgba(255,255,255,0.1)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '40px', height: '40px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white', cursor: 'pointer'
                    }}>
                        <Map size={20} />
                    </button>
                    <h1 style={{ fontSize: '1.5rem', color: 'var(--color-secondary)', margin: 0, marginLeft: '1rem' }}>
                        Aventura
                    </h1>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>

                    {/* Navigation Buttons */}
                    {gameState === 'playing' && (
                        <>
                            <button
                                onClick={handlePrevLevel}
                                disabled={levelIndex === 0}
                                style={{
                                    opacity: levelIndex === 0 ? 0.3 : 1,
                                    background: 'none', border: 'none', color: 'white', cursor: 'pointer'
                                }}>
                                <BadgeChevronLeft />
                            </button>

                            <span style={{ fontSize: '1.2rem', minWidth: '80px', textAlign: 'center' }}>
                                Nivel {relativeLevel}
                            </span>

                            <button
                                onClick={handleNextLevel}
                                disabled={levelIndex >= maxReached}
                                style={{
                                    opacity: levelIndex >= maxReached ? 0.3 : 1,
                                    background: 'none', border: 'none', color: 'white', cursor: 'pointer'
                                }}>
                                <BadgeChevronRight />
                            </button>
                        </>
                    )}

                    {!gameState && <span style={{ fontSize: '1.2rem' }}>Menú</span>}

                    <div
                        onClick={handleDevClick}
                        style={{
                            width: '40px',
                            height: '40px',
                            background: 'var(--color-primary)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            userSelect: 'none'
                        }}>
                        🦁
                    </div>
                </div>
            </header>

            <DevMenu
                isOpen={showDevMenu}
                onClose={() => setShowDevMenu(false)}
                onReset={handleDevReset}
                onUnlockAll={handleDevUnlockAll}
                onSetLevel={handleDevJump}
            />

            <LevelMenu
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                modules={modules}
                onSelectModule={(idx) => {
                    if (idx !== -1) {
                        setLevelIndex(idx);
                        setGameState('playing');
                    } else {
                        alert('🚧 Este módulo está en construcción. ¡Pronto disponible!');
                    }
                }}
            />

            {gameState === 'playing' && (
                <ProgressBar
                    current={relativeLevel}
                    total={currentModule.count}
                    label={currentModule.title}
                />
            )}

            <main className="glass-panel animate-pop" style={{
                width: '100%',
                maxWidth: '800px',
                minHeight: '500px',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {gameState === 'menu' ? (
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>¿Listo para la Aventura?</h2>
                        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-dim)', marginBottom: '2rem' }}>
                            ¡Vamos a dominar las fracciones juntos!
                        </p>
                        <div style={{ marginBottom: '2rem' }}>
                            <p>Total de ejercicios: {exercises.length}</p>
                        </div>
                        <button
                            onClick={startGame}
                            style={{
                                background: 'var(--color-primary)',
                                color: 'white',
                                padding: '1rem 3rem',
                                fontSize: '1.5rem',
                                borderRadius: 'var(--radius-md)',
                                boxShadow: '0 4px 15px rgba(255, 51, 102, 0.4)'
                            }}>
                            Jugar Ahora
                        </button>
                    </div>
                ) : gameState === 'playing' ? (
                    <div style={{ width: '100%' }}>
                        {currentLevel.module === 'equivalence' ? (
                            <EquivalenceStage
                                key={currentLevel.id}
                                onComplete={handleLevelComplete}
                                targetFraction={currentLevel.targetFraction}
                                userFraction={currentLevel.userFraction}
                                instruction={currentLevel.instruction}
                                type={currentLevel.type}
                                shape={currentLevel.shape}
                            />
                        ) : currentLevel.type === 'concrete' ? (
                            <ConcreteStage
                                key={currentLevel.id}
                                onComplete={handleLevelComplete}
                                targetCount={currentLevel.targetCount}
                                totalSlices={currentLevel.totalSlices}
                                instruction={currentLevel.instruction}
                            />
                        ) : currentLevel.type === 'pictorial' ? (
                            <PictorialStage
                                key={currentLevel.id}
                                onComplete={handleLevelComplete}
                                fraction={currentLevel.fraction}
                                instruction={currentLevel.instruction}
                            />
                        ) : currentLevel.type === 'abstract' ? (
                            <AbstractStage
                                key={currentLevel.id}
                                onComplete={handleLevelComplete}
                                fraction={currentLevel.fraction}
                                instruction={currentLevel.instruction}
                            />
                        ) : currentLevel.type === 'operation' ? (
                            <OperationStage
                                key={currentLevel.id}
                                onComplete={handleLevelComplete}
                                operand1={currentLevel.operand1}
                                operand2={currentLevel.operand2}
                                result={currentLevel.result}
                                instruction={currentLevel.instruction}
                                operation={currentLevel.operation}
                            />
                        ) : currentLevel.type === 'common-denom' ? (
                            <CommonDenominatorStage
                                key={currentLevel.id}
                                onComplete={handleLevelComplete}
                                fraction1={currentLevel.fraction1}
                                fraction2={currentLevel.fraction2}
                                instruction={currentLevel.instruction}
                            />
                        ) : currentLevel.type === 'advanced-operation' ? (
                            <AdvancedOperationStage
                                key={currentLevel.id}
                                onComplete={handleLevelComplete}
                                operand1={currentLevel.operand1}
                                operand2={currentLevel.operand2}
                                result={currentLevel.result}
                                instruction={currentLevel.instruction}
                            />
                        ) : null}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center' }} className="animate-pop">
                        <h2 style={{ fontSize: '3rem', color: 'var(--color-success)', marginBottom: '1rem' }}>¡Ganaste!</h2>
                        <p style={{ marginBottom: '2rem' }}>¡Completaste los {exercises.length} niveles!</p>
                        <button onClick={startGame} style={{
                            background: 'var(--color-secondary)',
                            color: 'var(--color-bg-deep)',
                            padding: '1rem 2rem',
                            borderRadius: 'var(--radius-md)',
                            fontSize: '1.2rem'
                        }}>Jugar de Nuevo</button>
                    </div>
                )}

                {/* Updated Toast Style to avoid overlapping */}
                <div id="instruction-toast" className="glass-panel hidden" style={{
                    position: 'fixed', bottom: '10px', right: '10px', left: 'auto', transform: 'none',
                    padding: '0.5rem 1rem', background: 'rgba(255, 51, 102, 0.9)', color: 'white',
                    zIndex: 2000, pointerEvents: 'none', borderRadius: '25px', fontSize: '0.9rem'
                }}>
                    👆 ¡Arrástrame!
                </div>
            </main>
        </div>
    );
}

export default App;
