enyo.kind({
	name: "g.sample.ContextualPopupSample",
	kind: "enyo.Scroller",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Contextual Popup Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Contextual popup with three buttons", classes: "g-sample-subheader"},
		{style: "position: relative; background-color: #212121;", classes: "g-common-width-height-fit g-layout-absolute-wrapper", components: [
			{name: "threeButton", kind: "g.Button", style: "width: 310px;", classes: "g-sample-popup-button center middle", ontap: "showPopup", content: "Click here to show popup!"},
			{
				name: "threePopup",
				kind: "g.ContextualPopup",
				buttonComponents: [
					{
						name: "First button",
						ontap: "hidePopup",
						src: "assets/ic_context_menu.svg"
					},
					{
						name: "Second button",
						ontap: "hidePopup",
						src: "assets/ic_context_menu.svg"
					},
					{
						name: "Third button",
						ontap: "hidePopup",
						src: "assets/ic_context_menu.svg"
					}
				]
			}
		]},
		{content: ": Tap the button in a watch to show a popup.", classes: "g-sample-description"},

		{content: "Contextual popup with four buttons", classes: "g-sample-subheader"},
		{style: "position: relative; background-color: #212121;", classes: "g-common-width-height-fit g-layout-absolute-wrapper", components: [
			{name: "fourButton", kind: "g.Button", style: "width: 310px;", classes: "g-sample-popup-button center middle", ontap: "showPopup2", content: "Click here to show popup!"},
			{
				name: "fourPopup",
				kind: "g.ContextualPopup",
				buttonComponents: [
					{
						name: "First button2",
						ontap: "hidePopup",
						src: "assets/ic_context_menu.svg"
					},
					{
						name: "Second button2",
						ontap: "hidePopup",
						src: "assets/ic_context_menu.svg"
					},
					{
						name: "Third button2",
						ontap: "hidePopup",
						src: "assets/ic_context_menu.svg"
					},
					{
						name: "Firth button2",
						ontap: "hidePopup",
						src: "assets/ic_context_menu.svg"
					}
				]
			}
		]},
		{content: ": Tap the button in a watch to show a popup.", classes: "g-sample-description"},

		{style: "height: 160px;"},

		{style: "position: fixed; width: 100%; min-height: 160px; bottom: 0; z-index: 9999; background-color: #EDEDED; opacity: 0.8;", classes: "g-sample-result", components: [
			{content: "Result", classes: "g-sample-subheader"},
			{name: "result", content: "Nothing is selected.", classes: "g-sample-description"}
		]}
	],
	showPopup: function(inSender, inEvent) {
		this.$.threePopup.show();
	},
	showPopup2: function(inSender, inEvent) {
		this.$.fourPopup.show();
	},
	hidePopup: function(inSender, inEvent) {
		if ( inEvent.originator.active === true &&
			(inEvent.originator.name === "First button" ||
			inEvent.originator.name === "Second button" ||
			inEvent.originator.name === "Third button" ||
			inEvent.originator.name === "First button2" ||
			inEvent.originator.name === "Second button2" ||
			inEvent.originator.name === "Third button2" ||
			inEvent.originator.name === "Firth button2")) {
			this.$.result.setContent(inEvent.originator.name + " is selected.");
			this.$.threePopup.hide();
			this.$.fourPopup.hide();
		}
	},
	goBack: function(inSender, inEvent) {
		history.go(-1);
		return false;
	}
});
