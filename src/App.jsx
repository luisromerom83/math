import React, { useState } from 'react';
import './index.css';
import ConcreteStage from './features/ConcreteStage';
import PictorialStage from './features/PictorialStage';
import AbstractStage from './features/AbstractStage';
import EquivalenceStage from './features/EquivalenceStage';
import OperationStage from './features/OperationStage';
import CommonDenominatorStage from './features/CommonDenominatorStage';
import AdvancedOperationStage from './features/AdvancedOperationStage';
import GeographyStage from './features/GeographyStage';
import GeographyInputStage from './features/GeographyInputStage';
import ProgressBar from './components/ProgressBar';
import LevelMenu from './components/LevelMenu';
import DevMenu from './components/DevMenu';
import { exercises } from './data/exercises';
import { Map, ChevronLeft as BadgeChevronLeft, ChevronRight as BadgeChevronRight } from 'lucide-react';

function App() {
    // Load saved progress
    const savedMax = parseInt(localStorage.getItem('mathQuest_maxLevel') || '0', 10);

    const [levelIndex, setLevelIndex] = useState(savedMax);
    const [maxReached, setMaxReached] = useState(savedMax);

    const [selectedSubject, setSelectedSubject] = useState(null); // 'math' or 'geography'
    const [gameState, setGameState] = useState('subject-selection'); // subject-selection, menu, playing, won
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
        setGameState('subject-selection');
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
        const idx = exercises.findIndex(e => e.id === levelId);
        if (idx !== -1) {
            setLevelIndex(idx);
            setSelectedSubject(exercises[idx].subject);
            setGameState('playing');
            setShowDevMenu(false);
        } else {
            alert('Level ID not found. Try 1, 101, etc.');
        }
    };

    // Define Modules based on subject
    const getModuleInfo = (modId, title, icon, color) => {
        const list = exercises.filter(e => e.module === modId);
        return {
            id: modId,
            title,
            startIndex: exercises.findIndex(e => e.module === modId),
            count: list.length,
            icon,
            color
        };
    };

    const mathModules = [
        getModuleInfo('math-basic', 'Fundamentos', '🍕', 'var(--color-primary)'),
        getModuleInfo('equivalence', 'Equivalencias', '⚖️', 'var(--color-secondary)'),
        getModuleInfo('sum-same', 'Sumas Simples', '➕', 'var(--color-accent)'),
        getModuleInfo('common-denom', 'Denom. Común', '✂️', 'var(--color-warning)'),
        getModuleInfo('sum-diff', 'Sumas Avanzadas', '🚀', 'var(--color-success)'),
    ].filter(m => m.startIndex !== -1);

    const geographyModules = [
        getModuleInfo('geography-capitals', 'Capitales de América', '🌎', 'var(--color-info)'),
        getModuleInfo('geography-input', 'Escribe las Capitales', '✍️', 'var(--color-accent)'),
    ].filter(m => m.startIndex !== -1);

    const availableModules = selectedSubject === 'math' ? mathModules : geographyModules;

    const modules = availableModules.map(m => {
        const isStarted = levelIndex >= m.startIndex;
        const isPast = levelIndex >= m.startIndex + m.count;

        let isLocked = false;
        if (m.locked || m.startIndex === -1) {
            isLocked = true;
        } else if (selectedSubject === 'math' && maxReached < m.startIndex) {
            isLocked = true;
        } else if (selectedSubject === 'geography') {
            // Unlocked by default for Geo for now
            isLocked = false;
        }

        if (maxReached >= exercises.length - 1) {
            isLocked = false;
        }

        return {
            ...m,
            locked: isLocked,
            active: isStarted && !isPast,
            completed: isPast,
            levels: m.count
        };
    });

    const currentLevel = exercises[levelIndex];

    // Calculate Relative Progress
    const currentModule = modules.find(m => m.active) || modules[0] || { startIndex: 0, count: 1, title: '...' };
    const relativeLevel = levelIndex - currentModule.startIndex + 1;

    const handleLevelComplete = () => {
        const nextLevel = levelIndex + 1;
        if (nextLevel > maxReached) {
            setMaxReached(nextLevel);
            localStorage.setItem('mathQuest_maxLevel', nextLevel.toString());
        }

        // Only continue if next level belongs to the same subject
        if (levelIndex < exercises.length - 1 && exercises[nextLevel].subject === selectedSubject) {
            setLevelIndex(nextLevel);
        } else {
            setGameState('won');
        }
    };

    const handlePrevLevel = () => {
        if (levelIndex > 0 && exercises[levelIndex - 1].subject === selectedSubject) {
            setLevelIndex(prev => prev - 1);
            setGameState('playing');
        }
    };

    const handleNextLevel = () => {
        if (levelIndex < maxReached && levelIndex < exercises.length - 1 && exercises[levelIndex + 1].subject === selectedSubject) {
            setLevelIndex(prev => prev + 1);
            setGameState('playing');
        }
    };

    const startGame = () => {
        setGameState('playing');
    };

    const selectSubject = (subject) => {
        setSelectedSubject(subject);
        setGameState('menu');
        const firstModule = subject === 'math' ? mathModules[0] : geographyModules[0];
        setLevelIndex(firstModule.startIndex);
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
                    {gameState === 'playing' && (
                        <>
                            <button
                                onClick={handlePrevLevel}
                                disabled={levelIndex === currentModule.startIndex}
                                style={{
                                    opacity: levelIndex === currentModule.startIndex ? 0.3 : 1,
                                    background: 'none', border: 'none', color: 'white', cursor: 'pointer'
                                }}>
                                <BadgeChevronLeft />
                            </button>

                            <span style={{ fontSize: '1.2rem', minWidth: '80px', textAlign: 'center' }}>
                                Nivel {relativeLevel}
                            </span>

                            <button
                                onClick={handleNextLevel}
                                disabled={levelIndex >= maxReached || (levelIndex + 1 < exercises.length && exercises[levelIndex + 1].subject !== selectedSubject)}
                                style={{
                                    opacity: (levelIndex >= maxReached || (levelIndex + 1 < exercises.length && exercises[levelIndex + 1].subject !== selectedSubject)) ? 0.3 : 1,
                                    background: 'none', border: 'none', color: 'white', cursor: 'pointer'
                                }}>
                                <BadgeChevronRight />
                            </button>
                        </>
                    )}

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
                        alert('🚧 Este módulo está en construcción!');
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
                {gameState === 'subject-selection' ? (
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>¿Qué quieres aprender hoy?</h2>
                        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <button
                                onClick={() => selectSubject('math')}
                                className="glass-panel hover-scale"
                                style={{
                                    padding: '2rem', width: '220px', textAlign: 'center',
                                    background: 'rgba(255, 51, 102, 0.1)', cursor: 'pointer', border: 'none'
                                }}
                            >
                                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🍕</div>
                                <h3 style={{ fontSize: '1.5rem', color: 'var(--color-primary)' }}>Matemáticas</h3>
                            </button>
                            <button
                                onClick={() => selectSubject('geography')}
                                className="glass-panel hover-scale"
                                style={{
                                    padding: '2rem', width: '220px', textAlign: 'center',
                                    background: 'rgba(0, 229, 255, 0.1)', cursor: 'pointer', border: 'none'
                                }}
                            >
                                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🌎</div>
                                <h3 style={{ fontSize: '1.5rem', color: 'var(--color-secondary)' }}>Geografía</h3>
                            </button>
                        </div>
                    </div>
                ) : gameState === 'menu' ? (
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                            {selectedSubject === 'math' ? 'Aventura Matemática' : 'Exploración Geográfica'}
                        </h2>
                        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-dim)', marginBottom: '2rem' }}>
                            {selectedSubject === 'math'
                                ? '¡Domina las fracciones y diviértete!'
                                : '¡Conoce las capitales de todo el continente!'}
                        </p>
                        <button
                            onClick={startGame}
                            style={{
                                background: selectedSubject === 'math' ? 'var(--color-primary)' : 'var(--color-secondary)',
                                color: selectedSubject === 'math' ? 'white' : 'var(--color-bg-deep)',
                                padding: '1rem 3rem',
                                fontSize: '1.5rem',
                                borderRadius: 'var(--radius-md)',
                                boxShadow: '0 4px 15px rgba(255, 51, 102, 0.4)'
                            }}>
                            ¡Comenzar!
                        </button>
                        <button
                            onClick={() => setGameState('subject-selection')}
                            style={{ display: 'block', margin: '2rem auto 0', background: 'none', color: 'var(--color-text-dim)', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                            Volver a selección de materia
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
                        ) : currentLevel.type === 'geography' ? (
                            <GeographyStage
                                key={currentLevel.id}
                                onComplete={handleLevelComplete}
                                country={currentLevel.country}
                                code={currentLevel.code}
                                capital={currentLevel.capital}
                                options={currentLevel.options}
                                instruction={currentLevel.instruction}
                            />
                        ) : currentLevel.type === 'geography-input' ? (
                            <GeographyInputStage
                                key={currentLevel.id}
                                onComplete={handleLevelComplete}
                                country={currentLevel.country}
                                code={currentLevel.code}
                                capital={currentLevel.capital}
                                instruction={currentLevel.instruction}
                            />
                        ) : null}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center' }} className="animate-pop">
                        <h2 style={{ fontSize: '3rem', color: 'var(--color-success)', marginBottom: '1rem' }}>¡Lo lograste!</h2>
                        <p style={{ marginBottom: '2rem', fontSize: '1.2rem' }}>Has completado todos los niveles de {selectedSubject === 'math' ? 'Matemáticas' : 'Geografía'}.</p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <button onClick={() => setGameState('playing')} style={{
                                background: 'var(--color-secondary)',
                                color: 'var(--color-bg-deep)',
                                padding: '1rem 2rem',
                                borderRadius: 'var(--radius-md)',
                                fontSize: '1.1rem'
                            }}>Repetir niveles</button>
                            <button onClick={() => setGameState('subject-selection')} style={{
                                background: 'var(--color-primary)',
                                color: 'white',
                                padding: '1rem 2rem',
                                borderRadius: 'var(--radius-md)',
                                fontSize: '1.1rem'
                            }}>Elegir otra materia</button>
                        </div>
                    </div>
                )}

                <div id="instruction-toast" className="glass-panel hidden" style={{
                    position: 'fixed', bottom: '10px', right: '10px', left: 'auto', transform: 'none',
                    padding: '0.5rem 1rem', background: 'rgba(255, 51, 102, 0.9)', color: 'white',
                    zIndex: 2000, pointerEvents: 'none', borderRadius: '25px', fontSize: '0.9rem'
                }}>
                    👆 ¡Interactúa!
                </div>
            </main>
        </div>
    );
}

export default App;
