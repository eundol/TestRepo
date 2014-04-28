<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%String inputId = (String)session.getAttribute("id"); %>
<%String object = "/object?id=" + inputId; %>
<%String memTimeChart = "/memtimechart?id=" + inputId; %>
<%String memBarChart = "/membarchart?id=" + inputId; %>
<%String memTable = "/memgettable?id=" + inputId; %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
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
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
<script src="js/highcharts.js"></script>
<script src="js/highcharts-more.js"></script>
<script src="js/modules/exporting.js"></script>
<script src="js/main.js" charset="euc-kr"></script>
</head>
<body>

<!-- Title Start -->
<div style="background:#F4F4F4">
	<h2 onclick="javascript:location.href='information.jsp'" style="cursor: pointer;background:#F4F4F4; padding-top: 5px; color: #B22222; width: 130px">
		Profile Viewer
	</h2>
</div>
<!-- Title End -->

<!-- Search Menu Start-->
<script type="text/javascript" src="./js/popup.js"></script>
<div style="width: 300px; height: 30px; background-color: #F4F4F4; position: absolute; top:7px; right:37px; text-align: right; vertical-align: middle; padding-top: 1px">
	Search&nbsp;&nbsp;
	<input id="inputText" type="text" style="width: 100px; height: 14px; color: gray; font-size: 11px" value=" User_Id" onkeypress="if(event.keyCode==13){javascript:searchPopup('memory');}"
		   onclick="javascript:searchFocus();"
	>&nbsp;
	<img onclick="javascript:searchPopup('memory');" 
	src="./img/search-icon.png" style="width:20px; hegiht:20px; vertical-align: bottom; cursor:pointer;" title="Search">
</div>
<!-- Search Menu End-->

<!-- Top Menu Start-->
<div id="tabsJ">
		<ul>
			<li><a href="overall.jsp" title="Overall Report"><span>Overall Report</span></a></li>
			<li><a href="cpu.jsp" title="CPU"><span>CPU</span></a></li>
			<li><a href="memory.jsp" title="Memory" style="background-position:0% -42px;"><span style="color:#FFF;background-position:100% -42px;">Memory</span></a></li>
			<li><a href="io.jsp" title="I/O"><span>I/O</span></a></li>
		</ul>
		<div style="float: left; position: absolute; right: 40px; margin-top : 3px; font: bold Verdana; font-size: 12px; background: #F4F4F4;">
			<jsp:include page="<%=object%>"></jsp:include>
		</div>
</div>
<!-- Top Menu End-->

<!-- TimeCharts Start -->
<div id="timeChartDiv" style="margin-top: 19px; width: 91%; height: 370px; float: left; padding-left: 4%">
	<iframe id="timeChart" name="timeChart" src=".<%=memTimeChart%>" width="100%" height="100%" scrolling="no" frameborder="0">
	</iframe>
</div>
<!-- TimeCharts End -->

<div style="width: 98%; height: 7px; background-color: white; float: left; margin-left: 1%" id="whiteLine"></div>
<!-- <div style="width: 98%; height: 1px; background-color: #B22222; float: left; margin-left: 1%" id="redLine"></div> -->
<div style="width: 98%; height: 1px; background-color: #C9C9D1; float: left; margin-left: 1%" id="redLine"></div>
<div style="width: 98%; height: 7px; background-color: white; float: left; margin-left: 1%" id="whiteLine"></div>

<!-- Table Start -->
<div id="memTableDiv" style="margin-top: 8px; width: 56%; height: 370px; float: left; padding-left: 6%">
	<iframe id="memTable" name="memTable" src=".<%=memTable%>" width="100%" height="100%" scrolling="yes" frameborder="0">
	</iframe>
</div>
<!-- Table End -->

<!-- BarCharts Start -->
<div id="barChartDiv" style="margin-top: 12px; width: 29%; height: 370px; float: right; padding-right: 7%">
	<iframe id="barChart" name="barChart" src=".<%=memBarChart%>" width="100%" height="100%" scrolling="no" frameborder="0">
	</iframe>
</div>
<!-- BarCharts End -->

<div style="width:100%; height: 33px; float: left; color: white;"></div>

<!-- ****** "fixed" footer ****** -->
	<div id="tabsJFooter">
		<div style="margin-top: 2px; font: 11px/1.5em Verdana;">
			Copyright 2013 LG Electronics. All Rights Reserved.
		 <a href="http://collab.lge.com/main/display/CC/CTO+Map" target="_blank"> Collab </a> | 
		 <a href="http://collab.lge.com/main/pages/viewpage.action?pageId=6391855" target="_blank">SWP lab </a> | 
		 <a href="http://10.177.235.70:3000/view/index" target="_blank">Log</a>
		</div>
	</div>
<!-- end of footer -->
</body>
</html>