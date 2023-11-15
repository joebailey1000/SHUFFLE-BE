import psycopg2
import json
import random

connect = psycopg2.connect("postgres://qficvrjz:xgzayMFH1uUCEE-xAVxmnlxcRkDQcdaT@flora.db.elephantsql.com/qficvrjz")

cur = connect.cursor()

cur.execute('SELECT * from rankings where user_id=2')

records=cur.fetchall()

errors=[]
randerrors=[]
for i in records:
  print(i)
  if i[4] is not None:
    errors.append(abs(i[3]-i[4]))
    randerrors.append(abs(i[3]-random.randint(1,10)))
print(sum(errors)/len(errors))
print(sum(randerrors)/len(randerrors))