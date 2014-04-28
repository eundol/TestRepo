function folding(){
	var title = document.getElementById("fold").getAttribute("title");
	if(title == "Open"){
		title = "Close";
		document.getElementById("fold").setAttribute("title", title);
		document.getElementById("fold").setAttribute("src", "./img/chart-remove-icon.png");
		document.getElementById("timechart").setAttribute("width","100%");
		document.getElementById("timechart").setAttribute("height","755px");
		document.getElementById("timechart").setAttribute("src","./cpu/timechart.jsp");
	}else{
		title = "Open";
		document.getElementById("fold").setAttribute("title", title);
		document.getElementById("fold").setAttribute("src", "./img/chart-add-icon.png");
		document.getElementById("timechart").setAttribute("width","0px");
		document.getElementById("timechart").setAttribute("height","0px");
		document.getElementById("timechart").setAttribute("src","");
	}
	
}

function toggleHover(){
	document.getElementById("toggleImg").setAttribute("src", "./img/Reserved.ReportViewerWebControl (1).png");
}
function toggleUnHover(){
	document.getElementById("toggleImg").setAttribute("src", "./img/Reserved.ReportViewerWebControl.png");
}

var toggle = false;

function toggleOnOff(){
	if(toggle == false){
		document.getElementById("summaryDiv").style.height='1px';
		document.getElementById("cpuCoreDiv").style.height='1px';
		document.getElementById("cpuFunctionDiv").style.height='1px';
		document.getElementById("cpuTableDiv").style.height='850px';
		document.getElementById("cpuTable").contentWindow.location.reload(true);
		toggle = true;
	}else{
		document.getElementById("summaryDiv").style.height='340px';
		document.getElementById("cpuCoreDiv").style.height='340px';
		document.getElementById("cpuFunctionDiv").style.height='340px';
		document.getElementById("cpuTableDiv").style.height='510px';
		toggle = false;
	}
}