from django.shortcuts import render
from rest_framework.response import Response
from django.forms.models import model_to_dict
from rest_framework.views import APIView

from serverAPI.models import Point, Route

# Create your views here.

class AddGetDataView(APIView):
    def get(self, request):
        ans = []
        for route in Route.objects.all():
            ans.append({'points' : [model_to_dict(point, ['dis', 'sh']) for point in route.point_set.all()], 'id' : route.id})
        return Response(ans)
    
    def post(self, request):
        for obj in request.data:
            route = Route.objects.get(pk=obj['id'])
            route.point_set.all().delete()

            for point in request.data['points']:
                Point.objects.create(point['distance'], point['sh'], route)
        
        return Response('ok')

    def patch(self, request):
        data = request.data['message']
        for way in data:
            route = Route.objects.create()
            for point in way['points']:
                p = Point.objects.create(sh=point['SH'], dis=point['distance'], way=route)
        return Response('ok')
