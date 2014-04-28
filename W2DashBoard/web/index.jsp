<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<% String contextUrl = request.getRequestURL().toString();%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!--[if IE 7]><style>
body {background-position:0 -6px;}
</style><![endif]-->
<link rel="stylesheet" href="./css/basic.css" type="text/css" />
<link rel="stylesheet" href="./css/header.css" type="text/css" />
<link rel="stylesheet" href="./css/basic-layout.css" type="text/css" />
<style type="text/css" id="bsa_css">
	div.bsap_1258100{width:100%;display:block}div.bsap_1258100 a{width:728px}div.bsap_1258100 a img{padding:0}div.bsap_1258100 a em{font-style:normal}div.bsap_1258100 a{display:block;font-size:11px;color:#888;font-family:verdana,sans-serif;margin:0;text-align:center;text-decoration:none;overflow:hidden;}div.bsap_1258100 img{border:0;clear:right;}div.bsap_1258100 a.adhere{color:#666;font-weight:bold;font-size:12px;border:1px solid #ccc;background:#e7e7e7;text-align:center;}div.bsap_1258100 a.adhere:hover{border:1px solid #999;background:#ddd;color:#333;}div.bsap_1258100 a{line-height:100%}div.bsap_1258100 a.adhere{width:728px;height:90px;line-height:720%}html>body div.bsap_1258100 a.adhere{width:726px;height:88px}div.bsap_1258100 img.s{height:0;width:0}
</style>
<script type="text/javascript" src="./js/basic.js"></script>
<title>W2 Test Dashboard :: LG Electronics</title>
<link href="images/favicon.ico" rel="shortcut icon"/>
</head>
<body class="page-dashboard">
<!-- Header Warp -->
	<div id="metanav-background">
<!-- Header Contents -->
		<div id="metanav-allcontent" style="width:98%;">
			<div id="title-image" style="height:63px">
				<a href="javascript:switchTap('main');">
					<img src="images/w2logo(red2).jpg" alt="Icon Archive - Great icons for Win, Mac &amp; Linux" width="307" height="57">
				</a>
			</div>
			<div id="stock-icons" style="left: inherit; right:50px; cursor:default;">
				<a class="stock-icons-a-top">This is...&nbsp;▼</a>
				<div class="stock-icons-items" style="width:250px; cursor:default;">
					<ul>
						<li>
							<div class="stock-icons-items-img" style="cursor:default;">
								<a>
									<center>
									<img width="55%" height="55%" src="images/ugc.jpg">
									</center>
								</a>
							</div>
						</li>
						<li>
							<span style="text-align: left; cursor: default;font-size: 12px;">
								The DashBoard page created by SDET Team of SWP and LGSI lab.
							    This is showing the result of testing for W2 project.
						    </span>
							<div class="stock-icons-items-ad-here">
								<a href="http://collab.lge.com/main/display/RCRTP/Master+Test+Plan+for+W2" target="_blank">Contact Us</a>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="clear"></div>
<!-- Menu -->
			<ul id="topnav">
				<li class="first">
					<a id="bat"
					href="javascript:switchTap('bat');">&nbsp;&nbsp;&nbsp;BAT&nbsp;&nbsp;&nbsp;</a>
				</li>
				<li>
					<a id="static"
					href="javascript:switchTap('static');">Static Analysis</a>
				</li>
				<li>
					<a id="api" style="cursor: default;">&nbsp;&nbsp;API Test&nbsp;▼&nbsp;&nbsp;</a>
					<div class="topnavsub-category">
						<ul style="width:200px;">
							<li>
								<a id="luna"
								href="javascript:switchTap('luna');">&nbsp;Luna Service - <span style="color:#f64b6b">New!</span></a> 
							</li>
							<li>
								<a id="garnet"
								href="javascript:switchTap('garnet');">&nbsp;Garnet API - <span style="color:#f64b6b">New!</span></a>
							</li>
						</ul>
					</div>
				</li>
				<li class="last">
					<a id="system"
					href="javascript:switchTap('system');">System Test&nbsp;</a>
				</li>
				<div class="clear"></div>
			</ul>
		</div>
	</div>
	
	<div id="iframeWarpper">
		<iframe src="<%=contextUrl%>main.jsp" id="mainIframe" onload="javascript:reportContentSize(this)"></iframe>
	</div>	

	<div id="footerGap"></div>
<!-- ****** "fixed" footer ****** -->
	<div id="tabsJFooter" style="border-top-color: Gray;">
		<div style="margin-top: 2px; font: 11px/1.5em Verdana;">
			Copyright 2014 LG Electronics. All Rights Reserved.
		 <a href="http://collab.lge.com/main/display/CC/CTO+Map" target="_blank"> Collab </a> | 
		 <a href="http://collab.lge.com/main/pages/viewpage.action?pageId=6391855" target="_blank">SWP lab </a>
		</div>
	</div>
<!-- end of footer -->
</body>
</html>