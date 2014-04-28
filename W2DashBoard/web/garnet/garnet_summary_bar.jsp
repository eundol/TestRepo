<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html style="height:98%; overflow:hidden">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Garnet API Test :: LG Electronics</title>
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
    $('#garnet_summary_bar').highcharts({
    	credits: {
			  /* enabled : false */	   
  		text: 'SWP lab.',
  		href: 'javascript:window.open("http://collab.lge.com/main/pages/viewpage.action?pageId=6391855");'
	    },
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Garnet API Test - <span style="color:#01609A;font-size:15px;">Pass 100% (147/147)<span>'
        },
        tooltip:{
        	shared: true
        },
        xAxis: {
            categories: [
'g.Confirmpopup',
'g.Icon',
'g.IconButton',
'g.Loading',
'g.Progress(=g.CircularProgresBar)',
'g.ProgressBar',
'g.ToggleButton',
'g.ToggleIconButton',
'g.WheelPicker',
'g.WheelPickerController',
'g.OverflowMenu',
'g.WheelSectionListController',
'g.Panel',
'g.PanelSet',
'g.ContextMenu(ContextualPopup)',
'g.TimePickerPanel',
'g.MultiPickerListPanel',
'g.DatePickerPanel',
'g.PickerPanel',
'g.WheelSliderPanel',
'g.PanelIndicator',
'g.Notification',
'g.ToastPopup'
              ]
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Test Cases'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            backgroundColor: '#FFFFFF',
            reversed: true,
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            floating: true,
            x: -5,
            y: 45
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
            series: [{
            name: 'Un-Tested',
            data: [
0,0,0,2,1,0,0,0,0,0,0,0,0,10,0,0,0,4,0,15,0,4,0
                   ]
        }, {
            name: 'Fail',
            data: [
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
                   ]
        }, {
            name: 'Pass',
            data: [
1,4,2,7,7,12,5,2,22,11,4,3,4,8,4,10,3,2,2,5,16,11,2
                   ]
        }]
    });
});

/**
 * Grid theme for Highcharts JS
 * @author Torstein Honsi
 */

Highcharts.theme = {
   colors: ['#FFF263', '#ED561B', '#20ADEA', '#DDDF00', '#64E572', '#FF9655', '#50B432', '#6AF9C4'],
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
      gridLineColor: "#DBDBDB",
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
     /*  minorTickInterval: 'auto', */
      gridLineColor: "#DBDBDB",
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
<div id="garnet_summary_bar" style="width: 98%; height: 97%; margin: 0 auto"></div>
</body>
</html>