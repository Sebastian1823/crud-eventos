CREATE TABLE IF NOT EXISTS organizadores (
    id_organizador SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS eventos (
    id_evento SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    fecha DATE NOT NULL,
    afiche VARCHAR(255),
    id_organizador INTEGER NOT NULL
        REFERENCES organizadores(id_organizador)
        ON DELETE CASCADE
);

INSERT INTO organizadores (nombre, telefono) VALUES
    ('María López', '944123456'),
    ('Carlos Ramos', '955234567'),
    ('Lucía Mendoza', '966345678');

INSERT INTO eventos (titulo, fecha, id_organizador) VALUES
    ('Festival de Primavera', '2025-09-15', 1),
    ('Concierto Rock en Vivo', '2025-10-02', 2),
    ('Feria Gastronómica', '2025-11-20', 1),
    ('Expo Tecnología 2025', '2025-12-05', 3);
