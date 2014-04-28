/*--- switchTap ---*/

// previous selected tap
var nowTap = 'main';

// define each tab's height
var height_iframe = {};
height_iframe['main'] = 'auto';
height_iframe['bat'] = '100%';
height_iframe['system'] = 'auto';
height_iframe['luna'] = 'auto';
height_iframe['garnet'] = 'auto';
height_iframe['static'] = '100%';

// define each tap's url
var url_iframe = {};
url_iframe['main'] = 'main.jsp';
url_iframe['bat'] = 'http://collab.lge.com/main/display/CCWMP/BAT+Results';
url_iframe['system'] = 'system.jsp';
url_iframe['luna'] = 'luna';
url_iframe['garnet'] = 'garnet.jsp';
url_iframe['static'] = 'http://165.186.175.208:8080/';

// switchTap Main
function switchTap(selected){
	removeClass(document.getElementById(nowTap), 'active');
	removeClass(document.getElementById('api'), 'active');
	removeClass(document.getElementById(nowTap), 'topnavsubactive');
	if(selected == 'system' || selected == 'static' || selected == 'bat'){
		addClass(document.getElementById(selected), 'active');
	}
	if(selected == 'luna' || selected == 'garnet'){
		addClass(document.getElementById(selected), 'topnavsubactive');
		addClass(document.getElementById('api'), 'active');
	}
	nowTap = selected;
	changeIframeHeight(nowTap);
	changeIframeURL(nowTap);
}
// change height
function changeIframeHeight(selected){
	document.getElementById('iframeWarpper').style.height = height_iframe[selected];
	document.getElementById('footerGap').style.background = '#FFFFFF'; // reset
	document.getElementById('mainIframe').style.marginTop = '0px'; // reset
	document.getElementById('mainIframe').style.marginLeft = '0px'; // reset
	if(selected=='bat'){
//		document.getElementById('mainIframe').style.marginTop = '-805px';
//		document.getElementById('mainIframe').style.marginLeft = '15px';
	}
	if(selected=='static'){
		document.getElementById('iframeWarpper').style.height = 
			document.getElementById('iframeWarpper').scrollHeight - 132 + 'px';
		// when static, change footergap's color
		document.getElementById('footerGap').style.background = '#EEEEEE'; 
	}
}

// change URL of iframe
function changeIframeURL(selected){
	document.getElementById('mainIframe').src = url_iframe[selected];
}

// change height for onResize
function resizeIframe(){
	if(document.getElementById('mainIframe').src == "http://165.186.175.208:8080/"){
		changeIframeHeight('static');
	}
}
window.onresize = resizeIframe;

/*--- Utilities ---*/

// addClass
function addClass(element, myClass) {
	if(element != null){
		element.className += ' ' + myClass; 
	}
}
// removeClass
function removeClass(element, myClass) {
	if(element != null){
		element.className = element.className.replace(myClass,'');
	}
}