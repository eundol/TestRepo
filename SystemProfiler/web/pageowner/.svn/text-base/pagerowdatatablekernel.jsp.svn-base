<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="./css/basic.css" type="text/css" />
<style type="text/css">
/* body {
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
} */
#downlaod{
	color: #0000FF;
	font: 10px/1.5em Verdana;
	font-weight: bolder;
}
#downlaod:visited{
	color: #0000FF;
}
#downlaod:hover{
	color: #492970;
}
</style>
<title>Profile Viewer :: LG Electronics</title>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
<script type="text/javascript">
var table_height = 400;
if(window.name == "kernelPopup"){
	table_height = 750;
}
function newPagePopup(id) {
	var url = document.URL;
 	window.open(url, "kernelPopup",
	"width=1422,height=1000,toolbar=no,location=no,resizable=yes,scrollbars=no,menubar=yes,status=no");
}
</script>
<%@ include file="scheader.jsp"%>
<%
	String id = (String)request.getAttribute("id");
	String sequence = (String)request.getAttribute("sequence");
	boolean dataFlag = (Boolean)request.getAttribute("dataFlag");
	String testCaseId = (String)request.getAttribute("testCaseId");
%>
<%String rowDataExcel = "/pagerowdataexcel?id=" + id + "&sequence=" + sequence;%>
</head>
<body>

<div id="title_kernel" style="display:none; font-weight: bold; font-family: 'Lucida Grande', 'Lucida Sans Unicode', Verdana, Arial, Helvetica, sans-serif; font-size: 16px; color: #B22222; fill: #B22222;">
PageOwner Data - <%-- <%if(sequence.equals("1")){ %>Start<%}else{ %>End<%}%> --%><span style="font-size: 15px; "><%=id + " : " + testCaseId%></span>
</div>

<span id="title_sub_kernel" onclick="javascript:newPagePopup();" title="Open new page" style="cursor:pointer; position: fixed; left: 0px; top: 3px; font: bold 12px/1.5em Verdana; border: 1px solid #cccdcf; font-size: 14px; font-family: 'Nanum-Gothic', 'arial', 'sans-serif'; color: navy; background-color: mistyrose; padding: 2px;">
&nbsp;Kernel Memory&nbsp;</span>


