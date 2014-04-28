function removePopup(id) {
	window.open("boardremove?id=" + id, "",
	"width=360,height=105,toolbar=no,location=no,resizable=yes,scrollbars=yes,menubar=no,status=no");
}

function searchPopup(section) {
	var userId = document.getElementById("inputText").value;
	if(userId == " User_ID"){
		userId = "";
	}
	window.open("searchpopup?userId=" + userId + "&section=" + section, "searchresult",
	"width=594,height=510,toolbar=no,location=no,resizable=yes,scrollbars=yes,menubar=no,status=no");
}

function searchPopup2(section) {
	var userId = document.getElementById("inputText2").value;
	if(userId == " User_ID"){
		userId = "";
	}
	window.open("searchpopup?userId=" + userId + "&section=" + section, "searchresult",
	"width=594,height=510,toolbar=no,location=no,resizable=yes,scrollbars=yes,menubar=no,status=no");
}

function searchFocus(){
	document.getElementById("inputText").setAttribute("value", "");
	document.getElementById("inputText").setAttribute("style", "width: 100px; height: 14px; color: black; font-size: 12px");
}
function searchFocus2(){
	document.getElementById("inputText2").setAttribute("value", "");
	document.getElementById("inputText2").setAttribute("style", "width: 100px; height: 14px; color: black; font-size: 12px");
}

function changePopupO(project) {
	window.open("openList?project=" + project, "",
	"width=860,height=510,toolbar=no,location=no,resizable=yes,scrollbars=yes,menubar=no,status=no");
}

function changePopupF(project) {
	window.open("fullList?project=" + project, "",
	"width=860,height=510,toolbar=no,location=no,resizable=yes,scrollbars=yes,menubar=no,status=no");
}

function gerritPopup(changeId) {
	window.open("http://text.lge.com/swp/gerrit/#/c/" + changeId, "_blank",
	"width=1050,height=650,toolbar=yes,location=yes,resizable=yes,scrollbars=yes,menubar=yes");
}


