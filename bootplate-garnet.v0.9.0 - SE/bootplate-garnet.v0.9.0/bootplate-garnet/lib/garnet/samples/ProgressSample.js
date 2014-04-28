enyo.kind({
	name: "g.sample.ProgressSample",
	kind: "enyo.Scroller",
	handlers: {
		onChange: "onChange",
		onChanging: "onChanging"
	},
	classes: "enyo-unselectable garnet g-sample",
	_timerID: undefined,
	_curValue: 0,
	_totalValue: 100,
	components: [
		{content: "< Progress Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Progresses", classes: "g-sample-subheader"},
		{style: "position: relative; border-radius: 50%; background-color: #212121; display: inline-block; margin-right: 5px;", classes: "g-common-width-height-fit", components: [
			{name: "increasePanel", kind: "g.Panel", components: [
				{content: "Increase", classes: "g-common-header-font g-sample-progress-header"},
				{content: "0 -> 100", classes: "g-sample-text-center"},
				{style: "width: 100px; height: 40px; line-height: 40px;", classes: "g-layout-absolute-center g-button g-sample-text-center", components: [
					{name: "increaseValue", content: "0", classes: "g-sample-wheel-control-value-text"}
				]}
			]},
			{
				name: "increase",
				kind: "g.Progress",
				onPrgressValueChanged: "onIncreaseValueChanged"
			}
		]},
		{style: "position: relative; border-radius: 50%; background-color: #212121; display: inline-block; margin-right: 5px;", classes: "g-common-width-height-fit", components: [
			{name: "decreasePanel", kind: "g.Panel", components: [
				{content: "Decrease", classes: "g-common-header-font g-sample-progress-header"},
				{content: "100 -> 0", classes: "g-sample-text-center"},
				{style: "width: 100px; height: 40px; line-height: 40px;", classes: "g-layout-absolute-center g-button g-sample-text-center", components: [
					{name: "decreaseValue", content: "100", classes: "g-sample-wheel-control-value-text"}
				]}
			]},
			{
				name: "decrease",
				kind: "g.Progress",
				lineWidth: 15,
				circleColor: "#66CD00",
				onPrgressValueChanged: "onDecreaseValueChanged"
			}
		]},
		{style: "position: relative; border-radius: 50%; background-color: #212121; display: inline-block;", classes: "g-common-width-height-fit", components: [
			{name: "smallPanel", kind: "g.Panel", components: [
				{content: "Small", classes: "g-common-header-font g-sample-progress-header"},
				{content: "0 -> 100", classes: "g-sample-text-center"},
				{style: "width: 100px; height: 40px; line-height: 40px;", classes: "g-layout-absolute-center g-sample-text-center", components: [
					{name: "smallValue", content: "0", classes: "g-sample-wheel-control-value-text"}
				]},
				{tag:"br"},
				{tag:"br"},
				{tag:"br"},
				{style: "position: relative; width: 60px; height: 60px;", classes: "g-layout-absolute-center g-sample-text-center", components: [
					{
						name: "small",
						kind: "g.Progress",
						onPrgressValueChanged: "onSmallValueChanged"
					}
				]}
			]}
		]},
		{content: ": Tap 'START' or 'STOP' buttons to start/stop a progress circle.", classes: "g-sample-description"},
		{tag:"br"},
		{kind: "ToolDecorator", components: [
			{kind: "g.Button", ontap: "start", content: "Start"},
			{kind: "g.Button", ontap: "stop", content: "Stop"}
		]}
	],
	create: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.start();
		};
	}),
	start: function() {
		if (!this._timerID) {
			var self = this;
			this._curValue = 0;
			this._timerID = setInterval(function() {self.updateProgress.call(self);}, 50);
		}
	},
	stop: function() {
		clearInterval(this._timerID);
		this._timerID = 0;
	},
	onIncreaseValueChanged: function(inSender, inEvent) {
		this.$.increaseValue.setContent(parseInt(inEvent.value*this._totalValue, 10));
	},
	onDecreaseValueChanged: function(inSender, inEvent) {
		this.$.decreaseValue.setContent(parseInt(inEvent.value*this._totalValue, 10));
	},
	onSmallValueChanged: function(inSender, inEvent) {
		this.$.smallValue.setContent(parseInt(inEvent.value*this._totalValue, 10));
	},
	updateProgress: function() {
		this.$.increase.draw(this._curValue/this._totalValue);
		this.$.decrease.draw((this._totalValue - this._curValue)/this._totalValue);
		this.$.small.draw(this._curValue/this._totalValue);
		this._curValue++;

		if (this._curValue > this._totalValue*0.7) {
			this.$.decrease.setCircleColor("#FF0000");
		} else {
			this.$.decrease.setCircleColor("#66CD00");
		}

		if (this._curValue > this._totalValue) {
			this.stop();
		}
	},
	goBack: function(inSender, inEvent) {
		history.go(-1);
		return false;
	}
});
