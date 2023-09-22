from django.contrib import admin
from django.urls import path,include               
from rest_framework import routers                 
from todo import views                             

router = routers.DefaultRouter()                   
router.register(r'todos', views.TodoView, 'todo')  

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('todos/delete-all/', views.delete_all_todos, name='delete-all-todos')           
]