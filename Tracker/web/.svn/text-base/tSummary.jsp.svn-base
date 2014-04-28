<%@ page contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="generator" content="Namo WebEditor(Trial)">

<title>Tracker Summary</title>

<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="Stylesheet" href="./css/bootstrap.css" />

<script src="http://code.jquery.com/jquery-1.7.1.js"></script>
<script src="./js/bootstrap.js"></script>
<script src="./js/main.js"></script>

</head>
<!-- ****** end of head ****** -->

<body>

	<!-- ****** Fixed ToolBar ****** -->
	<div class="navbar navbar-inverse navbar-fixed-top">
		<div class="navbar-inner">
			<div class="container">

				<!--  bootstrap.css ~ class : brand -->
				<a class="brand" href="tIndex.jsp" onclick="onMouseClickBrand()">LG
					SWP Lab</a>

				<div class="nav-collapse collapse">
					<ul class="nav">
						<li class="summary"><a href="tSummary.jsp"
							onclick="onMouseClick1()" name="list">
								<style>
.summary {
	background-color: #4D4D4D;
	font-weight: bold;
}
</style>Summary
						</a></li>
						<li><a href="tCommonPlatform.jsp" onclick="onMouseClick2()"
							name="list">CommonPlatform</a></li>
						<li><a href="tProductPlatform.jsp" onclick="onMouseClick3()"
							name="list">ProductPlatform</a></li>
						<li><a href="tComponent.jsp" onclick="onMouseClick4()"
							name="list"> Component </a></li>


					</ul>
				</div>

				<!--/.nav-collapse -->

			</div>
		</div>
	</div>

	<br>
	<br>

	<!-- ****** call servlet ****** -->
	<!--  ****** 1st line : PiChart + table ****** -->
	<div class="tSummary_piChart" style="float:left; width: 1700px; height: 350px;" >
		<jsp:include page="/summaryPiChart"></jsp:include>
		<jsp:include page="/summaryTable"></jsp:include>
	</div>
	
	<!-- ****** 2nd line : Ranking Table ****** -->
	<div class="tSummaryRanking" style="float:left; width: 1700px; height: 300px;">
		<jsp:include page="/summaryCreateRanking"></jsp:include>
		<jsp:include page="/summaryUpdateRanking"></jsp:include>
	</div>
	
	<!-- ****** "fixed" footer ****** -->
	<div class="navbar navbar-inverse navbar-fixed-bottom">
		<div class="footer-inner">
			<div class="lg_electronics">
				Copyright 2013 LG Electronics. All Rights Reserved. <a
					href="http://collab.lge.com"> Collab </a> | <a href="tIndex.jsp">SWP
					lab</a>
			</div>
		</div>
	</div>
	<!-- end of footer -->


</body>


</html>


