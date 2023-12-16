from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.views import APIView

# class FormattingToJson(APIView):

#     def get(self, request):
#         Response({})

#     def post(self, request):
#         print(request.data)
#         Response({"yes it's post!!": "wow!"})

from rest_framework import status
from rest_framework.decorators import api_view
import json
import corsheaders

import api.text_operations as TO

@api_view(['GET', 'POST'])
def snippet_list(request):
    if request.method == 'GET':
        return Response({"yes it's get!!": "wow!"})

    elif request.method == 'POST':        
        return Response(TO.NodesToJson(request.data))