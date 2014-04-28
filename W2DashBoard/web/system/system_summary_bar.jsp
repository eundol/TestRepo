<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html style="height:98%; overflow:hidden">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>System Test :: LG Electronics</title>
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
	            [1, Highcharts.Color(color).brighten(-0.1).get('rgb')] // darken
	        ]
	    };
	});
	
    // Create the chart
    $('#system_summary_bar').highcharts({
    	credits: {
			  /* enabled : false */	   
  		text: 'SWP lab.',
  		href: 'javascript:window.open("http://collab.lge.com/main/pages/viewpage.action?pageId=6391855");'
	    },
        chart: {
            type: 'column'
        },
        legend: {
			reversed: true
        },
        title: {
            text: 'System Test - <span style="color:#01609A;font-size:15px;">Pass 48.4% (261/539)</span>'
        },
        /* subtitle: {
            text: 'Pass : 92%',
            style: {
            	color: '#01609A',
            	fontSize: '16px',
            	fontWeight: 'bold',
            },
            y: 38
        }, */
        xAxis: {
            categories: [
                'Home',
                'Call',
                'Settings',
                'Message',
                'Gallery',
                'Music',
                'IME',
                'Contact',
                'Clock',
                'VoiceMemo',
                'Wi-Fi',
                'Calendar',
                'Bluetooth',
                'Quick Settings'
             ],
 			 labels: {
 				rotation: -45 
 			 }       
        },
        yAxis: {
            min: 0,
            title: {
            	enabled: false
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        tooltip: {
        	formatter: function() {
                return '<b>'+ this.x +'</b><br/><b style="'+ this.point.color +'">'+ 
                this.series.name + ': ' + this.y +'</b> cases<br/>'/* +'Total: '+ this.point.stackTotal */;
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        textShadow: '0 0 3px black, 0 0 3px black'
                    }
                },
                shadow:true
            }
        },
        series: [
        // first stack 
		{
		    name: 'Fail',
		    data: [ 25, 26, 43, 39, 8, 31, 0, 50, 8, 12, 19, 5, 12, 0],
		    color: Highcharts.getOptions().colors[2]
		}, {
		    name: 'Pass',
		    data: [ 16, 37, 14, 23, 20, 15, 9, 30, 44, 15, 5, 24, 8, 1],
		    color: Highcharts.getOptions().colors[0]
		}
        // second stack 
		/* 	{
		    name: 'FC-2nd',
		    data: [0,1,0,0,1,0,1,1,7],
		    color: Highcharts.getOptions().colors[2],
		    stack: '2'
		}, {
		    linkedTo:':previous',
		    name: 'Pass',
		    data: [4,11,28,21,3,16,8,16,6],
		    color: Highcharts.getOptions().colors[0],
		    stack: '2'
		} */
        ]
    });
});

/**
 * Grid theme for Highcharts JS
 * @author Torstein Honsi
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
         color: '#666666'
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
<div id="system_summary_bar" style="width: 98%; height: 97%; margin: 0 auto"></div>
</body>
</html>