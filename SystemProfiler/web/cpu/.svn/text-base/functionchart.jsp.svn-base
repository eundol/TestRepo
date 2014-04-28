<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="entity.*"%>
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
<title>Insert title here</title>
<script type="text/javascript" src="js/jquery-1.4.4.min.js"></script>
<script src="js/highcharts.js"></script>
<script src="js/highcharts-more.js"></script>
<script src="js/modules/exporting.js"></script>
<script src="js/main.js" charset="euc-kr"></script>
<%
	HashMap<String,String> top6ProcessMap = (HashMap<String,String>)request.getAttribute("functionMap");
	
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
	
    $('#top6process').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Top 6 Processes',
             style:{
                color : '#B22222'
            }
        },
        subtitle:{
			text: 'associated with webOS TV' 
        },
        xAxis: {
	        lineColor: '#000',
	        tickColor: '#000',
	        labels: {
	            style: {
	               color: '#000',
	               font: '12px Trebuchet MS, Verdana, sans-serif'
	            }
	         },
	         
            categories: ['Luna Service Hub',
                         'Luna Service Manager', 
                         'QtWebProcess', 
                         'Web App Manager',
                         'System & App Manager', 
                         'Activity Manager',],
            title: {
                text: null
            }
        },
        yAxis: {
            lineColor: '#000',
            lineWidth: 1,
            tickWidth: 1,
            tickColor: '#000',
            min: 0,
            maxPadding: 0.12,
            title: {
            	enabled: false,
                text: 'Usage',
                align: 'high'
            },
            labels: {
                overflow: 'justify',
                style: {
 	               color: '#000',
 	               font: '11px Trebuchet MS, Verdana, sans-serif'
 	            },
                formatter: function() {
                    return  this.value + '%';
           		}
            }
        },
        tooltip: {
        	formatter: function() {
            	var tooltip = "";
            		tooltip = '<span style="color:' + this.point.color + ';font-size:12px;font-weight:bold;">'+this.x+'</span> : '+ this.y +'<span style="color:gray; font-size:12px; font-weight:normal;"> %</span>';
                return tooltip;
            }
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true,
                    formatter : function() {
    					var s = this.y + '<span style="font-size:10px; font-weight:normal;"> %</span>';
    					return s;
    				},
    				borderRadius: 5,
                    backgroundColor: 'rgba(252, 255, 197, 0.7)',
                    borderWidth: 1,
                    borderColor: '#AAA',
                    y : -1
                }
            }
        },
        credits: {
            enabled: false
        },
        legend:{
        	enabled : false,
        	layout : 'vertical',
        	align : 'right',
        	verticalAlign: 'top',
            floating: true,
            borderWidth: 0,
            backgroundColor: '#FFFFFF'
        },
        series: [{
        	name: 'Usage',
        	colorByPoint : true,
            data: [
                   {y : <%=top6ProcessMap.get("ls-hubd")%>}, 
                   {y : <%=top6ProcessMap.get("surface-manager")%>}, 
                   {y : <%=top6ProcessMap.get("QtWebProcess")%>}, 
                   {y : <%=top6ProcessMap.get("WebAppMgr")%>}, 
                   {y : <%=top6ProcessMap.get("sam")%>},
                   {y : <%=top6ProcessMap.get("activitymanager")%>} 
                   ],
            animation: {
                   duration: 2550
                   }
        }]
    });
});
/**
 * Grid theme for Highcharts JS
 * @author Torstein Hønsi
 */

Highcharts.theme = {
colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
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
      },
      y : 35
   },
   xAxis: {
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
         font: '9pt Trebuchet MS, Verdana, sans-serif',
         color: 'black'

      },
      itemHoverStyle: {
         color: '#039'
      },
      itemHiddenStyle: {
         color: 'gray'
      }
   },
   labels: {
      style: {
         color: '#99b'
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
</head>
<body>	
	<div id="top6process" style="width: 99.9%; height: 340px; margin: 0 auto;"></div>
</body>
</html>