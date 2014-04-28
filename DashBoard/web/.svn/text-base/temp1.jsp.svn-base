
<!-- data 연결 -->

<%@ page contentType="text/html; charset=EUC-KR" pageEncoding="EUC-KR"%>
<%@ page language="java"
	import="java.util.*, java.sql.*, javax.servlet.http.*"%>


<%@ page import="java.util.Date"%>
<!-- 날짜 관련 import -->

<%@ page import="java.text.SimpleDateFormat"%>
<!-- import Simple Date Format -->

<%
	Connection conn = null;

	//qeury1의 데이터를 가져오기 위한 변수 선언.
	Statement stmt = null;
	Statement stmt_temp = null;
	Statement stmt_temp2 = null;
	Statement stmt_temp3 = null;

	

	Statement stmt3 = null;

	

	//qeury1의 데이터 결과를 저장하기 위해 변수선언.
	ResultSet rs = null;
	ResultSet rs_temp = null;
	ResultSet rs_temp2 = null;
	ResultSet rs_temp3 = null;



	//qeury3의 데이터 결과를 저장하기 위해 변수선언.
	ResultSet rs3 = null;

	

	try {

		String URL = 

"jdbc:mysql://10.177.234.48:3306/gerrit_infra_test";
		String user = "heesung";
		String passwd = "multisqe";

		Class.forName("com.mysql.jdbc.Driver");
		conn = DriverManager.getConnection(URL, user, passwd);
	} catch (Exception e) {

		System.err.println("Unable to find and load driver");

	}

	//week push graph  query ( area graph )
	String query = "select week.week as Week,\n"
			+ "\t\t COALESCE(output.Open,0) as Open,\n"
			+ "\t\t COALESCE(output.Merge,0) as Merge,\n"
			+ "\t\t COALESCE(output.Abandon,0) as Abandon\n"

			+ "from\n"
			+ "(select w.week as Week, "
			+ "\t\tsum(case upper(c.`status`) when 'n' THEN '1' ELSE '0' END) as Open,\n"
			+ "\t sum(case upper(c.`status`) when 'M' THEN '1' ELSE '0' END) as Merge,\n"
			+ "\t\t sum(case upper(c.`status`) when 'A' THEN '1' ELSE '0' END) as Abandon\n"

			+ "from changes c\n"
			+ "join master_week w on (c.created_on between w.start and w.end)\n"
			+ "left join master_project s on (c.dest_project_name = s.repository)\n"
			+ "where w.week >= (select week from master_week w2\n"
			+ "\t\t\t\t\t\t where date_add(sysdate(), interval-105 day) between w2.start and w2.end)\n"
			+ "and   w.week <= (select week from master_week w2\n"
			+ "             where date_add(sysdate(), interval-7 day) between w2.start and w2.end)\n"
			+ "and   s.status in ('사용중')\n"
			+ "and   s.team like 'commonplatform'\n"
			+ "group by w.week) output\n"
			+ "right join\n"
			+ "(select *\n"
			+ "from master_week w1\n"
			+ "where w1.week >= (select week from master_week w2\n"
			+ "             where date_add(sysdate(), interval-105 day) between w2.start and w2.end)\n"
			+ "and   w1.week <= (select week from master_week w2\n"
			+ "             where date_add(sysdate(), interval-7 day) between w2.start and w2.end)) week on (output.Week = week.week);";

	

	//Date	
	String query3 = 
	"SELECT DATE_FORMAT(w2.start, '%m / %d'), DATE_FORMAT ( DATE_ADD(w2.end, INTERVAL-1 DAY), '%m / %d') FROM master_week w2 WHERE DATE_ADD(SYSDATE(), INTERVAL-7 DAY) BETWEEN w2.start AND w2.end; ";

	
	try {

		//query1의 Statement 생성
		stmt = conn.createStatement();
		stmt_temp = conn.createStatement();
		stmt_temp2 = conn.createStatement();
		stmt_temp3 = conn.createStatement();

		

		//query3의 Statement 생성
		stmt3 = conn.createStatement();

	

	} catch (SQLException e) {
	}

	try {

		//query1 실행 결과 result set 저장
		rs = stmt.executeQuery(query);
		rs_temp = stmt_temp.executeQuery(query);
		rs_temp2 = stmt_temp2.executeQuery(query);
		rs_temp3 = stmt_temp3.executeQuery(query);



		//query3 실행 결과 result set 저장
		rs3 = stmt3.executeQuery(query3);

		//query4 실행 결과 result set 저장
		

		//query1의 column명 저장
		ResultSetMetaData rsmd = rs.getMetaData();
		ResultSetMetaData rsmd_temp = rs_temp.getMetaData();
		ResultSetMetaData rsmd_temp2 = rs_temp2.getMetaData();
		ResultSetMetaData rsmd_temp3 = rs_temp3.getMetaData();

	

		//query3의 column명 저장
		ResultSetMetaData rsmd3 = rs3.getMetaData();

		//query1,2,3의 ColumnCount 수
		int columnCount = rsmd.getColumnCount();
	
		int columnCount3 = rsmd3.getColumnCount();
%>



<!DOCTYPE HTML>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>Highcharts Example</title>

		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
		<script type="text/javascript">
$(function () {
    var chart;
    $(document).ready(function() {
        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'container',
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: ''
            },
            tooltip: {
        	    pointFormat: '{series.name}: <b>{point.percentage}%</b>',
            	percentageDecimals: 1
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        connectorColor: '#000000',
                        formatter: function() {
                            return '<b>'+ this.point.name +'</b>: '+ this.percentage +' %';
                        }
                    }
                }
            }, 
            credits: {
            	
                enabled: false
                
            },
            series: [{
                type: 'pie',
                name: 'Browser share',
                data: [
                    ['DueOK',  45.8],
                 
                    {
                        name: 'DueNo',
                        y: 12.8,
                        sliced: true,
                        selected: true
                    }
                  
                ]
            }]
        });
    });
    
});
		</script>
	</head>
	<body>
<script src="http://code.highcharts.com/highcharts.js"></script>
<script src="http://code.highcharts.com/modules/exporting.js"></script>

<div id="container" style="min-width: 400px; height: 400px; margin: 0 auto"></div>

	</body>
</html>



	<%
		} catch (Exception e) {

			try {

				conn.rollback();

			} catch (SQLException se) {

				e.printStackTrace();

			}
		} finally {
			// resource 반환
			if (rs != null || rs3 != null) {
				try {

					rs.close();
					
					rs3.close();

				} catch (SQLException e) {

					e.printStackTrace();

				}

				rs = null;
			
				rs3 = null;

			}
			if (stmt != null || stmt3 != null) {
				try {

					stmt.close();
					
					stmt3.close();

				} catch (SQLException e) {

					e.printStackTrace();

				}

				stmt = null;
				
				stmt3 = null;
			}

			if (conn != null)

				try {

					conn.close();

				} catch (SQLException e) {

					e.printStackTrace();

				}
		}
	%>