-- ═══════════════════════════════════════════════════════════════════════════
--  EventosPro — Script de base de datos PostgreSQL
--  Ejecutar en DBeaver o en la consola de Render
-- ═══════════════════════════════════════════════════════════════════════════

-- ─── Tabla de usuarios (autenticación) ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS usuarios (
  id_usuario  SERIAL       PRIMARY KEY,
  username    VARCHAR(50)  UNIQUE NOT NULL,
  password    VARCHAR(255) NOT NULL,
  created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

-- ─── Tabla de organizadores ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS organizadores (
  id_organizador  SERIAL      PRIMARY KEY,
  nombre          VARCHAR(100) NOT NULL,
  telefono        VARCHAR(20)  NOT NULL,
  created_at      TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

-- ─── Tabla de eventos ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS eventos (
  id_evento       SERIAL       PRIMARY KEY,
  titulo          VARCHAR(150) NOT NULL,
  fecha           DATE         NOT NULL,
  afiche          VARCHAR(500),                             -- URL de Cloudinary
  id_organizador  INTEGER      REFERENCES organizadores(id_organizador) ON DELETE SET NULL,
  created_at      TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

-- ─── Datos de prueba — Organizadores ─────────────────────────────────────────
INSERT INTO organizadores (nombre, telefono) VALUES
  ('María García',    '+51 999 111 222'),
  ('Carlos Rodríguez','+51 988 333 444'),
  ('Ana Martínez',    '+51 977 555 666')
ON CONFLICT DO NOTHING;

-- ─── Datos de prueba — Eventos ───────────────────────────────────────────────
INSERT INTO eventos (titulo, fecha, id_organizador) VALUES
  ('Festival de Verano 2025',  '2025-01-15', 1),
  ('Conferencia Tech Lima',    '2025-02-20', 2),
  ('Noche Cultural Arequipa',  '2025-03-10', 3)
ON CONFLICT DO NOTHING;

-- ─── IMPORTANTE: Crear usuario admin ─────────────────────────────────────────
-- El hash corresponde a la contraseña: admin123
-- Puedes cambiarlo usando la ruta POST /registro desde la app
INSERT INTO usuarios (username, password) VALUES
  ('admin', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy')
ON CONFLICT DO NOTHING;
-- Contraseña del admin por defecto: admin123
-- CAMBIA ESTA CONTRASEÑA EN PRODUCCIÓN usando POST /registro

-- Verificar tablas creadas
SELECT 'usuarios'      AS tabla, COUNT(*) FROM usuarios
UNION ALL
SELECT 'organizadores' AS tabla, COUNT(*) FROM organizadores
UNION ALL
SELECT 'eventos'       AS tabla, COUNT(*) FROM eventos;
