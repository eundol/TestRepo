/*
##   @b TimePickerPanelTestApp (g.TimePickerPanel)
#
#    @brief
#        - Goal : Property validate
#        - Description : Testing g.TimePickerPanel API according to combination of properties.
#
#    @remark
#        - 2014.  3. 27. Initial created
#
#    @author ykh815.yoo@lgepartner.com
#
#    @version 0.1
#
#    ** Do not change names related with operating (such as 'propField', 'targetField', 'targetContainer', 'backToList'...)
*/

enyo.kind({
	name: "g.Test.TimePickerPanel",
	classes: "enyo-unselectable garnet test-app-base",
	components: [
		{classes : "g-common-width-height-fit g-layout-absolute-wrapper", components:[
			// Watch background background - black
			{classes: "watch-background black"},

			// Prop Field
			{name: "propField", classes : "prop-field", components:[
				// Title
				{classes: "title", components:[
					{name: "propFieldTitle", classes: "title-text"},
				]},
				// Properties list - enyo.Scroller
				{classes: "g-layout-box-inside-circle-no-wheel properties-scroller", components: [
					{name: "properties", classes: "properties", components:[
						// Property - disable
						{kind: "enyo.Table", name: "propTable", style: "margin-top:55px; margin-left:23px;", components:[
							{kind: "enyo.TableRow", components:[
								{kind: "enyo.TableCell", style: "width:141px; border-color:white; border-right-width: 1px; border-right-style: solid;", components:[
									{content: "hourValue"},
								]},
								{kind: "enyo.TableCell", components:[
									{name: "hourValue", kind: "enyo.Input", placeholder : "0 [integer 1~12]", value: "", style: "margin-left:5px; width:100px;", selectOnFocus: true},
								]},
							]},
							{kind: "enyo.TableRow", components:[
								{kind: "enyo.TableCell", style: "border-color:white; border-right-width: 1px; border-right-style: solid;", components:[
									{content: "minuteValue"},
								]},
								{kind: "enyo.TableCell", components:[
									{name: "minuteValue", kind: "enyo.Input", placeholder : "0 [integer 0~59]", value: "", style: "margin-left:5px; width:100px;", selectOnFocus: true},
								]},
							]},
							{kind: "enyo.TableRow", components:[
								{kind: "enyo.TableCell", style: "border-color:white; border-right-width: 1px; border-right-style: solid;", components:[
									{content: "meridiemValue"},
								]},
								{kind: "enyo.TableCell", components:[
									{name: "meridiemValue", kind: "enyo.Input", placeholder : "AM [AM, PM]", value: "", style: "margin-left:5px; width:100px;", selectOnFocus: true},
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
				{classes: "title", components:[
					{name: "targetFieldTitle", classes: "title-text"},
				]},
				// Target Container
				{classes: "g-layout-box-inside-circle-no-wheel target-container-scroller", components: [
					{name: "targetContainer", components:[
					]},
				]},
				// Status
				{classes: "status", components:[
					{content: "status", classes: "status-title"},
					{classes: "status-bar"},
					{name: "status", content: "", classes: "status-text"},
				]},
				// Buttons
				{name: "buttonGroupTarget", classes: "button-group", components:[
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
		if(this.$.disable_true.getChecked()){
			selected.setContent("disable_true" + " selected");
			enyo.log("[" + this.name + "] " + "disable_true" + " selected");
		}else{
			selected.setContent("disable_false" + " selected");
			enyo.log("[" + this.name + "] " + "disable_false" + " selected");
		}
	},

	// render target
	renderTarget: function(inSender, inEvent){
		var hourValue = this.$.hourValue.getValue();
		var minuteValue = this.$.minuteValue.getValue();
		var meridiemValue = this.$.meridiemValue.getValue();

		if(!this.$.target){
			this.$.targetContainer.createComponent({
			name: "target",
			kind: "g.TimePickerPanel",
			hourValue: hourValue,
			minuteValue: minuteValue,
			meridiemValue: meridiemValue,
			onOK: function() {
				this.owner.$.result.setContent("Time is " + this.getHourValue() + " : " + this.getMinuteValue() + " " + this.getMeridiemValue());
			},
			onCancel: function() {
				this.owner.$.result.setContent("Cancel!");
			}
		},{owner:this}).render();
		}
		// if you want to locate target on center
		this.showTarget();
	},

	// apply properties
	applyProp: function(){
		var hourValue = this.$.hourValue.getValue();
		var minuteValue = this.$.minuteValue.getValue();
		var meridiemValue = this.$.meridiemValue.getValue();

		this.$.target.setHourValue(hourValue);
		this.$.target.setMinuteValue(minuteValue);
		this.$.target.setMeridiemValue(meridiemValue);
		this.showTarget();
		this.$.properties.ontap = "";
	},

	// update status
	updateStatus: function(inSender, inEvent){
		var status = this.$.status;
		status.setContent(inSender.getSrc() + " pressed");
		enyo.log("[" + this.name + "] " + inSender.getSrc() + " pressed");
	},

	// reset target
	resetTarget: function(inSender, inEvent){
		this.$.target.destroy();
		this.resetConsoles();
		enyo.log("[" + this.name + "] reset...");
		this.showProp();
		this.showRenderButton();
	},

	// change properties
	changeProp: function(inSender, inEvent){
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
		this.$.selected.setContent("");

		this.$.hourValue.setValue("");
		this.$.minuteValue.setValue("");
		this.$.meridiemValue.setValue("");
	},
});
