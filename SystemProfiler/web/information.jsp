<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%String inputId = (String)session.getAttribute("id"); %>
<%String object = "/object?id=" + inputId; %>
<%System.out.println("INFORMATION-TAB 접속IP : " + request.getRemoteAddr());%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="./css/basic.css" type="text/css" />
<style type="text/css">
body {
	margin: 0;
	padding: 0;
	font: bold 12px/1.5em Verdana;
	height: 100%;
}
h2 {
	font: bold 14px Verdana, Arial, Helvetica, sans-serif;
	color: #000;
	margin: 0px;
	padding: 0px 0px 0px 15px;
}
</style>
<title>Profile Viewer :: LG Electronics</title>
<script src="js/main.js" charset="euc-kr"></script>
<script type="text/javascript" src="js/jquery-1.4.4.min.js"></script>
<script src="js/highcharts.js"></script>
<script src="js/highcharts-more.js"></script>
<script type="text/javascript">
$(function () {
	
	/**
	 * Get the current time
	 */
	function getNow () {
	    var now = new Date();
	        
	    return {
	        hours: now.getHours() + now.getMinutes() / 60,
	        minutes: now.getMinutes() * 12 / 60 + now.getSeconds() * 12 / 3600,
	        seconds: now.getSeconds() * 12 / 60
	    };
	};
	
	/**
	 * Pad numbers
	 */
	function pad(number, length) {
		// Create an array of the remaining length +1 and join it with 0's
		return new Array((length || 2) + 1 - String(number).length).join(0) + number;
	}
	
	var now = getNow();
	
	// Create the chart
	$('#Clock').highcharts({
	
	    chart: {
	        type: 'gauge',
	        plotBackgroundColor: null,
	        plotBackgroundImage: null,
	        plotBorderWidth: 0,
	        plotShadow: false,
	        height: 200
	    },
	    
	    credits: {
	        enabled: false
	    },
	    
	    title:{
			text: ''	    	
	    },
	    
	    pane: {
	    	background: [{
	    		// default background
	    	}, {
	    		// reflex for supported browsers
	    		backgroundColor: Highcharts.svg ? {
		    		radialGradient: {
		    			cx: 0.5,
		    			cy: -0.4,
		    			r: 1.9
		    		},
		    		stops: [
		    			[0.5, 'rgba(255, 255, 255, 0.2)'],
		    			[0.5, 'rgba(200, 200, 200, 0.2)']
		    		]
		    	} : null
	    	}]
	    },
	    
	    yAxis: {
	        labels: {
	            distance: -20
	        },
	        min: 0,
	        max: 12,
	        lineWidth: 0,
	        showFirstLabel: false,
	        
	        minorTickInterval: 'auto',
	        minorTickWidth: 1,
	        minorTickLength: 5,
	        minorTickPosition: 'inside',
	        minorGridLineWidth: 0,
	        minorTickColor: '#666',
	
	        tickInterval: 1,
	        tickWidth: 2,
	        tickPosition: 'inside',
	        tickLength: 10,
	        tickColor: '#666',
	        title: {
	            text: 'Powered by<br/>Highcharts',
	            style: {
	                color: '#BBB',
	                fontWeight: 'normal',
	                fontSize: '8px',
	                lineHeight: '10px'                
	            },
	            y: 10
	        }       
	    },
	    
	    tooltip: {
	    	formatter: function () {
	    		return this.series.chart.tooltipText;
	    	}
	    },
	
	    series: [{
	        data: [{
	            id: 'hour',
	            y: now.hours,
	            dial: {
	                radius: '60%',
	                baseWidth: 4,
	                baseLength: '95%',
	                rearLength: 0
	            }
	        }, {
	            id: 'minute',
	            y: now.minutes,
	            dial: {
	                baseLength: '95%',
	                rearLength: 0
	            }
	        }, {
	            id: 'second',
	            y: now.seconds,
	            dial: {
	                radius: '100%',
	                baseWidth: 1,
	                rearLength: '20%'
	            }
	        }],
	        animation: false,
	        dataLabels: {
	            enabled: false
	        }
	    }]
	}, 
	                                 
	// Move
	function (chart) {
	    setInterval(function () {
	        var hour = chart.get('hour'),
	            minute = chart.get('minute'),
	            second = chart.get('second'),
	            now = getNow(),
	            // run animation unless we're wrapping around from 59 to 0
	            animation = now.seconds == 0 ? 
	                false : 
	                {
	                    easing: 'easeOutElastic'
	                };
	                
	        // Cache the tooltip text
	        chart.tooltipText = 
				pad(Math.floor(now.hours), 2) + ':' + 
	    		pad(Math.floor(now.minutes * 5), 2) + ':' + 
	    		pad(now.seconds * 5, 2);
	        
	        hour.update(now.hours, true, animation);
	        minute.update(now.minutes, true, animation);
	        second.update(now.seconds, true, animation);
	        
	    }, 1000);
	
	});
});

