
CREATE TABLE Grades (
  id INTEGER PRIMARY KEY,
  abbr TEXT,
  name TEXT,
  score REAL
);

CREATE TABLE Publishers (
  id INTEGER PRIMARY KEY,
  name TEXT,
  url TEXT
);

CREATE TABLE Titles (
  id INTEGER PRIMARY KEY,
  name TEXT,
  publisher_id INTEGER,
  url TEXT,
  issues INTEGER,
  year INTEGER,
  volume INTEGER
);

CREATE TABLE Comics (
  id INTEGER PRIMARY KEY,
  title_id INTEGER,
  issue_no INTEGER,
  grade_id INTEGER,
  description TEXT,
  date INTEGER
);
