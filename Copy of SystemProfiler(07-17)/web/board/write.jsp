<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>write</title>
<style type="text/css">
body {
	margin: 0;
	padding: 0;
	font: bold 12px/1.5em Verdana;
	height: 100%;
	background-color: #F4F4F4
}
h2 {
	font: bold 14px Verdana, Arial, Helvetica, sans-serif;
	color: #000;
	margin: 0px;
	padding: 0px 0px 0px 15px;
}
</style>
<script type="text/javascript">
function write1(){
	var content = document.getElementById("origin").value;
	document.getElementById("content").value = content;
	if(content == "" || document.getElementById("writer").value == "" || document.getElementById("pwd").value == ""){
		alert("There is a blank");
		return;
	}
		document.getElementById("write").submit();
}
</script>
</head>
<body>
<br>
<div>
<form name="write" id="write" action="../boardwrite" method="post">
	&nbsp;&nbsp;&nbsp;&nbsp;Writer : 
		<input type="text" name="writer" id="writer" style="width: 100px; height: 16px;">
	&nbsp;&nbsp;Password : 
		<input type="password" name="pwd" id="pwd" style="width: 100px; height: 16px;">
	<br><br>
	&nbsp;&nbsp;&nbsp;&nbsp;Comment
	<br>
	&nbsp;&nbsp;&nbsp;&nbsp;<textarea rows="9" cols="78" style="margin-top: 5px" id="origin"></textarea><br><br>
		<input type="hidden" name="content" id="content">
		<input type="button" value="Submit" style="cursor: pointer; margin-left: 275px" title="Submit"  onclick="javascript:write1()">
</form>
</div>
<script type="text/javascript">
window.document.getElementById("writer").focus();
</script>
</body>
</body>
</html>