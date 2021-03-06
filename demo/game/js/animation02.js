	//获取浏览器样式方法
function getStyle(obj,attr){
	  return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj,250)[attr];
	}
//多属性运动
function animation(ele, attrs,duration=1000, fx='linear',endFn) {
    var b = {}; //起始值
    var c = {};  //总距离
    for (var i in attrs){
    	
    	b[i] = parseInt(getStyle(ele,i));
    	
    	c[i] = attrs[i] - parseInt(getStyle(ele,i));
    	
    }
    var d = duration; //总时间
    
    var t = 0;
    
    clearInterval(ele.timer);
    
    ele.timer = setInterval(function() {

        //var t = Date.now() - startTime;
        t += 16;
        if (t >= d) {
            t = d;
            clearInterval(ele.timer);
        }
        
        var value = {};
        
        for (var i in attrs){
        	
            if(i == 'opacity'){ 
            	
            	ele.style[i] = Tween[fx](t, b[i], c[i], d);
            	
            }else{
            	
            	ele.style[i] = Tween[fx](t, b[i], c[i], d) + 'px';
            	
            }
            
        }
        
        	t == d && typeof endFn == 'function' && endFn();

    }, 16);
}


var Tween = {
    linear: function (t, b, c, d){  //匀速
        return c*t/d + b;     //当前时间对应的距离 = 总距离*（当前时间/总时间）+ 当前的值
        //运动距离/总距离 = 运动时间/总时间
    },
    easeIn: function(t, b, c, d){  //加速曲线
        return c*(t/=d)*t + b;	//t/=d   t = t / d
    },
    easeOut: function(t, b, c, d){  //减速曲线
        return -c *(t/=d)*(t-2) + b;
    },
    easeBoth: function(t, b, c, d){  //加速减速曲线
        if ((t/=d/2) < 1) {
            return c/2*t*t + b;
        }
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    easeInStrong: function(t, b, c, d){  //加加速曲线
        return c*(t/=d)*t*t*t + b;
    },
    easeOutStrong: function(t, b, c, d){  //减减速曲线
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
    easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
        if ((t/=d/2) < 1) {
            return c/2*t*t*t*t + b;
        }
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },
    elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
        if (t === 0) {
            return b;
        }
        if ( (t /= d) == 1 ) {
            return b+c;
        }
        if (!p) {
            p=d*0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p/4;
        } else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },
    elasticOut: function(t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
        if (t === 0) {
            return b;
        }
        if ( (t /= d) == 1 ) {
            return b+c;
        }
        if (!p) {
            p=d*0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    },
    elasticBoth: function(t, b, c, d, a, p){
        if (t === 0) {
            return b;
        }
        if ( (t /= d/2) == 2 ) {
            return b+c;
        }
        if (!p) {
            p = d*(0.3*1.5);
        }
        if ( !a || a < Math.abs(c) ) {
            a = c;
            var s = p/4;
        }
        else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        if (t < 1) {
            return - 0.5*(a*Math.pow(2,10*(t-=1)) *
                Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        }
        return a*Math.pow(2,-10*(t-=1)) *
            Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
    },
    backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        return c*(t/=d)*t*((s+1)*t - s) + b;
    },
    backOut: function(t, b, c, d, s){
        if (typeof s == 'undefined') {
            s = 3.70158;  //回缩的距离
        }
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },
    backBoth: function(t, b, c, d, s){
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        if ((t /= d/2 ) < 1) {
            return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        }
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },
    bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
        return c - Tween['bounceOut'](d-t, 0, c, d) + b;
    },
    bounceOut: function(t, b, c, d){
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
        }
        return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
    },
    bounceBoth: function(t, b, c, d){
        if (t < d/2) {
            return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
        }
        return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
    }
};

//抖动函数
	function shake(obj,pos,attr,endFn){
				
				obj.timer02 = null;
				
				var arr = [];   //抖动的频率
				
				var num = 0;    //初始值
				
				for (var i=20;i>0;i-=1){
					
					arr.push(i,-i);  //20,-20,18,-18,16,-16.......
					
				}
				
				arr.push(0);
				
				//开始抖动
				clearInterval(obj.timer02);
				
				obj.timer02 = setInterval(function(){
					
					obj.style[attr] = pos + arr[num] + 'px';
					
					num++;
					
					if(num === arr.length){
						
						clearInterval(obj.timer);
						
						endFn && endFn();
						
					}
					
				},10)
				
			}
	