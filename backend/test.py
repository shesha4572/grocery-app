import mysql.connector

db = mysql.connector.connect(user = "sql12544400" , password = "QLeluWF5Ad" , host = "sql12.freemysqlhosting.net");
cur = db.cursor()
cur.execute("USE sql12544400;")
cur.execute("SELECT * FROM items_weight;")
print(cur.fetchone())