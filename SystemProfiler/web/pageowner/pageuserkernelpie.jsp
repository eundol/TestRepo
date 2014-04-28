<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="entity.*"%>
<%@ page import="java.text.DecimalFormat" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
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
<title>Profile Viewer :: LG Electronics</title>
<script type="text/javascript" src="js/jquery-1.4.4.min.js"></script>
<script src="js/highcharts.js"></script>
<script src="js/highcharts-more.js"></script>
<script src="js/modules/exporting.js"></script>
<script src="js/main.js" charset="euc-kr"></script>
</head>
<%
	PageOwnerEntity simpleMemoryEntity = (PageOwnerEntity)request.getAttribute("simpleMemoryEntity");
	int sequence = (Integer)request.getAttribute("sequence");
	String flag = "";
	String data = "";
	long maxTemp = 0;
	String maxValue = "";
	long total = 0;
	DecimalFormat df = new DecimalFormat("###,###");
	
	//Start End 판별
/* 	if( sequence == 1){
		flag = "start";				
	}else if( sequence == 2){
		flag = "end";				
	} */
	
	if(simpleMemoryEntity != null && simpleMemoryEntity.getKernel() != 0 && simpleMemoryEntity.getUser() != 0 && simpleMemoryEntity.getTotal() != 0){
		total = simpleMemoryEntity.getTotal();
		//seleted 효과 위한 가장 큰 수(used내에서) 찾기 
		if(simpleMemoryEntity.getKernel() > maxTemp){
			maxTemp = simpleMemoryEntity.getKernel();
			maxValue = "Kernel";
		}
		if(simpleMemoryEntity.getUser() > maxTemp){
			maxTemp = simpleMemoryEntity.getUser();
			maxValue = "User";
		}
		
		//data 문자열 완성
		if(simpleMemoryEntity.getUser() != 0){
			if(maxValue.equals("User")){
				data += "{name: 'User',y:"+simpleMemoryEntity.getUser()+",sliced: true,selected: true},";
			}else{
				data += "['User',"+ simpleMemoryEntity.getUser() + "],";
			}
		}
		if(simpleMemoryEntity.getKernel() != 0){
			if(maxValue.equals("Kernel")){
				data += "{name: 'Kernel',y:"+simpleMemoryEntity.getKernel()+",sliced: true,selected: true},";
			}else{
				data += "['Kernel',"+ simpleMemoryEntity.getKernel() + "],";
			}
		}
		data = data.substring(0, data.length()-1);
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
	
	// Build the chart
    $('#containerP<%=sequence%>').highcharts({
   	    credits: {
   			  enabled : false	   
   		   },
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: 'Memory Usage Area <%=flag%>',
             style:{
                color : '#B22222'
            }
        },
        subtitle: {
            text: 'Total Usage Size : ' + Highcharts.numberFormat(<%=total/1024%>, '', ',',',') + '<span style="font-size:12px;"> MB </span>(' + Highcharts.numberFormat(<%=total%>, '', ',',',') + '<span style="font-size:12px;"> KB</span>)',
            y : 40
        },
        tooltip:  {formatter: function() {
        	var tooltip = "";
        	if(this.point.name == 'Kernel'){
	        	tooltip = '<span style="font-size:13px; color:#50B432; font-weight:bold;">'+this.point.name+' Area</span><br> '
	        	+ Highcharts.numberFormat(this.y/1024, '', ',',',') + '<span style="##666666; font-size:12px; font-weight:normal;"> MB</span><br>'
	        	+ '<span style="##666666; font-size:12px; font-weight:normal;">(' + Highcharts.numberFormat(this.y, '', ',',',') + 'KB)</span>';
        	}else{
        		tooltip = '<span style="font-size:13px; color:#ED561B; font-weight:bold;">'+this.point.name+' Area</span><br> '
	        	+ Highcharts.numberFormat(this.y/1024, '', ',',',') + '<span style="##666666; font-size:12px; font-weight:normal;"> MB</span><br>'
	        	+ '<span style="##666666; font-size:12px; font-weight:normal;">(' + Highcharts.numberFormat(this.y, '', ',',',') + 'KB)</span>';				        		
        	}
        	return tooltip;
        	}
        },
        plotOptions: {
            pie: {
            	size : 120,
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    connectorColor: '#000000',
                    formatter: function() {
                        return '<span style="font-size:13px; font-weight:normal;">'+ this.point.name + '</span><br><span style="color: ; font-size:13px; font-weight:bold;">' + Highcharts.numberFormat(this.percentage,'2','.') +'</span><span style="color:gray; font-size:12px; font-weight:normal;"> %</span>';
                    },
                    title: {
                    	text: 'dddddd'
                    }
                },
                showInLegend: true
            }
        },
        series: [{
            type: 'pie',
            name: 'Usage',
            data: [
                   <%=data%>
            ],
        	animation: {
                duration: 1455
            }
        }],
    });
});

/**
 * Grid theme for Highcharts JS
 * @author Torstein Hønsi
 */

Highcharts.theme = {
   colors: ['#ED561B', '#50B432', '#DDDF00', '#64E572', '#FF9655', '#FFF263', '#6AF9C4', '#24cbe5'],
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
         font: '8pt Trebuchet MS, Verdana, sans-serif',
         color: 'black'

      },
      itemHoverStyle: {
         color: '#039'
      },
      itemHiddenStyle: {
         color: 'gray'
      },
/*       layout: 'vertical', */
      labelFormatter: function() {
          return '<span title=\"아아아아아아아아아\">' + this.name + '</span>';
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
<body>
<center>
<div id="containerP<%=sequence%>" style="width: 90%; height: 310px; margin: 0 auto"></div>
</center>
</body>
</html>