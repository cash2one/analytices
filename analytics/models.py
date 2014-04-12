# -*- coding: utf-8 -*-
from django.db import models
#from uuslug import uuslug
from django.contrib.auth.models import User
import sys
reload(sys)
sys.setdefaultencoding("utf-8")

class SeoSites(models.Model):
    class Meta:
        verbose_name = u'网站管理'
        verbose_name_plural = u"网站管理"
    ordering = ['-sitedate']
    siteurl = models.CharField(verbose_name=u'网站URL',max_length='30',blank=True)
    sitename = models.CharField(verbose_name=u'网站名称',max_length=50,blank=True,null=True)
    sitedate = models.DateTimeField(verbose_name=u'网站添加时间',blank=True,auto_now=True,auto_now_add=True)
    added_by = models.ForeignKey(User,null=True,blank=True,verbose_name=u'用户',)
    def __unicode__(self):
        return self.siteurl
class SiteRank(models.Model):
    class Meta:
        verbose_name = u'网站ALEXA-PR统计'
        verbose_name_plural = u"网站ALEXA-PR统计"
        ordering = ['-rankdate']
    alexasum = models.CharField(verbose_name=u'Alexa总排名',max_length=60,blank=True)
    alexaday = models.CharField(verbose_name=u'Alexa日排名',max_length=60,blank=True,null=True,)
    web_site = models.ForeignKey(SeoSites,verbose_name=u'对应网站：请选择网站')
    pr= models.CharField(verbose_name=u'ＰＲ',max_length=10,blank=True,null=True)
    rankdate = models.DateTimeField(verbose_name=u'查询时间',blank=True,auto_now=True,auto_now_add=True)
    added_by = models.ForeignKey(User,null=True,blank=True,verbose_name=u'用户',)
    def __unicode__(self):
        return self.alexasum

class SiteRecord(models.Model):
    class Meta:
        verbose_name = u'网站收录查询'
        verbose_name_plural = u'网站收录查询'#(baidu,google,sogou,soso,bing,so360,yahoo,youdao)'
        ordering = ['-recordate']
    baidurecord = models.CharField(verbose_name=u'百度收录',max_length=60,blank=True,)
    googlerecord = models.CharField(verbose_name=u'百度快照',max_length=60,blank=True,null=True,)
    sogourecord = models.CharField(verbose_name=u'sogou收录',max_length=60,blank=True,)
    sosorecord = models.CharField(verbose_name=u'soso收录',max_length=60,blank=True,null=True,)
    bingrecord = models.CharField(verbose_name=u'bing收录',max_length=60,blank=True,null=True,)
    sorecord = models.CharField(verbose_name=u'so360收录',max_length=60,blank=True,)
    yahoorecord = models.CharField(verbose_name=u'yahoo收录',max_length=60,blank=True,null=True,)
    youdaorecord = models.CharField(verbose_name=u'youdao收录',max_length=60,blank=True,null=True,)
    web_site = models.ForeignKey(SeoSites,verbose_name=u'对应网站：请选择网站')
    recordate = models.DateTimeField(verbose_name=u'查询时间',blank=True,auto_now=True,auto_now_add=True)
    added_by = models.ForeignKey(User,null=True,blank=True,verbose_name=u'用户',)
    def __unicode__(self):
        return self.baidurecord

class SiteKeywords(models.Model):
    class Meta:
        verbose_name = u'网站关键词管理'
        verbose_name_plural = u"网站关键词管理"
        ordering = ['-keywordate']
    keyword = models.CharField(verbose_name=u'关键词',max_length=60,blank=True)
    web_site = models.ForeignKey(SeoSites,verbose_name=u'对应网站：请选择网站')
    keywordate = models.DateTimeField(verbose_name=u'查询时间',blank=True,auto_now=True,auto_now_add=True)
    added_by = models.ForeignKey(User,null=True,blank=True,verbose_name=u'用户',)
    def __unicode__(self):
        return '%s %s'%(self.web_site,self.keyword)

class KeywordsRank(models.Model):
    class Meta:
        verbose_name = u'网站关键词排名'
        verbose_name_plural = u"网站关键词排名"#(baidu,google,sogou,soso,bing,so,yahoo,youdao)"
        ordering = ['-rankdate']
    baidurank = models.CharField(verbose_name=u'百度排名',max_length=60,blank=True,default=200,)
    googlerank = models.CharField(verbose_name=u'google排名',max_length=60,blank=True,null=True,default=200,)
    sogourank = models.CharField(verbose_name=u'sogou排名',max_length=60,blank=True,default=200,)
    sosorank = models.CharField(verbose_name=u'soso排名',max_length=60,blank=True,null=True,default=200,)
    bingrank = models.CharField(verbose_name=u'bing排名',max_length=60,blank=True,null=True,default=200,)
    sorank = models.CharField(verbose_name=u'so排名',max_length=60,blank=True,default=200,)
    yahoorank = models.CharField(verbose_name=u'yahoo排名',max_length=60,blank=True,null=True,default=200,)
    youdaorank = models.CharField(verbose_name=u'youdao排名',max_length=60,blank=True,null=True,default=200,)
    web_site = models.ForeignKey(SiteKeywords,verbose_name=u'对应网站：请选择网站')
    rankdate = models.DateTimeField(verbose_name=u'查询时间',blank=True,auto_now=True,auto_now_add=True)
    added_by = models.ForeignKey(User,null=True,blank=True,verbose_name=u'用户',)
    def __unicode__(self):
        return self.baidurank