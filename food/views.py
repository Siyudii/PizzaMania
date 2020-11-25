from django.contrib.auth import authenticate,login,logout
from .forms import RegisterForm
from django.shortcuts import render,redirect
from django.http import HttpResponse,HttpResponseRedirect
from django.urls import reverse
from .models import toppings,menu
from django.core import serializers
import json

# Create your views here.
def index(request):
    # return HttpResponse("hello world!")
    print(type(menu))
    print(type(toppings))
    if not request.user.is_authenticated:
        return render(request,"login.html",{"message":None})
    
    json_serializer = serializers.get_serializer("json")()

    context = {
        "user":request.user,
        "menu":menu.objects.all(),
        "toppings":toppings.objects.all()
    }
    return render(request,"user.html",context)

def login_view(request):
    username = request.POST["username"]
    password = request.POST["password"]
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request,user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "login.html", {"message":"Invalid credentials"})

def logout_view(request):
    logout(request)
    return render(request,"login.html", {"message":"Logged Out."})

def register(response):
    if response.method == "POST":
        form=RegisterForm(response.POST)
        if form.is_valid():
            form.save()
            return redirect("/index")
    else:
        form=RegisterForm()
        
    return render(response,"register.html",{"form":form})


