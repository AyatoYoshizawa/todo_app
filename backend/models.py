from sqlalchemy import Integer, String
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

from database import engine


# SQLAlchemy のモデル

class Base(DeclarativeBase):
    pass


class Task(Base):
    __tablename__ = 'task'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String, nullable=False, index=True)
    status: Mapped[int] = mapped_column(Integer, nullable=False, index=True, default=0)


Base.metadata.create_all(bind=engine)
