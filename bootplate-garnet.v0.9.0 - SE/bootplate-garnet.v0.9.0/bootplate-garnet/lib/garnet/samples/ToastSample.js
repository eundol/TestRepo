enyo.kind({
	name: "g.sample.ToastSample",
	kind: "enyo.Scroller",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Toast Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Toast : 1 line / 2 lines / 3 lines with a circle popup / 3 lines witha an half circle popup", classes: "g-sample-subheader"},
		{ontap: "tapBody", style: "position: absolute; background-color: #212121;", classes: "g-common-width-height-fit g-layout-absolute-wrapper", components: [
			{name: "Button1", kind: "g.Button", ontap: "showToast1line", content: "Click here", style: "width: 310px;", classes: "g-sample-popup-button center middle"},
			{
				name: "toast1line",
				kind: "g.Toast",
				duration: 3000,
				line: 1,
				ontap: "tapToast",
				content: "This is a toast message. This will be show for 3 sec."
			}
		]},
		{ontap: "tapBody", style: "position: absolute; margin-left: 330px; background-color: #212121;", classes: "g-common-width-height-fit g-layout-absolute-wrapper", components: [
			{name: "Button2", kind: "g.Button", ontap: "showToast2line", content: "Click here", style: "width: 310px;", classes: "g-sample-popup-button center middle"},
			{
				name: "toast2line",
				kind: "g.Toast",
				duration: 2000,
				line: 2,
				ontap: "tapToast",
				content: "This is a toast message. This will be show for 3 sec."
			}
		]},
		{style: "position: absolute; margin-left: 660px; background-color: #212121;", classes: "g-common-width-height-fit g-layout-absolute-wrapper", components: [
			{name: "btn1", kind: "g.Button", style: "width: 310px;", classes: "g-sample-popup-button center middle", ontap: "showPopup", content: "To show a toast popup!"},
			{
				name: "toastPopup1",
				kind: "g.ToastPopup",
				popupType: "fullToast",
				content: "Created just for you, the LG G2 phone makes it easier than ever to get connected."
			}
		]},
		{style: "position: relative; margin-left: 990px; background-color: #212121;", classes: "g-common-width-height-fit g-layout-absolute-wrapper", components: [
			{name: "btn2", kind: "g.Button", style: "width: 310px;", classes: "g-sample-popup-button center middle", ontap: "showPopup", content: "To show a half circle toast !"},
			{
				name: "toastPopup2",
				kind: "g.ToastPopup",
				popupType: "halfToast",
				content: "Created just for you, the LG G2 phone makes it easier than ever to get connected."
			}
		]},
		{content: ": Tap the button in a watch to show a popup.", classes: "g-sample-description"},

		{style: "height: 160px;"},

		{style: "position: fixed; width: 100%; min-height: 160px; bottom: 0; z-index: 9999; background-color: #EDEDED; opacity: 0.8;", classes: "g-sample-result", components: [
			{content: "Result", classes: "g-sample-subheader"},
			{name: "result", allowHtml: true, content: "Not tapped yet.", classes: "g-sample-description"}
		]}
	],
	tapBody: function(inSender, inEvent) {
		this.$.result.setContent("Body tapped !!");
	},
	tapToast: function(inSender, inEvent) {
		this.$.result.setContent("Toast tapped !!");
		return true;
	},
	showToast1line: function(inSender, inEvent) {
		this.$.toast1line.setOpen(!this.$.toast1line.getOpen());
		return true;
	},
	showToast2line: function(inSender, inEvent) {
		this.$.toast2line.setOpen(!this.$.toast2line.getOpen());
		return true;
	},
	showPopup: function(inSender, inEvent) {
		if (inSender.name === "btn1") {
			this.$.toastPopup1.show();
		} else if (inSender.name === "btn2") {
			this.$.toastPopup2.show();
		}
	},
	hidePopup: function(inSender, inEvent) {
		if ( inEvent.originator.active === true) {
			if (inSender.name === "btn1") {
				this.$.toastPopup1.hide();
			} else if (inSender.name === "btn2") {
				this.$.toastPopup2.hide();
			}
		}
	},
	goBack: function(inSender, inEvent) {
		history.go(-1);
		return false;
	}
});
