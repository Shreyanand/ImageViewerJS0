function dofirst (){
	
	x = document.getElementById("canvas");
	ctx = x.getContext('2d');
	scaley = 1.0; scalex = 1.0;
	angleInDegrees = 0;
	var fileInput = document.getElementById('myimg');
    count = 0;
	
	
	fileInput.addEventListener('change', function(e) {
      var file = fileInput.files[0];
	  var imageType = /image.*/;

if (file.type.match(imageType)) {
  var reader = new FileReader();

			  reader.onload = function(e) {
			  pic = new Image();
			  // Set the img src property using the data URL.
			  pic.src = reader.result;
			  pic.addEventListener("load",draw,false);
			  }
 reader.readAsDataURL(file); 
 document.getElementById('mainicon').style.visibility ="hidden";
 document.getElementById('canvas').style.border = "4px solid black ";
 document.body.style.backgroundImage = "url(Icons/h.png)";
 document.getElementById('ff').style.visibility ="hidden";
} 
else 
  {alert( "File not supported!");}
	
});
	
	 
	document.getElementById("fit_to_view").addEventListener("click",fit_to_view,false);
	document.getElementById("original").addEventListener("click",original,false);
	document.getElementById("zoom_in").addEventListener("click",zoomin,false);
	document.getElementById("zoom_out").addEventListener("click",zoomout,false);
	document.getElementById("antiClock").addEventListener("click",antiC,false);
	document.getElementById("Clock").addEventListener("click",C,false);
	document.getElementById("Fullscreen").addEventListener("click",fullscreen,false);
	document.getElementById("Fullscreen2").addEventListener("click",original,false);
	document.getElementById("prev").addEventListener("click",function(){alert(width)},false);
	document.getElementById("next").addEventListener("click",function(){alert("To be Implemented")},false);
	document.getElementById("grayscale").addEventListener("click",grayscale,false);
	document.getElementById("negative").addEventListener("click",negative,false);
	document.getElementById("red").addEventListener("change",regrbl,false);
	document.getElementById("green").addEventListener("change",regrbl,false);
	document.getElementById("blue").addEventListener("change",regrbl,false);
	document.getElementById("bright").addEventListener("change",bright,false);
	document.getElementById("Edit").addEventListener("click",edit,false);
	document.getElementById("save").addEventListener("click",save,false);
	document.getElementById("apply").addEventListener("click",mask,false);
	
	
}
function draw () {
	 
	natural_w = x.width = this.width;
	natural_h = x.height = this.height ;
	ctx.drawImage(pic,0,0,x.width,x.height);
	
}
function zoomin(){
	if(scalex <= 10 && scaley <=10){
	scalex += 0.05;
	scaley += 0.05;
	x.width = natural_w*scalex;
	x.height = natural_h*scaley;
	ctx.drawImage(pic,0,0,x.width,x.height);
	}
	
	}
function zoomout(){
	if(scalex >= 0.05 && scaley >= 0.05){
	scalex -= 0.05;
	scaley -= 0.05;
	x.width = natural_w*scalex;
	x.height = natural_h*scaley;
	ctx.drawImage(pic,0,0,x.width,x.height);
	}
	
	}
	
function antiC(){// DOES NOT WORK WITH FIT TO VIEW ,ONLY NATURAL Width,Height. DOESNOT WORK WITH ZOOM TO BE FIXED
	if(angleInDegrees == 0)
        angleInDegrees = 270;
    else
        angleInDegrees-=90;

    drawRotated(angleInDegrees);
	
	}
function C(){
	  angleInDegrees+=90 % 360;
    drawRotated(angleInDegrees);
	
	}
	
function drawRotated(degrees){
     var rad = degrees*Math.PI/180;
    ctx.clearRect(0,0,x.width,x.height);
	//var a = 2*x.height ;
	//var b = 2*x.width;
	if(degrees == 90 || degrees == 270)
	{x.width = natural_h;
	x.height = natural_w;}
	//ctx.save();
	else{x.width = natural_w;
	x.height = natural_h;}
	
	ctx.translate(x.width/2,x.height/2);
	ctx.rotate(rad);
	ctx.drawImage(pic,-natural_w/2,-natural_h/2);
	//ctx.restore();
	
}
	


function fit_to_view(){
	x.width = window.innerWidth - 75;
	x.height = window.innerHeight- 5;
	scalex = x.width/natural_w;
	scaley = x.height/natural_h;
	ctx.drawImage(pic,0,0,x.width,x.height);
}
function original(){
	x.width = natural_w;
	x.height = natural_h;
	ctx.drawImage(pic,0,0,x.width,x.height);
	scalex = 1.0; scaley = 1.0;
	
}
function fullscreen(){
	//document.body.style.paddingTop ="0px";
	x.width = window.innerWidth-150;
	x.height = window.innerHeight-5;
	scalex = x.width/natural_w;
	scaley = x.height/natural_h;
	ctx.drawImage(pic,0,0,x.width,x.height);
	}
