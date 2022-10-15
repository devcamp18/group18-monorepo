from injector import Binder, Module, singleton

from .session import SessionManager


class DriverModule(Module):
    def configure(self, binder: Binder) -> None:
        binder.bind(SessionManager, to=SessionManager, scope=singleton)
