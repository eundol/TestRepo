enyo.kind({
	name: "custom.Popup",
	kind: "g.Popup",
	instanceOwned: false,
	components: [
		{kind: "g.Button", ontap: "ontap"}
	],
	ontap: function() {
		enyo.warn("a custom popup tapped");
	}
});

enyo.kind({
	name: "g.sample.PopupSample",
	kind: "enyo.Scroller",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Popup Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Popup with contents", classes: "g-sample-subheader"},
		{style: "position: relative; background-color: #212121;", classes: "g-common-width-height-fit g-layout-absolute-wrapper", components: [
			{name: "btn1", kind: "g.Button", style: "width: 310px;", classes: "g-sample-popup-button center middle", ontap: "showPopup", content: "Click here to show popup!"},
			{
				name: "popup",
				kind: "g.Popup",
				components: [
					{style: "width: 320px; height:320px; position: absolute;", components: [
						{
							name: "scroller",
							kind: "g.Scroller",
							scrollIndicatorEnabled: true,
							style: "width: 320px; height: 320px;",
							components: [
								{name: "icon1", kind: "g.IconButton", ontap: "tapped", src: "assets/ic_sample.png", style: "display: block; margin: 5px auto;"},
								{name: "title1", content: "Title", classes: "g-layout-text-center g-common-header-font"},
								{tag: "hr", style: "margin-bottom: 10px;"},
								{content: "Created just for you, the LG G2 phone makes it easier than ever to get connected. Featuring a sleek, ultra-slim design, 2.26 GHz Qualcomm Snapdragon 800 Chipset Quad-Core Processor, 1080p resolution screen, 13-megapixel rear camera with optical image stabilization, and a 5.2-inch Full HD 1080p IPS display, the LG G2 is our fastest, most powerful and most beautiful phone yet. In fact, we think it is perfect, just as it is. To be among the first to know about the G2 for yourself and get product information before anyone else sign up and we wll keep you posted as the LG G2s big debut approaches. In the meantime, browse our complete collection of mobile phones or search for phones by carrier and find even more ways to talk, text, email and surf the web at home and on the go. Created just for you, the LG G2 phone makes it easier than ever to get connected. Featuring a sleek, ultra-slim design, 2.26 GHz Qualcomm Snapdragon 800 Chipset Quad-Core Processor, 1080p resolution screen, 13-megapixel rear camera with optical image stabilization, and a 5.2-inch Full HD 1080p IPS display, the LG G2 is our fastest, most powerful and most beautiful phone yet. In fact, we think it is perfect, just as it is. To be among the first to know about the G2 for yourself and get product information before anyone else sign up and we wll keep you posted as the LG G2s big debut approaches. In the meantime, browse our complete collection of mobile phones or search for phones by carrier and find even more ways to talk, text, email and surf the web at home and on the go.Created just for you, the LG G2 phone makes it easier than ever to get connected. Featuring a sleek, ultra-slim design, 2.26 GHz Qualcomm Snapdragon 800 Chipset Quad-Core Processor, 1080p resolution screen, 13-megapixel rear camera with optical image stabilization, and a 5.2-inch Full HD 1080p IPS display, the LG G2 is our fastest, most powerful and most beautiful phone yet. In fact, we think it is perfect, just as it is. To be among the first to know about the G2 for yourself and get product information before anyone else sign up and we wll keep you posted as the LG G2s big debut approaches. In the meantime, browse our complete collection of mobile phones or search for phones by carrier and find even more ways to talk, text, email and surf the web at home and on the go."},
								{kind: "g.Button", content: "OK!!!", style: "margin: 20px 0;"}
							]
						}
					]}
				]
			}
		]},

		{content: "Custom popup inherited from g.Popup", classes: "g-sample-subheader"},
		{style: "position: relative; background-color: #212121;", classes: "g-common-width-height-fit g-layout-absolute-wrapper", components: [
			{name: "btn2", kind: "g.Button", style: "width: 310px;", classes: "g-sample-popup-button center middle", ontap: "showPopup", content: "Click here to show popup!"},
			{
				name: "customPopup",
				kind: "custom.Popup",

				components: [
					{kind: "g.Button",style: "width: 100%; margin: 130px 0;", content: "Tap here!", ontap: "ontap"}
				]

			}
		]},
		{content: ": Tap the button in a watch to show a popup.", classes: "g-sample-description"}
	],
	showPopup: function(inSender, inEvent) {
		if (inSender.name === "btn1") {
			this.$.popup.show();
		} else if (inSender.name === "btn2") {
			this.$.customPopup.show();
		}
	},
	hidePopup: function(inSender, inEvent) {
		if ( inEvent.originator.active === true) {
			if (inSender.name === "btn1") {
				this.$.popup.hide();
			} else if (inSender.name === "btn2") {
				this.$.customPopup.hide();
			}
		}
	},
	goBack: function(inSender, inEvent) {
		history.go(-1);
		return false;
	}
});
