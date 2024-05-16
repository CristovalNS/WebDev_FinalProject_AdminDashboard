from pydantic import BaseModel, EmailStr
from typing import Optional

class UserRegistration(BaseModel):
    email: str
    password: str
    user_type: int  

class UserLogin(BaseModel):
    email: str
    password: str
