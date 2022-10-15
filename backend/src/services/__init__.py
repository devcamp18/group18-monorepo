from injector import Binder, Module, singleton

from .user import UserService  # noqa


class ServiceModule(Module):
    def configure(self, binder: Binder) -> None:
        binder.bind(UserService, to=UserService, scope=singleton)
