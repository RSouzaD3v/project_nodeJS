import sql  from './db.js';

// sql`

// DROP TABLE IF EXISTS video;

// `.then(() => {
//     console.log('Tabela Apagada');
// })

sql`
CREATE TABLE videos (
    id TEXT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration INTEGER
);
`.then(() => {
    console.log('Tabela Criada');
});