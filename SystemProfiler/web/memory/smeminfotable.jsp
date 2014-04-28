<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ page import="java.util.*"%>
<%@ page import="entity.*"%>
<%@ page import="java.text.DecimalFormat"%>
<%@ page import="common.ProfileUtils"%>
<%
	ArrayList<SmemEntity> smemInfo = (ArrayList<SmemEntity>)request.getAttribute("smemInfo");
	SmemEntity entity = null;
	
	String id = (String)request.getAttribute("id");
	String sortParam = (String)request.getAttribute("sortParam");
    String order = (String)request.getAttribute("order");
	
	long ussStart = 0;
	long ussEnd = 0;
	long ussDiff = 0;
	long pssStart = 0;
	long pssEnd = 0;
	long pssDiff = 0;
    
	DecimalFormat df = new DecimalFormat("###,###");
	ProfileUtils profileUtils = new ProfileUtils();
	int cnt = 0;
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<style type="text/css">
body {
	margin: 0;
	padding: 0;
	font: bold 12px/1.5em Verdana;
}
h2 {
	font: bold 14px Verdana, Arial, Helvetica, sans-serif;
	color: #000;
	margin: 0px;
	padding: 0px 0px 0px 15px;
}
table {
      border: 1px;
      border-color: white;
    }
table td{
      font: 12px/1.5em Verdana;
    }
table th{
	  font: 11px/1.5em;
      background-color: #266493;
      color: white;
      height: 20px;
    }
table tr.basic{
	  background-color: #F4F4F4; 
	  cursor: pointer;
}
table tr.basic:hover{
	  background-color: #FCE6E0; 
	  cursor: pointer;
}
table tr.select{
	  cursor: pointer;
      background-color: #1AADCE;
      color: white;
}
a#sortButton {
	 color: white;
	 font-style: normal;
	 text-decoration: none;
	 }
a#sortButton:hover{
	  color: #DDDDDD; 
	}
#percentage{
	color: #0000FF;
}
#percentage:visited{
	color: #0000FF;
}
#percentage:hover{
	color: #492970;
}
#byte{
	color: #0000FF;
}
#byte:visited{
	color: #0000FF;
}
#byte:hover{
	color: #492970;
}
.sortButton{
	cursor: pointer;
}
.sortedButton{
	text-decoration: underline;
	cursor: pointer;
}
.sortButton:hover{
	text-decoration: underline;
}
</style>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script type="text/javascript">
	function viewSortedTable(param){
		if('<%=sortParam%>' == param && '<%=order%>' == 'desc'){
			window.location.href="memgetprocessinfo?id="+ <%=id%> + "&sortparam=" + param + "&order=" + "asc";
		}else{
			window.location.href="memgetprocessinfo?id="+ <%=id%> + "&sortparam=" + param + "&order=" + "desc";
		}
	}
	
	function changeDiffColor(cnt){
		document.getElementById('diff'+cnt).style.backgroundColor ="#FCE6E0";
		document.getElementById('diffx'+cnt).style.backgroundColor ="#FCE6E0";
	}
	
	function changeDiffColorOrigin(cnt){
		document.getElementById('diff'+cnt).style.backgroundColor ="#FAFFC8";
		document.getElementById('diffx'+cnt).style.backgroundColor ="#FAFFC8";
	}
</script>
</head>
<body style="overflow-x : hidden;">

