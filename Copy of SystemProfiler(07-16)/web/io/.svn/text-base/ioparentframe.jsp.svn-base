<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" import="java.util.*"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="entity.IoEntity" %>
<%@ page import="java.text.DecimalFormat" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=8; charset=UTF-8">
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
</style>

<!-- 실제로 iostat 결과 테이블 보여주는 페이지 : sequence를 선택하지 않은 경우(첫진입) 1번 sequence data를 가져옴 -->
<title>iostat Data **</title>

</head>
<script src="js/iotable.js" charset="euc-kr"></script>
<body>

<!-- iostatDataTable Start -->
<div style="width:100%; height: 2px; background-color: white; position: fixed; top: 0px;"></div>
<div style="width: 100%; height: 100%">
<table style="width: 100%; height: 100%; table-layout: fixed; overflow: hidden;">
	<thead>
		<tr>
			<th style="width: 2%">
			</th>
			<th style="width: 15%">
				Device
			</th>
			<th style="width: 5%">
				tps
			</th>
			<th style="width: 5%">
				read/s
			</th>
			<th style="width: 5%">
				wrtn/s
			</th>
			<th style="width: 5%">
				read
			</th>
			<th style="width: 5%">
				wrtn
			</th>
		</tr>
	</thead>
	<tbody>
	 <c:forEach items="${ioTable}" var="entity" varStatus="status">
		<tr class="basic">
			<td style="text-align: center;">
				${status.count}
			</td>
			<td style="text-align: left;" title="${entity.device}">
				${entity.device}
			</td>
			<td style="text-align: right;" title="${entity.tps}">
				&nbsp;&nbsp;${entity.tps}
			</td>
			<td style="text-align: right;" title="${entity.read_s}">
				${entity.read_s}
			</td>
			<td style="text-align: right;" title="${entity.wrtn_s}">
				${entity.wrtn_s}
			</td>
			<td style="text-align: right;" title="${entity.read}">
				&nbsp;&nbsp;${entity.read}
			</td>
			<td style="text-align: right;" title="${entity.wrtn}">
				&nbsp;&nbsp;${entity.wrtn}
			</td>
		</tr>
	</c:forEach>
	</tbody>
</table>
<table style="width: 100%; table-layout: fixed; position: fixed; top: 0px;">
	<thead>
		<tr>
			<th style="width: 2%">
			</th>
			<th style="width: 15%">
				Device
			</th>
			<th style="width: 5%">
				tps
			</th>
			<th style="width: 5%">
				read/s
			</th>
			<th style="width: 5%">
				wrtn/s
			</th>
			<th style="width: 5%">
				read
			</th>
			<th style="width: 5%">
				wrtn
			</th>
		</tr>
	</thead>
</table>
<div style="height: 20px;">
</div>

<div style="position: fixed; bottom: 0px; background-color: #8E8E8E; width: 100%; color: white; text-align: center;"></div>
</div>
<!-- iostatDataTable End -->
</body>
</html>