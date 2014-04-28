<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<!-- ****** Start of head ****** -->
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>LG Electronics SWP Lab - Tracker</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="Stylesheet" href="./css/bootstrap.css" />

<style>
</style>

<script src="http://code.jquery.com/jquery-1.7.1.js">
	
</script>
<script src="./js/bootstrap.js"></script>
<script src="./js/main.js"></script>
</head>
<!-- ****** End of head ****** -->

<!-- ****** Start of Body ****** -->
<body>
	<div class="wrap">
	
		<!-- ****** fixed toolBar ****** -->
		<div class="navbar navbar-inverse navbar-fixed-top">
			<div class="navbar-inner">
				<div class="container">
					<a class="brand" href="tIndex.jsp" onclick="onMouseClickBrand()">
						<style>
.brand {
	background-color: #4D4D4D;
	font-weight: bold;
}
</style> LG SWP Lab
					</a>

					<div class="nav-collapse collapse">
						<ul class="nav">
							<li><a href="tSummary.jsp" onclick="onMouseClick1()"
								name="list">Summary</a></li>
							<li><a href="tCommonPlatform.jsp" onclick="onMouseClick2()"
								name="list">CommonPlatform</a></li>
							<li><a href="tProductPlatform.jsp" onclick="onMouseClick3()"
								name="list">ProductPlatform</a></li>
							<li><a href="tComponent.jsp" onclick="onMouseClick4()"
								name="list">Component</a></li>

						</ul>
					</div>	<!-- ****** End of nav-collapse collapse  ******  -->
				</div>	<!--  ****** End of container  ******  -->
			</div>	<!--  ****** End of navbar-inner  ******  -->
		</div>	 <!--  ****** End of navbar-fixed-top  ******  --> 

		<!-- ****** fluid layout ****** -->
		<div class="container-fluid">
			<div class="hero-unit">
				<p>SWP lab DashBoard - Tracker **</p>
				<!--<p> contents </p>  -->
				<!-- <p><a href="#" class="btn btn-primary btn-large">Learn more>></a></p> -->
			</div>

		</div>

		<div class="push"></div>
	</div>

	<!-- ****** "fixed" footer ****** -->
	<div class="navbar navbar-inverse navbar-fixed-bottom">
		<div class="footer-inner">
			<div class="lg_electronics">
				Copyright 2013 LG Electronics. All Rights Reserved. <a
					href="http://collab.lge.com"> Collab </a> | <a href="index.jsp">SWP
					lab</a>
			</div>
		</div>
	</div>
	<!-- end of footer -->

</body>
<!-- ****** End of Body ****** -->
</html>