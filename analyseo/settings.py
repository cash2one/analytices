# Django settings for stockstudy project.
import  os
import sys
DEBUG = True
TEMPLATE_DEBUG = DEBUG
#PREPEND_WWW = True#301 redirect to wwww
APPEND_SLASH = True#url add end "/"
ADMINS = (
    ('cbin', 'ggyqfc@gmail.com'),
)

ADMINS = (
# ('Your Name', 'your_email@example.com'),
)

ADMIN_EXPORTERS = (
    'djadmin_export.exporters.xlsx.XLSXExporter',
)

MANAGERS = ADMINS
dbpath = os.path.dirname(os.path.dirname(__file__))
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3', # Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
        'NAME': '%s/analyseo.db'%dbpath,                      # Or path to database file if using sqlite3.
        'USER': '',                      # Not used with sqlite3.
        'PASSWORD': '',                  # Not used with sqlite3.
        'HOST': '',                      # Set to empty string for localhost. Not used with sqlite3.
        'PORT': '',                      # Set to empty string for default. Not used with sqlite3.
    }
}
if 'testserver' in sys.argv:
    DATABASES['default']['TEST_NAME'] = '%s/TEST_analyseo.db'%dbpath

# Local time zone for this installation. Choices can be found here:
# http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
# although not all choices may be available on all operating systems.
# On Unix systems, a value of None will cause Django to use the same
# timezone as the operating system.
# If running in a Windows environment this must be set to the same as your
# system time zone.
#USE_TZ=False
TIME_ZONE = 'Asia/Shanghai'#'Atlantic/St_Helena'#'Asia/Shanghai'
# Hosts/domain names that are valid for this site; required if DEBUG is False
# See https://docs.djangoproject.com/en//ref/settings/#allowed-hosts
ALLOWED_HOSTS = []

# Local time zone for this installation. Choices can be found here:
# http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
# although not all choices may be available on all operating systems.
# In a Windows environment this must be set to your system time zone.
# Language code for this installation. All choices can be found here:
# http://www.i18nguy.com/unicode/language-identifiers.html
LANGUAGE_CODE = 'zh-cn'

SITE_ID = 1

# If you set this to False, Django will make some optimizations so as not
# to load the internationalization machinery.
USE_I18N = True

# If you set this to False, Django will not format dates, numbers and
# calendars according to the current locale.
USE_L10N = True

# If you set this to False, Django will not use timezone-aware datetimes.
USE_TZ = True

HERE = os.path.dirname(os.path.dirname(__file__))

# Absolute filesystem path to the directory that will hold user-uploaded files.
# Example: "/home/media/media.lawrence.com/media/"
#MEDIA_ROOT = os.path.join( HERE ,'media').replace('\\','/')
#MEDIA_ROOT = HERE
#MEDIA_URL = '/media/'
STATIC_ROOT = os.path.join(HERE,'static').replace('\\','/')
MEDIA_ROOT = os.path.join(HERE,'media').replace('\\','/')
MEDIA_URL = '/media/'
STATIC_URL = '/static/'
STATICFILES_DIRS = (
    # Put strings here, like "/home/html/static" or "C:/www/django/static".
    # Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.
    os.path.join(HERE,'/static/').replace('\\','/'),
    ("images", os.path.join(STATIC_ROOT, 'images')),
    ('js', os.path.join(STATIC_ROOT, 'js')),
    ('css', os.path.join(STATIC_ROOT, 'css')),
    ('admin',os.path.join(STATIC_ROOT,'admin')),
    ('nvd3', os.path.join(STATIC_ROOT, 'nvd3')),
    ('d3', os.path.join(STATIC_ROOT, 'd3')),
    ("upload", os.path.join(MEDIA_ROOT, 'upload')),
    ("thumbnail", os.path.join(MEDIA_ROOT, 'thumbnail')),
)

# List of finder classes that know how to find static files in
# various locations.
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    #    'django.contrib.staticfiles.finders.DefaultStorageFinder',
)

# Make this unique, and don't share it with anybody.
SECRET_KEY = 'g2xyq*_3krrv-81eav#^(=rf=+*snvy6=pk#+hn44^a9ii*%5s'

# List of callables that know how to import templates from various sources.
TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.Loader',
    'django.template.loaders.app_directories.Loader',
#     'django.template.loaders.eggs.Loader',
)

TEMPLATE_CONTEXT_PROCESSORS = (
    "django.contrib.auth.context_processors.auth",
    "django.core.context_processors.debug",
    "django.core.context_processors.i18n",
    "django.core.context_processors.media",
    "django.core.context_processors.request"
)

MIDDLEWARE_CLASSES = (
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'pagination.middleware.PaginationMiddleware',
    # Uncomment the next line for simple clickjacking protection:
    # 'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'analyseo.urls'

# Python dotted path to the WSGI application used by Django's runserver.
WSGI_APPLICATION = 'analyseo.wsgi.application'

import os
TEMPLATE_DIRS = (os.path.join(os.path.dirname(__file__), '..', 'templates').replace('\\','/'),)

CRON_CLASSES = [
    "analytics.cron.MyCronAlexaRank",
    "analytics.cron.MyCronBaiduRecord",
    "analytics.cron.MyCronBaiduRank",
]

INSTALLED_APPS = (
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'admin_bootstrap',
    'django_nvd3',
    'pagination',
    'djadmin_export',
    'analytics',
    "django_cron",
    # Uncomment the next line to enable the admin:
    'django.contrib.admin',
    # Uncomment the next line to enable admin documentation:
    # 'django.contrib.admindocs',
)
#email setting
FAILED_RUNS_CRONJOB_EMAIL_PREFIX = "gameof_life@qq.com"
EMAIL_HOST = 'smtp.webfaction.com'
EMAIL_HOST_USER = 'cbingo   '
EMAIL_HOST_PASSWORD = 'Xuan20120419'
DEFAULT_FROM_EMAIL = 'admin@xincai888.com'
SERVER_EMAIL = 'admin@xincai888.com'
# A sample logging configuration. The only tangible logging
# performed by this configuration is to send an email to
# the site admins on every HTTP 500 error when DEBUG=False.
# See http://docs.djangoproject.com/en/dev/topics/logging for
# more details on how to customize your logging configuration.
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse'
        }
    },
    'handlers': {
        'mail_admins': {
            'level': 'ERROR',
            'filters': ['require_debug_false'],
            'class': 'django.utils.log.AdminEmailHandler'
        }
    },
    'loggers': {
        'django.request': {
            'handlers': ['mail_admins'],
            'level': 'ERROR',
            'propagate': True,
        },
    }
}
