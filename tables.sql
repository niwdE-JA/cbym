CREATE TABLE subscribers (
email VARCHAR(255) PRIMARY KEY,
firstname VARCHAR(25) NOT NULL,
lastname VARCHAR(25),
verified BOOLEAN NOT NULL DEFAULT false
);