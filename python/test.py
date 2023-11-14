import psycopg2

connect = psycopg2.connect("postgres://qficvrjz:xgzayMFH1uUCEE-xAVxmnlxcRkDQcdaT@flora.db.elephantsql.com/qficvrjz")

cur = connect.cursor()

cur.execute(f'SELECT * FROM users')

records=cur.fetchall()

print(records)