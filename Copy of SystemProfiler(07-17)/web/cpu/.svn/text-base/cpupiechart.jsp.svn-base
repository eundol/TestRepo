<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="entity.*"%>
<%@ page import="java.text.DecimalFormat" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
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
<script type="text/javascript" src="js/jquery-1.4.4.min.js"></script>
<script src="js/highcharts.js"></script>
<script src="js/highcharts-more.js"></script>
<script src="js/modules/exporting.js"></script>
<script src="js/main.js" charset="euc-kr"></script>
</head>
<%
	IoEntity avgEntity = (IoEntity)request.getAttribute("avgEntity");
	String data = "";
	float maxTemp = 0.00f;
	String maxValue = "";
	
	if(avgEntity != null && avgEntity.getIdle() != null && !avgEntity.getIdle().equals("")){
			
		//100% 맞추기
		Float used = Float.parseFloat(avgEntity.getUser()) + 
				   Float.parseFloat(avgEntity.getNice()) +
				   Float.parseFloat(avgEntity.getSystem()) +
				   Float.parseFloat(avgEntity.getIowait()) +
				   Float.parseFloat(avgEntity.getSteal());
		if( used + Float.parseFloat(avgEntity.getIdle()) != 100){
			avgEntity.setIdle(String.valueOf(100 - used));			
		}
		
		//seleted 효과 위한 가장 큰 수(used내에서) 찾기 
		if(Float.parseFloat(avgEntity.getUser()) > maxTemp){
			maxTemp = Float.parseFloat(avgEntity.getUser());
			maxValue = "User";
		}
		if(Float.parseFloat(avgEntity.getNice()) > maxTemp){
			maxTemp = Float.parseFloat(avgEntity.getNice());
			maxValue = "Nice";
		}
		if(Float.parseFloat(avgEntity.getSystem()) > maxTemp){
			maxTemp = Float.parseFloat(avgEntity.getSystem());
			maxValue = "System";
		}
		if(Float.parseFloat(avgEntity.getIowait()) > maxTemp){
			maxTemp = Float.parseFloat(avgEntity.getIowait());
			maxValue = "Iowait";
		}
		if(Float.parseFloat(avgEntity.getSteal()) > maxTemp){
			maxTemp = Float.parseFloat(avgEntity.getSteal());
			maxValue = "Steal";
		}
		
		//data 문자열 완성
		if(!avgEntity.getIdle().equals("0.00")){
			data += "['Idle',"+ avgEntity.getIdle() + "],";
		}
		if(!avgEntity.getUser().equals("0.00")){
			if(maxValue.equals("User")){
				data += "{name: 'User',y:"+avgEntity.getUser()+",sliced: true,selected: true},";
			}else{
			data += "['User',"+ avgEntity.getUser() + "],";
			}
		}
		if(!avgEntity.getSystem().equals("0.00")){
			if(maxValue.equals("System")){
				data += "{name: 'System',y:"+avgEntity.getSystem()+",sliced: true,selected: true},";
			}else{
			data += "['System',"+ avgEntity.getSystem() + "],";
			}
		}
		if(!avgEntity.getIowait().equals("0.00")){
			if(maxValue.equals("Iowait")){
				data += "{name: 'Iowait',y:"+avgEntity.getIowait()+",sliced: true,selected: true},";
			}else{
			data += "['Iowait',"+ avgEntity.getIowait() + "],";
			}
		}
		if(!avgEntity.getNice().equals("0.00")){
			if(maxValue.equals("Nice")){
				data += "{name: 'Nice',y:"+avgEntity.getNice()+",sliced: true,selected: true},";
			}else{
			data += "['Nice',"+ avgEntity.getNice() + "],";
			}
		}
		if(!avgEntity.getSteal().equals("0.00")){
			if(maxValue.equals("Steal")){
				data += "{name: 'Steal',y:"+avgEntity.getSteal()+",sliced: true,selected: true},";
			}else{
			data += "['Steal',"+ avgEntity.getSteal() + "],";
			}
		}
		data = data.substring(0, data.length()-1);
	}
