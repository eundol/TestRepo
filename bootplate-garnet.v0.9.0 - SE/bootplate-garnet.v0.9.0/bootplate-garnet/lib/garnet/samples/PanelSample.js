enyo.kind({
	name: "g.sample.PanelSample",
	kind: "enyo.Scroller",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Panel Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Panel", classes: "g-sample-subheader"},
		{kind: "g.Panel", style: "position: relative; background-color: #212121;", components: [
			{classes: "g-common-width-height-fit", style: "overflow: hidden;", components: [
				{
					name: "scroller2",
					kind: "g.Scroller",
					classes: "enyo-fit g-layout-text-center",
					scrollIndicatorEnabled: true,
					components: [
						{style: "padding-top: 60px; width: 200px; margin: auto;", content: "Created just for you, the LG G2 phone makes it easier than ever to get connected. Featuring a sleek, ultra-slim design, 2.26 GHz Qualcomm Snapdragon 800 Chipset Quad-Core Processor, 1080p resolution screen, 13-megapixel rear camera with optical image stabilization, and a 5.2-inch Full HD 1080p IPS display, the LG G2 is our fastest, most powerful and most beautiful phone yet. In fact, we think it is perfect, just as it is. To be among the first to know about the G2 for yourself and get product information before anyone else sign up and we wll keep you posted as the LG G2s big debut approaches. In the meantime, browse our complete collection of mobile phones or search for phones by carrier and find even more ways to talk, text, email and surf the web at home and on the go. Created just for you, the LG G2 phone makes it easier than ever to get connected. Featuring a sleek, ultra-slim design, 2.26 GHz Qualcomm Snapdragon 800 Chipset Quad-Core Processor, 1080p resolution screen, 13-megapixel rear camera with optical image stabilization, and a 5.2-inch Full HD 1080p IPS display, the LG G2 is our fastest, most powerful and most beautiful phone yet. In fact, we think it is perfect, just as it is. To be among the first to know about the G2 for yourself and get product information before anyone else sign up and we wll keep you posted as the LG G2s big debut approaches. In the meantime, browse our complete collection of mobile phones or search for phones by carrier and find even more ways to talk, text, email and surf the web at home and on the go.Created just for you, the LG G2 phone makes it easier than ever to get connected. Featuring a sleek, ultra-slim design, 2.26 GHz Qualcomm Snapdragon 800 Chipset Quad-Core Processor, 1080p resolution screen, 13-megapixel rear camera with optical image stabilization, and a 5.2-inch Full HD 1080p IPS display, the LG G2 is our fastest, most powerful and most beautiful phone yet. In fact, we think it is perfect, just as it is. To be among the first to know about the G2 for yourself and get product information before anyone else sign up and we wll keep you posted as the LG G2s big debut approaches. In the meantime, browse our complete collection of mobile phones or search for phones by carrier and find even more ways to talk, text, email and surf the web at home and on the go."},
						{kind: "g.Button", content: "OK!!!", ontap: "tapButton", style: "margin: 20px 0;"}
					]
				}
			]},
			{
				name: "title2",
				kind: "g.Title",
				content: "Title long text will be fade out",
				ontap: "tapTitle"
			}
		]}
	],
	tapped: function() {
		enyo.log("tap");
	},
	goBack: function(inSender, inEvent) {
		history.go(-1);
		return false;
	}
});
