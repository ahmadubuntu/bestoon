from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from json import JSONEncoder
from django.views.decorators.csrf import csrf_exempt
from .models import User, Token, Expense, Income, Passwordresetcodes
from datetime import datetime
from .registerViews import register
from .loginViews import login
from django.conf import settings
from django.db.models import Sum, Count
# Create your views here.
from django.views.decorators.http import require_POST
from .whoamiViews import whoami
from .newsViews import news
from django.core import serializers

@csrf_exempt
@require_POST
def submit_expence(request):
    """user submits an expence"""

    # TODO: validate might be fake
    this_token = request.POST['token']
    this_user = User.objects.filter(token__token=this_token).get()
    if 'date' not in request.POST:
        date = datetime.now()
    else:
        date = request.POST['date']
    Expense.objects.create(user=this_user, amount=request.POST['amount'],
                           text=request.POST['text'], date=date)

    return JsonResponse({
        'status': 'ok',
    }, encoder=JSONEncoder)


@csrf_exempt
@require_POST
def query_expenses(request):
    this_token = request.POST['token']
    num = request.POST.get('num', 10)
    this_user = get_object_or_404(User, token__token=this_token)
    expenses = Expense.objects.filter(user=this_user).order_by('-date')[:num]
    expenses_serialized = serializers.serialize("json", expenses)
    return JsonResponse(expenses_serialized, encoder=JSONEncoder, safe=False)


@csrf_exempt
@require_POST
def query_incomes(request):
    this_token = request.POST['token']
    num = request.POST.get('num', 10)
    this_user = get_object_or_404(User, token__token=this_token)
    incomes = Income.objects.filter(user=this_user).order_by('-date')[:num]
    incomes_serialized = serializers.serialize("json", incomes)
    return JsonResponse(incomes_serialized, encoder=JSONEncoder, safe=False)


@csrf_exempt
@require_POST
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
@require_POST
def submit_income(request):
    """user submits an income"""

    # TODO: validate date. user might be fake, token might be fake ...
    #TODO: is the TOKEN valid
    this_token = request.POST['token']
    this_user = User.objects.filter(token__token=this_token).get()
    if 'date' not in request.POST:
        date = datetime.now()
    else:
        date = request.POST['date']
    Income.objects.create(user=this_user, amount=request.POST['amount'],
                          text=request.POST['text'], date=date)

    return JsonResponse({
        'status': 'ok',
    }, encoder=JSONEncoder)




@csrf_exempt
@require_POST
def edit_expense(request):
    """edit an income"""
    print (request.POST)
    this_text = request.POST['text'] if 'text' in request.POST else ""
    this_amount = request.POST['amount'] if 'amount' in request.POST else "0"
    this_pk = request.POST['id'] if 'id' in request.POST else "-1"
    this_token = request.POST['token'] if 'token' in request.POST else ""
    this_user = get_object_or_404(User, token__token=this_token)

    this_expense = get_object_or_404(Expense, pk=this_pk, user=this_user)
    this_expense.text = this_text
    this_expense.amount = this_amount
    this_expense.save()
    return JsonResponse({
        'status': 'ok',
    }, encoder=JSONEncoder)


@csrf_exempt
@require_POST
def edit_income(request):
    """ edit an income """
    this_text = request.POST['text'] if 'text' in request.POST else ""
    this_amount = request.POST['amount'] if 'amount' in request.POST else "0"
    this_pk = request.POST['id'] if 'id' in request.POST else "0"
    this_token = request.POST['token'] if 'token' in request.POST else ""
    this_user = get_object_or_404(User, token__token=this_token)

    this_income = get_object_or_404(Income, pk=this_pk, user=this_user)
    this_income.text = this_text
    this_income.amount = this_amount
    this_income.save()

    return JsonResponse({
        'status': 'ok',
    }, encoder=JSONEncoder)
