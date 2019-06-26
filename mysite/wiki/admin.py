from django.contrib import admin

from .models import Page, UserFileUpload

# Through admin.py, the models are defined.
admin.site.register(Page)
admin.site.register(UserFileUpload)