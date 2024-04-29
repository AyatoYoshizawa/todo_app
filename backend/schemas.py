from pydantic import BaseModel


# pydantic のモデル
# HTTPリクエストやレスポンスにおいてJSONのデータとして扱うもの
# これが openapi のスキーマになる

class TaskBase(BaseModel):
    """
    基底クラス
    """
    title: str
    status: int


class TaskCreate(TaskBase):
    """
    作成リクエストのデータ受取用（つまり、まだデータベースに永続化されていない）ので id が不在のもの
    """
    pass


class Task(TaskBase):
    """
    データベースに永続化されたものなので id が存在する
    """
    id: int

    class Config:
        orm_mode = True
