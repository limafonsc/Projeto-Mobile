CREATE DATABASE IF NOT EXISTS moviehub
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
USE moviehub;

CREATE TABLE IF NOT EXISTS users (
  id CHAR(36) NOT NULL PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  foto_url TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS genres (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(60) NOT NULL UNIQUE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS movies (
  id CHAR(36) NOT NULL PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description TEXT NULL,
  year INT NOT NULL,
  director VARCHAR(120) NULL,
  duration INT NULL,
  rating DECIMAL(2,1) NULL,
  status VARCHAR(20) NOT NULL,
  favorite BOOLEAN NOT NULL DEFAULT FALSE,
  image_url TEXT NULL,
  trailer_url TEXT NULL,
  genre_id INT NULL,
  user_id CHAR(36) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_movies_genre FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE SET NULL,
  CONSTRAINT fk_movies_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT chk_movies_year CHECK (year BETWEEN 1888 AND 2200),
  CONSTRAINT chk_movies_duration CHECK (duration IS NULL OR duration > 0),
  CONSTRAINT chk_movies_rating CHECK (rating IS NULL OR rating BETWEEN 0 AND 5),
  INDEX idx_movies_user (user_id),
  INDEX idx_movies_genre (genre_id)
) ENGINE=InnoDB;

INSERT IGNORE INTO genres (nome) VALUES
  ('Ação'), ('Comédia'), ('Drama'), ('Ficção Científica'), ('Terror'),
  ('Suspense'), ('Animação'), ('Documentário'), ('Romance'), ('Aventura'), ('Crime');

