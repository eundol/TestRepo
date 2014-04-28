<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" import="java.util.*"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="java.util.*"%>
<%@ page import="entity.*"%>
<%@ page import="java.text.DecimalFormat" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="text/html; charset=UTF-8">
<style type="text/css">
html,body
{
  height: 100%;
  padding: 0px;
  margin: 0px;
}
body {
	margin: 0;
	padding: 0;
	font: bolder 12px/1.5em Verdana;
	min-height: 100%;
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
#csv{
	color: #0000FF;
}
#csv:visited{
	color: #0000FF;
}
#csv:hover{
	color: #492970;
}
.filterButton{
	color: #0000FF;
	font-weight: bolder;
}
.filterButton:visited{
	color: #0000FF;
	font-weight: bolder;
}
.filterButton:hover{
	color: #492970;
	font-weight: bolder;
}
/* .filter{
	color: #0000FF;
	text-decoration: underline;
	cursor: pointer;
}
.filter:visited{
	color: #0000FF;
	text-decoration: underline;
	cursor: pointer;
}
.filter:hover{
	color: #492970;
	text-decoration: underline;
	cursor: pointer;
}
.filterOpend{
	color: purple;
	text-decoration: underline;
	cursor: pointer;
}
.filterOpend:visited{
	color: #B22222;
	text-decoration: underline;
	cursor: pointer;
}
.filterOpend:hover{
	color: #D91015;
	text-decoration: underline;
	cursor: pointer;
} */
</style>
<title>Perf Data **</title>
<%
	String date = (String)request.getAttribute("created");
	if(date == null || date.equals("") || date.equals("null")){
		date = "N/A";
	}
	String id = (String)request.getAttribute("id");
	ArrayList<String> commandArray = (ArrayList<String>)request.getAttribute("commandArray");
    ArrayList<String> pidArray = (ArrayList<String>)request.getAttribute("pidArray");
    ArrayList<String> cpuArray = (ArrayList<String>)request.getAttribute("cpuArray");
    ArrayList<String> symbolArray = (ArrayList<String>)request.getAttribute("symbolArray");
    
    String cpuTableAll = "/cpufilteredtableview?id=" + id + "&cpuSelected=0;1;2;3;4;5;6;7;";
    String cpuGroupBy = "/cputablegroupby?id=" + id;
%>
<script type="text/javascript">
function newPagePopup(id) {
	var url = document.URL;
 	window.open(url, "_blank",
	"width=900,height=650,toolbar=no,location=no,resizable=yes,scrollbars=no,menubar=yes,status=no");
}
</script>
<script src="js/main.js" charset="euc-kr"></script>
<!-- Filter JS Start -->
	<script type="text/javascript" src='./js/jquery-1.4.4.min.js'></script>
	<!-- custom select plugin js -->
	<script type="text/javascript" src='./js/cust_select_plugin.js'></script>
	<link rel="stylesheet" type="text/css" href="./css/style.css">
	<!--[if lt IE 8]>
		<link rel="stylesheet" type="text/css" href="./css/ie_style.css" >
	<![endif]-->
<!-- Filter JS End -->
<script src="js/cputable.js" charset="euc-kr"></script>	
</head>

<script>
	$(document).ready( function() {
		$("select").custSelectBox();
	});
</script>

<body style="overflow: hidden;">

<!-- (Filter), CSV, XML Button Start -->
<%if(id != null && !id.equals("null")){ %>
<div style="position: fixed; right: 20px; margin-top: 63px; font-size: 11px;">
	<a href="./cpugetcsv?id=<%=id%>" title="download CSV" id="csv">CSV</a>
	&nbsp;<a href="./cpugetxml?id=<%=id%>" title="download XML" id="csv">XML</a>
</div>
<!-- <div style="position: fixed; left: 20px; margin-top: 16px; font-size: 12px;">
<a title="Filter" id="filter" class="filter" onclick="javascript:foldingfilter();">Filter</a>
</div> -->
<!-- (Filter), CSV, XML Button End -->

<!-- New Filter Button Start -->
<div style="position: fixed; left: 521px; margin-top: 63px; font-size: 11px;">
	<a href="cpuidpass?id=<%=id%>" target="cpuTable2" title="Basic" class="filterButton" id="reset" onclick="changeTextColor('reset');filterReset();" style="color:#E10064;">Basic</a>
	&nbsp;
	<a href=".<%=cpuTableAll%>" target="cpuTable2" title="Show All" class="filterButton" id="showall" onclick="changeTextColor('showall');filterReset();">Show All</a>
	&nbsp;
	<a href=".<%=cpuGroupBy%>" target="cpuTable2" title="Group by Process" class="filterButton" id="group" onclick="changeTextColor('group');filterReset();">Group by Process</a>
</div>
<!-- New Filter Button End -->
<%}%>

<div style="height: 12px"></div>

<!-- Title Start -->
<center>
<font style="font-family: 'Lucida Grande', 'Lucida Sans Unicode', Verdana, Arial, Helvetica, sans-serif; font-size: 16px;
color: #B22222; fill: #B22222; text-align: center; cursor: pointer;" title="Open new page">
<a onclick="javascrip:newPagePopup()">Perf Data <font style="font-size: 12px;">
(Serial No. <%if(id.equals("null")){%>N/A<%}else{%><%=id%><%}%>)&nbsp;</font></a>
</font>
<div style="margin-top:1px;height:18px;width:100%; text-align:center; font-family: 'Lucida Grande', 'Lucida Sans Unicode', Verdana, Arial, Helvetica, sans-serif;font-size: 12px;color: #666666;font: bold 12px 'Trebuchet MS', Verdana, sans-serif;">
perf record -a -g / perf report -s pid,cpu,parent,dso,srcline,symbol
</div>
</center>
<!-- Title End -->

