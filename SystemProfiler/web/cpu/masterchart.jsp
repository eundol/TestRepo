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
	String result2 = "{y : 2, url : 'http://www.naver.com'}";
	String result3 = "{y : 3, url : 'http://www.naver.com'}";
	String a = null;
	String b = null;
	String c = null;
	if((Math.random()*10) > 8 ){
		for(int i = 0 ; i < 200 ; i++){
			a = String.valueOf(Math.random()*0.1).substring(2,4);
			b = String.valueOf(Math.random()*0.4).substring(2,4);
			c = String.valueOf(Math.random()*0.2).substring(2,4); 
			result = result + ", {y : " + a + ", url : 'http://www.naver.com'}";
			result2 = result2 + ", {y : " + b + ", url : 'http://www.naver.com'}";
			result3 = result3 + ", {y : " + c + ", url : 'http://www.naver.net'}";
		}
		for(int i = 0 ; i < 100 ; i++){
			a = String.valueOf(Math.random()*0.8).substring(2,4);
			b = String.valueOf(Math.random()*0.1).substring(2,4);
			c = String.valueOf(Math.random()*0.1).substring(2,4); 
			result = result + ", {y : " + a + ", url : 'http://www.naver.com'}";
			result2 = result2 + ", {y : " + b + ", url : 'http://www.naver.com'}";
			result3 = result3 + ", {y : " + c + ", url : 'http://www.naver.net'}";
		}
		for(int i = 0 ; i < 100 ; i++){
			a = String.valueOf(Math.random()*0.1).substring(2,4);
			b = String.valueOf(Math.random()*0.7).substring(2,4);
			c = String.valueOf(Math.random()*0.2).substring(2,4); 
			result = result + ", {y : " + a + ", url : 'http://www.naver.com'}";
			result2 = result2 + ", {y : " + b + ", url : 'http://www.naver.com'}";
			result3 = result3 + ", {y : " + c + ", url : 'http://www.naver.net'}";
		}
		for(int i = 0 ; i < 200 ; i++){
			a = String.valueOf(Math.random()*0.7).substring(2,4);
			b = String.valueOf(Math.random()*0.2).substring(2,4);
			c = String.valueOf(Math.random()*0.1).substring(2,4); 
			result = result + ", {y : " + a + ", url : 'http://www.naver.com'}";
			result2 = result2 + ", {y : " + b + ", url : 'http://www.naver.com'}";
			result3 = result3 + ", {y : " + c + ", url : 'http://www.naver.net'}";
		}
	}else if((Math.random()*10) > 5){	
		for(int i = 0 ; i < 200 ; i++){
			a = String.valueOf(Math.random()*0.7).substring(2,4);
			b = String.valueOf(Math.random()*0.2).substring(2,4);
			c = String.valueOf(Math.random()*0.1).substring(2,4); 
			result = result + ", {y : " + a + ", url : 'http://www.naver.com'}";
			result2 = result2 + ", {y : " + b + ", url : 'http://www.naver.com'}";
			result3 = result3 + ", {y : " + c + ", url : 'http://www.naver.net'}";
		}
		for(int i = 0 ; i < 100 ; i++){
			a = String.valueOf(Math.random()*0.1).substring(2,4);
			b = String.valueOf(Math.random()*0.2).substring(2,4);
			c = String.valueOf(Math.random()*0.4).substring(2,4); 
			result = result + ", {y : " + a + ", url : 'http://www.naver.com'}";
			result2 = result2 + ", {y : " + b + ", url : 'http://www.naver.com'}";
			result3 = result3 + ", {y : " + c + ", url : 'http://www.naver.net'}";
		}
		for(int i = 0 ; i < 100 ; i++){
			a = String.valueOf(Math.random()*0.1).substring(2,4);
			b = String.valueOf(Math.random()*0.4).substring(2,4);
			c = String.valueOf(Math.random()*0.3).substring(2,4); 
			result = result + ", {y : " + a + ", url : 'http://www.naver.com'}";
			result2 = result2 + ", {y : " + b + ", url : 'http://www.naver.com'}";
			result3 = result3 + ", {y : " + c + ", url : 'http://www.naver.net'}";
		}
		for(int i = 0 ; i < 200 ; i++){
			a = String.valueOf(Math.random()*0.1).substring(2,4);
			b = String.valueOf(Math.random()*0.3).substring(2,4);
			c = String.valueOf(Math.random()*0.3).substring(2,4); 
			result = result + ", {y : " + a + ", url : 'http://www.naver.com'}";
			result2 = result2 + ", {y : " + b + ", url : 'http://www.naver.com'}";
			result3 = result3 + ", {y : " + c + ", url : 'http://www.naver.net'}";
		}
	}else{
		for(int i = 0 ; i < 200 ; i++){
			a = String.valueOf(Math.random()*0.3).substring(2,4);
			b = String.valueOf(Math.random()*0.4).substring(2,4);
			c = String.valueOf(Math.random()*0.3).substring(2,4); 
			result = result + ", {y : " + a + ", url : 'http://www.naver.com'}";
			result2 = result2 + ", {y : " + b + ", url : 'http://www.naver.com'}";
			result3 = result3 + ", {y : " + c + ", url : 'http://www.naver.net'}";
		}
		for(int i = 0 ; i < 100 ; i++){
			a = String.valueOf(Math.random()*0.3).substring(2,4);
			b = String.valueOf(Math.random()*0.1).substring(2,4);
			c = String.valueOf(Math.random()*0.6).substring(2,4); 
			result = result + ", {y : " + a + ", url : 'http://www.naver.com'}";
			result2 = result2 + ", {y : " + b + ", url : 'http://www.naver.com'}";
			result3 = result3 + ", {y : " + c + ", url : 'http://www.naver.net'}";
		}
		for(int i = 0 ; i < 100 ; i++){
			a = String.valueOf(Math.random()*0.1).substring(2,4);
			b = String.valueOf(Math.random()*0.8).substring(2,4);
			c = String.valueOf(Math.random()*0.1).substring(2,4); 
			result = result + ", {y : " + a + ", url : 'http://www.naver.com'}";
			result2 = result2 + ", {y : " + b + ", url : 'http://www.naver.com'}";
			result3 = result3 + ", {y : " + c + ", url : 'http://www.naver.net'}";
		}
		for(int i = 0 ; i < 200 ; i++){
			a = String.valueOf(Math.random()*0.1).substring(2,4);
			b = String.valueOf(Math.random()*0.2).substring(2,4);
			c = String.valueOf(Math.random()*0.7).substring(2,4); 
			result = result + ", {y : " + a + ", url : 'http://www.naver.com'}";
			result2 = result2 + ", {y : " + b + ", url : 'http://www.naver.com'}";
			result3 = result3 + ", {y : " + c + ", url : 'http://www.naver.net'}";
		}	
	}
