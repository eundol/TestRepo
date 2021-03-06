<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ page import="java.util.*"%>
<%@ page import="entity.*"%>
<%@ page import="java.text.DecimalFormat"%>
<%@ page import="common.ProfileUtils"%>
<%
	ArrayList<MemEntity> memoryInfo = (ArrayList<MemEntity>)request.getAttribute("memoryInfo");
	String created = (String)(request.getAttribute("created"));
	
	DecimalFormat df = new DecimalFormat("###,###");
	long totalInt = 1;

	String Free = "[0,0,0]";
	String Used = "[0,0,0]";
/* 	String Cached = "[0,0,0]";
	String Buffers = "[0,0,0]"; */
	String startTime = "";
	String highestTime = "";
	String endTime = "";
	ProfileUtils profileUtils = new ProfileUtils();
	
	if(created != null && !created.equals("") && !created.equals("null") && !memoryInfo.isEmpty()){
	totalInt = memoryInfo.get(0).getTotal()/1024;
		
	//find highest sequence
	int hightestinx = 0;
	long usedTemp = 0;
	MemEntity entity = null;
		for(int inx = 0, size = memoryInfo.size() ; inx < size ; inx++){
			entity = memoryInfo.get(inx);
			if(entity.getUsed() > usedTemp){
				hightestinx = inx;
				usedTemp = entity.getUsed();
			}
		}
	Free = memoryInfo.get(0).getFree()/1024 + "," + memoryInfo.get(hightestinx).getFree()/1024 + "," + memoryInfo.get(memoryInfo.size()-1).getFree()/1024;
	Used = memoryInfo.get(0).getUsed()/1024 + "," + memoryInfo.get(hightestinx).getUsed()/1024 + "," + memoryInfo.get(memoryInfo.size()-1).getUsed()/1024;
	startTime = created.substring(11,19);
	highestTime = profileUtils.addSecondTime(created, hightestinx).substring(11,19);
	endTime = profileUtils.addSecondTime(created, memoryInfo.size()-1).substring(11,19);
	/* Cached = memoryInfo.get(0).getCached()/1024 + "," + memoryInfo.get(hightestinx).getCached()/1024 + "," + memoryInfo.get(memoryInfo.size()-1).getCached()/1024;
	Buffers = memoryInfo.get(0).getBuffers()/1024 + "," + memoryInfo.get(hightestinx).getBuffers()/1024 + "," + memoryInfo.get(memoryInfo.size()-1).getBuffers()/1024; */
	
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
	// Radialize the colors
	Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function(color) {
	    return {
	        radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
	        stops: [
	            [0, color],
	            [1, Highcharts.Color(color).brighten(-0.1).get('rgb')] // darken
	        ]
	    };
	});
	
    $('#container12').highcharts({
	   	credits: {
	         enabled: false
	    },
        chart: {
            type: 'column'
        },
        title: {
            text: 'Memory Usage Statistic'
        },
        subtitle: {
            text: 'The Memory Usage is the highest at <span style="text-decoration: underline;"><%=highestTime%></span>'
        },
        xAxis: {
            categories: ['Start <%=startTime%>', 'Highest <%=highestTime%>', 'End <%=endTime%>']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Percentage (%)'
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color};font-weight:normal;">{series.name}</span>: <span style="font-weight:normal;">{point.y}KB '+'({point.percentage:.0f}%)</span><br/>',
            shared: true
        },
        plotOptions: {
            column: {
                stacking: 'percent'
            }
        },
        series: [{
            name: 'Free',
            data: [<%=Free%>],
            animation: {
                duration: 2150
                },
     	    dataLabels: {
                    enabled: true,
                    color: '#FFFFFF',
                    align: 'center',
                    style: {
                        fontSize: '12px',
                        fontFamily: 'Trebuchet MS, Verdana, sans-serif'
                    },
                    formatter: function() {
                    	s = (this.y / <%=totalInt%>);
                        return Math.round(s * 100) + '%';
                    }
                }
        }, {
            name: 'Used',
            data: [<%=Used%>],
            animation: {
                duration: 2150
                },
            dataLabels: {
                enabled: true,
                color: '#FFFFFF',
                align: 'center',
                style: {
                    fontSize: '12px',
                    fontFamily: 'Trebuchet MS, Verdana, sans-serif'
                },
                formatter: function() {
                	s = (this.y / <%=totalInt%>);
                    return Math.round(s * 100) + '%';
                }
            }
        }
        <%-- , {
            name: 'Cached',
            data: [<%=Cached%>],
            animation: {
                duration: 1800
                }
        },{
            name: 'Buffers',
            data: [<%=Buffers%>] 
        }--%>
        ]
    });
});

/**
 * Grid theme for Highcharts JS
 * @author Torstein Hønsi
 */

Highcharts.theme = {
   colors: ['#24CBE5', '#ED561B', '#058DC7', '#50B432', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
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
	  minorTickInterval: 12.5,
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
<div id="container12" style="width: 98%; height: 315px; margin: 0 auto"></div>
</body>
</html>