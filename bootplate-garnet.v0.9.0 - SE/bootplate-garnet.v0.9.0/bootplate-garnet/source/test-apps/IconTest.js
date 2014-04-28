/*
##   @b IconTestApp (g.Icon)
#
#    @brief
#        - Goal : Property validate
#        - Description : Testing g.Icon API according to combination of properties.
#
#    @remark
#        - 2014.  2. 24. Initial created
#		 - 2014.  3.  3. Apply black theme
#
#    @author hyojoo.cho@lgepartner.com
#
#    @version 0.1
#
#    ** Do not change names related with operating (such as 'propField', 'targetField', 'targetContainer', 'backToList'...)
*/

enyo.kind({
	name: "g.Test.Icon",
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
						{classes: "property", style: "margin-top:55px; margin-left:45px;", components:[
							{content: "src : "},
							{name: "src_input", kind: "enyo.Input", selectOnFocus: true},
							{tag: "br"},
							{tag: "br"},
							{content: "disable : "},
							{kind: "Group", onActivate: "", components: [
								{name: "disable_true", kind: "g.sdet.CheckboxItem", content: "true",  onchange: "updateSelected"},
								{name: "disable_false", kind: "g.sdet.CheckboxItem", content: "false", checked: true,  onchange: "updateSelected"}
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
		var srcValue = this.$.src_input.getValue();
		var disableValue = (this.$.disable_true.getChecked()? true : false);
		if(!this.$.target){
			this.$.targetContainer.createComponent({
				name : "target",
				kind: "g.Icon",
				style : "margin-top:60px;",
				src : srcValue,
				disabled : disableValue,
				ontap: "updateStatus",
			},{owner:this}).render();  
		}
		// if you want to locate target on center
		this.$.targetContainer.applyStyle('text-align','center');
		enyo.log("[" + this.name + "] render... src : " + srcValue + ", disabled : " + disableValue);
		this.showTarget();
	},

	// apply properties
	applyProp: function(){
		var srcValue = this.$.src_input.getValue();
		var disableValue = (this.$.disable_true.getChecked()? true : false);
		
		this.$.target.setSrc(srcValue);
		this.$.target.setDisabled(disableValue);
		enyo.log("[" + this.name + "] apply... src : " + srcValue + ", disabled : " + this.$.target.getDisabled());
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

		this.$.src_input.setValue("");
		this.$.disable_false.setChecked(true);
	},
});