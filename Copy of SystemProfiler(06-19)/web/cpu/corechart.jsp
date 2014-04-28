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
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
<script src="js/highcharts.js"></script>
<script src="js/highcharts-more.js"></script>
<script src="js/modules/exporting.js"></script>
<script src="js/main.js" charset="euc-kr"></script>
</head>
<%
	ArrayList<CpuEntity> list = (ArrayList<CpuEntity>)request.getAttribute("cpuCore");
	int maxCpuNum = (Integer)request.getAttribute("maxCpuNum");
	String[] barColor = {"#42A81C","#D91015"};  
	String[] pieColor = {"#ED9595","#5587ED","#345BF8","#CF720A","#6F3D9C","#008040","#FF0080","#3FB4C0"};
	
	//코어 갯수 구하여 배열에 'CPU-0' 형태로 삽입
	String cpuCount = "";
	String[] cpuCore = new String[maxCpuNum+1];
	for(int i = 0 ; i <= maxCpuNum; i++){
		cpuCount = cpuCount + "'CPU-" + i + "'";
		cpuCore[i] = "CPU-" + i;
		if(i != maxCpuNum){
			cpuCount = cpuCount + ", ";
		}
	}
	
	//코어별 Usage / Idle / Total 값 배열 삽입
	Double[] usagePerCore = new Double[maxCpuNum+1];
	Double[] idlePerCore = new Double[maxCpuNum+1];
	Double[] totalPerCore = new Double[maxCpuNum+1];
	for(int i = 0 ; i < usagePerCore.length ; i++){
		usagePerCore[i] = 0.0;
	}
	for(int i = 0 ; i < idlePerCore.length ; i++){
		idlePerCore[i] = 0.0;
	}
	for(int i = 0 ; i < totalPerCore.length ; i++){
		totalPerCore[i] = 0.0;
	} //배열 초기 셋팅
	
	CpuEntity entity = null;
	for(int i = 0 ; i < list.size() ; i++){
		entity = list.get(i);
		int cpuCoreValue = Integer.parseInt(entity.getCpu());
		String entityOverhead = entity.getOverhead();
		entityOverhead = entityOverhead.replace("%", "");
		double entityOverheadNum = Float.parseFloat(entityOverhead);
		
		totalPerCore[cpuCoreValue] += entityOverheadNum;
		if(entity.getCommand().equals("swapper")){
			idlePerCore[cpuCoreValue] += entityOverheadNum;
		}else{
			usagePerCore[cpuCoreValue] += entityOverheadNum;
		}
	}
	
	DecimalFormat df = new DecimalFormat("#.#");
	
	//스크립트 양식에 맞게 변환
	String UsageP = "";
	String IdleP = "";
	String pieChartP = "";
	
	for(int i = 0 ; i < cpuCore.length ; i++){
		UsageP = UsageP + df.format(usagePerCore[i]);
		if(i != cpuCore.length-1){
			UsageP = UsageP + ",";
		}
		IdleP = IdleP + df.format(idlePerCore[i]);
		if(i != cpuCore.length-1){
			IdleP = IdleP + ",";
		}
	}
	for(int i = maxCpuNum ; i >= 0 ; i--){
		pieChartP = pieChartP + "{name : '"+ cpuCore[i] + "', y : " + df.format(totalPerCore[i]) 
				 + ", color : '" + pieColor[i] + "'}";
		if(i != 0){
			pieChartP = pieChartP + ",";
		}
	}
	
%>
<script type="text/javascript">
$(function () {
    $('#container5').highcharts({
        chart: {
        },
        title: {
            text: 'CPU Usage (per core)',
             style:{
                color : '#B22222'
            }
        },
        xAxis: {
            categories: [<%=cpuCount%>]
        },
        yAxis: {
            max:100,
            minorTickInterval: 12.5,
            title:{
            	enabled: false
            }
        },
        tooltip: {
            formatter: function() {
                var s;
                if (this.point.name) { // the pie chart
                    s = ''+
                        this.point.name +' : '+ this.y +' %';
                } else {
                    s = this.x +'<br/>'+
                        this.point.series.name + ' : '+ this.y +' %';;
                }
                return s;
            }
        },
        labels: {
            items: [{
                html: 'Total',
                style: {
                    left: '162px',
                    top: '12px',
                    color: 'black'
                }
            }]
        },
        plotOptions: {
            column: {
                stacking: 'normal'},
       		pie: {
            allowPointSelect: true,
            cursor: 'pointer'}
        },
        series: [{
            type: 'column',
            name: 'Idle',
            color : '<%=barColor[0]%>',
            data: [<%=IdleP%>],
            animation: {
                   duration: 2000
                   },
                   dataLabels: {
                       enabled: true,
                       color: '#FFFFFF',
                       align: 'center',
                       style: {
                           fontSize: '12px',
                           fontFamily: 'Trebuchet MS, Verdana, sans-serif'
                       },
                       formatter: function() {
                           var s;
                               s = this.y +'%';;
                           return s;
                       }
                   }
        }, {
            type: 'column',
            name: 'Usage',
            color : '<%=barColor[1]%>',
            data: [<%=UsageP%>],
            animation: {
                   duration: 2000
                   },
                   dataLabels: {
                       enabled: true,
                       color: '#FFFFFF',
                       align: 'center',
                       style: {
                           fontSize: '11px',
                           fontFamily: 'Trebuchet MS, Verdana, sans-serif'
                       },
                       formatter: function() {
                           var s;
                               s = this.y +'%';;
                           return s;
                       }
                   }
        }, {
            type: 'pie',
            name: 'Total consumption',
            data: [<%=pieChartP%>]
        ,
        animation: {
            duration: 1200
            },
            center: [160, 38],
            size: 53,
            showInLegend: false,
            dataLabels: {
                enabled: true
            }
        }]
    });
});

/**
 * Grid theme for Highcharts JS
 * @author Torstein Hønsi
 */

Highcharts.theme = {
   colors: ['#5587ED', '#ED9595', '#24CBE5', '#64E572', '#FF9655', '#FFF263','#492970','#4274DB'], 
   chart: {
      plotBackgroundColor: 'rgba(255, 255, 255, .9)',
      plotShadow: true,
   },
   credits: {
	  enabled : false	   
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
	   align: 'right',
	   layout: 'vertical',
       verticalAlign: 'middle',
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
<body>
<center>
<div id="container5" style="width: 350px; height: 340px; margin: 0 auto"></div>
</center>
</html>