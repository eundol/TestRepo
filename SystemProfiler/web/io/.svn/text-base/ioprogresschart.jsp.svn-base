<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="entity.IoProgressEntity"%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="java.text.SimpleDateFormat, java.util.Date;"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
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
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<!-- ****** Disk I/O tps 변화 추이 그래프 보여주는 페이지 ****** -->
<title>I/O Progress Chart</title>

<%
	System.out.println("io/ioprogresschart.jsp **");

	String date = (String)request.getAttribute("created");
	String id = (String)request.getAttribute("id");
	ArrayList<IoProgressEntity> ioProgresslist = new ArrayList<IoProgressEntity>();
	ioProgresslist = (ArrayList<IoProgressEntity>)request.getAttribute("ioProgresslist");
	String yMax = (String)request.getAttribute("yMax");
	
	String tpsResult = "";
	String tps = null;
	String reads = null;
	String wrtns = null;
	
	String h = null;
	String m = null;
	String s = null;

	if(date != null){
		String start = date.substring(6);
		h = start.substring(0, 2);
		m = start.substring(3, 5);
		s = start.substring(6, 8);

		/*
		* Data setting start
		*/
		for (int i = 0, size = ioProgresslist.size(); i < size; i++) {
	IoProgressEntity entity = new IoProgressEntity();
	entity = ioProgresslist.get(i);
	
	String sequence = entity.getSequence();
	tps = String.valueOf(entity.getTpsSequencePoint());
	reads = String.valueOf(entity.getReadsSequencePoint());
	wrtns = String.valueOf(entity.getWrtnsSequencePoint());
	tpsResult = tpsResult + "{y : " + tps + ", id : " + id +", sequence : " + sequence +", reads : " + reads + ", wrtns : " + wrtns + "}";
	if(i != size-1){
		tpsResult += ",";
	}
		}
		
	}else{
		h = "00";
		m = "00";
		s = "00";
		tpsResult = "{y : 0, sequence : 0, id: 0, reads: 0, wrtns: 0}";
	}
	//Data Setting End
%>
<script type="text/javascript"
	src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
