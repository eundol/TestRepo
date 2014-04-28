<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ page import="java.util.*"%>
<%@ page import="entity.*"%>
<%@ page import="java.text.DecimalFormat"%>
<%@ page import="common.ProfileUtils"%>
<%
	ArrayList<MemEntity> memoryInfo = (ArrayList<MemEntity>)request.getAttribute("memoryInfo");
	String created = (String)(request.getAttribute("created"));
	
	String Used = "";
	String Buffers = "";
	String Cached = "";
	DecimalFormat df = new DecimalFormat("###,###");
	int totalInt = 100;
	String total = "";
	String labels ="Highcharts.numberFormat(this.y/1024/1024, '', ',',',') +'MB'";
	
	if(created != null && !created.equals("") && !created.equals("null")){
	totalInt = memoryInfo.get(0).getTotal();
	total = df.format(totalInt/1024/1024);
	
	ProfileUtils profileUtils = new ProfileUtils();
	String createdUTC = profileUtils.getUtcTimeFormat(created);
	
	MemEntity entity = null;
		for(int inx = 0, size = memoryInfo.size() ; inx < size ; inx++){
			entity = memoryInfo.get(inx);
			Used    += "[Date.UTC(" + createdUTC + ")," + entity.getUsed() + "]";
			Buffers += "[Date.UTC(" + createdUTC + ")," + entity.getBuffers() + "]";
			Cached  += "[Date.UTC(" + createdUTC + ")," + entity.getCached() + "]";
			if(inx != size-1){
				Used += ",";
				Buffers += ",";
				Cached += ",";
				created = profileUtils.addSecondTime(created, 1);
				createdUTC = profileUtils.getUtcTimeFormat(created);
			}
		}
		
		if(memoryInfo.get(memoryInfo.size()-1).getSequence() > 15){
			labels ="Highcharts.numberFormat(this.y/1024/1024, '', ',',',') +'MB'";
		}
		if(memoryInfo.get(memoryInfo.size()-1).getSequence() > 25){
			labels ="";
		}	
		
	}else{
		Used = "[Date.UTC(1987, 4, 12), 0.7 ]";
	}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<script type="text/javascript">
</script>
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
       $('#container11').highcharts({
       	   credits: {
       			  enabled : false	   
       		   },
            chart: {
            	/* zoomType: 'x',
                spacingRight: 20, */
                type: 'spline'
            },
            title: {
                text: 'Memory Usage Progress',
            },
            subtitle: {
                text: 'Max Available Memory : <%=total%> (MB)'
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
                    text: 'Usage (Byte)'
                },
                min : 0,
                endOnTick : true,
                max : <%=totalInt%>,
                labels: {
	                formatter: function() {
	                    return  Highcharts.numberFormat(this.value/1024/1024, '', ',',',') + 'MB';
	           		 }
                }
            },
            tooltip: {
                formatter: function() {
                        return  '<span style="color:'+this.series.color+';font-size:12px;font-weight:normal;">'+this.series.name+'</span><br>'+ Highcharts.numberFormat(this.y/1024, '', ',',',') +'<span style="color:gray; font-size:12px; font-weight:normal;">(KB)</span>' + '<br/>' 
                        		+ '<span style="color:\'#4D759E\'; font-size:12px; font-weight:normal;">Time  : '+ Highcharts.dateFormat('%H:%M:%S', this.x) +'</span>';
                }
            },      
            series: [{
                name: 'Used Memory',
                // Define the data points. All series have a dummy year
                // of 1970/71 in order to be compared on the same x axis. Note
                // that in JavaScript, months start at 0 for January, 1 for February etc.
                data: [
                    <%=Used%>
                ],
                animation: {
                    duration: 2300
                },
                dataLabels: {
                    enabled: true,
                    formatter: function() {
                        return <%=labels%>;
             	  	 },
            	  	 style: {
                        color: '#333',
                        fontWeight: 'bold',
                        fontSize: '9px',
                        fontFamily: 'Trebuchet MS, Verdana, sans-serif'
                     }
                }
            }, {
            	name: 'Cached',
                data: [
                    <%=Cached%>
                ],
                animation: {
                    duration: 2300
                },
                dataLabels: {
                    enabled: true,
                    formatter: function() {
                    	return <%=labels%>;
             	  	 },
            	  	 style: {
                        color: '#333',
                        fontWeight: 'bold',
                        fontSize: '9px',
                        fontFamily: 'Trebuchet MS, Verdana, sans-serif'
                     }
                }
            }, {
            	name: 'Buffers',
                data: [
                    <%=Buffers%>
                ],
                animation: {
                    duration: 2330
                }
            }]
        });
    });
    
/**
 * Grid theme for Highcharts JS
 * @author Torstein Hønsi
 */

Highcharts.theme = {
   colors: ['#ED561B', '#058DC7','#50B432', '#FF9655', '#64E572', '#DDDF00', '#50B432', '#24CBE5', '#6AF9C4'],
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
      y : 34
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
      max : <%=totalInt%>,
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
   },
};
// Apply the theme
var highchartsOptions = Highcharts.setOptions(Highcharts.theme);
</script>
</head>
<body>
<div id="container11" style="width: 98%; height: 360px; margin: 0 auto"></div>
<div style="position: fixed; top: 325px; right: 2%">
<span style="font-size: 11px; font-weight: bold; color:#4D759E; font-size-adjust: inherit;">* Used Memory includes Cached and Buffers</span>
</div>
</body>
</html>