// Extend jQuery with some easing (copied from jQuery UI)
$.extend($.easing, {
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	}
});
</script>
<%@include file="header.jsp" %>
</head>
<body>

<!-- Title Start -->
<div style="background:#F4F4F4">
	<h2 onclick="javascript:location.href='information.jsp'" style="cursor: pointer;background:#F4F4F4; padding-top: 6px; color: #B22222; width: 130px">
		 <!-- Profile Viewer  -->
		<img alt="" src="./img/title12.png" style="width: 145%; height: 145%;">
	</h2>
</div>
<!-- Title End -->

<!-- Search Menu Start-->
<script type="text/javascript" src="./js/popup.js"></script>
<div style="width: 300px; height: 30px; background-color: #F4F4F4; position: absolute; top:12px; right:35px; text-align: right; vertical-align: middle; padding-top: 2px">
	Search&nbsp;&nbsp;
	<input id="inputText" type="text" style="width: 100px; height: 14px; color: gray; font-size: 11px" value=" User_ID" onkeypress="if(event.keyCode==13){javascript:searchPopup('cpu');}"
		   onclick="javascript:searchFocus();"
	>&nbsp;
	<img onclick="javascript:searchPopup('cpu');" 
	src="./img/search-icon.png" style="width:20px; hegiht:20px; vertical-align: bottom; cursor: pointer;" title="Search">
</div>
<!-- Search Menu End-->

<!-- Top Menu Start-->
<div id="tabsJ">
		<ul>
			<!-- <li><a href="overall.jsp" title="Overall Report"><span>Overall Report</span></a></li> -->
			<li><a href="cpu.jsp" title="CPU"><span>&nbsp;&nbsp;&nbsp;&nbsp;CPU&nbsp;&nbsp;&nbsp;</span></a></li>
			<li><a href="memory.jsp" title="Memory"><span>&nbsp;&nbsp;&nbsp;Memory&nbsp;&nbsp;</span></a></li>
			<li><a href="io.jsp" title="I/O"><span>&nbsp;&nbsp;&nbsp;&nbsp;I/O&nbsp;&nbsp;&nbsp;</span></a></li>
			<li><a href="pageowner.jsp" title="PageOwner"><span>&nbsp;&nbsp;&nbsp;PageOwner <b style="color:red;">*</b></span></a></li>
		</ul>
		<div style="float: left; position: absolute; right: 38px; margin-top : 3px; font: bold Verdana; font-size: 12px; background: #F4F4F4;">
			<jsp:include page="<%=object%>"></jsp:include>
		</div>
</div>
<div style="width: 100%; height: 1px; background-color: #E1E2E1; float: left;" id="grayLine"></div>
<!-- Top Menu End-->

<!-- board start-->
<div style="margin-top: 40px">
	&nbsp;&nbsp;&nbsp; <h2>SWP Lab. <font color="#B22222">Comments</font></h2>
<!-- board title end -->
	
	<div id="Clock" style="width: 300px; height: 190px; margin: 0 auto"></div>
	
	
<!-- board table start -->
	<div style="margin-top: 10px;">
	<jsp:include page="/freeboard"></jsp:include>
	</div>
<!-- board table end -->
</div>
<!-- board end -->
<div style="height: 88px;">
</div>
	<!-- ****** "fixed" footer ****** -->
	<div id="tabsJFooter">
		<div style="margin-top: 2px; font: 11px/1.5em Verdana;">
			Copyright 2013 LG Electronics. All Rights Reserved.
		 <a href="http://collab.lge.com/main/display/CC/CTO+Map" target="_blank"> Collab </a> | 
		 <a href="http://collab.lge.com/main/pages/viewpage.action?pageId=6391855" target="_blank">SWP lab </a> | 
		 <a href="http://10.177.235.70:3000/view/index" target="_blank">Log </a> | 
		 User Guide (<a href="http://collab.lge.com/main/pages/viewpage.action?pageId=157249528" target="_blank">KO</a>/<a href="http://collab.lge.com/main/pages/viewpage.action?pageId=157249637" target="_blank">EN</a>) 
		</div>
	</div>
	<!-- end of footer -->
</body>
</html>