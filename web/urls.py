from django.conf.urls import url
from . import views
from django.contrib.auth.views import logout

urlpatterns = [
    url(r'^submit/expense/$', views.submit_expence, name='submit_expense'),
    url(r'^submit/income/$', views.submit_income, name='submit_income'),
    url(r'^q/generalstat/$', views.generalstat, name='generalstat'),
    url(r'^register/$', views.register, name='register'),
    url(r'^accounts/register/$', views.register, name='register'),
    url(r'^accounts/whoami/$', views.whoami, name='whoami'),
    url(r'^accounts/login/$', views.login, name='login'),
    url(r'^logout/$', logout, {'next_page': '/'}, name='logout'),
    url(r'^news/$', views.news, name='news'),
    url(r'^$', views.index, name='index'),
]
