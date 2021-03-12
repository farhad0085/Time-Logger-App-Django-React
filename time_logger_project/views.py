from django.shortcuts import render


def index(request):
    return render(request, "build/index.html")

def view_404(request, exception):
    return render(request, "build/index.html")