function submitButton(){
	
	commandList = document.getElementById("commandWrap").getElementsByTagName("li");
	pidList = document.getElementById("pidWrap").getElementsByTagName("li");
	cpuList = document.getElementById("cpuWrap").getElementsByTagName("li");
//	symbolList = document.getElementById("symbolWrap").getElementsByTagName("li");
	
	commandParam = "";
	pidParam = "";
	cpuParam = "";
//	symbolParam = "";
	
	for(i = 0, size = commandList.length ; i < size ; i++){
		if(commandList[i].getAttribute("class") == "selected" || commandList[i].getAttribute("class") == "selected hideitem"){
			commandParam = commandParam + commandList[i].getElementsByTagName("span")[0].innerText + ";";
		}
	}
	for(i = 0, size = pidList.length ; i < size ; i++){
		if(pidList[i].getAttribute("class") == "selected" || pidList[i].getAttribute("class") == "selected hideitem"){
			pidParam = pidParam + pidList[i].getElementsByTagName("span")[0].innerText + ";";
		}
	}
	for(i = 0, size = cpuList.length ; i < size ; i++){
		if(cpuList[i].getAttribute("class") == "selected" || cpuList[i].getAttribute("class") == "selected hideitem"){
			cpuParam = cpuParam + cpuList[i].getElementsByTagName("span")[0].innerText + ";";
		}
	}
//	for(i = 0, size = symbolList.length ; i < size ; i++){
//		if(symbolList[i].getAttribute("class") == "selected" || symbolList[i].getAttribute("class") == "selected hideitem"){
//			symbolParam = symbolParam + symbolList[i].getElementsByTagName("span")[0].innerText + ";";
//		}
//	}
	
	document.getElementById("commandSelected").value = commandParam;
	document.getElementById("pidSelected").value = pidParam;
	document.getElementById("cpuSelected").value = cpuParam;
//	document.getElementById("symbolSelected").value = symbolParam;
	
	commandWrapDiv = document.getElementById("commandWrap").getElementsByTagName("div");
	pidWrapDiv = document.getElementById("pidWrap").getElementsByTagName("div");
	cpuWrapDiv = document.getElementById("cpuWrap").getElementsByTagName("div");
//	symbolWrapDiv = document.getElementById("symbolWrap").getElementsByTagName("div");
	
	commandWrapDiv[0].setAttribute("class","selectbox");
	pidWrapDiv[0].setAttribute("class","selectbox");
	cpuWrapDiv[0].setAttribute("class","selectbox");
//	symbolWrapDiv[0].setAttribute("class","selectbox");
	
	commandWrapDiv[1].setAttribute("style","display:none;");
	pidWrapDiv[1].setAttribute("style","display:none;");
	cpuWrapDiv[1].setAttribute("style","display:none;");
//	symbolWrapDiv[1].setAttribute("style","display:none;");
	
	commandWrapDiv[1].getElementsByTagName("ul")[0].setAttribute("class","selectboxoptions_check");
	pidWrapDiv[1].getElementsByTagName("ul")[0].setAttribute("class","selectboxoptions_check");
	cpuWrapDiv[1].getElementsByTagName("ul")[0].setAttribute("class","selectboxoptions_check");
//	symbolWrapDiv[1].getElementsByTagName("ul")[0].setAttribute("class","selectboxoptions_check");
	
	commandWrapDiv[1].getElementsByTagName("ul")[0].style.height = "0px";
	pidWrapDiv[1].getElementsByTagName("ul")[0].style.height = "0px";
	cpuWrapDiv[1].getElementsByTagName("ul")[0].style.height = "0px";
//	symbolWrapDiv[1].getElementsByTagName("ul")[0].style.height = "0px";
	
	
	document.getElementById("filterForm").submit();
	
//	alert(symbolList[1].getElementsByTagName("span")[0].innerText);
}

var expanded = false;

function folding(){
	title = document.getElementById("fold").getAttribute("title");
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

function expandTable(){
	document.getElementById("TableContainer").style.height = "92%";
	document.getElementById("expandTable").style.visibility = "hidden";
	expanded = true;
}


function foldingfilter(){
	title = document.getElementById("filter").getAttribute("title");
	if(title == "Filter"){
		title = "Close";
		document.getElementById("filter").setAttribute("title", title);
		document.getElementById("filter").setAttribute("class", "filterOpend");
		document.getElementById("filterSpace").style.height = "40px";
		document.getElementById("redLine0").style.height = "0px";
		document.getElementById("redLine").style.height = "1px";
		document.getElementById("redLine2").style.height = "2px";
		document.getElementById("filterContainer").style.visibility = "visible";
		if(!expanded){
		document.getElementById("TableContainer").style.height = "453px";
		}
	}else{
		title = "Filter";
		document.getElementById("filter").setAttribute("title", title);
		document.getElementById("filter").setAttribute("class", "filter");
		document.getElementById("filterSpace").style.height = "1px";
		document.getElementById("redLine0").style.height = "0px";
		document.getElementById("redLine").style.height = "1px";
		document.getElementById("redLine2").style.height = "0px";
		document.getElementById("filterContainer").style.visibility = "hidden";
		if(!expanded){
		document.getElementById("TableContainer").style.height = "500px";
		}
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