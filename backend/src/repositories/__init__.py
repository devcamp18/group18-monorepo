from injector import Binder, Module, singleton

from .user import UserRepository  # noqa
from .product import ProductRepository  # noqa
from .predictor import BodySizePredictor  # noqa


class RepositoryModule(Module):
    def configure(self, binder: Binder) -> None:
        binder.bind(UserRepository, to=UserRepository, scope=singleton)
        binder.bind(ProductRepository, to=ProductRepository, scope=singleton)
        binder.bind(BodySizePredictor, to=BodySizePredictor, scope=singleton)
