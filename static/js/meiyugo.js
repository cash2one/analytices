(function(){

	var settings = {
			speed: 600,
			intervalTime: 3000
		},
		btnBox = $('#Bannerlb'),
		wrapp = $('#bannerWrapp'),
		bannerBox = $('#Bannerimg'),
		//bgColor = ['#083061','#666','#333'],
		i =0,
		timer;

	var slider = {
		init:function(){
			this.sliderEvent();
			this.autoSlider();
			wrapp.find('ul li').eq(0).css({'z-index': 2, opacity: 1}).siblings().css({'z-index': 1, opacity: 0});
		},
		
		sliderEvent:function(){
			var self = this,
				btn = btnBox.find('span');
			btn.on('click',function(){
				var index = $(this).index();
				i = index;
				self.setBtnBg(btnBox,index);
				self.bottonStyle(btn,index);
				self.sliderAnimate(index);
			});
			bannerBox.hover(function(){
				clearInterval(timer);
			},function(){
				self.autoSlider();
			});
			btnBox.hover(function(){
				clearInterval(timer);
			},function(){
				self.autoSlider();
			});			
		},
		bottonStyle:function(el,i){
			el.eq(i).addClass('selected').siblings().removeClass('selected');
		},
		sliderAnimate:function(i){
			var li = wrapp.find('ul li').eq(i);
			li.siblings().css({'z-index': 1});
			li.css({'z-index': 2});
								
			li.siblings().stop().animate({opacity: 0},settings.speed);
			li.stop().animate({opacity: 1},settings.speed);

		},
		// setBgColor:function(i){
		// 	bannerBox.css({'background-color': bgColor[i]});
		// },
		setBtnBg:function(el,i){
			el.css({'background-position': '-13px '+ (-17*i)+'px'});
		},
		autoSlider:function(){
			var self = this,
				btn = btnBox.find('span');
			timer = setInterval(function(){
				if(i > 2){
					i = 0;
				}
				self.setBtnBg(btnBox,i);
				self.bottonStyle(btn,i);
				self.sliderAnimate(i);
				i++;
			},settings.intervalTime + settings.speed);
		}
	}
	$(function(){
		slider.init();
	});

})();

