import asyncio
from datetime import datetime, timedelta
from typing import Optional
from fastapi import Depends, FastAPI, HTTPException, status, Form
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware
import mysql.connector


db = mysql.connector.connect(user = "root" , password = "root" , host = "localhost");
cur = db.cursor(buffered=True)
cur.execute("USE grocery_shop_management;")

app = FastAPI(debug = True)
app.add_middleware(CORSMiddleware , allow_origins = ["http://localhost:3000"] , allow_credentials = True , allow_headers = ['*'] , allow_methods = ['*'])
SECRET_KEY = "efd1a9ccdb325278a5b2d8183d3bf005a17bab75609ff4fc90e83f75ef9ec617"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60
CHECK = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None


class User(BaseModel):
    username: str
    email: str | None = None
    full_name: str | None = None
    disabled: bool | None = None

class UserForm(BaseModel):
    username: str
    email: str | None = None
    full_name: str | None = None
    password : str
    gender : str


class UserInDB(User):
    hashed_password: str

class GroceryItem(BaseModel):
    id : int
    name : str
    desc : str
    image_link : str
    type : int
    details : list

class CartItem(BaseModel):
    id : int
    name : str
    image_link : str
    type : int
    type_qty : float
    qty : float
    price : float
    stock_available : int

class OrderedItems(BaseModel):
    item_id : int
    weight : float | None = None
    volume : float | None = None
    price : float
    qty : int
class PreviousOrders(BaseModel):
    id : int
    time : datetime
    address : str
    amount : float
    payment_type : str
    items : list


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def get_user(username: str):
    cur.execute(f"SELECT * FROM Customer WHERE Username LIKE '{username}'")
    res = cur.fetchone()
    if(res is None):
        return res
    return UserInDB(username = res[3] , email = res[2] , full_name = res[0] , disabled = False , hashed_password = res[-2])


def authenticate_user(username: str, password: str):
    user = get_user(username)
    if user is None:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get_user(username=token_data.username)
    if user is None:
        raise credentials_exception
    return user


async def get_current_active_user(current_user: User = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


def check_username_unique(username):
    cur.execute(f"SELECT * FROM Customer WHERE Username LIKE '{username}';")
    return cur.fetchone() is None

def create_cust_in_db(name , gender , email_id , username , password ):
    hashed = get_password_hash(password)
    cur.execute(f"INSERT INTO Customer(Name , Gender , Email_ID , Username , Hashed_pass) VALUES('{name}' , '{gender}' , '{email_id}' , '{username}' ,'{hashed}')")
    db.commit()


async def cancel_reservations():
    cur.execute("SELECT * FROM item_reservation WHERE TIMESTAMPDIFF(MINUTE , time_reserved , CURRENT_TIMESTAMP) > 15;")
    det = cur.fetchall()
    for i in det:
        cur.execute(f"SELECT type FROM Items WHERE Item_ID = {i[1]}")
        t = cur.fetchone()[0]
        if t == 1:
            cur.execute(f"UPDATE items_weight SET Stock = Stock + {i[3]} WHERE Item_ID = {i[1]} AND Weight = {i[2]};")
        else:
            cur.execute(f"UPDATE items_volume SET Stock = Stock + {i[3]} WHERE Item_ID = {i[1]} AND Volume = {i[2]};")
        cur.execute(f"DELETE FROM item_reservation WHERE Cust_ID = {i[0]};")
    db.commit()
async def cron_job_cancel_reservations():
    while CHECK:
        await asyncio.gather(
            asyncio.sleep(100),
            cancel_reservations()
        )


@app.on_event("startup")
async def start_cron():
    asyncio.create_task(cron_job_cancel_reservations())

@app.on_event("shutdown")
def shutdown():
    CHECK = False

@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/users/me/", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user


@app.get("/users/me/items/")
async def read_own_items(current_user: User = Depends(get_current_active_user)):
    return [{"item_id": "Foo", "owner": current_user.username}]

@app.post("/createUser/")
async def createUser(username : str = Form(...) , full_name : str = Form(...) , gender : str = Form(...) , email : str = Form(...) , password : str = Form(...)):
    if not check_username_unique(username):
        raise HTTPException(
            status_code = status.HTTP_409_CONFLICT,
            detail = "Username already exists"
        )
    create_cust_in_db(full_name , gender , email , username , password)
    return {"Status" : "Success"}


@app.get("/getAllItems" , response_model=list[GroceryItem])
def getAllItems():
    cur.execute("SELECT * FROM Items;")
    items = cur.fetchall()
    Grocery_items = []
    table_name = ""
    for i in items:
        details = []
        if i[3] == 1:
            table_name = "items_weight"
        elif i[3] == 2:
            table_name = "items_volume"
        cur.execute(f"SELECT * FROM {table_name} WHERE Item_ID = {i[0]}")
        det = cur.fetchall()
        for j in det:
            details.append([j[1] , j[2] , j[3]])
        if i[3] == 1:
            Grocery_items.append(GroceryItem(id = j[0] , name = i[1] , desc = i[2] , image_link = i[-1] , type = 1 , details = details))
        elif i[3] == 2:
            Grocery_items.append(GroceryItem(id = j[0] , name = i[1] , desc = i[2] , image_link = i[-1] , type = 2 , details = details))

    return Grocery_items

@app.get("/getItem/{id}{qty}" , response_model=CartItem)
def getItemByID(id , qty):
    cur.execute(f"SELECT * FROM Items WHERE Item_ID = {id};")
    i = cur.fetchone()
    table_name = ""
    type = ""
    if i is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail = "Item not found"
        )
    if i[3] == 1:
        table_name = "items_weight"
        type = "Weight"
    elif i[3] == 2:
        table_name = "items_volume"
        type = "Volume"
    cur.execute(f"SELECT Price FROM {table_name} WHERE Item_ID = {i[0]} AND {type} = {qty};")
    det = cur.fetchone()
    print(det)
    return CartItem(id = i[0] , name=i[1], desc=i[2], image_link=i[-1], type=i[3], qty = qty , price = det[0])

