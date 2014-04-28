<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ page import="java.util.*"%>
<%@ page import="entity.*"%>
<%@ page import="java.text.DecimalFormat"%>
<%@ page import="common.ProfileUtils"%>
<%
	String created = (String)(request.getAttribute("created"));
	ArrayList<IotopEntity> iotopInfoArrangedByRead = (ArrayList<IotopEntity>)request.getAttribute("iotopInfoArrangedByRead");
	ArrayList<String> iotopCommandOrder = (ArrayList<String>)(request.getAttribute("iotopCommandOrder"));
	int maxSequence = (Integer)(request.getAttribute("maxSequence"));
	
	String data = "";
	String maxZoom = "7500";
	
	if(created != null && !created.equals("") && !created.equals("null")){
		ProfileUtils profileUtils = new ProfileUtils();
		
		if(maxSequence < 8){
			maxZoom = "2350";
		}
		boolean overThirty = maxSequence > 30;
		
		if(iotopInfoArrangedByRead.size() > 0){
	/* 		if(!maxInfo.getUsed().equals("0") && !maxInfo.getUsed().equals("0.00")){
				data += profileUtils.makeTraceGraphString(cpuTraceInfo, "Used", created, overThirty)+",";
			} */
			
			for(int inx = 0, size = iotopCommandOrder.size() ; inx < size ; inx++){
				data += profileUtils.makeTraceGraphStringIO(iotopInfoArrangedByRead, iotopCommandOrder.get(inx), created, overThirty, "read") +",";
			}
			
		}else{
			data = "{name: 'N/A',data:[Date.UTC(1987, 4, 12), 0.7 ]}-";
		}
		
		data = data.substring(0, data.length()-1);
	}else{
		data = "{name: 'N/A',data:[Date.UTC(1987, 4, 12), 0.7 ]}";
		created = "1987-05-12 00:00:00";
	}
%>
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
<script src="./js/highcharts.js"></script>
<script src="./js/highcharts-more.js"></script>
<script src="./js/modules/exporting.js"></script>
<script src="./js/main.js" charset="euc-kr"></script>
<script type="text/javascript">
$(function () {
       $('#containerRead').highcharts({
       	   credits: {
       			  enabled : false	   
       		   },
            chart: {
            	zoomType: 'xy',
                /* spacingRight: 20, */
                type: 'spline'
            },
            title: {
                text: 'I/O read by process'
            },
            subtitle: {
                text: 'The amount of I/O processes have done since test started'
            },
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: { // don't display the dummy year
                	second: '%H:%M:%S'
                },
           		minTickInterval: 1000
            },
            yAxis: {
            	title: {
                    text: 'I/O Read (accumulated)'
                },
                endOnTick : true,
                min : 0,
                labels: {
	                formatter: function() {
	                    return  Highcharts.numberFormat(this.value/1024, 0,'.') + 'MB';
	           		 }
                }
            },
            tooltip: {
                formatter: function() {
                		var name = this.series.name;
                		var nameTrimed = name;
                		if(name.indexOf(' ') > 0){
                			nameTrimed = name.substr(0,name.indexOf(' '));
                		}
                        return  '<span style="color:'+this.series.color+';font-size:12px;font-weight:normal;">'+ nameTrimed +'</span><br>'+ Highcharts.numberFormat(this.y, 0, '.') +'<span style="color:gray; font-size:12px; font-weight:normal;">(KB)</span>' + '<br/>' 
                        		+ '<span style="color:\'#4D759E\'; font-size:12px; font-weight:normal;">Time  : '+ Highcharts.dateFormat('%H:%M:%S', this.x) +'</span>';
                }
            },      
            series: [
				<%=data%>                     
                     ]
        });
       
       var chart = $('#containerRead').highcharts();
       
       for(var i = 0 ; i < <%=iotopCommandOrder.size()%> ; i++){
    	   if(i > 2){
    		   chart.series[i].hide();
    	   }
       }
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
/*    plotOptions: {
       series: {
           marker: {
               lineWidth: 0,
               lineColor: null // inherit from series
           }
       }
   }, */
   title: {
      style: {
         color: '#B22222'
         /* font: 'bold 16px "Trebuchet MS", Verdana, sans-serif' */
      }
   },
   subtitle: {
      style: {
         color: '#666666',
         font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
      },
      y : 35
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
      },
      maxZoom: <%=maxZoom%>
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
      maxZoom: 2700
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
      },
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      itemMarginBottom: 1, 
      labelFormatter: function() {
    	  var name = this.name;
    	  var nameTrimed = name;
    	  if(name.indexOf(' ') > 0){
	   		  nameTrimed = name.substr(0,name.indexOf(' '));
    	  }
	    return  nameTrimed;
      },
      y:49,
      navigation: {
      	activeColor: '#3E576F',
			animation: true,
			arrowSize: 12,
			inactiveColor: '#CCC',
			style: {
				fontWeight: 'bold',
				color: '#333',
				fontSize: '12px'	
			}
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
   },
};
// Apply the theme
var highchartsOptions = Highcharts.setOptions(Highcharts.theme);
</script>
</head>
<body>
<div id="containerRead" style="width: 100%; height: 320px; margin: 0 auto"></div>
<!-- <div style="position: fixed; top: 325px; right: 2%">
<span style="font-size: 11px; font-weight: bold; color:#4D759E; font-size-adjust: inherit;">* Used Memory includes Cached and Buffers</span>
</div> -->
</body>
</html>