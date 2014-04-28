<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="dataEntity.*"%>
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
<title>Enyo Test Report :: LG Electronics</title>
<script type="text/javascript" src="js/jquery-1.4.4.min.js"></script>
<script src="js/highcharts.js"></script>
<script src="js/highcharts-more.js"></script>
<script src="js/modules/exporting.js"></script>
</head>
<%
ArrayList<TestResultEntity> testResultList = (ArrayList<TestResultEntity>)request.getAttribute("testResultList");
String name = "pie"; String nameSort = ""; String version = ""; String start_time = ""; int api=0; int test_case=0; int pass=0; int fail=0; int error=0; String duration;
double passRate = 0;
if(!testResultList.isEmpty()){
	TestResultEntity entity = testResultList.get(testResultList.size()-1);
	name = entity.getName();
	nameSort = entity.getNameSort();
	version = entity.getVersion();
	start_time = entity.getStart_time();
	api = entity.getApi();
	test_case = entity.getTest_case();
	pass = entity.getPass();
	fail = entity.getFail();
	error = entity.getError();
	duration = entity.getDuration();		
	passRate = ((double)pass / ((double)pass + (double)fail + (double)error)) * 100;
}
DecimalFormat df = new DecimalFormat("##.#");
%>
<script type="text/javascript">
$(function () {
	<%-- alert(<%=passRate%>); --%>
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
	
    $('#container1').highcharts({
    	credits: {
 			  /* enabled : false */	   
    		text: 'SWP/LGSI lab.',
    		href: 'javascript:window.open("http://collab.lge.com/main/display/RCRTP/III.+Enyo+API+Test");'
	    },
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            text: '<span style="font-size:14px;">Test Result</span><br><span style="font-size:12px;"><%=test_case%> Cases</span><br><span style="font-size:13px;color:#D9036A">* <%=nameSort.substring(0,4)%>-<%=nameSort.substring(4,6)%>-<%=nameSort.substring(6,8)%></span>',
            align: 'center',
            verticalAlign: 'middle',
            y: 50
        },
        tooltip: {
        	headerFormat: '',
            /* pointFormat: '<span style="font-size:13px;">{point.name} : {point.y} <span><span style="font-size:12px;">({point.percentage:.1f}%)</span>' */
        	pointFormat: '<span style="font-size:12px;font-weight:normal;">{point.percentage:.1f}%</span>'
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: -38,
                    style: {
                        fontWeight: 'bold',
                        color: 'white',
                        textShadow: '0px 1px 2px black'
              		  },
		      		/* format: '{point.name} - '  + '{y}', */
		      		formatter: function(){
		      			var result = this.point.name + " - " + this.point.y;
		      			if(this.point.name == "Pass"){
		      				/* result += " (" + this.point.percentage.toFixed(1) + "%)"; */
		      			}
	                	return result;
	                },
                }, 
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%'],
            }
        },
        series: [{
            type: 'pie',
            name: 'Percentage',
            innerSize: '45%',
            data: [
                ['Pass',  <%=pass%>],
                ['Fail',  <%=fail%>],
                ['Error', <%=error%>]
            ],
            animation: {
                duration: 2100
            }
        }],
        
    });
});

/**
 * Grid theme for Highcharts JS
 * @author Torstein Hønsi
 */

Highcharts.theme = {
   colors: ['#058DC7', '#ED561B', '#50B432', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
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
<div id="container1" style="width: 93%; height: 350px; margin: 0 auto"></div>
<div style="position: fixed; top: 40px; left:120px">
<span style="font-size: 21px; font-weight: bold; color:#274b6d; font-size-adjust: inherit;">Pass : <%=df.format(passRate)%><span style="font-weight:normal;font-size: 19px;">%</span></span>
</div>
</center>
</body>
</html>