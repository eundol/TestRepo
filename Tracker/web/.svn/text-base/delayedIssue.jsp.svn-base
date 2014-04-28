<%@page import="java.io.Writer"%>
<%@ page contentType="text/html; charset=EUC-KR" pageEncoding="EUC-KR"%>
<%@ page language="java"
	import="java.util.*, java.sql.*, javax.servlet.http.*, entity.DelayIssue"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	ArrayList<DelayIssue> delayIssueList = (ArrayList<DelayIssue>)request.getAttribute("delayIssueList");
	String project = (String)request.getAttribute("project");
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
	<script type="text/javascript" src="./js/popup.js"></script>
	<link rel = "stylesheet" type="text/css" href="./css/delayissue.css"> 
<title>LG SWP Lab - Tracker**</title>
</head>
<body bgcolor="#FFFBE6">

	<center>
	<div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: bold;">
	<%=project%> 
	<font color="#B22222"> - Delayed Issue **
	</font>
	</div>
	</center>
	<div class="line"></div>

<%
	if(delayIssueList.isEmpty()){
%>
	<div style="font-style: normal; font-variant: normal; font-family: monospace; text-decoration: none;">&nbsp;<br>
	지연	Issue 목록이 없습니다.
	</div>
<%
	}else{
		int size = delayIssueList.size();
		String priority = null;
		
		for(int i = 0 ; i < size ; i++){
			DelayIssue entity = delayIssueList.get(i);
			if(priority == null){
				priority = entity.getPriority();
			}
			if(!priority.equals(entity.getPriority())){
%>
			<div class="line2"></div>					<!-- 우선순위가 다를시 회색선으로 구분합니다 -->
<% 	
			   priority = entity.getPriority();
			}
%>
		<div class="list" title="<%=entity.getSummary()%>">
			ㆍ<a href="javascript:jiraPopup('<%=entity.getIssue_Key()%>')">[<%=priority%>]
			<%
			String summary = entity.getSummary(); 
			if(summary.length() > 60){
%>
			  <%= entity.getSummary().substring(0, 60)%>...
<%
			}else{
%>
			  <%= entity.getSummary()%>
<%
			}
%>			  
			
			
			 
			<!-- 클릭시 해당 tracker 페이지로 이동합니다(get 방식) -->
			</a>
		</div>
<%
		}
	}	
%>
	<center>
	<div class="line3"></div>
	<br>
	<div>
		<a href="javascript:window.close()"><img src="./img/Extras-Close-icon.jpg" title="Close this page"></a>
		<!-- close 버튼 -->
	</div>
	<br>
	</center>
</body>
</html>