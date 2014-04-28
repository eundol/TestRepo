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
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
<script src="js/highcharts.js"></script>
<script src="js/highcharts-more.js"></script>
<script src="js/modules/exporting.js"></script>
<script src="js/main.js" charset="euc-kr"></script>
<%
	ArrayList<CpuEntity> list = (ArrayList<CpuEntity>)request.getAttribute("cpuFunction");
	String[] name = new String[7];
	String[] value = new String[7];
	
	for(int i = 0 ; i < list.size() ; i++){
		CpuEntity entity = list.get(i);
		name[i] = entity.getSymbol();
		value[i] = entity.getOverhead().replace("%", "");
	}
%>
<script type="text/javascript">
$(function () {
    $('#container2').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: 'CPU Usage (per function)',
             style:{
                color : '#B22222'
            }
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
	         
            categories: ['<%=name[0]%>', 
                         '<%=name[1]%>', 
                         '<%=name[2]%>', 
                         '<%=name[3]%>', 
                         '<%=name[4]%>', 
                         '<%=name[5]%>', 
                         '<%=name[6]%>'],
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
            maxPadding: 0.1,
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
 	            }
            }
        },
        tooltip: {
            valueSuffix: '%'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true,
                    formatter : function() {
    					var s = this.y + '%';
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
                   {y : <%=value[0]%>}, 
                   {y : <%=value[1]%>}, 
                   {y : <%=value[2]%>}, 
                   {y : <%=value[3]%>}, 
                   {y : <%=value[4]%>}, 
                   {y : <%=value[5]%>}, 
                   {y : <%=value[6]%>} 
                   ],
            animation: {
                   duration: 2000
                   }
        }]
    });
});
/**
 * Grid theme for Highcharts JS
 * @author Torstein Hønsi
 */

Highcharts.theme = {
   chart: {
      plotBackgroundColor: 'rgba(255, 255, 255, .9)',
      plotShadow: true,
   },
   subtitle: {
      style: {
         color: '#666666',
         font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
      }
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
	<div id="container2" style="width: 99.9%; height: 340px; margin: 0 auto;"></div>
</body>
</html>