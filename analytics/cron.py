# -*- coding: utf-8 -*-
from analytics.models import SeoSites,SiteRank,SiteKeywords,SiteRecord
from lib.siterank import GooglePageRank,AlexaTrafficRank,RankProvider
from lib.sitekeywordsrank import *
import time
import datetime
from django.utils.timezone import utc

from django_cron import CronJobBase, Schedule
__author__ = 'cbin'
"""
    python manager.py runcrons

"""

now = datetime.datetime.utcnow().replace(tzinfo=utc)
SiteRank.rankdate = datetime.datetime.utcnow().replace(tzinfo=utc)

class MyCronAlexaRank(CronJobBase):
    #RUN_EVERY_MINS = 1440
    RUN_AT_TIMES = ['01:30'] # every 2 hours
    schedule = Schedule(run_at_times=RUN_AT_TIMES)
    code = 'analyseo.MyCron.AlexaRank'    # a unique code

    def do(self):
        site = SeoSites.objects.filter(siteurl__startswith="http://www.")
        for s in site:
            url = s.siteurl
            added_by_id = s.added_by_id
            alexa = AlexaTrafficRank().get_rank(url)
            if alexa is None:
                alexasum,alexaday = 0,0
            else :
                alexasum,alexaday = alexa[0],alexa[1]
            pr = GooglePageRank().get_rank(url)
            if pr is None:
                pr = 0
            else:
                pr = pr
            print(alexasum,alexaday,pr)
            print(now)
            rank = SiteRank(web_site=SeoSites.objects.get(id=s.id),alexasum=alexasum,alexaday=alexaday,pr=pr,added_by_id=added_by_id,rankdate=now)
            rank.save()
            time.sleep(1)


class MyCronBaiduRecord(CronJobBase):
    #RUN_EVERY_MINS = 1440,run_every_mins=RUN_EVERY_MINS,
    RUN_AT_TIMES = ['05:00'] # every 2 hours
    schedule = Schedule(run_at_times=RUN_AT_TIMES)
    code = 'analyseo.MyCron.BaiduRecord'    # a unique code

    def do(self):
        site = SeoSites.objects.all()
        for s in site:
            #print(s.id,s.siteurl,s.added_by_id)
            baiduRecord(s.id,s.siteurl,s.added_by_id)

class MyCronBaiduRank(CronJobBase):
    #RUN_EVERY_MINS = 1440
    RUN_AT_TIMES = ['07:10'] # every 2 hours
    schedule = Schedule(run_at_times=RUN_AT_TIMES)
    code = 'analyseo.MyCron.BaiduRank'    # a unique code

    def do(self):
        kw  = SiteKeywords.objects.all()
        #print(kw)
        for k in kw:
            #print(k.id,k.web_site.siteurl,k.keyword)
            baiduRank(k.id,k.web_site.siteurl,k.keyword,k.added_by_id)
