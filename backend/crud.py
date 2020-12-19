from sqlalchemy.orm import Session, load_only
import hashlib

from . import models, schemas

def get_products(db: Session):
    return db.query(models.Product).all()

def add_item_to_basket(db: Session, product_id: int, user_id: int, waranty: int):
    basket_details = models.BasketItem(product_id= product_id, user_id= user_id, waranty= waranty)

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def create_user(db: Session, user: schemas.UserCreate):
    user_db=models.User(username=user.username, name=user.name, password=user.password)
    db.add(user_db)
    db.commit()
    db.refresh(user_db)
    return user_db

def get_basket_items(db: Session):
    return db.query(models.BasketItem).all()
#    return db.query().with_entities(models.BasketItem.product_id, models.BasketItem.waranty).all()

def add_product_to_basket(db: Session, product_id: int, user_id: int):
    existed_product = db.query(models.BasketItem).filter(models.BasketItem.product_id == product_id, models.BasketItem.owner_id == user_id).first()
    if existed_product:
        existed_product.waranty += 1
        db.commit()
    else:
        db_item = models.BasketItem(product_id=product_id, owner_id=user_id, waranty=1)
        db.add(db_item)
        db.commit()
        db.refresh(db_item)
    return True

def remove_product_from_basket(db: Session, product_id: int, user_id: int):
    db.query(models.BasketItem).filter(models.BasketItem.product_id == product_id, models.BasketItem.owner_id == user_id).delete()
    db.commit()
    return True

