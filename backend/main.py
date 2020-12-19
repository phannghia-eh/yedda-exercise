from typing import Optional, List

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from . import crud, models, schemas

from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

# Start server
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
# Dependencies
def get_db():
    db = SessionLocal()
    try:
    	yield db
    finally:
    	db.close()

# Product APIs
@app.get("/product")
def get_products(db: Session = Depends(get_db)):
    return crud.get_products(db)

@app.post("/product")
def add_product():
    return {items: crud.get_products}

@app.delete("/product/:id")
def remove_product():
    return {"success": true}

# User APIs
@app.post("/user", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    print(user)
    existed_user = crud.get_user_by_username(db, user.username)
    if existed_user:
        raise HTTPException(status_code=400, detail="Username existed! Please choose another one")
    return crud.create_user(db, user=user)

@app.get("/basket")
def get_list_product_on_basket(db: Session = Depends(get_db)):
    return crud.get_basket_items(db)

@app.post("/basket")
def add_product_to_basket(item: schemas.BasketItemAdd, db: Session = Depends(get_db)):
    return crud.add_product_to_basket(db, product_id = item.product_id, user_id = item.owner_id)

@app.delete("/basket")
def remove_product_from_basket(owner_id: int, product_id: int, db: Session = Depends(get_db)):
    return crud.remove_product_from_basket(db, product_id = product_id, user_id = owner_id)
