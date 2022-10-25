import mysql.connector

db = mysql.connector.connect(user = "root" , password = "IiAaSs4572!" , host = "localhost");
cur = db.cursor()
user = "johndoe"
cur.execute("USE grocery_shop_management;")
cur.execute("SELECT * FROM Customer WHERE Username LIKE 'johndoe';")
print(cur.fetchone())