function changePopupM(project) {
	window.open("mergeList?project=" + project, "LG SWP Lab **",
	"width=860,height=510,toolbar=no,location=no,resizable=yes,scrollbars=yes,menubar=no,status=no");
}

function changePopupA(project) {
	window.open("abandonList?project=" + project, "LG SWP Lab **",
	"width=860,height=510,toolbar=no,location=no,resizable=yes,scrollbars=yes,menubar=no,status=no");
}

function changePopupO(project) {
	window.open("openList?project=" + project, "LG SWP Lab **",
	"width=860,height=510,toolbar=no,location=no,resizable=yes,scrollbars=yes,menubar=no,status=no");
}

function changePopupF(project) {
	window.open("fullList?project=" + project, "LG SWP Lab **",
	"width=860,height=510,toolbar=no,location=no,resizable=yes,scrollbars=yes,menubar=no,status=no");
}

function gerritPopup(changeId) {
	window.open("http://text.lge.com/swp/gerrit/#/c/" + changeId, "_blank",
	"width=1050,height=650,toolbar=yes,location=yes,resizable=yes,scrollbars=yes,menubar=yes");
}