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
    // MODULE 6: GEOGRAPHY - CAPITALS (Drag & Drop Only)
    { id: 1001, subject: 'geography', module: 'geography-capitals', type: 'geography', country: 'Canadá', capital: 'Ottawa', options: ['Toronto', 'Montreal', 'Vancouver', 'Ottawa'], instruction: '¿Cuál es la capital de Canadá?' },
    { id: 1002, subject: 'geography', module: 'geography-capitals', type: 'geography', country: 'Estados Unidos', capital: 'Washington D.C.', options: ['New York', 'Washington D.C.', 'Los Angeles', 'Chicago'], instruction: '¿Cuál es la capital de Estados Unidos?' },
    { id: 1003, subject: 'geography', module: 'geography-capitals', type: 'geography', country: 'México', capital: 'Ciudad de México', options: ['Guadalajara', 'Ciudad de México', 'Monterrey', 'Cancún'], instruction: '¿Cuál es la capital de México?' },
    { id: 1004, subject: 'geography', module: 'geography-capitals', type: 'geography', country: 'Belice', capital: 'Belmopán', options: ['Ciudad de Belice', 'San Ignacio', 'Belmopán', 'Orange Walk'], instruction: '¿Cuál es la capital de Belice?' },
    { id: 1005, subject: 'geography', module: 'geography-capitals', type: 'geography', country: 'Guatemala', capital: 'Ciudad de Guatemala', options: ['Antigua', 'Ciudad de Guatemala', 'Quetzaltenango', 'Tikal'], instruction: '¿Cuál es la capital de Guatemala?' },
    { id: 1006, subject: 'geography', module: 'geography-capitals', type: 'geography', country: 'El Salvador', capital: 'San Salvador', options: ['Santa Ana', 'San Salvador', 'San Miguel', 'Sonsonate'], instruction: '¿Cuál es la capital de El Salvador?' },
    { id: 1007, subject: 'geography', module: 'geography-capitals', type: 'geography', country: 'Honduras', capital: 'Tegucigalpa', options: ['San Pedro Sula', 'Tegucigalpa', 'La Ceiba', 'Tela'], instruction: '¿Cuál es la capital de Honduras?' },
    { id: 1008, subject: 'geography', module: 'geography-capitals', type: 'geography', country: 'Nicaragua', capital: 'Managua', options: ['León', 'Granada', 'Managua', 'Masaya'], instruction: '¿Cuál es la capital de Nicaragua?' },
    { id: 1009, subject: 'geography', module: 'geography-capitals', type: 'geography', country: 'Costa Rica', capital: 'San José', options: ['Alajuela', 'Heredia', 'San José', 'Liberia'], instruction: '¿Cuál es la capital de Costa Rica?' },
    { id: 1010, subject: 'geography', module: 'geography-capitals', type: 'geography', country: 'Panamá', capital: 'Ciudad de Panamá', options: ['Colón', 'David', 'Ciudad de Panamá', 'Chitré'], instruction: '¿Cuál es la capital de Panamá?' },
    { id: 1011, subject: 'geography', module: 'geography-capitals', type: 'geography', country: 'Colombia', capital: 'Bogotá', options: ['Medellín', 'Cali', 'Bogotá', 'Barranquilla'], instruction: '¿Cuál es la capital de Colombia?' },
    { id: 1012, subject: 'geography', module: 'geography-capitals', type: 'geography', country: 'Venezuela', capital: 'Caracas', options: ['Maracaibo', 'Valencia', 'Caracas', 'Barquisimeto'], instruction: '¿Cuál es la capital de Venezuela?' },
    { id: 1013, subject: 'geography', module: 'geography-capitals', type: 'geography', country: 'Guyana', capital: 'Georgetown', options: ['Linden', 'New Amsterdam', 'Georgetown', 'Bartica'], instruction: '¿Cuál es la capital de Guyana?' },
    { id: 1014, subject: 'geography', module: 'geography-capitals', type: 'geography', country: 'Surinam', capital: 'Paramaribo', options: ['Lelydorp', 'Nieuw Nickerie', 'Paramaribo', 'Moengo'], instruction: '¿Cuál es la capital de Surinam?' },
    { id: 1015, subject: 'geography', module: 'geography-capitals', type: 'geography', country: 'Ecuador', capital: 'Quito', options: ['Guayaquil', 'Cuenca', 'Quito', 'Manta'], instruction: '¿Cuál es la capital de Ecuador?' },
    { id: 1016, subject: 'geography', module: 'geography-capitals', type: 'geography', country: 'Perú', capital: 'Lima', options: ['Arequipa', 'Trujillo', 'Lima', 'Cusco'], instruction: '¿Cuál es la capital de Perú?' },
    { id: 1017, subject: 'geography', module: 'geography-capitals', type: 'geography', country: 'Brasil', capital: 'Brasilia', options: ['Río de Janeiro', 'São Paulo', 'Brasilia', 'Salvador'], instruction: '¿Cuál es la capital de Brasil?' },
    { id: 1018, subject: 'geography', module: 'geography-capitals', type: 'geography', country: 'Bolivia', capital: 'Sucre', options: ['La Paz', 'Santa Cruz', 'Sucre', 'Cochabamba'], instruction: '¿Cuál es la capital de Bolivia?' },
    { id: 1019, subject: 'geography', module: 'geography-capitals', type: 'geography', country: 'Paraguay', capital: 'Asunción', options: ['Ciudad del Este', 'Encarnación', 'Asunción', 'Luque'], instruction: '¿Cuál es la capital de Paraguay?' },
    { id: 1020, subject: 'geography', module: 'geography-capitals', type: 'geography', country: 'Chile', capital: 'Santiago', options: ['Valparaíso', 'Concepción', 'Santiago', 'Viña del Mar'], instruction: '¿Cuál es la capital de Chile?' },
    { id: 1021, subject: 'geography', module: 'geography-capitals', type: 'geography', country: 'Argentina', capital: 'Buenos Aires', options: ['Córdoba', 'Rosario', 'Buenos Aires', 'Mendoza'], instruction: '¿Cuál es la capital de Argentina?' },
    { id: 1022, subject: 'geography', module: 'geography-capitals', type: 'geography', country: 'Uruguay', capital: 'Montevideo', options: ['Salto', 'Paysandú', 'Montevideo', 'Maldonado'], instruction: '¿Cuál es la capital de Uruguay?' },
    { id: 1023, subject: 'geography', module: 'geography-capitals', type: 'geography', country: 'Cuba', capital: 'La Habana', options: ['Santiago de Cuba', 'Camagüey', 'La Habana', 'Holguín'], instruction: '¿Cuál es la capital de Cuba?' },
    { id: 1024, subject: 'geography', module: 'geography-capitals', type: 'geography', country: 'Puerto Rico', capital: 'San Juan', options: ['Bayamón', 'Carolina', 'San Juan', 'Ponce'], instruction: '¿Cuál es la capital de Puerto Rico?' },
    { id: 1025, subject: 'geography', module: 'geography-capitals', type: 'geography', country: 'República Dominicana', capital: 'Santo Domingo', options: ['Santiago', 'La Romana', 'Santo Domingo', 'Punta Cana'], instruction: '¿Cuál es la capital de República Dominicana?' },
];
