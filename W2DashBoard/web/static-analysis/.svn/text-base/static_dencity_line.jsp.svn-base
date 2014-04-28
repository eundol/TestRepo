<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="entity.*"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html style="height:98%; overflow:hidden">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Performance Test :: LG Electronics</title>
<script src="./js/jquery-1.4.4.min.js"></script>
<script src="./js/highcharts.js"></script>
<script src="./js/highcharts-more.js"></script>
<script src="./js/modules/exporting.js"></script>
</head>
<%

	ArrayList<StaticDencityInfo> list = (ArrayList<StaticDencityInfo>)request.getAttribute("DenctiyInfo");

	//categories
	ArrayList<String> dateList = new ArrayList<String>();
	for(int i = 0; i < list.size(); i++){
		String date = list.get(i).getDate();
		boolean duplicationFlag = false;
		for(int j = 0; j < dateList.size(); j++){
			if(date.equals(dateList.get(j))){
				duplicationFlag = true;
			}
		}
		if(!duplicationFlag){
			dateList.add(date);
		}
	}
	String categories = "";
	for(int i = 0; i < dateList.size(); i++){
		categories += "'" + dateList.get(i).substring(5) + "',";
	}
	categories = categories.substring(0,categories.length()-1);
	
	//detail
	ArrayList<String> detailList = new ArrayList<String>();
	detailList.add("dencity");
	
	// index 0
	String index0Data = "";
	for(int i = 0; i < list.size(); i++){
		index0Data += String.valueOf(list.get(i).getDencity()) + ",";
	}
	index0Data = index0Data.substring(0,index0Data.length()-1);
	
	// message
	HashMap<String,String> masterMap = new HashMap<String,String>();
	masterMap.put("Base Line", "04-13");
	HashMap<String,Integer> pointMap = new HashMap<String,Integer>();
	pointMap.put("Base Line", 0);
	
	for(int i = 0 ; i < dateList.size() ; i++){
		ArrayList<String> masterMapKeys = new ArrayList<String>(masterMap.keySet());
		for(int j = 0 ; j < masterMapKeys.size() ; j++){
			String keyValue = masterMapKeys.get(j);
			if(dateList.get(i).substring(5).trim().equals(masterMap.get(keyValue))){
				if(pointMap.keySet().contains(keyValue)){
					pointMap.put(keyValue, i);	
				}
			}
		}
	}
	System.out.println("pointMap : " + pointMap);
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
	            [1, Highcharts.Color(color).brighten(0.1).get('rgb')] // darken
	        ]
	    };
	});
    // Create the chart
    $('#perf_booting_time_line').highcharts({
    	credits: {
			  /* enabled : false */	   
  		text: 'SWP lab.',
  		href: 'javascript:window.open("http://collab.lge.com/main/pages/viewpage.action?pageId=6391855");'
	    },
	    chart: {
            type: 'spline'
        },
        title: {
            text: 'Dencity',
            y: 16,
        },
        subtitle: {
            /* text: 'Irregular time data in Highcharts JS', */
        }, 
        xAxis: {
        	categories: [<%=categories%>]
        },
        yAxis: {
            title: {
                text: 'dencity',
                style: {
                    color: '#4572A7',
                    fontSize: '15px',
                }
            },
            min: 0,
        },
        tooltip: {
        	valueSuffix: ''
        },
        plotOptions: {
        	spline:{
		        dataLabels: {
		    		enabled: true,
		    		/* color: '#ECEC00', */
		    		color: 'black',
		    		format: /* '{y}s', */ '{y}',
		    		style: {
		    			/* textShadow: '0 0 1px white, 0 0 1px white', */
		    			/* textShadow: '-1px 0 #FCEA0A, 0 1px #FCEA0A, 1px 0 #FCEA0A, 0 -1px #FCEA0A', */
		    			fontSize: '13px',
		    			textShadow: '-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white',
		    		}
		        },
		        shadow:true
        	}
        },
        series: [
                 {
		            name: '<%=detailList.get(0)%>',
		            data: [<%=index0Data%>]
		         }
        ]
        
    },
    
    //malphongsun
	function(chart) {
        <% Set<String> keys =  pointMap.keySet();
        ArrayList<String> keyList = new ArrayList<String>();
        keyList.addAll(keys);
        for(int i = 0 ; i < keyList.size() ; i++){
        	if(pointMap.get(keyList.get(i)) > 0){
        %>
	        var point = chart.series[0].data[<%=pointMap.get(keyList.get(i))%>];
	        var text = chart.renderer.text(
	                '<span style="font-weight:normal;"><%=keyList.get(i)%></span>', 
	                point.plotX  + chart.plotLeft - 27, 
	                77
	            ).attr({
	                zIndex: 5,
	                name: 'recText'
	            }).add();
	        var box = text.getBBox();
	        chart.renderer.rect(box.x - 4, box.y - 3, box.width + 8, box.height + 6, 5)
	            .attr({
	                fill: 'rgba(255, 255, 255, 0.5)',
	                stroke: 'red',
	                'stroke-width': 1,
	                zIndex: 4,
	                name: 'recBox'
	            })
	            .add();
        <%}}%>

/*       	var text = chart.renderer.text(
                'All', 
                point.plotX + chart.plotLeft + 10, 
                point.plotY + chart.plotTop - 10
            ).attr({
                zIndex: 5
            }).add();
        
        var box = text.getBBox();
        chart.renderer.rect(box.x - 5, box.y - 5, box.width + 10, box.height + 10, 5)
            .attr({
                fill: '#FFFFEF',
                stroke: 'gray',
                'stroke-width': 1,
                zIndex: 4
            })
            .add(); */
      	
    	}
    );
});

/**
 * Grid theme for Highcharts JS
 * @author Torstein Honsi
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
<div id="perf_booting_time_line" style="width: 98%; height: 97%; margin: 0 auto"></div>
</body>
</html>