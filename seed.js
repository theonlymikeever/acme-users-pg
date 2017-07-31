var sql = `
DROP TABLE IF EXISTS users;

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name CHARACTER VARYING(255) UNIQUE,
  isManager BOOLEAN NOT NULL
);

INSERT INTO users (name, isManager) VALUES ('Buzz Lightyear', TRUE);
INSERT INTO users (name, isManager) VALUES ('Woody', FALSE);
INSERT INTO users (name, isManager) VALUES ('Ham', FALSE);
`;

module.exports = sql;
