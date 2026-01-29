export const exercises = [
    // Level 1-10: Concrete (Pizza Slices)
    { id: 1, type: 'concrete', fraction: '1/2', numerator: 1, denominator: 2, instruction: '¡Haz 1/2 de Pizza!', targetCount: 2, totalSlices: 4 },
    { id: 2, type: 'concrete', fraction: '1/4', numerator: 1, denominator: 4, instruction: '¡Haz 1/4 de Pizza!', targetCount: 1, totalSlices: 4 },
    { id: 3, type: 'concrete', fraction: '3/4', numerator: 3, denominator: 4, instruction: '¡Haz 3/4 de Pizza!', targetCount: 3, totalSlices: 4 },
    { id: 4, type: 'concrete', fraction: '2/4', numerator: 2, denominator: 4, instruction: '¡Haz 2/4 de Pizza!', targetCount: 2, totalSlices: 4 },
    { id: 5, type: 'concrete', fraction: '4/4', numerator: 4, denominator: 4, instruction: '¡Haz una Pizza entera (4/4)!', targetCount: 4, totalSlices: 4 },
    { id: 6, type: 'concrete', fraction: '1/2', numerator: 1, denominator: 2, instruction: '¡Haz 1/2 de Pizza!', targetCount: 4, totalSlices: 8 }, // Harder: 4/8
    { id: 7, type: 'concrete', fraction: '1/8', numerator: 1, denominator: 8, instruction: '¡Haz 1/8 de Pizza!', targetCount: 1, totalSlices: 8 },
    { id: 8, type: 'concrete', fraction: '3/8', numerator: 3, denominator: 8, instruction: '¡Haz 3/8 de Pizza!', targetCount: 3, totalSlices: 8 },
    { id: 9, type: 'concrete', fraction: '5/8', numerator: 5, denominator: 8, instruction: '¡Haz 5/8 de Pizza!', targetCount: 5, totalSlices: 8 },
    { id: 10, type: 'concrete', fraction: '8/8', numerator: 8, denominator: 8, instruction: '¡Pizza gigante completa (8/8)!', targetCount: 8, totalSlices: 8 },

    // Level 11-20: Pictorial (Visual Matching)
    { id: 11, type: 'pictorial', fraction: '1/2', numerator: 1, denominator: 2, instruction: '¿Cuál muestra 1/2?' },
    { id: 12, type: 'pictorial', fraction: '1/4', numerator: 1, denominator: 4, instruction: '¿Cuál muestra 1/4?' },
    { id: 13, type: 'pictorial', fraction: '3/4', numerator: 3, denominator: 4, instruction: '¿Cuál muestra 3/4?' },
    { id: 14, type: 'pictorial', fraction: '1/3', numerator: 1, denominator: 3, instruction: '¿Cuál muestra 1/3?' },
    { id: 15, type: 'pictorial', fraction: '2/3', numerator: 2, denominator: 3, instruction: '¿Cuál muestra 2/3?' },
    { id: 16, type: 'pictorial', fraction: '1/5', numerator: 1, denominator: 5, instruction: '¿Cuál muestra 1/5?' },
    { id: 17, type: 'pictorial', fraction: '2/5', numerator: 2, denominator: 5, instruction: '¿Cuál muestra 2/5?' },
    { id: 18, type: 'pictorial', fraction: '3/5', numerator: 3, denominator: 5, instruction: '¿Cuál muestra 3/5?' },
    { id: 19, type: 'pictorial', fraction: '4/5', numerator: 4, denominator: 5, instruction: '¿Cuál muestra 4/5?' },
    { id: 20, type: 'pictorial', fraction: '5/5', numerator: 5, denominator: 5, instruction: '¿Cuál muestra un entero (5/5)?' },

    // Level 21-30: Abstract (Number Matching)
    { id: 21, type: 'abstract', fraction: '1/2', numerator: 1, denominator: 2, instruction: '¿Qué fracción es esta?' },
    { id: 22, type: 'abstract', fraction: '1/4', numerator: 1, denominator: 4, instruction: '¿Qué fracción es esta?' },
    { id: 23, type: 'abstract', fraction: '3/4', numerator: 3, denominator: 4, instruction: '¿Qué fracción es esta?' },
    { id: 24, type: 'abstract', fraction: '1/3', numerator: 1, denominator: 3, instruction: '¿Qué fracción es esta?' },
    { id: 25, type: 'abstract', fraction: '2/3', numerator: 2, denominator: 3, instruction: '¿Qué fracción es esta?' },
    { id: 26, type: 'abstract', fraction: '1/8', numerator: 1, denominator: 8, instruction: '¿Qué fracción es esta?' },
    { id: 27, type: 'abstract', fraction: '3/8', numerator: 3, denominator: 8, instruction: '¿Qué fracción es esta?' },
    { id: 28, type: 'abstract', fraction: '5/8', numerator: 5, denominator: 8, instruction: '¿Qué fracción es esta?' },
    { id: 29, type: 'abstract', fraction: '1/10', numerator: 1, denominator: 10, instruction: '¿Qué fracción es esta?' },
    { id: 30, type: 'abstract', fraction: '7/10', numerator: 7, denominator: 10, instruction: '¿Qué fracción es esta?' },

    // MODULE 2: EQUIVALENT FRACTIONS (Levels 101-130)

    // Concrete Equivalence: Build same amount with different slices
    { id: 101, module: 'equivalence', type: 'concrete', targetFraction: '1/2', userFraction: '2/4', instruction: 'Haz una pizza igual a 1/2 usan cuartos (1/4)', shape: 'circle' },
    { id: 102, module: 'equivalence', type: 'concrete', targetFraction: '1/2', userFraction: '3/6', instruction: 'Haz una barra igual a 1/2 usando sextos (1/6)', shape: 'bar' },
    { id: 103, module: 'equivalence', type: 'concrete', targetFraction: '1/2', userFraction: '4/8', instruction: 'Haz una pizza igual a 1/2 usando octavos (1/8)', shape: 'circle' },
    { id: 104, module: 'equivalence', type: 'concrete', targetFraction: '1/3', userFraction: '2/6', instruction: 'Haz una barra igual a 1/3 usando sextos (1/6)', shape: 'bar' },
    { id: 105, module: 'equivalence', type: 'concrete', targetFraction: '2/3', userFraction: '4/6', instruction: 'Haz una pizza igual a 2/3 usando sextos (1/6)', shape: 'circle' },
    { id: 106, module: 'equivalence', type: 'concrete', targetFraction: '1/4', userFraction: '2/8', instruction: 'Haz una barra igual a 1/4 usando octavos (1/8)', shape: 'bar' },
    { id: 107, module: 'equivalence', type: 'concrete', targetFraction: '3/4', userFraction: '6/8', instruction: 'Haz una pizza igual a 3/4 usando octavos (1/8)', shape: 'circle' },
    { id: 108, module: 'equivalence', type: 'concrete', targetFraction: '1/5', userFraction: '2/10', instruction: 'Haz una barra igual a 1/5 usando décimos (1/10)', shape: 'bar' },
    { id: 109, module: 'equivalence', type: 'concrete', targetFraction: '2/5', userFraction: '4/10', instruction: 'Haz una pizza igual a 2/5 usando décimos (1/10)', shape: 'circle' },
    { id: 110, module: 'equivalence', type: 'concrete', targetFraction: '1/1', userFraction: '2/2', instruction: 'Haz un entero (1) usando medios (1/2)', shape: 'bar' },

    // Pictorial Equivalence: Match Images (TODO: Update PictorialStage to handle comparison logic if needed, or reuse concrete by hiding logic)
    // For now we reuse 'concrete' logic in EquivalenceStage but we will make it look cleaner
    { id: 111, module: 'equivalence', type: 'concrete', targetFraction: '1/2', userFraction: '2/4', instruction: 'Iguala la fracción: 1/2 = ?/4' },
    { id: 112, module: 'equivalence', type: 'concrete', targetFraction: '1/3', userFraction: '3/9', instruction: 'Iguala la fracción: 1/3 = ?/9' },
    { id: 113, module: 'equivalence', type: 'concrete', targetFraction: '3/4', userFraction: '12/16', instruction: 'Iguala la fracción: 3/4 = ?/16' }, // Higher complexity
    { id: 114, module: 'equivalence', type: 'concrete', targetFraction: '2/3', userFraction: '8/12', instruction: 'Iguala la fracción: 2/3 = ?/12' },
    { id: 115, module: 'equivalence', type: 'concrete', targetFraction: '1/2', userFraction: '5/10', instruction: 'Iguala la fracción: 1/2 = ?/10' },
    { id: 116, module: 'equivalence', type: 'concrete', targetFraction: '4/5', userFraction: '8/10', instruction: 'Iguala la fracción: 4/5 = ?/10' },
    { id: 117, module: 'equivalence', type: 'concrete', targetFraction: '1/6', userFraction: '2/12', instruction: 'Iguala la fracción: 1/6 = ?/12' },
    { id: 118, module: 'equivalence', type: 'concrete', targetFraction: '5/6', userFraction: '10/12', instruction: 'Iguala la fracción: 5/6 = ?/12' },
    { id: 119, module: 'equivalence', type: 'concrete', targetFraction: '3/8', userFraction: '6/16', instruction: 'Iguala la fracción: 3/8 = ?/16' },
    { id: 120, module: 'equivalence', type: 'concrete', targetFraction: '1/1', userFraction: '4/4', instruction: 'Iguala la fracción: 1/1 = ?/4' },

    // Abstract Equivalence (Same mechanic visually for now to teach the concept)
    { id: 121, module: 'equivalence', type: 'concrete', targetFraction: '1/2', userFraction: '50/100', instruction: '1/2 es igual a 50/100' },
    { id: 122, module: 'equivalence', type: 'concrete', targetFraction: '1/4', userFraction: '25/100', instruction: '1/4 es igual a 25/100' },
    { id: 123, module: 'equivalence', type: 'concrete', targetFraction: '3/4', userFraction: '75/100', instruction: '3/4 es igual a 75/100' },
    { id: 124, module: 'equivalence', type: 'concrete', targetFraction: '1/5', userFraction: '20/100', instruction: '1/5 es igual a 20/100' },
    { id: 125, module: 'equivalence', type: 'concrete', targetFraction: '2/5', userFraction: '40/100', instruction: '2/5 es igual a 40/100' },
    { id: 126, module: 'equivalence', type: 'concrete', targetFraction: '1/10', userFraction: '10/100', instruction: '1/10 es igual a 10/100' },
    { id: 127, module: 'equivalence', type: 'concrete', targetFraction: '1/2', userFraction: '4/8', instruction: '¿Cuántos octavos son medio?' },
    { id: 128, module: 'equivalence', type: 'concrete', targetFraction: '1/3', userFraction: '2/6', instruction: '¿Cuántos sextos son un tercio?' },
    { id: 129, module: 'equivalence', type: 'concrete', targetFraction: '2/3', userFraction: '4/6', instruction: '¿Cuántos sextos son dos tercios?' },
    { id: 130, module: 'equivalence', type: 'concrete', targetFraction: '3/3', userFraction: '9/9', instruction: '3/3 es igual a 9/9' },

    // MODULE 3: BASIC OPERATIONS (Sum Same Denom) (Levels 201-230)
    { id: 201, module: 'sum-same', type: 'operation', operation: 'add', operand1: '1/4', operand2: '2/4', result: '3/4', instruction: 'Suma: 1/4 + 2/4' },
    { id: 202, module: 'sum-same', type: 'operation', operation: 'add', operand1: '1/3', operand2: '1/3', result: '2/3', instruction: 'Suma: 1/3 + 1/3' },
    { id: 203, module: 'sum-same', type: 'operation', operation: 'add', operand1: '2/5', operand2: '1/5', result: '3/5', instruction: 'Suma: 2/5 + 1/5' },
    { id: 204, module: 'sum-same', type: 'operation', operation: 'add', operand1: '3/8', operand2: '2/8', result: '5/8', instruction: 'Suma: 3/8 + 2/8' },
    { id: 205, module: 'sum-same', type: 'operation', operation: 'add', operand1: '1/6', operand2: '4/6', result: '5/6', instruction: 'Suma: 1/6 + 4/6' },
    { id: 206, module: 'sum-same', type: 'operation', operation: 'add', operand1: '2/4', operand2: '2/4', result: '4/4', instruction: 'Suma: 2/4 + 2/4' },
    { id: 207, module: 'sum-same', type: 'operation', operation: 'add', operand1: '3/10', operand2: '4/10', result: '7/10', instruction: 'Suma: 3/10 + 4/10' },
    { id: 208, module: 'sum-same', type: 'operation', operation: 'add', operand1: '1/2', operand2: '1/2', result: '2/2', instruction: 'Suma: 1/2 + 1/2' },
    { id: 209, module: 'sum-same', type: 'operation', operation: 'add', operand1: '1/5', operand2: '3/5', result: '4/5', instruction: 'Suma: 1/5 + 3/5' },
    { id: 210, module: 'sum-same', type: 'operation', operation: 'add', operand1: '4/8', operand2: '3/8', result: '7/8', instruction: 'Suma: 4/8 + 3/8' },

    // MODULE 4: COMMON DENOMINATOR (Levels 301-330)
    { id: 301, module: 'common-denom', type: 'common-denom', fraction1: '1/2', fraction2: '1/4', instruction: 'Busca un denominador común para 1/2 y 1/4' },
    { id: 302, module: 'common-denom', type: 'common-denom', fraction1: '1/2', fraction2: '1/3', instruction: 'Busca un denominador común para 1/2 y 1/3' },
    { id: 303, module: 'common-denom', type: 'common-denom', fraction1: '1/3', fraction2: '1/4', instruction: 'Busca un denominador común para 1/3 y 1/4' },
    { id: 304, module: 'common-denom', type: 'common-denom', fraction1: '1/2', fraction2: '1/5', instruction: 'Busca un denominador común para 1/2 y 1/5' },
    { id: 305, module: 'common-denom', type: 'common-denom', fraction1: '1/3', fraction2: '1/6', instruction: 'Busca un denominador común para 1/3 y 1/6' },
    { id: 306, module: 'common-denom', type: 'common-denom', fraction1: '1/4', fraction2: '1/8', instruction: 'Busca un denominador común para 1/4 y 1/8' },
    { id: 307, module: 'common-denom', type: 'common-denom', fraction1: '1/2', fraction2: '1/6', instruction: 'Busca un denominador común para 1/2 y 1/6' },
    { id: 308, module: 'common-denom', type: 'common-denom', fraction1: '1/3', fraction2: '1/5', instruction: 'Busca un denominador común para 1/3 y 1/5' },
    { id: 309, module: 'common-denom', type: 'common-denom', fraction1: '1/4', fraction2: '1/5', instruction: 'Busca un denominador común para 1/4 y 1/5' },
    { id: 310, module: 'common-denom', type: 'common-denom', fraction1: '1/2', fraction2: '1/8', instruction: 'Busca un denominador común para 1/2 y 1/8' },

    // MODULE 5: ADVANCED OPERATIONS (Diff Denom) (Levels 401-430)
    { id: 401, module: 'sum-diff', type: 'advanced-operation', operand1: '1/2', operand2: '1/4', result: '3/4', instruction: 'Suma: 1/2 + 1/4' },
    { id: 402, module: 'sum-diff', type: 'advanced-operation', operand1: '1/3', operand2: '1/6', result: '3/6', instruction: 'Suma: 1/3 + 1/6' },
    { id: 403, module: 'sum-diff', type: 'advanced-operation', operand1: '1/2', operand2: '1/3', result: '5/6', instruction: 'Suma: 1/2 + 1/3' },
    { id: 404, module: 'sum-diff', type: 'advanced-operation', operand1: '1/4', operand2: '1/8', result: '3/8', instruction: 'Suma: 1/4 + 1/8' },
    { id: 405, module: 'sum-diff', type: 'advanced-operation', operand1: '1/2', operand2: '1/6', result: '4/6', instruction: 'Suma: 1/2 + 1/6' },
    { id: 406, module: 'sum-diff', type: 'advanced-operation', operand1: '1/3', operand2: '1/4', result: '7/12', instruction: 'Suma: 1/3 + 1/4' },
    { id: 407, module: 'sum-diff', type: 'advanced-operation', operand1: '1/5', operand2: '1/2', result: '7/10', instruction: 'Suma: 1/5 + 1/2' },
    { id: 408, module: 'sum-diff', type: 'advanced-operation', operand1: '1/2', operand2: '2/5', result: '9/10', instruction: 'Suma: 1/2 + 2/5' },
    { id: 409, module: 'sum-diff', type: 'advanced-operation', operand1: '1/4', operand2: '3/8', result: '5/8', instruction: 'Suma: 1/4 + 3/8' },
    { id: 410, module: 'sum-diff', type: 'advanced-operation', operand1: '1/3', operand2: '2/6', result: '4/6', instruction: 'Suma: 1/3 + 2/6' },
];
