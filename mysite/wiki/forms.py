from django.forms import ModelForm
from .models import UserFileUpload

# In order to accept files submitted by users, forms must be used.
class UploadFileForm(ModelForm):
    class Meta:
        model = UserFileUpload
        fields = ['upload' ]