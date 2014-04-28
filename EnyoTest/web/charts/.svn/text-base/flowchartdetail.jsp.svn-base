<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="dataEntity.*"%>
<%@ page import="java.text.DecimalFormat" %>
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
<title>Enyo Test Report :: LG Electronics</title>
<script type="text/javascript" src="js/jquery-1.4.4.min.js"></script>
<script src="js/highcharts.js"></script>
<script src="js/highcharts-more.js"></script>
<script src="js/modules/exporting.js"></script>
</head>
<%
ArrayList<TestResultEntity> testResultList = (ArrayList<TestResultEntity>)request.getAttribute("testResultList");
String nameLast = "pie"; String nameSortLast = ""; String versionLast = ""; String start_timeLast = ""; int apiLast=0; int test_caseLast=0; int passLast=0; int failLast=0; int errorLast=0; String durationLast="";
String apiName = "";
if(!testResultList.isEmpty()){
	TestResultEntity entity = testResultList.get(testResultList.size()-1);
	nameLast = entity.getName();
	nameSortLast = entity.getNameSort();
	versionLast = entity.getVersion();
	start_timeLast = entity.getStart_time();
	apiLast = entity.getApi();
	apiName = entity.getApi_name().substring(entity.getApi_name().lastIndexOf(".")+1);
	test_caseLast = entity.getTest_case();
	passLast = entity.getPass();
	failLast = entity.getFail();
	errorLast = entity.getError();
	durationLast = entity.getDuration();		
}
String passData = ""; String failData = ""; String errorData = ""; String xCategories = "";
for(int i = 0 ; i < testResultList.size() ; i++){
	TestResultEntity entity = testResultList.get(i);
	passData += "" + entity.getPass()+ ",";
	failData += "" + entity.getFail()+ ",";
	errorData += "" + entity.getError()+ ",";
	xCategories += "'" + entity.getStart_time().substring(5,11).trim() + "<br>" 
					+ entity.getVersion().substring(entity.getVersion().indexOf("Enyo")) + "',";
}
passData = passData.substring(0, passData.length()-1);
failData = failData.substring(0, failData.length()-1);
errorData = errorData.substring(0, errorData.length()-1);
xCategories = xCategories.substring(0, xCategories.length()-1);
%>
<script type="text/javascript">
$(function () {
	
	// Radialize the colors
/* 	Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function(color) {
	    return {
	        radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
	        stops: [
	            [0, color],
	            [1, Highcharts.Color(color).brighten(0).get('rgb')] // darken
	        ]
	    };
	}); */
	
    $('#container2').highcharts({
    	credits: {
			  /* enabled : false */	   
    		text: 'SWP/LGSI lab.',
    		href: 'javascript:window.open("http://collab.lge.com/main/display/RCRTP/III.+Enyo+API+Test");'
	    },
        chart: {
            type: 'area'
        },
        title: {
            text: 'Enyo API Test - <%=apiName%>'
        },
        subtitle: {
            text: 'The latest Testing <%=apiName%> has done at <%=nameSortLast.substring(0,4)%>-<%=nameSortLast.substring(4,6)%>-<%=nameSortLast.substring(6,8)%> with <%=test_caseLast%> Testcases.',
            style: {
            	color: '#D9036A',
            },
            y:35
        },
        xAxis: {
            labels: {
                formatter: function() {
                    return this.value.substring(0,5).replace('-','/'); // clean, unformatted number for year
                }
            },
            categories: [<%=xCategories%>]
        },
        yAxis: {
            title: {
                text: 'Test Cases'
            },
            labels: {
                formatter: function() {
                    return this.value;
                }
            },
        },
        tooltip: {
            shared: true,
            valueSuffix: ' cases ',
            style:{
				fontWeight: 'normal'            	
            }
        },
        plotOptions: {
            area: {
            	stacking: 'normal',
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: [
        {
            name: 'Fail',
            data: [<%=failData%>],
            animation: {
                duration: 1800
            }
        }, {
            name: 'Error',
            data: [<%=errorData%>],
            animation: {
                duration: 1800
            }
        }, {
            name: 'Pass',
            data: [<%=passData%>],
                animation: {
                    duration: 1800
                }
        }]
    });
});
/**
 * Grid theme for Highcharts JS
 * @author Torstein Hønsi
 */

Highcharts.theme = {
   colors: ['#ED561B', '#50B432', '#058DC7', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
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
<div id="container2" style="width: 100%; height: 350px; margin: 0 auto"></div>
</body>
</html>