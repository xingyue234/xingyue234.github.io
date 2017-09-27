		   (function(){
		   	   let main = document.querySelector('#images');
			   let btns = main.getElementsByTagName("a");
			   let imgBox = main.querySelector('.img-box');
               let img = document.querySelectorAll('.img-box img');
               let num = 0;   //当前显示的图片索引
               let img01 = img[0];
               let img02 = img[1];  //两张图片的链接循环切换
               let timer = null;
               let onOff = false;
               let iW = main.offsetWidth;
               let imgurl = [
               'img/1.jpg',
               'img/2.jpg',
               'img/3.jpg',
               'img/4.jpg',
               'img/5.jpg',
               ];
               
                function autoPlay(){
                	
                	imgBox.style.left = 0;
                	
                	img01.setAttribute('src',imgurl[num]);
                	
            		num++;
            		if(num >= imgurl.length){
            			num = 0;
            		}
            		highLight(num);
            		
            		img02.setAttribute('src',imgurl[num]);
            		
                	animation(imgBox,{left:-iW},500,'easeBoth',function(){
                		
                	});
                }
               timer = setInterval(autoPlay,2000);
               
               //按钮高亮
               function highLight(num){
               	    for(var i=0;i<btns.length;i++){
            			btns[i].className = '';
            		}
            		btns[num].className = 'active';
               }
               
               main.onmouseover = function(){
               	clearInterval(timer);
               }
               main.onmouseout = function(){
               	 timer = setInterval(autoPlay,2000);
               }
               for(var i=0;i<btns.length;i++){
               	 btns[i].index = i;
               	 btns[i].onclick = function(){
               	 	  if(this.index > num){
               	 	  	
            	 	  	imgBox.style.left = 0;
                	
                	    img01.setAttribute('src',imgurl[num]);
                	    
                	    img02.setAttribute('src',imgurl[this.index]);
                	    
                	    highLight(this.index);
                	    
                	    animation(imgBox,{left:-iW},500,'easeBoth');
                	    
                	    num = this.index;
                	    
                	    
               	 	  }else if(this.index == num){
               	 	  	
               	 	  	 return;
               	 	  	 
               	 	  }else{
               	 	  	
               	 	  	imgBox.style.left = -iW + 'px';
                	
                	    img01.setAttribute('src',imgurl[this.index]);
                	    
                	    img02.setAttribute('src',imgurl[num]);
                	    
                	    highLight(this.index);
                	    
                	    animation(imgBox,{left:0},500,'easeBoth');
                	    
                	    num = this.index;
               	 	  	
               	 	  }
               	 	  
               	 }
               }
		     })();