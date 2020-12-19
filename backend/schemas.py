from typing import List, Optional

from pydantic import BaseModel

# Product
class Product(BaseModel):
    name: str
    image: Optional[str] = None
    description: Optional[str] = None
    stock: int = 0
    price: int = 0

    class Config:
        orm_mode = True

# Basket Item
class BasketItemBase(BaseModel):
    product_id: int
    owner_id: int
    waranty: int = 0

class BasketItemAdd(BaseModel):
    owner_id: int
    product_id: int

class BasketItemDelete(BasketItemAdd):
    pass

class BasketItemResponse(BaseModel):
    product_id: int
    waranty: int

class BasketItem(BasketItemBase):

    class Config:
        orm_mode = True

# User
class UserBase(BaseModel):
    name: Optional[str] = None
    username: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    basket_items: List[BasketItem] = []

    class Config:
        orm_mode = True