<script type="text/javascript">
var PageRowData = [
		        {name:"pages", title:"Pages", align:'center', width:65, cellAlign:'right'
		        	,formatCellValue : function (value, record, rowNum, colNum, grid) {
		                if (record == null || record._isGroup) {
		            	    return "&nbsp;";
		                } else {
		                	var nArr = String(value).split('').join(',').split('');
		                	  for( var i=nArr.length-1, j=1; i>=0; i--, j++)  if( j%6 != 0 && j%2 == 0) nArr[i] = '';
	                	  return nArr.join('');
		                }
		            }
		        },
		        /* {name:"order", title:"Order", align:'center', width:55, cellAlign:'right'
	        		,showGridSummary:false,
		        }, */
		        {name:"memory", title:"Memory", align:'center',width:85, cellAlign:'right'
		        	,formatCellValue : function (value, record, rowNum, colNum, grid) {
		                if (record == null || record._isGroup) {
		            	    return "&nbsp;";
		                } else {
		                	var nArr = String(value).split('').join(',').split('');
		                	  for( var i=nArr.length-1, j=1; i>=0; i--, j++)  if( j%6 != 0 && j%2 == 0) nArr[i] = '';
	                	  return nArr.join('') + ' KB';
		                }
		            }
		        },
		        {name:"pid", title:"Pid", align:'center', width:73, cellAlign:'right'
	        		,showGridSummary:false
	        		,summaryFunction:function (records, summaryField) {
		                var seenPid = {};
		                for (var i = 0; i < records.length; i++) {
		                	seenPid[records[i].pid] = true;
		                }
		                var totalPids = isc.getKeys(seenPid).length;
		                if(totalPids == 1){
		                	return '&nbsp'+records[0].pid;                 	
		                }else{
			                return totalPids + " Pids"; 
		                }
		            }
		        },
		        {name:"tid", title:"Tid", align:'center', width:73, cellAlign:'right'
	        		,showGridSummary:false
	        		,summaryFunction:function (records, summaryField) {
	        			var seenTid = {};
		                var containBlank = false;
		                for (var i = 0; i < records.length; i++) {
		                	seenTid[records[i].tid] = true;
		                	if(records[i].tid == ""){
		                		containBlank = true;
		                	}
		                }
		                var totalTids = isc.getKeys(seenTid).length;
		                if(totalTids == 1){
	                		return '&nbsp'+records[0].tid;
	                	}else{
	                		if(containBlank){
				                return totalTids + " Tids"; 
	                		}else{
	                			return totalTids + " Tids";
	                		}
		                }
		            }
		        },
		        {name:"process", title:"Process", align:'center', width:100, cellAlign:'left'
		        	,showGridSummary:false
		        	,summaryFunction:function (records, summaryField) {
		        		var seenProcess = {};
		                var containBlank = false;
		                for (var i = 0; i < records.length; i++) {
		                	seenProcess[records[i].process] = true;
		                	if(records[i].process == ""){
		                		containBlank = true;
		                	}
		                }
		                var totalProcess = isc.getKeys(seenProcess).length;
		                if(totalProcess == 1){
	                		return '&nbsp&nbsp' + records[0].process;
	                	}else{
	                		if(containBlank){
	                			return '&nbsp&nbsp' + "-"; 
	                		}else{
	                			return '&nbsp&nbsp' + totalProcess + " Processes";
	                		}
		                }
		            }
		        },
		        {name:"cmd", title:"CMD", align:'center', width:145, cellAlign:'left'
		        	,showGridSummary:false
		        	,summaryFunction:function (records, summaryField) {
		        		var seenCmd = {};
		                var containBlank = false;
		                for (var i = 0; i < records.length; i++) {
		                	seenCmd[records[i].cmd] = true;
		                	if(records[i].cmd == ""){
		                		containBlank = true;
		                	}
		                }
		                var totalCmd = isc.getKeys(seenCmd).length;
		                if(totalCmd == 1){
	                		return '&nbsp&nbsp' + records[0].cmd;
	                	}else{
	                		if(containBlank){
	                			return '&nbsp&nbsp' + "-"; 
	                		}else{
	                			return '&nbsp&nbsp' + totalCmd + " Cmds";
	                		}
		                }
		            }
		        },
		        {name:"type", title:"Type", width:62,align:'center'
		        	,showGridSummary:false
		        	,summaryFunction:function (records, summaryField) {
		                var seenType = {};
		                for (var i = 0; i < records.length; i++) {
		                	seenType[records[i].type] = true;
		                }
		                var totalTypes = isc.getKeys(seenType).length;
		                if(totalTypes == 1){
		                	return '&nbsp'+records[0].type;                 	
		                }else{
			                return totalTypes + " Types"; 
		                }
		            }
		        },
		        {name:"module", title:"Module", align:'center', width:94, cellAlign:'center'
		        	,showGridSummary:false
		        	,summaryFunction:function (records, summaryField) {
		        		var seenModule = {};
		                var containBlank = false;
		                for (var i = 0; i < records.length; i++) {
		                	seenModule[records[i].module] = true;
		                	if(records[i].module == ""){
		                		containBlank = true;
		                	}
		                }
		                var totalModules = isc.getKeys(seenModule).length;
		                if(totalModules == 1){
	                		return '&nbsp'+records[0].module;
	                	}else{
	                		if(containBlank){
				                return totalModules-1 + " Modules"; 
	                		}else{
	                			return totalModules + " Modules";
	                		}
		                }
		            }
		        },
		        {name:"purpose", title:"Purpose", align:'center', width:181, cellAlign:'left'
		        	,showGridSummary:false
		        	,summaryFunction:function (records, summaryField) {
		                var seenPurposes = {};
		                for (var i = 0; i < records.length; i++) {
		                	seenPurposes[records[i].purpose] = true;
		                }
		                var totalPurposes = isc.getKeys(seenPurposes).length;
		                return totalPurposes + " Purposes"; 
		            }
		        },
			 ];

isc.defineClass("commonDs", "DataSource").addProperties({
	recordXPath : "//pagedata//row",
	dataFormat : "xml"
});

