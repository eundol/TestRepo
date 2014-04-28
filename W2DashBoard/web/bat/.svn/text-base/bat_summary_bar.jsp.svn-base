<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="entity.*"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html style="height:98%; overflow:hidden">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>BAT Result :: LG Electronics</title>
<script src="./js/jquery-1.4.4.min.js"></script>
<script src="./js/highcharts.js"></script>
<script src="./js/highcharts-more.js"></script>
<script src="./js/modules/exporting.js"></script>
</head>
<%
	ArrayList<BatInfo> testResultList = (ArrayList<BatInfo>)request.getAttribute("BatInfo");
	String builds = "";
	String totals = "";
	String passes = "";
	String fails = "";
	String passRates = "";
	String lastPassRate = String.valueOf(testResultList.get(testResultList.size()-1).getPassRate());
	String lastBuild = String.valueOf(testResultList.get(testResultList.size()-1).getBuild());
	String lastDate = String.valueOf(testResultList.get(testResultList.size()-1).getDate());
	String lastTotal = String.valueOf(testResultList.get(testResultList.size()-1).getTotal());
	String lastPass = String.valueOf(testResultList.get(testResultList.size()-1).getPass());
	for(int i = 0; i < testResultList.size(); i++){
		BatInfo entity = testResultList.get(i);
		builds += "'" + entity.getBuild().replace("Official Build", "") + "<br>" + entity.getDate().substring(5) + "',";
		totals += (int)entity.getTotal() + ",";
		passes += (int)entity.getPass() + ",";
		fails += (int)entity.getFail() + ",";
		passRates += (int)entity.getPassRate() + ",";
	}
	builds = builds.substring(0,builds.length()-1);
	totals = totals.substring(0,totals.length()-1);
	passes = passes.substring(0,passes.length()-1);
	fails = fails.substring(0,fails.length()-1);
	passRates = passRates.substring(0,passRates.length()-1);
%>
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
    $('#bat_summary_bar').highcharts({
    	credits: {
			  /* enabled : false */	   
	  		text: 'Edit',
	  		href: 'javascript:window.open("bat_summary_edit_open","Edit","width=880,height=520,titlebar=no,directory=no,copyhistory=no,toolbar=no,location=no,Internet Explorer 7.location=no,resizable=no,scrollbars=no,menubar=no,status=no");void(0);'
	    },
	    chart: {
            /* zoomType: 'xy' */
	    	/* marginTop: 65, */
        },
        title: {
            text: 'BAT Result - <span style="color:#01609A;font-size:15px;">Pass <%=lastPassRate%>% (<%=lastPass%>/<%=lastTotal%>)</span>'
        },
        subtitle: {
           <%--  text: 'Pass : ' + <%=lastPassRate%> + '% ' + '- <%=lastBuild%>' + ' (<%=lastDate%>)',
            style: {
            	color: '#01609A',
            	fontSize: '14px',
            	fontWeight: 'bold',
            },
            y: 36 --%>
        },
        xAxis: [{
            categories: [<%=builds%>],
            gridLineColor: "white"
        }],
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value}%',
                style: {
                    color: '#4572A7'
                }
            },
            title: {
                text: 'Pass Rate',
                style: {
                    color: '#4572A7'
                }
            },
            min: 0,
            max: 100,
            endOnTick : false,
            alignTicks : false,
            gridLineColor: "white"
        }, { // Secondary yAxis
            title: {
                text: 'Test Cases',
                style: {
                    color: '#4572A7'
                }
            },
            max:<%=(Integer.parseInt(lastTotal)+11)%>,
            stackLabels: {
                enabled: true,
                style: {
                    /* fontWeight: 'bold', */
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            },
            labels: {
                format: '{value}',
                style: {
                    color: '#4572A7'
                }
            },
            endOnTick : false,
            alignTicks : false,
            opposite: true,
            gridLineDashStyle: 'Dash',
            gridLineColor: "white"
        }],
        tooltip: {
            shared: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
                stacking: 'normal',
                dataLabels: {
                    enabled: false,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        textShadow: '0 0 3px black, 0 0 3px black'
                    }
                },
                shadow:true
            },
            spline:{
            	dataLabels: {
            		enabled: true,
            		/* color: '#ECEC00', */
            		color: 'black',
            		format: '{y}%',
            		style: {
            			/* textShadow: '0 0 1px white, 0 0 1px white', */
            			/* textShadow: '-1px 0 #FCEA0A, 0 1px #FCEA0A, 1px 0 #FCEA0A, 0 -1px #FCEA0A', */
            			fontSize: '12px',
            			textShadow: '-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white'
            		}
                },
                shadow:true
            }
        },
        legend: {
            /* layout: 'vertical', */
            /* align: 'left', */
            /* x: 100, */
            /* verticalAlign: 'top', */
            /* y: 80, */
            /* floating: true, */
            /* backgroundColor: '#FFFFFF', */
            reversed: true
        },
        series: [{
 			name: 'Fail',
            color: Highcharts.getOptions().colors[2],
            type: 'column',
            yAxis: 1,
            data: [<%=fails%>],
            tooltip: {
                valueSuffix: ''
            } 
        }, {
 			name: 'Pass',
            color: Highcharts.getOptions().colors[0],
            type: 'column',
            yAxis: 1,
            data: [<%=passes%>],
            tooltip: {
                valueSuffix: ''
            } 
        }, {
            name: 'Pass Rate',
            color: Highcharts.getOptions().colors[1],
            type: 'spline',
            data: [<%=passRates%>],
            tooltip: {
                valueSuffix: '%'
            }
        }]
    });
});

/**
 * Grid theme for Highcharts JS
 * @author Torstein Honsi
 */

Highcharts.theme = {
   colors: ['#05A2E4', '#FCEA0A', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
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
         /* color: '#3F8F27', */
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
     /*  minorTickInterval: 'auto', */
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
<div id="bat_summary_bar" style="width: 98%; height: 97%; margin: 0 auto"></div>
</body>
</html>