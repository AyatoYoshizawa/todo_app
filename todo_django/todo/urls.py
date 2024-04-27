from django.urls import path
from .views import *

urlpatterns = [
    path('v1/tasks', TaskListAPIView.as_view(), name='task-list')
]