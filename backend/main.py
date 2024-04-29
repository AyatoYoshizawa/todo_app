from fastapi import FastAPI, HTTPException, Depends
from typing import List
from sqlalchemy.orm import Session

from database import SessionLocal, engine
from models import Task
from database import Base

app = FastAPI(
    openapi_version=3.0
)

Base.metadata.create_all(bind=engine)

# DBセッションの依存性注入
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# テスト
@app.get('/')
def test():
    return {'message': 'Hello World by todo_app'}

# 一覧を取得
@app.get("/api/v1/tasks", response_model=List[Task])
async def get_tasks(title: str, status: int):
    db = SessionLocal()
    tasks = db.query(Task).all()
    if title:
        tasks = tasks.filter(Task.title == title)
    if status is not None:
        tasks = tasks.filter(Task.status == status)
    db.close()
    return tasks

# 詳細を取得
@app.get("/api/v1/tasks/{task_id}", response_model=Task)
async def get_task(task_id: int):
    db = SessionLocal()
    task = db.query(Task).filter(Task.id == task_id).first()
    db.close()
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

# 作成
@app.post("/api/v1/tasks/", response_model=Task)
async def create_task(task: Task, db: Session = Depends(get_db)):
    db.add(task)
    db.commit()
    db.refresh(task)
    return task

# 更新
@app.put("/api/v1/tasks/{task_id}", response_model=Task)
async def update_task(task_id: int, title: str, status: int, db: Session = Depends(get_db)):
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    db_task.title = title
    db_task.status = status
    db.commit()
    db.refresh(db_task)
    return db_task

# 削除
@app.delete("/api/v1/tasks/{task_id}")
async def delete_task(task_id: int, db: Session = Depends(get_db)):
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(db_task)
    db.commit()
    return {"message": "Task deleted successfully"}