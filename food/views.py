from django.contrib.auth import authenticate,login,logout
from .forms import RegisterForm
from django.shortcuts import render,redirect
from django.http import HttpResponse,HttpResponseRedirect,JsonResponse
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



def ajax_menu_request(request):
    
    # json_serializer = serializers.get_serializer("json")()
    pizzaId = json.load(request)['post_data']
    print(type(menu.objects.values('pizza').filter(primaryKey=pizzaId)))
    d = list(menu.objects.values('pizza').filter(primaryKey=pizzaId))
    # t = list(toppings.objects.all())
    # print(t)
    # print(type(t))
    # djson = json.dumps(menu.objects.all())
    # print(type(djson))
    # print(djson)
    data = {

        # "pizza" : menu.objects.values('pizza').filter(primaryKey=pizzaId),
        "pizza" : d,
        # "hi" : "hellooo"
        # "toppings" : t
    }
    return JsonResponse(data)

def ajax_toppings_request(request):
    # serializers.serialize("json", self.get_queryset())
    toppingsId = json.load(request)['post-data']
    arr = []
    for top in toppingsId:
        x = toppings.objects.values('topping').filter(primaryKey=top)
        v=list(x)
        # vr = json.dumps(v)
        arr.append(v)
    # print(arr)
    # print(type(vr))
    data = {
        "toppings" : arr,
        # "helo" : "hi"
    }
    return JsonResponse(data)
    



