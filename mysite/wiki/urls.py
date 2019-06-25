from django.urls import path, include

from . import views

app_name = 'wiki'

# The URLs that the user will be able to access.
urlpatterns = [
    path('', views.IndexView.as_view(), name='index'), 
    path('download/uploads/<str:path>/', views.download_file, name='download'),
    path('upload/', views.upload_file, name='upload_page' ),
    path('<str:pk>/edit', views.edit_page, name='edit_page'),
    path('<str:pk>/save', views.save_page, name='save_page'),
    path('<str:pk>/', views.view_page, name='detail'),
]

urlpatterns += [
    path('accounts/', include('django.contrib.auth.urls')),
]