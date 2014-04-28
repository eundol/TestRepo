<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" import="java.util.*"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="entity.CpuEntity" %>
<% String id = (String)request.getAttribute("id"); %>
<% String commandSelected = (String)request.getAttribute("commandSelected"); %>
<% String pidSelected = (String)request.getAttribute("pidSelected"); %>
<% String cpuSelected = (String)request.getAttribute("cpuSelected"); %>
<% String symbolSelected = (String)request.getAttribute("symbolSelected"); %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=8; charset=UTF-8">
<title>Insert title here</title>
</head>
<frameset rows="*" cols="100%,*" border="5px" bordercolor="#ACACAC" id="cpuFrameset" frameborder="yes">
	<frame src="cputablefilter?id=<%=id%>&command=<%=commandSelected%>&pid=<%=pidSelected%>&cpu=<%=cpuSelected%>&symbol=<%=symbolSelected%>" id="frame1" name="frame1" noresize="noresize" frameborder="0"/>
	<frame src="" id="frame2" name="frame2" frameborder="0" style="visibility: visible;"/>
</frameset>
</html>