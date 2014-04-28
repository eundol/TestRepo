<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" import="java.util.*"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="entity.*" %>
<%@ page import="java.text.DecimalFormat" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=8; charset=UTF-8">
<script language=javascript> 
function hidePreload() { 
  preload.style.visibility = "hidden"; 
} 
var msg = "Loading...";
/* function makePreload(msg) {  */
  document.write("<div id=\"preload\" style=\"", 
    "position:absolute;top:0;left:0;width:100%;height:100%;margin-top:0px;",
    "background-color:white;color:black;", 
    "\">", 
    "<br><br><br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;", 
    msg, 
    "</div>");
  document.write("<table style=\"width: 100%; table-layout: fixed; position: fixed; top: 0px;\"><thead>"+
	"<tr>"+
		"<th style=\"width: 3%\">"+
		"</th>"+
		"<th style=\"width: 9%\">"+
			"Overhead "+
		"</th>"+
		"<th style=\"width: 12%\">"+
			"Process"+
		"</th>"+
		"<th style=\"width: 5%\">"+
			"Count  "+
		"</th>"+
		"<th style=\"width: 5%\">"+
			"Pid  "+
		"</th>"+
		"<th style=\"width: 5%\">"+
			"CPU  "+
		"</th>"+
		"<th style=\"width: 12%\">"+
			"Shared Object"+
		"</th>"+
		"<th style=\"width: 15%\">"+
			"Src Line"+
		"</th>"+
		"<th style=\"width: 34%\">"+
			"Symbol (Function)"+
		"</th>"+
	"</tr>"+
"</thead>"+
"</table>");
/* }  */
/* makePreload("Loading...");  */
self.onload=hidePreload;
</script>
<style type="text/css">
body {
	margin: 0;
	padding: 0;
	font: bold 12px/1.5em Verdana;
}
h2 {
	font: bold 14px Verdana, Arial, Helvetica, sans-serif;
	color: #000;
	margin: 0px;
	padding: 0px 0px 0px 15px;
}
table {
      border: 1px;
      border-color: white;
    }
table td{
      font: 12px/1.5em Verdana;
    }
table th{
	  font: 11px/1.5em;
      background-color: #266493;
      color: white;
      height: 20px;
    }
table tr.basic{
	  background-color: #F4F4F4; 
	  cursor: pointer;
}
table tr.basic:hover{
	  background-color: #FCE6E0; 
	  cursor: pointer;
}
table tr.select{
	  cursor: pointer;
      background-color: #FCE6E0;
}
a#sortButton {
	 color: white;
	 font-style: normal;
	 text-decoration: none;
	 }
a#sortButton:hover{
	  color: #DDDDDD; 
	}
</style>
<title>Perf Data **</title>
<%
	String date = (String)request.getAttribute("created");
	String id = (String)request.getAttribute("id");
/* 	String commandSelected = (String)request.getAttribute("command");
	String pidSelected = (String)request.getAttribute("pid");
	String cpuSelected = (String)request.getAttribute("cpu");
	String symbolSelected = (String)request.getAttribute("symbol"); */
%>
</head>
<script src="js/cputable.js" charset="euc-kr"></script>
<script type="text/javascript">
function aaa(){
window.parent.document.getElementById("cpuFrameset").setAttribute("cols","*");
window.parent.document.getElementById("frame1").setAttribute("frameborder","0");
window.parent.document.getElementById("frame2").setAttribute("frameborder","0");
window.parent.document.getElementById("frame2").style.visibility = "hidden";}
</script>
<body>
<%-- <div style="height: 8px"></div>
<center>
<font style="font-family: 'Lucida Grande', 'Lucida Sans Unicode', Verdana, Arial, Helvetica, sans-serif; font-size: 16px;
color: #B22222; fill: #B22222; text-align: center; cursor: pointer;" title="Open new page">
<a onclick="javascrip:newPagePopup()">Perf Data <font style="font-size: 14px;">(<%=date%>)</font></a>
</font>
</center>
<div style="height: 8px"></div> --%>

<!-- PerfDataTable Start -->
<div style="width:100%; height: 2px; background-color: white; position: fixed; top: 0px;"></div>
<div style="width: 100%; height: 100%">
<table style="width: 100%; height: 100%; table-layout: fixed; overflow: hidden;">
	<thead>
		<tr>
			<th style="width: 3%">
			</th>
			<th style="width: 9%">
				Overhead
			</th>
			<th style="width: 12%">
				Process
			</th>
			<th style="width: 5%">
				Count
			</th>
			<th style="width: 5%">
				Pid
			</th>
			<th style="width: 5%">
				CPU
			</th>
			<th style="width: 12%">
				Shared Object
			</th>
			<th style="width: 15%">
				Src Line
			</th>
			<th style="width: 34%">
				Symbol (Function)
			</th>
		</tr>
	</thead>
	<tbody>
	 <c:if test="${!empty cpuTable}">
	 <c:forEach items="${cpuTable}" var="entity" varStatus="status">
 		<form action="cpufilteredtableview" method="post" id="detailForm${status.count}" target="cpuTable2" style="">
			<input type="hidden" name="commandSelected" value="${entity.command}">
			<input type="hidden" name="id" value="<%=id%>">
		</form>
		<tr class="basic"
			onclick="javascript:detailPageView('${status.count}');
					 javascript:rowColorChange('${status.count}')"
			id="row${status.count}"		 
			title="Sub information">
			<td style="text-align: center;">
				${status.count}
			</td>
			<td style="text-align: center;" title="Sub information">
				${entity.overhead}
			</td>
			<td style="text-align: left;" title="${entity.command}">
				&nbsp;&nbsp;${entity.command}
			</td>
			<td style="text-align: center;" title="Sub information">
				${entity.counts}
			</td>
			<td style="text-align: center;" title="Sub information">
				-
			</td>
			<td style="text-align: center;" title="Sub information">
				-
			</td>
			<td style="text-align: center;" title="Sub information">
				-
			</td>
			<td style="text-align: center;" title="Sub information">
				-
			</td>
			<td style="text-align: center;" title="Sub information">
				-
			</td>
		</tr>
	</c:forEach>
	</c:if>
	</tbody>
