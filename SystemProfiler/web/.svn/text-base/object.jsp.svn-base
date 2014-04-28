<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" import="java.util.*" %>
<%@ page import="entity.CpuSearchEntity" %>
<% CpuSearchEntity entity = (CpuSearchEntity)request.getAttribute("cpuSearch"); %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Insert title here</title>
</head>
<body>
<font color="#24618E" title="">
<%if(entity != null){ %>
<%-- Test Case : <%=entity.getTestCaseId()%> - <%=entity.getCreated()%> &nbsp;&nbsp; User : <%=entity.getUserId()%> --%>
User : <%=entity.getUserId()%>&nbsp;&nbsp;
No.<%=entity.getId()%>&nbsp;&nbsp;
<%=entity.getTestCaseId()%> 
<%}else{%>
User : N/A
<%}%>
</font>
</body>
</html>