from django.db import models
from django.utils import timezone

class Todo(models.Model):
   title = models.CharField(max_length=100)
   description = models.TextField()
   completed = models.BooleanField(default=False)
   start_date = models.CharField(max_length=50, default=timezone.now().strftime('%d/%m/%Y - %H:%M'))
   end_date = models.CharField(max_length=50, default=timezone.now().strftime('%d/%m/%Y - %H:%M'))

   def __str__(self):
     return self.title