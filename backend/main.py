from typing import List, Optional

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select
from sqlalchemy.orm import Session

import models
import schemas
from database import SessionLocal
from models import Task

app = FastAPI()
app.openapi_version = '3.0.3'
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
)


# DBセッションの依存性注入
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get('/')
def test():
    """
    テスト
    :return:
    """
    return {'message': 'Hello World by todo_app'}


@app.get('/api/v1/tasks/list', response_model=List[schemas.Task])
async def get_tasks(title: Optional[str] = None, status: Optional[int] = None):
    """
    一覧を取得
    :param title:
    :param status:
    :return:
    """
    query = select(Task)

    if title:
        query = query.where(Task.title == title)

    if status is not None:
        query = query.where(Task.status == status)

    db = SessionLocal()
    task_list = db.scalars(query.order_by(Task.id.asc())).all()
    task_schema_list = [schemas.Task(**task.__dict__) for task in task_list]
    db.close()
    return task_schema_list


@app.get('/api/v1/tasks/detail/{task_id}', response_model=schemas.Task)
async def get_task(task_id: int):
    """
    詳細を取得
    :param task_id:
    :return:
    """
    session = SessionLocal()

    task = session.scalars(
        select(Task)
        .where(Task.id == task_id)
    ).one_or_none()

    session.close()

    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")

    return task


@app.post('/api/v1/tasks/create', response_model=schemas.Task)
async def create_task(task_schema: schemas.TaskCreate, session: Session = Depends(get_db)):
    """
    作成
    :param task_schema:
    :param session:
    :return:
    """
    task = models.Task(**task_schema.dict())
    session.add(task)
    session.commit()
    session.refresh(task)

    return task


@app.put('/api/v1/tasks/update/{task_id}', response_model=schemas.Task)
async def update_task(task_id: int, task_schema: schemas.Task, session: Session = Depends(get_db)):
    """
    更新
    :param task_schema:
    :param task_id:
    :param session:
    :return:
    """

    task = session.scalars(
        select(Task)
        .where(Task.id == task_id)
    ).one_or_none()

    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")

    task.title = task_schema.title
    task.status = task_schema.status
    session.commit()
    session.refresh(task)
    return task


@app.delete("/api/v1/tasks/delete/{task_id}")
async def delete_task(task_id: int, session: Session = Depends(get_db)):
    """
    削除
    :param task_id:
    :param session:
    :return:
    """
    task = session.scalars(
        select(Task)
        .where(Task.id == task_id)
    ).one_or_none()

    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")

    session.delete(task)
    session.commit()

    return {"message": "Task deleted successfully"}
