<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page language="java"
	import="java.util.*, java.sql.*, javax.servlet.http.*, entity.DatePrint"%>

<!DOCTYPE HTML>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Printing Date</title>

<script type="text/javascript"
	src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
<script src="http://code.highcharts.com/highcharts.js"></script>
<script src="http://code.highcharts.com/modules/exporting.js"></script>


<%
	ArrayList<DatePrint> datePrintList = (ArrayList<DatePrint>) request.getAttribute("datePrintList");

	DatePrint datePrint = datePrintList.get(0);
	String dateFrom = datePrint.getDateFrom();
	String dateTo = datePrint.getDateTo();
%>
</head>
<!-- ****** end of head ****** -->

<body>

	<div id="date" style="float: left;">
		<!-- float:right vs left -->
		<h6>
			<font color="#4D4D4D" face="맑은 고딕" size="2.8" ; style="float: left;">
				&nbsp;&nbsp;&nbsp;&nbsp;
				Date : <%=dateFrom%> ~ <%=dateTo%> (upload date)
				<!-- cf) style="float:right; margin-right: 170px; -->
			</font>
		</h6>
	</div>
	
</body>
<!-- ****** end of body ****** -->