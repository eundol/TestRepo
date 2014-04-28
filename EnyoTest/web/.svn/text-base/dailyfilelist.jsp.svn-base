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
String contextUrl = request.getRequestURL().toString().replace("dailyfilelist.jsp", "");
String dailyFilePath = "";
if(request.getRequestURL().toString().contains("10.177.234.48") || request.getRequestURL().toString().contains("profilevu.lge.com")){
	dailyFilePath = "/home/seadmin/workspace/EnyoTest/web/report/";
}else{
	dailyFilePath = "C:/eun/workspace/EnyoTest/web/report/";
}
	File f = new File(dailyFilePath);
	File[] fileList = f.listFiles();
	ArrayList<File> fileListSorted = new ArrayList<File>();
	int fileCount = 0;
	for(int i = 0 ; i < fileList.length ; i++){
		if(fileList[i].isFile()){
			if(!(fileList[i].getName().equals(".svn")) && !(fileList[i].getName().substring(0, 2).equals("ST"))){
				fileCount++;
				fileListSorted.add(fileList[i]);
			}
		}
	}
	
	for(int i = 0 ; i < fileListSorted.size()-1 ; i++){
		for(int j = i+1 ; j < fileListSorted.size() ; j++){
			if(Integer.parseInt(fileListSorted.get(j).getName().substring(fileListSorted.get(j).getName().indexOf("Test")+7,fileListSorted.get(j).getName().indexOf("Test")+13)) < Integer.parseInt(fileListSorted.get(i).getName().substring(fileListSorted.get(i).getName().indexOf("Test")+7,fileListSorted.get(i).getName().indexOf("Test")+13))){
				File temp = fileListSorted.get(i);
				fileListSorted.set(i, fileListSorted.get(j));
				fileListSorted.set(j, temp);
			}
		}
	}
	System.out.println("Daily File Path : " + dailyFilePath + ", File Count : " + fileCount);
%>
<body>
<%=fileCount%> API Test Results
<%for(int i = fileListSorted.size()-1 ; i > -1 ; i--){ 
	if(!fileListSorted.get(i).getName().equals(".svn")){%>
	<div style="margin-top: 7px;"><a href="<%=contextUrl%>report/<%=fileListSorted.get(i).getName()%>" target="_blank" class="link">
	<%=fileListSorted.get(i).getName().substring(0, 18)%></a></div>
<%}} %>
<br><br>
</body>
</html>