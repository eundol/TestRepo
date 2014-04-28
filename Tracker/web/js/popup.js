function issuePopup(project) {
	window.open("delayIssue?project=" + project, "LG SWP Lab **",
			"width=600,height=450,toolbar=no,location=no,resizable=yes,scrollbars=yes,menubar=no,status=no");
}
function jiraPopup(issueKey) {
	window.open("http://clm.lge.com/issue/browse/" + issueKey, "_blank",
	"width=850,height=650,toolbar=yes,location=yes,resizable=yes,scrollbars=yes,menubar=yes");
}