<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ page import="java.util.*"%>
<%@ page import="entity.*"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<style type="text/css">
body {
	margin: 0;
	padding: 0;
	font: bold 12px/1.5em Verdana;
	height: 100%;
	overflow: hidden;
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
      font: 13px/1.5em Verdana;
    }
table th{
	  font: 12px/1.5em;
      background-color: #1AADCE;
      color: white;
      height: 21px
    }
a:VISITED {
	color:blue;
}
a:HOVER {
	color:purple;
}
a:FOCUS {
	color:purple;
}

#a{
	color:blue;
	text-decoration: underline;
	cursor: pointer;
}
#a:VISITED {
	color:blue;
}
#a:HOVER {
	color:purple;
}
#a:FOCUS {
	color:purple;
}
</style>
<title>BAT Result Edit :: LG Electronics</title>
<%
	SystemInfo info = (SystemInfo)request.getAttribute("SystemInfo");
%>
<script type="text/javascript">
function dataInsert(){
	if(document.getElementById("critical").value == "" || document.getElementById("major").value == "" || document.getElementById("minor").value == ""){
		alert("There is a blank");
		return;
	}
		document.getElementById("insert").submit();
}
function dataDelete(build){
	if(confirm('Do you really want to delete ' + build + '?')){
		build = build.replace("#","_heesung_");
		window.location.href = "bat_summary_edit_delete?build=" + build;
	}else{
	}
}
</script>
</head>
<body>
	<div style="margin-top: 4px"></div>
		<div style="background-color: #C40452; padding-top: 3px; padding-bottom: 3px;">
		<font style="font-family: 'Lucida Grande', 'Lucida Sans Unicode', Verdana, Arial, Helvetica, sans-serif; color:white; font-size:14px;">
		&nbsp;&nbsp;&nbsp;&nbsp;Edit **
		</font>
	</div>
	
	
	<form name="insert" id="insert" action="system_severity_edit_submit" method="post" target="result">
		<div style="width: 600px; margin: 0 auto 0 auto; margin-top: 14px; overflow-y:auto; height: 405px; overflow-x: hidden">
			<table style="width: 580px;">
				<tr>
					<th>critical</th>
					<th>major</th>
					<th>minor</th>
					<th></th>
				</tr>
				<tr style="background-color: #F4F4F4">
					<th style="background-color: #F4F4F4">
						<input type="text" name="critical" id="critical" style="width: 50%; border: 1px solid black; text-align: center;" value="<%=info.getCritical()%>">
					</th>
					<th style="background-color: #F4F4F4">
						<input type="text" name="major" id="major" style="width: 50%; border: 1px solid black; text-align: center;" value="<%=info.getMajor()%>">
					</th>
					<th style="background-color: #F4F4F4">
						<input type="text" name="minor" id="minor" style="width: 50%; border: 1px solid black; text-align: center;" value="<%=info.getMinor()%>">
					</th>
					<th style="background-color: #F4F4F4;">
						<a id="a" style="" onclick="window.open('','result','width=180px,height=150px,toolbar=no,location=no,resizable=no,scrollbars=no,menubar=no,status=no');void(0);dataInsert();">submit</a>
					</th>
				</tr>
			</table>
		</div>
	</form>
	<div style="margin-top : 25px; text-align: center;">
		<a href="javascript:window.close()">Close</a>
	</div>
	<script type="text/javascript">
		window.document.getElementById("critical").focus();
	</script>
<div style="height: 15px; color: white;">.</div>
</body>
</html>