from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ExerciseViewSet, WorkoutViewSet

router = DefaultRouter()
router.register('exercises', ExerciseViewSet)
router.register('workouts', WorkoutViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
