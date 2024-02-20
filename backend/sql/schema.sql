DROP TABLE IF EXISTS account;

CREATE TABLE user(id SERIAL PRIMARY KEY, username VARCHAR(50), email VARCHAR(50), profilepic VARCHAR(50), password VARCHAR(50), role VARCHAR(50), state VARCHAR(50), created_at TIMESTAMP, updated_at TIMESTAMP);