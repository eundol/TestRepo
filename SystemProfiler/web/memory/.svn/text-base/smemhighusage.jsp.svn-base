<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="entity.*"%>
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
<script src="js/highcharts.js"></script>
<script src="js/highcharts-more.js"></script>
<script src="js/modules/exporting.js"></script>
<script src="js/main.js" charset="euc-kr"></script>
<%
	ArrayList<SmemEntity> smemInfo = (ArrayList<SmemEntity>)request.getAttribute("smemInfo");
	String id = (String)request.getAttribute("id");
	SmemEntity entity = new SmemEntity();
	
	boolean flagTemp = true;
	int cnt = 1;
	
	if(smemInfo == null || smemInfo.size() == 0){
		flagTemp = false;		
	}
	
	if(flagTemp){
		cnt = 0;
		for(int inx = 0, size = smemInfo.size() ; inx < size ; inx++){
			if(smemInfo.get(inx).getPssEnd() != 0){
				cnt++;
			}
			if(cnt == 0){
				flagTemp = false;
			}
		}
	}
	
	if(!flagTemp){
		entity.setName("pv");
		entity.setPssEnd(0);
		entity.setPssDiff(0);
		smemInfo = new ArrayList<SmemEntity>();
		for(int inx = 0 ; inx < 5 ; inx++){
				smemInfo.add(entity);
		}	
	}
%>
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
	
    $('#highusage').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Highest Usages at Completion',
             style:{
                color : '#B22222'
            }
        },
        subtitle:{
			text: 'The top 5 processes that consumed the most memory at completion'
        },
        xAxis: {
	        lineColor: '#000',
	        tickColor: '#000',
	        labels: {
	            style: {
	               color: '#000',
	               font: '12px Trebuchet MS, Verdana, sans-serif'
	            }
	         },
	         
            categories: [
            			 '<%=smemInfo.get(0).getName()%>',
            			 '<%=smemInfo.get(1).getName()%>',
            			 '<%=smemInfo.get(2).getName()%>',
            			 '<%=smemInfo.get(3).getName()%>',
            			 '<%=smemInfo.get(4).getName()%>'
                         ],
            title: {
                text: null
            }
        },
        yAxis: {
            lineColor: '#000',
            lineWidth: 1,
            tickWidth: 1,
            tickColor: '#000',
            min: 0,
            maxPadding: 0.12,
            title: {
            	enabled: false,
                text: 'Usage',
                align: 'high'
            },
            labels: {
                overflow: 'justify',
                style: {
 	               color: '#000',
 	               font: '11px Trebuchet MS, Verdana, sans-serif'
 	            },
               formatter : function() {
	   					var s = Highcharts.numberFormat(this.value/1024, '', ',',',') + '<span style="font-size:11px; font-weight:normal;">MB</span>';
	   					return s;
				}
            }
        },
        tooltip: {
        	formatter: function() {
            	var tooltip = "";
            		tooltip = '<span style="color:' + this.point.color + ';font-size:12px;font-weight:bold;">'+this.x+'</span> : '+ Highcharts.numberFormat(this.y, '', ',',',') +'<span style="color:gray; font-size:12px; font-weight:normal;"> KB</span>';
                return tooltip;
            }
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true,
                    formatter : function() {
    					var s = '<span style="font-size:10px; font-weight:bold;">'+ Highcharts.numberFormat(this.y, '', ',',',') + '</span><span style="color:gray; font-size:9px; font-weight:normal;"> KB</span>';
    					return s;
    				},
    				borderRadius: 5,
                    backgroundColor: 'rgba(252, 255, 197, 0.7)',
                    borderWidth: 1,
                    borderColor: '#AAA',
                    y : -1
                }
            }
        },
        credits: {
            enabled: false
        },
        legend:{
        	enabled : false,
        	layout : 'vertical',
        	align : 'right',
        	verticalAlign: 'top',
            floating: true,
            borderWidth: 0,
            backgroundColor: '#FFFFFF'
        },
        series: [{
        	name: 'Usage',
        	colorByPoint : true,
            data: [
                   {y : <%=smemInfo.get(0).getPssEnd()%>}, 
                   {y : <%=smemInfo.get(1).getPssEnd()%>}, 
                   {y : <%=smemInfo.get(2).getPssEnd()%>}, 
                   {y : <%=smemInfo.get(3).getPssEnd()%>}, 
                   {y : <%=smemInfo.get(4).getPssEnd()%>}
                   ],
            animation: {
                   duration: 2850
                   }
        }]
    });
});
/**
 * Grid theme for Highcharts JS
 * @author Torstein Hønsi
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
    borderWidth: 1,
    plotBackgroundColor: 'rgba(255, 255, 255, .9)',
    plotShadow: true,
    plotBorderWidth: 1
 },
   subtitle: {
      style: {
         color: '#666666',
         font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
      },
      y : 35
   },
   xAxis: {
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
</head>
<body>	
<div id="highusage" style="width: 99.9%; height: 315px; margin: 0 auto;"></div>
<div style="position: fixed; top: 260px; right: 5%">
<span style="font-size: 11px; font-weight: bold; color:#4D759E; font-size-adjust: inherit;">* PSS</span>
</div>

<%if(cnt == 0){ %>
<div style="position: fixed; bottom: 32px; left: 10px;background-color: Yellow; font-weight: normal;">
	Information has not been masured normally at the end.
</div>
<div style="position: fixed; bottom: 9px; left: 10px;background-color: Yellow; font-weight: normal;">
	Please try again.
</div>
<%} %>

<%if(smemInfo == null || smemInfo.size() == 0){%>
<div style="position: fixed; bottom: 9px; left: 10px;background-color: Yellow; font-weight: normal;">
	Smem is not used.
</div>
<%}%>

</body>
</html>