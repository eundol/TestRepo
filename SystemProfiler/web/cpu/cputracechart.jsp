<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ page import="java.util.*"%>
<%@ page import="entity.*"%>
<%@ page import="java.text.DecimalFormat"%>
<%@ page import="common.ProfileUtils"%>
<%
	ArrayList<IoEntity> cpuTraceInfo = (ArrayList<IoEntity>)request.getAttribute("cpuTraceInfo");
	IoEntity maxInfo = (IoEntity)request.getAttribute("maxEntity");
	String created = (String)(request.getAttribute("created"));
	String endTime = "";
	String data = "";
	String maxTime = "";
	String maxZoom = "8500";
	int infoSize = cpuTraceInfo.size();
	
	if(created != null && !created.equals("") && !created.equals("null")){
		ProfileUtils profileUtils = new ProfileUtils();
		endTime = profileUtils.addSecondTime(created, cpuTraceInfo.size()-1); 
		int measureTime = cpuTraceInfo.size();
		
		int maxSequence = 0;
		float maxTemp = 0.00f;
		float entityTemp = 0.00f;
		for(int inx = 0; inx < infoSize ; inx++){
			entityTemp = Float.parseFloat(cpuTraceInfo.get(inx).getUsed());
			if(entityTemp > maxTemp){
				maxTemp = entityTemp;
				maxSequence = Integer.parseInt(cpuTraceInfo.get(inx).getSequence());
			}
		}
		
		maxTime = profileUtils.addSecondTime(created, maxSequence-1);
		if(infoSize < 8){
			maxZoom = "2350";
		}
		boolean overThirty = cpuTraceInfo.size() > 35;
		
		if(infoSize > 0){
	/* 		if(!maxInfo.getUsed().equals("0") && !maxInfo.getUsed().equals("0.00")){
				data += profileUtils.makeTraceGraphString(cpuTraceInfo, "Used", created, overThirty)+",";
			} */
			if(!maxInfo.getUser().equals("0") && !maxInfo.getUser().equals("0.00")){
				data += profileUtils.makeTraceGraphString(cpuTraceInfo, "User", created, overThirty)+",";
			}
			if(!maxInfo.getSystem().equals("0") && !maxInfo.getSystem().equals("0.00")){
				data += profileUtils.makeTraceGraphString(cpuTraceInfo, "System", created, overThirty)+",";
			}
			if(!maxInfo.getIowait().equals("0") && !maxInfo.getIowait().equals("0.00")){
				data += profileUtils.makeTraceGraphString(cpuTraceInfo, "Iowait", created, overThirty)+",";
			}
			if(!maxInfo.getNice().equals("0") && !maxInfo.getNice().equals("0.00")){
				data += profileUtils.makeTraceGraphString(cpuTraceInfo, "Nice", created, overThirty)+",";
			}
			if(!maxInfo.getSteal().equals("0") && !maxInfo.getSteal().equals("0.00")){
				data += profileUtils.makeTraceGraphString(cpuTraceInfo, "Steal", created, overThirty)+",";
			}
		}else{
			data = "{name: 'N/A',data:[Date.UTC(1987, 4, 12), 0.7 ]}-";
		}
		
		data = data.substring(0, data.length()-1);
	}else{
		data = "{name: 'N/A',data:[Date.UTC(1987, 4, 12), 0.7 ]}";
		created = "1987-05-12 00:00:00";
		endTime = "1987-05-12 00:00:00";
		maxTime = "1987-05-12 00:00:00";
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
       $('#container6').highcharts({
       	   credits: {
       			  enabled : false	   
       		   },
            chart: {
            	zoomType: 'xy',
                /* spacingRight: 20, */
                type: 'spline'
            },
            title: {
                text: 'Trace Information <span style="font-size:12px;">(<%=created.substring(11)%> ~ <%=endTime.substring(11)%>)</span>'
            },
            subtitle: {
                text: 'The Used Rate is the highest at <span style="text-decoration: underline;"><%=maxTime.substring(11)%></span> - Total <%=infoSize%> Seconds Measured'
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
                    text: 'Usage (Percentage)'
                },
                endOnTick : false,
                max : 101,
                min : 0,
                labels: {
	                formatter: function() {
	                    return  this.value + '%';
	           		 }
                }
            },
            tooltip: {
                formatter: function() {
                        return  '<span style="color:'+this.series.color+';font-size:12px;font-weight:normal;">'+this.series.name+'</span><br>'+ Highcharts.numberFormat(this.y, 2, '.') +'<span style="color:gray; font-size:12px; font-weight:normal;">(%)</span>' + '<br/>' 
                        		+ '<span style="color:\'#4D759E\'; font-size:12px; font-weight:normal;">Time  : '+ Highcharts.dateFormat('%H:%M:%S', this.x) +'</span>';
                }
            },      
            series: [
				<%=data%>                     
                     ]
        });
    });
    
/**
 * Grid theme for Highcharts JS
 * @author Torstein Hønsi
 */

Highcharts.theme = {
   colors: ['#ED561B','#50B432','#DDDF00', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
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
      max : 100,
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
      maxZoom: 35
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
      layout : 'vertical',
      align: 'right',
      itemMarginBottom: 1, 
      verticalAlign: 'middle'
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
<div id="container6" style="width: 100%; height: 360px; margin: 0 auto"></div>
<!-- <div style="position: fixed; top: 325px; right: 2%">
<span style="font-size: 11px; font-weight: bold; color:#4D759E; font-size-adjust: inherit;">* Used Memory includes Cached and Buffers</span>
</div> -->
</body>
</html>