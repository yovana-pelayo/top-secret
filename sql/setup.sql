-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS secrets;
DROP TABLE IF EXISTS userss;

CREATE TABLE secrets (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
CREATE TABLE userss (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    password_hash TEXT NOT NULL
    );

INSERT INTO secrets (title, description, created_at) VALUES
 ('Viewer discretion is advised', 'The secret is that spongebob had the string', '2017-08-15 21:05:15.723336+07'),
 ('Blue', 'Top secret CIA joke', '2017-08-15 22:05:15.723336+07');