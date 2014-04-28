<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" import="java.util.*"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>remove</title>
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
</head>
<body>
<center><br><br>
<form name="check" action="boardremovecheck" method="post">
<input type="hidden" name="id" value="${id}">
Password : <input type="password" id="pwd" name="pwd">
<input type="submit" value="submit">
</form> 
</center>
<script type="text/javascript">
window.document.getElementById("pwd").focus();
</script>
</body>
</html>