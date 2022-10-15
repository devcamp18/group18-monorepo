from injector import Binder, Module, singleton

from .repository import UserRepository
from .service import UserService


class UserModule(Module):
    def configure(self, binder: Binder) -> None:
        binder.bind(UserRepository, to=UserRepository, scope=singleton)
        binder.bind(UserService, to=UserService, scope=singleton)
