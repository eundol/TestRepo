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
<%	ArrayList<BatInfo> listOrigin = (ArrayList<BatInfo>)request.getAttribute("BatInfo");
	ArrayList<BatInfo> list = new ArrayList<BatInfo>();	
	for(int i = listOrigin.size()-1; i >= 0; i--){
		list.add(listOrigin.get(i));
	}
	if(request.getAttribute("BatInfo") != null ){session.setAttribute("list", list);}%>
<script type="text/javascript">
function dataInsert(){
	if(document.getElementById("build").value == "" || document.getElementById("date").value == "" || document.getElementById("pass").value == "" || document.getElementById("total").value == "" || document.getElementById("pass_rate").value == ""){
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
<c:if test="${empty list}">
	<div align="center" style="margin-top: 50px; text-align: center;">
		<img src="./img//database-remove-icon.png" width="35px" height="35px"> <br>There is no inquired data.
	</div>
	<!-- close 버튼 -->
	<div style="margin-top : 25px; text-align: center;">
		<a href="javascript:window.close()">Close</a>
	</div>
</c:if>


<c:if test="${!empty list}">
	<div style="margin-top: 4px"></div>
		<div style="background-color: #C40452; padding-top: 3px; padding-bottom: 3px;">
		<font style="font-family: 'Lucida Grande', 'Lucida Sans Unicode', Verdana, Arial, Helvetica, sans-serif; color:white; font-size:14px;">
		&nbsp;&nbsp;&nbsp;&nbsp;Edit **
		</font>
	</div>
	
	
	<form name="insert" id="insert" action="bat_summary_edit_insert" method="post" target="result">
		<div style="width: 800px; margin: 0 auto 0 auto; margin-top: 14px; overflow-y:auto; height: 405px; overflow-x: hidden">
			<table style="width: 780px;">
				<tr>
					<th>build</th>
					<th>date</th>
					<th>result</th>
					<th>pass</th>
					<th>total</th>
					<th>pass_rate</th>
					<th></th>
				</tr>
				<tr style="background-color: #F4F4F4">
					<th style="background-color: #F4F4F4">
						<input type="text" name="build" id="build" style="width: 88%; border: 1px solid black;">
					</th>
					<th style="background-color: #F4F4F4">
						<input type="text" name="date" id="date" style="width: 82%; border: 1px solid black; text-align: center;">
					</th>
					<th style="background-color: #F4F4F4">
						<select name="result" id="result" style="width: 88%; border: 1px solid black;">>
							<option value="Accepted" style="background-color:#FFFFA9;">Accepted</option>
							<option value="Rejected" style="background-color:#FFD0D0;">Rejected</option>
						</select>
					</th>
					<th style="background-color: #F4F4F4">
						<input type="text" name="pass" id="pass" style="width: 80%; border: 1px solid black; text-align: center;">
					</th>
					<th style="background-color: #F4F4F4">
						<input type="text" name="total" id="total" style="width: 80%; border: 1px solid black; text-align: center;">
					</th>
					<th style="background-color: #F4F4F4; color: black;">
						<input type="text" name="pass_rate" id="pass_rate" style="width: 40%; border: 1px solid black; text-align: right;"> %
					</th>
					<th style="background-color: #F4F4F4;">
						<a id="a" style="" onclick="window.open('','result','width=180px,height=150px,toolbar=no,location=no,resizable=no,scrollbars=no,menubar=no,status=no');void(0);dataInsert();">Insert</a>
					</th>
				</tr>
				<c:forEach items="${list}" var="entity" varStatus="status">
					<tr style="background-color: #F4F4F4;cursor: pointer;" onmouseover="this.style.backgroundColor='#FCE6E0'" onmouseout="this.style.backgroundColor='#F4F4F4'">
						<td >
				 			&nbsp;&nbsp;${entity.build}
						</td>
						<td style="text-align: center;">
							&nbsp;&nbsp;${entity.date}
						</td>
						<td style="text-align: center;">
				 			&nbsp;&nbsp;${entity.result}
						</td>
						<td style="text-align: center;">
							${entity.pass}	
						</td>
						<td style="text-align: center;">
							${entity.total}	
						</td>
						<td style="text-align: center;">
							${entity.passRate}%	
						</td>
						<td style="text-align: center;">
							<a id="a" style="font-size: 12px;" onClick="javascript:dataDelete('${entity.build}');">Delete</a>	
						</td>
					</tr>
				</c:forEach>
			</table>
		<div style="height: 2px; background-color: #1AADCE;"></div>
		</div>
	</form>
	<div style="margin-top : 25px; text-align: center;">
		<a href="javascript:window.close()">Close</a>
	</div>
	<script type="text/javascript">
		window.document.getElementById("build").focus();
	</script>
</c:if>
<div style="height: 15px; color: white;">.</div>
</body>
</html>