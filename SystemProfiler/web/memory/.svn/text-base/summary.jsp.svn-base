<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" import="java.util.*"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="entity.*" %>
<%@ page import="common.*" %>
<%@ page import="java.text.DecimalFormat" %>
<%
	CpuSummaryEntity summaryEntity = (CpuSummaryEntity)request.getAttribute("cpuSummary");
	ArrayList<IoEntity> cpuTraceInfo = (ArrayList<IoEntity>)request.getAttribute("cpuTraceInfo");
	ProfileUtils profileUtil = new ProfileUtils();
/* 	String fileNameP = summaryEntity.getFileName();
	if(fileNameP == null){
		fileNameP = "N/A";
	} */
	String testCaseIdP = summaryEntity.getTestCaseId();
	if(testCaseIdP == null){
		testCaseIdP = "N/A";
	}
	String testDateP = summaryEntity.getTestDate();
	if(testDateP == null || testDateP.equals("")){
		testDateP = "N/A";
	}
/* 	String usageOverheadP = summaryEntity.getUsageOverhead();
	if(usageOverheadP == null){
		usageOverheadP = "N/A";
	}
	String idleOverheadP = summaryEntity.getIdleOverhead();
	if(idleOverheadP == null){
		idleOverheadP = "N/A";
	} 
	String numberOfFunctionP = summaryEntity.getNumberOfFuctions();
	if(numberOfFunctionP == null){
		numberOfFunctionP = "N/A";
	} */
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="./css/basic.css" type="text/css" />
<style type="text/css">
body {
	margin: 0;
	padding: 0;
	height: 100%;
}
h2 {
	font: bolder 14px Verdana, Arial, Helvetica, sans-serif;
	color: #000;
	margin: 0px;
	padding: 0px 0px 0px 15px;
}
#page-background{
	position: fixed;
	width: 100%;
	height: 100%;
}
</style>
<title>Insert title here</title>
</head>
<body>
<div style="height: 9px"></div>
<center>
<font style="font-family: 'Lucida Grande', 'Lucida Sans Unicode', Verdana, Arial, Helvetica, sans-serif; font-size: 16px;
color: #B22222; fill: #B22222; text-align: center; font-weight: bolder;" title="">
Summary
</font>
</center>
<div style="height: 0px"></div>
<div id="page-background">
<img src="./img/Frame-For-Your-Work-II_One-Work.jpg" width="90%" height="301px" style="margin-left: 38px;">
</div>

<div style="
font-weight : bold; font: 15px/1.5em Verdana;
position: relative; padding-top: 70px; padding-left: 22%;">
<font style="font-size: 14px;">
ㆍ Tool Info : </font>
<%-- <%if(fileNameP.equals("N/A")){%> 
<font color="#B22222" style="font-size: 13px; font-weight: normal;"><%=fileNameP%></font>
<%}else{ %>
<%=fileNameP%>
<%} %> --%>
free v3.2.8, smem
<!-- <br><br>
<font style="font-size: 14px;">
ㆍ Build ID : </font> -->
<%-- <%if(testCaseIdP.equals("N/A")){%> 
<font color="#B22222" style="font-size: 13px; font-weight: normal;"><%=testCaseIdP%></font>
<%}else{ %>
<%=testCaseIdP%>
<%} %> --%>
<br><br>
<font style="font-size: 13px;">
ㆍ Test Case ID : </font>
<%if(testCaseIdP.equals("N/A")){%> 
<font color="#B22222" style="font-size: 12px; font-weight: normal;"><%=testCaseIdP%></font>
<%}else{ %>
<%=testCaseIdP%>
<%} %>
<br><br>
<font style="font-size: 13px;">
ㆍ Test Date : </font>
<%if(testDateP.equals("N/A")){%>
<font color="#B22222" style="font-size: 12px; font-weight: normal;"><%=testDateP%></font>
<%}else{ %>
<%=testDateP.substring(0,16)%>
<%} %>
<br><br>
<font style="font-size: 13px;">
ㆍ Duration : </font>
<%if(testDateP.equals("N/A")){%>
<font color="#B22222" style="font-size: 12px; font-weight: normal;"><%=testDateP%></font>
<%}else{ %>
<%=cpuTraceInfo.size()%> Seconds <font style="font-size: 12px;">(<%=testDateP.substring(11,19)%> ~ <%=profileUtil.addSecondTime(testDateP, cpuTraceInfo.size()-1).substring(11)%>)</font>
<%} %>


<%-- <font color="#D81015"><%=usageOverheadP%>%</font>, 
<font color="#266493"><%=idleOverheadP%>%</font> --%>
<%-- <br><br>
<font style="font-size: 14px;">
ㆍ Number of Functions : </font>
<%=numberOfFunctionP%> --%>
</div>
</body>
</html>