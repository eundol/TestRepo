/**
	_g.sample.DataListPanel_ and _g.sample.DataGridListPanel are located in DataListSample.js and DataGridListSample.js respectively.
*/
enyo.kind({
	name: "g.sample.PanelSetSample",
	kind: "enyo.Scroller",
	horizontal: "hidden",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< PanelSet with transform effects Sample", classes: "g-sample-header", ontap: "goBack"},
		// flip-horizontal
		{content: "flip-horizontal", classes: "g-sample-subheader"},
		{
			kind: "g.PanelSet",
			effect: "flip-horizontal",
			style: "position: relative; background-color: #101015; opacity: 0.93;",
			components: [
				{kind: "g.Panel", components: [
					{classes: "g-common-width-height-fit", style: "overflow: hidden;", components: [
						{
							name: "scroller",
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
						name: "title",
						kind: "g.Title",
						content: "Title long text will be fade out",
						ontap: "tapTitle"
					}
				]},
				{name: "listPanel1", kind: "g.sample.DataListPanel", style: "position: relative; display: inline-block; margin-right: 20px;"},
				{kind: "g.Panel", components: [
					{content: "Created just for you, the LG G2 phone makes it easier than ever to get connected. Featuring a sleek, ultra-slim design, 2.26 GHz Qualcomm?Snapdragon?800 Chipset Quad-Core Processor, 1080p resolution screen, 13-megapixel rear camera with optical image stabilization, and a 5.2-inch Full HD 1080p IPS display, the LG G2 is our fastest, most powerful and most beautiful phone yet."}
				]},
				{name: "timePickerPanel1", kind: "g.TimePickerPanel", style: "position: absolute; display: inline-block;"}
			]
		},
		{content: ": Drag a panel to the left or to the right.", classes: "g-sample-description"},

		{content: "slide-horizontal", classes: "g-sample-subheader"},
		{
			kind: "g.PanelSet",
			effect: "slide-horizontal",
			style: "position: relative; background-color: #101015; opacity: 0.93;",
			components: [
				{kind: "g.Panel", components: [
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
				]},
				{name: "listPanel2", kind: "g.sample.DataGridListPanel", style: "position: relative; display: inline-block; margin-right: 20px;"},
				{kind: "g.Panel", components: [
					{content: "Created just for you, the LG G2 phone makes it easier than ever to get connected. Featuring a sleek, ultra-slim design, 2.26 GHz Qualcomm Snapdragon800 Chipset Quad-Core Processor, 1080p resolution screen, 13-megapixel rear camera with optical image stabilization, and a 5.2-inch Full HD 1080p IPS display, the LG G2 is our fastest, most powerful and most beautiful phone yet. In fact, we think it's perfect, just as it is. To be among the first to know about the G2 for yourself and get product information before anyone else sign up and we'll keep you posted as the LG G2's big debut approaches."}
				]},
				{name: "timePickerPanel2", kind: "g.TimePickerPanel", style: "position: absolute; display: inline-block;"}
			]
		},
		{content: ": Drag a panel to the left or to the right.", classes: "g-sample-description"}
	],
	bindings: [
		{from: ".collection", to: ".$.listPanel1.collection"},
		{from: ".collection2", to: ".$.listPanel2.collection"}
	],
	create: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.collection = new enyo.Collection(this.data);
			this.set("collection2", new enyo.Collection(this.generateRecords()));
		};
	}),
	tapped: function() {
		enyo.log("tap");
	},
	generateRecords: function () {
		var records = [],
			idx     = this.index || 0;
		for (; records.length < 500; ++idx) {
			var title = (idx % 8 === 0) ? " with long title" : "";
			records.push({
				text: "Item " + idx + title,
				url: "assets/photo.png"
			});
		}
		// update our internal index so it will always generate unique values
		this.index = idx;
		return records;
	},
	goBack: function(inSender, inEvent) {
		history.go(-1);
		return false;
	},
	data: [
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_sample.png", albumTitle: "Tracey", albumGenre: "Hiphop"}
	]
});
