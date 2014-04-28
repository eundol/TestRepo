<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ page import="java.util.*"%>
<%@ page import="entity.*"%>
<%@ page import="java.text.DecimalFormat"%>
<%@ page import="common.ProfileUtils"%>
<%
	ArrayList<PageOwnerEntity> memoryInfoList = (ArrayList<PageOwnerEntity>)request.getAttribute("memoryInfoList");
	int sequence = (Integer)request.getAttribute("sequence");
	String flag = "";
	String categories = "";
	String data = "";
	int infoSize = 0;
	String maxKeyword = "N/A";
	String maxMemory = "";
	DecimalFormat df = new DecimalFormat("###,###");
	if(memoryInfoList != null && !memoryInfoList.isEmpty()){
		for(int inx = 0 ; inx < memoryInfoList.size() ; inx++){
			categories += "'" + memoryInfoList.get(inx).getKeyword() + "',";
			if(memoryInfoList.get(inx).getKeyword().equals("Kernel_ETC") ||
					memoryInfoList.get(inx).getKeyword().equals("Kernel_SLAB") ||
					memoryInfoList.get(inx).getKeyword().equals("Kernel_memory") ||
					memoryInfoList.get(inx).getKeyword().equals("Kernel_memory include slab or vmalloc")
					){
			data += "{y:" + memoryInfoList.get(inx).getMemory() + ",color:'#50B432'}" + ",";	
			}else{
			data += memoryInfoList.get(inx).getMemory() + ",";
			}
		}
		categories = categories.substring(0, categories.length()-1);
		data = data.substring(0, data.length()-1);
		maxKeyword = memoryInfoList.get(0).getKeyword();
		maxMemory = df.format(memoryInfoList.get(0).getMemory());
	}else{
		categories = "'hs'";
		data = "'0'";
	}
	
	//Start End 판별
	/* if( sequence == 1){
		flag = "start";				
	}else if( sequence == 2){
		flag = "end";				
	} */
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
    $('#pagememorybarchart1').highcharts({
   	   credits: {
   			  enabled : false	   
   		   },
        chart: {
            type: 'column'
/*             margin: [ 50, 50, 80, 100] */
        },
        title: {
            text: 'Usage per purpose <%=flag%>'
        },
        subtitle: {
            text: 'The highest purpose is <span style="text-decoration: underline;"><%=maxKeyword%> (<%=maxMemory%>KB)</span>'
        },
        xAxis: {
            categories: [
                <%=categories%>
            ],
            labels: {
                rotation: -45,
                align: 'right',
                style: {
                	fontWeight : 'normal',
                    fontSize: '11px',
                    fontFamily: 'Verdana, sans-serif'
                },
				formatter: function(){
					var str = this.value;
					if(str.length > 20){
						str = str.substr(0,19) + '..';
					}
					return str;
				}                
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Usage (KB)'
            },
            labels: {
                formatter: function() {
                    return  Highcharts.numberFormat(this.value,'')+ 'KB';
           		 }
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            formatter: function() {
            	var color = "#ED561B";
            	if(this.x == 'Kernel_ETC' || this.x == 'Kernel_memory' || this.x == 'Kernel_SLAB' || this.x == 'Kernel_memory include slab or vmalloc'){
	            	color = "#50B432";
            	}
                return '<b style="color:' + color + '">'+ this.x +'</b><br/>'+
                    '<span style="font-weight:normal;">Usage : </span>'+ Highcharts.numberFormat(this.y, 0) +
                    ' <span style="font-weight:normal;">KB</span>';
            }
        },
        series: [{
            name: 'Population',
            data: [<%=data%>],
            dataLabels: {
                enabled: true,
                color: '#000000',
                align: 'center',
                x: 0,
                y: 0,
                style: {
                    fontSize: '10px',
                    fontFamily: 'Verdana, sans-serif',
                    fontWeight: 'normal'
                },
                formatter: function() {
                    return   Highcharts.numberFormat(this.y/1024,0) + 'MB';
           		 }
            },
            animation: {
                duration: 2550
                }
        }]
    });
});
Highcharts.theme = {
		   colors: ['#ED561B','#50B432','#50B432','#DDDF00', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
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
		      },
		      layout : 'vertical',
		      align: 'right',
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
<div id="pagememorybarchart1" style="width: 100%; height: 310px; margin: 0 auto"></div>
</body>
</html>