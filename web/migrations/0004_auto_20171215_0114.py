# Generated by Django 2.0 on 2017-12-15 01:14

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('web', '0003_token'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Expence',
            new_name='Expense',
        ),
    ]
