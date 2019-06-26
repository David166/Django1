from django.db import models
from django.urls import reverse

# Models are classes that make up the webpages in this server.

class Page(models.Model):
    title = models.CharField(max_length=64, primary_key=True)
    content = models.TextField()
    counter = models.IntegerField(default = 1)
    def __str__(self):
        return self.title
    
    # This redirects the user to the page that they have requested, retrieves and ooutputs content accordingly.
    def get_absolute_url(self):
        return reverse('wiki:detail', args=[self.title])

class UserFileUpload(models.Model):
    upload = models.FileField(upload_to='uploads/')
    #file will be saved to MEDIA_ROOT/uploads

    def __str__(self):
        return self.upload.name
