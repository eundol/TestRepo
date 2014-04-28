enyo.kind({
	name: "g.sample.NotificationSample",
	kind: "enyo.Scroller",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Notification Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Notification", classes: "g-sample-subheader"},
		{ontap: "tapBody", style: "position: relative; background-color: #212121;", classes: "g-common-width-height-fit g-layout-absolute-wrapper", components: [
			{name: "Button1", kind: "g.Button", ontap: "showPopup", content: "Click here", style: "width: 310px;", classes: "g-sample-button center middle"},
			{
				name: "notification",
				kind: "g.Notification",
				duration: 3000,
				ontap: "doAction",
				iconSrc: "assets/ic_dialog_alert.svg",
				content: "Tap Here Here Here Here"
			},
			{
				name: "popup",
				kind: "g.Popup",
				components: [
					{classes: "g-layout-box-inside-circle", components:[
						{name: "icon1", kind: "g.IconButton", ontap: "tapped", src: "assets/ic_sample.png", style: "display: block; margin: 5px auto;"},
						{name: "title1", content: "Title", classes: "g-layout-text-center"},
						{tag: "hr", style: "margin-bottom: 10px;"},
						{style: "margin: auto; overflow: hidden;", components: [
							{content: "Created just for you, the LG G2 phone makes it easier than ever to get connected."}
						]}
					]}
				]
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
	showPopup: function(inSender, inEvent) {
		this.$.notification.setOpen(!this.$.notification.getOpen());
	},
	doAction: function() {
		this.$.result.setContent("Title tapped !!");
		this.$.popup.show();
		return true;
	},
	goBack: function(inSender, inEvent) {
		history.go(-1);
		return false;
	}
});
