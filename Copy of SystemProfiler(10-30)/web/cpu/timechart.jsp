<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
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
}
h2 {
	font: bold 14px Verdana, Arial, Helvetica, sans-serif;
	color: #000;
	margin: 0px;
	padding: 0px 0px 0px 15px;
}
</style>
<title>Insert title here</title>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
<script src="../js/highcharts.js"></script>
<script src="../js/highcharts-more.js"></script>
<script src="../js/modules/exporting.js"></script>
</head>
<body>
	<div style="margin-top : 1px; width: 60%; height: 340px; float: left;">
		<jsp:include page="./allchart.jsp"></jsp:include>
	</div>
	<div style="margin-top: 1px; width: 40%; height: 340px; float: right;" >
		<jsp:include page="./durationchart.jsp"></jsp:include>
	</div>
	<div style="margin-top : 8px; width: 100%; height: 390px; float: left;">
		<jsp:include page="./masterchart.jsp"></jsp:include>
	</div>
</body>
</html>