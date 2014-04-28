console.log("Before Entering drawChart Function");

var chart;
var rowCount;
var rsGetInt1;
var rsGetInt2;
var columnName1;
var columnName2;


function initialize(a, b, c, d, e) {
	console.log("***Entering initialize function***");

	rowCount = a;
	rsGetInt1 = b;
	rsGetInt2 = c;
	columnName1 = d;
	columnName2 = e;

	console.log("(1) rowCount : " + rowCount);
	console.log("(1) rsGetInt1 : " + rsGetInt1);
	console.log("(1) rsGetInt2 : " + rsGetInt2);
	console.log("(1) columnName1 : " + columnName1);
	console.log("(1) columnName2 : " + columnName2);

}

function drawChart() {
	console.log("***Entering drawChart function***");

	console.log("(2) rowCount : " + rowCount);
	console.log("(2) rsGetInt1 : " + rsGetInt1);
	console.log("(2) rsGetInt2 : " + rsGetInt2);
	console.log("(2) columnName1 : " + columnName1);
	console.log("(2) columnName2 : " + columnName2);
	
	/* Convert String to Integer in .js */
//	var y1 = parseInt(rsGetInt1, 10);
//	console.log("check1 : "+y1);
	
//	var y2 = parseInt(rsGetInt2, 10);
//	console.log("check2 : "+y2);
	
	$(document).ready(function() {
		
				var chart = new Highcharts.Chart({
					chart : {
						renderTo : 'piChart', /* <div> id */
						plotBackgroundColor : null,
						plotBorderWidth : null,
						plotShadow : false,
						backgroundColor : '#FFFFFF'
					},
					title : {
						text : ''
					},

					tooltip : {
						enabled : false,
						pointFormat : '<b>{point.y}</b>',

						percentageDecimals : 1

					},
					credits : {

						enabled : false
					},

					plotOptions : {
						pie : {
							size : '90%',
							allowPointSelect : true,
							cursor : 'pointer',
							size : '80%',
							dataLabels : {
								distance : -60,
								color : 'white',

								style : {
									fontWeight : 'bold',
									fontSize : '12px'

								},

								formatter : function() {

									percentageDecimals: 1;
									return '<b>' + this.percentage.toFixed(1)
											+ '</b>' + '%' + '<br/>' + '('
											+ '<b>' + this.y + '</b>' + ' Issues'
											+ ')';

								}
							},
							showInLegend : true

						}
					},
					series : [ {
						type : 'pie',

						data : [ {
							name : columnName1, /*columnName1*/
							y : rsGetInt1, /*rsGetInt1*/
							color : '#ED9595' 	/*#FF8080*/
						},

						{

							name : columnName2, /*columnName2*/
							y :  rsGetInt2, /* rsGetInt2*/
							color : '#5587ED'	/*#0066CC*/
						},

						]
					} ]
				});
			});
	
	console.log("***end check***");
}