from django.db import models

class Task(models.Model):
    status = models.IntegerField()
    title = models.CharField(max_length=255)
    deadline = models.DateTimeField()

    def __str__(self):
        return self.title