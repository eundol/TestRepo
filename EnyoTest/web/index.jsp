<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%System.out.println("Enyo API Test 접속IP : " + request.getRemoteAddr());%>
<%String pieChart = "/piechart"; %>
<%String flowChart = "/flowchart"; %>
<%String getSearchBar = "/getsearchbar"; %>
<%String getSummary = "/getsummary"; %>
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
	color: #0060;
	margin: 0px;
	padding: 0px 0px 0px 15px;
}
</style>
<title>Enyo Test Report</title>
<script type="text/javascript" src="js/jquery-1.4.4.min.js"></script>
<script src="js/highcharts.js"></script>
<script src="js/highcharts-more.js"></script>
<script src="js/modules/exporting.js"></script>
<link href="favicon.ico" rel="shortcut icon"/>
</head>
<body style="width:100%;height:100%;margin:0px;">
<!-- Title Start -->
<div style="height:47px; background:#F4F4F4;">
	<span onclick="javascript:location.reload();" style="cursor: pointer; margin-top:15px; color: #B22222; width: 130px; background:#F4F4F4;">
		 <!-- EnyoTest  -->
		 <img alt="" src="./img/title.png" style="width:190px; height:38px; margin-top:5px; margin-left:7px; background:#F4F4F4;">
	</span>
</div>
<div style="background:gray;height:1px;"></div>
<div style="background:lightgray;height:1px;"></div>
<div style="height:12px;"></div>
<!-- Title End -->

<div style="width:100%; height: 6px; float: left; color: white;"></div>

<div style="margin:0 auto; width: 1240px; font-size: 13px;">
<!-- <span style="border: 1px solid #cccdcf; font-size: 15px; font-family: 'Nanum-Gothic', 'arial', 'sans-serif'; color: navy; background-color: mistyrose; padding: 2px;">
&nbsp;Automated test execution flow charts&nbsp;</span>
-->
<div style="font-weight: bold; font-family: 'Lucida Grande', 'Lucida Sans Unicode', Verdana, Arial, Helvetica, sans-serif; font-size: 16px; color: #274B6D; fill: #B22222;">
&nbsp;Automated test execution flow charts
</div>
</div>

<!-- SearchBar Start -->
<div style="margin:0 auto; width: 1240px; margin-top: 6px;">
	<iframe id="searchBarFrame" name="searchBarFrame" src=".<%=getSearchBar%>" width="100%" height="40px" scrolling="no" frameborder="0">
	</iframe>
</div>
<!-- SearchBar End -->

<!-- Charts Start -->
<div style="margin:0 auto; width: 1240px;">
	<div id="flowChartDiv" style="margin-top: 0px; width: 852px; height: 355px; float: left; padding-left: 3px; position:relative;">
		<iframe id="flowChartFrame" name="flowChartFrame" src=".<%=flowChart%>" width="100%" height="100%" scrolling="no" frameborder="0">
		</iframe>
	</div>
	<div id="pieChartDiv" style="margin-top: 0px; margin-left: 5px; width: 377px; height: 355px; float: left; padding-left: 0px">
		<iframe id="pieChartFrame" name="pieChartFrame" src=".<%=pieChart%>" width="100%" height="100%" scrolling="no" frameborder="0">
		</iframe>
	</div>
</div>

<div style="margin:0 auto; width: 1240px;">
<div style="width: 98%; height: 17px; background-color: white; float: left; margin-left: 1%" id=""></div>
<!-- <div style="width: 98%; height: 1px; background-color: #C9C9D1; float: left; margin-left: 1%" id=""></div>
<div style="width: 98%; height: 21px; background-color: white; float: left; margin-left: 1%" id=""></div> -->
</div>

<div style="margin:0 auto; width: 1240px;">
	<div id="flowChartDiv" style="margin-top: 0px; width: 600px; height: 355px; float: left; padding-left: 3px; position:relative;">
		<iframe id="flowChartFrame" name="flowChartFrame" src=".<%=flowChart%>" width="100%" height="100%" scrolling="no" frameborder="0">
		</iframe>
	</div>
	<div id="flowChartDiv" style="margin-top: 0px; margin-left: 18px; width: 600px; height: 355px; float: left; padding-left: 0px">
		<iframe id="flowChartFrame" name="flowChartFrame" src=".<%=flowChart%>" width="100%" height="100%" scrolling="no" frameborder="0">
		</iframe>
	</div>
