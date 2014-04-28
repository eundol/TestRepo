<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%String inputId = (String)session.getAttribute("id"); %>
<%String object = "/object?id=" + inputId; %>
<%String cpuTable = "/cputableview?id=" + inputId; %>
<%String cpuFunction = "/cpufunctionchart?id=" + inputId; %>
<%String cpuSummary = "/cpusummary?id=" + inputId; %>
<%-- <%String cpuCore = "/cpucorechart?id=" + inputId; %> --%>
<%String cpuPie = "/cpupiechart?id=" + inputId; %>
<%String cpuTrace = "/cputracechart?id=" + inputId; %>
<%String cpuProcess = "/cpuprocesschart?id=" + inputId;%> 
<%System.out.println("CPU-TAB 접속IP : " + request.getRemoteAddr());%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<!-- <script language=javascript> 
function hidePreload() { 
  preload.style.visibility = "hidden"; 
} 
function makePreload(msg) { 
  document.write("<div id=\"preload\" style=\"", 
    "position:absolute;top:0;left:0;width:100%;height:100%;margin-top:65px;", 
    "background-color:white;color:black;", 
    "\">", 
    "<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;", 
    msg, 
    "<img src = \"./img/ing.gif\"></div>"); 
} 
makePreload("Loading..."); 
self.onload=hidePreload;
</script>  -->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="./css/basic.css" type="text/css" />
<style type="text/css">
body {
	margin: 0;
	padding: 0;
	font: bold 12px/1.5em Verdana;
	height: 100%;
}
h2 {
	font: bold 14px Verdana, Arial, Helvetica, sans-serif;
	color: #000;
	margin: 0px;
	padding: 0px 0px 0px 15px;
}
</style>
<title>Profile Viewer :: LG Electronics</title>
<script type="text/javascript" src="js/jquery-1.4.4.min.js"></script>
<script src="js/highcharts.js"></script>
<script src="js/highcharts-more.js"></script>
<script src="js/modules/exporting.js"></script>
<script src="js/main.js" charset="euc-kr"></script>
</head>
<body>

<!-- Title Start -->
<div style="background:#F4F4F4">
	<h2 onclick="javascript:location.href='information.jsp'" style="cursor: pointer;background:#F4F4F4; padding-top: 6px; color: #B22222; width: 130px">
		 <!-- Profile Viewer  -->
		<img alt="" src="./img/title12.png" style="width: 145%; height: 145%;">
	</h2>
</div>
<!-- Title End -->

<!-- Search Menu Start-->
<script type="text/javascript" src="./js/popup.js"></script>
<div style="width: 300px; height: 30px; background-color: #F4F4F4; position: absolute; top:12px; right:35px; text-align: right; vertical-align: middle; padding-top: 2px">
	Search&nbsp;&nbsp;
	<input id="inputText" type="text" style="width: 100px; height: 14px; color: gray; font-size: 11px" value=" User_ID" onkeypress="if(event.keyCode==13){javascript:searchPopup('cpu');}"
		   onclick="javascript:searchFocus();"
	>&nbsp;
	<img onclick="javascript:searchPopup('cpu');" 
	src="./img/search-icon.png" style="width:20px; hegiht:20px; vertical-align: bottom; cursor: pointer;" title="Search">
</div>
<!-- Search Menu End-->

<!-- Top Menu Start-->
<div id="tabsJ">
		<ul>
			<!-- <li><a href="overall.jsp" title="Overall Report"><span>Overall Report</span></a></li> -->
			<li><a href="cpu.jsp" title="CPU" style="background-position:0% -42px;"><span style="color:#FFF;background-position:100% -42px;">&nbsp;&nbsp;&nbsp;&nbsp;CPU&nbsp;&nbsp;&nbsp;</span></a></li>
			<li><a href="memory.jsp" title="Memory"><span>&nbsp;&nbsp;&nbsp;&nbsp;Memory&nbsp;&nbsp;&nbsp;</span></a></li>
			<li><a href="io.jsp" title="I/O"><span>&nbsp;&nbsp;&nbsp;&nbsp;I/O&nbsp;&nbsp;&nbsp;</span></a></li>
		</ul>
		<div style="float: left; position: absolute; right: 38px; margin-top : 3px; font: bold Verdana; font-size: 12px; background: #F4F4F4;">
			<jsp:include page="<%=object%>"></jsp:include>
		</div>
</div>
<div style="width: 100%; height: 1px; background-color: #E1E2E1; float: left;" id="grayLine"></div>
<!-- Top Menu End-->

