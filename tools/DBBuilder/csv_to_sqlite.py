import csv
import json
import sqlite3

file_name = "top_frog_comics.csv/top_frog_comics_table_{}.csv"

schemas = {
"comics_schema": """
CREATE TABLE Comics (
  id INTEGER PRIMARY KEY,
  title_id INTEGER,
  issue_no INTEGER,
  grade_id INTEGER,
  description TEXT,
  date INTEGER
);
""",

"grades_schema": """
CREATE TABLE Grades (
  id INTEGER PRIMARY KEY,
  abbr TEXT,
  name TEXT,
  score REAL
);
""",

"publishers_schema": """
CREATE TABLE Publishers (
  id INTEGER PRIMARY KEY,
  name TEXT,
  url TEXT
);
""",

"titles_schema": """
CREATE TABLE Titles (
  id INTEGER PRIMARY KEY,
  name TEXT,
  publisher_id INTEGER,
  url TEXT,
  issues INTEGER,
  year INTEGER,
  volume INTEGER
);
"""
}


def insert(table_name, cur):
  with open(file_name.format(table_name), encoding="utf-8") as csvfile:
    reader = csv.reader(csvfile, delimiter=",", quotechar='"')
    headers = reader.__next__()

    cur.execute("DROP TABLE IF EXISTS {};".format(table_name).strip())
    # print(schemas['{}_schema'.format(table_name)])
    
    cur.execute(schemas['{}_schema'.format(table_name)])

    insert = "INSERT INTO {} ({}) VALUES ({});".format(
      table_name,
      ", ".join(headers),
      ", ".join(["?"] * len(headers))
    )

    items = []
    for entry in reader:
      items.append([ field if len(field) else None for field in entry ])

    cur.executemany(insert, items)

    cur.execute("SELECT * FROM {};".format(table_name))
    # print(cur.fetchall())
  
  csvfile.close()
  

def main():
  con = sqlite3.connect("./comics.db")
  cur = con.cursor()
  cur.execute("PRAGMA encoding = 'UTF-8';")

  schemas_file = open("./schemas.sqlite", "w+")

  tables = [
    'grades',
    'publishers',
    'titles',
    'comics'
  ]

  for table in tables:
    insert(table, cur)
    schemas_file.write(schemas['{}_schema'.format(table)])

  schemas_file.close()

  con.commit()
  con.row_factory = sqlite3.Row

  output = {
    "titles": {},
    "publishers": {}
  }

  for row in con.execute("""
    SELECT t.id, 
      t.name,
      t.publisher_id,
      t.issues,
      t.year,
      t.volume,
      COUNT(c.id) AS count
    FROM titles AS t
      JOIN comics AS c on c.title_id = t.id
    GROUP BY 1, 2, 3
    ORDER BY t.name
  """):
    title = dict(row)
    title["issues"] = {}
    output["titles"][row["id"]] = title

  # for row in con.execute("""
  #   SELECT c.id,
  #     c.issue_no,
  #     c.title_id,
  #     g.name AS grade,
  #     g.score AS grade_score,
  #     c.description
  #   FROM comics AS c
  #     JOIN grades as g on g.id = c.grade_id
  # """):
  #   output['titles'][row["id"]]["issues"][row["id"]] = dict(row)

  # for row in con.execute("""
  #   SELECT p.id,
  #     p.name,
  #     p.url
  #   FROM publishers AS p
  # """):
  #   publisher = dict(row)
  #   publisher["titles"] = {}
  #   output["publishers"][row["id"]] = publisher
    

  # with open("comics.json", "w+") as comics_json:
  #   json.dump(output, comics_json, indent=2)

  print(output)

  con.close()


if __name__ == "__main__":
  main()
