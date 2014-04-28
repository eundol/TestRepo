<%@ page contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>

<head>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="generator" content="Namo WebEditor(Trial)">

<title>CommonPlatform</title>

<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="Stylesheet" href="./css/bootstrap.css" />

<style>
</style>

<script src="http://code.jquery.com/jquery-1.7.1.js">
	
</script>
<script src="./js/bootstrap.js"></script>
<script src="./js/main.js"></script>
</head>


<body>

	<!-- ****** Fixed ToolBar ****** -->
	<div class="navbar navbar-inverse navbar-fixed-top">
		<div class="navbar-inner">
			<div class="container">

				<!--  bootstrap.css ~ class : brand -->
				<a class="brand" href="gIndex.jsp" onclick="onMouseClickBrand()">LG
					SWP Lab</a>

				<div class="nav-collapse collapse">
					<ul class="nav">
						<li><a href="gSummary.jsp" onclick="onMouseClick1()"
							name="list">Summary</a></li>
						<li><a href="gCommonPlatform.jsp" onclick="onMouseClick2()"
							name="list">CommonPlatform</a></li>
						<li><a href="gProductPlatform.jsp" onclick="onMouseClick3()"
							name="list">ProductPlatform</a></li>
						<li class="component"><a href="gComponent.jsp"
							onclick="onMouseClick4()" name="list">
								<style>
.component {
	background-color: #4D4D4D;
	font-weight: bold;
}
</style> Component
						</a></li>


					</ul>
				</div>
				<!--/.nav-collapse -->

			</div>
			<!-- end of container -->
		</div>
		<!-- end of navbar-inner -->
	</div>
	<!-- end of navbar navbar-inverse navbar-fixed-top -->
	<!-- ********************************************* -->

	<br>
	<br>


	<!--  ****** include 3 jsp files ****** -->
	<!-- (1) Printe the Date -->
	<div class="gDatePrint">
		<jsp:include page="/datePrint"></jsp:include>
	</div>

	<div id="projectPerPush"
		style="float: left; margin-top: 30px; margin-left: 120px">
		<h6>
			<font color="black" size="3" face="맑은 고딕"> <u>Push Status</u></font>
		</h6>
	</div>
	
	<div id="pushChange" style="float: left; margin-top: 30px; margin-left: 570px">
		<h6>
			<font color="black" size="3" face="맑은 고딕"> <u>Push Tendency</u></font>
		</h6>
	</div>

	<!-- (2) Show Bar Chart -->
	<div id="gComponent_barChart">
		<jsp:include page="/componentBarChart" />
	</div>

	<!-- (3) Show Area Chart --> 
	<div id="gComponent_areaChart">
		<jsp:include page="/componentAreaChart" />
	</div> 

	<!-- (4) Show Table  -->
	<div id="gComponent_table" style="margin-left: 10px">
		<jsp:include page="/componentTable" />
	</div>


	<!-- ****** "fixed" footer ****** -->
	<div class="navbar navbar-inverse navbar-fixed-bottom">
		<div class="footer-inner">
			<div class="lg_electronics">
				Copyright 2013 LG Electronics. All Rights Reserved. <a
					href="http://collab.lge.com"> Collab </a> | <a href="gIndex.jsp">SWP
					lab</a>
			</div>
		</div>
	</div>
	<!-- end of footer -->

</body>


</html>
