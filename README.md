# CS 4331 - Project 1

## Overview
My project is a one to one recreation of my room.

### Video
[![Watch the video](https://bluepuff71.github.io/4331-VR-Project-1/images/Intro_Shot.png)](https://bluepuff71.github.io/4331-VR-Project-1/video/VRProject1Video.mp4)

## Motivation
COVID-19 has had a distinct impact on the way we live and interact with others in the world. For my project I found it fitting to focus on a more introspective view.

## Custom Components
In order to change the opacity of the custom models, I needed to create a custom component.
```javascript
    AFRAME.registerComponent('model-opacity', {
        schema: {default: 1.0},
        init: function () {
            this.el.addEventListener('model-loaded', this.update.bind(this));
        },
        update: function () {
            var mesh = this.el.getObject3D('mesh');
            var data = this.data;
            if (!mesh) {
                return;
            }
            mesh.traverse(function (node) {
                if (node.isMesh) {
                    node.material.opacity = data;
                    node.material.transparent = data < 1.0;
                    node.material.needsUpdate = true;
                }
            });
        }
    });
```
## Interactions / Animations
### Transition Mode / Fade-in & Fade-out
I accomplished the fade-in/fade-out animations by using javascript intervals.
#### Fade-in / Fade-out Functions
```javascript
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
```
#### Interval Setting
```javascript
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
```
#### Event Listener Handling
```javascript
setTimeout(function(){ 
	normal_button.addEventListener('pressed', function(){OnNormalButtonPress();});
	corona_button.addEventListener('pressed', function(){OnCoronaButtonPressed();});
	reset_button.addEventListener('pressed', function(){Init();});
	Init();
}, 3000);
```

### Button Panel
There are three buttons that allow you to set the scene to a specific mode.
![The button panel](https://bluepuff71.github.io/4331-VR-Project-1/images/Button_panel.png)
#### Green Button
Pressing the green button will set the scene to "normal mode". 
[Normal mode photo]
```javascript
function OnNormalButtonPress(){
	ClearTimers();
	for (i = 0; i < fadeOutObjs.length; i++){
		fadeOutObjs[i].setAttribute('model-opacity', 1);
	}
	for (i = 0; i < fadeInObjs.length; i++){
		fadeInObjs[i].setAttribute('model-opacity', 0);
	}
}
```
```html
<a-entity id="normal-button" rotation="-90 0 0" position="-0.39153 2.09007 -3.04317" ui-button="base: beveled-square, blue; top: square, darkgreen; pressed: yellow, offset"></a-entity>
```
#### Red Button
Pressing the red button will set the scene to "COVID-19 mode".
![COVID Mode](https://bluepuff71.github.io/4331-VR-Project-1/images/Covid_Mode.png)
```javascript
function OnCoronaButtonPressed(){
	ClearTimers();
	for (i = 0; i < fadeOutObjs.length; i++){
		fadeOutObjs[i].setAttribute('model-opacity', 0);
	}
	for (i = 0; i < fadeInObjs.length; i++){
		fadeInObjs[i].setAttribute('model-opacity', 1);
	}
}
```
```html
<a-entity id="corona-button" rotation="-90 0 0" position="0.09803 2.09007 -3.04317" ui-button="base: beveled-square, blue; top: square, darkred; pressed: yellow, offset"></a-entity>
```
#### Yellow Button
Pressing the yellow button will reset the scene to "transition mode". 

### Ceiling Fan
The ceiling fan uses the a-Frame animation attribute to spin.
```html
<a-entity id="fan" rotation="0 0 0" animation="property: rotation; to: 0 360 0; loop: true; dur: 10000; easing: linear" scale="0.003 0.003 0.003" position="-4.18253 5.02908 -3.27803" gltf-model="models/ceiling_fan/scene.gltf">
	<a-light id="fan-light" light="type: point; penumbra: 0; shadowBias: 0; castShadow: true; angle: 60; shadowCameraVisible: false; shadowRadius: 1; shadowMapWidth: 512; shadowCameraBottom: -5; decay: 1; intensity: 0.25; color: #fffff4; distance: 0" position="0 -147.25958 0"></a-light>
</a-entity>
```
## Sources
### Models
 - [Masks](https://sketchfab.com/3d-models/face-masks-952463adcc614d93ab168cfc83ca5a16)
 - [Tennis Racket](https://sketchfab.com/3d-models/tennis-racket-c314dcce06ba488ca624957f579b8196)
 - [Tennis Ball](https://sketchfab.com/3d-models/tennis-ball-15bd6087617a4a379953550c56edb839)
 - [Ceiling Fan](https://sketchfab.com/3d-models/simple-ceiling-fan-226e34b1a7b3470cb0ba095af68af90c)
 - [Bed](https://sketchfab.com/3d-models/bed-403c4a48e5ea4a9fbbb9a096d90973af)
 - [Desk](https://sketchfab.com/3d-models/computer-desk-c67f61fa444044bcb88ec3e28f0ca7ac)
 - [Door](https://sketchfab.com/3d-models/door-with-frame-2f2f149f3ec44d658a02c1f924dfa449)
 - [Laundry Basket](https://sketchfab.com/3d-models/laundry-basket-2049ca95ca424b66a8e1948660c68b7e)
 - [Clothes](https://sketchfab.com/3d-models/folded-clothes-square-scan-challenge-07de2b503170432ca72c1f6cfeace05b)
 - [Backpack](https://sketchfab.com/3d-models/hershel-little-america-f4d7a0ed8af2453e9adc632278c9aa50)
### Components
 - [a-frame extras](https://github.com/n5ro/aframe-extras)
 - [Superframe](https://github.com/supermedium/superframe)
 - [a-frame UI Widgets](https://github.com/caseyyee/aframe-ui-widgets)
 - [a-frame Teleport controls](https://github.com/fernandojsg/aframe-teleport-controls)