@app.get("/searchItem{word}")
def getSearchResults(word):
    cur.execute(f"SELECT * FROM Items WHERE Name LIKE '%{word}%';")
    items = cur.fetchall()
    Grocery_items = []
    table_name = ""
    for i in items:
        details = []
        if i[3] == 1:
            table_name = "items_weight"
        elif i[3] == 2:
            table_name = "items_volume"
        cur.execute(f"SELECT * FROM {table_name} WHERE Item_ID = {i[0]}")
        det = cur.fetchall()
        for j in det:
            details.append([j[1], j[2], j[3]])
        if i[3] == 1:
            Grocery_items.append(GroceryItem(id=j[0], name=i[1], desc=i[2], image_link=i[-1], type=1, details=details))
        elif i[3] == 2:
            Grocery_items.append(GroceryItem(id=j[0], name=i[1], desc=i[2], image_link=i[-1], type=2, details=details))
    return Grocery_items

@app.post("/reserveItem")
def reserveItem(item_id : int = Form(...) , item_type : float = Form(...)  , item_qty : int = Form(...)  , token : str = Form(...)  , type : int = Form(...)):
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    username = payload.get("sub")
    cur.execute(f"SELECT Cust_ID FROM Customer WHERE Username LIKE '{username}';")
    user_id = cur.fetchone()[0]
    cur.execute(f"SELECT * FROM item_reservation WHERE Cust_ID = {user_id} AND Item_ID = {item_id} AND Item_type = {item_type}")
    res = cur.fetchone()
    old_qty = 0
    if res is not None:
        old_qty = res[3]
        cur.execute(f"UPDATE item_reservation SET Item_qty = {item_qty} WHERE Item_ID = {item_id} AND Item_type = {item_type};")
    else:
        cur.execute(f"INSERT INTO item_reservation(Cust_ID, Item_ID, Item_type, Item_qty) VALUES ({user_id} , {item_id} , {item_type} , {item_qty});")
    if type == 1:
        cur.execute(f"UPDATE items_weight SET Stock = Stock - {item_qty - old_qty} WHERE Item_ID = {item_id} AND Weight = {item_type};")
    else:
        cur.execute(f"UPDATE items_volume SET Stock = Stock - {item_qty - old_qty} WHERE Item_ID = {item_id} AND Volume = {item_type};")
    db.commit()


