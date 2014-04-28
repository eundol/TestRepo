var preCount = null;
function childPagePopup(count) {
	if(preCount == null){
		window.parent.document.getElementById("frame2").style.visibility = "visible";
		window.parent.document.getElementById("cpuFrameset").setAttribute("cols","74%,26%");
		window.parent.document.getElementById("frame1").setAttribute("frameborder","1");
		window.parent.document.getElementById("frame2").setAttribute("frameborder","1");
		window.parent.document.getElementById("frame1").noResize=false;
		/* window.parent.document.getElementById("frame2").setAttribute("src","./cpu/cpuchildtable.jsp"); */
	   	/* window.open("", "ChildTable","width=520,height=570,toolbar=no,location=no,resizable=yes,scrollbars=yes,menubar=yes,status=no"); */
	   	/* window.parent.frames.getElementById("PerfDataTable").setAttribute("style","width:68% ; height: 100%; float:left;");
	   	window.parent.document.getElementById("SubPerfDataTable").setAttribute("style","width:29% ; height:100% ; float:right; "); */
	   	document.getElementById("childForm"+count).submit();
	   	preCount = count;
	   	return;
	}
	if(preCount != count){
		window.parent.document.getElementById("frame2").style.visibility = "visible";
		window.parent.document.getElementById("cpuFrameset").setAttribute("cols","74%,26%");
		window.parent.document.getElementById("frame1").setAttribute("frameborder","1");
		window.parent.document.getElementById("frame2").setAttribute("frameborder","1");
		window.parent.document.getElementById("frame1").noResize=false;
		document.getElementById("childForm"+count).submit();
		preCount = count;
		return;
	}
	if(preCount == count){
		window.parent.document.getElementById("frame2").style.visibility = "visible";
		window.parent.document.getElementById("cpuFrameset").setAttribute("cols","74%,26%");
		window.parent.document.getElementById("frame1").setAttribute("frameborder","1");
		window.parent.document.getElementById("frame2").setAttribute("frameborder","1");
		window.parent.document.getElementById("frame1").noResize=false;
		document.getElementById("childForm"+count).submit();
		preCount = count;
		return;
/*  		window.parent.document.getElementById("cpuFrameset").setAttribute("cols","*");
		window.parent.document.getElementById("frame1").setAttribute("frameborder","0");
		window.parent.document.getElementById("frame2").setAttribute("frameborder","0");
		window.parent.document.getElementById("frame2").style.visibility = "hidden"; 
		flag = false;  */
	}
}

function detailPageView(count){
   	document.getElementById("detailForm"+count).submit();
   	return;
}

var group = false;
var reset = false;
var showall = false;

function changeTextColor(param){
	document.getElementById('group').style.color = "#0000FF";
	document.getElementById('reset').style.color = "#0000FF";
	document.getElementById('showall').style.color = "#0000FF";
	document.getElementById('searchButton').style.color = "black";
	
	document.getElementById(param).style.color = "#E10064";
	
	if(param == "group"){
	}
	if(param == "reset"){
	}
	if(param == "showall"){
	}
	if(param == "searchButton"){
		if(document.getElementById("commandSelected").value == "" &&
		   document.getElementById("pidSelected").value =="" &&
		   document.getElementById("cpuSelected").value == ""){
			document.getElementById('searchButton').style.color = "black";
			document.getElementById('reset').style.color = "#E10064";
		}
	}
}

function childPageClose(){
	window.parent.document.getElementById("cpuFrameset").setAttribute("cols","*");
	window.parent.document.getElementById("frame1").setAttribute("frameborder","0");
	window.parent.document.getElementById("frame2").setAttribute("frameborder","0");
	window.parent.document.getElementById("frame2").style.visibility = "hidden";
}
function childPageCloseP(){
	window.cpuTable2.document.getElementById("cpuFrameset").setAttribute("cols","*");
	window.cpuTable2.document.getElementById("frame1").setAttribute("frameborder","0");
	window.cpuTable2.document.getElementById("frame2").setAttribute("frameborder","0");
	window.cpuTable2.document.getElementById("frame2").style.visibility = "hidden";
}
function filterReset(){
	commandList = document.getElementById("commandWrap").getElementsByTagName("li");
	pidList = document.getElementById("pidWrap").getElementsByTagName("li");
	cpuList = document.getElementById("cpuWrap").getElementsByTagName("li");
	
	for(i = 0, size = commandList.length ; i < size ; i++){
		commandList[i].setAttribute("class","");
		}
	for(i = 0, size = pidList.length ; i < size ; i++){
		pidList[i].setAttribute("class","");
	}
	for(i = 0, size = cpuList.length ; i < size ; i++){
		cpuList[i].setAttribute("class","");
	}
	
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
}

var preRow = 0;
function rowColorChange(count){
	if(preRow == 0){
		document.getElementById("row"+count).setAttribute("class","select");
		preRow = count;
		return;
	}
	if(preRow == count){
		/* document.getElementById("row"+count).setAttribute("class","basic");
		preRow = 0; */
		return;
	}
	if(preRow != count){
		document.getElementById("row"+preRow).setAttribute("class","basic");
		document.getElementById("row"+count).setAttribute("class","select");
		preRow = count;
		return;
	}
}