from injector import Binder, Module, singleton

from .user import UserService  # noqa
from .product import ProductService  # noqa


class ServiceModule(Module):
    def configure(self, binder: Binder) -> None:
        binder.bind(UserService, to=UserService, scope=singleton)
        binder.bind(ProductService, to=ProductService, scope=singleton)
