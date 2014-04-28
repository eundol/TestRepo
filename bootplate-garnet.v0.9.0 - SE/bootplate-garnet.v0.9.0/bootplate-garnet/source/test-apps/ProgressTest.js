/*
##   @b ProgressTestApp (g.Progress)
#
#    @brief
#        - Goal : Property validate
#        - Description : Testing g.Progress API according to combination of properties.
#
#    @remark
#        - 2014.  2. 25. Initial created
#		 - 2014.  3.  3. Apply black theme
#
#    @author hyojoo.cho@lgepartner.com
#
#    @version 0.1
#
#    ** Do not change names related with operating (such as 'propField', 'targetField', 'targetContainer', 'backToList'...)
*/

enyo.kind({
	name: "g.Test.Progress",
	classes: "enyo-unselectable garnet test-app-base progress-test",
	handlers:{
		ontap: "updateSelected",
	},
	_timerID: undefined,
	_curValue: 0,
	_totalValue: 100,
	components: [
		{classes : "g-common-width-height-fit g-layout-absolute-wrapper", components:[
			{kind: "enyo.Image", src: "assets/mask320.png", style: "z-index: 9999; pointer-events: none;"},
			// Watch background background - black
			{classes: "watch-background black"},

			// Prop Field
			{name: "propField", classes : "prop-field", components:[
				// Title
				{classes: "title", components:[
					{name: "propFieldTitle", classes: "title-text"},
				]},
				// Properties list - enyo.Scroller
				{kind: "enyo.Scroller", fit: true, strategyKind: "TouchScrollStrategy", touch: true, horizontal: "hidden", thumb: false, classes: "g-layout-box-inside-circle-no-wheel properties-scroller", components: [
					{name: "properties", classes: "properties", components:[
						// Property - disable
						{classes: "property", style: "margin-top:70px; margin-left:20px;", components:[
							{content: "lineWidth : "},
							{name: "lineWidth_input", kind: "enyo.Input", style: "width: 150px; margin-left: 10px;", placeholder: 10, selectOnFocus: true},
							{tag: "br"},
							{tag: "br"},
							{content: "circleColor : "},
							{name: "circleColor_input", kind: "enyo.Input", style: "width: 135px; margin-left: 10px;", placeholder: "#6495ED", selectOnFocus: true},
						]},
					]},
				]},
				// Buttons
				{name: "buttonGroupProp", classes: "button-group", components:[
					{name: "backToList", classes: "quarter-circle-bottom-left", components:[
						{name: "backToListText", content: "Back", classes: "quarter-circle-bottom-left-text"}
					]},
					{name: "renderTarget", classes: "quarter-circle-bottom-left quarter-circle-bottom-right", ontap: "renderTarget", components:[
						{name: "renderTargetText", content: "Render", classes:"quarter-circle-bottom-right-text"}
					]},
					{name: "applyProp", classes: "quarter-circle-bottom-left quarter-circle-bottom-right visibility-hidden", ontap: "applyProp",components:[
						{name: "applyPropText", content: "Apply", classes:"quarter-circle-bottom-right-text"}
					]},
				]},
			]},

			// Target Field
			{name: "targetField", classes : "target-field visibility-hidden", components:[
				// Title
				{classes: "title", components:[
					{name: "targetFieldTitle", classes: "title-text"},
				]},
				// Target Container
				{classes: "front-to-first g-layout-box-inside-circle-no-wheel target-container-scroller", components: [
					{name: "targetContainer", components:[
						{name: "validBtn", kind: "g.Button", content: "Valid Draw", style: "margin-top: 30px;", classes: "button", ontap: "drawPressed"},
						{tag: "br"},
						{name: "invalidBtn", kind: "g.Button", content: "Invalid Draw", classes: "button", ontap: "drawPressed"},
						{tag: "br"},
						{name: "resetBtn", kind: "g.Button", content: "Stop", classes: "button", ontap: "resetButtonTapped"},
					]},
				]},
				// Status
				{classes: "status", components:[
					{content: "Progress status", classes: "status-title"},
					{classes: "status-bar"},
					{name: "status", content: "", classes: "status-text"},
				]},
				// Buttons
				{name: "buttonGroupTarget", classes: "button-group front-to-first", components:[
					{name: "resetTarget", classes: "quarter-circle-bottom-left", ontap: "resetTarget", components:[
						{name: "resetTargetText", content: "Reset", classes: "quarter-circle-bottom-left-text resetText"}
					]},
					{name: "changeProp", classes: "quarter-circle-bottom-left quarter-circle-bottom-right", ontap: "changeProp", components:[
						{name: "changePropText", content: "Prop..", classes:"quarter-circle-bottom-right-text"}
					]},
				]},
			]},
			
		]},
	],

	create: function(inSender, inEvent) {
		this.inherited(arguments);
		this.$.propFieldTitle.setContent(this.kindName.replace(".Test","") + " Prop");
		this.$.targetFieldTitle.setContent(this.kindName.replace(".Test",""));
	},

	// update selected
	updateSelected: function(inSender, inEvent){
		var selected = this.$.selected;
		if(inEvent.originator.kind == 'enyo.Checkbox'){
			selected.setContent(inEvent.originator.name + " selected");
			enyo.log("[" + this.name + "] " + inEvent.originator.name + " selected");
		}
	},

	// render target
	renderTarget: function(inSender, inEvent){
		var lineWidthValue = Number(this.$.lineWidth_input.getValue());
		var circleColorValue = this.$.circleColor_input.getValue();
		if(!this.$.target){
			this.$.targetField.createComponent({
				name : "target",
				kind: "g.Progress",
				lineWidth : lineWidthValue,
				circleColor : circleColorValue,
				style: "width: 100%; height: 100%;",
			},{owner:this}).render();  
		}
		// if you want to locate target on center
		this.$.targetContainer.applyStyle('text-align','center');
		enyo.log("[" + this.name + "] render... lineWidth : " + lineWidthValue + ", circleColor : " + circleColorValue);
		this.showTarget();
	},

	// apply properties
	applyProp: function(){
		var lineWidthValue = Number(this.$.lineWidth_input.getValue());
		var circleColorValue = this.$.circleColor_input.getValue();

		this.$.target.draw(0);
		this.$.target.setLineWidth(lineWidthValue);
		this.$.target.setCircleColor(circleColorValue);
		enyo.log("[" + this.name + "] apply... lineWidth : " + lineWidthValue + ", circleColor : " + circleColorValue);

		this.showTarget();
		this.$.properties.ontap = "";
	},

	updateStatus: function(progress){
		var status = this.$.status;
		status.setContent(parseInt(progress*this._totalValue, 10) + "%");
	},

	drawPressed: function(inSender, inEvent){
		var self = this;
		this._curValue = 0;
		if (this._timerID!=0){
			this.stopProgress();
			this.$.target.draw(0);
		}
		switch(inSender.name) {
		case 'validBtn':
			this.$.invalidBtn.setDisabled(true);
			this._timerID = setInterval(function(){self.updateProgress.call(self, inSender.name);}, 50);
			break;
		case 'invalidBtn':
			this.$.validBtn.setDisabled(true);
			this._timerID = setInterval(function(){self.updateProgress.call(self, inSender.name);}, 50);
			break;
		}
	},
	resetButtonTapped: function(inSender, inEvent){
		this.stopProgress();
		// this.updateStatus(0);
		
	},

	stopProgress: function() {
		clearInterval(this._timerID);
		this._timerID = 0;
		// this.$.target.draw(0);
		this.$.validBtn.setDisabled(false);
		this.$.invalidBtn.setDisabled(false);
	},

	updateProgress: function(btnName) {
		switch(btnName) {
		case 'validBtn':
			var progress = this._curValue/this._totalValue;
			this.$.target.draw(progress);
			this.updateStatus(progress);
			this._curValue++;
			if (this._curValue > this._totalValue) {
				this.stopProgress();
			}
			break;
		case 'invalidBtn':
			var progress = -(this._curValue/this._totalValue);
			// var progress = (this._totalValue - this._curValue)/this._totalValue;
			this.$.target.draw(progress);
			this.updateStatus(progress);
			this._curValue++;
			if (this._curValue > this._totalValue) {
				this.stopProgress();
			}
			break;
		}
	},

	// reset target
	resetTarget: function(inSender, inEvent){
		this.stopProgress();	// add
		this.$.target.destroy();
		this.resetConsoles();
		enyo.log("[" + this.name + "] reset...");
		this.showProp();
		this.showRenderButton();
	},

	// change properties
	changeProp: function(inSender, inEvent){
		this.stopProgress();
		this.$.status.setContent("");
		this.showProp();
		this.showApplyButton();
	},

	/*--- shift funcitons ---*/
	// showTarget
	showTarget: function(){
		this.$.targetField.removeClass('visibility-hidden');
		this.$.propField.addClass('visibility-hidden');
		enyo.log("[" + this.name + "] " + "show target");
	},
	// showProp
	showProp: function(){
		this.$.targetField.addClass('visibility-hidden');
		this.$.propField.removeClass('visibility-hidden');
		enyo.log("[" + this.name + "] " + "show prop");
	},
	// show apply button
	showApplyButton: function(){
		this.$.applyProp.removeClass('visibility-hidden');
		this.$.renderTarget.addClass('visibility-hidden');
	},
	// show render button
	showRenderButton: function(){
		this.$.applyProp.addClass('visibility-hidden');
		this.$.renderTarget.removeClass('visibility-hidden');
	},
	/*--- etc ---*/
	resetConsoles: function(){
		this.$.status.setContent("");
		this.$.lineWidth_input.setValue(10);
		this.$.circleColor_input.setValue("#6495ED");
	},
});