/*
##   @b WheelPickerTestApp (g.WheelPicker)
#
#    @brief
#        - Goal : Property validate
#        - Description : Testing g.WheelPicker API according to combination of properties.
#
#    @remark
#        - 2014.  3.  3. Initial created
#		 - 2014.  3. 10. Add public property (non-published)
#		 - 2014.  3. 25. Change default value
#
#    @author heesung.eun@lgepartner.com
#
#    @version 0.3
#
#    ** Do not change names related with operating (such as 'propField', 'targetField', 'targetContainer', 'backToList'...)
*/

enyo.kind({
	name: "g.Test.WheelPicker",
	classes: "enyo-unselectable garnet test-app-base",
	handlers:{
	},
	components: [
		{classes : "g-common-width-height-fit g-layout-absolute-wrapper", components:[
			{kind: "enyo.Image", src: "assets/mask320.png", style: "z-index: 9999; pointer-events: none;"},
			// Watch background background - black
			{classes: "watch-background black"},
			
			// Prop Field
			{name: "propField", classes : "prop-field", components:[
				// Title
				{classes: "title", components:[
					{name: "propFieldTitle", classes: "title-text"}
				]},
				// Properties list - enyo.Scroller
				{kind: "enyo.Scroller", fit: true, strategyKind: "TouchScrollStrategy", touch: true, horizontal: "hidden", thumb: false, classes: "g-layout-box-inside-circle-no-wheel properties-sroller", components: [
					{name: "properties", classes: "properties", style: "font-size:15px;", components:[
						// Property - wheelWidth, wheelColor, backgroundColor, knobColor
						{kind: "enyo.Table", name: "propTable", style: "margin-top:21px; margin-left:23px;", components:[
							{kind: "enyo.TableRow", components:[
								{kind: "enyo.TableCell", style: "width:141px; border-color:white; border-right-width: 1px; border-right-style: solid;", components:[
									{content: "wheelWidth"},
								]},
								{kind: "enyo.TableCell", components:[
									{name: "wheelWidthValue", kind: "enyo.Input", placeholder : "20 [integer 1~]", value: "", selectOnFocus: true, style: "margin-left:5px; width:100px;", oninput: "keyPress"},
								]},
							]},
							{kind: "enyo.TableRow", components:[
								{kind: "enyo.TableCell", style: "border-color:white; border-right-width: 1px; border-right-style: solid;", components:[
									{content: "wheelColor"},
								]},
								{kind: "enyo.TableCell", components:[
									{name: "wheelColorValue", kind: "enyo.Input", placeholder : "", value: "", selectOnFocus: true, style: "margin-left:5px; width:100px;", oninput: "keyPress"},
								]},
							]},
							{kind: "enyo.TableRow", components:[
								{kind: "enyo.TableCell", style: "border-color:white; border-right-width: 1px; border-right-style: solid;", components:[
									{content: "backgroundColor"},
								]},
								{kind: "enyo.TableCell", components:[
									{name: "backgroundColorValue", kind: "enyo.Input", placeholder : "", value: "", selectOnFocus: true, style: "margin-left:5px; width:100px;", oninput: "keyPress"},
								]},
							]},
							{kind: "enyo.TableRow", components:[
								{kind: "enyo.TableCell", style: "border-color:white; border-right-width: 1px; border-right-style: solid;", components:[
									{content: "knobColor"},
								]},
								{kind: "enyo.TableCell", components:[
									{name: "knobColorValue", kind: "enyo.Input", placeholder : "", value: "", selectOnFocus: true, style: "margin-left:5px; width:100px;", oninput: "keyPress"},
								]},
							]},
							{name: "row_backgroundEnabled", kind: "enyo.TableRow", style:"height:27px;", components:[
								{kind: "enyo.TableCell", style: "border-color:white; border-right-width: 1px; border-right-style: solid; color: Tan", components:[
									{content: "backgroundEnabled"},
								]},
								{kind: "enyo.TableCell", style: "color: Tan", components:[
									{kind: "Group", onActivate: "", components: [
										{name: "backgroundEnabled_true", kind: "enyo.Checkbox", content: "true", checked: true, style: "margin-left: 5px;", onchange: "propChanged",},
										{name: "backgroundEnabled_false", kind: "enyo.Checkbox", content: "false", style: "margin-left: 10px;", onchange: "propChanged",}
									]},
								]},
							]},
							{name: "row_knobEnabled", kind: "enyo.TableRow", style:"height:27px;", components:[
								{kind: "enyo.TableCell", style: "border-color:white; border-right-width: 1px; border-right-style: solid; color: Tan", components:[
									{content: "knobEnabled"},
								]},
								{kind: "enyo.TableCell", style: "color: Tan", components:[
									{kind: "Group", onActivate: "", components: [
										{name: "knobEnabled_true", kind: "enyo.Checkbox", content: "true", checked: true, style: "margin-left: 5px;", onchange: "propChanged",},
										{name: "knobEnabled_false", kind: "enyo.Checkbox", content: "false", style: "margin-left: 10px;", onchange: "propChanged",}
									]},
								]},
							]},
						]},
					]},
				]},
				// Selected
				{classes: "selected", components:[
					{content: "selected", classes: "selected-title"},
					{classes: "selected-bar"},
					{name: "selected", content: "", classes: "selected-text"},
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
				{classes: "title",  style: "padding-top:27px;", components:[
					{name: "targetFieldTitle", classes: "title-text"},
				]},
				// Target Container
				{fit: true, classes: "g-layout-box-inside-circle-no-wheel target-container-sroller", style: "height:160px; z-index:9999;", components: [
					{name: "targetContainer", components:[
						{kind: "g.Button", classes: "center middle", style: "margin-top:70px;", ontap: "resetTarget", small: true, content: "Reset"},
						{kind: "g.Button", classes: "center middle", style: "margin-top:70px;", ontap: "changeProp", small: true, content: "Prop.."},
					]},
				]},
				// Status
				{classes: "status", style: "margin-top:197px;", components:[
					{content: "status", classes: "status-title"},
					{classes: "status-bar"},
					{name: "status", classes: "status-text"},
				]},
				// Buttons
			]},
			
		]},
	],
	
	create: function(inSender, inEvent) {
		this.inherited(arguments);
		this.$.propFieldTitle.setContent(this.kindName.replace(".Test","") + " Prop");
		this.$.targetFieldTitle.setContent(this.kindName.replace(".Test",""));
		this.setDefault();
	},
	
	// render target
	renderTarget: function(inSender, inEvent){
		var wheelWidthValue = this.$.wheelWidthValue.getValue();
		if(!isNaN(wheelWidthValue) && wheelWidthValue != ""){
			wheelWidthValue = parseFloat(wheelWidthValue);
		}
		var wheelColorValue = this.$.wheelColorValue.getValue();
		var backgroundColorValue = this.$.backgroundColorValue.getValue();
		var knobColorValue = this.$.knobColorValue.getValue();
		var backgroundEnabledValue = (this.$.backgroundEnabled_true.getChecked()? true : false);
		var knobEnabledValue = (this.$.knobEnabled_true.getChecked()? true : false);
		if(!this.$.target){
			this.$.targetField.createComponent({
				name : "target",
				kind: "g.sdet.WheelPickerController",
				onWheelPickerChange: "onChange",
				onWheelPickerReleased: "onReleased",
			},{owner:this});  
		}else{
			return;
		}
		this.$.target.createComponent({
			name: "wheel",
			kind: "g.WheelPicker",
			wheelWidth: wheelWidthValue,
			wheelColor: wheelColorValue,
			backgroundColor: backgroundColorValue,
			knobColor: knobColorValue,
			backgroundEnabled: backgroundEnabledValue,
			knobEnabled: knobEnabledValue
		})
		this.$.target.render();
		// if you want to locate target on center
		this.$.targetContainer.applyStyle('text-align','center');
		enyo.log("[" + this.name + "] render... - wheelWidth : " + wheelWidthValue + ", wheelColor : " + wheelColorValue + ", backgroundColor : " + backgroundColorValue + ", knobColor : " + knobColorValue); // log
		this.showTarget();
		this.updateStatus();
	},
	
	// apply properties
	applyProp: function(){
		var wheelWidthValue = this.$.wheelWidthValue.getValue();
		if(!isNaN(wheelWidthValue) && wheelWidthValue != ""){
			wheelWidthValue = parseFloat(wheelWidthValue);
		}
		this.$.target.$.wheel.setWheelWidth(wheelWidthValue);
		this.$.target.$.wheel.setWheelColor(this.$.wheelColorValue.getValue());
		this.$.target.$.wheel.setBackgroundColor(this.$.backgroundColorValue.getValue());
		this.$.target.$.wheel.setKnobColor(this.$.knobColorValue.getValue());
		enyo.log("wheelWidth : " + this.$.target.$.wheel.getWheelWidth() + ", wheelColor : " + this.$.target.$.wheel.getWheelColor() + ", backgroundColor : " + this.$.target.$.wheel.getBackgroundColor() + ", knobColor : " + this.$.target.$.wheel.getKnobColor()); // log
		this.showTarget();
		this.updateStatus();
	},
	
	// update status
	updateStatus: function(){
		var status = this.$.status;
		status.setContent("wheelWidth : " + this.$.target.$.wheel.getWheelWidth() + ", wheelColor : " + this.$.target.$.wheel.getWheelColor() + ", backgroundColor : " + this.$.target.$.wheel.getBackgroundColor() + ", knobColor : " + this.$.target.$.wheel.getKnobColor());
	},
	
/*------ Added Functions ------*/	
	keyPress: function(inSender, inEvent){
		this.$.selected.setContent(inSender.name + " changed");
	},
	onChange: function(inSender, inEvent){
		this.$.status.setContent(parseInt(inEvent.value, 10));
	},
	onReleased: function(inSender, inEvent){
		this.$.status.setContent(0);
	},
	propChanged: function(inSender, inEvent){
		this.$.selected.setContent(inEvent.originator.name + " selected");
	},
	setDefault: function(){
		this.$.wheelWidthValue.setValue(g.wheelWidth);
		this.$.wheelColorValue.setValue(g.constant.colorPoint);
		this.$.backgroundColorValue.setValue("#222222");
		this.$.knobColorValue.setValue("white");
		this.$.backgroundEnabled_true.setChecked(true);
		this.$.knobEnabled_true.setChecked(true);
	},
/*------------------*/
	
	// reset target
	resetTarget: function(inSender, inEvent){
		this.$.propTable.applyStyle("margin-top","21px");
		this.$.row_backgroundEnabled.applyStyle("display","table-row");
		this.$.row_knobEnabled.applyStyle("display","table-row");
		this.setDefault();
		this.resetConsoles();
		this.$.target.destroy();
		enyo.log("[" + this.name + "] reset...");
		this.showProp();
		this.showRenderButton();
	},
	
	// change properties
	changeProp: function(inSender, inEvent){
		this.$.propTable.applyStyle("margin-top","50px");
		this.$.row_backgroundEnabled.applyStyle("display","none");
		this.$.row_knobEnabled.applyStyle("display","none");
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
		if(this.$.status){
			this.$.status.setContent("");
		}
		if(this.$.selected){
			this.$.selected.setContent("");
		}
	},
});

/**
	_g.sdet.WheelPickerController_ implements the control for picker controls which looks like circular slider.
*/
enyo.kind({
	//* @public
	name: "g.sdet.WheelPickerController",
	//* @protected
	kind: "g.WheelGesture",
	//* @public
	published: {
		/**
			The base position of the knob.

			range [0 ~ Math.PI * 2]
		*/
		baseRadian: 0,
		/**
			Whether knob should be start from the base position or not.
			If it is false, the starting position of rotation is the refence position.

			range [true or false]
		*/
		baseFixed: true,
		/**
			Whether knob is rewinded to the starting position at the end of touching.
			If it is false, the knob is remained in the ending position.

			range [true or false]
		*/
		rewindEnabled: true
	},
	events: {
		//* Fires when the knob position is set. The _value_ property contains the variation degree.
		onWheelPickerChange: "",
		//* Fires when the knob is released.
		onWheelPickerReleased: "",
		//* Fires when animation to a position finishes.
		onAnimateFinish: ""
	},
	//* @protected
	_unitRadian: 0.5,
	// _widthVisible: g.wheelWidth,
	// _knobColor: "#FFFFFF",
	_rewindEnabledAnimation: false,
	_rangeOfBase: 0.2,
	_radian: 0,
	_radianAccumulated: 0,
	_changeDelayMS: 100,
	classes: "g g-wheel-picker-controller",
	components: [
		{kind: "Animator", onStep: "_animationStep", onEnd: "_animationFinish", duration: 350},
	],
	//* @protected
	rendered: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this._redraw();
		};
	}),
	widthVisibleChanged: function() {
		this._redraw();
	},
	radiusChanged: function() {
		// FIXME: how to handle radius?
		this._redraw();
	},
	//* @protected
	_eventObservingStart: function(inRadian) {
		if (!this.baseFixed) {
			this.baseRadian = inRadian;
		} else if (!this._checkStartPosition(inRadian)) {
			this._isObserving = false;
			return false;
		}
		this._radian = this.baseRadian;
		this._radianAccumulated = 0;
		this._update(inRadian);
		return true;
	},
	_eventObservingStep: function(inRadian) {
		this._update(inRadian);
		return true;
	},
	_eventObservingStop: function(inRadian) {
		this._update(inRadian);
		this._rewind();
		return true;
	},
	_animationStart: function(inStartValue, inEndValue) {
		this.$.animator.play({
			startValue: inStartValue,
			endValue: inEndValue,
			node: this.hasNode()
		});
	},
	_animationStep: function(inSender) {
		this._radianAccumulated = inSender.value - this.baseRadian;
		this._draw(inSender.value);
		return true;
	},
	_animationFinish: function(inSender) {
		this.doAnimateFinish(inSender);
		return true;
	},
	_initVariables: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			while (this.baseRadian < 0) {
				this.baseRadian += this._constMaxRadians;
			}
			while (this.baseRadian > this._constMaxRadians) {
				this.baseRadian -= this._constMaxRadians;
			}
			this._radian = this.baseRadian;
		};
	}),
	_checkStartPosition: function(inRadian) {
		var diff;
		diff = Math.abs(inRadian - this.baseRadian);
		if (diff > Math.PI) {
			diff = this._constMaxRadians - diff;
		}
		if (diff > this._rangeOfBase) {
			return false;
		}
		return true;
	},
	_redraw: function() {
		// this.$.wheel.setWheelWidth(this._widthVisible);
		// this.$.wheel.setKnobColor(this._knobColor);
	},
	_rewind: function() {
		if (this.rewindEnabled) {
			if (this._rewindEnabledAnimation && this._radianAccumulated !== this.baseRadian) {
				this._animationStart(this.baseRadian + this._radianAccumulated, this.baseRadian);
			} else {
				this._radian = this.baseRadian;
				this._radianAccumulated = 0;
				this._draw(this.baseRadian);
			}
		} else {
			this.baseRadian = this._radian;
			this._radianAccumulated = 0;
			this._draw(this.baseRadian);
		}
		this._bubbleEventReleased();
	},
	_update: function(inRadian) {
		this._radianAccumulated += this._computeRadianDifference(inRadian, this._radian);
		this._radian = inRadian;
		this._draw(this.baseRadian + this._radianAccumulated);
		this._bubbleEventChange();
	},
	_computeRadianDifference: function(inToRadian, inFromRadian) {
		var diff = inToRadian - inFromRadian;
		if (diff > Math.PI) {
			diff -= this._constMaxRadians;
		} else if( diff < -Math.PI) {
			diff += this._constMaxRadians;
		}
		return diff;
	},
	_draw: function(inRadian) {
		this.$.wheel.draw(this.baseRadian, inRadian);
	},
	_bubbleEventChange: function(inEventData) {
		this.throttleJob("WheelPickerController_Event", function() {
			this.doWheelPickerChange({value: Math.round(this._radianAccumulated / this._unitRadian)});
		}, this._changeDelayMS);
	},
	_bubbleEventReleased: function() {
		this.doWheelPickerReleased();
	}
});
