
<!-- data ¿¬°á -->
<%@page import="java.io.Writer"%>
<%@ page contentType="text/html; charset=EUC-KR" pageEncoding="EUC-KR"%>
<%@ page language="java"
	import="java.util.*, java.sql.*, javax.servlet.http.*"%>
<%
	Connection conn = null;


	Statement stmt = null;
	Statement stmt_temp = null;
	
	Statement stmt2 = null;
	Statement stmt2_temp = null;
	
	
	
	ResultSet rs = null;
	ResultSet rs_temp = null;
	
	
	ResultSet rs2 = null;
	ResultSet rs2_temp = null;
	
	
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

	   String query3 = 
							
							
							"SELECT\n" +
							" mp.dp_project \"Project\", COUNT(i.issue_id) \"Issue °Ç¼ö\", SUM(NOT(ISNULL(i.duedate))) \"Due date ÀÔ·Â¼ö\", CONCAT(ROUND((SUM(NOT(ISNULL(i.duedate))) / COUNT(i.issue_id)) * 100, 0), '%') AS \"Due Date ÀÔ·ÂÀ²\"\n" + 
							"FROM jira_issue i\n" + 
							"JOIN (\n" + 
							"SELECT\n" + 
							"      m.project,\n" + 
							"     m.project_key,\n" + 
							"      m.dp_project,\n" + 
							"      m.group\n" + 
							"FROM master_project m\n" + 
							"WHERE m.visible = 'Y' AND m.group = 'CommonPlatform'\n" + 
							"GROUP BY project_key) mp ON (i.project_key = mp.project_key)\n" + 
							"GROUP BY mp.dp_project;";



	   String query4 = 
								
					"SELECT r1.dp_project \"Project\", COALESCE(r2.count,0) AS \"Áö¿¬ Issue °Ç¼ö\"\n" +
							"FROM\n" + 
							"    (\n" + 
							"SELECT\n" + 
							"      m.project,\n" + 
							"     m.project_key,\n" + 
							"       m.dp_project,\n" + 
							"      m.group\n" + 
							"FROM\n" + 
							"    master_project m\n" + 
							"WHERE m.visible = 'Y' AND m.group = 'CommonPlatform'\n" + 
							"GROUP BY dp_project) r1\n" + 
							"LEFT JOIN\n" + 
							"    (\n" + 
							"SELECT\n" + 
							"     mp.dp_project, COUNT(i.issue_id) \"count\"\n" + 
							"FROM jira_issue i\n" + 
							"JOIN\n" + 
							"        (\n" + 
							"SELECT\n" + 
							"          m.project,\n" + 
							"         m.project_key,\n" + 
							"           m.dp_project,\n" + 
							"          m.group\n" + 
							"FROM\n" + 
							"        master_project m\n" + 
							"WHERE m.visible = 'Y' AND m.group = 'CommonPlatform'\n" + 
							"GROUP BY project_key) mp ON (i.project_key = mp.project_key)\n" + 
							"WHERE ISNULL(i.duedate) = 0 AND i.`status` NOT IN ('Closed','Resolved') AND DATEDIFF(NOW(),i.duedate) > 0\n" + 
							"GROUP BY mp.dp_project) r2 ON (r1.dp_project = r2.dp_project);";


					
					
					
	try {

		stmt = conn.createStatement(); // Statement »ý¼º
		stmt_temp = conn.createStatement();
		
		stmt2 = conn.createStatement(); // Statement »ý¼º
		stmt2_temp = conn.createStatement();
		

	} catch (SQLException e) {
	}

	try {

		rs = stmt.executeQuery(query);
		rs_temp = stmt_temp.executeQuery(query2);
		
		rs2 = stmt2.executeQuery(query3);
		rs2_temp = stmt2_temp.executeQuery(query4);
		
		
		

		ResultSetMetaData rsmd = rs.getMetaData();
		ResultSetMetaData rsmd_temp = rs_temp.getMetaData();

		ResultSetMetaData rsmd2= rs2.getMetaData();
		ResultSetMetaData rsmd2_temp= rs2_temp.getMetaData();
		
		
		
		
		int columnCount = rsmd.getColumnCount();
		int columnCount_temp = rsmd_temp.getColumnCount();
		
		int columnCount2 = rsmd2.getColumnCount();
		int columnCount2_temp = rsmd2_temp.getColumnCount();
		
		
		
		
		
		System.out.println("ok");
		
		float Issue_num = (float)0;
	 	float Duedate_num = (float)0;
	 	float Duedate_percentage = 0;
	  	float temp = 0;
	 	int delayIssue_num = 0;
		
		int i = 0;	//Ã¹ ¹øÂ° Å×ÀÌºí Äõ¸® 1
	 	int j = 0;  //µÎ ¹øÂ° Å×ÀÌºí Äõ¸® 2
	 	
		int m = 0;   //commonplatform table query1

	 	
	
	 	
	 		 	
		String[] str = new String[30];
		String gradation = null;

	 	
	 	int[] temp2 = new int[30];
		int[] temp3 = new int[30];
		int[] temp4 = new int[30];
		int[] temp5 = new int[30];

		
		
		String[] C_str = new String[30];
		
	 	
	 	int[] C_temp2 = new int[30];
		int[] C_temp3 = new int[30];
		int[] C_temp4 = new int[30];
		int[] C_temp5 = new int[30];
	 	
		 	
			while(rs_temp.next()) {
	
	
	
				temp5[j] = rs_temp.getInt(2);
				delayIssue_num = delayIssue_num + temp5[j];
			
				j++;
			
			}
		
			j = 0;
			
			while(rs2_temp.next()) {
				
				
				
				C_temp5[j] = rs2_temp.getInt(2);
				delayIssue_num = delayIssue_num + temp5[j];
			
				j++;
			
			}
		
			//ÀüÃ¼ Æò±Õ ÀÔ·ÂÀ² °è»ê
			 Duedate_percentage = Math.round(Duedate_num / Issue_num * 1000) ;
			 Duedate_percentage = Duedate_percentage / 10 ;
			 System.out.println("Duedate_num = " + Duedate_num);
			 System.out.println("Issue_num = " + Issue_num);
			 System.out.println("Duedate_percentage = " + Duedate_percentage);
		
			 
			 
			
			
			
			
			
			
%>



<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
    <title></title>
    <style type="text/css">
        body { font-family:Arial, Helvetica, Sans-Serif; font-size:0.8em;}
        #report { border-collapse:collapse;}
        #report h4 { margin:0px; padding:0px;}
        #report img { float:right;}
        #report ul { margin:10px 0 10px 40px; padding:0px;}
        #report th { background:#8F8F8F  repeat-x scroll center left;color:#fff; font-weight:bold;padding:7px 15px;  text-align:center;font-family: ¸¼Àº °íµñ;	 }
        #report td { background:#E2EDF1 none repeat-x scroll center left;color:#000; padding:7px 15px; }
        #report tr.odd td { background:#F6F6F6  repeat-x scroll center left;  cursor:pointer; border:#000000 1px solid;}
        #report div.arrow { background:transparent url(img/arrows.png) no-repeat scroll 0px -16px; width:16px; height:16px; display:block;}
        #report div.up { background-position:0px 0px;}
    </style>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js" type="text/javascript"></script>
    <script type="text/javascript">  
        $(document).ready(function(){
            $("#report tr:odd").addClass("odd");
            $("#report tr:not(.odd)").hide();
            $("#report tr:first-child").show();
            
            $("#report tr.odd").click(function(){
                $(this).next("tr").toggle();
                $(this).find(".arrow").toggleClass("up");
            });
            //$("#report").jExpand();
        });
    </script>        
</head>
<body>
   
    <table id="report" border="1px">
		<colgroup>
			<col width="320" ><col width="100"><col width="150"><col width="150"><col width="130"><col width="auto">
		</colgroup>
        <tr border="1px">
            <th scope="col" > Group </th>
            <th scope="col">Issue</th>
            <th scope="col" >Due date ÀÔ·Â¼ö</th>
			<th scope="col" >Due date ÀÔ·ÂÀ²</th>
            <th scope="col">Áö¿¬ Issue °Ç¼ö</th>
            <th scope="col" ></th>
        </tr>
        
        
         <%
			
 		
 			while( rs.next()) {
 				
				str[i] = rs.getString(1);
				temp2[i] = rs.getInt(2);
				temp3[i] = rs.getInt(3);
				temp4[i] = rs.getInt(4);
			
				 Issue_num = Issue_num + temp2[i];
				 Duedate_num = Duedate_num + temp3[i];
	
		%>
        
        
        
        
		        <tr >
		            <td ><p style="text-align:left; font-weight:bold;font-family: ¸¼Àº °íµñ;	"><%=str[i]%></p></td>
		            <td ><p style="text-align:right; font-weight:bold;font-family: ¸¼Àº °íµñ;	"><%=temp2[i]%></p></td>
		            <td><p style="text-align:right; font-weight:bold;font-family: ¸¼Àº °íµñ;	"><%=temp3[i]%></p></td>
					<td><p style="text-align:right; font-weight:bold;font-family: ¸¼Àº °íµñ;	"><%=temp4[i]%>%</p></td>
		            <td><p style="text-align:right; font-weight:bold;font-family: ¸¼Àº °íµñ;	"><%=temp5[i]%></p></td>
		            <td><div class="arrow"></div></td>
		        </tr>
		        
           
        
        <tr>
            <td colspan="6" style="padding:0px;margin:0px;width:600;">
            
            
         <%   
				
           		 while( rs2.next()) {
             
           			C_str[m] = rs2.getString(1);
    				C_temp2[m] = rs2.getInt(2);
    				C_temp3[m] = rs2.getInt(3);
    				C_temp4[m] = rs2.getInt(4);
             
             %>
        
        
            			
				<ul style="list-style:none;padding:10px;margin:0px;width:600;border:#000000 1px ;">
					<li style="float: left;width:30%;border:1px;font-family: ¸¼Àº °íµñ;"><%=C_str[m]%></li>
					<li style="float: left;width:15%;border:1px;text-align:right;font-family: ¸¼Àº °íµñ;"><%=C_temp2[m]%> </li>
					 <li style="float: left;width:17%;border:1px; text-align:right;font-family: ¸¼Àº °íµñ;	 "><%=C_temp3[m]%></li>
					 <li style="float: left;width:17%;border:1px; text-align:right ;font-family: ¸¼Àº °íµñ;	"><%=C_temp4[m]%>%</li>
					 <li style="float: left;width:15%;border:1px; text-align:right;font-family: ¸¼Àº °íµñ;	 "><%=C_temp5[m]%> </li>
					 <li style="float: left;width:30px;border:none;text-align:right">     </li>
				 </ul>
				
				
				  <%
             
           		 m++; } %>
           		 
				
				
            </td>
        </tr>
        
        
			<%	 
			
			i++; }
		
 			%>  
		
		</tbody>		
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



