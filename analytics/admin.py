#!/usr/bin/env python2
# -*- coding:utf-8 -*-
# Author: cbin
# mail: yu.cbin@gmail.com
from django.contrib import admin
from analytics.models import SeoSites,SiteRank,SiteRecord,SiteKeywords,KeywordsRank

class SeoSitesAdmin(admin.ModelAdmin):
    fields = ('siteurl','sitename','sitedate',)
    readonly_fields = ("sitedate",'added_by')
    list_filter = ('siteurl','sitename','sitedate',)
    list_display = ('siteurl','sitename','sitedate','added_by')
    list_per_page = 10
    """普通用户只显示自己数据，管理员用户显示全部"""
    def save_model(self, request, obj, form, change):
        if getattr(obj, 'added_by', None) is None:
            obj.added_by = request.user
        obj.last_modified_by = request.user
        obj.save()
    def queryset(self, request):
        qs = super(SeoSitesAdmin, self).queryset(request)
        # If super-user, show all comments
        if request.user is None:
            request.user = 'root'
        if request.user.is_superuser:
            return qs
        return qs.filter(added_by=request.user)

    class Media:
        js = ('js/tiny_mce/tiny_mce.js',
              'js/tiny_mce/textareas.js',)
admin.site.register(SeoSites, SeoSitesAdmin)

class SiteRankAdmin(admin.ModelAdmin):
    fields = ('web_site','alexasum','alexaday','pr','rankdate',)
    readonly_fields = ('rankdate','added_by')
    list_filter = ('web_site','pr','rankdate',)
    search_fields = ('web_site','pr',)
    list_display = ('web_site','pr','alexasum','alexaday','rankdate','added_by')
    list_per_page = 10
    """普通用户只显示自己数据，管理员用户显示全部"""
    def save_model(self, request, obj, form, change):
        if getattr(obj, 'added_by', None) is None:
            obj.added_by = request.user
        obj.last_modified_by = request.user
        obj.save()
    def queryset(self, request):
        qs = super(SiteRankAdmin, self).queryset(request)
        # If super-user, show all comments
        if request.user is None:
            request.user = 'root'
        if request.user.is_superuser:
            return qs
        return qs.filter(added_by=request.user)

    class Media:
        js = ('js/tiny_mce/tiny_mce.js',
              'js/tiny_mce/textareas.js',)

class SiteRecordAdmin(admin.ModelAdmin):
    fields = ('web_site','baidurecord','googlerecord','sogourecord','sosorecord','sorecord','bingrecord','yahoorecord','youdaorecord','recordate',)
    readonly_fields = ('recordate','added_by')
    list_filter = ('web_site','recordate',)
    search_fields = ('web_site',)
    list_display = ('web_site','baidurecord','googlerecord','recordate','added_by')
    list_per_page = 10

    """普通用户只显示自己数据，管理员用户显示全部"""
    def save_model(self, request, obj, form, change):
        if getattr(obj, 'added_by', None) is None:
            obj.added_by = request.user
        obj.last_modified_by = request.user
        obj.save()
    def queryset(self, request):
        qs = super(SiteRecordAdmin, self).queryset(request)
        # If super-user, show all comments
        if request.user is None:
            request.user = 'root'
        if request.user.is_superuser:
            return qs
        return qs.filter(added_by=request.user)

    class Media:
        js = ('js/tiny_mce/tiny_mce.js',
              'js/tiny_mce/textareas.js',)

class SiteKeywordsAdmin(admin.ModelAdmin):
    fields = ('web_site','keyword','keywordate',)
    readonly_fields = ('keywordate','added_by')
    list_filter = ('web_site','keyword','keywordate',)
    search_fields = ('web_site','keyword','keywordate',)
    list_display = ('web_site','keyword','keywordate','added_by')
    list_per_page = 10

    """普通用户只显示自己数据，管理员用户显示全部"""
    def save_model(self, request, obj, form, change):
        if getattr(obj, 'added_by', None) is None:
            obj.added_by = request.user
        obj.last_modified_by = request.user
        obj.save()
    def queryset(self, request):
        qs = super(SiteKeywordsAdmin, self).queryset(request)
        # If super-user, show all comments
        if request.user is None:
            request.user = 'root'
        if request.user.is_superuser:
            return qs
        return qs.filter(added_by=request.user)

    class Media:
        js = ('js/tiny_mce/tiny_mce.js',
              'js/tiny_mce/textareas.js',)

class KeywordsRankAdmin(admin.ModelAdmin):
    fields = ('web_site','baidurank','googlerank','sogourank','sosorank','sorank','bingrank','yahoorank','youdaorank','rankdate',)
    readonly_fields = ('rankdate','added_by')
    list_filter = ('web_site','rankdate',)
    search_fields = ('web_site',)
    list_display = ('web_site','baidurank','rankdate','added_by')
    list_per_page = 10

    """普通用户只显示自己数据，管理员用户显示全部"""
    def save_model(self, request, obj, form, change):
        if getattr(obj, 'added_by', None) is None:
            obj.added_by = request.user
        obj.last_modified_by = request.user
        obj.save()
    def queryset(self, request):
        qs = super(KeywordsRankAdmin, self).queryset(request)
        # If super-user, show all comments
        if request.user is None:
            request.user = 'root'
        if request.user.is_superuser:
            return qs
        return qs.filter(added_by=request.user)

    class Media:
        js = ('js/tiny_mce/tiny_mce.js',
              'js/tiny_mce/textareas.js',)

admin.site.register(SiteRank, SiteRankAdmin)
admin.site.register(SiteRecord, SiteRecordAdmin)
admin.site.register(SiteKeywords, SiteKeywordsAdmin)
admin.site.register(KeywordsRank, KeywordsRankAdmin)
