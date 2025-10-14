from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel, EmailStr
from enum import Enum

class UserRole(str, Enum):
    USER = "user"
    EXPERT = "expert"
    ADMIN = "admin"

class LeadStatus(str, Enum):
    NEW = "new"
    CONTACTED = "contacted"
    CONVERTED = "converted"
    REJECTED = "rejected"

class ExpertStatus(str, Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"

class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str
    role: Optional[UserRole] = UserRole.USER

class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    is_active: Optional[bool] = None
    role: Optional[UserRole] = None

class User(UserBase):
    id: int
    is_active: bool
    role: UserRole
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
    user_id: Optional[int] = None
    role: Optional[UserRole] = None

class LeadBase(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    service_of_interest: Optional[str] = None

class LeadCreate(LeadBase):
    pass

class Lead(LeadBase):
    id: int
    status: LeadStatus
    user_id: Optional[int] = None
    expert_id: Optional[int] = None
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True

class ServiceBase(BaseModel):
    name: str
    description: Optional[str] = None
    category: Optional[str] = None

class ServiceCreate(ServiceBase):
    pass

class Service(ServiceBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True

class ExpertProfileBase(BaseModel):
    specialization: str
    bio: Optional[str] = None
    hourly_rate: Optional[int] = None

class ExpertProfileCreate(ExpertProfileBase):
    user_id: int

class ExpertProfileUpdate(BaseModel):
    specialization: Optional[str] = None
    bio: Optional[str] = None
    hourly_rate: Optional[int] = None
    status: Optional[ExpertStatus] = None

class ExpertProfile(ExpertProfileBase):
    id: int
    user_id: int
    status: ExpertStatus
    created_at: datetime
    updated_at: Optional[datetime]
    services: List[Service] = []

    class Config:
        from_attributes = True

class ReviewBase(BaseModel):
    rating: int
    comment: Optional[str] = None

class ReviewCreate(ReviewBase):
    user_id: int
    expert_id: Optional[int] = None

class Review(ReviewBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class NotificationBase(BaseModel):
    message: str
    is_read: bool = False

class NotificationCreate(NotificationBase):
    user_id: int

class Notification(NotificationBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class AdminLogBase(BaseModel):
    action: str
    target_entity: Optional[str] = None
    target_id: Optional[int] = None

class AdminLogCreate(AdminLogBase):
    admin_id: int

class AdminLog(AdminLogBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

