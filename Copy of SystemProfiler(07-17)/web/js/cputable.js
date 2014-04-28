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

function childPageClose(){
	window.parent.document.getElementById("cpuFrameset").setAttribute("cols","*");
	window.parent.document.getElementById("frame1").setAttribute("frameborder","0");
	window.parent.document.getElementById("frame2").setAttribute("frameborder","0");
	window.parent.document.getElementById("frame2").style.visibility = "hidden";
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