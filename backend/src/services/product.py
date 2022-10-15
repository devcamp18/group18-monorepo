from typing import List, Optional
from injector import inject

from src.models import Product
from src.repositories import ProductRepository


class ProductService:
    @inject
    def __init__(self, product_repo: ProductRepository) -> None:
        self.product_repo = product_repo

    def get_product_by_id(self, product_id: str) -> Optional[Product]:
        product = self.product_repo.get_product_by_id(product_id)

        return product

    def get_product_all(self) -> List[Product]:
        products = self.product_repo.get_product_all()

        return products
