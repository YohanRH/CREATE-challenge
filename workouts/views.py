from rest_framework.viewsets import ModelViewSet
from .models import Exercise, Workout
from .serializers import ExerciseSerializer, WorkoutSerializer

class ExerciseViewSet(ModelViewSet):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer

class WorkoutViewSet(ModelViewSet):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer
