from injector import Injector

from src.driver.module import DriverModule
from src.user.module import UserModule


injector = Injector([
    DriverModule,
    UserModule
])
