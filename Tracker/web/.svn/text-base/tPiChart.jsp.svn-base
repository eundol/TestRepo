<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page language="java"
	import="java.util.*, java.sql.*, javax.servlet.http.*, entity.PiChart"%>

<!DOCTYPE HTML>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>PiChart</title>

<script type="text/javascript"
	src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
<script src="http://code.highcharts.com/highcharts.js"></script>
<script src="http://code.highcharts.com/modules/exporting.js"></script>

<script src="./js/drawChart.js" charset='euc-kr'></script>

<%
	ArrayList<PiChart> piChartList = (ArrayList<PiChart>)request.getAttribute("piChartList");

	PiChart piChart = piChartList.get(0);
	int rowCount = piChart.getRowCount();
	int rsGetInt1 = piChart.getRsGetInt1();
	int rsGetInt2 = piChart.getRsGetInt2();
	String columnName1 = piChart.getColumnName1();
	String columnName2 = piChart.getColumnName2();
	
	System.out.println("check : "+columnName1);

%>
</head>
<!-- ****** end of head ****** -->

<body>

	<script>
		initialize(<%=rowCount%>,<%=rsGetInt1%>,<%=rsGetInt2%>,'<%=columnName1%>','<%=columnName2%>');
		drawChart();
	</script>

	<div id="piChart"
		style="float:left; margin-left: 4px; width: 350px; height: 350px;"></div>

</body>
</html>

