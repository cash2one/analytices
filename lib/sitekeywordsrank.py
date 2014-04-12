# -*- coding:utf-8 -*-
from analytics.models import *
import StringIO,time, random
import urllib,re,cookielib,urllib2
#from lxml.html import soupparser
#from lxml.html.clean import Cleaner

class Cralwspider():
    def __init__(self):
        self.cookie = cookielib.LWPCookieJar()
        self.httpcookie = urllib2.HTTPCookieProcessor(self.cookie)
        self.opener = urllib2.build_opener(self.httpcookie)#urllib2.HTTPHandler())
        urllib2.install_opener(self.opener)

    def LoginOrPost(self,url,headers):
        #data = urllib.urlencode(data)
        #data = data.replace('+','%20')
        #print(data)
        req = urllib2.Request(
            url = url,
            #data = data,
            headers = headers,
            )
        #print(req)
        try:
            login_response = urllib2.urlopen(req)
            result = login_response.read()
        except :
            print(url, "can't open this url")
            #
        #print(result)
        delay = random.randint(1,2) #随机设定延时时间为1秒或2秒
        time.sleep(delay)
        return result

    def Logout(self,logoutUrl):
        self.opener.open(logoutUrl)
        print('-------------Logout ------------')

def RandomAgentHeader():
    useragent_list = [
        'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-GB; rv:1.8.1.6) Gecko/20070725 Firefox/2.0.0.6',
        'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)',
        'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; .NET CLR 1.1.4322)',
        'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; .NET CLR 1.1.4322)',
        'Opera/9.20 (Windows NT 6.0; U; en)',
        'Mozilla/4.0 (compatible; MSIE 5.0; Windows NT 5.1; .NET CLR 1.1.4322)',
        'Opera/9.00 (Windows NT 5.1; U; en)',
        'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; en) Opera 8.50',
        'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; en) Opera 8.0',
        'Mozilla/4.0 (compatible; MSIE 6.0; MSIE 5.5; Windows NT 5.1) Opera 7.02 [en]',
        'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.7.5) Gecko/20060127 Netscape/8.1',
        'Mozilla/5.0 (X11; Linux i686; rv:7.0.1) Gecko/20100101 Firefox/7.0.1',
        'Mozilla/5.0 (Windows NT 6.1; rv:14.0) Gecko/20100101 Firefox/14.0.1',
        'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-GB; rv:1.8.1.6) Gecko/20070725 Firefox/2.0.0.6',
        'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)',
        'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; .NET CLR 1.1.4322; .NET CLR 2.0.50727; .NET CLR 3.0.04506.30)',
        'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; .NET CLR 1.1.4322)',
        'Opera/9.20 (Windows NT 6.0; U; en)',
        'Mozilla/4.0 (compatible; MSIE 5.0; Windows NT 5.1; .NET CLR 1.1.4322)',
        'Opera/9.00 (Windows NT 5.1; U; en)',
        'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; en) Opera 8.50',
        'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; en) Opera 8.0',
        'Mozilla/4.0 (compatible; MSIE 6.0; MSIE 5.5; Windows NT 5.1) Opera 7.02 [en]',
        'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.7.5) Gecko/20060127 Netscape/8.1',
        'Mozilla/5.0 (X11; Linux i686; rv:7.0.1) Gecko/20100101 Firefox/7.0.1',
        ]
    useragent = useragent_list[random.randint(0, len(useragent_list)-1)]
    return useragent

def baiduRecord(id,site_url,added_by_id,):
    encoded_keyword = urllib.quote_plus('site:'+site_url.replace('http://',''))
    #下载SERP并提取链接
    url = 'http://www.baidu.com/s?wd=%s&rsv_bp=0&ch=&tn=baidu&bar=&rsv_spt=3&ie=utf-8&rsv_n=2&rsv_sug3=1&inputT=531' % encoded_keyword
    #print(url)
    #下载SERP，如果出现验证码即延时10分钟并重试
    useragent = RandomAgentHeader()
    headers = {
        'User-Agent':useragent
    }
    login_data = {
    }
    cs = Cralwspider()
    while 1:
        html = cs.LoginOrPost(url,headers)
        #print('aaa')
        if '<img src="http://verify.baidu.com/cgi-bin/' in html:
            time.sleep(600)
        else:
            break
    baidu_record,baidu_cache='',''
    #如果该关键词没有搜索结果（也可能是其它特殊情况，如百度页面改版）
    try:
        p = re.compile(r'<p class="site_tip"><strong>找到相关结果数(.*?)个。</strong>')
        p2 = re.compile(r'<div class="f13"><span class="g">%s/&nbsp;(.*?)&nbsp;</span>'%site_url.replace('http://',''))
        
        baidu_record = re.findall(p,html)
        baidu_cache = re.findall(p2,html)
        #print(baidu_record,baidu_cache)
        s = SiteRecord(web_site=SeoSites.objects.get(id=id),baidurecord=baidu_record[0],googlerecord=baidu_cache[0],added_by_id=added_by_id)
        s.save()
        #print(s)
        delay = random.randint(1,2) #随机设定延时时间为1秒或2秒
        time.sleep(delay)   #等待x秒以后继续查询下一个词的排名
    except:
        pass

def baiduRank(id,site_url,keyword,added_by_id):
    encoded_keyword = urllib.quote_plus(keyword.encode('utf8'))
    siteurlnohttp = site_url.replace('http://','')
    #print(encoded_keyword)
    #下载SERP并提取链接
    url = 'http://www.baidu.com/s?wd=%s&rn=100' % encoded_keyword
    #print(url)
    useragent = RandomAgentHeader()
    headers = {
        'User-Agent':useragent
    }
    login_data = {
    }
    cs = Cralwspider()
    #下载SERP，如果出现验证码即延时10分钟并重试
    while 1:
        html = cs.LoginOrPost(url,headers)
        #print(html) 
        if '<img src="http://verify.baidu.com/cgi-bin/' in html:
            time.sleep(600)
        else:
            break
    
    #如果该关键词没有搜索结果（也可能是其它特殊情况，如百度页面改版）
    try:
        #urls = re.findall('<h3 class="t".*?href="(.*?)"', html)
        urls = re.findall('<span class="g">(.*?)</span>',html)
        #print(urls)
    except:
        #baidu_record = 0
        #baidu_cache = 0
        urls = []
    #如果在前100名找到网站，则find=True
    find = False
 
    #在SERP上面的URL中，寻找网站并确定排名
    for pos, url in enumerate(urls, 1):
        if siteurlnohttp in url:
            #print('%s,%s,%d,\n' % (site_url,keyword,pos))
            kr=KeywordsRank(baidurank=pos,web_site_id=id,added_by_id=added_by_id)
            kr.save()
            find = True
            #print(url)
            break
    #如果前100名没有找到网站
    if not find:    #更标准的写法是if find==False:
        #print('%s,%s,%d, no found\n' % (site_url,keyword, -1))
        kr = KeywordsRank(baidurank='200',web_site_id=id,added_by_id=added_by_id)
        kr.save()
        delay = random.randint(1,2) #随机设定延时时间为1秒或2秒
        time.sleep(delay)   #等待x秒以后继续查询下一个词的排名

if __name__ == '__main__':
    baiduRecord('www.xincai888.com')
    #googleRecord('www.xincai888.com')
    #sogouRecord('www.xincai888.com')
    #sosoRecord('www.xincai888.com')
    #baiduRank('www.cairenhui.com','模拟炒股')