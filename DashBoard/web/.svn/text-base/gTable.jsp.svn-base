<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page language="java"
	import="java.util.*, java.sql.*, javax.servlet.http.*,entity.Table"%>

<!DOCTYPE HTML>

<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
<head>

<meta name="generator" content="Namo WebEditor(Trial)" charset="utf-8">
<title>Table</title>

<script type="text/javascript" src="./js/popup.js"></script>
<%
	ArrayList<Table> tableList = (ArrayList<Table>) request
			.getAttribute("tableList");
	Table table = tableList.get(0);

	int rowCount = table.getRowCount();

	String[] projectName = new String[rowCount];
	projectName = table.getProjectName();

	int[] columnData = new int[rowCount];
	columnData = table.getColumnData();

	///////////////////////////////////////////////////////////////////////////

	String bg1 = "#8F8F8F";
	String bg2 = "#F6F6F6";
	String bg3 = "#FAE0D4";
	String bg4 = "#E2EDF1";
	String fonco = "white";

	int totalMerge = 0;
	int totalAbandon = 0;
	int totalOpen = 0;
	int totalPushBefore = 0;
	int totalPush = 0;
%>
</head>
<!-- ****** end of head ****** -->

<body>
	<br><br>
	<table border="2.2" bordercolor="#4D4D4D" width="1300px" height="35">

		<!-- ****** thead ****** -->
		<thead bgcolor="<%=bg1%>">
			<tr>
				<td width="650" height="35" rowspan="2" align="center"
					valign="middle"><b><font face="맑은 고딕" color="white"></font><font
						size="2" face="맑은 고딕" color="<%=fonco%>">&nbsp;&nbsp;&nbsp;&nbsp;Project</font></td>

				<td width="338" height="5" colspan="3" align="center"><b> <font
						size="2" face="맑은 고딕" color="<%=fonco%>">&nbsp;Developer Participation</font><font
						face="맑은 고딕" color="<%=fonco%>" size="2"></td>
				<td width="499" height="5" colspan="5" align="center"><b> <font
						size="2" face="맑은 고딕" color="<%=fonco%>">Push</font><font
						face="맑은 고딕" color="<%=fonco%>" size="2"></td>
			</tr>
			<tr>
				<td width="160" height="10" align="center" align="middle">
					<p style="line-height: 100%; margin-top: 0; margin-bottom: 0;"center">
						<b><font face="맑은 고딕"></font><font size="2" face="맑은 고딕"
							color="<%=fonco%>"><span
								style="line-height: 100%; margin-top: 0; margin-bottom: 0;">&nbsp;Participant
							</span></font></b>
					</p>
					<p style="line-height: 100%; margin-top: 0; margin-bottom: 0;"center">
						<b><font size="2" face="맑은 고딕" color="<%=fonco%>"><span
								style="line-height: 100%; margin-top: 0; margin-bottom: 0;">(push commit)
									</span></font></b>
					</p>
				</td>
				<td width="160" height="10" align="center" align="middle">
					<p style="line-height: 100%; margin-top: 0; margin-bottom: 0;"center">
						<b><font size="2" face="맑은 고딕">&nbsp;</font><font size="2"
							face="맑은 고딕" color="<%=fonco%>"><span
								style="line-height: 100%; margin-top: 0; margin-bottom: 0;">All developers
							</span></font></b><font size="2" face="맑은 고딕" color="black"><span
							style="line-height: 100%; margin-top: 0; margin-bottom: 0;"><b></b></span></font>
					</p>
				</td>
				<td width="180" height="10" align="center" align="middle"><b><font
						size="2" face="맑은 고딕" color="<%=fonco%>">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Rate [P/A]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font></td>
				<td width="65" height="10" align="center" align="middle"><b><font
						size="2" face="맑은 고딕" color="<%=fonco%>">Merge</font></td>
				<td width="65" height="10" align="center" align="middle"><b><font
						size="2" face="맑은 고딕" color="<%=fonco%>">Abandon</font></td>
				<td width="150" height="10" align="center" align="middle"><b>
						<font size="2" face="맑은 고딕" color="<%=fonco%>">Open</font></td>
				<td width="150" height="10" align="center" align="middle"><b>
						<font size="2" face="맑은 고딕" color="<%=fonco%>">Total</font></td>
				<td width="150" height="10" align="center" align="middle"><b><font
						size="2" color="<%=fonco%>">Compared to previous week</font></b></td>
			</tr>
		</thead>
		<!-- ****** End of thead ****** -->

		<!-- ****** tbody ****** -->

		<%
			int nameIndex = 0;
			int dataIndex = 0;
			for (int rowIndex = 0; rowIndex < rowCount; rowIndex++) {
		%>
		<tbody id="tbody" bgcolor="<%=bg2%>"
			onMouseOver="this.style.backgroundColor='<%=bg3%>'"
			onmouseout="this.style.backgroundColor='<%=bg2%>'">
			<tr>
				<td width="400" height="10" align="left"><b><font
						face="맑은 고딕" size="2">&nbsp;&nbsp;<%=projectName[nameIndex]%></font></b></td>
				<td width="130" height="10" align="center"><b><font
						face="맑은 고딕" size="2"><%=columnData[dataIndex++]%></font> </b></td>
				<!-- 2nd column -->
				<td width="172" height="10" align="center"><b><font
						face="맑은 고딕" size="2"> <%=columnData[dataIndex++]%></font></b></td>
				<!-- 3rd column -->

				<%
					if (columnData[dataIndex] == 0) { // if 4th column data is 0
				%>
				<td width="165" height="10" style="background: url(img/1.png);"
					align="center"><b><font face="맑은 고딕" size="2"><%=columnData[dataIndex++]%>%</font></b></td>
				<%
					} else if (columnData[dataIndex] > 0
								&& columnData[dataIndex] < 10) {
				%>
				<td width="165" height="10" style="background: url(img/5.png);"
					align="center"><b><font face="맑은 고딕" size="2"><%=columnData[dataIndex++]%>%</font></b></td>
				<%
					} else if (columnData[dataIndex] >= 10
								&& columnData[dataIndex] < 20) {
				%>
				<td width="165" height="10" style="background: url(img/10.png);"
					align="center"><b><font face="맑은 고딕" size="2"><%=columnData[dataIndex++]%>%</font></b></td>
				<%
					} else if (columnData[dataIndex] >= 20
								&& columnData[dataIndex] < 30) {
				%>
				<td width="165" height="10" style="background: url(img/20.png);"
					align="center"><b><font face="맑은 고딕" size="2"><%=columnData[dataIndex++]%>%</font></b></td>
				<%
					} else if (columnData[dataIndex] >= 30
								&& columnData[dataIndex] < 40) {
				%>
				<td width="165" height="10" style="background: url(img/30.png);"
					align="center"><b><font face="맑은 고딕" size="2"><%=columnData[dataIndex++]%>%</font></b></td>
				<%
					} else if (columnData[dataIndex] >= 40
								&& columnData[dataIndex] < 50) {
				%>
				<td width="165" height="10" style="background: url(img/40.png);"
					align="center"><b><font face="맑은 고딕" size="2"><%=columnData[dataIndex++]%>%</font></b></td>
				<%
					} else if (columnData[dataIndex] >= 50
								&& columnData[dataIndex] < 60) {
				%>
				<td width="165" height="10" style="background: url(img/50.png);"
					align="center"><b><font face="맑은 고딕" size="2"><%=columnData[dataIndex++]%>%</font></b></td>
				<%
					} else if (columnData[dataIndex] >= 60
								&& columnData[dataIndex] < 70) {
				%>
				<td width="165" height="10" style="background: url(img/60.png);"
					align="center"><b><font face="맑은 고딕" size="2"><%=columnData[dataIndex++]%>%</font></b></td>
				<%
					} else if (columnData[dataIndex] >= 70
								&& columnData[dataIndex] < 80) {
				%>
				<td width="165" height="10" style="background: url(img/70.png);"
					align="center"><b><font face="맑은 고딕" size="2"><%=columnData[dataIndex++]%>%</font></b></td>
				<%
					} else if (columnData[dataIndex] >= 80
								&& columnData[dataIndex] < 90) {
				%>
				<td width="165" height="10" style="background: url(img/80.png);"
					align="center"><b><font face="맑은 고딕" size="2"><%=columnData[dataIndex++]%>%</font></b></td>
				<%
					} else if (columnData[dataIndex] >= 90
								&& columnData[dataIndex] < 100) {
				%>
				<td width="165" height="10" style="background: url(img/90.png);"
					align="center"><b><font face="맑은 고딕" size="2"><%=columnData[dataIndex++]%>%</font></b></td>
				<%
					} else if (columnData[dataIndex] >= 100) {
				%>
				<td width="165" height="10"
					style="background: url(img/100.png);" align="center"><b><font
						face="맑은 고딕" size="2"><%=columnData[dataIndex++]%>%</font></b></td>
				<%
					} else {
						}
				%>


				<style>
a:link {
	color: black;
}

a:VISITED {
	color: #530064;
}

a:hover {
	color: blue;
	text-decoration: underline;
}

a:active {
	color: red;
}
</style>


				<!-- //////////////////////////////////////////////////////////////////////////// -->
				
				<!-- ****** Merge ****** -->
				<td width="145" height="10" align="center"><b><font	face="맑은 고딕" size="2"> 
					<a href="javascript:changePopupM('<%=projectName[nameIndex]%>')"
							title="Display a list"><%=columnData[dataIndex]%></a> <!-- 5th column -->
					</font></b></td>
				<%
					totalMerge += columnData[dataIndex++];
				%>			<!--  *** calculate accumulated merge *** -->

				<!-- ****** Abandon ****** -->
				<td width="137" height="10" align="center"><b><font
						face="맑은 고딕" size="2"> <a
							href="javascript:changePopupA('<%=projectName[nameIndex]%>')"
							title="Display a list"><%=columnData[dataIndex]%></a> <!-- 6th column -->
					</font></b></td>
				<%
					totalAbandon += columnData[dataIndex++];
				%>			<!-- *** calculate accumulated abandon *** -->

				<!-- ****** Open ****** -->
				<td width="101" height="10" align="center"><b><font
						face="맑은 고딕" size="2"> <a
							href="javascript:changePopupO('<%=projectName[nameIndex]%>')"
							title="Display a list"><%=columnData[dataIndex]%></a> <!-- 7th column -->
					</font></b></td>
				<%
					totalOpen += columnData[dataIndex++];
				%>			<!--  *** calculate accumulated open *** -->

				<!-- //////////////////////////////////////////////////////////////////////////// -->
				
				<%
					if (columnData[dataIndex] == 0) { // if 8th column data is 0
				%>

				<td width="95" height="10" align="center"><a
					href="javascript:changePopupF('<%=projectName[nameIndex]%>')"
					title="Display a list"> <b><font face="맑은 고딕" size="2"
							color="red"><%=columnData[dataIndex]%></font></b></a></td>
				<%
					} else { // if 8th column data is not 0 (bigger than 0, don't consider minus value)
				%>

				<td width="95" height="10" align="center"><a
					href="javascript:changePopupF('<%=projectName[nameIndex]%>')"
					title="Display a list"><b><font face="맑은 고딕" size="2"
							color="blue"><%=columnData[dataIndex]%></font></b></a></td>
				<%
					}
				%>

				<!-- ****** Total Push ****** -->
				<%
					totalPush += columnData[dataIndex++];
				%>		<!--  *** calculate accumulated total *** -->

				<%
					if (columnData[dataIndex] > 0) { // if 9th column data is bigger than 0
				%>
				<td width="90" height="10" align="center"><img src="img/up.png"
					width="20" height="15" border="0" align="left"> <b><font
						face="맑은 고딕" size="2"><%=columnData[dataIndex]%></font></b></td>

				<%
					} else if (columnData[dataIndex] < 0) {
				%>
				<td width="90" height="10" align="center"><img
					src="img/down.png" width="20" height="15" border="0" align="left">
					<b><font face="맑은 고딕" size="2"><%=columnData[dataIndex]%></font></b></td>

				<%
					} else if (columnData[dataIndex] == 0) {
				%>
				<td width="90" height="10" align="center"><img
					src="img/same.png" width="20" height="15" border="0" align="left">
					<b><font face="맑은 고딕" size="2"><%=columnData[dataIndex]%></font></b></td>
				<%
					} else {}
				%>

				<!-- ****** Before Push ****** -->
				<%
					totalPushBefore += columnData[dataIndex++];
				%>
				<!--  *** calculate accumulated PushBefore *** -->


			</tr>


			<%
				nameIndex++;
				}
			%>
			<!-- end of while(rs.next()) -->

			<!-- Push Before -->
			<tr>
				<td width="400" height="10" align="center" bgcolor="<%=bg4%>"><b><font
						face="맑은 고딕" size="2"> 계 </font></b></td>
				<td width="130" height="10" align="center" bgcolor="<%=bg4%>"><b><font
						face="맑은 고딕" size="2"> - </font></b></td>
				<td width="172" height="10" align="center" bgcolor="<%=bg4%>"><b><font
						face="맑은 고딕" size="2"> - </font></b></td>
				<td width="165" height="10" align="center" bgcolor="<%=bg4%>"><b><font
						face="맑은 고딕" size="2"> - </font></b></td>
				<td width="145" height="10" align="center" bgcolor="<%=bg4%>"><b><font
						face="맑은 고딕" size="2"><%=totalMerge%></font></b></td>
				<td width="137" height="10" align="center" bgcolor="<%=bg4%>"><b><font
						face="맑은 고딕" size="2"><%=totalAbandon%></font></b></td>
				<td width="101" height="10" align="center" bgcolor="<%=bg4%>"><b><font
						face="맑은 고딕" size="2"><%=totalOpen%></font></b></td>
				<td width="95" height="10" align="center" bgcolor="<%=bg4%>"><b><font
						face="맑은 고딕" size="2"><%=totalPush%></font></b></td>

				<%
					if (totalPushBefore == 0) {
				%>

				<td width="90" height="10" align="center" bgcolor="<%=bg4%>"><img
					src="img/same.png" width="20" height="15" border="0" align="left">
					<b><font face="맑은 고딕" size="2"><%=totalPushBefore%></font></b></td>
				<%
					}
				%>

				<%
					if (totalPushBefore > 0) {
				%>

				<td width="90" height="10" align="center" bgcolor="<%=bg4%>"><img
					src="img/up.png" width="20" height="15" border="0" align="left">
					<b><font face="맑은 고딕" size="2"><%=totalPushBefore%></font></b></td>
				<%
					}
				%>


				<%
					if (totalPushBefore < 0) {
				%>

				<td width="90" height="10" align="center" bgcolor="<%=bg4%>"><img
					src="img/down.png" width="20" height="15" border="0" align="left">
					<b><font face="맑은 고딕" size="2"><%=totalPushBefore%></font></b></td>
				<%
					}
				%>


			</tr>

		</tbody>
		<!-- ****** End of tbody ****** -->

	</table>






</body>
</html>