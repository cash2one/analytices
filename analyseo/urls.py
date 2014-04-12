# -*- coding: utf-8 -*-
from django.conf.urls import patterns, include, url
from django.views.generic.simple import direct_to_template
from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings
admin.autodiscover()
from djadmin_export import register
register.auto_register_exporters()

urlpatterns = patterns('',
    url(r'^media/(?P<path>.*)$', 'django.views.static.serve',{'document_root': settings.MEDIA_ROOT },name='media'),
    url(r'^static/(?P<path>.*)$', 'django.views.static.serve',{'document_root': settings.STATIC_ROOT },name='static'),
    url(r'^$', 'analyseo.views.index', name='index'),
    url(r'^users/(.*)$', 'analyseo.views.user_by_name', name='users'),
    #url(r'^$', 'analyseo.views.index', name='index'),
    url(r'^alexa/$', 'analyseo.views.alexa', name='alexa'),
    url(r'^site_record/$', 'analyseo.views.cron_record', name='site_record'),
    url(r'^site_keyword/$', 'analyseo.views.cron_baidurank', name='site_keyword'),
    url(r'^site_alexa/$','analyseo.views.cron_alexa',name='site_alexa'),
    url(r'^alexa/(.*)/$','analyseo.views.alexa_site',name='alexa_site'),
    url(r'^record/(.*)/$','analyseo.views.record',name='rerank'),
    url(r'^keyword/(.*)/$','analyseo.views.kwrank',name='kwrank'),
    url(r'^rdexe/','analyseo.views.rdexe',name='rdexe'),
    url(r'^kwexe/','analyseo.views.kwexe',name='kwdexe'),
    # url(r'^analyseo/', include('analyseo.foo.urls')),
    # Uncomment the admin/doc line below to enable admin documentation:
    #url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
)
urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
urlpatterns += patterns('',url(r'^robots\.txt$', direct_to_template,{'template': 'robots.txt', 'mimetype': 'text/plain'}),)