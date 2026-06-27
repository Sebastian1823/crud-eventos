CREATE TABLE IF NOT EXISTS organizadores (
  id_organizador INT AUTO_INCREMENT PRIMARY KEY,
  nombre         VARCHAR(150) NOT NULL,
  telefono       VARCHAR(20)  NOT NULL,
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS eventos (
  id_evento      INT AUTO_INCREMENT PRIMARY KEY,
  titulo         VARCHAR(200) NOT NULL,
  fecha          DATE         NOT NULL,
  afiche         VARCHAR(500) DEFAULT NULL,
  id_organizador INT          NOT NULL,
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_organizador) REFERENCES organizadores(id_organizador)
    ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS usuarios (
  id_usuario  INT AUTO_INCREMENT PRIMARY KEY,
  username    VARCHAR(100) NOT NULL UNIQUE,
  password    VARCHAR(255) NOT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
