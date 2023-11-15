import psycopg2
import json

connect = psycopg2.connect("postgres://qficvrjz:xgzayMFH1uUCEE-xAVxmnlxcRkDQcdaT@flora.db.elephantsql.com/qficvrjz")

cur = connect.cursor()

cur.execute(f'SELECT * from rankings where user_id=1')

records=cur.fetchall()

for i in records:
  print(i)