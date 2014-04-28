enyo.kind({
	name: "g.sample.PanelIndicatorSample",
	kind: "enyo.Scroller",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Panel Indicator Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "PanelSet with Panel Indicator", classes: "g-sample-subheader"},
		{
			kind: "g.PanelSet",
			effect: "slide-horizontal",
			style: "position: relative; background-color: #101015; opacity: 0.93;",
			components: [
				{kind: "g.Panel", components: [
					{kind: "g.Title", content: "One", style: "width: 100%;"},
					{kind: "g.PanelIndicator", index: 0, count: 4},
					{content: "Panel 1", style: "line-height: 320px; text-align: center;"}
				]},
				{kind: "g.Panel", components: [
					{kind: "g.Title", content: "Two", style: "width: 100%;"},
					{kind: "g.PanelIndicator", index: 1, count: 4},
					{content: "Panel 2", style: "line-height: 320px; text-align: center;"}
				]},
				{kind: "g.Panel", components: [
					{kind: "g.Title", content: "Three", style: "width: 100%;"},
					{kind: "g.PanelIndicator", index: 2, count: 4},
					{content: "Panel 3", style: "line-height: 320px; text-align: center;"}
				]},
				{kind: "g.Panel", components: [
					{kind: "g.Title", content: "Four", style: "width: 100%;"},
					{kind: "g.PanelIndicator", index: 3, count: 4},
					{content: "Panel 4", style: "line-height: 320px; text-align: center;"}
				]}
			]
		},
		{content: ": Drag a panel to the left or to the right.", classes: "g-sample-description"}
	],
	goBack: function(inSender, inEvent) {
		history.go(-1);
		return false;
	}
});
