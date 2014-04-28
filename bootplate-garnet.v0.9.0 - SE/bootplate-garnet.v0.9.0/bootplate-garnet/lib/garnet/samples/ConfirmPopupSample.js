enyo.kind({
	name: "g.sample.ConfirmPopupSample",
	kind: "enyo.Scroller",
	classes: "enyo-unselectable garnet g-sample",
	handlers: {
		onPopupCancel: "hidePopup",
		onPopupOk: "hidePopup"
	},
	components: [
		{content: "< Confirm Popup Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Confirm with buttons : with OK,Cancel buttons / with only OK button", classes: "g-sample-subheader"},
		{style: "position: absolute; background-color: #212121;", classes: "g-common-width-height-fit g-layout-absolute-wrapper", components: [
			{name: "button1", kind: "g.Button", style: "width: 310px;", classes: "g-sample-popup-button center middle", ontap: "showPopup", content: "Click here to show popup!"},
			{
				name: "confirmPopupWithIcon",
				kind: "g.ConfirmPopup",
				iconSrc: "assets/ic_sample.png",
				components: [
					{content: "content", style: "margin-bottom: 10px;"},
					{content: "Created just for you, the LG G2 phone makes it easier than ever to get connected. Featuring a sleek, ultra-slim design, 2.26 GHz Qualcomm Snapdragon 800 Chipset Quad-Core Processor, 1080p resolution screen, 13-megapixel rear camera with optical image stabilization, and a 5.2-inch Full HD 1080p IPS display, the LG G2 is our fastest, most powerful and most beautiful phone yet. In fact, we think it is perfect, just as it is. To be among the first to know about the G2 for yourself and get product information before anyone else sign up and we wll keep you posted as the LG G2s big debut approaches. In the meantime, browse our complete collection of mobile phones or search for phones by carrier and find even more ways to talk, text, email and surf the web at home and on the go."}
				]
			}
		]},
		{style: "position: relative; margin-left: 330px; background-color: #212121;", classes: "g-common-width-height-fit g-layout-absolute-wrapper", components: [
			{name: "button2", kind: "g.Button", style: "width: 310px;", classes: "g-sample-popup-button center middle", ontap: "showPopup", content: "Click here to show popup!"},
			{
				name: "confirmPopupWithOnlyOKButton",
				kind: "g.ConfirmPopup",
				buttonComponents: [
					{name: "ok", kind: "g.IconButton", ontap: "ok", classes: "g-ok-image"}
				],
				components: [
					{content: "content", style: "margin-bottom: 10px;"},
					{content: "Created just for you, the LG G2 phone makes it easier than ever to get connected. Featuring a sleek, ultra-slim design, 2.26 GHz Qualcomm Snapdragon 800 Chipset Quad-Core Processor, 1080p resolution screen, 13-megapixel rear camera with optical image stabilization, and a 5.2-inch Full HD 1080p IPS display, the LG G2 is our fastest, most powerful and most beautiful phone yet. In fact, we think it is perfect, just as it is. To be among the first to know about the G2 for yourself and get product information before anyone else sign up and we wll keep you posted as the LG G2s big debut approaches. In the meantime, browse our complete collection of mobile phones or search for phones by carrier and find even more ways to talk, text, email and surf the web at home and on the go."}
				]
			}
		]},
		{name: "result", content: "Nothing is selected.", classes: "g-sample-description"}
	],
	showPopup: function(inSender, inEvent) {
		if (inSender.name === "button1") {
			this.$.confirmPopupWithIcon.show();
		} else if (inSender.name === "button2") {
			this.$.confirmPopupWithOnlyOKButton.show();
		}
	},
	hidePopup: function(inSender, inEvent) {
		if (inEvent.originator.name === "confirmPopupWithIcon") {
			this.$.result.setContent(inEvent.originator.name + " is selected.");
			this.$.confirmPopupWithIcon.hide();
		} else if (inEvent.originator.name === "confirmPopupWithOnlyOKButton") {
			this.$.result.setContent(inEvent.originator.name + " is selected.");
			this.$.confirmPopupWithOnlyOKButton.hide();
		}
	},
	goBack: function(inSender, inEvent) {
		history.go(-1);
		return false;
	}
});
