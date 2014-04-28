<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" import="java.util.*"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="entity.CpuEntity" %>
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
	font: bold 12px/1.5em Verdana;
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
</style>
<title>Perf Data **</title>
<%
	String date = (String)request.getAttribute("created");
	String id = (String)request.getAttribute("id");
%>
<script type="text/javascript">
function newPagePopup(id) {
	var url = document.URL;
 	window.open(url, "_blank",
	"width=900,height=650,toolbar=no,location=no,resizable=yes,scrollbars=no,menubar=yes,status=no");
}
</script>
</head>
<body style="overflow: hidden;">

<div style="position: fixed; right: 20px; margin-top: 16px; font-size: 11px;">
<%if(id != null && !id.equals("null")){ %>
	<a href="./cpugetcsv?id=<%=id%>" title="download CSV" id="csv">CSV</a>
	&nbsp;<a href="./cpugetxml?id=<%=id%>" title="download XML" id="csv">XML</a>
<%}%>
</div>

<div style="height: 8px"></div>
<center>
<font style="font-family: 'Lucida Grande', 'Lucida Sans Unicode', Verdana, Arial, Helvetica, sans-serif; font-size: 16px;
color: #B22222; fill: #B22222; text-align: center; cursor: pointer;" title="Open new page">
<a onclick="javascrip:newPagePopup()">Perf Data <font style="font-size: 14px;">(<%=date%>)</font></a>
</font>
</center>
<div style="height: 8px"></div>

<div style="width: 100%; height: 100%;">
<iframe id="cpuTable2" src="cpuidpass?id=<%=id%>" style="visibility: visible;" width="100%" height="92%" frameborder="0">
</iframe>
</div>
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
</body>
</html>