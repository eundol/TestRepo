<%@page import="java.io.Writer"%>
<%@ page contentType="text/html; charset=EUC-KR" pageEncoding="EUC-KR"%>
<%@ page language="java"
	import="java.util.*, java.sql.*, javax.servlet.http.*, entity.ChangeInfo"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<% 
ArrayList<ChangeInfo> List = (ArrayList<ChangeInfo>)request.getAttribute("fullList");
String status = (String)request.getAttribute("status");
String project = (String)request.getAttribute("project");
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
	<script type="text/javascript" src="./js/popup.js"></script>
	<link rel = "stylesheet" type="text/css" href="./css/fullChanges.css">
<title>LG SWP Lab - Gerrit**</title>
</head>
<body bgcolor="#FFFBE6">

	<center>
	<div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: bold;">
	<%=project%> 
	<font color="#B22222"> - <%=status%> Changes **
	</font>
	</div>
	</center>
	<div class="line"></div>

<%
	if(List.isEmpty()){
%>
	<div style="font-style: normal; font-variant: normal; font-family: monospace; text-decoration: none;">&nbsp;<br>
	<%=status%>	Change 목록이 없습니다.
	</div>
<%
	}else{
		int size = List.size();
		String lastUpdateDate = null;
		
		for(int i = 0 ; i < size ; i++){
			
			ChangeInfo entity = List.get(i);		
			if(lastUpdateDate == null || lastUpdateDate.equals(entity.getLastUpdatedOn().substring(5, 10))){
			}else{
%>
			<div class="line2"></div>
<%
			}
			lastUpdateDate = entity.getLastUpdatedOn().substring(5, 10);
%>
		<div class="list">
			ㆍ<font style="font-style:normal;font-variant:normal;font-family:monospace;text-decoration:none;" title="Updated : <%= entity.getLastUpdatedOn().substring(5, 16)%>">[<%= entity.getLastUpdatedOn().substring(5, 10) %>]</font>
			  <a href="javascript:gerritPopup('<%=entity.getChangeId()%>')" title="<%=entity.getSubject()%>">	  
<%
			String subject = entity.getSubject();
			String changeStatus = entity.getStatus();
			
			if(changeStatus.equals("M")){
%>
			<font color="#0000EA" style="font-weight:bolder;">Merged</font>
		
<%				
			}else if(changeStatus.equals("A")){
%>
			<font color="#B22222" style="font-weight:bolder;">Abandoned</font>
<%				
			}else{
%>
			<font color="#8F8F8F" style="font-weight:bolder;">Open</font>
<%				
			}
			
			if(subject.length() > 70){
%>
			  <%= entity.getSubject().substring(0, 70)%>...
<%
			}else{
%>
			  <%= entity.getSubject()%>
<%
			}
%>			
			<!-- 클릭시 해당 tracker 페이지로 이동합니다(get 방식) -->
			</a>
			&nbsp;<font style="font-style:normal;font-variant:normal;font-family:monospace;text-decoration:none;" title="Send to email"><a href = "mailto:<%=entity.getPreferredEmail()%>">(<%=entity.getFull_name()%>)</a></font>
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