from .serializers import TodoSerializer 
from rest_framework import viewsets      
from .models import Todo         
from rest_framework import viewsets

class TodoView(viewsets.ModelViewSet):  
    serializer_class = TodoSerializer   
    queryset = Todo.objects.all()  
        
    