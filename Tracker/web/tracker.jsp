
<!-- data ¿¬°á -->
<%@page import="java.io.Writer"%>
<%@ page contentType="text/html; charset=EUC-KR" pageEncoding="EUC-KR"%>
<%@ page language="java"
	import="java.util.*, java.sql.*, javax.servlet.http.*"%>
<%
	Connection conn = null;


	Statement stmt = null;
	Statement stmt2 = null;
	
	
	ResultSet rs = null;
	ResultSet rs2 = null;
	
	String bg1 = "#8F8F8F";
	String bg2 = "#F6F6F6";
	String bg3 = "#FAE0D4";
	String bg4 = "#E2EDF1";
	String fonco = "white";

	try {

		String URL = "jdbc:mysql://10.177.234.48:3306/tracker_infra";
		String user = "heesung";
		String passwd = "multisqe";

		Class.forName("com.mysql.jdbc.Driver");
		conn = DriverManager.getConnection(URL, user, passwd);

	} catch (Exception e) {

		System.err.println("Unable to find and load driver");

	}

	String query = 
				
				
					"select\n" +
					"   COALESCE(mp.group,'ÀüÃ¼') \"Group\",\n" + 
					"\tcount(i.issue_id) \"Issue °Ç¼ö\",\n" + 
					"\tsum(not(isnull(i.duedate))) \"Due date ÀÔ·Â¼ö\",\n" + 
					"\tconcat(round((sum(not(isnull(i.duedate))) / count(i.issue_id)) * 100, 0), '%') as \"Due Date ÀÔ·ÂÀ²\"\n" + 
					"from jira_issue i\n" + 
					"join (select\n" + 
					"\t\t\tm.project,\n" + 
					"\t\t   m.project_key,\n" + 
					"\t\t\tm.dp_project,\n" + 
					"\t\t\tm.group\n" + 
					"\t\tfrom master_project m\n" + 
					"\t\twhere m.visible = 'Y'\n" + 
					"\t\tgroup by project_key) mp on (i.project_key = mp.project_key)\n" + 
					"group by mp.group;";


	String query2 = 
						
					"select\n" +
					"   COALESCE(mp.group,'ÀüÃ¼') \"Group\",\n" + 
					"\tcount(i.issue_id) \"Áö¿¬ issue °Ç¼ö\"\n" + 
					"from jira_issue i\n" + 
					"join\n" + 
					"\t\t(select\n" + 
					"\t\t\tm.project,\n" + 
					"\t\t   m.project_key,\n" + 
					"\t\t\tm.group\n" + 
					"\t\tfrom\n" + 
					"\t\tmaster_project m\n" + 
					"\t\twhere m.visible = 'Y'\n" + 
					"\t\tgroup by project_key) mp on (i.project_key = mp.project_key)\n" + 
					"where\n" + 
					"\tisnull(i.duedate) = 0\n" + 
					"\tand i.`status` not in ('Closed','Resolved')\n" + 
					"  and   datediff(now(),i.duedate) > 0\n" + 
					"group by mp.group;";

					
					
					
	try {

		stmt = conn.createStatement(); // Statement »ý¼º
		stmt2 = conn.createStatement();
		
		

	} catch (SQLException e) {
	}

	try {

		rs = stmt.executeQuery(query);
		rs2 = stmt2.executeQuery(query2);

		ResultSetMetaData rsmd = rs.getMetaData();
		ResultSetMetaData rsmd2 = rs2.getMetaData();
		
		
		int columnCount = rsmd.getColumnCount();
		int columnCount2 = rsmd2.getColumnCount();
		
		System.out.println("ok");
%>

<!-- chart »Ñ¸®´Â part -->

<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
<meta name="generator" content="Namo WebEditor(Trial)" charset="utf-8">
<head>
<script>
$(document).ready(function(){

	$('table tbody tr').hide();
	$('table tbody').find('.studgroup').parent().show();
	$('tbody tr').hover(
			
	function(){
		
		var tr = $('table tbody tr');
		var rindex = $(this).parent().children().index(this);
		for(var i = rindex; i <= rindex+3;i++){
			$(tr[i]).show();
			$('.test').text(rindex);
		}
		$(this).addClass('hover');
			
				
		},
		
		function(){
			
			$('table tbody tr').hide();
			$('table tbody').find('.studgroup').parent().show();
			$(this).removeClass('hover');
					
		}
	
	);
	
});


</script>






</head>



<body>
	<br>
	<!-- width: 1300px > 1000px -->
	<table border="2.2" bordercolor="#4D4D4D" width="800px" height="35">

		<!-- ****** thead ****** -->
		<thead bgcolor="<%=bg1%>">
			<tr>
				<td width="140" height="10" align="center" align="middle">
					<p style="line-height: 100%; margin-top: 0; margin-bottom: 0;"center">
						<b><font face="¸¼Àº °íµñ"></font><font size="2" face="¸¼Àº °íµñ"
							color="<%=fonco%>"><span
								style="line-height: 100%; margin-top: 0; margin-bottom: 0;">&nbsp;Group
							</span></font></b>
					</p>

				</td>


				<td width="140" height="10" align="center" align="middle">
					<p style="line-height: 100%; margin-top: 0; margin-bottom: 0;"center">
						<b><font face="¸¼Àº °íµñ"></font><font size="2" face="¸¼Àº °íµñ"
							color="<%=fonco%>"><span
								style="line-height: 100%; margin-top: 0; margin-bottom: 0;">&nbsp;Issue
									°Ç¼ö </span></font></b>
					</p>

				</td>
				<td width="104" height="10" align="center" align="middle">
					<p style="line-height: 100%; margin-top: 0; margin-bottom: 0;"center">
						<b><font size="2" face="¸¼Àº °íµñ">&nbsp;</font><font size="2"
							face="¸¼Àº °íµñ" color="<%=fonco%>"><span
								style="line-height: 100%; margin-top: 0; margin-bottom: 0;">Due
									date </span></font></b><font size="2" face="¸¼Àº °íµñ" color="black"><span
							style="line-height: 100%; margin-top: 0; margin-bottom: 0;"><b></b></span></font>
					</p>
					<p style="line-height: 100%; margin-top: 0; margin-bottom: 0;"center">
						<b><font size="2" face="¸¼Àº °íµñ" color="<%=fonco%>"><span
								style="line-height: 100%; margin-top: 0; margin-bottom: 0;">&nbsp;ÀÔ·Â¼ö
							</span></font><font size="2" face="¸¼Àº °íµñ" color="white"></font></b>
					</p>
				</td>

				<td width="104" height="10" align="center" align="middle">
					<p style="line-height: 100%; margin-top: 0; margin-bottom: 0;"center">
						<b><font size="2" face="¸¼Àº °íµñ">&nbsp;</font><font size="2"
							face="¸¼Àº °íµñ" color="<%=fonco%>"><span
								style="line-height: 100%; margin-top: 0; margin-bottom: 0;">Due
									date </span></font></b><font size="2" face="¸¼Àº °íµñ" color="black"><span
							style="line-height: 100%; margin-top: 0; margin-bottom: 0;"><b></b></span></font>
					</p>
					<p style="line-height: 100%; margin-top: 0; margin-bottom: 0;"center">
						<b><font size="2" face="¸¼Àº °íµñ" color="<%=fonco%>"><span
								style="line-height: 100%; margin-top: 0; margin-bottom: 0;">&nbsp;ÀÔ·ÂÀ²
							</span></font><font size="2" face="¸¼Àº °íµñ" color="white"></font></b>
					</p>
				</td>

				<td width="104" height="10" align="center" align="middle">
					<p style="line-height: 100%; margin-top: 0; margin-bottom: 0;"center">
						<b><font size="2" face="¸¼Àº °íµñ">&nbsp;</font><font size="2"
							face="¸¼Àº °íµñ" color="<%=fonco%>"><span
								style="line-height: 100%; margin-top: 0; margin-bottom: 0;">Áö¿¬
							</span></font></b><font size="2" face="¸¼Àº °íµñ" color="black"><span
							style="line-height: 100%; margin-top: 0; margin-bottom: 0;"><b></b></span></font>
					</p>
					<p style="line-height: 100%; margin-top: 0; margin-bottom: 0;"center">
						<b><font size="2" face="¸¼Àº °íµñ" color="<%=fonco%>"><span
								style="line-height: 100%; margin-top: 0; margin-bottom: 0;">&nbsp;Issue
									°Ç¼ö </span></font><font size="2" face="¸¼Àº °íµñ" color="white"></font></b>
					</p>
				</td>






			</tr>
		</thead>
		<!-- ****** End of thead ****** -->

		<%
			int i = 0;
		 	int j = 0;
		
		 	
		 	
		 	float Issue_num = (float)0;
		 	float Duedate_num = (float)0;
		 	float Duedate_percentage = 0;
		  	float temp = 0;
		 	int delayIssue_num = 0;
		 	
		 	
		 	
		 	
			String[] str = new String[30];
			String gradation = null;

		 	
		 	int[] temp2 = new int[30];
			int[] temp3 = new int[30];
			int[] temp4 = new int[30];
			int[] temp5 = new int[30];

		 	
			 	
 			while(rs2.next()) {
 	
 	
 	
 				temp5[j] = rs2.getInt(2);
 				delayIssue_num = delayIssue_num + temp5[j];
 			
 				j++;
 			
 			}
 		
 		
 			while( rs.next()) {
 				
				str[i] = rs.getString(1);
				temp2[i] = rs.getInt(2);
				temp3[i] = rs.getInt(3);
				temp4[i] = rs.getInt(4);
			
				 Issue_num = Issue_num + temp2[i];
				 Duedate_num = Duedate_num + temp3[i];
	
		%>

		<!-- ****** tbody ****** -->


	 <tbody id="tbody" bgcolor="<%=bg2%>">
			<!-- onMouseOver="this.style.backgroundColor='<%=bg3%>'"
			onmouseout="this.style.backgroundColor='<%=bg2%>'">--> 
			
			<tr>
			
						
						
						
				<td width="400" height="10" align="left" onClick="javascript:view(1)"><b><font face="¸¼Àº °íµñ" size="2">&nbsp;<%=str[i]%></font></b></td>
				<td width="130" height="10" align="center"><b><font face="¸¼Àº °íµñ" size="2"><%=temp2[i]%></font> </b></td>
				<td width="172" height="10" align="center"><b><font face="¸¼Àº °íµñ" size="2"> <%=temp3[i]%></font></b></td>
				<td width="172" height="10" align="center"><b><font face="¸¼Àº °íµñ" size="2"> <%=temp4[i]%>% </font></b></td>
				<td width="145" height="10" align="center"><b><font face="¸¼Àº °íµñ" size="2"><%=temp5[i]%></font></b></td>
      
            	<%
				
				  i++; }
		
 			//ÀüÃ¼ Æò±Õ ÀÔ·ÂÀ² °è»ê
				 Duedate_percentage = Math.round(Duedate_num / Issue_num * 1000) ;
				 Duedate_percentage = Duedate_percentage / 10 ;
				 System.out.println("Duedate_num = " + Duedate_num);
				 System.out.println("Issue_num = " + Issue_num);
				 System.out.println("Duedate_percentage = " + Duedate_percentage);
 			
				%>  
				
		    </tr>
				
			<tr class="studgroup">
				
				<td width="400" height="10" align="center" bgcolor="<%=bg4%>"><b><font face="¸¼Àº °íµñ" size="2"> Àü Ã¼ </font></b></td>
				<td width="130" height="10" align="center" bgcolor="<%=bg4%>"><b><font face="¸¼Àº °íµñ" size="2"><%=(int)Issue_num%></font> </b></td>
				<td width="172" height="10" align="center" bgcolor="<%=bg4%>"><b><font face="¸¼Àº °íµñ" size="2"> <%=(int)Duedate_num%></font></b></td>
				<td width="172" height="10" align="center" bgcolor="<%=bg4%>"><b><font face="¸¼Àº °íµñ" size="2"> <%=Duedate_percentage%>% </font></b></td>
				<td width="145" height="10" align="center" bgcolor="<%=bg4%>"><b><font face="¸¼Àº °íµñ" size="2"><%=delayIssue_num%></font></b></td>
				
				
		    </tr>
			
			
				<tr id="sub1" style="display:none">
				
				<td width="400" height="10" align="center" bgcolor="<%=bg4%>"><b><font face="¸¼Àº °íµñ" size="2"> 111Àü Ã¼ </font></b></td>
				<td width="130" height="10" align="center" bgcolor="<%=bg4%>"><b><font face="¸¼Àº °íµñ" size="2"><%=(int)Issue_num%></font> </b></td>
				<td width="172" height="10" align="center" bgcolor="<%=bg4%>"><b><font face="¸¼Àº °íµñ" size="2"> <%=(int)Duedate_num%></font></b></td>
				<td width="172" height="10" align="center" bgcolor="<%=bg4%>"><b><font face="¸¼Àº °íµñ" size="2"> <%=Duedate_percentage%>% </font></b></td>
				<td width="145" height="10" align="center" bgcolor="<%=bg4%>"><b><font face="¸¼Àº °íµñ" size="2"><%=delayIssue_num%></font></b></td>
				
				
		    </tr>
			
				<tr id="sub1" style="display:none">
				
				<td width="400" height="10" align="center" bgcolor="<%=bg4%>"><b><font face="¸¼Àº °íµñ" size="2"> 222Àü Ã¼ </font></b></td>
				<td width="130" height="10" align="center" bgcolor="<%=bg4%>"><b><font face="¸¼Àº °íµñ" size="2"><%=(int)Issue_num%></font> </b></td>
				<td width="172" height="10" align="center" bgcolor="<%=bg4%>"><b><font face="¸¼Àº °íµñ" size="2"> <%=(int)Duedate_num%></font></b></td>
				<td width="172" height="10" align="center" bgcolor="<%=bg4%>"><b><font face="¸¼Àº °íµñ" size="2"> <%=Duedate_percentage%>% </font></b></td>
				<td width="145" height="10" align="center" bgcolor="<%=bg4%>"><b><font face="¸¼Àº °íµñ" size="2"><%=delayIssue_num%></font></b></td>
				
				
		    </tr>
			
			
				<tr id="sub1" style="display:none">
				
				<td width="400" height="10" align="center" bgcolor="<%=bg4%>"><b><font face="¸¼Àº °íµñ" size="2"> 333Àü Ã¼ </font></b></td>
				<td width="130" height="10" align="center" bgcolor="<%=bg4%>"><b><font face="¸¼Àº °íµñ" size="2"><%=(int)Issue_num%></font> </b></td>
				<td width="172" height="10" align="center" bgcolor="<%=bg4%>"><b><font face="¸¼Àº °íµñ" size="2"> <%=(int)Duedate_num%></font></b></td>
				<td width="172" height="10" align="center" bgcolor="<%=bg4%>"><b><font face="¸¼Àº °íµñ" size="2"> <%=Duedate_percentage%>% </font></b></td>
				<td width="145" height="10" align="center" bgcolor="<%=bg4%>"><b><font face="¸¼Àº °íµñ" size="2"><%=delayIssue_num%></font></b></td>
				
				
		    </tr>
			
			
			
			
			
			
		



		</tbody>
		<!-- ****** End of tbody ****** -->

	</table>


	<%
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			// resource ¹ÝÈ¯
			if (rs != null)
				try {
					rs.close();
				} catch (SQLException e) {
				}
			if (stmt != null)
				try {
					stmt.close();
				} catch (SQLException e) {
				}
			if (conn != null)
				try {
					conn.close();
				} catch (SQLException e) {
				}
		}
	%>
</body>
</html>