from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1.0/user/', include('userAPI.urls')),
    path('api/v1.0/event/', include('eventAPI.urls')),
    path('api/v1.0/local/', include('localAPI.urls')),
]
