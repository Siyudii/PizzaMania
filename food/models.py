from django.db import models
import uuid

# Create your models here.


class toppings(models.Model):
    primaryKey = models.IntegerField(default=0,primary_key=True)
    topping = models.CharField(max_length=64)
    charges = models.CharField(max_length=45,default=0)
    def __str__(self):
        return f"{self.primaryKey} {self.topping}"


class menu(models.Model):
    primaryKey = models.IntegerField(default=0,primary_key=True)
    pizza = models.CharField(max_length=64,default=0)
    large = models.CharField(max_length=45,default=0)
    small = models.CharField(max_length=45,default=0)

    def __str__(self):
        return f"{self.primaryKey} {self.pizza} {self.large} {self.small}"