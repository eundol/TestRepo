<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%String inputId = (String)session.getAttribute("id"); %>
<%String object = "/object?id=" + inputId; %>
<%System.out.println("OVERALL 접속IP : " + request.getRemoteAddr());%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
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
			<li><a href="overall.jsp" title="Overall Report" style="background-position:0% -42px;"><span style="color:#FFF;background-position:100% -42px;">Overall Report</span></a></li>
			<li><a href="cpu.jsp" title="CPU"><span>CPU</span></a></li>
			<li><a href="memory.jsp" title="Memory"><span>Memory</span></a></li>
			<li><a href="io.jsp" title="I/O"><span>I/O</span></a></li>
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

<br><br><br><br>
&nbsp;&nbsp;&nbsp;&nbsp;Under Construction...

<!-- More Charts Start-->
	<div style="margin-top: 15px; width: 100%; float: right; text-align: right; padding-right: 35px; ">
		<img onclick="javascript:folding()" 
			id="fold" src="./img/chart-add-icon.png" width="30px%" height="30px" style="cursor: pointer; float: right;" title="Open">
		<font color="#687788" style="font-size:small ; float: right; padding-top: 5px;">Get more charts(demo) >&nbsp;&nbsp;</font>
	</div>
	<iframe name="timechart" id="timechart" frameborder="0" scrolling="no" width="0px" height="0px" src="" >
	</iframe>
<!-- More Charts End-->

<%}%>

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