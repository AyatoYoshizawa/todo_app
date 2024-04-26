from django.db import models

# Create your models here.
class Task(models.Model):
    status = models.IntegerField()
    title = models.CharField(max_length=255)
    deadline = models.DateTimeField()