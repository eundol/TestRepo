<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.text.SimpleDateFormat, java.util.Date;" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<%
String dresult = "";
if((Math.random()*10) > 7 ){
	dresult = "[0 , 152],[152 , 400],[400 , 451],[451 , 905],[905 , 1000]";
}else if((Math.random()*10) > 4){	
	dresult = "[0 , 20],[20 , 240],[240 , 710],[710 , 890],[890 , 1000]";
}else{
	dresult = "[0 , 110],[110 , 496],[496 , 551],[551 , 660],[660 , 1000]";
}
%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script type="text/javascript">
$(function () {
	
	$('#container4').highcharts({
	
	    chart: {
	        type: 'columnrange',
	        inverted: true
	    },
	    
	    title: {
	    	text: 'Duration Time',
            style:{
                color : '#B22222'
            }
	    },
	    
		subtitle: {
	        text: 'Cpu occupancy time of functions'
	    },
	
	    xAxis: {
	    	gridLineWidth: 1,
	        lineColor: '#000',
	        tickColor: '#000',
	        labels: {
	            style: {
	               color: '#000',
	               font: '11px Trebuchet MS, Verdana, sans-serif'
	            }
	         },
	         
	        categories: ['Function1', 'Function2', 'Function3', 'Function4', 'Function5'],
	    },
	    
	    yAxis: {
	    	minorTickInterval: 'auto',
	        lineColor: '#000',
	        lineWidth: 1,
	        tickWidth: 1,
	        tickColor: '#000',
	        labels: {
	            style: {
	               color: '#000',
	               font: '11px Trebuchet MS, Verdana, sans-serif'
	            }
	         },
	         
	        title: {
	            text: 'Time (millisecond)'
	        },
	        min : 0,
	        max : 1000
	    },
	
	    tooltip: {
	        valueSuffix: 'ms'
	    },
	    
	    plotOptions: {
	         columnrange: {
	        	dataLabels: {
	        		enabled: false,
	        		formatter: function () {
	        			return this.y  + 'ms';
	        		},
	        		inside:false,
	        		borderRadius: 5,
                    backgroundColor: 'rgba(252, 255, 197, 0.7)',
                    borderWidth: 1,
                    borderColor: '#AAA',
                    y : -3
	        	}
	        }
	    },
	    
	    legend: {
	        enabled: false
	    },
	
	    series: [{
	    	name: 'Duration',
	    	colorByPoint : true,
	        data: [<%=dresult%>],
	        animation: {
                duration: 1800
            }
	    }],
        credits: {
            enabled: false
        }
	});
    
});
</script>
</head>
<body>
<div id="container4" style="width: 90%; height: 325px; margin: 0 auto"></div>
</body>
</html>