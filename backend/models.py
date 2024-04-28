from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Task(BaseModel):
    __tablename__ = "task"
    id: Optional[int] = None
    title: str
    status: int
    deadline: datetime