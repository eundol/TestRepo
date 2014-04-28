<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page language="java"
	import="java.util.*, java.sql.*, javax.servlet.http.*,entity.Chart"%>

<!DOCTYPE HTML>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>BarChart</title>

<script src="./js/gDrawAreaChart.js" charset='euc-kr'></script>

<%
	ArrayList<Chart> areaChartList = (ArrayList<Chart>)request.getAttribute("areaChartList");

	Chart areaChart = areaChartList.get(0);
	
	int rowCount = areaChart.getRowCount();
	String name1 = areaChart.getName1();		// open
	String name2 = areaChart.getName2();		// merge
	String name3 = areaChart.getName3();		// abandon
	String dataOpen = areaChart.getDataOpen();
	String dataMerge = areaChart.getDataMerge();
	String dataAbandon = areaChart.getDataAbandon();
	String xCategories = areaChart.getXCategories();	// x-axis
%>
</head>
<!-- ****** end of head ****** -->

<body>

	<script>
		makeArr([<%=dataOpen%>], [<%=dataMerge%>], [<%=dataAbandon%>], [<%=xCategories%>]);
		initialize(<%=rowCount%>,'<%=name1%>','<%=name2%>','<%=name3%>');
		drawAreaChart();
	</script>


	
	<!-- ****** 2nd Chart : Push Change ****** -->

	<div id="area_chart"
		style="float: left; width: 480px; height: 300px; border: 1; bodder-style: solid;"><
		/div>
</body>
</html>

