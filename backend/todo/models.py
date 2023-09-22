from django.db import models
from django.utils import timezone

class Todo(models.Model):
   title = models.CharField(max_length=100)
   description = models.TextField()
   completed = models.BooleanField(default=False)
   start_date = models.CharField(max_length=10, default=timezone.now().strftime('%d/%m/%Y'))
   end_date = models.CharField(max_length=10, default=timezone.now().strftime('%d/%m/%Y'))

   def __str__(self):
     return self.title