<div style="margin-top: 0px;">
	<table style="width: 100%; height: 100%; table-layout: fixed;">
		<thead>
			<tr>
				<th style="width: 3%" rowspan="2">
				</th>
				<th style="width: 19%" rowspan="2">
					<span class="sortButton" onclick="javascript:viewSortedTable('process')" title="Descending order sort">Process</span>
				</th>
				<th style="width: 39%" colspan="3">
					USS <span style="font-weight: normal;">(Unique Set Size)</span>
				</th>
				<th style="width: 39%" colspan="3">
					PSS <span style="font-weight: normal;">(Proportional Set Size)</span>
				</th>
			</tr>
			<tr>
				<th style="width: 13%">
					<span class="sortButton" onclick="javascript:viewSortedTable('uss_start')" title="Descending order sort">Start</span>
				</th>
				<th style="width: 13%">
					<span class="sortButton" onclick="javascript:viewSortedTable('uss_end')" title="Descending order sort">End</span>
				</th>
				<th style="width: 13%">
				    <span class="sortButton" onclick="javascript:viewSortedTable('s_uss_diff')" title="Descending order sort">Difference</span>
				</th>
				<th style="width: 13%">
					<span class="sortButton" onclick="javascript:viewSortedTable('pss_start')" title="Descending order sort">Start</span>
				</th>
				<th style="width: 13%">
					<span class="sortButton" onclick="javascript:viewSortedTable('pss_end')" title="Descending order sort">End</span>
				</th>
				<th style="width: 13%">
				    <span class="sortButton" onclick="javascript:viewSortedTable('s_pss_diff')" title="Descending order sort">Difference</span>
				</th>
			</tr>
		</thead>
		<tbody id = "tbody">
			<%if(smemInfo != null && !smemInfo.isEmpty()){ 
				
				for(int inx = 0, size = smemInfo.size() ; inx < size ; inx++){
					cnt++;
					entity = smemInfo.get(inx);
			%>
			<tr class="basic" onmouseover="javscript:changeDiffColor('<%=cnt%>')" onmouseout="javscript:changeDiffColorOrigin('<%=cnt%>')">
				<td style="text-align: center; cursor: default;" title="<%=cnt%>">
				<%=cnt%>
				</td>
				<td style="text-align: left; cursor: default;" title="<%=entity.getName()%>">
				&nbsp;&nbsp;<%=entity.getName()%>
				</td>
				<td style="text-align: center; cursor: default;" title="<%=profileUtils.zeroToDashMark(df.format(entity.getUssStart()))%>">
				<%=profileUtils.zeroToDashMark(df.format(entity.getUssStart()))%>
				</td>
				<td style="text-align: center; cursor: default;" title="<%=profileUtils.zeroToDashMark(df.format(entity.getUssEnd()))%>">
				<%=profileUtils.zeroToDashMark(df.format(entity.getUssEnd()))%>
				</td>
				<td id="diff<%=cnt%>" style="text-align: center; cursor: default; background-color: #FAFFC8;" title="<%=df.format(entity.getUssDiff())%> KB">
				<%=profileUtils.changeColorBlueOrRed(df.format(entity.getUssDiff()))%>
				</td>
				<td style="text-align: center; cursor: default;" title="<%=profileUtils.zeroToDashMark(df.format(entity.getPssStart()))%>">
				<%=profileUtils.zeroToDashMark(df.format(entity.getPssStart()))%>
				</td>
				<td style="text-align: center; cursor: default;" title="<%=profileUtils.zeroToDashMark(df.format(entity.getPssEnd()))%>">
				<%=profileUtils.zeroToDashMark(df.format(entity.getPssEnd()))%>
				</td>
				<td id="diffx<%=cnt%>" style="text-align: center; cursor: default; background-color: #FAFFC8;" title="<%=df.format(entity.getPssDiff())%> KB">
				<%=profileUtils.changeColorBlueOrRed(df.format(entity.getPssDiff()))%>
				</td>
			</tr>
			
			<%
			ussStart += entity.getUssStart();
			ussEnd += entity.getUssEnd();
			ussDiff += entity.getUssDiff();
			pssStart += entity.getPssStart();
			pssEnd += entity.getPssEnd();
			pssDiff += entity.getPssDiff();
			}%>
			<%}else{%>
			N/A
			<%}%>
		</tbody>
	</table>
	<div style="height: 20px;"></div>
</div>

<%-- <%if(smemInfo.size() < 15){%>
<div style="width:100%; height: 1px; background-color: white;"></div>
<div style="width:100%; height: 2px; background-color: #266493;"></div>
<%}else{ %>
<div style="width:100%; height: 3px; background-color: white;"></div>
<%} %>
<%if(smemInfo.size() >= 15){%>
<div style="width:100%; height: 2px; background-color: #266493; position: fixed; bottom: 0px;"></div>	
<%} %> --%>


