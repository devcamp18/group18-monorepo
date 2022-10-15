from injector import Injector

from src.services import ServiceModule
from src.repositories import RepositoryModule
from src.driver.module import DriverModule


injector = Injector([
    DriverModule,
    RepositoryModule,
    ServiceModule,
])
