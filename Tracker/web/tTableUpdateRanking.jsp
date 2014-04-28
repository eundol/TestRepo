<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page language="java"
	import="java.util.*, java.sql.*, javax.servlet.http.*,entity.TableRanking, java.text.DecimalFormat"%>

<!DOCTYPE HTML>

<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
<head>

<title>UpdateRankingTable</title>

<link rel="Stylesheet" href="./css/bootstrap.css" />
<script src="./js/bootstrap.js"></script>
<script type="text/javascript" src="./js/popup.js"></script>
<%
	TableRanking tableUpdateRanking = (TableRanking) request
			.getAttribute("tableUpdateRanking");

	int rowSize = 5;

	String[] projectName = new String[rowSize];
	projectName = tableUpdateRanking.getProjectName();

	int[] columnData = new int[rowSize * 6];
	columnData = tableUpdateRanking.getColumnData();

	///////////////////////////////////////////////////////////////////////////

	DecimalFormat format = new DecimalFormat("#,##0");
%>
</head>
<!-- ****** end of head ****** -->

<body>
	<div
		style="width: 550px; float: left; margin-left: 5px; margin-top: 15px;">
		<h5>
			<u><center>Weekly Update Ranking</center></u>
		</h5>
		<!-- table : Update Ranking -->
		<table class="table table-bordered-update" style="float: left">
			<!-- ****** thead ****** -->
			<thead bgcolor="#dff0d8">
				<tr>
					<td width="1%" height="8" align="center"
						style="font-size: 1.0em; text-align: center;"><b><font
							face="맑은 고딕"></font></b></td>
					<!-- 1st column -->
					<td width="87%" height="8" align="center"
						style="font-size: 1.0em; text-align: center;"><b
						title="Project"><font face="맑은 고딕">Project</font> </b></td>
					<!-- 2nd column -->
					<td width="1%" height="8" align="center"
						style="font-size: 1.0em; text-align: center;"><b title="Task"><font
							face="맑은 고딕">Task</font></b></td>
					<!-- 3rd column -->
					<td width="1%" height="8" align="center"
						style="font-size: 1.0em; text-align: center;"><b
						title="Sub-task"><font face="맑은 고딕">Sub</font></b></td>
					<!-- 4th column -->
					<td width="1%" height="8" align="center"
						style="font-size: 1.0em; text-align: center;"><b
						title="Story"><font face="맑은 고딕">Story</font></b></td>
					<!-- 5th column -->
					<td width="1%" height="8" align="center"
						style="font-size: 1.0em; text-align: center;"><b title="Bug"><font
							face="맑은 고딕">Bug</font></b></td>
					<!-- 6th column -->
					<td width="1%" height="8" align="center"
						style="font-size: 1.0em; text-align: center;"><b
						title="Requirement"><font face="맑은 고딕">Req</font></b></td>
					<!-- 7th column -->
					<td width="1%" height="8" align="center"
						style="font-size: 1.0em; text-align: center;"><b
						title="Technical task, Improvement, New Feature, Risk, Request, Epic, Event"><font
							face="맑은 고딕">Etc</font></b></td>
					<!-- 8th column -->
					<td width="6%" height="8" align="center"
						style="font-size: 1.0em; text-align: center;"><b
						title="Total"><font face="맑은 고딕">Total</font></b></td>
					<!-- 9th column -->

				</tr>
			</thead>

			<!-- ****** End of thead ****** -->

			<!-- ****** tbody ****** -->
			<tbody>

				<%
					int nameIndex = 0;
					int dataIndex = 0;
					int rank = 1;
					for (int rowIndex = 0; rowIndex < rowSize; rowIndex++) {// rowSize : 6
						float sumTemp = 0.0f;

						if (projectName[nameIndex] != null) {
				%>
				<tr id="cell" bgcolor=""
					onMouseOver="this.style.backgroundColor='#FAE0D4'"
					onmouseout="this.style.backgroundColor=''">

					<%
						if (rank == 1) {
					%>
					<td width="6%" height="8" align="center"><img
						src="img/rank_01.png" /></td>
					<%
						} else if (rank == 2) {
					%>
					<td width="6%" height="8" align="center"><img
						src="img/rank_02.png" /></td>
					<%
						} else if (rank == 3) {
					%>
					<td width="6%" height="8" align="center"><img
						src="img/rank_03.png" /></td>
					<%
						} else {
					%>
					<td width="5%" height="8" align="center"
						style="font-size: 1em; text-align: center;"><b><font
							face="맑은 고딕"></font></b></td>
					<%
						}
					%>

					<!-- 1st column -->
					<td width="140" height="8" align="center" style="font-size: 1.0em;"><b><font
							face="맑은 고딕"><%=projectName[nameIndex++]%></font> </b></td>
					<!-- 2nd column -->
					<td width="5" height="8" align="center"
						style="font-size: 1.0em; text-align: center;"><b><font
							face="맑은 고딕"><%=format.format(columnData[dataIndex])%></font></b></td>
					<%
						sumTemp += columnData[dataIndex++];
					%>
					<!-- 3rd column -->
					<td width="5" height="8" align="center"
						style="font-size: 1.0em; text-align: center;"><b><font
							face="맑은 고딕"><%=format.format(columnData[dataIndex])%></font></b></td>
					<%
						sumTemp += columnData[dataIndex++];
					%>
					<!-- 4th column -->
					<td width="5" height="8" align="center"
						style="font-size: 1.0em; text-align: center;"><b><font
							face="맑은 고딕"><%=format.format(columnData[dataIndex])%></font></b></td>
					<%
						sumTemp += columnData[dataIndex++];
					%>
					<!-- 5th column -->
					<td width="5" height="8" align="center"
						style="font-size: 1.0em; text-align: center;"><b><font
							face="맑은 고딕"><%=format.format(columnData[dataIndex])%></font></b></td>
					<%
						sumTemp += columnData[dataIndex++];
					%>
					<!--  6th column -->
					<td width="5" height="8" align="center"
						style="font-size: 1.0em; text-align: center;"><b><font
							face="맑은 고딕"><%=format.format(columnData[dataIndex])%></font></b></td>
					<%
						sumTemp += columnData[dataIndex++];
					%>
					<!-- 7th column -->

					<%
						float valEtc = columnData[dataIndex] - sumTemp;
					%>
					<td width="5" height="8" align="center"
						style="font-size: 1.0em; text-align: center;"><b><font
							face="맑은 고딕"><%=format.format(valEtc)%></font></b></td>
					<!-- 8th column -->
					<td width="5" height="8" align="center"
						style="font-size: 1.0em; text-align: center;"><b><font
							face="맑은 고딕" color="blue"><%=format.format(columnData[dataIndex++])%></font></b></td>
					<!-- 9th column -->

					<%
						} else {
					%>
				
				<tr id="cell2" bgcolor=""
					onMouseOver="this.style.backgroundColor='#FAE0D4'"
					onmouseout="this.style.backgroundColor=''">

					<!-- 1st column -->
					<td width="5%" height="8" align="center"
						style="font-size: 1em; text-align: center;"><b><font
							face="맑은 고딕"></font></b></td>
					<!-- 2nd column -->
					<td width="140" height="8" align="center"
						style="font-size: 1.0em; text-align: center;"><b><font
							face="맑은 고딕">-</font> </b></td>
					<!-- 3rd column -->
					<td width="5" height="8" align="center"
						style="font-size: 1.0em; text-align: center;"><b><font
							face="맑은 고딕">-</font></b></td>
					<!-- 4th column -->
					<td width="5" height="8" align="center"
						style="font-size: 1.0em; text-align: center;"><b><font
							face="맑은 고딕">-</font></b></td>
					<!-- 5th column -->
					<td width="5" height="8" align="center"
						style="font-size: 1.0em; text-align: center;"><b><font
							face="맑은 고딕">-</font></b></td>
					<!--  6th column -->
					<td width="5" height="8" align="center"
						style="font-size: 1.0em; text-align: center;"><b><font
							face="맑은 고딕">-</font></b></td>
					<!-- 7th column -->
					<td width="5" height="8" align="center"
						style="font-size: 1.0em; text-align: center;"><b><font
							face="맑은 고딕">-</font></b></td>
					<!-- 8th column -->
					<td width="5" height="8" align="center"
						style="font-size: 1.0em; text-align: center;"><b><font
							face="맑은 고딕">-</font></b></td>
					<!-- 9th column -->
					<td width="5" height="8" align="center"
						style="font-size: 1.0em; text-align: center;"><b><font
							face="맑은 고딕">-</font></b></td>

					<%
						}
							rank++;
						}
					%>

				</tr>
			</tbody>
			<!-- ****** End of tbody ****** -->


		</table>
</body>
</html>