%>
<script type="text/javascript">
$(function () {
	
	// Radialize the colors
	Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function(color) {
	    return {
	        radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
	        stops: [
	            [0, color],
	            [1, Highcharts.Color(color).brighten(-0.2).get('rgb')] // darken
	        ]
	    };
	});
	
	// Build the chart
    $('#container5').highcharts({
   	    credits: {
   			  enabled : false	   
   		   },
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: 'CPU Usage',
             style:{
                color : '#B22222'
            }
        },
        tooltip: {
            formatter: function() {
            	var tooltip = "";
            	if(this.point.name == 'Idle'){
            		var pointColor = "#039CB6";
            		tooltip = '<span style="color:' + pointColor + ';font-size:12px;font-weight:bold;">'+this.point.name+'</span> : '+ Highcharts.numberFormat(this.percentage,'2','.') +'<span style="color:gray; font-size:12px; font-weight:normal;"> %</span>';
            		tooltip += '<br><span style="font-weight:normal;font-size:10px">The CPU or CPUs were idle and</span>';
            		tooltip += '<br><span style="font-weight:normal;font-size:10px">the system did not have an outstanding disk I/O request.</span>';
            	}
            	if(this.point.name == 'User'){
            		var pointColor = "#C12A04";
            		tooltip = '<span style="color:' + pointColor + ';font-size:12px;font-weight:bold;">'+this.point.name+'</span> : '+ Highcharts.numberFormat(this.percentage,'2','.') +'<span style="color:gray; font-size:12px; font-weight:normal;"> %</span>';
            		tooltip += '<br><span style="font-weight:normal;font-size:10px">The CPU utilization that occurred</span>';
            		tooltip += '<br><span style="font-weight:normal;font-size:10px">while executing at the user level (application).</span>';
            	}
            	if(this.point.name == 'Nice'){
            		var pointColor = "#4ACB58";
            		tooltip = '<span style="color:' + pointColor + ';font-size:12px;font-weight:bold;">'+this.point.name+'</span> : '+ Highcharts.numberFormat(this.percentage,'2','.') +'<span style="color:gray; font-size:12px; font-weight:normal;"> %</span>';
            		tooltip += '<br><span style="font-weight:normal;font-size:10px">The CPU utilization that occurred</span>';
            		tooltip += '<br><span style="font-weight:normal;font-size:10px">while executing at the user level with nice priority.</span>';
            	}
            	if(this.point.name == 'System'){
            		var pointColor = "#288C0B";
            		tooltip = '<span style="color:' + pointColor + ';font-size:12px;font-weight:bold;">'+this.point.name+'</span> : '+ Highcharts.numberFormat(this.percentage,'2','.') +'<span style="color:gray; font-size:12px; font-weight:normal;"> %</span>';
            		tooltip += '<br><span style="font-weight:normal;font-size:10px">The CPU utilization that occurred</span>';
            		tooltip += '<br><span style="font-weight:normal;font-size:10px">while executing at the system level (kernel).</span>';
            	}
            	if(this.point.name == 'Iowait'){
            		var pointColor = "#ABAD00";
            		tooltip = '<span style="color:' + pointColor + ';font-size:12px;font-weight:bold;">'+this.point.name+'</span> : '+ Highcharts.numberFormat(this.percentage,'2','.') +'<span style="color:gray; font-size:12px; font-weight:normal;"> %</span>';
            		tooltip += '<br><span style="font-weight:normal;font-size:10px">the CPU or CPUs were idle during which</span>';
            		tooltip += '<br><span style="font-weight:normal;font-size:10px">the system had an outstanding disk I/O request.</span>';
            	}
            	if(this.point.name == 'Steal'){
            		var pointColor = "#CC6322";
            		tooltip = '<span style="color:' + pointColor + ';font-size:12px;font-weight:bold;">'+this.point.name+'</span> : '+ Highcharts.numberFormat(this.percentage,'2','.') +'<span style="color:gray; font-size:12px; font-weight:normal;"> %</span>';
            		tooltip += '<br><span style="font-weight:normal;font-size:10px">Involuntary wait by the virtual CPU or CPUs</span>';
            		tooltip += '<br><span style="font-weight:normal;font-size:10px"> while the hypervisor was servicing another virtual processor</span>';
            	}
                return tooltip;
            }
        },
        plotOptions: {
            pie: {
            	size : 141,
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    connectorColor: '#000000',
                    formatter: function() {
                        return '<span style="color:font-size:11px; font-weight:normal;">'+ this.point.name + '</span><br><span style="color: ; font-size:9px; font-weight:normal;">' + Highcharts.numberFormat(this.percentage,'2','.') +'</span><span style="color:gray; font-size:8px; font-weight:normal;"> %</span>';
                    },
                    title: {
                    	text: 'dddddd'
                    }
                },
                showInLegend: true
            }
        },
        series: [{
            type: 'pie',
            name: 'Usage',
            data: [
                   <%=data%>
            ],
        	animation: {
                duration: 1455
            }
        }],
    });
});

var idle = "CPU were idle and the system did not have an outstanding disk I/O request";
/**
 * Grid theme for Highcharts JS
 * @author Torstein Hønsi
 */

Highcharts.theme = {
   colors: ['#24cbe5', '#ED561B', '#50B432', '#DDDF00', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
   chart: {
      backgroundColor: {
         linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
         stops: [
            [0, 'rgb(255, 255, 255)'],
            [1, 'rgb(240, 240, 255)']
         ]
      },
      borderWidth: 1,
      plotBackgroundColor: 'rgba(255, 255, 255, .9)',
      plotShadow: true,
      plotBorderWidth: 1
   },
   subtitle: {
      style: {
         color: '#666666',
         font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
      }
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
      title: {
         style: {
            color: '#333',
            fontWeight: 'bold',
            fontSize: '12px',
            fontFamily: 'Trebuchet MS, Verdana, sans-serif'

         }
      }
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
         style: {
            color: '#333',
            fontWeight: 'bold',
            fontSize: '12px',
            fontFamily: 'Trebuchet MS, Verdana, sans-serif'
         }
      }
   },
   legend: {
      itemStyle: {
         font: '8pt Trebuchet MS, Verdana, sans-serif',
         color: 'black'

      },
      itemHoverStyle: {
         color: '#039'
      },
      itemHiddenStyle: {
         color: 'gray'
      },
/*       layout: 'vertical', */
      labelFormatter: function() {
          return '<span title=\"아아아아아아아아아\">' + this.name + '</span>';
      }
   },
   navigation: {
      buttonOptions: {
         theme: {
            stroke: '#CCCCCC'
         }
      }
   }
};

// Apply the theme
var highchartsOptions = Highcharts.setOptions(Highcharts.theme);
</script>
<body>
<center>
<div id="container5" style="width: 347px; height: 340px; margin: 0 auto"></div>
</center>
</body>
</html>