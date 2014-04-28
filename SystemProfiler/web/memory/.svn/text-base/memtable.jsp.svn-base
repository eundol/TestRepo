<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ page import="java.util.*"%>
<%@ page import="entity.*"%>
<%@ page import="java.text.DecimalFormat"%>
<%@ page import="common.ProfileUtils"%>
<%
	ArrayList<MemEntity> memoryInfo = (ArrayList<MemEntity>)request.getAttribute("memoryInfo");
	String created = (String)(request.getAttribute("created"));
	
	DecimalFormat df = new DecimalFormat("###,###");
	ProfileUtils profileUtils = new ProfileUtils();
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
</style>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script type="text/javascript">
function unitChange(unit){
	var percentage = document.getElementById("percentage");
	var byteSpan = document.getElementById("byte");
	var tbodyTR = document.getElementById("tbody").getElementsByTagName("tr");
	
	if(unit == "percentage"){
		percentage.setAttribute("onclick","");
		percentage.setAttribute("style","font-weight: bold; text-decoration: underline; font-size: 11px; cursor: default;");
		byteSpan.setAttribute("onclick","javascript:unitChange('byte')");
		byteSpan.setAttribute("style","font-weight: normal; text-decoration: none; font-size: 11px; cursor: pointer;");
		
		for(var i = 0, sizeI = tbodyTR.length ; i < sizeI ; i++){
			var tbodyTD = tbodyTR[i].getElementsByTagName("td");
			for(var j = 0 , sizeJ = tbodyTD.length ; j < sizeJ ; j++){
				var tdobyOneTd = tbodyTD[j];
				if(j != 1){
					var origin = tdobyOneTd.innerText;
					tdobyOneTd.innerText = tbodyTD[j].getAttribute("title");
					tdobyOneTd.setAttribute("title",origin);
				}
			}
		}
		
	}else{
		percentage.setAttribute("onclick","javascript:unitChange('percentage')");
		percentage.setAttribute("style","font-weight: normal; text-decoration: none; font-size: 11px; cursor: pointer;");
		byteSpan.setAttribute("onclick","");
		byteSpan.setAttribute("style","font-weight: bold; text-decoration: underline; font-size: 11px; cursor: default;");
		
		for(var i = 0, sizeI = tbodyTR.length ; i < sizeI ; i++){
			var tbodyTD = tbodyTR[i].getElementsByTagName("td");
			for(var j = 0 , sizeJ = tbodyTD.length ; j < sizeJ ; j++){
				var tdobyOneTd = tbodyTD[j];
				if(j != 1){
					var origin = tdobyOneTd.innerText;
					tdobyOneTd.innerText = tbodyTD[j].getAttribute("title");
					tdobyOneTd.setAttribute("title",origin);
				}
			}
		}
	}
	
}
</script>
</head>
<body>
<%if(memoryInfo != null && !memoryInfo.isEmpty()){ %>
	<div style="margin-top: 54px;">
	<table style="width: 100%; height: 100%; table-layout: fixed;">
		<thead>
			<tr>
				<th style="width: 5%">
				</th>
				<th style="width: 15%">
					Time
				</th>
				<th style="width: 23%">
					Used
				</th>
				<th style="width: 17%">
					Buffers
				</th>
				<th style="width: 17%">
					Cached
				</th>
				<th style="width: 23%">
					Free
				</th>
			</tr>
		</thead>
		<tbody id="tbody">
			<%
			MemEntity entity = null;
			long sequence = 0;
			long totalInt = memoryInfo.get(0).getTotal();
			long maxUsed = memoryInfo.get(0).getUsed();
			/* int minUsed = memoryInfo.get(0).getUsed();
			int minSequence = 0; */
			long maxSequence = 0;
			for(int inx = 0, size = memoryInfo.size() ; inx < size ; inx++){
				entity = memoryInfo.get(inx);
				sequence = entity.getSequence();
				/* if(minUsed > entity.getUsed()){
					minSequence = sequence;
					minUsed = entity.getUsed();
				} */
				if(maxUsed < entity.getUsed()){
					maxSequence = sequence;
					maxUsed = entity.getUsed();
				}
			%>
				<tr class="basic" id="tr<%=sequence%>">
					<td style="text-align: center; cursor: default;" title="<%=sequence%>">
						<%=sequence%>
					</td>
					<td style="text-align: center; cursor: default;" title="<%= profileUtils.addSecondTime(created,sequence-1)%>" id="except">
						<%= profileUtils.addSecondTime(created,sequence-1).substring(11,19) %>
					</td>
					<td style="text-align: center; cursor: default;" title="<%= ((double)(Math.round(((double)entity.getUsed() * 1000  / (double)totalInt))) / (double)10) %>%">
						<%= df.format(entity.getUsed()/1024) %> KB
					</td>
					<td style="text-align: center; cursor: default;" title="<%= ((double)(Math.round(((double)entity.getBuffers() * 1000  / (double)totalInt))) / (double)10) %>%">
						<%= df.format(entity.getBuffers()/1024) %> KB
					</td>
					<td style="text-align: center; cursor: default;" title="<%= ((double)(Math.round(((double)entity.getCached() * 1000  / (double)totalInt))) / (double)10) %>%">
						<%= df.format(entity.getCached()/1024) %> KB
					</td>
					<td style="text-align: center; cursor: default;" title="<%= ((double)(Math.round(((double)entity.getFree() * 1000  / (double)totalInt))) / (double)10) %>%">
						<%= df.format(entity.getFree()/1024) %> KB
					</td>
				</tr>
			<%} %>
		</tbody>
	</table>
	</div>	

<%if(memoryInfo.get(memoryInfo.size()-1).getSequence() < 14){%>
<div style="width:100%; height: 1px; background-color: white;"></div>
<div style="width:100%; height: 2px; background-color: #266493;"></div>
<%}else{ %>
<div style="width:100%; height: 3px; background-color: white;"></div>
<%} %>
<%if(memoryInfo.get(memoryInfo.size()-1).getSequence() >= 14){%>
<div style="width:100%; height: 2px; background-color: #266493; position: fixed; bottom: 0px;"></div>	
<%} %>

<!-- Fixed Area -->
	<div style="position: fixed; top:54px;">
	<table style="width: 100%; table-layout: fixed;">
		<thead>
			<tr>
				<th style="width: 5%">
				</th>
				<th style="width: 15%">
					Time
				</th>
				<th style="width: 23%">
					Used
				</th>
				<th style="width: 17%">
					Buffers
				</th>
				<th style="width: 17%">
					Cached
				</th>
				<th style="width: 23%">
					Free
				</th>
			</tr>
		</thead>
	</table>
	</div>
<div style="width:100%; height: 56px; background-color: white; position: fixed; top: 0px;"></div>

<div style="font-family: 'Lucida Grande', 'Lucida Sans Unicode', Verdana, Arial, Helvetica, sans-serif;
font-size: 16px; position: fixed; top:6px; width:100%; text-align:center; color: #B22222; ">Memory Usage Infomation (per second)</div>

<div style="position: fixed; top:30px; width:100%; text-align:center; font-family: 'Lucida Grande', 'Lucida Sans Unicode', Verdana, Arial, Helvetica, sans-serif;font-size: 12px;color: #666666;font: bold 12px 'Trebuchet MS', Verdana, sans-serif;"><%=created.substring(11,19)%> ~ <%=profileUtils.addSecondTime(created,memoryInfo.get(memoryInfo.size()-1).getSequence()-1).substring(11,19)%>
&nbsp;&nbsp;( Measured for <%=memoryInfo.get(memoryInfo.size()-1).getSequence()%> Seconds )
</div>

<div style="position: fixed; top:34px; width:100%; text-align:right; right: 13px; font-size: 11px; cursor: default; color: blue;">

<span onclick="javascript:unitChange('percentage')"
style="font-weight: normal; text-decoration: none; font-size: 11px; cursor: pointer;" id="percentage">%</span>
/
<span onclick=""
style="font-weight: bold; text-decoration: underline; font-size: 11px; cursor: default;" id="byte">Byte</span>

</div>

<script type="text/javascript">
	document.getElementById("tr"+<%=maxSequence%>).style.color = "red";
	document.getElementById("tr"+<%=maxSequence%>).style.fontWeight = "bold";
<%-- 	document.getElementById("tr"+<%=minSequence%>).style.color = "blue";
	document.getElementById("tr"+<%=minSequence%>).style.fontWeight = "bold"; --%>
</script>

<%}else{ %>
<!-- Fixed Area -->
	<div style="position: fixed; top:54px;">
	<table style="width: 100%; table-layout: fixed;">
		<thead>
			<tr>
				<th style="width: 5%">
				</th>
				<th style="width: 15%">
					Time
				</th>
				<th style="width: 23%">
					Used
				</th>
				<th style="width: 17%">
					Buffers
				</th>
				<th style="width: 17%">
					Cached
				</th>
				<th style="width: 23%">
					Free
				</th>
			</tr>
		</thead>
	</table>
	</div>
<div style="width:100%; height: 32px; background-color: white; position: fixed; top: 0px;"></div>
<div style="position: fixed; top:6px; width:100%; text-align:center; color: #B22222; font-size: 14px; font-weight: lighter;">N/A
</div>
<div style="position: fixed; top:30px; width:100%; text-align:center; font-family: 'Lucida Grande', 'Lucida Sans Unicode', Verdana, Arial, Helvetica, sans-serif;font-size: 12px;color: #666666;font: bold 12px 'Trebuchet MS', Verdana, sans-serif;">N/A
</div>
<%} %>
</body>
</html>