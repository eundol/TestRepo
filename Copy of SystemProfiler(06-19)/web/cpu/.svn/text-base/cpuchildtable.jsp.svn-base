<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" import="java.util.*"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
	String command = (String)request.getAttribute("command");
	String symbol = (String)request.getAttribute("symbol");
	String child = (String)request.getAttribute("child");
	String overhead = (String)request.getAttribute("overhead");
	String srcLine = (String)request.getAttribute("srcLine");
	
	ArrayList<String> childArray = null;
	
	if(child != null && !child.equals("")){
		
		child = child.replace(symbol+":::", ";");
		StringTokenizer stChild = null;
		stChild = new StringTokenizer(child,";",false);
		
		childArray = new ArrayList<String>();
		
		while(stChild.hasMoreElements()){
			childArray.add(stChild.nextToken());
		}
	}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=8; charset=UTF-8">
<style type="text/css">
body {
	margin: 0;
	padding: 0;
	font: bold 13px/1.5em Verdana;
	height: 100%;
	background-color: #F4F4F4;
	width: 100%;
	overflow-x: hidden; 
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
      height: 20px
    }
</style>
<title>Info</title>
</head>
<body>
<div>
<%-- 	<div style="background-color: #2F7ED8; padding-top: 3px; padding-bottom: 3px;">
	<font style="font-family: 'Lucida Grande', 'Lucida Sans Unicode', Verdana, Arial, Helvetica, sans-serif; color:white; font-size:14px;">
	&nbsp;&nbsp;&nbsp;&nbsp;<%=command%> : <%=symbol%>
	</font>
	</div>
	<br> --%>
	<div style="width:100%; height: 2px; background-color: white; position: fixed; top: 0px;">
	</div>
	<div  style="width: 100%; position: fixed; top: 0px;">
		<table width="100%">
				<tr>
					<th style="text-align: left;">
	<!-- 	<font style="font-family: 'Lucida Grande', 'Lucida Sans Unicode', Verdana, Arial, Helvetica, sans-serif; color:#B22222; font-size:16px;">
		</font> -->
		&nbsp;&nbsp;&nbsp;&nbsp;Call Chain Info - <%=symbol%>
					</tr>
				<tr>
		</table>
	</div>
	<div  style="width: 100%; top: 0px;">
		<table width="100%">
				<tr>
					<th style="text-align: left;">
	<!-- 	<font style="font-family: 'Lucida Grande', 'Lucida Sans Unicode', Verdana, Arial, Helvetica, sans-serif; color:#B22222; font-size:16px;">
		</font> -->
		&nbsp;&nbsp;&nbsp;&nbsp;Call Chain Info - <%=symbol%>
					</tr>
				<tr>
		</table>
	</div>
	
