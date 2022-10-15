from typing import List, Optional
from injector import inject

from src.driver.session import SessionManager
from src.models import Product


class ProductRepository:
    @inject
    def __init__(self, session_manager: SessionManager) -> None:
        self.session_manager = session_manager

    def get_product_by_id(self, product_id: str) -> Optional[Product]:
        database = self.session_manager.get_database()
        product = database["product"].find_one({"_id": product_id})
        return product

    def get_product_all(self) -> List[Product]:
        database = self.session_manager.get_database()
        products = database["product"].find(limit=100)

        return list(products)
