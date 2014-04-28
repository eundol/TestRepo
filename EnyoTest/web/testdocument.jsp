<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="java.io.*"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Enyo Test Report</title>
<style type="text/css">
.link{
	color: #0000FF;
}
.link:visited{
	color: #0000FF;
}
.link:hover{
	color: #492970;
}
</style>
</head>
<%
String contextUrl = request.getRequestURL().toString().replace("testdocument.jsp", "");
String documentFilePath = "";
if(request.getRequestURL().toString().contains("10.177.234.48") || request.getRequestURL().toString().contains("profilevu.lge.com")){
	documentFilePath = "/home/seadmin/workspace/EnyoTest/web/document/";
}else{
	documentFilePath = "C:/eun/workspace/EnyoTest/web/document/";
}
	File f = new File(documentFilePath);
	File[] fileList = f.listFiles();
	ArrayList<File> fileListSorted = new ArrayList<File>();
	int fileCount = 0;
	for(int i = 0 ; i < fileList.length ; i++){
		if(!fileList[i].getName().equals(".svn")){
			fileCount++;
			fileListSorted.add(fileList[i]);
		}
	}
	for(int i = 0 ; i < fileListSorted.size()-1 ; i++){
		for(int j = i+1 ; j < fileListSorted.size() ; j++){
			if((fileListSorted.get(j).getName()).compareTo(fileListSorted.get(i).getName()) < 0){
				File temp = fileListSorted.get(i);
				fileListSorted.set(i, fileListSorted.get(j));
				fileListSorted.set(j, temp);
			}
		}
	}
	System.out.println("Document Path : " + documentFilePath + ", Document Count : " + fileCount);
%>
<body>
<%=fileCount%> API Test documents
<%for(int i = 0 ; i < fileListSorted.size() ; i++){ 
	if(!fileListSorted.get(i).getName().equals(".svn")){%>
	<%-- <div style="margin-top: 5px;"><a href="download?filePath=<%=contextUrl%>document/<%=fileList[i].getName()%>&fileName=<%=fileList[i].getName()%>"> --%>
	<div style="margin-top: 7px;"><a href="download?filePath=<%=documentFilePath%><%=fileListSorted.get(i).getName()%>&fileName=<%=fileListSorted.get(i).getName()%>" class="link">
	<%=fileListSorted.get(i).getName()%></a></div>
<%}} %>
<br><br>
</body>
</html>