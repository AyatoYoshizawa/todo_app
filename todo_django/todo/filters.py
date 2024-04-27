# filters.py

from django_filters import rest_framework as rf_filters
from .models import Task

class TaskFilter(rf_filters.FilterSet):
    status = rf_filters.CharFilter(field_name='status', lookup_expr='exact')
    title = rf_filters.CharFilter(field_name='title', lookup_expr='icontains')

    class Meta:
        model = Task
        fields = ['status', 'title']