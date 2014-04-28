<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html style="height:98%; overflow:hidden">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Luna API Test :: LG Electronics</title>
<script src="../js/jquery-1.4.4.min.js"></script>
<script src="../js/highcharts.js"></script>
<script src="../js/highcharts-more.js"></script>
<script src="../js/modules/exporting.js"></script>
</head>
<body style="height:100%;">
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
    $('#luna_resolution_pie').highcharts({
    	credits: {
			  /* enabled : false */	   
		text: 'SWP lab.',
		href: 'javascript:window.open("http://collab.lge.com/main/pages/viewpage.action?pageId=6391855");'
	    },
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: 'Luna API Bug Resolution',
        },
        tooltip: {
        },
        plotOptions: {
            pie: {
            	size : "59%",
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
                showInLegend: true,
                shadow: false,
                center: ['50%', '54%'],
            }
        },
        legend: {
        },
        series: [{
            type: 'pie',
            name: 'Issues',
            data: [
				{name: 'Fixed', y: 78, sliced: true,selected: true},
				['Holding', 21],
				['Unresolved', 16],
				['False Positive', 11],
				['Won\'t Fix', 5],
				['Cannot Reproduce', 1],
				['Duplicate', 1]
            ],
        	animation: {
                duration: 1400
            }
        }],
    });
});

/**
 * Grid theme for Highcharts JS
 * @author Torstein Honsi
 */

Highcharts.theme = {
   colors: ['#20ADEA', '#ED561B', '#50B432', '#DDDF00', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
   chart: {
      backgroundColor: {
         linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
         stops: [
            [0, 'rgb(255, 255, 255)'],
            [1, 'rgb(240, 240, 255)']
         ]
      },
      borderWidth: 2,
      plotBackgroundColor: 'rgba(255, 255, 255, .9)',
      plotShadow: true,
      plotBorderWidth: 1
   },
   title: {
      style: {
         color: '#000',
         font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
      }
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
<div id="luna_resolution_pie" style="width: 98%; height: 97%; margin: 0 auto"></div>
</body>
</html>