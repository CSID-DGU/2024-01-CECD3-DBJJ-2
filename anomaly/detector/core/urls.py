from django.urls import path
from . import views

urlpatterns = [
    path('train', views.train, name="train"),
    path('predict', views.predict, name="predict")
]