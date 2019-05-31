from django.views import generic
from .models import Page, UserFileUpload
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .forms import UploadFileForm
import logging
from django.db.models import F
import os
from django.conf import settings
from django.http import HttpResponse, Http404


class IndexView(generic.ListView):
    template_name = 'wiki/index.html'
    context_object_name = 'pages'
    def get_queryset(self):
        return Page.objects.all()
    
    
class DetailView(generic.DetailView):
    model = Page
    template_name = 'wiki/detail.html'


def view_page(request, pk):
    try:
        page = Page.objects.get(pk=pk)
        page.counter = F('counter') + 1
        page.save(update_fields=['counter'])
        page.refresh_from_db()
        return render(request, 'wiki/detail.html', {'page': page})
    except Page.DoesNotExist:
        return render(request, 'wiki/create_page.html', {'page_name': pk})

@login_required(login_url='wiki:login')
def edit_page(request, pk):
    try:
        page = Page.objects.get(pk=pk)
        content = page.content
    except Page.DoesNotExist:
        content=''
    return render(request, 'wiki/edit_page.html',{ 'page_name':pk, 'content':content},)

def save_page(request, pk):
    content = request.POST["content"]
    try:
        page = Page.objects.get(pk=pk)
        page.content = content
    except Page.DoesNotExist:
        page = Page(title=pk, content=content)
    if 'Save' in request.POST:
        page.save()
    return redirect(page)

@login_required(login_url='wiki:login')
def upload_file(request):
    context = {}
    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
    else:
        form = UploadFileForm()
    context['form'] = form
    context['files'] = UserFileUpload.objects.all().order_by('upload')
    return render(request, 'wiki/upload.html', context)

@login_required(login_url='wiki:login')
def download_file(request, path):
    file_path = os.path.join(settings.MEDIA_ROOT + '/uploads', path)
    if os.path.exists(file_path):
        with open(file_path, 'rb') as fh:
            response = HttpResponse(fh.read(), content_type="application/vnd.ms-excel")
            response['Content-Disposition'] = 'inline; filename=' + os.path.basename(file_path)
            return response
    raise Http404

# Get an instance of a logger
logger = logging.getLogger(__name__)

def my_view(request, arg1, arg):
    if bad_mojo:
        # Log an error message
        logger.error('Something went wrong!')