<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="dataEntity.*"%>
<%@ page import="java.text.DecimalFormat" %>
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
<title>Enyo Test Report :: LG Electronics</title>
<script src="js/jquery-1.4.4.min.js"></script>
<script src="js/highcharts.js"></script>
<script src="js/highcharts-more.js"></script>
<script src="js/modules/exporting.js"></script>
</head>
<%
ArrayList<TestResultEntity> testResultList = (ArrayList<TestResultEntity>)request.getAttribute("testResultList");
String nameLast = "pie"; String nameSortLast = ""; String versionLast = ""; String start_timeLast = ""; int apiLast=0; int test_caseLast=0; int passLast=0; int failLast=0; int errorLast=0; String durationLast="";
if(!testResultList.isEmpty()){
	TestResultEntity entity = testResultList.get(testResultList.size()-1);
	nameLast = entity.getName();
	nameSortLast = entity.getNameSort();
	versionLast = entity.getVersion();
	start_timeLast = entity.getStart_time();
	apiLast = entity.getApi();
	test_caseLast = entity.getTest_case();
	passLast = entity.getPass();
	failLast = entity.getFail();
	errorLast = entity.getError();
	durationLast = entity.getDuration();		
}
String passData = ""; String failData = ""; String errorData = ""; String xCategories = "";
HashMap<String,String> masterMap = new HashMap<String,String>();
masterMap.put("pre12", "11-20");
masterMap.put("rc.1", "11-26");
masterMap.put("rc.2", "12-08");
masterMap.put("rc.3", "12-16");
masterMap.put("rc.4", "12-21");
masterMap.put("rc.5", "01-28");
masterMap.put("memory overflow", "11-28");
masterMap.put("script naming", "12-14");
masterMap.put("virtual keyboard", "12-14");
masterMap.put("rc.5 (Candidate)", "01-10");
masterMap.put("rc.5 (Patch)", "02-04");
HashMap<String,Integer> pointMap = new HashMap<String,Integer>();
pointMap.put("pre12", 0);
pointMap.put("rc.1", 0);
pointMap.put("rc.2", 0);
pointMap.put("rc.3", 0);
pointMap.put("rc.4", 0);
pointMap.put("rc.5", 0);
HashMap<String,Integer> issueMap = new HashMap<String,Integer>();
issueMap.put("memory overflow", 0);
issueMap.put("script naming", 0);
issueMap.put("virtual keyboard", 0);
issueMap.put("rc.5 (Candidate)", 0);
issueMap.put("rc.5 (Patch)", 0);

int showRange = 20;

int startIndex = testResultList.size() - showRange;
for(int i = startIndex ; i < testResultList.size() ; i++){
	TestResultEntity entity = testResultList.get(i);
	passData += "" + entity.getPass()+ ",";
	failData += "" + entity.getFail()+ ",";
	errorData += "" + entity.getError()+ ",";
	xCategories += "'" + entity.getStart_time().substring(5,11).trim() + "<br>" 
					+ entity.getVersion().substring(entity.getVersion().indexOf("Enyo")) + "',";
	ArrayList<String> masterMapKeys = new ArrayList<String>(masterMap.keySet());
	for(int j = 0 ; j < masterMapKeys.size() ; j++){
		String keyValue = masterMapKeys.get(j);
		if(entity.getStart_time().substring(5,11).trim().equals(masterMap.get(keyValue))){
			if(pointMap.keySet().contains(keyValue)){
				pointMap.put(keyValue, i - startIndex);	}
			if(issueMap.keySet().contains(keyValue)){
				issueMap.put(keyValue, i - startIndex);	}
			}
		}
	}
	/* if(entity.getStart_time().substring(5,11).trim().equals(masterMap.get("pre12"))){
		pointMap.put("pre12", i + 1 - startIndex);	}
	if(entity.getStart_time().substring(5,11).trim().equals(masterMap.get("rc.1"))){
		pointMap.put("rc.1", i + 1 - startIndex);	}
	if(entity.getStart_time().substring(5,11).trim().equals(masterMap.get("rc.2"))){
		pointMap.put("rc.2", i + 1 - startIndex);	}
	if(entity.getStart_time().substring(5,11).trim().equals(masterMap.get("rc.3"))){
		pointMap.put("rc.3", i + 1 - startIndex);	}
	if(entity.getStart_time().substring(5,11).trim().equals(masterMap.get("memory overflow"))){
		issueMap.put("memory overflow", i + 1 - startIndex);	}
	if(entity.getStart_time().substring(5,11).trim().equals(masterMap.get("script naming"))){
		issueMap.put("script naming", i + 1 - startIndex);	}
	if(entity.getStart_time().substring(5,11).trim().equals(masterMap.get("virtual keyboard"))){
		issueMap.put("virtual keyboard", i + 1 - startIndex);	} */
