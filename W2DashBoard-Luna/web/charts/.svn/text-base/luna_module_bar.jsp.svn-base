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
            text: 'Luna API Test Status'
        },
        /* subtitle: {
            text: 'Pass : 98%',
            style: {
            	color: '#01609A',
            	fontSize: '16px',
            	fontWeight: 'bold',
            },
            y: 38
        }, */
        xAxis: {
            categories: [
'Activity Manager',
'App Install Service',
'Application Manager',
'Configurator',
'DB8',
'Download Manager',
'File Cache',
'filenotifyd',
'filenotifyd.js',
'Logging (PmLogCtlD)',
'Logging (PmLogD)',
'Notification Manager',
'Connection Manager',
'WIFI',
'Input Manager',
'Sensor',
'Alarm',
'Calendar',
'Contact',
'Gallery',
'Music',
'Bluetooth',
'Audio',
'Media',
'Call',
'Data',
'Device Configuration',
'Device Usage',
'Location',
'NetworkState',
'SIM',
'SimPhoneBook',
'SMS'
],
            labels: {
                rotation: -45,
                align: 'right',
                style: {
                	fontSize: '13px',
                	fontFamily: 'Lucida Grande, Lucida Sans Unicode'
                }
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
		    data: [
0,
0,
0,
27,
12,
0,
0,
6,
0,
1,
0,
0,
0,
0,
0,
0,
7,
5,
33,
1,
3,
14,
31,
0,
17,
0,
0,
2,
4,
0,
1,
3,
3,
		           ],
		    color: Highcharts.getOptions().colors[2]
		}, {
		    name: 'Pass',
		    data: [
80,
13,
37,
16,
91,
17,
46,
25,
9,
46,
2,
81,
10,
15,
5,
20,
70,
45,
85,
91,
104,
234,
187,
40,
113,
1,
1,
11,
56,
30,
20,
43,
38,
],
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
   colors: ['#20ADEA', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
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
         /* font: 'bold 12px "Trebuchet MS", Verdana, sans-serif' */
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
