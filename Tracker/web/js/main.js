/* main.js*/
var baseUrl = "";

function onMouseClickBrand()
{
	console.log("Logo onMouseClickEvent");
	
	var brandLogo = document.getElementsByName("brandLogo")[0];
	console.log(brandLogo);
	brandLogo.href=baseUrl;
}

function onMouseClick1()
{
	console.log("Summary onMouseClickEvent");

	var list = document.getElementsByName("list")[0];
	console.log(list);
	list.href=baseUrl+"tSummary.jsp";
	
}

function onMouseClick2()
{
	console.log("CommonPlatform onMouseClickEvent");

	var list = document.getElementsByName("list")[1];
	console.log(list);
	list.href=baseUrl+"tCommonPlatform.jsp";

	
}

function onMouseClick3()
{
	console.log("ProductPlatform onMouseClickEvent");

	var list = document.getElementsByName("list")[2];
	console.log(list);
	list.href=baseUrl+"tProductPlatform.jsp";
}

function onMouseClick4()
{

	console.log("Component onMouseClickEvent");

	var list = document.getElementsByName("list")[3];
	console.log(list);
	list.href=baseUrl+"tComponent.jsp";
//	var iframe = document.getElementsByName("iframe")[0];
//	console.log(iframe);
//	iframe.src="commonplatform.jsp";
}