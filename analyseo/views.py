# -*- coding: utf-8 -*-
from django.http import HttpResponse
#from django.http import HttpRequest
from django.shortcuts import render_to_response,get_object_or_404,get_list_or_404
from django.contrib.sites.models import Site, RequestSite, get_current_site
from analytics.models import *
from django.http import HttpResponseRedirect
import random
from django.contrib.auth.models import User
from django.contrib.auth.views import *
from lib.siterank import GooglePageRank,AlexaTrafficRank,RankProvider
from lib.sitekeywordsrank import *
from analytics.models import SeoSites,SiteRank,SiteKeywords,SiteRecord
import time
import datetime
now = datetime.datetime.now()
start = now - datetime.timedelta(hours=23, minutes=59, seconds=59)
#result = threads.objects.filter(post_date__gt=start)


def site_friend_link(request):
    #Site(domain='www.suretoo.com', name='www.suretoo.com').save()
    sites = Site.objects.all()
    #site = sites.domain sites.name
    #meta = request.META
    #print 'meta %s'%meta
    #https://github.com/aobo711/bootstrap-django-admin
    #site = 'http://godaddycoupon.suretoo.com'
    return sites
def index(request):
    site_users = User.objects.filter(is_active=True)
    #site_users_website =
    return render_to_response('base.html',{"site_users":site_users})

def user_by_name(request,username):
    username = username.replace('/','')
    #print(username)
    seosite = SeoSites.objects.filter(added_by__username=username)
    #print(seosite)
    alexasite = SiteRank.objects.filter(added_by__username=username,rankdate__lt=(datetime.datetime.now()-datetime.timedelta(days=1)))[:2]
    return render_to_response('rank.html',{"seosite":seosite,"username":username,"alexasite":alexasite})

def alexa(request):
    xdata = ["Apple", "Apricot", "Avocado", "Banana", "Boysenberries", "Blueberries", "Dates", "Grapefruit", "Kiwi", "Lemon"]
    ydata = [52, 48, 160, 94, 75, 71, 490, 82, 46, 17]
    chartdata = {'x': xdata, 'y': ydata}
    charttype = "pieChart"
    chartcontainer = 'piechart_container'
    data = {
        'charttype': charttype,
        'chartdata': chartdata,
        'chartcontainer': chartcontainer,
        'extra': {
            'x_is_date': False,
            'x_axis_format': '',
            'tag_script_js': False,
            'jquery_on_ready': False,
        }
    }
    #site = get_list_or_404(SeoSites,siteurl__startswith='http://www.')
    #alexa2 = []
    #for s in site:
    #    alexa2.append(get_list_or_404(SiteRank,web_site__siteurl=s.siteurl))
    #alexa = get_list_or_404(SiteRank,web_site__siteurl='http://www.cairenhui.com')
    #print(alexa2)
    #print(alexa)
    return render_to_response('piecharts.html',data)
def alexa_site(request,url):
    url = 'http://'+url
    #print('alexa site')
    alexa = get_list_or_404(SiteRank,web_site__siteurl=url)
    return render_to_response('alexa_site.html',locals())

def record(request,url):
    url = 'http://'+url
    record = get_list_or_404(SiteRecord,web_site__siteurl=url)
    return  render_to_response('base.html',locals())

def kwrank(request,url):
    url = 'http://'+url
    record = get_list_or_404(SiteKeywords,web_site__siteurl=url)
    for r in record:
        k = r.keyword
        kr = KeywordsRank.objects.filter(web_site_id=r.id)
    return  render_to_response('base.html',locals())


def rdexe(request):
    site = SeoSites.objects.all()
    for s in site:
        baiduRecord(s.siteurl)
    return HttpResponse('record pg is done')


def kwexe(request):
    kw  = SiteKeywords.objects.all()
    print(kw)
    for k in kw:
        print(k.id,k.web_site.siteurl,k.keyword)
        baiduRank(k.id,k.web_site.siteurl,k.keyword)

    return HttpResponse('baiduRank is done !')

def cron_record(request):
    site = SeoSites.objects.all()
    for s in site:
        #print(s.siteurl,s.added_by_id)
        baiduRecord(s.id,s.siteurl,s.added_by_id)
    return HttpResponse(' cron_record is OK')
def cron_baidurank(request):
    kw  = SiteKeywords.objects.all()
    #print(kw)
    for k in kw:
        #print(k.id,k.web_site.siteurl,k.keyword)
        baiduRank(k.id,k.web_site.siteurl,k.keyword,k.added_by_id)
    return HttpResponse('cron_baidurank is ok')

def cron_alexa(request):
    site = SeoSites.objects.filter(siteurl__startswith="http://www.")
    #print(site)
    for s in site:
        url = s.siteurl
        added_by_id = s.added_by_id
        alexa = AlexaTrafficRank().get_rank(url)
        if alexa is None:
            alexasum,alexaday = 0,0
        else:
            alexasum,alexaday = alexa[0],alexa[1]
        pr = GooglePageRank().get_rank(url)
        if pr is None:
            pr = 0
        else:
            pr = pr
        #print(alexasum,alexaday,pr)
        rank = SiteRank(web_site=SeoSites.objects.get(id=s.id),alexasum=alexasum,alexaday=alexaday,pr=pr,added_by_id=added_by_id)
        rank.save()
        time.sleep(1)
    return HttpResponse('cron_alexa is ok')