@app.get("/getCart/{token}")
def getCartItems(token : str):
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    username = payload.get("sub")
    cur.execute(f"SELECT Cust_ID FROM Customer WHERE Username LIKE '{username}';")
    user_id = cur.fetchone()[0]
    cur.execute(f"SELECT * FROM item_reservation WHERE Cust_ID = {user_id}")
    det = cur.fetchall()
    items = []
    for i in det:
        cur.execute(f"SELECT name , image_link , type FROM Items WHERE Item_ID = {i[1]}")
        item_details = cur.fetchone()
        item_price_stock = []
        if item_details[2] == 1:
            cur.execute(f"SELECT Price , Stock FROM items_weight WHERE Item_ID = {i[1]} AND Weight = {i[2]}")
            item_price_stock = cur.fetchone()
        else:
            cur.execute(f"SELECT Price , Stock FROM items_volume WHERE Item_ID = {i[1]} AND Volume = {i[2]}")
            item_price_stock = cur.fetchone()
        items.append(CartItem(id = i[1] , name = item_details[0] , image_link = item_details[1] , type = item_details[2] , type_qty = i[2] , qty = i[3] , price = item_price_stock[0] , stock_available = item_price_stock[1]))
    return items

@app.post("/deleteFromCart")
def deleteItemFromCart(item_id : int = Form(...) , item_type : float = Form(...)  , item_qty : int = Form(...)  , token : str = Form(...)  , type : int = Form(...)):
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    username = payload.get("sub")
    cur.execute(f"SELECT Cust_ID FROM Customer WHERE Username LIKE '{username}';")
    user_id = cur.fetchone()[0]
    cur.execute(f"DELETE FROM item_reservation WHERE Cust_ID = {user_id} AND Item_ID = {item_id} AND Item_type = {item_type};")
    if type == 1:
        cur.execute(f"UPDATE items_weight SET Stock = Stock + {item_qty} WHERE Item_ID = {item_id} AND Weight = {item_type}")
    else:
        cur.execute(f"UPDATE items_volume SET Stock = Stock + {item_qty} WHERE Item_ID = {item_id} AND Volume = {item_type}")
    db.commit()

@app.post("/checkout")
def checkOut(user_token : str = Form(...) , address : str = Form(...) , payment_method : str = Form(...) , amount : float = Form(...)):
    payload = jwt.decode(user_token, SECRET_KEY, algorithms=[ALGORITHM])
    username = payload.get("sub")
    cur.execute(f"SELECT Cust_ID FROM Customer WHERE Username LIKE '{username}';")
    user_id = cur.fetchone()[0]
    cur.execute(f"INSERT INTO Orders(Amount, Cust_ID, Payment_type , Address) VALUES ({amount} , {user_id} , '{payment_method}' , '{address}');")
    cur.execute(f"SELECT Order_ID FROM Orders WHERE Cust_ID = {user_id} ORDER BY Order_date_time DESC")
    order_id = cur.fetchall()[0][0]
    cur.execute(f"SELECT * FROM item_reservation WHERE Cust_ID = {user_id}")
    det = cur.fetchall()
    items = []
    for i in det:
        cur.execute(f"SELECT type FROM Items WHERE Item_ID = {i[1]}")
        type = cur.fetchone()[0]
        item_price = 0
        if type == 1:
            cur.execute(f"SELECT Price FROM items_weight WHERE Item_ID = {i[1]} AND Weight = {i[2]}")
            item_price = cur.fetchone()[0]
        else:
            cur.execute(f"SELECT Price FROM items_volume WHERE Item_ID = {i[1]} AND Volume = {i[2]}")
            item_price = cur.fetchone()[0]
        cur.execute(f"INSERT INTO orders_items(Order_Id, Item_Id, Item_type, Type, Item_price, Qty) VALUES ({order_id} , {i[1]} , {i[2]} , {type} , {item_price} , {i[3]})")
    cur.execute(f"DELETE FROM item_reservation WHERE Cust_ID = {user_id}")
    db.commit()
    return order_id

@app.get("/previousOrders/{token}")
def getAllOldOrders(token : str):
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    username = payload.get("sub")
    cur.execute(f"SELECT Cust_ID FROM Customer WHERE Username LIKE '{username}';")
    user_id = cur.fetchone()[0]
    orders = []
    cur.execute(f"SELECT * FROM Orders WHERE Cust_ID = {user_id}")
    det = cur.fetchall()
    for i in det:
        cur.execute(f"SELECT * FROM orders_items WHERE Order_Id = {i[0]};")
        items = cur.fetchall()
        items_in_order = []
        for item in items:
            if(item[3] == 1):
                items_in_order.append(OrderedItems(item_id = item[1] , price = item[4] , qty = item[5] , weight = item[2]))
            else:
                items_in_order.append(OrderedItems(item_id = item[1] , price = item[4] , qty = item[5] , volume = item[2]))
        orders.append(PreviousOrders(id = i[0] , amount = i[1] , payment_type = i[3] , time = i[4] , address = i[5] , items = items_in_order))

    return orders



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app)

