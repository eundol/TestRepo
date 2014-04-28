<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page language="java"
	import="java.util.*, java.sql.*, javax.servlet.http.*,entity.TableRanking, java.text.DecimalFormat, java.text.SimpleDateFormat, java.util.Date"%>
<%	long time = System.currentTimeMillis(); 
	SimpleDateFormat dayTime = new SimpleDateFormat("yyyy");
	String str = dayTime.format(new Date(time)); %>
<!DOCTYPE HTML>

<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
<head>
<title>CreateRankingTable</title>

<link rel="Stylesheet" href="./css/bootstrap.css" />
<script src="./js/bootstrap.js"></script>
<script type="text/javascript" src="./js/popup.js"></script>
<%
	TableRanking tableRanking = (TableRanking) request
			.getAttribute("tableRanking");

	int rowSize = 5;

	String[] projectName = new String[rowSize * 2];
	projectName = tableRanking.getProjectName();

	int[] columnData = new int[rowSize * 2];
	columnData = tableRanking.getColumnData();

	///////////////////////////////////////////////////////////////////////////

	DecimalFormat format = new DecimalFormat("#,##0");
%>
</head>
<!-- ****** end of head ****** -->

<body>
	
	<!-- (1) table1 : Create Ranking - Bug -->
	<div style="width: 365px; float: left;  margin-left: 10px; margin-top: 15px;">
		<h5>
			<u><center><font size="2"><%=str%></font> Create Ranking - <font color="#B22222">Bug Issues</font></center></u>
		</h5>
	<table class="table table-bordered" style="float: left">
		<!-- ****** thead ****** -->
		<thead bgcolor="#dff0d8">
			<tr>
				<td width="1%" height="8" align="center"
					style="font-size: 1em; text-align: center;"><b><font
						face="맑은 고딕"></font></b></td>
										<!-- 1st column -->
				<td width="96%" height="8" align="center"
					style="font-size: 1em; text-align: center;"><b><font
						face="맑은 고딕">Project</font> </b></td>
										<!-- 2nd column -->
				<td width="5%" height="8" align="center"
					style="font-size: 1em; text-align: center;"><b><font
						face="맑은 고딕">Issue</font></b></td>
										<!-- 3rd column -->
			</tr>
		</thead>

		<!-- ****** End of thead ****** -->
		<!-- ****** tbody ****** -->
		<tbody>
		
		<%
			int cellIndex = 0;
			int rank = 1;
			for (int rowIndex = 0; rowIndex < rowSize; rowIndex++) {
				if(projectName[cellIndex]!=null){
		%>
			<tr id="cell" bgcolor=""  
				onMouseOver="this.style.backgroundColor='#FAE0D4'"
				onmouseout="this.style.backgroundColor=''">

				<!-- 1st column -->			
				<% if(rank==1){ %>				
					<td width="7%" height="8" align="center">
						<img src="img/rank_01.png"/></td>
				<%} else if(rank==2){ %>
					<td width="7%" height="8" align="center">
						<img src="img/rank_02.png"/></td>
				<%} else if(rank==3){ %>
					<td width="7%" height="8" align="center">
						<img src="img/rank_03.png"/></td>
				<%} else { %>
					<td width="5%" height="8" align="center"
						style="font-size: 1em; text-align: center;"><b><font
							face="맑은 고딕"></font></b></td>
				<%} %>

				<!-- 2nd column -->
				<td width="96%" height="8" align="center" style="font-size: 1em;"><b><font
						face="맑은 고딕"><%=projectName[cellIndex]%></font> </b></td>
				<!-- 3rd column -->
				<td width="5%" height="8" align="center"
					style="font-size: 1em; text-align: center;"><b><font
						face="맑은 고딕" color=""><%=format.format(columnData[cellIndex])%></font></b></td>

				
				<%} else{ %>
					<tr id="cell2" bgcolor=""  
						onMouseOver="this.style.backgroundColor='#FAE0D4'"
						onmouseout="this.style.backgroundColor=''">
				
					<!-- 1st column -->	
					<td width="5%" height="8" align="center"
							style="font-size: 1em; text-align: center;"><b><font
								face="맑은 고딕"></font></b></td>
					<!-- 2nd column -->										
					<td width="90%" height="8" align="center" style="font-size: 1em;  text-align: center;"><b><font
							face="맑은 고딕">-</font> </b></td>
					<!-- 3rd column -->
					<td width="9%" height="8" align="center"
						style="font-size: 1em; text-align: center;"><b><font
							face="맑은 고딕" color="">-</font></b></td>
	
					
					<%}
						cellIndex++;
						rank++;
						}
					%>

				</tr>
			</tbody>
			<!-- ****** End of tbody ****** -->

		</table>
	</div>
	<!-- End of Table1  -->
	
	<!--  (2) table2 : Create Ranking - Etc  -->
	<div style="width: 365px; float: left ;  margin-left: 5px; margin-top: 15px;">
		<h5>
			<u><center><font size="2"><%=str%></font> Create Ranking - <font color="#B22222">Non-Bug Issues</font></center></u>
		</h5>

	<table class="table table-bordered" style="float: left;">
		<!-- ****** thead ****** -->
		<thead bgcolor="#dff0d8">
			<tr>
				<td width="6%" height="8" align="center"
					style="font-size: 1em; text-align: center;"><b><font
						face="맑은 고딕"></font></b></td>
				<!-- 1st column -->
				<td width="78%" height="8" align="center"
					style="font-size: 1em; text-align: center;"><b><font
						face="맑은 고딕">Project</font> </b></td>
				<!-- 2nd column -->
				<td width="16%" height="8" align="center"
					style="font-size: 1em; text-align: center;"><b><font
						face="맑은 고딕">Issue</font></b></td>
			</tr>
		</thead>

		<!-- ****** End of thead ****** -->


		<!-- ****** tbody ****** -->
		<tbody>
		<%
			//int cellIndex = 0;
			rank = 1;
			for (int rowIndex = 0; rowIndex < rowSize; rowIndex++) {
				
				if(projectName[cellIndex]!=null) {
		%>
			<tr id="cell" bgcolor=""  
				onMouseOver="this.style.backgroundColor='#FAE0D4'"
				onmouseout="this.style.backgroundColor=''">
			
				<!-- 1st column -->
				<% if(rank==1){ %>				
					<td width="3px" height="4px" align="center">
						<img src="img/rank_01.png"/></td>
				<%} else if(rank==2){ %>
					<td width="3px" height="4px" align="center">
						<img src="img/rank_02.png"/></td>
				<%} else if(rank==3){ %>
					<td width="3px" height="4px" align="center">
						<img src="img/rank_03.png"/></td>
				<%} else { %>
					<td width="3px" height="4px" align="center"
						style="font-size: 1em; text-align: center;"><b><font
							face="맑은 고딕"></font></b></td>
				<%} %>	

				<!-- 2nd column -->				
				<td width="110" height="8" align="center" style="font-size: 1em;"><b><font
						face="맑은 고딕"><%=projectName[cellIndex]%></font> </b></td>
				<!-- 3rd column -->
				<td width="5" height="8" align="center"
					style="font-size: 1em; text-align: center;"><b><font
						face="맑은 고딕" color=""><%=format.format(columnData[cellIndex])%></font></b></td>
					
				<%} else{ %>
						<!-- 1st column -->
						<td width="3px" height="4px" align="center"
						style="font-size: 1em; text-align: center;"><b><font
							face="맑은 고딕"></font></b></td>
						<!-- 2nd column -->
						<td width="110" height="8" align="center" style="font-size: 1em;"><b><font
								face="맑은 고딕">-</font> </b></td>
						<!-- 3rd column -->
						<td width="5" height="8" align="center"
							style="font-size: 1em; text-align: center;"><b><font
								face="맑은 고딕" color="">-</font></b></td>
						
					
					<%}
							cellIndex++;
							rank++;
						}
					%>
	
				</tr>
		</tbody>
		<!-- ****** End of tbody ****** -->

	</table>
	</div>
</body>
</html>