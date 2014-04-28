<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" import="java.util.*"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="entity.*" %>
<%@ page import="java.text.DecimalFormat" %>
<%  if(request.getAttribute("CpuSearchResult") != null ){session.setAttribute("CpuSearchResult", (ArrayList<CpuSearchEntity>)request.getAttribute("CpuSearchResult"));}%>
<% String section = (String)request.getAttribute("section"); %>
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
</style>
<title>Profile Viewer</title>
</head>
<body>
<c:if test="${empty CpuSearchResult}">
	<div align="center" style="margin-top: 50px; text-align: center;">
		<img src="./img//database-remove-icon.png" width="35px" height="35px"> <br>There is no inquired data.
	</div>
	<!-- close 버튼 -->
	<div style="margin-top : 25px; text-align: center;">
		<a href="javascript:window.close()">Close</a>
	</div>
</c:if>


<c:if test="${!empty CpuSearchResult}">
<div style="margin-top: 4px"></div>
	<div style="background-color: #C40452; padding-top: 3px; padding-bottom: 3px;">
	<font style="font-family: 'Lucida Grande', 'Lucida Sans Unicode', Verdana, Arial, Helvetica, sans-serif; color:white; font-size:14px;">
	&nbsp;&nbsp;&nbsp;&nbsp;Search Result **
	</font>
</div>

<script type="text/javascript">
	function getSection(id) {
		var domain = document.domain;
		opener.location.href= "http://" + domain + ":8080/report/getsection?id=" + id + "&section=" + '<%=section%>';
		window.close();
	}
</script>
<div style="width: 96%; margin: 0 auto 0 auto; margin-top: 14px; overflow-y:auto; height: 400px; overflow-x:hidden;">
	<table style="width: 100%">
		<tr>
			<th style="width: 10%">
				Serial No.
			</th>
			<th style="width: 32%">
				User ID
			</th>
			<th style="width: 38%">
				Test Case ID
			</th>
			<th style="width: 20%">
				Created
			</th>
	<!-- 		<th>
				CPU
			</th> -->
			<!-- <th>
				Memory
			</th>
			<th>
				I/O
			</th> -->
		</tr>
	
		<c:forEach items="${CpuSearchResult}" var="entity" varStatus="status">
		
		<tr style="background-color: #F4F4F4;cursor: pointer;" 
			onmouseover="this.style.backgroundColor='#FCE6E0'"
			onmouseout="this.style.backgroundColor='#F4F4F4'"
			onclick="javascript:getSection(${entity.id})"
			>
			<td style="text-align: center;">
	 			${entity.id}
			</td>
			<td >
				&nbsp;&nbsp;${entity.userId}
			</td>
			<td >
	 			&nbsp;&nbsp;${entity.testCaseId}
			</td>
			<td style="text-align: center;">
				${entity.created}	
			</td>
	<%-- 		<td
				title="Inquiry"
				style="width: 11%; cursor: pointer;">
				<center>
				<img src="./img//database-search-icon.png" width="17px" height="17px">
				</center>
			</td> --%>
	<!-- 		<td	style="width: 11%;">
			</td>
			<td	style="width: 11%;">
			</td> -->
		</tr>
		</c:forEach>
	</table>
<div style="height: 2px; background-color: #1AADCE;"></div>
</div>

	<div style="margin-top : 25px; text-align: center;">
		<a href="searchresultdelete.jsp">Delete</a>&nbsp;&nbsp;&nbsp;
		<a href="javascript:window.close()">Close</a>
	</div>
</c:if>

<div style="height: 15px; color: white;">
.
</div>
</body>
</html>