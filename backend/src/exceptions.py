from typing import Optional


class BaseException(Exception):
    def __init__(
        self, message: str = "Something went wrong.", code: Optional[int] = 500
    ):
        super().__init__(message)
        self.message = message
        self.code = code