<div style="height: 0px"></div>

<!-- space -->
<%if(id != null && !id.equals("null")){ %>
<div id="filterSpace" style="height: 37px;"></div>
<%}else{%>
<div id="filterSpace" style="height: 0px;"></div>
<%}%>
<!-- space -->

<div style="width: 97%; height: 0px; background-color: white; padding-left: 3%" id="redLine0"></div>
<div style="width: 97%; height: 1px; background-color: #24618E; padding-left: 3%" id="blueLine"></div>
<div style="width: 97%; height: 2px; background-color: white; padding-left: 3%" id="redLine0"></div>

<!-- Table Frame Start -->
<div style="width: 100%; height: 500px;" id="TableContainer">
<iframe id="cpuTable2" name="cpuTable2" src="cpuidpass?id=<%=id%>" style="visibility: visible;" width="100%" height="92%" frameborder="0">
</iframe>
</div>
<!-- Table Frame End -->

<div id="expandTable" style="cursor: pointer; padding-right:20px; text-align: right;"><a class="filter" onclick="javascript:expandTable()">Expand Table</a></div>

<%-- <!-- PerfDataTable Start -->
<div id="PerfDataTable" style="height: 100%">
<iframe id="PerfDataTableFrame" src="cputableframeview?id=<%=id%>" style="visibility: visible;" width="100%" height="90%" frameborder="0">
</iframe>
</div>
<!-- PerfDataTable End -->
<!-- SubPerfDataTable Start -->
<div id="SubPerfDataTable" style="width: 0px; height:0px">
<iframe id="SubPerfDataTableFrame" style="visibility: hidden;" width="100%" height="90%" frameborder="0">
</iframe>
</div>
<!-- SubPerfDataTable End --> --%>

<%if(id != null && !id.equals("null")){ %>
<!-- Filter Start -->
<div id="filterContainer" style="visibility: visible; position: fixed; top: 52px;">
		<div style="margin-left: 16px">
		<form id="filterForm" action="./cpufilteredtableview" method="post" target="cpuTable2">
		<input type="hidden" name="id" value="<%=id%>"/>
		<input type="hidden" name="commandSelected" id="commandSelected" value=""/>
		<input type="hidden" name="pidSelected" id="pidSelected" value=""/>
		<input type="hidden" name="cpuSelected" id="cpuSelected" value=""/>
		<!-- <input type="hidden" name="symbolSelected" id="symbolSelected" value=""/> -->
		</form>
		<table style="vertical-align: top; background-color: transparent; border-color:transparent; table-layout: fixed;">
			<tr>
				<td valign="top" style="text-align: left;">
					<div id="commandWrap" class="select_wrap" style="padding-left: 0px; border: 0px">
						<select class="select_field" multiple="multiple">
							<option>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							&nbsp;&nbsp;
							Process
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							&nbsp;
							</option>
							<%for(int i = 0, size = commandArray.size() ; i < size ; i++){%>
							<option value="<%=commandArray.get(i)%>">&nbsp;<%=commandArray.get(i)%></option>
							<%}%>
						</select>
					</div>
				</td>
				<td valign="top" style="text-align: center;">
					<div id="pidWrap" class="select_wrap" style="padding-left: 5px;">
						<select class="select_field" multiple="multiple">
							<option>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							Pid
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							</option>
							<%for(int i = 0, size = pidArray.size() ; i < size ; i++){%>
							<option value="<%=pidArray.get(i)%>"><%=pidArray.get(i)%></option>
							<%}%>
						</select>
					</div>
				</td>
				<td valign="top" style="text-align: center;">
					<div id="cpuWrap" class="select_wrap" style="padding-left: 5px;">
						<select class="select_field" multiple="multiple">
							<option>
							&nbsp;&nbsp;
							CPU
							&nbsp;&nbsp;
							</option>
							<%for(int i = 0, size = cpuArray.size() ; i < size ; i++){%>
							<option value="<%=cpuArray.get(i)%>"><%=cpuArray.get(i)%></option>
							<%}%>
						</select>
					</div>
				</td>
<%-- 				<td valign="top" style="text-align: left;">
					<div id="symbolWrap" class="select_wrap" style="padding-left: 5px;">
						<select name="symbolSelected"  class="select_field" multiple="multiple">
							<option>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							Symbol
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							</option>
							<%for(int i = 0, size = symbolArray.size() ; i < size ; i++){%>
							<option value="<%=symbolArray.get(i)%>">&nbsp;<%=symbolArray.get(i)%></option>
							<%}%>
						</select>
					</div>
				</td> --%>
				<td valign="top">
					<div style="padding-top: 3px; padding-left: 5px;" title="Search"><input id="searchButton" type="button" value="Search" style="cursor: pointer;" onclick="javascript:submitButton();changeTextColor('searchButton')"></div>
				</td>
			</tr>
		</table>
		</div>
	<div style="height: 3px;"></div>
</div>
<!-- Filter End -->
<script type="text/javascript">
document.getElementById("TableContainer").style.height = "459px";
</script>
<%} %>
</body>
</html>