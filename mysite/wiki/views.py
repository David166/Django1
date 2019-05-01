from django.views import generic

from .models import Page

class IndexView(generic.ListView):
    template_name = 'wiki/index.html'
    context_object_name = 'pages'
    
    def get_queryset(self):
        return Page.objects.all()

class DetailView(generic.DetailView):
    model = Page 
    template_name = "wiki/detail.html"
    
