var addMainDataInSIComp, addTabsForSIComp, calculTopBars, calculTopPriorities, checkEmptyModule, checkWooChart, cleanWooCharts, competizeAll, competizeBacklinksCounter, competizeSocialImpact, competizeTopRankingKeywords, currentText, days2Sub, formatMomentJs, getColorCode, getCompetitorsScore, getCountryCode, getRelatedScore, getScoreIn, getURLParameter, initCompTabs, initTopBarTrial, initWooCounter, loadMustachesFiles, localizations, months2Sub, newString, putSIDataInArray, setInsideRank, splitted, twitterAge, updateAllWooHighChartsHeight, updateWooCounter, updateWooHighCharts, usePiecon, wooGeoCharts, wooHighCharts, wooMap, wooMaps, years2Sub, _checkWooChart;
usePiecon = !0, initWooCounter = function() {
    var t, e, n, a;
    return t = Raphael("holder", widthHeight + 1, widthHeight + 1), e = {stroke: "#fff","stroke-width": strokeSize}, n = $("#score-value"), t.customAttributes.arc = function(t, e) {
        var a, i, o, r, s, l, c, d;
        return s = void 0, i = 360 / e * t, a = (90 - i) * Math.PI / 180, c = widthHeight / 2 + radius * Math.cos(a), d = widthHeight / 2 - radius * Math.sin(a), r = "hsb(".concat(.0444 + .2361 * (t / e), ", 1 , .75)"), o = "" + Math.round(t) / 10, l = o.split("."), l[1] ? n.html(l[0] + "<span class='decimal'>." + l[1] + "</span>") : n.html(l[0]), s = e === t ? [["M", widthHeight / 2, widthHeight / 2 - radius], ["A", radius, radius, 0, 1, 1, widthHeight / 2, widthHeight / 2 - radius]] : [["M", widthHeight / 2, widthHeight / 2 - radius], ["A", radius, radius, 0, +(i > 180), 1, c, d]], {path: s,stroke: r}
    }, a = n.text(), window.wooCounter = a ? t.path().attr(e).attr({arc: [10 * a, 1e3, radius]}).translate(1, 0) : t.path().attr(e).attr({arc: [1e3, 1e3, radius]}).translate(1, 0), usePiecon ? (Piecon.setOptions({color: "#315D86",background: "#ddd",shadow: "#fff",fallback: !1}), Piecon.setProgress(Math.round(a))) : void 0
}, setInsideRank = function(t) {
    var e, n;
    return isInsideReview ? (e = "e", t >= 70 ? e = "aplus" : t >= 60 ? e = "a" : t >= 50 ? e = "b" : t >= 40 ? e = "c" : t >= 30 && (e = "d"), n = e.replace("plus", '<span class="plus">+</span>'), $("#score-inside").addClass("rank-" + e).find("#rank-value").html(n)) : void 0
}, updateWooCounter = function() {
    return isInsideReview ? void 0 : $("span.crit-score-pond").each(function() {
        var t;
        return t = parseFloat($(this).text()), currentScoring += 10 * t, wooCounter.animate({arc: [currentScoring, 1e3, radius]}, 1e3, "<>"), $(this).remove(), usePiecon ? Piecon.setProgress(Math.round(currentScoring / 10)) : void 0
    })
}, checkEmptyModule = function() {
    return $("#report-content>.module.hidden, #right-panel:not(.light-report) #report-content>.module.module-empty").remove(), $("#report-content>.module:not(.hidden)").each(function() {
        var t, e;
        return e = $(this), t = e.children(".teasing-box, .criterium:not(.hidden)"), 1 === e.children().length || 0 === t.length ? (e.remove(), $("#review-navigation, #extension-navigation").find(">a[href=#" + e.attr("id") + "]").remove()) : void 0
    }), $("#review-navigation>a:not(.hidden)").each(function() {
        var t, e;
        return e = $(this), t = $(e.attr("href")), 0 === t.length || t.hasClass("hidden") || t.hasClass("module-empty") ? e.remove() : void 0
    })
}, getURLParameter = function(t) {
    var e, n;
    return n = decodeURI(RegExp(t + "=" + "(.+?)(&|$)").exec(location.search)), n || (n = ","), e = n.split(","), e[1]
}, putSIDataInArray = function(t, e, n) {
    var a, i, o;
    return o = 0, a = {}, i = {url: t.find("h4").text(),id: n}, t.find(".part.text p").each(function() {
        var t, e, n;
        return e = $(this), n = parseInt(e.find(".big-right-aligned-content").text()), t = e.find(".big-right-aligned").text(), 0 / 0 !== n && "" !== t ? (a[t] = n, o += n) : void 0
    }), i.medias = a, i.total = o, e[i.url] = i, e
}, addMainDataInSIComp = function(t, e) {
    var n, a, i, o, r, s, l;
    return r = t.find("h4").text(), n = e[currentWebsite], a = e[r], o = 18, null != n && null != a ? (s = o > n.url.length ? n.url : n.url.substr(0, o - 3) + "...", l = o > a.url.length ? a.url : a.url.substr(0, o - 3) + "...", i = $('<table class="social-media-compare comp-' + a.id + '"><thead><tr><th></th><th><span class="color"></span>' + s + '</th><th><span class="color"></span>' + l + "</th></tr></thead><tbody></tbody></table>"), t.find("p span.big-right-aligned").each(function() {
        var t, e, o, r, s, l, c;
        return c = $(this), l = c.text(), t = parseInt(n.medias[l]), o = parseInt(a.medias[l]), e = isNaN(t) ? "<td>?</td>" : t > o ? '<td class="bold">' + t + "</td>" : "<td>" + t + "</td>", r = isNaN(o) ? "<td>?</td>" : o > t ? '<td class="bold">' + o + "</td>" : "<td>" + o + "</td>", s = "<tr><td>" + $("<div>").append(c.clone()).html() + "</td>" + e + r + "</tr>", i.find("tbody").append(s)
    }), t.addClass("social-media-tab-content tab-content full-width").html(i)) : void 0
}, addTabsForSIComp = function(t, e, n) {
    var a, i, o, r, s, l, c;
    s = $('<div class="social-media-tabs comp-tabs"></div>'), r = [27, 20, 14], o = r[n - 2];
    for (l in e)
        a = e[l], c = o > a.url.length ? a.url : a.url.substr(0, o - 3) + "...", i = '<span class="color"></span>' + c, l === currentWebsite ? s.prepend('<span class="not-tab">' + i + "</span>") : s.append('<a class="tab" bindable="1">' + i + "</a>");
    return t.after(s)
}, initCompTabs = function() {
    return $(".comp-tabs:not(.binded)").each(function() {
        var t, e, n;
        return e = $(this).addClass("binded"), t = e.find("a.tab"), n = e.nextAll(".tab-content"), $(t[0]).addClass("active"), $(n[0]).addClass("active"), t.on("click", function(e) {
            var a, i;
            return e.preventDefault(), i = $(this), i.hasClass("active") ? void 0 : (t.removeClass("active"), i.addClass("active"), a = t.index(i), n.removeClass("active"), $(n[a]).addClass("active"))
        })
    })
}, competizeSocialImpact = function() {
    var t, e, n, a, i, o, r, s, l, c, d, u, p;
    if (p = $("#criterium-social_impact.criterium-have-comp:not(.is-competized):not(.criterium-loading)"), e = p.find(">div.criterium-content"), t = p.find(">div.competitor-content"), a = {}, 1 === p.length && 1 === e.length && t.length > 0) {
        p.addClass("is-competized"), a = putSIDataInArray(e, a, 0), r = 0, t.each(function() {
            var t;
            return t = $(this), r++, a = putSIDataInArray(t, a, r)
        }), i = Object.keys(a).length, t.each(function() {
            var t;
            return t = $(this), addMainDataInSIComp(t, a, i)
        }), addTabsForSIComp(e, a, i), s = 0;
        for (u in a)
            d = a[u].total, d > s && (s = d);
        s *= 1.05, c = "";
        for (u in a)
            n = a[u], l = parseInt(100 * (n.total / s)), 3 > l && (l = 3), o = {graph_progressbar: {htmlclass: 33 > l ? "low-percent" : !1,percent: l,title: n.url,value: n.total}}, c += Mustache.render(mustacheTemplates.parts, o);
        return e.addClass("full-width").html(c)
    }
}, competizeTopRankingKeywords = function() {
    var t, e, n;
    return n = $("#criterium-top_ranking_keywords.criterium-have-comp:not(.is-competized):not(.criterium-loading)"), 1 === n.length ? (n.addClass("is-competized"), t = n.find(">div.criterium-content, >div.competitor-content"), e = $('<div class="top-keywords-tabs comp-tabs"></div>'), t.each(function() {
        var t, n;
        return t = $(this), n = t.find("h4"), e.append('<a class="tab" bindable="1"><span class="color"></span>' + n.text() + "</a>"), t.addClass("top-keywords-tab-content tab-content full-width"), n.remove()
    }), n.find(">div.criterium-content").before(e)) : void 0
}, competizeBacklinksCounter = function() {
    var t, e, n;
    return n = $("#criterium-backlinks_counter.criterium-have-comp:not(.is-competized):not(.criterium-loading)"), 1 === n.length ? (n.addClass("is-competized"), t = n.find(">div.criterium-content, >div.competitor-content"), e = 0, t.each(function() {
        var t;
        return t = parseInt($(this).find(".progressbar .bar .value").text()), t > e ? e = t : void 0
    }), e *= 1.05, t.each(function() {
        var t, n, a, i;
        return a = $(this), n = a.find(".progressbar"), i = parseInt(n.find(".bar .value").text()), t = parseInt(100 * (i / e)), n.find(".colored-bar").css("width", t + "%"), 33 > t ? n.addClass("low-percent") : void 0
    })) : void 0
}, competizeAll = function(t) {
    return null == t && (t = !1), t || competizeSocialImpact(), t || competizeTopRankingKeywords(), competizeBacklinksCounter(), t ? void 0 : initCompTabs()
}, checkWooChart = function(t) {
    var e, n;
    return cleanWooCharts(), t ? n = ".criterium-competitor-container .chartify-me" : $("body").hasClass("review") || $("body").hasClass("extension") || $("body").hasClass("mobreview") || $("body").hasClass("pdf") ? (e = !0, n = ".criterium-content .chartify-me") : n = ".active .active>.chartify-me,      .active .active tr td>.chartify-me,      #keywords-table .chartify-me,      .graphics-container>.chartify-me,      .ga-data-table .chartify-me,      .graphics-container .tab-pane.active>.chartify-me,      .debug-chart-container .chartify-me", $(n).each(function() {
        return _checkWooChart($(this))
    })
}, _checkWooChart = function(t) {
    var e, n, a, i, o, r, s, l, c, d, u, p, h, f, v, m, g, b;
    if (r = [], i = 0, o = "unknow", e = "generate-chart-id-" + chartsId, n = null, a = null, f = 99999999, p = 0, t.parents("#criterium-top_ranking_keywords").length > 0)
        return t.remove(), void 0;
    if (chartsId++, t.attr("id", e).removeClass("chartify-me"), t.hasClass("pie-chart-container") || t.hasClass("big-pie-chart-container") || t.hasClass("bar-chart-container") || t.hasClass("line-chart-container") || t.hasClass("trend-chart-container") || t.hasClass("revert-trend-chart-container") || t.hasClass("littletrend-chart-container") || t.hasClass("revert-littletrend-chart-container") || t.hasClass("comparative-comp-chart-container") || t.hasClass("nbar-comp-chart-container") || t.hasClass("bar-comp-chart-container") || t.hasClass("genderage-chart-container") || t.hasClass("column-chart-container"))
        t.find(".value").each(function() {
            var t, e, n, o, s;
            return s = $(this), e = s.attr("title"), n = s.attr("stack"), o = !1, t = [], s.find("li").each(function() {
                var e, n, r, s, l, c, d;
                return l = $(this), c = "null" === l.text() ? null : parseFloat(l.text()), r = l.attr("class"), s = !1, o = o ? o : c, null == a && (0 > c ? a = !1 : 10 > c ? a = 0 : null != c && (f > c && (f = c), c > p && (p = c))), void 0 !== r && r.match("date-") && (r = r.replace("date-", ""), d = r.slice(0, 4), n = r.slice(4, 6), e = 8 === r.length ? r.slice(6, 8) : 0, s = Date.UTC(d, n - 1, e)), s ? t.push([s, c]) : t.push(c), i += null != c ? c : 0
            }), s.hasClass("stacked") ? r.push({name: e,data: t,stack: n}) : r.push({name: e,data: t,y: o})
        }), n = t.find(".max").text(), null == a && (a = p / f > 21 ? 0 : !1);
    else if (t.hasClass("geo-chart-container"))
        v = parseInt(t.find(".nbr-rows").text()), u = t.find("tr:first-child th").first().text(), d = t.find("tr:nth-child(2) th").first().text(), o = "world", i = v, r = new google.visualization.DataTable, r.addRows(v), r.addColumn("string", u), r.addColumn("number", d), t.find("table").each(function() {
            var t;
            return t = $(this), r.setValue(parseInt(t.find("tr:first-child td:nth-child(2)").text()), parseInt(t.find("tr:first-child td:nth-child(3)").text()), t.find("tr:first-child td:nth-child(4)").text()), r.setValue(parseInt(t.find("tr:nth-child(2) td:nth-child(2)").text()), parseInt(t.find("tr:nth-child(2) td:nth-child(3)").text()), parseFloat(t.find("tr:nth-child(2) td:nth-child(4)").text()))
        });
    else {
        if (!t.hasClass("absolute-geo-chart-container"))
            return t.remove(), void 0;
        v = parseInt(t.find(".nbr-rows").text()), u = t.find("tr:first-child th").first().text(), d = t.find("tr:nth-child(2) th").first().text(), o = t.find(".region").text(), i = v, r = new google.visualization.DataTable, r.addRows(v), r.addColumn("string", u), r.addColumn("number", d), s = 0, t.find("table").each(function() {
            var t;
            return t = $(this), r.setValue(s, 0, t.find("tr td.name").text()), r.setValue(s, 1, parseInt(t.find("tr td.val").text())), s++
        })
    }
    if (chartsData[chartsId] = r, t.hasClass("pie-chart-container"))
        o = "pie", n = i;
    else if (t.hasClass("big-pie-chart-container"))
        o = "bpie", n = i;
    else if (t.hasClass("bar-chart-container"))
        o = "bar";
    else if (t.hasClass("line-chart-container"))
        o = "spline";
    else if (t.hasClass("trend-chart-container"))
        o = "trend";
    else if (t.hasClass("genderage-chart-container"))
        o = "genderage";
    else if (t.hasClass("revert-trend-chart-container")) {
        for (s in r) {
            r[s].y = 1e3 / r[s].y;
            for (c in r[s].data)
                null != r[s].data[c] && (r[s].data[c] = 1e3 / r[s].data[c])
        }
        o = "trend"
    } else if (t.hasClass("littletrend-chart-container"))
        o = "ltrend";
    else if (t.hasClass("revert-littletrend-chart-container")) {
        for (s in r) {
            r[s].y = 1e3 / r[s].y;
            for (c in r[s].data)
                r[s].data[c] = 1e3 / r[s].data[c]
        }
        o = "ltrend"
    } else {
        if (t.hasClass("geo-chart-container") || t.hasClass("absolute-geo-chart-container"))
            return wooGeoCharts(e, r, o, t), void 0;
        if (t.hasClass("comparative-comp-chart-container"))
            o = "comparative";
        else if (t.hasClass("bar-comp-chart-container"))
            o = "bar";
        else if (t.hasClass("nbar-comp-chart-container")) {
            for (s in r)
                for (c in r[s].data)
                    r[s].data[c] = 1 / r[s].data[c];
            o = "nbar"
        } else
            t.hasClass("column-chart-container") && (o = "column")
    }
    if (t.hasClass("comparative-comp-chart-container") || t.hasClass("bar-comp-chart-container") || t.hasClass("nbar-comp-chart-container")) {
        if (b = t.parents(".criterium-competitor-container").find(".main-chart-container"), b.length > 0)
            return updateWooHighCharts("add", b, r), t.remove(), void 0;
        t.addClass("main-chart-container")
    }
    return "pie" !== o || 0 !== i ? (m = t.hasClass("chart-no-decimal"), h = parseFloat(t.attr("data-min-range")), t.hasClass("percent-chart") && (n = 100.9), g = !1, t.hasClass("special-small-chart") && (g = !0), l = !1, t.closest("#generate-chart-id-0").length > 0 && (l = !0), wooHighCharts(o, e, r, n, a, m, h, g, l)) : void 0
}, wooGeoCharts = function(t, e, n, a) {
    var i, o, r, s;
    return s = 490, r = 300, a.hasClass("absolute-geo-chart-container") && (s = 680, r = 305), i = {width: s,height: r,region: n,datalessRegionColor: "#dddddd",colorAxis: {colors: ["#999999", "#315d86"]},enableRegionInteractivity: !1,legend: {textStyle: {color: "#333333",fontSize: 11,fontName: "Open Sans"}}}, o = new google.visualization.GeoChart(document.getElementById(t)), o.draw(e, i)
}, wooHighCharts = function(t, e, n, a, i, o, r, s, l) {
    var c, d, u, p;
    switch (t) {
        case "pie":
            return chartsObject[e] = new Highcharts.Chart({chart: {renderTo: e,defaultSeriesType: t,height: 100},colors: null != l ? window.chartColorsPie : window.chartColorsPie2,legend: {align: "left",verticalAlign: "top",layout: "vertical",margin: 0,floating: !0,x: 108,y: -17,labelFormatter: function() {
                        return this.name + "  ( " + this.y + "% )"
                    }},plotOptions: {pie: {allowPointSelect: !1,cursor: "default",shadow: !1,borderColor: null,showInLegend: !0,center: [38, 38],size: 96,dataLabels: {enabled: !1}}},series: [{type: t,data: n}]});
        case "bpie":
            return chartsObject[e] = new Highcharts.Chart({chart: {renderTo: e,defaultSeriesType: "pie",height: 300},plotOptions: {pie: {shadow: !1,borderColor: null,showInLegend: !0,dataLabels: {enabled: !1}}},series: [{type: "pie",data: n}]});
        case "nbar":
            return (!a || "" === a || 50 > a) && (a = null), c = 90 + 30 * n.length, chartsObject[e] = new Highcharts.Chart({chart: {renderTo: e,defaultSeriesType: "bar",height: c},xAxis: {title: {text: null},labels: {enabled: !1},minPadding: .05,maxPadding: .05,lineWidth: 0,tickWidth: 0},yAxis: {title: {text: null},min: 0,max: a,opposite: !0,endOnTick: !1,maxPadding: .02,labels: {overflow: "justify",formatter: function() {
                            return 0 === this.value ? "∞" : Math.round(1 / this.value)
                        }}},tooltip: {formatter: function() {
                        return this.y > 1 ? "" + this.series.name + ": " + this.y : "" + this.series.name + ": " + 1 / this.y
                    }},legend: {borderWidth: null},plotOptions: {bar: {groupPadding: 0,borderColor: null,id: e,shadow: !1,dataLabels: {enabled: !0,color: "#fff",align: "right",x: -12,overflow: "justify",formatter: function() {
                                return this.y > 1 ? this.y : 1 / this.y + "th"
                            }}}},series: n});
        case "bar":
            if (!a || "" === a || 50 > a)
                a = null;
            else if (100 === a)
                for (d in n)
                    6 > n[d].y && n.splice(d, 1);
            return c = 90 + 30 * n.length, chartsObject[e] = new Highcharts.Chart({chart: {renderTo: e,defaultSeriesType: t,height: c,spacingTop: 0},xAxis: {title: {text: null},labels: {enabled: !1},minPadding: .05,maxPadding: .05,lineWidth: 0,tickWidth: 0},yAxis: {title: {text: null},min: 0,max: a,opposite: !0,endOnTick: !1,maxPadding: .02,labels: {overflow: "justify",enabled: !1}},legend: {borderWidth: null,reversed: !0},plotOptions: {bar: {groupPadding: 0,borderColor: null,id: e,shadow: !1,pointWidth: 24,dataLabels: {enabled: !0,color: "#fff",align: "right",x: -10,overflow: "justify",formatter: function() {
                                var t;
                                return t = this.y, 100 === a && (t += "%"), t
                            }}}},series: n});
        case "comparative":
            return chartsObject[e] = new Highcharts.Chart({chart: {renderTo: e,defaultSeriesType: "bar",height: 700},colors: window.chartColorsComp,xAxis: {title: {text: null},minPadding: .05,maxPadding: .05,lineWidth: 0,tickWidth: 0,categories: socialMediaCat,labels: {formatter: function() {
                            switch (this.value) {
                                case "fb_likes":
                                    return '<img style="max-width:16px" src="/assets/img/css/facebook_l.png" />&nbsp;';
                                case "fb_shares":
                                    return '<img style="max-width:16px" src="/assets/img/css/facebook_s.png" />&nbsp;';
                                case "fb_comm":
                                    return '<img style="max-width:16px" src="/assets/img/css/facebook_c.png" />&nbsp;';
                                case "tw_bl":
                                    return '<img style="max-width:16px" src="/assets/img/css/twitter_b.png" />&nbsp;';
                                case "li_shares":
                                    return '<img style="max-width:16px" src="/assets/img/css/linkedin_s.png" />&nbsp;';
                                case "digg":
                                    return '<img style="max-width:16px" src="/assets/img/css/digg_e.png" />&nbsp;';
                                case "delicious":
                                    return '<img style="max-width:16px" src="/assets/img/css/delicious_b.png" />&nbsp;';
                                case "stumbled_upon":
                                    return '<img style="max-width:16px" src="/assets/img/css/stumbleupon.png" />&nbsp;';
                                case "plus_one":
                                    return '<img style="max-width:16px" src="/assets/img/css/google_p.png" />&nbsp;';
                                default:
                                    return this.value
                            }
                        },useHTML: !0}},yAxis: {title: {text: null},min: 0,opposite: !0,endOnTick: !1,maxPadding: .02,max: 230,min: -120,gridLineColor: null,plotLines: [{color: "#A0C5E5",width: 1,value: 0}],labels: {formatter: function() {
                            return 0 === this.value ? "" + window.currentWebsite : ""
                        },style: {fontSize: "11px",color: window.baseChartColor}}},legend: {borderWidth: null},plotOptions: {bar: {animation: !1,borderColor: null,id: e,shadow: !1,dataLabels: {enabled: !0,overflow: "justify",formatter: function() {
                                var t;
                                return t = parseInt(this.y), isNaN(t) || 0 === t ? "" : 200 === t ? ">" + this.y + "%" : t > 0 ? "+" + this.y + "%" : t + "%"
                            }}}}});
        case "spline":
            return i === !1 && (i = null), chartsObject[e] = new Highcharts.Chart({chart: {renderTo: e,defaultSeriesType: t,height: s === void 0 || s === !1 ? 325 : 160,marginRight: 0,marginLeft: 36},xAxis: {type: "datetime",dateTimeLabelFormats: {day: "%e %b"},lineColor: null,lineWidth: 0,tickWidth: 0,minPadding: .05,maxPadding: .05},yAxis: {alternateGridColor: "#f7f7f7",lineColor: null,lineWidth: 0,minPadding: .05,maxPadding: .1,minRange: r !== void 0 ? r : .01,endOnTick: !1,min: i,max: "" === a ? null : a,allowDecimals: o !== void 0 ? !o : !1,labels: {formatter: function() {
                            var t;
                            return t = this.value, 100.9 === a && (t += "%"), t >= 1e3 && 1e6 > t ? (t = Math.floor(t / 100) / 10, t += "k") : t >= 1e6 && (t = Math.floor(t / 1e5) / 10, t += "M"), t
                        }}},legend: {enabled: n.length > 1,align: "left",verticalAlign: "top",margin: 0,floating: !0,x: 36},tooltip: {enabled: !0},plotOptions: {spline: {groupPadding: 0,borderColor: null,stickyTracking: !1,marker: {enabled: !0,symbol: "circle",radius: 2,states: {hover: {radius: 3}}},shadow: !1,connectNulls: !0}},series: n});
        case "genderage":
            return chartsObject[e] = new Highcharts.Chart({chart: {renderTo: e,type: "column",height: 325},xAxis: {categories: ["13-17", "18-24", "25-34", "35-44", "45-54", "55-64", "65+"],lineColor: null,lineWidth: 0,tickWidth: 0,minPadding: .05,maxPadding: .05},yAxis: {alternateGridColor: "#f7f7f7",lineColor: null,lineWidth: 0,minPadding: .05,maxPadding: .1,endOnTick: !1,labels: {formatter: function() {
                            return Math.abs(this.value)
                        }}},legend: {align: "left",verticalAlign: "top",margin: 0,floating: !0,x: 36},tooltip: {enabled: !0,formatter: function() {
                        var t;
                        return t = "<b>" + this.x + "</b>", $.each(this.points, function(e, n) {
                            return t += "<br/>" + n.series.name + " : " + Math.abs(n.y)
                        }), t
                    },shared: !0},plotOptions: {column: {stacking: "normal",groupPadding: .2,pointWidth: 25,borderColor: null,shadow: !1}},series: n});
        case "ltrend":
        case "trend":
            return u = "ltrend" === t, p = "ltrend" === t ? 32 : 20, chartsObject[e] = new Highcharts.Chart({chart: {renderTo: e,defaultSeriesType: "areaspline",height: p,marginRight: 0,marginLeft: 0,marginTop: 0,marginBottom: 1},xAxis: {type: "datetime",labels: {enabled: !1},gridLineWidth: 0,lineColor: "#999",lineWidth: u ? 0 : 1,tickWidth: 0,minPadding: .01,maxPadding: .08},yAxis: {labels: {enabled: !1},gridLineWidth: 0,lineColor: "#999",lineWidth: u ? 0 : 1,minPadding: .01,maxPadding: .08,endOnTick: !1},legend: {enabled: !1},tooltip: {enabled: !1},plotOptions: {areaspline: {groupPadding: 0,borderColor: null,id: e,shadow: !1,marker: {enabled: !1},states: {hover: {enabled: !1}},fillOpacity: .2,pointInterval: 864e5}},series: n});
        case "column":
            return chartsObject[e] = new Highcharts.Chart({chart: {renderTo: e,defaultSeriesType: t,height: s === void 0 || s === !1 ? 325 : 160,marginRight: 0,marginLeft: 36},xAxis: {type: "datetime",dateTimeLabelFormats: {day: "%e %b"},lineColor: null,lineWidth: 0,tickWidth: 0,minPadding: .05,maxPadding: .05},yAxis: {alternateGridColor: "#f7f7f7",lineColor: null,lineWidth: 0,minPadding: .05,maxPadding: .1,minRange: r !== void 0 ? r : .1,endOnTick: !1,min: i,max: a !== void 0 && "" !== a ? a : void 0,allowDecimals: o !== void 0 ? !o : !1,labels: {formatter: function() {
                            var t, e, n, a;
                            return a = .01 >= this.value ? 0 : this.value, t = void 0, e = void 0, n = void 0, t = Math.floor(a / 60), e = Math.floor(a) % 60, n = Math.floor(60 * (a - 60 * t - e)), t > 0 ? t + "h" : e > 0 ? e + "m" : n > 0 ? n + "s" : a
                        }}},legend: {enabled: n.length > 1,align: "left",verticalAlign: "top",margin: 0,floating: !0,x: 36},tooltip: {enabled: !0,formatter: function() {
                        var t, e, n, a, i;
                        return i = .01 >= this.y ? 0 : this.y, t = void 0, n = void 0, a = void 0, t = Math.floor(i / 60), n = Math.floor(i) % 60, a = Math.floor(60 * (i - 60 * t - n)), e = "", e += t > 0 ? " " + t + "h" : "", e += n > 0 ? " " + n + "m" : "", e += a > 0 ? " " + a + "s" : "", 0 === e.length && (e = "0"), "" + Highcharts.dateFormat("%e. %b %Y", this.x) + " : " + e
                    }},series: n,plotOptions: {column: {borderWidth: 0,shadow: !1,color: "#C4392F"}}});
        default:
            console.log("- Unrecongnised chart type -"), console.log("type : " + t), console.log("id : " + e), console.log(n), console.log("----------------------------\n")
    }
}, updateWooHighCharts = function(t, e, n) {
    switch (t) {
        case "add":
            return chartsObject[e.attr("id")].addSeries(n[0])
    }
}, updateAllWooHighChartsHeight = function() {
    var t, e, n, a, i;
    i = [];
    for (e in chartsObject)
        t = chartsObject[e].chartHeight, a = chartsObject[e].chartWidth, n = chartsObject[e].series.length, 70 + 30 * n > t ? i.push(chartsObject[e].setSize(a, 90 + 30 * n, !1)) : i.push(void 0);
    return i
}, cleanWooCharts = function() {
    return "0" === $("#criterium-adwords_traffic .criterium-content .pie-chart-container ul:first-child li").text() ? $("#criterium-adwords_traffic").remove() : void 0
}, getCountryCode = function(t) {
    return countries[t] !== void 0 ? countries[t].toLowerCase() : null
}, getColorCode = function(t, e) {
    return t = 10 * Math.floor(t * e / 10), mapColors[t]
}, wooMaps = function() {
    return $(".woomap").each(function(t, e) {
        return wooMap($(e))
    })
}, wooMap = function(t) {
    var e, n, a, i, o, r, s, l, c, d, u, p;
    if (!t.hasClass("yuhuu-mapped")) {
        for (a = t.find(".country-info"), c = [], s = 0, i = 0; a.length > i; )
            o = $(a[i]), n = getCountryCode(o.find(".name").html()), l = o.find(".percent").html(), null != n && (c[n] = l, s = Math.max(s, l)), ++i;
        e = [];
        for (r in c)
            e[r] = getColorCode(c[r], 100 / s);
        for (t.predata = c, t.max = s, t.html(""), t.vectorMap({map: "world_en",backgroundColor: "#fff",color: "#E4E4E4",colors: e,borderColor: "#fff",borderWidth: 1,borderOpacity: 1,hoverColor: "#294c6e",selectedColor: "#294c6e",enableZoom: !1,onLabelShow: function(e, n, a) {
                return l = "~ 0", t.predata[a] !== void 0 && (l = t.predata[a]), n.text(n.text() + " : " + l + "%")
            }}), t.bind("regionClick.jqvmap", function(t) {
            return t.preventDefault()
        }), t.after("<span class='scale'></span>"), d = t.next(".scale"), d.append("<span class='scale-start'>" + Math.floor(t.max / 10) + "</span>"), d.append("<span class='scale-items'></span>"), p = d.find(".scale-items"), i = 0; 100 >= i; )
            p.append("<span class='scale-item'></span>"), u = p.find(".scale-item:last-child"), u.css("background", mapColors[i]), i += 10;
        return d.append("<span class='scale-end'>" + Math.ceil(t.max) + "</span>"), t.height(t.height() + 40 + "px"), t.addClass("yuhuu-mapped")
    }
}, calculTopBars = function() {
    var t, e, n, a, i, o, r;
    return $("#dashboard-bars").length > 0 ? (i = $("#green-bar-counter"), o = $("#orange-bar-counter"), r = $("#red-bar-counter"), t = $(".criterium.result-1").length, e = $(".criterium.result-2").length, n = $(".criterium.result-3").length, a = t + e + n, i.find(".count").text(t), o.find(".count").text(e), r.find(".count").text(n), a > 0 ? (i.find(".percent").stop().animate({width: 100 / a * t + "%"}, 500), o.find(".percent").stop().animate({width: 100 / a * e + "%"}, 500), r.find(".percent").stop().animate({width: 100 / a * n + "%"}, 500)) : $("#green-bar-counter .percent, #orange-bar-counter .percent, #red-bar-counter .percent").css("width", "0%")) : void 0
}, calculTopPriorities = function() {
    var t, e, n, a, i, o, r, s;
    for (o = [], $(".criterium.result-2, .criterium.result-3").each(function() {
        var t;
        return t = $(this), t.find(".criterium-quicktips").length > 0 && !t.find(".criterium-quicktips").is(":empty") ? o.push({imp: parseFloat(t.find(".prio-score").text()),id: t.attr("id"),tips: t.find(".criterium-quicktips").text()}) : void 0
    }), $(".prio-score, .criterium-quicktips").remove(), o.sort(function(t, e) {
        return t.imp - e.imp
    }), o.reverse(), i = 0; 5 > i; )
        o[i] && $("#report-priorities ol").append('<a href="#' + o[i].id + '"><li id="quick-win-' + (i + 1) + '" quick-wins"><i></i>' + o[i].tips + "</li></a>"), i++;
    return e = $("#get-manycontact-quick-wins"), a = !$("#criterium-conversion_form").hasClass("result-1"), r = $("#report-priorities ol"), t = r.find(">a[href=#criterium-conversion_form]"), n = 0 === $("#criterium-technologies").find("span.tech-manycontacts, span.tech-hello_bar").length, e.length > 0 && a && n && (t.length > 0 ? t.replaceWith(e.html()) : (s = Math.floor(5 * Math.random()), 0 === s ? r.prepend(e.html()) : r.find(">a:nth-child(" + s + ")").before(e.html()), r.find(">a:last-child").remove())), $("#report-priorities ol a:not(.external-link)").on("click", function(t) {
        return t.preventDefault(), scrollTo($($(this).attr("href")).trigger("click"), 500)
    }), $("#report-priorities").delay(300).slideDown(600)
}, initTopBarTrial = function(t) {
    var e;
    return e = $("#top-bar-trial"), $("#top").delay(t, "animate").queue("animate", function(t) {
        var n, a;
        return a = $(this), n = e.outerHeight(), a.attr("fake-offset", n).animate({"margin-top": n}, 200), e.slideDown(200), initWooFlyingMenu(1), $(window).trigger("scroll"), t()
    }).dequeue("animate"), $("#top-bar-register").click(function() {
        return _gaq.push(["_trackEvent", "Report", "TopBarRegisterClick", currentWebsite])
    })
}, getScoreIn = function(t, e, n, a) {
    return t = t.replace(/^http(s)?:\/\/(www\.)?/, ""), n = n ? "&paid=1" : "", $.ajax({type: "GET",data: "key=9718067451b92665a02b0c460d502fa2e6c0e4b4" + n + "&callback=?",url: "http://score.woorank.com/site/" + t,async: !0,context: e,dataType: "jsonp",success: function(t) {
            var e;
            return e = t.rank, e = a ? Math.round(e) : Math.round(10 * e) / 10, $(this).text(e)
        }})
}, getCompetitorsScore = function() {
    return $("#dashboard-competitors .competitors .url").each(function() {
        return getScoreIn($(this).text(), $(this).siblings(".score"), !0, !0)
    })
}, getRelatedScore = function() {
    return $("#criterium-related_websites tbody td:nth-child(3), #criterium-competitors_searchresults tbody td:nth-child(3)").each(function() {
        var t;
        return t = $(this).siblings(":nth-child(2)").find("a").attr("href"), getScoreIn(t, $(this), $("#dashboard-get-pdf").length > 0, !1)
    })
}, formatMomentJs = function(t) {
    var e, n;
    return n = new Date, e = n.getTimezoneOffset(), null == t && (t = "LLL"), $(".moment").each(function() {
        var n, a;
        return a = $(this), n = moment(a.text(), "YYYY-MM-DD HH:mm:ss").subtract("m", e), a.hasClass("no-hour") && (t = "MMM D"), a.text(n.format(t)).removeClass("moment")
    }), $(".moment-month").each(function() {
        var t, e;
        return e = $(this), t = moment(e.text(), "YYYY-MM-DD"), e.text(t.format("MMMM")).removeClass("moment-month")
    })
}, twitterAge = $("#criterium-twitter_account .part.text:nth-child(2)>p:last-child>span.right-aligned-content"), twitterAge.length > 0 && !$("#criterium-twitter_account").hasClass("momented") && ($("#criterium-twitter_account").addClass("momented"), currentText = twitterAge.text(), splitted = currentText.replace(/[^\d,]/g, "").split(","), years2Sub = 0, months2Sub = 0, days2Sub = 0, 3 === splitted.length && (years2Sub = parseInt(splitted.shift())), 2 === splitted.length && (months2Sub = parseInt(splitted.shift())), 1 === splitted.length && (days2Sub = parseInt(splitted.shift())), years2Sub + months2Sub + days2Sub > 0 && (localizations = moment.relativeTime, newString = "", years2Sub > 1 ? newString += localizations.yy.replace("%d", years2Sub) : years2Sub > 0 && (newString += localizations.y), newString += "" === newString ? "" : ", ", months2Sub > 1 ? newString += localizations.MM.replace("%d", months2Sub) : months2Sub > 0 && (newString += localizations.M), newString += "" === newString ? "" : ", ", days2Sub > 1 ? newString += localizations.dd.replace("%d", days2Sub) : days2Sub > 0 && (newString += localizations.d), newString = localizations.past.replace("%s", newString), twitterAge.text(newString))), loadMustachesFiles = function(t) {
    var e;
    return "" === window.mustacheMainTemplate ? (e = 0, $("#dashboard>.mustache-to-load").each(function() {
        return e++, $.ajax({url: $(this).attr("href"),type: "GET",dataType: "html",context: $(this),error: function() {
                return _gaq.push(["_trackEvent", "Error", "mustacheLoadFailed", $(this).attr("href")])
            },success: function(n) {
                var a;
                return a = $(this), "template" === a.attr("rel") ? (window.mustacheMainTemplate = n, window.mustacheTemplates[a.attr("name")] = n) : (Mustache.compilePartial(a.attr("name"), n), window.mustacheTemplates[a.attr("name")] = n), e--, 0 === e && "function" == typeof t ? t() : void 0
            }})
    })) : "function" == typeof t ? t() : void 0
}, $(function() {
    var t;
    return window.initWooFlyingMenu = function(t) {
        var e, n, a, i, o;
        return null == t && (t = 0), e = parseInt($("#top").attr("fake-offset")), o = $("#top").offset().top, isNaN(e) || (o += e), i = $("#left-nav").offset().top - 18, a = $("#left-nav>#flying, #left-nav.ext-view").first(), n = 30, window.isExtension && (a = $("#left-nav"), n = 0, i += 20), $(window).off("scroll"), $(window).on("scroll", function() {
            var e, r;
            if (!(window.scrollY > i))
                return window.isExtension ? a.removeClass("flyingMenu") : a.removeClass("is-flying").css("position", "relative").css("top", "0");
            if (window.isExtension ? a.addClass("flyingMenu") : a.addClass("is-flying").css("position", "fixed").css("top", n + o + "px"), a.find(".nav-section.active nav").hasClass("inpage") || window.isExtension)
                if (e = t, $(".module").each(function() {
                    var t;
                    return t = $(this).offset().top, window.scrollY + 40 + o >= t ? e++ : void 0
                }), e > t) {
                    if (a.find("a, .no-link-module").removeClass("current"), r = a.find("a:nth-child(" + e + "), .no-link-module:nth-child(" + e + ")").addClass("current"), r.hasClass("no-link-module"))
                        return r.removeClass("current").prevAll("a").first().addClass("current")
                } else if (!a.find("a.score").hasClass("current"))
                    return a.find("a").removeClass("current"), a.find("a.score").addClass("current")
        }), a.find("nav.inpage>a").on("click", function(t) {
            var e, n;
            return t.preventDefault(), e = $(this).attr("href"), n = isNaN(parseInt(e)) ? $(e) : $(".module").eq(e), scrollTo(n, 500)
        })
    }, $("form.ajax-generate-report").on("submit", function(t) {
        var e, n, a;
        return a = $(this), e = !1, a.find("input.required").each(function() {
            return "" === $(this).val() ? e = !0 : void 0
        }), a.hasClass("ajax-valid") || e || a.hasClass("waiting-for-ajax") ? a.hasClass("ajax-valid") ? void 0 : (t.preventDefault(), !1) : (t.preventDefault(), a.find(".label-default").val(""), n = a.addClass("waiting-for-ajax").serialize(), $.ajax({type: "POST",data: n + "&ajax=1",cache: !1,url: a.attr("action"),context: a,dataType: "json",success: function(t) {
                return "ok" === t.status ? a.addClass("ajax-valid").attr("action", t.url).trigger("submit") : "suggest" === t.status ? (a.removeClass("waiting-for-ajax").find("#generate-report-input").val(t.url), a.trigger("submit")) : "rr" === t.status || "errorMessage" === t.status ? window.location.replace(t.url) : a.removeClass("waiting-for-ajax").find("#generate-report-input").addClass("required")
            }}), !1)
    }), $("form.ajax-generate-report .gift-token").click(function() {
        var t;
        return t = $("<input type='hidden' name='giftToken' />"), t.val("1"), $("form.ajax-generate-report").append(t)
    }), $("#generate-report .comp-button").on("click", function(t) {
        var e, n, a, i;
        return t.preventDefault(), i = $(this), a = i.parents(".inputs"), i.find("i").toggleClass("hidden"), a.hasClass("open") ? (n = 420, e = 372, $("#generate-report").hasClass("small-comps") && (n = 346, e = 298), i.parents(".inputs").animate({width: "" + n}, 400, function() {
            return $("#inp-comp-1:not(.label-default), #inp-comp-2:not(.label-default), #inp-comp-3:not(.label-default)").val("").trigger("focusout")
        }).find("#gen-inputs-container>div:first-child").animate({width: "" + n}, 350).find("input#generate-report-input").animate({width: "" + e}, 375)) : (n = 744, $("#generate-report").hasClass("small-comps") && (n = 670), i.parents(".inputs").animate({width: "" + n}, 400).find("#gen-inputs-container>div:first-child").animate({width: "204"}, 375).find("input#generate-report-input").animate({width: "156"}, 350)), a.toggleClass("open"), $("#comp-i").val("1")
    }), window.isInsideReview = $("#dashboard-content").hasClass("inside-page"), window.ispaidReview = $("#dashboard-content").hasClass("paid-review"), window.currentWebsite = $("#dashboard-site>h1>a").attr("title"), window.isExtension ? initWooFlyingMenu() : window.isMobile || initWooFlyingMenu(1), isInsideReview || (initWooCounter(), getCompetitorsScore()), $("#right-panel.light-report").length > 0 && ($("#right-panel.light-report .module.module-empty").each(function() {
        var t, e;
        return e = $(this), t = e.attr("id"), e.removeClass("hidden").removeClass("module-empty").addClass("lightversion").show().append($("#teasing-box ." + t))
    }), $("body.review .teasing-box").on("click", function() {
        var t, e;
        return e = $(this), t = e.attr("class").replace(" teasing-box", ""), _gaq.push(["_trackEvent", "LightReport", "TeasingBoxClick", t]), window.location = "/" + wooLang + "/user/plan"
    })), $("#dashboard").hasClass("generating-report") ? ispaidReview || isExtension || isMobile || initTopBarTrial(6e3) : (checkEmptyModule(), checkWooChart(!1), wooMaps(), isMobile && ($("#report-content").show(), $(".loading_sentence").remove(), clearInterval(loading_sentence_li_i_interval), activeMenuItem()), isInsideReview || (t = function() {
        return competizeAll()
    }, loadMustachesFiles(t), getRelatedScore()), calculTopPriorities(), calculTopBars(), isMobile ? _gaq.push(["_trackEvent", "IpadReport", "ReviewDate", $("#dashboard-site .generated-time .value-title").attr("title")]) : (_gaq.push(["_trackEvent", "Report", "ReviewDate", $("#dashboard-site .generated-time .value-title").attr("title")]), ispaidReview || isExtension || initTopBarTrial(3e3))), $(".criterium").live("click", function(t) {
        var e, n;
        return t.target.attributes.href || t.target.attributes.bindable || (t.preventDefault(), n = $(this), n.toggleClass("open-crit").find(".criterium-advice").slideToggle(100), !n.hasClass("open-crit")) ? void 0 : (e = n.attr("id"), e = e.replace("criterium-", ""), _gaq.push(["_trackEvent", "Report", "OpenAdvice", e]))
    }), $("#report-priorities .show-more-task a").on("click", function(t) {
        return t.preventDefault(), $("#report-priorities .show-more-task i").toggleClass("hidden"), $(this).off("click")
    }), $("#short-url a#short-label").on("click", function(t) {
        var e;
        return t.preventDefault(), e = $(this), e.hasClass("load") ? void 0 : (e.addClass("load").fadeTo(100, .5), _gaq.push(["_trackEvent", "Report", "RequestShortUrl", currentWebsite]), $.ajax({type: "POST",data: "url=" + currentWebsite,cache: !1,url: shortUrl,dataType: "html",context: $(this).parent("#short-url"),success: function(t) {
                var n, a;
                return e = $(this), n = e.find("pre"), a = e.find(".copy-tip"), e.find("#short-label").remove(), n.html(t.replace("http://", "<span>http://</span>")).trigger("click"), e.removeClass("no-short-url"), -1 !== navigator.appVersion.indexOf("Mac") ? a.find(".other").remove() : a.find(".mac").remove(), a.delay(800).fadeIn(500)
            }}))
    }), $("#short-url pre, #short-url a.copy").on("click", function() {
        return SelectText("short-val")
    }), $("#dashboard .date-dropdown .dropdown-value").on("change", function() {
        return _gaq.push(["_trackEvent", "Report", "changeReviewDate", currentWebsite]), window.location = "/" + wooLang + "/review/" + currentWebsite + "/" + $(this).val()
    }), formatMomentJs(), updateAllWooHighChartsHeight()
});
