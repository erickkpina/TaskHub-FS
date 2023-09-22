from django.shortcuts import render
from .serializers import TodoSerializer 
from rest_framework import viewsets      
from .models import Todo         
from rest_framework import viewsets
from rest_framework import status     
from rest_framework.decorators import api_view
from rest_framework.response import Response   

@api_view(['DELETE'])
def delete_all_todos(request):
    try:
        # Exclua todos os elementos do banco de dados.
        Todo.objects.all().delete()
        return Response({'message': 'Todos os elementos foram excluídos com sucesso.'})
    except Exception as e:
        return Response({'error': str(e)}, status=500)

class TodoView(viewsets.ModelViewSet):  
    serializer_class = TodoSerializer   
    queryset = Todo.objects.all()  

     # Adicione a função delete para lidar com solicitações DELETE
    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
    # Função para lidar com solicitações PUT (atualização)
    def update(self, request, *args, **kwargs):
        try:
            partial = kwargs.pop('partial', False)
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data, partial=partial)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
    