%>
<script type="text/javascript">
$(function () {
    
    var masterChart,
    detailChart;

$(document).ready(function() {


    // create the master chart
    function createMaster() {
        masterChart = $('#master-container').highcharts({
            chart: {
                reflow: false,
                borderWidth: 0,
                backgroundColor: null,
                marginLeft: 50,
                marginRight: 20,
                zoomType: 'x',
                events: {

                    // listen to the selection event on the master chart to update the
                    // extremes of the detail chart
                    selection: function(event) {
                        var extremesObject = event.xAxis[0],
                            min = extremesObject.min,
                            max = extremesObject.max,
                            detailData = [],
                            detailData2 = [],
                            detailData3 = [],
                            xAxis = this.xAxis[0];

                        // reverse engineer the last part of the data
                        jQuery.each(this.series[0].data, function(i, point) {
                            if (point.x > min && point.x < max) {
                                detailData.push({
                                    x: point.x,
                                    y: point.y
                                });
                            }
                        }
                        );
                        
                        jQuery.each(this.series[1].data, function(i, point) {
                            if (point.x > min && point.x < max) {
                                detailData2.push({
                                    x: point.x,
                                    y: point.y
                                });
                            }
                        }
                        );
                        
                        jQuery.each(this.series[2].data, function(i, point) {
                            if (point.x > min && point.x < max) {
                                detailData3.push({
                                    x: point.x,
                                    y: point.y
                                });
                            }
                        }
                        );

                        // move the plot bands to reflect the new detail span
                        xAxis.removePlotBand('mask-before');
                        xAxis.addPlotBand({
                            id: 'mask-before',
                            from: Date.UTC(2013, 0, 1, <%=h%>, <%=m%>, <%=s%>),
                            to: min,
                            color: 'rgba(0, 0, 0, 0.2)'
                        });

                        xAxis.removePlotBand('mask-after');
                        xAxis.addPlotBand({
                            id: 'mask-after',
                            from: max,
                            to: Date.UTC(2013, 0, 2, <%=h%>, <%=m%>, <%=s%>),
                            color: 'rgba(0, 0, 0, 0.2)'
                        });

                        detailChart.series[0].setData(detailData);
                        detailChart.series[1].setData(detailData2);
                        detailChart.series[2].setData(detailData3);

                        return false;
                    }
                }
            },
            title: {
                text: null
            },
            xAxis: {
                type: 'datetime',
                showLastTickLabel: true,
                maxZoom: 8000, // 8 seconds
                plotBands: [{
                    id: 'mask-before',
                    from: Date.UTC(2013, 0, 1, <%=h%>, <%=m%>, <%=s%>),
                    to: Date.UTC(2013, 0, 1, <%=h%>, <%=m%>, <%=s%>+55),
                    color: 'rgba(0, 0, 0, 0.2)'
                }],
                title: {
                    text: null
                }
            },
            yAxis: {
                gridLineWidth: 0,
                labels: {
                    enabled: false
                },
                title: {
                    text: null
                },
                min: 0,
                max: 100,
                showFirstLabel: false
            },
            tooltip: {
                formatter: function() {
                    return false;
                }
            },
            legend: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                series: {
                    fillColor: {
                        linearGradient: [0, 0, 0, 70],
                        stops: [
                            [0, '#4572A7'],
                            [1, 'rgba(0,0,0,0)']
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
                    enableMouseTracking: false
                }
            },

            series: [
           {
                type: 'area',
                name: 'CPU Usage',
                pointInterval: 100, //0.1초단위,
                pointStart: Date.UTC(2013, 0, 1, <%=h%>, <%=m%>, <%=s%>),
                data: [<%=result%>]
            },
           {
                type: 'area',
                name: 'CPU Usage',
                pointInterval: 100, //0.1초단위,
                pointStart: Date.UTC(2013, 0, 1, <%=h%>, <%=m%>, <%=s%>),
                data: [<%=result2%>]
            },
           {
                type: 'area',
                name: 'CPU Usage',
                pointInterval: 100, //0.1초단위,
                pointStart: Date.UTC(2013, 0, 1, <%=h%>, <%=m%>, <%=s%>),
                data: [<%=result3%>]
            }
            ],

            exporting: {
                enabled: false
            }

        }, function(masterChart) {
            createDetail(masterChart)
        })
        .highcharts(); // return chart instance
    }
    
        // create the detail chart
        function createDetail(masterChart) {
    
            // prepare the detail chart
            var detailData = [],
                detailStart = Date.UTC(2013, 0, 1, <%=h%>, <%=m%>, <%=s%>+55);
            var detailData2 = [],
                detailStart2 = Date.UTC(2013, 0, 1, <%=h%>, <%=m%>, <%=s%>+55);
            var detailData3 = [],
                detailStart3 = Date.UTC(2013, 0, 1, <%=h%>, <%=m%>, <%=s%>+55);
    
            jQuery.each(masterChart.series[0].data, function(i, point) {
                if (point.x >= detailStart) {
                    detailData.push(point.y);
                }
            });
            jQuery.each(masterChart.series[1].data, function(i, point) {
                if (point.x >= detailStart) {
                	detailData2.push(point.y);
                }
            });
            jQuery.each(masterChart.series[2].data, function(i, point) {
                if (point.x >= detailStart) {
                	detailData3.push(point.y);
                }
            });
    
            // create a detail chart referenced by a global variable
            detailChart = $('#detail-container').highcharts({
                chart: {
                    marginBottom: 120,
                    reflow: false,
                    marginLeft: 50,
                    marginRight: 20,
                    style: {
                        position: 'absolute'
                    }
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: 'Detail View',
                    style:{
                        color : '#B22222'
                    }
                },
                subtitle: {
                    text: 'Select an area by dragging across the lower chart'
                },
                xAxis: {
                     type: 'datetime',
                    	gridLineWidth: 1,
                  	lineColor: '#000',
                  	tickColor: '#000',  
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
                    maxZoom: 0.1,
                    min: 0,
                    max: 100
                },
                tooltip: {
                    formatter: function() {
                    	var xtime = new Date(this.x);
    					var s = xtime.getSeconds()+'.'+xtime.getMilliseconds() + 'sec';
    					s = s.replace("00","");
                        $.each(this.points, function(i, point){
							s += '<br/>' + point.series.name + ' : ' + point.y + '%';                        	
                        });
                        return s;
                        /* '<b>'+ point.series.name +'</b><br/>'+
                            Highcharts.dateFormat('%A %B %e %Y', this.x) + ':<br/>'+
                            '1 USD = '+ Highcharts.numberFormat(point.y, 2) +' EUR'; */
                    },
                    shared: true
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: -10,
                    y: 100,
                    borderWidth: 0,
                    floating: false,
                    backgroundColor: '#FCFFC5'
                },
                plotOptions: {
                    series: {
                        marker: {
                            enabled: false,
                            states: {
                                hover: {
                                    enabled: true,
                                    radius: 3
                                }
                            }
                        },
                        cursor: 'pointer',
                        point: {
                            events: {
                            	click: function() {
                                	alert("아야>_<! 아무거나 띄울거야~!!!");
                                	alert(this.options.url);
                                    window.parent.document.getElementById("cpuFunction").setAttribute("src","https://sso.lge.com");
                                }
                            }
                        }
                    }
                },
                series: [
                {
                    name: 'Function1',
                    pointStart: detailStart,
                    pointInterval: 100, //0.1초단위
                    pointStart: Date.UTC(2013, 0, 1, <%=h%>, <%=m%>, <%=s%>), //시작날짜
                    data: detailData,
                    animation: {
                        duration: 3000
                    }
                },
                {
                    name: 'Function2',
                    pointStart: detailStart2,
                    pointInterval: 100, //0.1초단위
                    pointStart: Date.UTC(2013, 0, 1, <%=h%>, <%=m%>, <%=s%>), //시작날짜
                    data: detailData2,
                    animation: {
                        duration: 3000
                    }
                },
                {
                    name: 'Function3',
                    pointStart: detailStart3,
                    pointInterval: 100, //0.1초단위
                    pointStart: Date.UTC(2013, 0, 1, <%=h%>, <%=m%>, <%=s%>), //시작날짜
                    data: detailData3,
                    animation: {
                        duration: 3000
                    }
                }
                         ],
    
                exporting: {
                    enabled: false
                }
    
            }).highcharts(); // return chart
        }
    
        // make the container smaller and add a second container for the master chart
        var $container3 = $('#container3')
            .css('position', 'relative');
    
        var $detailContainer = $('<div id="detail-container">')
            .appendTo($container3);
        	
        var $masterContainer = $('<div id="master-container">')
            .css({ position: 'absolute', top: 300, height: 80, width: '100%' })
            .appendTo($container3);
    
        // create master and in its callback, create the detail chart
        createMaster();
    });
    
});
</script>
</head>
<body>
<center>
<div id="container3" style="width:95%; height: 380px; margin: 0 auto;"></div>
</center>
</body>
</html>