isc.commonDs.create({
	ID : "pageRowData",	
	operationBindings : [ {
		operationType : "fetch",
		dataProtocol : "getParams"
	} ],
	dataURL : CONTEXT_PATH + "/pagerowdata?id=<%=id%>&sequence=<%=sequence%>&type=kernel",
    allowAdvancedCriteria:true,
	fields:[     
	        {name:"time", type:"integer"},
	        {name:"pages", type:"integer"},
	        {name:"order", type:"text"},
	        {name:"memory", type:"integer"},
	        {name:"pid", type:"integer", canEdit:false},
	        {name:"tid", type:"integer", canEdit:false},
	        {name:"process", type:"text"},
	        {name:"cmd", type:"text"},
	        {name:"type", type:"text"},
	        {name:"module", type:"text"},
	        {name:"purpose", type:"text"},
	    ],
    serverType:"sql"
});

//To copy function
function createCopyDialog () {
    var width = 525;
    var height = 300;

    var guidance = "Press Ctrl-C (Command-C on Mac) or right click (Option-click on Mac) on the selected text to copy values, then paste into Excel.  Note that values in columns that are dates or numbers are correctly understood as dates and numbers in Excel.";

    var selection = rowData.selection.getSelectedCells() || [];
    if (selection.length === 0) return;

    var fieldNames = [];
    var firstRow = selection[0][0];
    for (var i = 0; i < selection.length; i++) {
        if (selection[i][0] != firstRow) break;
        fieldNames.add(rowData.getFieldName(selection[i][1]));
    }

    var settings = isc.TextExportSettings.create({
        fieldList: fieldNames,
        fieldSeparator: "\t",
        escapingMode: "double",
        useDisplayValue: true
    });

    var resultsForm = isc.DynamicForm.create({

        numCols: 1,

        width: width,

        height: height,

        autoFocus: true,

        fields: [{ type: "text",
                   name: "guidance",
                   showTitle: false,
                   editorType: "StaticTextItem",
                   value: guidance
                 },
                 { type: "text",
                   name: "textArea",
                   canEdit: false,
                   showTitle: false,
                   height: "*",
                   width: "*",
                   editorType: "TextAreaItem" },
                 { type : "text",
                   name : "Done",
                   align: "center",
                   editorType: "ButtonItem",
                   title: "Done",
                   click: function (form) { form.close(); }
                 }],

        close : function () {
            this.dialog.hide();
            this.dialog.markForDestroy();
            this.dialog.removeItem(this);
        }

    });

    var records = rowData.getSelectedRecords();
    var text = rowData.dataSource.recordsAsText(records, settings);

    resultsForm.dialog = isc.Dialog.create({ 
        autoSize: true,
        showToolbar: false,
        canDragReposition: true,
        title: "Copy Cells",
        items: [ resultsForm ],
        isModal: true,
        showModalMask: true
    });

    resultsForm.textArea = resultsForm.getField("textArea");
    resultsForm.textArea.setValue(text.replace(/&nbsp/g,""));
    resultsForm.textArea.selectValue();
}

isc.Menu.create({
    ID: "copyContextMenu",
    data: [
        {title: "Copy",
         click : function () { createCopyDialog(); }}
    ],
    width: 150
});

isc.ListGrid.create({
    ID: "rowData",
    width:1126, height:table_height, top:39,
    alternateRecordStyles:true,
    /* showAllRecords:true, */
    dataSource: pageRowData,
    fields: PageRowData,
    
    canSelectCells:true,
    canDragSelect: true,
    contextMenu: copyContextMenu,
    cellContextClick : function () { 
        this.showContextMenu(); return false;
    },
    
    showGridSummary:true,
    showGroupSummary:true,
    showGroupSummaryInHeader:true,
    showGroupTitleColumn: true,
    groupByField:"purpose", groupStartOpen:"none",
    
    canAutoFitFields: false,
    canGroupBy: true,
    groupByMaxRecords: 50000,
    autoFetchData: true,
    /* showFilterEditor: true,
    filterOnKeypress: true, */
    canEdit: true,
    editEvent: "doubleClick",
    editByCell: true,
    autoSaveEdits: false,
    click: function(){
    	rowData.endEditing();
    	rowData.discardAllEdits();
    },
    canSort: true,
/*     sortFieldNum: 2,
    sortDirection: "descending" */
});

/* rowData.sort("memory","descending"); */

</script>
</body>
<script type="text/javascript">
if(window.name == "kernelPopup"){
	document.getElementById("title_kernel").style.display = "block";
	document.getElementById("title_sub_kernel").style.top = "40px";
	document.getElementById("title_sub_kernel").style.left = "10px";
	rowData.top = 75;
	rowData.left = 10;
	rowData.width = 1400;
}
</script>
</html>