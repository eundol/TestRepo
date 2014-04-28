console.log("gDrawBarChart");
var rowCountBar;
var name1Bar; /* Open */
var name2Bar; /* Merge */
var name3Bar; /* Abandon */

xCategoriesBar = new Array();
dataOpenBar = new Array();
dataMergeBar = new Array();
dataAbandonBar = new Array();
var xCategoriesBarLen;

function makeArr(arr1, arr2, arr3, arr4) {
	// arr1 : dataOpenBar, arr2 : dataMergeBar, arr3 : dataAbandonBar, arr4 : xCategoriesBar

	console.log("test function start :D");

	for ( var i = 0; i < arr1.length; i++) {
		dataOpenBar[i] = parseInt(arr1[i], 10);
		dataMergeBar[i] = parseInt(arr2[i], 10);
		dataAbandonBar[i] = parseInt(arr3[i], 10);
	}

	for ( var i = 0; i < arr4.length; i++) {
		xCategoriesBar[i] = arr4[i];
	}

	console.log("test function finish...");
}

function initialize(a, b, c, d) {
	console.log("function start - initialize");

	rowCountBar = a;
	name1Bar = b;
	name2Bar = c;
	name3Bar = d;
	xCategoriesBarLen = xCategoriesBar.length;
	
	console.log("rowCountBar : " + rowCountBar);
	console.log("name1Bar : " + name1Bar);
	console.log("name2Bar : " + name2Bar);
	console.log("name3Bar : " + name3Bar);
	console.log("xCategoriesBar Length : " + xCategoriesBarLen);
	console.log("function finish - initialize");
}

/* ****** Draw BarChart Function ****** */
function drawBarChart() {
	console.log("function start - drawBarChart");

	$(document).ready(function() {
		var optionsBar = { // var chart = new Highcharts.Chart(> options
			chart : {

				renderTo : 'bar_chart',
				type : 'column',
				width : 850,
				height : 300
			},
			title : {

				text : ''

			},
			xAxis : {

				categories : []
			// xCategoriesBar
			},
			yAxis : {

				title : {

					text : ''

				}
			},
			plotOptions : {

				series : {

					borderColor : '',
					dataLabels : {

						enabled : true,
						color : 'black',
						shadow : false
					}
				}
			},
			tooltip : {

				formatter : function() {

					var s = '<b>' + this.x + '</b>';

					$.each(this.points, function(i, point) {
						s += '<br/>' + point.series.name + ': ' + point.y;
					});

					return s;
				},

				shared : true
			},
			credits : {

				enabled : false
			},
			series : [ { // Abandon-yellow
				name : name1Bar, // name1Bar : OPEN
				color : '#D80F34',

				data : [
				// dataOpenBar
				// *******************************
				// dataOpenBar[0], dataOpenBar[1], dataOpenBar[2]
				],
			}, {
				name : name2Bar, // name2Bar : Merge
				color : '#09BA18', // Merge-green

				data : [
				// dataMergeBar
				]
			}, {
				name : name3Bar, // name3Bar : Abandon
				color : '#F4F80C', // open red
				data : [
				// dataAbandonBar
				]
			} ]
		}

		// x-categories
		for ( var i = 0; i < xCategoriesBarLen /* xCategoriesBar.length */; i++)
			optionsBar.xAxis.categories.push(xCategoriesBar[i]);

		// open, merge, abandon data
		if (optionsBar.series[0].name == name1Bar) {
			for ( var i = 0; i <xCategoriesBarLen; i++)
				// 3 means open, merge, abandon
				optionsBar.series[0].data.push(dataOpenBar[i]);
			console.log("1");
		}

		if (optionsBar.series[1].name == name2Bar) {
			for ( var i = 0; i < xCategoriesBarLen; i++)
				optionsBar.series[1].data.push(dataMergeBar[i]);
			console.log("2");
		}

		if (optionsBar.series[2].name == name3Bar) {
			for ( var i = 0; i < xCategoriesBarLen; i++)
				optionsBar.series[2].data.push(dataAbandonBar[i]);
			console.log("3");
		}

		var chartBar = new Highcharts.Chart(optionsBar);

	});

	console.log("function finish - drawBarChart");
}

