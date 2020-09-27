var fadeOutInterval;
var fadeInInterval;
var fadeOutInitTimeout;
var fadeInInitTimeout;
var fadeOutObjs = document.querySelectorAll('.fadeOut');
var fadeInObjs = document.querySelectorAll('.fadeIn');
var normal_button = document.querySelector('#normal-button');
var corona_button = document.querySelector('#corona-button');
var reset_button = document.querySelector('#reset-button');

var doFadeOut = function() {
	for (i = 0; i < fadeOutObjs.length; i++){
		var opacity = fadeOutObjs[i].getAttribute('model-opacity');
		if(opacity > 0){
			fadeOutObjs[i].setAttribute('model-opacity', opacity - .01);
		}
	}
}

var doFadeIn = function() {
	for (i = 0; i < fadeInObjs.length; i++){
		var opacity = fadeInObjs[i].getAttribute('model-opacity');
		if(opacity < 1){
			fadeInObjs[i].setAttribute('model-opacity', opacity + .01);
		}
	}
}

function OnNormalButtonPress(){
	ClearTimers();
	for (i = 0; i < fadeOutObjs.length; i++){
		fadeOutObjs[i].setAttribute('model-opacity', 1);
	}
	for (i = 0; i < fadeInObjs.length; i++){
		fadeInObjs[i].setAttribute('model-opacity', 0);
	}
}

function OnCoronaButtonPressed(){
	ClearTimers();
	for (i = 0; i < fadeOutObjs.length; i++){
		fadeOutObjs[i].setAttribute('model-opacity', 0);
	}
	for (i = 0; i < fadeInObjs.length; i++){
		fadeInObjs[i].setAttribute('model-opacity', 1);
	}
}

function Init(){
	ClearTimers();
	for (i = 0; i < fadeOutObjs.length; i++){
		fadeOutObjs[i].setAttribute('model-opacity', 1);
	}
	for (i = 0; i < fadeInObjs.length; i++){
		fadeInObjs[i].setAttribute('model-opacity', 0);
	}
	fadeOutInitTimeout = setTimeout(function() {fadeOutInterval = setInterval(doFadeOut, 100)}, 5000);
	fadeInInitTimeout = setTimeout(function() {fadeInInterval = setInterval(doFadeIn, 100)}, 15000);
}

function ClearTimers(){
	clearTimeout(fadeOutInitTimeout);
	clearTimeout(fadeInInitTimeout);
	clearInterval(fadeOutInterval);
	clearInterval(fadeInInterval);
}


setTimeout(function(){ 
	normal_button.addEventListener('pressed', function(){OnNormalButtonPress();});
	corona_button.addEventListener('pressed', function(){OnCoronaButtonPressed();});
	reset_button.addEventListener('pressed', function(){Init();});
	Init();
}, 3000);
