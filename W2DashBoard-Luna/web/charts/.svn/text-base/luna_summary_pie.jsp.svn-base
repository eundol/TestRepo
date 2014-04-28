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
	
    var colors = Highcharts.getOptions().colors,
        categories = ['Pass', 'Fail'],
        name = 'Test Result',
        data = [{
		            y: 1682,
		            color: colors[0],
		            drilldown: {
		                name: 'Pass Category',
		                categories: ['Common', 'W2'],
		                data: [488, 1194],
		                color: colors[0]
		            }
		        }, {
		            y: 170,
		            color: colors[2],
		            drilldown: {
		                name: 'Fail Category',
		                categories: ['Common', 'W2'],
		                data: [46, 124],
		                color: colors[1]
		            }
		        }];


    // Build the data arrays
    var browserData = [];
    var versionsData = [];
    for (var i = 0; i < data.length; i++) {

        // add browser data
        browserData.push({
            name: categories[i],
            y: data[i].y,
            color: data[i].color
        });

        // add version data
        for (var j = 0; j < data[i].drilldown.data.length; j++) {
            var brightness = 0.2 - (j / data[i].drilldown.data.length) / 5 ;
            versionsData.push({
                name: data[i].drilldown.categories[j],
                y: data[i].drilldown.data[j],
                color: Highcharts.Color(data[i].color).brighten(brightness).get()
            });
        }
    }

    // Create the chart
    $('#luna_summary_pie').highcharts({
    	credits: {
			  /* enabled : false */	   
  		text: 'SWP lab.',
  		href: 'javascript:window.open("http://collab.lge.com/main/pages/viewpage.action?pageId=6391855");'
	    },
        chart: {
            type: 'pie'
        },
        title: {
            text: 'Luna API Test - <span style="color:#01609A;font-size:15px;">Pass 90.8% (1682/1852)</span>'
        },
        yAxis: {
            title: {
                text: 'Total percent market share'
            }
        },
        plotOptions: {
            pie: {
                shadow: false,
                center: ['50%', '54%']
            }
        },
        tooltip: {
    	    valueSuffix: ''
        },
        series: [{
            name: 'Cases',
            data: browserData,
            size: '60%',
            dataLabels: {
                formatter: function() {
                	if(this.point.name == "Pass"){
                		return this.point.name + "<br>" + " 90.8%";
                	}
                    return this.y > 5 ? this.point.name : null;
                },
                color: 'white',
                distance: -66,
                style: {
                	fontSize: '14px',
                	fontWeight: 'bold', 
                	textShadow: '0 0 3px black, 0 0 3px black'
                }
            },
            animation: {
                duration: 1400
            }
        }, {
            name: 'Cases',
            data: versionsData,
            size: '59%',
            innerSize: '53%',
            dataLabels: {
                formatter: function() {
                    // display only if larger than -1
                    return this.y > -1 ? '<b style="font-size:12px;">  '+ this.point.name +'</b><br><b>'+ this.y + ' cases  </b>'  : null;
                },
               /*  borderRadius: 5,
                backgroundColor: 'rgba(252, 255, 197, 0.7)',
                borderWidth: 1, */
                /* borderColor: '#AAA', */
                y : -1
            },
            animation: {
                duration: 1400
            }
        }]
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
<div id="luna_summary_pie" style="width: 98%; height: 97%; margin: 0 auto"></div>
</body>
</html>
