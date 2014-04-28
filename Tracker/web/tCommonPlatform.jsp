<%@ page contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="generator" content="Namo WebEditor(Trial)">

<title>Tracker CommonPlatform</title>

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
						<li><a href="summary.jsp" onclick="onMouseClick1()"
							name="list">Summary</a></li>
						<li class="commonPlatform"><a href="commonplatform.jsp"
							onclick="onMouseClick2()" name="list">
								<style>
.commonPlatform {
	background-color: #4D4D4D;
	font-weight: bold;
}
</style> CommonPlatform
						</a></li>
						<li><a href="productplatform.jsp" onclick="onMouseClick3()"
							name="list">ProductPlatform</a></li>
						<li><a href="component.jsp" onclick="onMouseClick4()"
							name="list">Component</a></li>

					</ul>
				</div>
				<!--/.nav-collapse -->

			</div>
		</div>
	</div>

	<br>
	<br>


	<!--  ****** call servlet ****** -->		
	<!--  ****** 1st line : PiChart + table ****** -->
	<div class="tCommonPlatform_piChart" style="float:left; width: 1700px; height: 430px;" >
		<jsp:include page="/commonPiChart"></jsp:include>
		<jsp:include page="/commonTable"></jsp:include>
	</div>
	
	<!-- ****** 2nd line : Ranking Table ****** -->
	<div class="tCommonRanking" style="float:left; width: 1700px; height: 300px;">
		<jsp:include page="/commonCreateRanking"></jsp:include>
		<jsp:include page="/commonUpdateRanking"></jsp:include>
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
