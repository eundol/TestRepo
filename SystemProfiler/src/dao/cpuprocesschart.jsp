<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ page import="java.util.*"%>
<%@ page import="entity.*"%>
<%@ page import="java.text.DecimalFormat"%>
<%@ page import="common.ProfileUtils"%>
<%
	ArrayList<CpuEntity> cpuProcessInfo = (ArrayList<CpuEntity>)request.getAttribute("cpuProcessInfo");
	String categories = "";
	String data = "";
	String maxProcess = "";
	String maxProcessOverhead = "";
	int infoSize = 0;
if(cpuProcessInfo != null && !cpuProcessInfo.isEmpty()){
	infoSize = cpuProcessInfo.size();
	maxProcess = cpuProcessInfo.get(0).getCommand();
	maxProcessOverhead = cpuProcessInfo.get(0).getOverhead();
	for(int inx = 0 ; inx < cpuProcessInfo.size() ; inx++){
		categories += "'" + cpuProcessInfo.get(inx).getCommand() + "',";
		if(Integer.parseInt(cpuProcessInfo.get(inx).getOverhead().substring(0,cpuProcessInfo.get(inx).getOverhead().indexOf("."))) >= 10){
		data += "{y:" + cpuProcessInfo.get(inx).getOverhead() + ",color:'#ED561B'}" + ",";	
		}else{
		data += cpuProcessInfo.get(inx).getOverhead() + ",";
		}
	}
	categories = categories.substring(0, categories.length()-1);
	data = data.substring(0, data.length()-1);
}else{
	categories = "'hs'";
	data = "'0'";
}
%>
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
<script src="./js/highcharts.js"></script>
<script src="./js/highcharts-more.js"></script>
<script src="./js/modules/exporting.js"></script>
<script src="./js/main.js" charset="euc-kr"></script>
<script type="text/javascript">
$(function () {
    $('#containerProcess').highcharts({
   	   credits: {
   			  enabled : false	   
   		   },
        chart: {
            type: 'column'
/*             margin: [ 50, 50, 80, 100] */
        },
        title: {
            text: 'Usage per Process'
        },
        subtitle: {
            text: 'Top <%=infoSize%> processes are displayed - The highest process is <span style="text-decoration: underline;"><%=maxProcess%>\ (<%=maxProcessOverhead%>%)</span>'
        },
        xAxis: {
            categories: [
                <%=categories%>
            ],
            labels: {
                rotation: -45,
                align: 'right',
                style: {
                	fontWeight : 'normal',
                    fontSize: '11px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Usage (percentage)'
            },
            labels: {
                formatter: function() {
                    return  this.value + '%';
           		 }
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            formatter: function() {
                return '<b>'+ this.x +'</b><br/>'+
                    'Usage : '+ Highcharts.numberFormat(this.y, 2) +
                    '%';
            }
        },
        series: [{
            name: 'Population',
            data: [<%=data%>],
            dataLabels: {
                enabled: true,
                color: '#000000',
                align: 'center',
                x: 0,
                y: 0,
                style: {
                    fontSize: '10px',
                    fontFamily: 'Verdana, sans-serif',
                    fontWeight: 'normal'
                },
                formatter: function() {
                    return  this.y + '%';
           		 }
            },
            animation: {
                duration: 2550
                }
        }]
    });
});
Highcharts.theme = {
		   colors: ['#2F7ED8','#ED561B','#50B432','#DDDF00', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
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
		/*    plotOptions: {
		       series: {
		           marker: {
		               lineWidth: 0,
		               lineColor: null // inherit from series
		           }
		       }
		   }, */
		   title: {
		      style: {
		         color: '#B22222'
		         /* font: 'bold 16px "Trebuchet MS", Verdana, sans-serif' */
		      }
		   },
		   subtitle: {
		      style: {
		         color: '#666666',
		         font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
		      },
		      y : 35
		   },
		   xAxis: {
		      gridLineWidth: 1,
		      lineColor: '#000',
		      tickColor: '#000',
		      labels: {
		         style: {
		            color: '#000',
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
		      },
		      layout : 'vertical',
		      align: 'right',
		      verticalAlign: 'middle'
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
		   },
		};
		// Apply the theme
		var highchartsOptions = Highcharts.setOptions(Highcharts.theme);
</script>
</head>
<body>
<div id="containerProcess" style="width: 100%; height: 360px; margin: 0 auto"></div>
</body>
</html>