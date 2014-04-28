<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<style type="text/css">
html,body
{
  height: 100%;
  padding: 0px;
  margin: 0px;
}
body {
	margin: 0;
	padding: 0;
	font: bold 12px/1.5em Verdana;
	min-height: 100%;
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
#csv{
	color: #0000FF;
}
#csv:visited{
	color: #0000FF;
}
#csv:hover{
	color: #492970;
}
</style>
<title>Insert title here</title>
<script src="js/main.js" charset="euc-kr"></script>
<!-- Filter JS Start -->
	<script type="text/javascript" src='./js/jquery-1.4.4.min.js'></script>
	<!-- custom select plugin js -->
	<script type="text/javascript" src='./js/cust_select_plugin.js'></script>
	<link rel="stylesheet" type="text/css" href="./css/style.css">
	<!--[if lt IE 8]>
		<link rel="stylesheet" type="text/css" href="./css/ie_style.css" >
	<![endif]-->
<!-- Filter JS End -->	
</head>
<body>
<div id="filterContainer" style="visibility: hidden; height: 0px; float: inherit;">
<form action="" method="post" target="frame1">
		<div style="margin-left: 20px">
		<table style="text-align: center; vertical-align: top;" border="1" bordercolor="blue">
			<tr>
				<td valign="top">
					<div class="select_wrap" style="float: left;padding-left: 0px; display: inline;">
						<select name="sample_select" class="select_field" multiple="multiple" style="min-width: 500px">
							<option>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							Command
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							</option>
							<option value="1" style="text-align: left;">Option One</option>
							<option value="2">Option Two</option>
							<option value="3">Option Three</option>
							<option value="4">Option Four</option>
							<option value="4">Option Four</option>
							<option value="4">Option Four</option>
							<option value="4">Option Four</option>
							<option value="4">Option Four</option>
							<option value="4">Option Four</option>
							<option value="4">Option Four</option>
							<option value="4">Option Four</option>
							<option value="4">Option Four</option>
							<option value="4">Option Four</option>
							<option value="4">Option Four</option>
							<option value="4">Option Four</option>
						</select>
					</div>
				</td>
				<td valign="top">
					<div class="select_wrap" style="float: left;padding-left: 5px; display: inline;">
						<select name="sample_select"  class="select_field" multiple="multiple">
							<option>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							Pid
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							</option>
							<option value="1">Option One</option>
							<option value="2">Option Two</option>
							<option value="3">Option Three</option>
							<option value="4">Option Four</option>
							<option value="4">Option Four</option>
							<option value="4">Option Four</option>
							<option value="4">Option Four</option>
							<option value="4">Option Four</option>
							<option value="4">Option Four</option>
							<option value="4">Option Four</option>
							<option value="4">Option Four</option>
							<option value="4">Option Four</option>
							<option value="4">Option Four</option>
							<option value="4">Option Four</option>
							<option value="4">Option Four</option>
						</select>
					</div>
				</td>
				<td valign="top">
					<div class="select_wrap" style="float: left;padding-left: 5px; display: inline;">
						<select name="sample_select"  class="select_field" multiple="multiple">
							<option>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							Cpu
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							</option>
							<option value="2">Option Two</option>
							<option value="3">Option Three</option>
							<option value="4">Option Four</option>
							<option value="4">Option Four</option>
							<option value="4">Option Four</option>
							<option value="4">Option Four</option>
							<option value="4">Option Four</option>
							<option value="4">Option Four</option>
							<option value="4">Option Four</option>
							<option value="4">Option Four</option>
							<option value="4">Option Four</option>
							<option value="4">Option Four</option>
							<option value="4">Option Four</option>
							<option value="4">Option Four</option>
						</select>
					</div>
				</td>
				<td valign="top">
					<div class="select_wrap" style="float: left;padding-left: 5px; display: inline;">
						<select name="sample_select"  class="select_field" multiple="multiple">
							<option>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							Symbol
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							</option>
							<option value="1">Option One</option>
							<option value="2">Option Two</option>
							<option value="3">Option Three</option>
							<option value="4">Option Four</option>
							<option value="4">Option Four</option>
							<option value="4">Option Four</option>
							<option value="4">Option Four</option>
							<option value="4">Option Four</option>
							<option value="4">Option Four</option>
							<option value="4">Option Four</option>
							<option value="4">Option Four</option>
							<option value="4">Option Four</option>
							<option value="4">Option Four</option>
							<option value="4">Option Four</option>
							<option value="4">Option Four</option>
						</select>
					</div>
				</td>
			</tr>
		</table>
		</div>
	<div style="height: 3px;"></div>
</form>
</div>
</body>
</html>