from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, PrimaryKeyConstraint, Index
from sqlalchemy.orm import relationship

from .database import Base

class Product(Base):
    __tablename__ = 'products'

    id = Column(Integer, primary_key=True, index=True)
    image = Column(String, default = '')
    name = Column(String)
    price = Column(Integer)
    description = Column(String, default='')
    stock = Column(Integer, default=0)


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    username = Column(String, index=True, unique=True)
    password = Column(String, default='1')

    basket_items = relationship("BasketItem", back_populates="owner")

class BasketItem(Base):
    __tablename__ = 'basket_details'

    product_id  = Column(Integer, ForeignKey("products.id"))
    owner_id   = Column(Integer, ForeignKey("users.id"))
    waranty     = Column(Integer, default = 1)

    product     = relationship("Product")
    owner      = relationship("User", back_populates="basket_items")

    __table_args__ = (
            PrimaryKeyConstraint('product_id','owner_id'),
            Index('basket_details_index', 'product_id', 'owner_id'),
            {},
    )

