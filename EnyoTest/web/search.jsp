<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="dataEntity.*"%>
<%@ page import="java.text.DecimalFormat" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<%
ArrayList<TestResultEntity> testResultList = (ArrayList<TestResultEntity>)request.getAttribute("testResultList");
String nameSortLast = "";
ArrayList<TestResultEntity> testResultDetail = (ArrayList<TestResultEntity>)request.getAttribute("testResultDetail");
%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<script type="text/javascript">
	function setComponentList(){
		var componentSelect = document.getElementById("component");
		var originComponent = componentSelect.value;
		for(var i = componentSelect.options.length-1 ; i > -1 ; i--){
			componentSelect.options.remove(i);
		}
		componentSelect.options.add(createOption('All','All',originComponent));
		<%for(int i = 0 ; i < testResultDetail.size() ; i++){
			TestResultEntity entity = testResultDetail.get(i);%>
			if(document.getElementById("date").value == '<%=entity.getNameSort()%>'){
				componentSelect.options.add(createOption('<%=entity.getApi_name().substring(entity.getApi_name().lastIndexOf(".")+1)%>','<%=entity.getApi_name()%>',originComponent));
			}
		<%}%>
	}
	function createOption(text, value, origin){
		var addop = document.createElement("option");
		addop.text = text;
		addop.value = value;
 		if(origin == value){
			addop.selected = 'selected';
		}
		return addop;
	} 	
	function search(){
		/* var date = document.getElementById("date").value; */
		var component = document.getElementById("component").value;
		/* alert('search start~ date : ' + date + '  component : ' + component); */
		/* window.parent.document.getElementById("pieChartFrame").src = "piechart?date=" + date; */
		window.parent.document.getElementById("flowChartFrame").src = "flowchart?component=" + component;
	}
	
	
</script>
<body>
<form>
	<div style="margin-top:2px; font-weight:normal; font-size:12px; font-family: '맑은 고딕';">
 	<!-- Date : <select name="date" id="date" onchange="setComponentList()"> -->
<%for(int i = 0 ; i < testResultList.size(); i++){
	TestResultEntity entity = testResultList.get(i);
	if(i == testResultList.size()-1){ nameSortLast = entity.getNameSort();%>
		<%-- <option value="<%=entity.getNameSort()%>" selected="selected"><%=entity.getNameSort()%></option> --%>
	<%}else{%>
		<%-- <option value="<%=entity.getNameSort()%>"><%=entity.getNameSort()%></option> --%>
	<%}%>	
<%}%>
		<!-- </select>&nbsp;&nbsp;&nbsp; -->
		Component : <select name="component" id="component" onchange="javascript:search();">
		<option value="All" selected="selected">All</option>
<%
for(int i = 0 ; i < testResultDetail.size()-1 ; i++){
	for(int j = i+1 ; j < testResultDetail.size() ; j++){
		if((testResultDetail.get(j).getApi_name().substring(testResultDetail.get(j).getApi_name().lastIndexOf(".")+1)).compareTo(testResultDetail.get(i).getApi_name().substring(testResultDetail.get(i).getApi_name().lastIndexOf(".")+1)) < 0){
			TestResultEntity temp = testResultDetail.get(i);
			testResultDetail.set(i, testResultDetail.get(j));
			testResultDetail.set(j, temp);
		}
	}
}
for(int i = 0 ; i < testResultDetail.size(); i++){
	TestResultEntity entity = testResultDetail.get(i);
	if(entity.getNameSort().equals(nameSortLast)){
		if(!entity.getApi_name().contains("SetupTest")){%>
		<option value="<%=entity.getApi_name()%>"><%=entity.getApi_name().substring(entity.getApi_name().lastIndexOf(".")+1)%></option>
	<%}}%>
<%}%>
		</select>&nbsp;&nbsp;
		<!-- <img onclick="javascript:search();" src="./img/search-icon.png" style="width:20px; hegiht:20px; vertical-align: top; cursor: pointer; margin-top:0px;" title="Search"> --> 
	</div>
</form>
</body>
</html>