</div>
<!-- Charts End -->

<!-- Summary Start -->
<%-- <div style="margin:0 auto; width: 1240px;">
	<iframe id="summaryFrame" name="summaryFrame" src=".<%=getSummary%>" width="100%" height="40px" scrolling="no" frameborder="0">
	</iframe>
</div> --%>
<!-- Summary End -->

<div style="margin:0 auto; width: 1240px;">
<div style="width: 98%; height: 21px; background-color: white; float: left; margin-left: 1%" id=""></div>
<div style="width: 98%; height: 1px; background-color: #C9C9D1; float: left; margin-left: 1%" id=""></div>
<div style="width: 98%; height: 21px; background-color: white; float: left; margin-left: 1%" id=""></div>
</div>

<div style="margin:0 auto; width: 1240px; font-size: 13px;">
<!-- <span style="border: 1px solid #cccdcf; font-size: 15px; font-family: 'Nanum-Gothic', 'arial', 'sans-serif'; color: navy; background-color: mistyrose; padding: 2px;">
&nbsp;Deliverables and documents&nbsp;</span>
</div> -->
<div style="font-weight: bold; font-family: 'Lucida Grande', 'Lucida Sans Unicode', Verdana, Arial, Helvetica, sans-serif; font-size: 16px; color: #274B6D; fill: #B22222;">
&nbsp;Deliverables and documents
</div>
</div>
<!-- Results & Document Start -->
<div style="margin:0 auto; width: 1240px;">
	<div style="margin-top: 13px; margin-left:1px; width: 1185px; height:310px; overflow-x: hidden; overflow-y: scroll; border: 1px solid #cccdcf; background: #ecedef; font-family: '돋움',dotum,sans-serif;">
		<div style="float: left; margin-left: 20px; margin-top: 11px;"><jsp:include page="dailyfilelist.jsp"></jsp:include></div>
		<div style="float: left; margin-left: 90px; margin-top: 11px;"><jsp:include page="testdocument.jsp"></jsp:include></div>
		<div style="float: left; margin-left: 60px; margin-top: 11px;"><jsp:include page="dailyfilelist_st.jsp"></jsp:include></div>
		<div style="float: left; margin-left: 90px; margin-top: 11px;"><jsp:include page="testdocument_st.jsp"></jsp:include></div>
	</div>
</div>
<!-- Results & Document End -->

<div style="margin:0 auto; width: 1240px;">
<div style="width: 98%; height: 34px; background-color: white; float: left; margin-left: 1%" id=""></div>
<div style="width: 98%; height: 1px; background-color: #C9C9D1; float: left; margin-left: 1%" id=""></div>
<div style="width: 98%; height: 7px; background-color: white; float: left; margin-left: 1%" id=""></div>
</div>

<!-- Contact Start -->
<div style="margin:0 auto; width: 1240px;">
	<img alt="" src="./img/title2.png" style="margin:0 auto; float: right; cursor: pointer;" onclick="javascript:location.reload();">
	<div style="color:#353535; float: right; width:100%; text-align: right; font-weight:normal;"><span>contact : Choi Eunhee&nbsp;&nbsp;</span><span><a style="color:blue; text-decoration: underline; font-weight: normal;"href="mailto:eunhee.choi@lge.com">eunhee.choi@lge.com</a></span></div>
</div>
<!-- Contact End -->

<div style="width:100%; height: 30px; float: left; color: white;"></div>

<!-- ****** "fixed" footer ****** -->
	<div id="tabsJFooter" style="border-top-color: Gray;">
		<div style="margin-top: 2px; font: 11px/1.5em Verdana;">
			Copyright 2013 LG Electronics. All Rights Reserved.
		 <a href="http://collab.lge.com/main/display/CC/CTO+Map" target="_blank"> Collab </a> | 
		 <a href="http://collab.lge.com/main/pages/viewpage.action?pageId=6391855" target="_blank">SWP lab </a> | 
		 <a href="http://collab.lge.com/main/display/RCRTP/III.+Enyo+API+Test" target="_blank">Test Plan </a>
		</div>
	</div>
<!-- end of footer -->
</body>
</html>