--
-- PostgreSQL database Proman
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET default_tablespace = '';

SET default_with_oids = false;

---
--- drop tables
---

DROP TABLE IF EXISTS cards;
DROP TABLE IF EXISTS statuses CASCADE;
DROP TABLE IF EXISTS boards CASCADE;
DROP TABLE IF EXISTS users;

---
--- create tables
---

CREATE TABLE users (
    id serial NOT NULL,
    username text UNIQUE NOT NULL,
    password text NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE statuses (
    id       SERIAL PRIMARY KEY     NOT NULL,
    title    VARCHAR(200)           NOT NULL,
    board_id INTEGER                NOT NULL
);

CREATE TABLE boards (
    id          SERIAL PRIMARY KEY  NOT NULL,
    user_id     INTEGER             NOT NULL,
    title       VARCHAR(200)        NOT NULL,
    public      BOOLEAN             NOT NULL
);

CREATE TABLE cards (
    id          SERIAL PRIMARY KEY  NOT NULL,
    board_id    INTEGER             NOT NULL,
    status_id   INTEGER             NOT NULL,
    title       VARCHAR (200)       NOT NULL,
    card_order  INTEGER             NOT NULL
);

---
--- insert data
---

INSERT INTO users(username, password) VALUES 
    ('codecool@mail.com', 'pbkdf2:sha256:260000$vyuEe9q7l5gJqr1V$0ff7768c7f0feb01ca24470086876a72e437ce98b428b8ee0d3c32ed752d7606'),
    ('vlad@gmail.com', 'pbkdf2:sha256:260000$GaJHRgybJHdfW2SW$60fe18fb27882aa05b11a3da810c939271d6878496e0cd1c335b145e57cdb0ba');

INSERT INTO statuses(title, board_id) VALUES ('new', 1);
INSERT INTO statuses(title, board_id) VALUES ('in progress', 1);
INSERT INTO statuses(title, board_id) VALUES ('testing', 1);
INSERT INTO statuses(title, board_id) VALUES ('done', 1);
INSERT INTO statuses(title, board_id) VALUES ('new', 2);
INSERT INTO statuses(title, board_id) VALUES ('in progress', 2);
INSERT INTO statuses(title, board_id) VALUES ('testing', 2);
INSERT INTO statuses(title, board_id) VALUES ('done', 2);

INSERT INTO boards(user_id, title, public) VALUES (1, 'Public Board 1', TRUE);
INSERT INTO boards(user_id, title, public) VALUES (1, 'Public Board 2', TRUE);

INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 1, 'new card 1', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 1, 'new card 2', 2);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 2, 'in progress card', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 2, 'planning', 2);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 4, 'done card 1', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 4, 'done card 1', 2);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 5, 'new card 1', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 5, 'new card 2', 2);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 6, 'in progress card', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 6, 'planning', 2);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 8, 'done card 1', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 8, 'done card 1', 2);

---
--- add constraints
---

ALTER TABLE ONLY cards
    ADD CONSTRAINT fk_cards_board_id FOREIGN KEY (board_id) REFERENCES boards(id);

ALTER TABLE ONLY cards
    ADD CONSTRAINT fk_cards_status_id FOREIGN KEY (status_id) REFERENCES statuses(id);

ALTER TABLE ONLY boards
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (id);

ALTER TABLE ONLY statuses
    ADD CONSTRAINT fk_board_id FOREIGN KEY (board_id) REFERENCES boards (id);