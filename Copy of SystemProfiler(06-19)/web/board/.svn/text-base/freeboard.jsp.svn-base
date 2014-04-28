<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" import="java.util.*"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript" src="./js/popup.js"></script>
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
<title>Board</title>
</head>
<body>
<div id="freeboard" style="margin-left: 8%; margin-right: 8%">
<script type="text/javascript">
	function writePopup() {
	window.open("board/write.jsp", "write",
	"width=650,height=300,toolbar=no,location=no,resizable=yes,scrollbars=yes,menubar=no,status=no");
}
</script>
	<div style="height: 29px;">
	<img onclick="javascript:writePopup()"  
		 align="right" src="./img/write-pencil-icon.png" style="width: 29px; height: 29px; cursor: pointer;" title="write">
	</div>
	<div>
		<table>
			<tr style="border-bottom: 1px; border-bottom-color: #78D6FE">
				<th>
					Comments
				</th>
				<th>
					Name
				</th>
				<th>
					Created
				</th>
				<th>
					
				</th>
			</tr>
		<c:forEach items="${board}" var="entity" varStatus="status">
			<tr id="comment" style="background-color: #F4F4F4;" 
				onmouseover="this.style.backgroundColor='#FCE6E0'"
				onmouseout="this.style.backgroundColor='#F4F4F4'">
				<td>
					&nbsp;&nbsp;${entity.content}
				</td>
				<td width="130px" style="text-align: center;">
					${entity.name}
					<c:if test = "${entity.name=='은희성'}">
						<img src="./img/crown-bronze-icon.png" style="width: 12px; height: 11px; elevation:lower;">
					</c:if>
				</td>
				<td width="130px" style="text-align: center;">
					${entity.created}
				</td>
				<td width="25px">
					<center><img 
					onclick="javascript:removePopup(${entity.id})"
					title="remove" src="./img/Status-dialog-error-icon.png" style="width: 16px; height: 16px; cursor: pointer;" align="middle"></center>
				</td>
			</tr>
		</c:forEach>
		</table>
	</div>
</div>
</body>
</html>