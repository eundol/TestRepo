<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page language="java"
	import="java.util.*, java.sql.*, javax.servlet.http.*,entity.Chart"%>

<!DOCTYPE HTML>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>BarChart</title>

<script src="./js/gDrawBarChart.js" charset='euc-kr'></script>

<%
	ArrayList<Chart> barChartList = (ArrayList<Chart>)request.getAttribute("barChartList");

	Chart barChart = barChartList.get(0);
	
	int rowCount = barChart.getRowCount();
	String name1 = barChart.getName1();		// open
	String name2 = barChart.getName2();		// merge
	String name3 = barChart.getName3();		// abandon
	String dataOpen = barChart.getDataOpen();
	String dataMerge = barChart.getDataMerge();
	String dataAbandon = barChart.getDataAbandon();
	String xCategories = barChart.getXCategories();	// x-axis
%>
</head>
<!-- ****** end of head ****** -->

<body>

	<script>
		makeArr([<%=dataOpen%>], [<%=dataMerge%>], [<%=dataAbandon%>], [<%=xCategories%>]);
		initialize(<%=rowCount%>,'<%=name1%>','<%=name2%>','<%=name3%>');
		drawBarChart();
	</script>


	
	<!-- ****** 1st Chart : Push per Project ****** -->
	<div id="bar_chart"
		style="float: left; width: 850px; height: 300px; margin: 0 auto">
	</div>

</body>
</html>

