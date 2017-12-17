"""
WSGI config for bestoon project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.11/howto/deployment/wsgi/
"""

import sys
path = '/home/ahmad/w/bestoon'
if path not in sys.path:
    sys.path.append(path)


import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "bestoon.settings")

application = get_wsgi_application()