<script src="js/highcharts.js"></script>
<script src="js/highcharts-more.js"></script>
<script src="js/modules/exporting.js"></script>
<script src="js/main.js" charset="euc-kr"></script>
<script type="text/javascript">
	$(function() {
		$('#container7')
				.highcharts(
						{
							
							chart : {
								zoomType : 'x',
								spacingRight : 20,
								type: 'spline'
							},
							title : {
								text : 'IO Transfer(I/O request) Per Second'
							},
							subtitle : {
								text : document.ontouchstart === undefined ? 'Click and drag in the plot area to zoom in'
										: 'Drag your finger over the plot to zoom in'
							},
							xAxis : {
								type : 'datetime',
				                dateTimeLabelFormats: { // don't display the dummy year
				                	second: '%H:%M:%S'
				                },
								maxZoom : 1000, // 1 second
								minTickInterval : 1000 // 1 second
							},
							yAxis : {
								minorTickInterval : 'auto',
								lineColor : '#000',
								lineWidth : 1,
								tickWidth : 1,
								tickColor : '#000',
								type : 'linear',
								title : {
									text : 'Speed (tps)'
								},
								max :<%=yMax%>
							},
							tooltip : {
								formatter : function() {
									var xtime = new Date(this.x);
									var s = xtime.getSeconds() + 'sec :<br/>'
											+ this.y + 'tps<br/>';
									/*
									$.each(this.points, function(i, point){
										s += point.series.data[0].reads + 'read_s<br/>' +
										point.series.data[1].reads + 'read_s<br/>' +
										point.series.data[2].reads + 'read_s<br/>' + i;
									});*/

									return s;
									//return s.replace("00","","");
								},
							},
							legend : {
								enabled : false
							},
							plotOptions : {
								area : {
									fillColor : {
										linearGradient : [ 0, 0, 0, 70 ],
										stops : [
												[
														0,
														Highcharts.getOptions().colors[0] ],
												[
														1,
														Highcharts
																.Color(
																		Highcharts
																				.getOptions().colors[0])
																.setOpacity(0)
																.get('rgba') ] ]
									},
									borderWidth: 1,
									marker : {
										enabled : true
									},
									states : {
										hover : {
											lineWidth : 1
										}
									},
									threshold : 0
								},
								series : {

									cursor : 'pointer',
									point : {
										events : {
											click : function() {
												//alert(this.options.reads);
												window.parent.document
														.getElementById(
																"ioTable")
														.setAttribute(
																"src",
																"./iotableview?sequence="
																		+ this.options.sequence
																		+ "&id="
																		+ this.options.id);
											}
										}
									}
								}

							},

							series : [ {
								type : 'area',
								name : 'Tps',
								pointInterval : 1000, //1초단위
								pointStart : Date.UTC(2013, 04, 12,<%=h%>,<%=m%>,<%=s%>), //시작날짜
								data : [<%=tpsResult%>],
								animation : {
									duration : 2500
								},
							dataLabels: {
			                    enabled: true,
			                    formatter: function() {
			                        return Highcharts.numberFormat(this.y) +'tps';
			             	  	 },
			                    style: {
			                        color: '#333',
			                        fontWeight: 'bold',
			                        fontSize: '9px',
			                        fontFamily: 'Trebuchet MS, Verdana, sans-serif'
			                     }
							}
							}
							],
							credits : {
								enabled : false
							}
						});
	});

	/**
	 * Grid theme for Highcharts JS
	 * @author Torstein Hønsi
	 */

	Highcharts.theme = {
		colors : [ '#ED561B', '#058DC7', '#50B432', '#DDDF00', '#24CBE5',
				'#64E572', '#FF9655', '#FFF263', '#6AF9C4' ],
		chart : {
			backgroundColor : {
				linearGradient : {
					x1 : 0,
					y1 : 0,
					x2 : 1,
					y2 : 1
				},
				stops : [ [ 0, 'rgb(255, 255, 255)' ],
						[ 1, 'rgb(240, 240, 255)' ] ]
			},
			borderWidth : 1,
			plotBackgroundColor : 'rgba(255, 255, 255, .9)',
			plotShadow : true,
			plotBorderWidth : 1
		},
		title : {
			style : {
				color : '#B22222'
			/* font: 'bold 16px "Trebuchet MS", Verdana, sans-serif' */
			}
		},
		subtitle : {
			style : {
				color : '#666666',
				font : 'bold 12px "Trebuchet MS", Verdana, sans-serif'
			},
			y : 34
		},
		xAxis : {
			gridLineWidth : 1,
			lineColor : '#000',
			tickColor : '#000',
			labels : {
				style : {
					color : '#000',
					font : '11px Trebuchet MS, Verdana, sans-serif'
				}
			},
			title : {
				style : {
					color : '#333',
					fontWeight : 'bold',
					fontSize : '12px',
					fontFamily : 'Trebuchet MS, Verdana, sans-serif'
				}
			}
		},
		yAxis : {
			minorTickInterval : 'auto',
			lineColor : '#000',
			lineWidth : 1,
			tickWidth : 1,
			tickColor : '#000',
			labels : {
				style : {
					color : '#000',
					font : '11px Trebuchet MS, Verdana, sans-serif'
				}
			}
		},
		legend : {
			itemStyle : {
				font : '9pt Trebuchet MS, Verdana, sans-serif',
				color : 'black'
			},
			itemHoverStyle : {
				color : '#039'
			},
			itemHiddenStyle : {
				color : 'gray'
			}
		},
		labels : {
			style : {
				color : '#99b'
			}
		},
		navigation : {
			buttonOptions : {
				theme : {
					stroke : '#CCCCCC'
				}
			}
		},
	};
	// Apply the theme
	var highchartsOptions = Highcharts.setOptions(Highcharts.theme);
</script>
</head>
<body>
	<div id="container7" style="width: 95%; height: 325px; margin: 0 auto;"></div>
</body>
</html>