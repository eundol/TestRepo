<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" import="java.util.*"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="entity.*" %>
<%@ page import="java.text.DecimalFormat" %>
<%
	ArrayList<CpuEntity> cpuTable = (ArrayList<CpuEntity>)request.getAttribute("cpuTable");
	CpuEntity entity = null;
	double UsageOverhead = 0;
	double IdleOverhead = 0;
	for(int i = 0 ; i < cpuTable.size() ; i++){
		entity = cpuTable.get(i);
		String entityOverhead = entity.getOverhead();
		entityOverhead = entityOverhead.replace("%", "");
		double entityOverheadNum = Float.parseFloat(entityOverhead);
		if(entity.getCommand().equals("swapper")){
			IdleOverhead += entityOverheadNum;
		}else{
			UsageOverhead += entityOverheadNum;
		}
	}
	DecimalFormat df = new DecimalFormat("#.#");
	String IdleOverheadP = df.format(IdleOverhead);
	String UsageOverheadP = df.format(UsageOverhead);
	
	CpuSummaryEntity summaryEntity = (CpuSummaryEntity)request.getAttribute("cpuSummary");
	String fileNameP = summaryEntity.getFileName();
	if(fileNameP == null){
		fileNameP = "N/A";
	}
	String testCaseIdP = summaryEntity.getTestCaseId();
	if(testCaseIdP == null){
		testCaseIdP = "N/A";
	}
	String testDateP = summaryEntity.getTestDate();
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
	font: bold 14px Verdana, Arial, Helvetica, sans-serif;
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
color: #B22222; fill: #B22222; text-align: center; font-weight: bold" title="">
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
ㆍ File Name : </font>
<%if(fileNameP.equals("N/A")){%> 
<font color="#B22222" style="font-size: 13px; font-weight: normal;"><%=fileNameP%></font>
<%}else{ %>
<%=fileNameP%>
<%} %>
<br><br>
<font style="font-size: 14px;">
ㆍ Test Case Id : </font>
<%if(testCaseIdP.equals("N/A")){%> 
<font color="#B22222" style="font-size: 13px; font-weight: normal;"><%=testCaseIdP%></font>
<%}else{ %>
<%=testCaseIdP%>
<%} %>
<br><br>
<font style="font-size: 14px;">
ㆍ CPU Usage, Idle : </font>
<font color="#D81015"><%=UsageOverheadP%>%</font>, 
<font color="#266493"><%=IdleOverheadP%>%</font>
<br><br>
<font style="font-size: 14px;">
ㆍ Function Count : </font>
<%=cpuTable.size()%>
</div>
</body>
</html>