<!-- Guide(when inputId is null) Start -->
<%if( inputId == null ){%>
<div style="width: 100%; height: 34px; background-color: #D9036A; float: left; color: white; margin-top: 20px; margin-bottom:25px;font-size: 16px; font-family: 돋음, Dotum, Baekmuk Dotum, Undotum, Apple Gothic, Latin font, sans-serif;">
	<div style="margin-top: 7px; margin-left: 55px;">	
	Session information is missing or has expired.
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="font: bold 12px/1.5em Verdana;">Search</span>&nbsp;
	<input id="inputText2" type="text" style="width: 100px; height: 14px; color: gray; font-size: 11px" value=" User_ID" onkeypress="if(event.keyCode==13){javascript:searchPopup2('cpu');}"
		   onclick="javascript:searchFocus2();"
	>
	<img onclick="javascript:searchPopup2('cpu');" 
	src="./img/search-icon.png" style="width:20px; hegiht:20px; vertical-align: bottom; cursor: pointer;" title="Search">
	</div>
</div>
<%}else{%>
<!-- Guide(when inputId is null) End -->

<!-- Charts Start -->
<div id="summaryDiv" style="margin-top: 15px; width: 35%; height: 340px; float: left; padding-left: 0px">
	<iframe id="summary" name="summary" src=".<%=cpuSummary%>" width="100%" height="100%" scrolling="no" frameborder="0">
	</iframe>
</div>
<div id="cpuCoreDiv" style="margin-top: 15px; width: 29%; height: 340px; float: left; padding-left: 0px">
	<iframe id="cpuCore" name="cpuCore" src=".<%=cpuPie%>" width="100%" height="100%" scrolling="no" frameborder="0">
	</iframe>
</div>
<div id="cpuFunctionDiv" style="margin-top: 15px; width: 32%; height: 340px; float: right; padding-right: 37px" >
	<iframe id="cpuFunction" name="cpuFunction" src=".<%=cpuFunction%>" width="100%" height="100%" scrolling="no" frameborder="0">
	</iframe>
</div>
<!-- Charts End -->

<div style="width: 98%; height: 21px; background-color: white; float: left; margin-left: 1%" id="whiteLine"></div>
<div style="width: 98%; height: 1px; background-color: #C9C9D1; float: left; margin-left: 1%" id="grayLine"></div>
<div style="width: 98%; height: 0px; background-color: white; float: left; margin-left: 1%" id="whiteLine"></div>

<!-- Charts-Trace Start -->
<div id="cpuTraceDiv" style="margin-top: 21px; width: 90%; height: 360px; float: left; padding-left: 5%">
	<iframe id="cpuTraceChart" name="timeChart" src=".<%=cpuTrace%>" width="100%" height="100%" scrolling="no" frameborder="0">
	</iframe>
</div>
<!-- Charts-Trace End -->

<div style="width: 98%; height: 21px; background-color: white; float: left; margin-left: 1%" id="whiteLine"></div>
<div style="width: 98%; height: 1px; background-color: #C9C9D1; float: left; margin-left: 1%" id="grayLine"></div>
<div style="width: 98%; height: 0px; background-color: white; float: left; margin-left: 1%" id="whiteLine"></div>

<!-- Charts-Process Start -->
<div id="cpuProcessDiv" style="margin-top: 21px; width: 90%; height: 360px; float: left; padding-left: 5%">
	<iframe id="cpuProcessChart" name="cpuProcessChart" src=".<%=cpuProcess%>" width="100%" height="100%" scrolling="no" frameborder="0">
	</iframe>
</div>
<!-- Charts-Process End -->

<!-- Toggle Start -->
<!-- <div id="toggleParam"  
	 style="float: left; width: 100%; height: 5px; background-color: #A4B7D8;
     margin-top: 7px; cursor: pointer;
     border: solid;
     border-width: 1px;
     border-color: #A4B7D8;"
  	 onmouseover="this.style.backgroundColor='#A4B7D8';javascript:toggleHover();"
	 onmouseout="this.style.backgroundColor='#DEE7F2';javascript:toggleUnHover();"
	 onclick="javascript:toggleOnOff()">
<center>
	<img id="toggleImg" src="./img/Reserved.ReportViewerWebControl.png" height="5px">
</center>
</div> -->
<!-- Toggle End -->

<div style="width: 98%; height: 21px; background-color: white; float: left; margin-left: 1%" id="whiteLine"></div>
<div style="width: 98%; height: 1px; background-color: #C9C9D1; float: left; margin-left: 1%" id="grayLine"></div>
<div style="width: 98%; height: 0px; background-color: white; float: left; margin-left: 1%" id="whiteLine"></div>

<!-- Cpu Table Start -->
<div id="cpuTableDiv" style="margin-top: 8px; width: 96%; height: 519px; float: left; padding-left: 2%;">
	<iframe id="cpuTable" name="cpuTable" src=".<%=cpuTable%>" width="100%" height="100%" scrolling="no" frameborder="0" style="height: 100%; margin-left: 2px;">
	</iframe>
</div>
<!-- Cpu Table End -->

<%}%>

<div style="width:100%; height: 38px; float: left; color: white;"></div>

<!-- ****** "fixed" footer ****** -->
	<div id="tabsJFooter">
		<div style="margin-top: 2px; font: 11px/1.5em Verdana;">
			Copyright 2013 LG Electronics. All Rights Reserved.
		 <a href="http://collab.lge.com/main/display/CC/CTO+Map" target="_blank"> Collab </a> | 
		 <a href="http://collab.lge.com/main/pages/viewpage.action?pageId=6391855" target="_blank">SWP lab </a> | 
		 <a href="http://10.177.235.70:3000/view/index" target="_blank">Log </a> | 
		 User Guide (<a href="http://collab.lge.com/main/pages/viewpage.action?pageId=157249528" target="_blank">KO</a>/<a href="http://collab.lge.com/main/pages/viewpage.action?pageId=157249637" target="_blank">EN</a>) 
		</div>
	</div>
<!-- end of footer -->
</body>
</html>