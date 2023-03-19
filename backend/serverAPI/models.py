from django.db import models

# Create your models here.

class Point(models.Model):
    dis = models.IntegerField(blank=True, null=True)
    sh = models.IntegerField(blank=True, null=True)
    way = models.ForeignKey('Route', on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self) -> str:
        return f'{self.id}'

class Route(models.Model):
    
    def __str__(self) -> str:
        return f'{self.id}'


