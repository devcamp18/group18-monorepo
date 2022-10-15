from injector import Binder, Module, singleton

from .user import UserRepository  # noqa


class RepositoryModule(Module):
    def configure(self, binder: Binder) -> None:
        binder.bind(UserRepository, to=UserRepository, scope=singleton)
