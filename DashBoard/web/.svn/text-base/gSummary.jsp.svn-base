<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page language="java"
	import="java.util.*, java.sql.*, javax.servlet.http.*"%>


<!DOCTYPE HTML>
<html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Summary - Gerrit</title>

<link rel="stylesheet" type="text/css" href="./css/bootstrap.css" />
<!-- cf) media="print" -->

<script type="text/javascript"
	src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
<script src="./js/bootstrap.js"></script>
<script src="./js/main.js"></script>
<script src="http://code.highcharts.com/highcharts.js"></script>
<script src="http://code.highcharts.com/modules/exporting.js"></script>

</head>
<!-- ****** end of head ****** -->

<body>
	<!-- ****** Fixed ToolBar ****** -->
	<div class="navbar navbar-inverse navbar-fixed-top">
		<div class="navbar-inner">
			<div class="container">

				<!--  bootstrap.css ~ class : brand -->
				<a class="brand" href="gIndex.jsp" onclick="onMouseClickBrand()">LG
					SWP Lab</a>

				<div class="nav-collapse collapse">
					<ul class="nav">
						<li class="summary"><a href="gSummary.jsp"
							onclick="onMouseClick1()" name="list">
								<style>
.summary {
	background-color: #4D4D4D;
	font-weight: bold;
}
</style> Summary
						</a></li>
						<li><a href="gCommonPlatform.jsp" onclick="onMouseClick2()"
							name="list">CommonPlatform</a></li>
						<li><a href="gProductPlatform.jsp" onclick="onMouseClick3()"
							name="list">ProductPlatform</a></li>
						<li><a href="gComponent.jsp" onclick="onMouseClick4()"
							name="list">Component</a></li>

					</ul>
				</div>
				<!-- end of nav-collapse collapse -->


			</div>
			<!-- end of container -->
		</div>
		<!-- end of navbar-inner -->
	</div>
	<!-- end of navbar navbar-inverse navbar-fixed-top -->
	<!-- ********************************************* -->


	<!-- ****** Lab Total Push ****** -->
	<br></br>

	<div class="title"
		style="-webkit-print-color-adjust: exact;">	<!-- style defined in bootstrap.css -->
		<center>
			<h1>
				<font color="white" size="5" face="맑은 고딕">SWP Lab - Push Tendency</font>
			</h1>
		</center>
	</div>


	<!-- ****** Print date ****** -->
	<%
		Connection conn = null;

		Statement stmtArea = null;
		Statement stmtDate = null;

		ResultSet rsArea = null;
		ResultSet rsDate = null;

		try {

			String URL = "jdbc:mysql://10.177.234.48:3306/gerrit_infra_test";
			String user = "heesung";
			String passwd = "multisqe";

			Class.forName("com.mysql.jdbc.Driver");
			System.out.println("Driver Load Success");
			conn = DriverManager.getConnection(URL, user, passwd);
		} catch (Exception e) {
			System.err.println("Unable to find and load driver");
		}

		String query = "SELECT CONCAT('W',c.inweek) AS WEEK, SUM(CASE c.status WHEN 'n' THEN '1' ELSE '0' END) AS OPEN, SUM(CASE c.status WHEN 'M' THEN '1' ELSE '0' END) AS Merge, SUM(CASE c.status WHEN 'A' THEN '1' ELSE '0' END) AS Abandon\n"
				+ "FROM changes c\n"
				+ "LEFT JOIN master_project s ON (c.dest_project_name = s.repository)\n"
				+ "WHERE c.inweek >= (\n"
				+ "SELECT WEEK\n"
				+ "FROM master_week w2\n"
				+ "WHERE DATE_ADD(SYSDATE(), INTERVAL-105 DAY) BETWEEN w2.start AND w2.end) AND c.inweek <= (\n"
				+ "SELECT WEEK\n"
				+ "FROM master_week w2\n"
				+ "WHERE DATE_ADD(SYSDATE(), INTERVAL-7 DAY) BETWEEN w2.start AND w2.end) AND s.status IN ('사용중')\n"
				+ "GROUP BY c.inweek;";

		String datePrintQuery = "select concat('in 15 weeks : ', 'W', min(w.week), '(', min(w.start), ') ~ W', max(w.week), '(', max(DATE_ADD(w.end, INTERVAL-1 DAY)), ')')\n"
				+ "from master_week w\n"
				+ "where w.week >= (select week from master_week w2\n"
				+ "             where date_add(sysdate(), interval-105 day) between w2.start and w2.end)\n"
				+ "and   w.week <= (select week from master_week w2\n"
				+ "             where date_add(sysdate(), interval-7 day) between w2.start and w2.end);";

		// Create Statement
		try {
			stmtArea = conn.createStatement();
			stmtDate = conn.createStatement();
		} catch (SQLException e) {
			System.out.println("create Statement Error...");

		}

		// Create ResultSet & ResultSetMetaData
		try {
			rsArea = stmtArea.executeQuery(query); // for Area(highcharts) Query
			rsDate = stmtDate.executeQuery(datePrintQuery); // for Date Print Query
			ResultSetMetaData rsmdArea = rsArea.getMetaData();	// ResultSetMetaData (Area)
	
		while (rsDate.next()) {
	%>
			<div id="date" style="float: left;">
				<!-- float:right vs left -->
				<h6>
					<font color="#4D4D4D" face="맑은 고딕" size="2.8" ; style="float: left;">
						&nbsp; * &nbsp;<%=rsDate.getString(1)%> <!-- cf) style="float:right; margin-right: 170px; -->
					</font>
				</h6>
			</div>
			<br><br><br>
	<%
		}
	%>


	<script type="text/javascript">

	$(function () {
    		var chart;
    					
		    $(document).ready(function() {
        		chart = new Highcharts.Chart({
        
        			chart: {
                		renderTo: 'area_chart',
                		type: 'area',
                		width:1150,
                		height:450
            		},
	            	title: {
            			text: ''
            		},
            		subtitle: {
            	 		text: '' 
            		},
            
            		xAxis: {
            	 		categories: [
                    		<%while (rsArea.next()) {%>
                      	   		<%=(rsArea.isFirst() ? "" : ",")%>
                      			'<%=rsArea.getString(1)%>'
                 			<%}%>
                      	 
                      		<%rsArea.beforeFirst();%>
                   		],

                		tickmarkPlacement: 'on',
                
                		title: {
                    	text: '[week]',
                    	align: 'high',
                    	color:'black'
                	}
            	},
            	
				yAxis: {
                	title: {
                    	text: ''
                	},
                	labels: {
                    }
            	},
            
            	tooltip: {
                	formatter: function() {
                    	var s = '<b>'+ this.x +'</b>';
                    
                    	$.each(this.points, function(i, point) {
                        	s += '<br/>'+ point.series.name +': '+ point.y ;
                    	});
                    
                    	return s;
                	},
                	shared: true
            	},
            	
            	plotOptions: {
                	area: {
                    	stacking: 'normal',
                    	lineColor: '#666666',
                    	lineWidth: 1,
                    	marker: {
                        	lineWidth: 1,
                        	lineColor: '#666666'
                    	}
                	}
            	},   
            	
            	credits: {
                	enabled: false
            	},  
            
            	series: [{   //open-red
                	name: '<%=rsmdArea.getColumnName(2)%>',   
                	color: '#D80F34',
               
                    data: [
						<%while (rsArea.next()) {%>
							<%=(rsArea.isFirst() ? "" : ",")%>
                       		<%=rsArea.getInt(2)%>
						<%}%>
                       	<%rsArea.beforeFirst();%>
					],
   				},  {      //Merge-green
               		name: '<%=rsmdArea.getColumnName(3)%>',   
               		color: '#09BA18',
               		data: [
						<%while (rsArea.next()) {%>
							<%=(rsArea.isFirst() ? "" : ",")%>
							<%=rsArea.getInt(3)%>
						<%}%>
						<%rsArea.beforeFirst();%>
					]}, {   //Abandon-yellow
           			name: '<%=rsmdArea.getColumnName(4)%>', 
           			color: '#F4F80C',
 	          		data: [
                  		<%while (rsArea.next()) {%>
                  			<%=(rsArea.isFirst() ? "" : ",")%>
              				<%=rsArea.getInt(4)%>
              	 		<%}%>			
   					]}                       
   				]     
			});
    	}); 
	});
	</script>


	<%
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			// return resources 
			/* (1) Area */
			if (rsArea != null){
				try {
					rsArea.close();
				} catch (SQLException e) {
					System.out.println("rsArea close Error");
					System.exit(1);
				}
			}
			if (stmtArea != null){
				try {
					stmtArea.close();
				} catch (SQLException e) {
					System.out.println("stmtArea close Error");
					System.exit(1);
				}
			}
			
			/* (2) datePrint */
			if (rsDate != null){
				try {
					rsDate.close();
				} catch (SQLException e) {
					System.out.println("rsDate close Error");
					System.exit(1);
				}
			}
			if (stmtDate != null){
				try {
					stmtDate.close();
				} catch (SQLException e) {
					System.out.println("stmtDate close Error");
					System.exit(1);
				}
			}
			
			if (conn != null){
				try {
					conn.close();
				} catch (SQLException e) {
					System.out.println("connection close Error");
					System.exit(1);
				}
			}
		}
	%>

	<div id="area_chart"
		style="float: left; width: 300px; height: 300px; border: 1; bodder-style: solid;"></div>

	<!-- ****** "fixed" footer ****** -->
	<div class="navbar navbar-inverse navbar-fixed-bottom">
		<div class="footer-inner">
			<div class="lg_electronics">
				Copyright 2013 LG Electronics. All Rights Reserved. <a
					href="http://collab.lge.com"> Collab </a> | <a href="index.jsp">SWP
					lab</a>
			</div>
		</div>
	</div>
	<!-- end of footer -->

</body>
</html>