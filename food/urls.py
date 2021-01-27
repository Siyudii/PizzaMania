from django.urls import path
from . import views

urlpatterns = [
    path("",views.index,name="index"),
    path("login",views.login_view,name="login"),
    path("logout",views.logout_view,name="logout"),
    path("register",views.register,name="register"),
    path("ajaxMenu",views.ajax_menu_request,name="ajaxMenu"),
    path("ajaxTopping",views.ajax_toppings_request,name="ajaxTopping"),
]