function edit(){
	
	originimg = ctx.getImageData(0,0,x.width,x.height);
	originimgData =originimg.data;
	}

var toggle = true ;
function negative(){
	var imgData = ctx.getImageData(0,0,x.width,x.height);
	var d = imgData.data;
	for (var i=0; i< d.length; i+=4) {
    d[i] = 255 - d[i];
   d[i+1] = 255 - d[i+1];
   d[i+2] = 255 - d[i+2];
	
	}ctx.putImageData(imgData,0,0);
}
function grayscale(){
	var imgData = ctx.getImageData(0,0,x.width,x.height);
	var d = imgData.data;
	if(toggle){
	for (var i=0; i< d.length; i+=4) {
    var r = d[i];
    var g = d[i+1];
    var b = d[i+2];
    // CIE luminance for the RGB
    // The human eye is bad at seeing red and blue, so we de-emphasize them.
    var v = 0.2989 * r + 0.5870 * g + 0.1140 * b
    d[i] = d[i+1] = d[i+2] = v;
	}
	
	ctx.putImageData(imgData,0,0);
	toggle = false;
	}
	else{
	ctx.clearRect(0,0,x.width,x.height);
	ctx.drawImage(pic,0,0,x.width,x.height);
	toggle = true;
	}
	
  }
  
  function regrbl(){
	var d = originimgData;
	var imgData = ctx.createImageData(x.width,x.height);
	for (var i=0; i< d.length; i+=4) {
    
    imgData.data[i] = d[i] * document.getElementById("red").value;
	imgData.data[i+1] = d[i+1]* document.getElementById("green").value;
	imgData.data[i+2] = d[i+2]* document.getElementById("blue").value;
	imgData.data[i+3] = d[i+3];
	}
	ctx.putImageData(imgData,0,0);
	while(p1.firstChild){p1.removeChild(p1.firstChild);}
	while(p2.firstChild){p2.removeChild(p2.firstChild);}
	while(p3.firstChild){p3.removeChild(p3.firstChild);}
	
	document.getElementById("p1").appendChild( document.createTextNode(document.getElementById("red").value));
	document.getElementById("p2").appendChild( document.createTextNode(document.getElementById("green").value));
	document.getElementById("p3").appendChild( document.createTextNode(document.getElementById("blue").value));
	
}
  
 function bright(){
	var d = originimgData;
	var imgData = ctx.createImageData(x.width,x.height);

	for (var i=0; i< d.length; i+=4) {
		imgData.data[i] = d[i] * document.getElementById("bright").value;
	imgData.data[i+1] = d[i+1] * document.getElementById("bright").value;
	imgData.data[i+2] = d[i+2] * document.getElementById("bright").value;
	imgData.data[i+3] = d[i+3];
	}
	
	ctx.putImageData(imgData,0,0);
	while(p4.firstChild){p4.removeChild(p4.firstChild);}
	document.getElementById("p4").appendChild( document.createTextNode(document.getElementById("bright").value)); 
	 } 
function save(){
	  var dataURL = x.toDataURL();
	  download(dataURL, 'image.png');
	 }
function download( text,filename) {
    var pom = document.createElement('a');
    pom.setAttribute('href', text);
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}

function mask(){
	var val = new Array();
	var table = document.getElementById("filter_table");
    for(var i =0; i<9; i++){
		val[i] = document.getElementById("e"+i).value;
		}
	convolute(val);
}
function convolute (weights) {
  //alert(weights);
  var side = 3;
  var halfSide = 1;
  var src = originimgData;
  var sw = x.width;
  var sh = x.height;
  
  ctx.clearRect(0,0,x.width,x.height);
  // pad output by the convolution matrix
  var w = sw;
  var h = sh;
  var output = ctx.createImageData(w, h);
  var dst = output.data;
  // go through the destination image pixels
  //var alphaFac = opaque ? 1 : 0;
  for (var y=0; y<h; y++) {
    for (var z=0; z<w; z++) {
      var sy = y;
      var sx = z;
      var dstOff = (y*w+z)*4;
      // calculate the weighed sum of the source image pixels that
      // fall under the convolution matrix
      var r=0, g=0, b=0, a=0;
      for (var cy=0; cy<side; cy++) {
        for (var cx=0; cx<side; cx++) {
          var scy = sy + cy - halfSide;
          var scx = sx + cx - halfSide;
          if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
            var srcOff = (scy*sw+scx)*4;
            var wt = weights[cy*side+cx];
            r += src[srcOff] * wt;
            g += src[srcOff+1] * wt;
            b += src[srcOff+2] * wt;
            a += src[srcOff+3] * wt;
          }
        }
      }
      dst[dstOff] = r;
      dst[dstOff+1] = g;
      dst[dstOff+2] = b;
      dst[dstOff+3] = a ;
    }
  }
  
  ctx.putImageData(output,0,0);
};
	
	
 window.addEventListener("load",dofirst,false);