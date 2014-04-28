<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.text.SimpleDateFormat, java.util.Date;" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<%
	long now = System.currentTimeMillis();
	SimpleDateFormat dayTime = new SimpleDateFormat("hh:mm:ss.S");
	String start = dayTime.format(new Date(now));
	String h = start.substring(0,2);
	String m = start.substring(3,5);
	String s = start.substring(6,8);

	String result = "{y : 0, url : 'http://www.naver.com'}";
	String a = null;
	if((Math.random()*10) > 8 ){
		for(int i = 0 ; i < 200 ; i++){
			a = String.valueOf(Math.random()*0.3).substring(2,4);
			result = result + ", {y : " + a + ", url : 'http://www.naver.com'}";
		}
		for(int i = 0 ; i < 100 ; i++){
			a = String.valueOf(Math.random()*0.4).substring(2,4);
			result = result + ", {y : " + a + ", url : 'http://www.nate.com'}";
		}
		for(int i = 0 ; i < 100 ; i++){
			a = String.valueOf(Math.random()*0.8).substring(2,4);
			result = result + ", {y : " + a + ", url : 'http://www.daum.net'}";
		}
		for(int i = 0 ; i < 200 ; i++){
			a = String.valueOf(Math.random()*0.6).substring(2,4);
			result = result + ", {y : " + a + ", url : 'https://sso.lge.com'}";
		}
	}else if((Math.random()*10) > 5){	
		for(int i = 0 ; i < 200 ; i++){
			a = String.valueOf(Math.random()*0.5).substring(2,4);
			result = result + ", {y : " + a + ", url : 'http://www.naver.com'}";
		}
		for(int i = 0 ; i < 100 ; i++){
			a = String.valueOf(Math.random()*0.2).substring(2,4);
			result = result + ", {y : " + a + ", url : 'http://www.nate.com'}";
		}
		for(int i = 0 ; i < 100 ; i++){
			a = String.valueOf(Math.random()*0.2).substring(2,4);
			result = result + ", {y : " + a + ", url : 'http://www.daum.net'}";
		}
		for(int i = 0 ; i < 200 ; i++){
			a = String.valueOf(Math.random()*0.8).substring(2,4);
			result = result + ", {y : " + a + ", url : 'https://sso.lge.com'}";
		}
	}else{
		for(int i = 0 ; i < 200 ; i++){
			a = String.valueOf(Math.random()*0.1).substring(2,4);
			result = result + ", {y : " + a + ", url : 'http://www.naver.com'}";
		}
		for(int i = 0 ; i < 100 ; i++){
			a = String.valueOf(Math.random()*0.7).substring(2,4);
			result = result + ", {y : " + a + ", url : 'http://www.nate.com'}";
		}
		for(int i = 0 ; i < 100 ; i++){
			a = String.valueOf(Math.random()*0.3).substring(2,4);
			result = result + ", {y : " + a + ", url : 'http://www.daum.net'}";
		}
		for(int i = 0 ; i < 200 ; i++){
			a = String.valueOf(Math.random()*0.2).substring(2,4);
			result = result + ", {y : " + a + ", url : 'https://sso.lge.com'}";
		}	
	}
%>
<script type="text/javascript">
$(function () {
        $('#container').highcharts({
            chart: {
                zoomType: 'x',
                spacingRight: 20
            },
            title: {
                text: 'CPU Usage (Total)',
                style:{
                    color : '#B22222'
                }
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                    'Click and drag in the plot area to zoom in' :
                    'Drag your finger over the plot to zoom in'
            },
            xAxis: {
            	gridLineWidth: 1,
            	lineColor: '#000',
            	tickColor: '#000',
                type: 'datetime',
                maxZoom: 4000, // 4 seconds
                title: {
                    text: null
                }
            },
            yAxis: {
            	minorTickInterval: 'auto',
                lineColor: '#000',
                lineWidth: 1,
                tickWidth: 1,
                tickColor: '#000',
                title: {
                    text: 'Usage rate(%)'
                },
                max : 100
            },
            tooltip: {
            	enabled : true,
            	shared: true,
				formatter : function() {
					var xtime = new Date(this.x);
					var s = xtime.getSeconds()+'.'+xtime.getMilliseconds() + 'sec : ' + this.y + '%';
					return s.replace("00","");
				}, 
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    lineWidth: 1,
                    marker: {
                        enabled: false
                    },
                    shadow: false,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: 0
                },
                series: {
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function() {
                            	alert("아야>_<! 아무거나 띄울거야~!!!");
                            	alert(this.options.url);
                                window.parent.document.getElementById("cpuTable").setAttribute("src",this.options.url);
                            }
                        }
                    }
                }
            },
            
            series: [{
                type: 'area',
                name: 'Usage',
                pointInterval: 100, //0.1초단위
                pointStart: Date.UTC(2013, 0, 1, <%=h%>, <%=m%>, <%=s%>), //시작날짜
                data: [<%=result%>
                ],
                animation: {
                    duration: 2500
                }
            }],
            credits: {
                enabled: false
            }
        });
    });
</script>
</head>
<body>	
	<div id="container" style="width: 95%; height: 325px; margin: 0 auto;"></div>
</body>
</html>