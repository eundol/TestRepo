<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page language="java"
	import="java.util.*, java.sql.*, javax.servlet.http.*,entity.Table, java.text.DecimalFormat, java.text.SimpleDateFormat, java.util.Date"%>

<!DOCTYPE HTML>

<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
<head>

<title>TrackerSummaryTable</title>

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

	String bg1 = "#dff0d8";
	String bg2 = "white";
	String bg3 = "#FAE0D4"; //#ff8080
	String bg4 = "#E2EDF1";
	String fonco = "black";

	float totalIssue = 0.0f;
	float totalDoingIssue = 0.0f;
	float totalDueDateEnter = 0.0f;
	float totalDueDatePercent = 0.0f;
	int totalDelayIssue = 0;
	DecimalFormat format = new DecimalFormat("#,##0");
	
	//년도 표기
	long time = System.currentTimeMillis(); 
	SimpleDateFormat dayTime = new SimpleDateFormat("yyyy");
	String str = dayTime.format(new Date(time));
%>
</head>
<!-- ****** end of head ****** -->

<body>

	<div class="tTable"
		style="float: left; padding-left: 50px; padding-top: 20px;">
		<font color="#B22222" style="margin-left: 743px">(Created
			Issues in <%=str%>)</font>
		<table border="2.2" bordercolor="#dddddd" width="870px" height="35">
			<!-- ****** thead ****** -->
			<thead bgcolor="<%=bg1%>">
				<tr height="13px">
					<td width="41%" height="10" align="center" align="middle" rowspan="2">
						<p style="line-height: 100%; margin-top: 0; margin-bottom: 0;"center">
							<b><font face="맑은 고딕"></font><font size="2" face="맑은 고딕"
								color="<%=fonco%>"><span
									style="line-height: 100%; margin-top: 0; margin-bottom: 0;">&nbsp;Group
								</span></font></b>
						</p>

					</td>


					<td width="11%" height="10" align="center" align="middle" rowspan="2">
						<p style="line-height: 100%; margin-top: 0; margin-bottom: 0;"center">
							<b><font face="맑은 고딕"></font><font size="2" face="맑은 고딕"
								color="<%=fonco%>"><span
									style="line-height: 100%; margin-top: 0; margin-bottom: 0;">ALL
										</span></font></b>
						</p>
					</td>
					<td width="11%" height="10" align="center" align="middle"
						title="Open, In progress, Reopened" rowspan="2">
						<p style="line-height: 100%; margin-top: 0; margin-bottom: 0;"center">
							<b><font face="맑은 고딕"></font><font size="2" face="맑은 고딕"
								color="<%=fonco%>"><span
									style="line-height: 100%; margin-top: 0; margin-bottom: 0;">Ongoing
										</span></font></b>
						</p>
					</td>
					<td width="242px" height="10" align="center" align="middle" colspan="2">
						<p style="line-height: 100%; margin-top: 0; margin-bottom: 0;"center">
							<b><font size="2" face="맑은 고딕">&nbsp;</font><font size="2"
								face="맑은 고딕" color="<%=fonco%>"><span
									style="line-height: 100%; margin-top: 0; margin-bottom: 0;">Due
										date </span></font></b><font size="2" face="맑은 고딕" color="black"><span
								style="line-height: 100%; margin-top: 0; margin-bottom: 0;"><b></b></span></font>
						</p>
					</td>
					<td width="11%" height="10" align="center" align="middle" rowspan="2">
						<p style="line-height: 100%; margin-top: 0; margin-bottom: 0;"center">
							<b><font size="2" face="맑은 고딕">&nbsp;</font><font size="2"
								face="맑은 고딕" color="<%=fonco%>"><span
									style="line-height: 100%; margin-top: 0; margin-bottom: 0;">Delayed
								</span></font></b><font size="2" face="맑은 고딕" color="black"><span
								style="line-height: 100%; margin-top: 0; margin-bottom: 0;"><b></b></span></font>
						</p>
					</td>

				</tr>
				<tr height="20px">
					<td align="center" align="middle" width="12.5%">
						<p style="line-height: 100%; margin-top: 0; margin-bottom: 0; center;">
							<b><font size="2" face="맑은 고딕" color="<%=fonco%>"><span
									style="line-height: 100%; margin-top: 0; margin-bottom: 0;">Input
								</span></font><font size="2" face="맑은 고딕" color="white"></font></b>
						</p>
					</td>
					<td align="center" align="middle">
						<p style="line-height: 100%; margin-top: 0; margin-bottom: 0; center;">
							<b><font size="2" face="맑은 고딕" color="<%=fonco%>"><span
									style="line-height: 100%; margin-top: 0; margin-bottom: 0;">Input Rate
								</span></font><font size="2" face="맑은 고딕" color="white"></font></b>
						</p>
					</td>
				</tr>
			</thead>
			<!-- ****** End of thead ****** -->

			<%
				int nameIndex = 0;
				int dataIndex = 0;
				for (int rowIndex = 0; rowIndex < rowCount; rowIndex++) {
			%>

			<!-- ****** tbody ****** -->


			<tbody id="tbody" bgcolor="<%=bg2%>"
				onMouseOver="this.style.backgroundColor='<%=bg3%>'"
				onmouseout="this.style.backgroundColor='<%=bg2%>'">
				<tr>

					<td width="" height="10" align="left"><b><font
							face="맑은 고딕" size="2">&nbsp;&nbsp;<%=projectName[nameIndex]%></font></b></td>
					<td width="" height="10" align="center"><b><font
							face="맑은 고딕" size="2"><%=format.format(columnData[dataIndex])%></font>
					</b></td>
					<%
						totalIssue += columnData[dataIndex++];
					%>
					<!-- 2nd column -->
					<td width="" height="10" align="center"><b><font
							face="맑은 고딕" size="2"><%=format.format(columnData[dataIndex])%></font>
					</b></td>
					<%
						totalDoingIssue += columnData[dataIndex++];
					%>
					<!-- 3nd column -->
					<td width="" height="10" align="center"><b><font
							face="맑은 고딕" size="2"> <%=format.format(columnData[dataIndex])%></font></b></td>
					<%
						totalDueDateEnter += columnData[dataIndex++];
					%>
					<!-- 4rd column -->
					<!--입력율에 따른 배경 변화적용-->
					<td width="" height="10" align="center"
						<%if (columnData[dataIndex] == 100) {%>
						style="background: url(img/100.png);"
						<%} else if (columnData[dataIndex] >= 90) {%>
						style="background: url(img/90.png);"
						<%} else if (columnData[dataIndex] >= 80) {%>
						style="background: url(img/80.png);"
						<%} else if (columnData[dataIndex] >= 70) {%>
						style="background: url(img/70.png);"
						<%} else if (columnData[dataIndex] >= 60) {%>
						style="background: url(img/60.png);"
						<%} else if (columnData[dataIndex] >= 50) {%>
						style="background: url(img/50.png);"
						<%} else if (columnData[dataIndex] >= 40) {%>
						style="background: url(img/40.png);"
						<%} else if (columnData[dataIndex] >= 30) {%>
						style="background: url(img/30.png);"
						<%} else if (columnData[dataIndex] >= 20) {%>
						style="background: url(img/20.png);"
						<%} else if (columnData[dataIndex] >= 10) {%>
						style="background: url(img/10.png);"
						<%} else if (columnData[dataIndex] >= 1) {%>
						style="background: url(img/5.png);"
						<%} else if (columnData[dataIndex] == 0) {%>
						style="background: url(img/1.png);" <%} else {
				}%>><b><font
							face="맑은 고딕" size="2"><%=columnData[dataIndex]%>% </font></b></td>
					<%
						totalDueDatePercent += columnData[dataIndex++];
					%>
					<!-- 5th column -->
					<td width="" height="10" align="center"><b><font
							face="맑은 고딕" size="2"> <%=format.format(columnData[dataIndex])%>
						</font></b></td>
					<%
						totalDelayIssue += columnData[dataIndex++];
					%>
					<!-- 6th column -->


					<%
						nameIndex++;
							//dataIndex ++;  
						}

						//전체 평균 입력율 계산
						totalDueDatePercent = Math.round(totalDueDateEnter
								/ totalDoingIssue * 1000);
						totalDueDatePercent /= 10;
						System.out.println("DueDate 입력수 (3rd Column)= " + totalDelayIssue);
						System.out.println("Issue 건수 (2nd Column) = " + totalIssue);
						System.out.println("DueDate Percentage = " + totalDueDatePercent);
					%>

				</tr>

				<tr>

					<td width="400" height="10" align="center" bgcolor="<%=bg4%>"><b><font
							face="맑은 고딕" size="2"> Total </font></b></td>
					<td width="130" height="10" align="center" bgcolor="<%=bg4%>"><b><font
							face="맑은 고딕" size="2"><%=format.format((int) totalIssue)%></font>
					</b></td>
					<td width="130" height="10" align="center" bgcolor="<%=bg4%>"><b><font
							face="맑은 고딕" size="2"><%=format.format((int) totalDoingIssue)%></font>
					</b></td>
					<td width="172" height="10" align="center" bgcolor="<%=bg4%>"><b><font
							face="맑은 고딕" size="2"> <%=format.format((int) totalDueDateEnter)%></font></b></td>
					<td width="172" height="10" align="center" bgcolor="<%=bg4%>"><b><font
							face="맑은 고딕" size="2"> <%=totalDueDatePercent%>%
						</font></b></td>
					<td width="145" height="10" align="center" bgcolor="<%=bg4%>"><b><font
							face="맑은 고딕" size="2"><%=format.format(totalDelayIssue)%></font></b></td>


				</tr>
			</tbody>
			<!-- ****** End of tbody ****** -->

		</table>
	</div>
</body>
</html>