from django.shortcuts import render
from django.http import JsonResponse
from json import JSONEncoder
from django.views.decorators.csrf import csrf_exempt
from web.models import User, Token, Expense, Income, Passwordresetcodes
from datetime import datetime
from .registerViews import register
from django.conf import settings
from django.db.models import Sum, Count
# Create your views here.


@csrf_exempt
def submit_expence(request):
    """user submits an expence"""

    # TODO: validate might be fake
    this_token = request.POST['token']
    this_user = User.objects.filter(token__token=this_token).get()
    if 'date' not in request.POST:
        date = datetime.now()
    Expense.objects.create(user=this_user, amount=request.POST['amount'],
                           text=request.POST['text'], date=date)

    return JsonResponse({
        'status': 'ok',
    }, encoder=JSONEncoder)


@csrf_exempt
def generalstat(request):
    #TODO: should get a valid duration (from-to), if not, use 1 month
    #TODO: is the TOKEN valid
    this_token = request.POST['token']
    this_user = User.objects.filter(token__token=this_token).get()
    income = Income.objects.filter(user = this_user).aggregate(Count('amount'),Sum('amount'))
    expense = Expense.objects.filter(user = this_user).aggregate(Count('amount'),Sum('amount'))
    context = {}
    context['expense'] = expense
    context['income'] = income
    return JsonResponse( context, encoder=JSONEncoder)


# homepage of System
def index(request):
    context = {}
    return render(request, 'index.html', context)


@csrf_exempt
def submit_income(request):
    """user submits an income"""

    # TODO: validate date. user might be fake, token might be fake ...
    #TODO: is the TOKEN valid
    this_token = request.POST['token']
    this_user = User.objects.filter(token__token=this_token).get()
    if 'date' not in request.POST:
        date = datetime.now()
    Income.objects.create(user=this_user, amount=request.POST['amount'],
                          text=request.POST['text'], date=date)

    return JsonResponse({
        'status': 'ok',
    }, encoder=JSONEncoder)
