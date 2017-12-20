from django.contrib.auth.hashers import make_password, check_password
from django.http import JsonResponse
from json import JSONEncoder
from django.views.decorators.csrf import csrf_exempt
from web.models import User, Token, Expense, Income


@csrf_exempt
def login(request):
    if ('username' in request.POST) and ('password' in request.POST):
        username = request.POST['username']
        password = request.POST['password']
        this_user = User.objects.get(username = username)
        if (check_password(password, this_user.password)):
            this_token = Token.objects.get(user = this_user)
            token = this_token.token
            print (token)

            context = {}
            context['resault'] = 'ok'
            context['token'] = token
            return JsonResponse( context, encoder=JSONEncoder)

        else:
            context = {}
            context['resault'] = 'error'
            return JsonResponse( context, encoder=JSONEncoder)