</table>
<!-- <table style="width: 100%; table-layout: fixed; position: fixed; top: 0px;">
	<thead>
		<tr>
			<th style="width: 3%">
			</th>
			<th style="width: 9%">
				Overhead 
			</th>
			<th style="width: 12%">
				Process
			</th>
			<th style="width: 5%">
				Pid  
			</th>
			<th style="width: 5%">
				Cpu  
			</th>
			<th style="width: 13%">
				Shared Object
			</th>
			<th style="width: 16%">
				Src Line
			</th>
			<th style="width: 37%">
				Symbol (Function)
			</th>
		</tr>
	</thead>
</table> -->
<div style="height: 20px;">
</div>

<c:if test="${empty cpuTable}">
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;No data were found to match filter.
</c:if>

<%
	CpuSummaryEntity summaryEntity = (CpuSummaryEntity)request.getAttribute("summaryEntity");
	
	if(summaryEntity == null || summaryEntity.getTotalOverhead() == null || summaryEntity.getTotalOverhead().equals("")){

	ArrayList<CpuEntity> cpuTable = (ArrayList<CpuEntity>)request.getAttribute("cpuTable");
	CpuEntity entity = null;
	double totalOverhead = 0;
	/* double totalOverheadUsage = 0;
	double totalOverheadIdle = 0; */
/* 	double cpu0 = 0;
	double cpu0Usage = 0;
	double cpu0Idle = 0;
	double cpu1 = 0;
	double cpu1Usage = 0;
	double cpu1Idle = 0; */
	
	for(int i = 0 ; i < cpuTable.size() ; i++){
		entity = cpuTable.get(i);
		String entityOverhead = entity.getOverhead();
		entityOverhead = entityOverhead.replace("%", "");
		double entityOverheadNum = Float.parseFloat(entityOverhead);
		
		totalOverhead += entityOverheadNum;
		
/* 		if(entity.getCommand().equals("swapper")){
			totalOverheadIdle += entityOverheadNum;			
		}else{
			totalOverheadUsage += entityOverheadNum;	
		} */
		
		/* if(entity.getCpu().equals("0")){
			cpu0 += entityOverheadNum;
			if(entity.getCommand().equals("swapper")){
				cpu0Idle += entityOverheadNum;
			}else{
				cpu0Usage += entityOverheadNum;
			}
		}
		
		if(entity.getCpu().equals("1")){
			cpu1 += entityOverheadNum;
			if(entity.getCommand().equals("swapper")){
				cpu1Idle += entityOverheadNum;
			}else{
				cpu1Usage += entityOverheadNum;
			} 
		}*/
	}
	
	DecimalFormat df = new DecimalFormat("#.#");
	
	String totalOverheadP = df.format(totalOverhead);
/* 	String totalOverheadUsageP = df.format(totalOverheadUsage);
	String totalOverheadIdleP = df.format(totalOverheadIdle); */
	
/* 	String cpu0P = df.format(cpu0);
	String cpu0UsageP = df.format((100 * cpu0Usage) / cpu0); 
	String cpu0IdleP = df.format((100 * cpu0Idle) / cpu0);
	
	String cpu1P = df.format(cpu1);
	String cpu1UsageP = df.format((100 * cpu1Usage) / cpu1); 
	String cpu1IdleP = df.format((100 * cpu1Idle) / cpu1); */
%>

<div style="position: fixed; bottom: 0px; background-color: #8E8E8E; width: 100%; color: white; text-align: center;">
ㆍNumber of Process : <%=cpuTable.size()%>&nbsp;&nbsp;
ㆍTotal Overhead : <%=totalOverheadP%>%<%-- (<%=totalOverheadUsageP%>%/<%=totalOverheadIdleP%>%) --%>
</div>
<%}else{
	
	String totalOverheadP = summaryEntity.getTotalOverhead();
	if(totalOverheadP == null){
		totalOverheadP = "N/A";
	}
	String usageOverheadP = summaryEntity.getUsageOverhead();
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
	}
%>

<div style="position: fixed; bottom: 0px; background-color: #8E8E8E; width: 100%; color: white; text-align: center;">
ㆍNumber of Process : <%=numberOfFunctionP%>&nbsp;&nbsp;
ㆍTotal Overhead : <%=totalOverheadP%>%<%-- (<%=usageOverheadP%>%/<%=idleOverheadP%>%) --%>
</div>
<%} %>
<!-- &nbsp;&nbsp; -->
<%-- ㆍCPU-0 : <%=cpu0P%>%(<%=cpu0UsageP%>%/<%=cpu0IdleP%>%)&nbsp;&nbsp;
ㆍCPU-1 : <%=cpu1P%>%(<%=cpu1UsageP%>%/<%=cpu1IdleP%>%) --%>
</div>
<!-- PerfDataTable End -->
</body>
</html>