<!-- fixed area Start -->
<%if(smemInfo != null && !smemInfo.isEmpty()){ %>
<div style="position: fixed; bottom: 0px; background-color: #8E8E8E; width: 100%; color: white; height: 18px;">
			<table style="width: 100%; top: 0px; height: 15px; border-spacing: 0px; vertical-align: baseline; margin-top: 0px;">
				<tr style="height: 15px;">
					<td style="height: 15px;text-align: center; cursor: default; font-weight: bolder; width: 3%; line-height: 1.4em;">
						-
					</td>
					<td style="top:0px; height: 15px;text-align: center; cursor: default; font-weight: bolder; width: 19%; line-height: 1.4em;" title="SUM">
						SUM
					</td>
					<td style="top:0px;height: 15px;text-align: center; cursor: default; font-weight: bolder; width: 13%; line-height: 1.4em;" title="<%=profileUtils.zeroToDashMark(df.format(ussStart))%>">
						<%=profileUtils.zeroToDashMark(df.format(ussStart))%>
					</td>
					<td style="top:0px;height: 15px;text-align: center; cursor: default; font-weight: bolder; width: 13%; line-height: 1.4em;" title="<%=profileUtils.zeroToDashMark(df.format(ussEnd))%>">
						<%=profileUtils.zeroToDashMark(df.format(ussEnd))%>
					</td>
					<td style="top:0px;height: 15px;text-align: center; cursor: default; font-weight: bolder; width: 13%; line-height: 1.4em;" title="<%=profileUtils.addPlusMark(df.format(ussDiff))%> KB">
						<%=profileUtils.addPlusMark(df.format(ussDiff))%> KB
					</td>
					<td style="top:0px;height: 15px;text-align: center; cursor: default; font-weight: bolder; width: 13%; line-height: 1.4em;" title="<%=profileUtils.zeroToDashMark(df.format(pssStart))%>">
						<%=profileUtils.zeroToDashMark(df.format(pssStart))%>
					</td>
					<td style="top:0px;height: 15px;text-align: center; cursor: default; font-weight: bolder; width: 13%; line-height: 1.4em;" title="<%=profileUtils.zeroToDashMark(df.format(pssEnd))%>">
						<%=profileUtils.zeroToDashMark(df.format(pssEnd))%>
					</td>
					<td style="top:0px;height: 15px;text-align: center; cursor: default; font-weight: bolder; width: 13%; line-height: 1.4em;" title="<%=profileUtils.addPlusMark(df.format(pssDiff))%> KB">
						<%=profileUtils.addPlusMark(df.format(pssDiff))%> KB
					</td>
				</tr>
			</table>
</div>

<div style="position: fixed; top:0px; background-color: white;">

<div style="margin-top: 0px;">
	<table style="width: 100%; height: 100%; table-layout: fixed;">
		<thead>
			<tr>
				<th style="width: 3%" rowspan="2">
				</th>
				<th style="width: 19%" rowspan="2">
					<span class="sortButton" id="process" onclick="javascript:viewSortedTable('process')" title="Descending order sort">Process</span>
				</th>
				<th style="width: 39%" colspan="3">
					USS <span style="font-weight: normal;">(Unique Set Size)</span>
				</th>
				<th style="width: 39%" colspan="3">
					PSS <span style="font-weight: normal;">(Proportional Set Size)</span>
				</th>
			</tr>
			<tr>
				<th style="width: 13%">
					<span class="sortButton" id="uss_start" onclick="javascript:viewSortedTable('uss_start')" title="Descending order sort">Start</span>
				</th>
				<th style="width: 13%">
					<span class="sortButton" id="uss_end" onclick="javascript:viewSortedTable('uss_end')" title="Descending order sort">End</span>
				</th>
				<th style="width: 13%">
				    <span class="sortButton" id="s_uss_diff" onclick="javascript:viewSortedTable('s_uss_diff')" title="Descending order sort">Difference</span>
				</th>
				<th style="width: 13%">
					<span class="sortButton" id="pss_start" onclick="javascript:viewSortedTable('pss_start')" title="Descending order sort">Start</span>
				</th>
				<th style="width: 13%">
					<span class="sortButton" id="pss_end" onclick="javascript:viewSortedTable('pss_end')" title="Descending order sort">End</span>
				</th>
				<th style="width: 13%">
				    <span class="sortButton" id="s_pss_diff" onclick="javascript:viewSortedTable('s_pss_diff')" title="Descending order sort">Difference</span>
				</th>
			</tr>
		</thead>
	</table>
</div>
</div>
<%} %>
<!-- fixed area End -->
</body>
<script type="text/javascript">
document.getElementById('<%=sortParam%>').setAttribute("class","sortedButton");
if('<%=order%>' == 'desc'){
document.getElementById('<%=sortParam%>').setAttribute("title","Ascending order sort");
}else{
document.getElementById('<%=sortParam%>').setAttribute("title","Descending order sort");	
}
</script>
</html>