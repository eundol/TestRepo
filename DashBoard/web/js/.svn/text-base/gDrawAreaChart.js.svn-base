console.log("gDrawAreaChart");
var rowCountArea;
var name1Area; /* Open */
var name2Area; /* Merge */
var name3Area; /* Abandon */

xCategoriesArea = new Array();
dataOpenArea = new Array();
dataMergeArea = new Array();
dataAbandonArea = new Array();
var xCategoriesAreaLen;

function makeArr(arr1, arr2, arr3, arr4) {
	// arr1 : dataOpenArea, arr2 : dataMergeArea, arr3 : dataAbandonArea, arr4 : xCategoriesArea

	console.log("test function start :D");

	for ( var i = 0; i < arr1.length; i++) {
		dataOpenArea[i] = parseInt(arr1[i], 10);
		dataMergeArea[i] = parseInt(arr2[i], 10);
		dataAbandonArea[i] = parseInt(arr3[i], 10);
	}

	for ( var i = 0; i < arr4.length; i++) {
		xCategoriesArea[i] = arr4[i];
	}

	console.log("test function finish...");
}

function initialize(a, b, c, d) {
	console.log("function start - initialize");

	rowCountArea = a;
	name1Area = b;
	name2Area = c;
	name3Area = d;
	xCategoriesAreaLen = xCategoriesArea.length;
	
	console.log("rowCountArea : " + rowCountArea);
	console.log("name1Area : " + name1Area);
	console.log("name2Area : " + name2Area);
	console.log("name3Area : " + name3Area);
	console.log("xCategoriesArea Length : " + xCategoriesAreaLen);
	console.log("function finish - initialize");
}

/* ****** Draw AreaChart Function ****** */
function drawAreaChart() {
	console.log("function start - drawAreaChart");

	$(document).ready(function() {
		var optionsArea = { // var chart = new Highcharts.Chart(> options
			chart : {

				renderTo : 'area_chart',
				type : 'area',
				width : 480,
				height : 300
			},
			title : {

				text : ''

			},
			subtitle : {

				text : ''
			},
			xAxis : {

				categories : [], // xCategoriesArea

				tickmarkPlacement : 'on',
				title : {

					text : '[week]',
					align : 'high',

				}
			},
			yAxis : {

				title : {

					text : ''

				}
			},

			// tooltip
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

			plotOptions : {

				area : {

					stacking : 'normal',
					lineColor : '#666666',
					lineWidth : 1,
					marker : {

						lineWidth : 1,
						lineColor : '#666666'
					}
				}
			},
			credits : {

				enabled : false
			},

			//exporting: { enabled: false },
			
			series : [ { 
				/* ****** OPEN - red ****** */
				name : name1Area, // name1Area : OPEN
				color : '#D80F34',	// OPEN - red

				data : [
				// dataOpenArea
				],
			}, 
			{
				/* ****** Merge - Green ******  */
				name : name2Area, // name2Area : Merge
				color : '#09BA18', // Merge-green

				data : [
				// dataMergeArea
				]
			}, 
			{
				/* ****** Abandon - yellow */
				name : name3Area, // name3Area : Abandon
				color : '#F4F80C', // Abandon - yellow
				data : [
				// dataAbandonArea
				]
			} ]
		}

		// x-categories
		for ( var i = 0; i < xCategoriesAreaLen /* xCategoriesArea.length */; i++)
			optionsArea.xAxis.categories.push(xCategoriesArea[i]);

		// open, merge, abandon data
		if (optionsArea.series[0].name == name1Area) {
			for ( var i = 0; i < xCategoriesAreaLen; i++)
				// 3 means open, merge, abandon
				optionsArea.series[0].data.push(dataOpenArea[i]);
			console.log("1");
		}

		if (optionsArea.series[1].name == name2Area) {
			for ( var i = 0; i < xCategoriesAreaLen; i++)
				optionsArea.series[1].data.push(dataMergeArea[i]);
			console.log("2");
		}

		if (optionsArea.series[2].name == name3Area) {
			for ( var i = 0; i < xCategoriesAreaLen; i++)
				optionsArea.series[2].data.push(dataAbandonArea[i]);
			console.log("3");
		}

		var chartArea = new Highcharts.Chart(optionsArea);

	});

	console.log("function finish - drawAreaChart");
}
