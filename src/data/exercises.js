export const exercises = [
    // MATH SUBJECT
    // Level 1-10: Concrete (Pizza Slices)
    { id: 1, subject: 'math', module: 'math-basic', type: 'concrete', fraction: '1/2', numerator: 1, denominator: 2, instruction: '¡Haz 1/2 de Pizza!', targetCount: 2, totalSlices: 4 },
    { id: 2, subject: 'math', module: 'math-basic', type: 'concrete', fraction: '1/4', numerator: 1, denominator: 4, instruction: '¡Haz 1/4 de Pizza!', targetCount: 1, totalSlices: 4 },
    { id: 3, subject: 'math', module: 'math-basic', type: 'concrete', fraction: '3/4', numerator: 3, denominator: 4, instruction: '¡Haz 3/4 de Pizza!', targetCount: 3, totalSlices: 4 },
    { id: 4, subject: 'math', module: 'math-basic', type: 'concrete', fraction: '2/4', numerator: 2, denominator: 4, instruction: '¡Haz 2/4 de Pizza!', targetCount: 2, totalSlices: 4 },
    { id: 5, subject: 'math', module: 'math-basic', type: 'concrete', fraction: '4/4', numerator: 4, denominator: 4, instruction: '¡Haz una Pizza entera (4/4)!', targetCount: 4, totalSlices: 4 },
    { id: 6, subject: 'math', module: 'math-basic', type: 'concrete', fraction: '1/2', numerator: 1, denominator: 2, instruction: '¡Haz 1/2 de Pizza!', targetCount: 4, totalSlices: 8 },
    { id: 7, subject: 'math', module: 'math-basic', type: 'concrete', fraction: '1/8', numerator: 1, denominator: 8, instruction: '¡Haz 1/8 de Pizza!', targetCount: 1, totalSlices: 8 },
    { id: 8, subject: 'math', module: 'math-basic', type: 'concrete', fraction: '3/8', numerator: 3, denominator: 8, instruction: '¡Haz 3/8 de Pizza!', targetCount: 3, totalSlices: 8 },
    { id: 9, subject: 'math', module: 'math-basic', type: 'concrete', fraction: '5/8', numerator: 5, denominator: 8, instruction: '¡Haz 5/8 de Pizza!', targetCount: 5, totalSlices: 8 },
    { id: 10, subject: 'math', module: 'math-basic', type: 'concrete', fraction: '8/8', numerator: 8, denominator: 8, instruction: '¡Pizza gigante completa (8/8)!', targetCount: 8, totalSlices: 8 },

    // Level 11-20: Pictorial (Visual Matching)
    { id: 11, subject: 'math', module: 'math-basic', type: 'pictorial', fraction: '1/2', numerator: 1, denominator: 2, instruction: '¿Cuál muestra 1/2?' },
    { id: 12, subject: 'math', module: 'math-basic', type: 'pictorial', fraction: '1/4', numerator: 1, denominator: 4, instruction: '¿Cuál muestra 1/4?' },
    { id: 13, subject: 'math', module: 'math-basic', type: 'pictorial', fraction: '3/4', numerator: 3, denominator: 4, instruction: '¿Cuál muestra 3/4?' },
    { id: 14, subject: 'math', module: 'math-basic', type: 'pictorial', fraction: '1/3', numerator: 1, denominator: 3, instruction: '¿Cuál muestra 1/3?' },
    { id: 15, subject: 'math', module: 'math-basic', type: 'pictorial', fraction: '2/3', numerator: 2, denominator: 3, instruction: '¿Cuál muestra 2/3?' },
    { id: 16, subject: 'math', module: 'math-basic', type: 'pictorial', fraction: '1/5', numerator: 1, denominator: 5, instruction: '¿Cuál muestra 1/5?' },
    { id: 17, subject: 'math', module: 'math-basic', type: 'pictorial', fraction: '2/5', numerator: 2, denominator: 5, instruction: '¿Cuál muestra 2/5?' },
    { id: 18, subject: 'math', module: 'math-basic', type: 'pictorial', fraction: '3/5', numerator: 3, denominator: 5, instruction: '¿Cuál muestra 3/5?' },
    { id: 19, subject: 'math', module: 'math-basic', type: 'pictorial', fraction: '4/5', numerator: 4, denominator: 5, instruction: '¿Cuál muestra 4/5?' },
    { id: 20, subject: 'math', module: 'math-basic', type: 'pictorial', fraction: '5/5', numerator: 5, denominator: 5, instruction: '¿Cuál muestra un entero (5/5)?' },

    // Level 21-30: Abstract (Number Matching)
    { id: 21, subject: 'math', module: 'math-basic', type: 'abstract', fraction: '1/2', numerator: 1, denominator: 2, instruction: '¿Qué fracción es esta?' },
    { id: 22, subject: 'math', module: 'math-basic', type: 'abstract', fraction: '1/4', numerator: 1, denominator: 4, instruction: '¿Qué fracción es esta?' },
    { id: 23, subject: 'math', module: 'math-basic', type: 'abstract', fraction: '3/4', numerator: 3, denominator: 4, instruction: '¿Qué fracción es esta?' },
    { id: 24, subject: 'math', module: 'math-basic', type: 'abstract', fraction: '1/3', numerator: 1, denominator: 3, instruction: '¿Qué fracción es esta?' },
    { id: 25, subject: 'math', module: 'math-basic', type: 'abstract', fraction: '2/3', numerator: 2, denominator: 3, instruction: '¿Qué fracción es esta?' },
    { id: 26, subject: 'math', module: 'math-basic', type: 'abstract', fraction: '1/8', numerator: 1, denominator: 8, instruction: '¿Qué fracción es esta?' },
    { id: 27, subject: 'math', module: 'math-basic', type: 'abstract', fraction: '3/8', numerator: 3, denominator: 8, instruction: '¿Qué fracción es esta?' },
    { id: 28, subject: 'math', module: 'math-basic', type: 'abstract', fraction: '5/8', numerator: 5, denominator: 8, instruction: '¿Qué fracción es esta?' },
    { id: 29, subject: 'math', module: 'math-basic', type: 'abstract', fraction: '1/10', numerator: 1, denominator: 10, instruction: '¿Qué fracción es esta?' },
    { id: 30, subject: 'math', module: 'math-basic', type: 'abstract', fraction: '7/10', numerator: 7, denominator: 10, instruction: '¿Qué fracción es esta?' },

    { id: 101, subject: 'math', module: 'equivalence', type: 'concrete', targetFraction: '1/2', userFraction: '2/4', instruction: 'Haz una pizza igual a 1/2 usan cuartos (1/4)', shape: 'circle' },
    { id: 102, subject: 'math', module: 'equivalence', type: 'concrete', targetFraction: '1/2', userFraction: '3/6', instruction: 'Haz una barra igual a 1/2 usando sextos (1/6)', shape: 'bar' },
    { id: 111, subject: 'math', module: 'equivalence', type: 'concrete', targetFraction: '1/2', userFraction: '2/4', instruction: 'Iguala la fracción: 1/2 = ?/4' },

    { id: 201, subject: 'math', module: 'sum-same', type: 'operation', operation: 'add', operand1: '1/4', operand2: '2/4', result: '3/4', instruction: 'Suma: 1/4 + 2/4' },

    { id: 301, subject: 'math', module: 'common-denom', type: 'common-denom', fraction1: '1/2', fraction2: '1/4', instruction: 'Busca un denominador común para 1/2 y 1/4' },

    { id: 401, subject: 'math', module: 'sum-diff', type: 'advanced-operation', operand1: '1/2', operand2: '1/4', result: '3/4', instruction: 'Suma: 1/2 + 1/4' },

    // GEOGRAPHY SUBJECT
    // MODULE 6: GEOGRAPHY - DRAG & DROP (Levels 1001-1010)
    { id: 1001, subject: 'geography', module: 'geography-capitals', type: 'geography', country: 'Argentina', capital: 'Buenos Aires', options: ['Buenos Aires', 'Santiago', 'Montevideo', 'Lima'], instruction: '¿Cuál es la capital de Argentina?' },
    { id: 1002, subject: 'geography', module: 'geography-capitals', type: 'geography', country: 'Brasil', capital: 'Brasilia', options: ['Río de Janeiro', 'Brasilia', 'São Paulo', 'Bogotá'], instruction: '¿Cuál es la capital de Brasil?' },
    { id: 1003, subject: 'geography', module: 'geography-capitals', type: 'geography', country: 'Chile', capital: 'Santiago', options: ['Santiago', 'Quito', 'Lima', 'Asunción'], instruction: '¿Cuál es la capital de Chile?' },
    { id: 1004, subject: 'geography', module: 'geography-capitals', type: 'geography', country: 'Colombia', capital: 'Bogotá', options: ['Caracas', 'Bogotá', 'Medellín', 'Quito'], instruction: '¿Cuál es la capital de Colombia?' },
    { id: 1005, subject: 'geography', module: 'geography-capitals', type: 'geography', country: 'México', capital: 'Ciudad de México', options: ['Guadalajara', 'Ciudad de México', 'Monterrey', 'Cancún'], instruction: '¿Cuál es la capital de México?' },
    { id: 1006, subject: 'geography', module: 'geography-capitals', type: 'geography', country: 'Perú', capital: 'Lima', options: ['Cusco', 'Arequipa', 'Lima', 'Quito'], instruction: '¿Cuál es la capital de Perú?' },
    { id: 1007, subject: 'geography', module: 'geography-capitals', type: 'geography', country: 'Uruguay', capital: 'Montevideo', options: ['Punta del Este', 'Montevideo', 'Buenos Aires', 'Rosario'], instruction: '¿Cuál es la capital de Uruguay?' },
    { id: 1008, subject: 'geography', module: 'geography-capitals', type: 'geography', country: 'Venezuela', capital: 'Caracas', options: ['Maracaibo', 'Caracas', 'Valencia', 'Bogotá'], instruction: '¿Cuál es la capital de Venezuela?' },
    { id: 1009, subject: 'geography', module: 'geography-capitals', type: 'geography', country: 'Canadá', capital: 'Ottawa', options: ['Toronto', 'Montreal', 'Vancouver', 'Ottawa'], instruction: '¿Cuál es la capital de Canadá?' },
    { id: 1010, subject: 'geography', module: 'geography-capitals', type: 'geography', country: 'Estados Unidos', capital: 'Washington D.C.', options: ['New York', 'Washington D.C.', 'Los Angeles', 'Chicago'], instruction: '¿Cuál es la capital de Estados Unidos?' },

    // MODULE 7: GEOGRAPHY - QUIZ MODE (Levels 2001-2010)
    { id: 2001, subject: 'geography', module: 'geography-quiz', type: 'geography-quiz', country: 'Ecuador', capital: 'Quito', options: ['Guayaquil', 'Quito', 'Cuenca', 'Manta'], instruction: '¡Trivia Pro! Capital de Ecuador:' },
    { id: 2002, subject: 'geography', module: 'geography-quiz', type: 'geography-quiz', country: 'Paraguay', capital: 'Asunción', options: ['Asunción', 'Encarnación', 'Villarrica', 'Pilar'], instruction: '¡Trivia Pro! Capital de Paraguay:' },
    { id: 2003, subject: 'geography', module: 'geography-quiz', type: 'geography-quiz', country: 'Bolivia', capital: 'Sucre', options: ['La Paz', 'Santa Cruz', 'Sucre', 'Oruro'], instruction: '¡Trivia Pro! Capital de Bolivia:' },
    { id: 2004, subject: 'geography', module: 'geography-quiz', type: 'geography-quiz', country: 'Costa Rica', capital: 'San José', options: ['Limón', 'San José', 'Cartago', 'Heredia'], instruction: '¡Trivia Pro! Capital de Costa Rica:' },
    { id: 2005, subject: 'geography', module: 'geography-quiz', type: 'geography-quiz', country: 'Cuba', capital: 'La Habana', options: ['Camagüey', 'Holguín', 'La Habana', 'Matanzas'], instruction: '¡Trivia Pro! Capital de Cuba:' },
    { id: 2006, subject: 'geography', module: 'geography-quiz', type: 'geography-quiz', country: 'República Dominicana', capital: 'Santo Domingo', options: ['Santo Domingo', 'La Romana', 'Santiago', 'Moca'], instruction: '¡Trivia Pro! Capital de R. Dominicana:' },
    { id: 2007, subject: 'geography', module: 'geography-quiz', type: 'geography-quiz', country: 'Guatemala', capital: 'Ciudad de Guatemala', options: ['Flores', 'Escuintla', 'Ciudad de Guatemala', 'Sololá'], instruction: '¡Trivia Pro! Capital de Guatemala:' },
    { id: 2008, subject: 'geography', module: 'geography-quiz', type: 'geography-quiz', country: 'Honduras', capital: 'Tegucigalpa', options: ['Tegucigalpa', 'Choluteca', 'La Paz', 'Yoro'], instruction: '¡Trivia Pro! Capital de Honduras:' },
    { id: 2009, subject: 'geography', module: 'geography-quiz', type: 'geography-quiz', country: 'Nicaragua', capital: 'Managua', options: ['Masaya', 'Managua', 'Estelí', 'Jinotega'], instruction: '¡Trivia Pro! Capital de Nicaragua:' },
    { id: 2010, subject: 'geography', module: 'geography-quiz', type: 'geography-quiz', country: 'Panamá', capital: 'Ciudad de Panamá', options: ['Santiago', 'Penonomé', 'Ciudad de Panamá', 'Las Tablas'], instruction: '¡Trivia Pro! Capital de Panamá:' },
];