<%if(srcLine != null && !srcLine.equals("")){%> 
	<div style="margin-top: 3px; color: #B22222;">
		<b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Src Line : <%=srcLine%></b>
	</div>
<%}%>

	<div style="margin-top: 3px;">
	<!-- <div style="height: 1px; background-color: #B22222;"></div> -->
	<%  int cnt = 0;
		ArrayList<String[]> compareChildArray = new ArrayList<String[]>();
		String[] printString = null;
		for(int i = 0; i < childArray.size() ; i++){
				cnt++;
				StringTokenizer compareChildSt = null;
				String[] childSet = childArray.get(i).replace(":::", ";").split(";");
				
			compareChildArray.add(childSet);	
		
			int flag = 0;
				if(i > 0){
					if(childArray.get(i).equals(childArray.get(i-1))){
						if(childArray.get(i).contains(":::")){
							flag = 1;
						  }else{%>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <%=childArray.get(i)%>
						<div style="height: 2px"></div>	<%
						continue;
						  }
					}else{
							for(int j = 0 ; j < compareChildArray.get(i).length ; j++){
								for(int z = 0 ; z < compareChildArray.get(i-1).length ; z++){
									if(compareChildArray.get(i)[j].equals(compareChildArray.get(i-1)[z])){
										flag++;
									}
								}
							}
						}
				}
			
			if(flag == 0){
		%>
		<div style="height: 2px"></div>
		
			<%if(childArray.get(i).equals("-")){cnt = 0;%>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color="#B22222">- No data were found to match this function.</font>
			<%}else{%>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <%=childArray.get(i)%>
			<div style="height: 2px"></div>
			<%}
			
			}else{
				printString = new String[compareChildArray.get(i).length];
				for(int x = 0 ; x < compareChildArray.get(i).length ; x++){
					printString[x] = compareChildArray.get(i)[x];
				}
				
				if(printString.length == 10){
				%>
				<font style="font-family: 'Lucida Grande', 'Lucida Sans Unicode', Verdana, Arial, Helvetica, sans-serif; color:#1AADCE; font-size:12px; padding-left: 430px; font-weight: lighter;">└&nbsp;
					<%=printString[9]%></font> 
			<%	
				}else if(printString.length == 9){
				%>
				<font style="font-family: 'Lucida Grande', 'Lucida Sans Unicode', Verdana, Arial, Helvetica, sans-serif; color:#1AADCE; font-size:12px; padding-left: 400px; font-weight: lighter;">└&nbsp;
					<%=printString[8]%></font> 
			<%	
				}else if(printString.length == 8){
				%>
				<font style="font-family: 'Lucida Grande', 'Lucida Sans Unicode', Verdana, Arial, Helvetica, sans-serif; color:#1AADCE; font-size:12px; padding-left: 370px; font-weight: lighter;">└&nbsp;
					<%=printString[7]%></font> 
			<%	
				}else if(printString.length == 7){
				%>
				<font style="font-family: 'Lucida Grande', 'Lucida Sans Unicode', Verdana, Arial, Helvetica, sans-serif; color:#1AADCE; font-size:12px; padding-left: 340px; font-weight: lighter;">└&nbsp;
					<%=printString[6]%></font> 
			<%	
				}else if(printString.length == 6){
				%>
				<font style="font-family: 'Lucida Grande', 'Lucida Sans Unicode', Verdana, Arial, Helvetica, sans-serif; color:#1AADCE; font-size:12px; padding-left: 310px; font-weight: lighter;">└&nbsp;
					<%=printString[5]%></font> 
			<%	
				}else if(printString.length == 5){
				%>
				<font style="font-family: 'Lucida Grande', 'Lucida Sans Unicode', Verdana, Arial, Helvetica, sans-serif; color:#1AADCE; font-size:12px; padding-left: 270px; font-weight: lighter;">└&nbsp;
					<%=printString[4]%></font> 
			<%	
				}else if(printString.length == 4){
				%>
				<font style="font-family: 'Lucida Grande', 'Lucida Sans Unicode', Verdana, Arial, Helvetica, sans-serif; color:#1AADCE; font-size:12px; padding-left: 220px; font-weight: lighter;">└&nbsp;
					<%=printString[3]%></font> 
			<%	}else if(printString.length == 3){
					%>
		
				<font style="font-family: 'Lucida Grande', 'Lucida Sans Unicode', Verdana, Arial, Helvetica, sans-serif; color:#2F7ED8; font-size:13px; padding-left: 160px; font-weight: normal;">└&nbsp;
					<%=printString[2]%></font>
					<%
				}else if(printString.length == 2){
					%>
		
				<font style="font-family: 'Lucida Grande', 'Lucida Sans Unicode', Verdana, Arial, Helvetica, sans-serif; color:#266493; font-size:14px; padding-left: 80px; font-weight: normal;">└&nbsp;
					<%=printString[1]%></font>
					<%
				}
		%>
		<br>
		<%  }
	}%>
	</div>
</div>
<div style="height: 20px;"></div>
<div style="position: fixed; bottom: 0px; background-color: #8E8E8E; width: 100%; color: white; text-align: center;">
ㆍLines : <%=cnt%>
ㆍOverhead : <%=overhead%>&nbsp;&nbsp;
</div>
<script type="text/javascript">
self.focus();
</script>
</body>
</html>