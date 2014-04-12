var sina = document.getElementByClass('bds_tsina');
var qzone = document.getElementByClass('bds_qzone');
var tqq = document.getElementByClass('bds_tqq');
var renren = document.getElementByClass('bds_renren');
var baidu = document.getElementByClass('bds_baidu');

addListener(sina, 'click', function() {
  ga('send', 'event', 'bdshare', 'click', 'bds_tsina',);
});
addListener(qzone, 'click', function() {
  ga('send', 'event', 'bdshare', 'click', 'bds_qzone');
});
addListener(tqq, 'click', function() {
  ga('send', 'event', 'bdshare', 'click', 'bds_tqq');
});
addListener(renren, 'click', function() {
  ga('send', 'event', 'bdshare', 'click', 'bds_renren');
});
addListener(baidu, 'click', function() {
  ga('send', 'event', 'bdshare',  'click', 'bds_baidu');
});

function addListener(element, type, callback) {
 if (element.addEventListener) element.addEventListener(type, callback);
 else if (element.attachEvent) element.attachEvent('on' + type, callback);
}