System.out.println("pointMap : " + pointMap);
System.out.println("issueMap : " + issueMap);
passData = passData.substring(0, passData.length()-1);
failData = failData.substring(0, failData.length()-1);
errorData = errorData.substring(0, errorData.length()-1);
xCategories = xCategories.substring(0, xCategories.length()-1);
%>
<script type="text/javascript">
$(function () {
	
	// Radialize the colors
/* 	Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function(color) {
	    return {
	        radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
	        stops: [
	            [0, color],
	            [1, Highcharts.Color(color).brighten(0).get('rgb')] // darken
	        ]
	    };
	}); */
	
    $('#container2').highcharts({
    	credits: {
			  /* enabled : false */	   
    		text: 'SWP/LGSI lab.',
    		href: 'javascript:window.open("http://collab.lge.com/main/display/RCRTP/III.+Enyo+API+Test");'
	    },
        chart: {
            type: 'area',
        },
        title: {
            text: 'Enyo API Test'
        },
        subtitle: {
            text: 'The latest Testing has done at <%=nameSortLast.substring(0,4)%>-<%=nameSortLast.substring(4,6)%>-<%=nameSortLast.substring(6,8)%>, including <%=apiLast%> Components and <%=test_caseLast%> Testcases.',
            style: {
            	color: '#D9036A',
            },
            y:35
        },
        xAxis: {
            labels: {
                formatter: function() {
                    return this.value.substring(0,5).replace('-','/'); // clean, unformatted number for year
                }
            },
            categories: [<%=xCategories%>]
        },
        yAxis: {
            title: {
                text: 'Test Cases'
            },
            labels: {
                formatter: function() {
                    return this.value;
                }
            },
            maxPadding : 0.3,
            endOnTick: false
        },
        tooltip: {
            shared: true,
            /* valueSuffix: ' cases ', */
            style:{
				fontWeight: 'normal'            	
            },
            formatter: function() {
                var s = '<span style="font-size:10px;">'+ this.x +'</span>';
                
                $.each(this.points, function(i, point) {
                    s += '<br/><span style="color:'+ point.series.color +'">'+ point.series.name +': </span>'+
                        '<b>' + point.y +' cases' + '</b>' ;
                });
                
                <%ArrayList<String> list = new ArrayList<String>();
                	list.addAll(masterMap.values());
                	HashSet<String> hs = new HashSet<String>(list);
                	Iterator<String> it = hs.iterator();
                	list.clear();
                	while(it.hasNext()){ 
                	    list.add(it.next()); 
                	} 
                	
                	for(int i = 0 ; i < list.size() ; i++){
                %>
						if(this.x.substring(0,5).trim() == '<%=list.get(i)%>'){
						<%
							Set<String> masterkeys =  masterMap.keySet();
					        ArrayList<String> masterKeyList = new ArrayList<String>();
					        masterKeyList.addAll(masterkeys);
					        
							for(int j = 0 ; j < masterKeyList.size() ; j++){
								if(masterMap.get(masterKeyList.get(j)).equals(list.get(i))){
									Set<String> issuekeys = issueMap.keySet();
							        ArrayList<String> issueKeyList = new ArrayList<String>();
							        issueKeyList.addAll(issuekeys);
							        for(int z = 0 ; z < issueKeyList.size() ; z++){
							        	if(masterKeyList.get(j).equals(issueKeyList.get(z))){
									%>
										s += '<br><span style="font-weight:bold;color:red;font-family: 돋움,Dotum,Helvetica,sans-serif;">* ' + '<%=masterKeyList.get(j)%>' + ' issue</span>';
									<%
							        	}
							        }
							        
								}
							}
						%>
						}                
                	<%}%>
                
                return s;
            },
        
        },
        plotOptions: {
            area: {
            	stacking: 'normal',
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                    	
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: [
		{
            name: 'Fail',
            data: [<%=failData%>],
            animation: {
                duration: 1800
            }
        }, {
		    name: 'Error',
		    data: [<%=errorData%>],
		    animation: {
		        duration: 1800
		    }
		}, {
            name: 'Pass',
            data: [<%=passData%>],
                animation: {
                    duration: 1800
                }
        }
        ],
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
	                point.plotX  + chart.plotLeft - 15, 
	                77
	            ).attr({
	                zIndex: 5,
	                name: 'recText'
	            }).add();
	        var box = text.getBBox();
	        chart.renderer.rect(box.x - 4, box.y - 3, box.width + 8, box.height + 6, 5)
	            .attr({
	                fill: 'rgba(255, 255, 255, 0.5)',
	                stroke: 'gray',
	                'stroke-width': 1,
	                zIndex: 4,
	                name: 'recBox'
	            })
	            .add();
        <%}}%>
      	
      	<% Set<String> issuekeys =  issueMap.keySet();
        ArrayList<String> issueKeyList = new ArrayList<String>();
        issueKeyList.addAll(issuekeys);
        ArrayList<Integer> setPointList = new ArrayList<Integer>();
        for(int i = 0 ; i < issueKeyList.size() ; i++){
        	if(issueMap.get(issueKeyList.get(i)) > 0){
        		int count = 0;
        		for(int x = 0 ; x < setPointList.size() ; x++){
        			if(setPointList.get(x) == issueMap.get(issueKeyList.get(i))){
        				count++;
        			}
        		}
        		setPointList.add(issueMap.get(issueKeyList.get(i)));
        %>
	      	var point = chart.series[0].data[<%=issueMap.get(issueKeyList.get(i))%>];
	        var text = chart.renderer.text(
	        		<%if(issueKeyList.get(i).contains(" ")){%>
	        		'<span style="font-weight:normal;"><%=issueKeyList.get(i).split(" ")[0]%></span><br><span style="font-weight:normal;"><%=issueKeyList.get(i).split(" ")[1]%></span>',
	        		<%}else{%>
	        		'<span style="font-weight:normal;"><%=issueKeyList.get(i)%></span>',
	        		<%}%>
	                point.plotX + chart.plotLeft - 15,
	                86 + <%=40*count%>
	            ).attr({
	                zIndex: 7,
	                name: 'recText2'
	            }).add();
	        var box = text.getBBox();
	        chart.renderer.rect(box.x - 4, box.y - 2, box.width + 8, box.height + 3, 5)
	            .attr({
	                fill: 'rgba(255, 255, 255, 0.5)',
	                stroke: 'red',
	                'stroke-width': 1,
	                zIndex: 6,
	                name: 'recBox2'
	            })
	            .add();
        <%}}%>
      	
        var text = chart.renderer.text(
        		'<span style="font-weight:normal; font-size:9px; cursor:pointer">version</span>', 
                13/* chart.plotLeft - 58 */, 
                22
            ).attr({
                zIndex: 7,
            }).on('click', function(){
            	function toHide(array){
					for(var i = 0 ; i < array.length ; i++){
						array[i].setAttribute('style','visibility:hidden');
					};            		
            	};
            	function toShow(array){
					for(var i = 0 ; i < array.length ; i++){
						array[i].setAttribute('style','visibility:visible');
					};            		
            	};
            	var recTexts = document.getElementsByName('recText');
            	var recBoxs = document.getElementsByName('recBox');
            	if(recTexts[0] != null && recTexts[0].getAttribute('style') == 'visibility:hidden'){
        			toShow(recTexts);
        			toShow(recBoxs);
        			document.getElementsByName('versionBox')[0].setAttribute('fill','rgba(255, 255, 255, 0.5)');
            	}else{
            		document.getElementsByName('versionBox')[0].setAttribute('fill','#D1D1D1');
	            	toHide(recTexts);
    	        	toHide(recBoxs);
            	}
				
            }).add();
        var box = text.getBBox();
        chart.renderer.rect(box.x - 4, box.y - 3, box.width + 8, box.height + 6, 5)
            .attr({
                fill: 'rgba(255, 255, 255, 0.85)',
                stroke: 'gray',
                'stroke-width': 1,
                zIndex: 6,
                name: 'versionBox'
            })
            .add();
        
        var text = chart.renderer.text(
        		'<span style="font-weight:normal; font-size:9px; cursor:pointer;">issue</span>', 
                62/* chart.plotLeft - 58 */, 
                22
            ).attr({
                zIndex: 7,
            }).on('click', function(){
            	function toHide(array){
					for(var i = 0 ; i < array.length ; i++){
						array[i].setAttribute('style','visibility:hidden');
					};            		
            	};
            	function toShow(array){
					for(var i = 0 ; i < array.length ; i++){
						array[i].setAttribute('style','visibility:visible');
					};            		
            	};
            	var recTexts = document.getElementsByName('recText2');
            	var recBoxs = document.getElementsByName('recBox2');
            	if(recTexts[0] != null && recTexts[0].getAttribute('style') == 'visibility:hidden'){
        			toShow(recTexts);
        			toShow(recBoxs);
        			document.getElementsByName('issueBox')[0].setAttribute('fill','rgba(255, 255, 255, 0.5)');
            	}else{
            		document.getElementsByName('issueBox')[0].setAttribute('fill','#D1D1D1');
	            	toHide(recTexts);
    	        	toHide(recBoxs);
            	}
            }).add();
        var box = text.getBBox();
        chart.renderer.rect(box.x - 4, box.y - 3, box.width + 8, box.height + 6, 5)
            .attr({
                fill: 'rgba(255, 255, 255, 0.85)',
                stroke: 'red',
                'stroke-width': 1,
                zIndex: 6,
                name: 'issueBox'
            })
            .add();
      	
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
 * @author Torstein Hønsi
 */

Highcharts.theme = {
   colors: ['#ED561B', '#50B432', '#058DC7', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
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
      plotBorderWidth: 1,
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
<div id="container2" style="width: 100%; height: 350px; margin: 0 auto"></div>
</body>
</html>