
/*
##   @b DatePickerPanelTestApp (g.DatePickerPanel)
#
#    @brief
#        - Goal : Property validate
#        - Description : Testing g.DatePickerPanel API according to combination of properties.
#
#    @remark
#        - 2014. 4. 7. Initial created
#
#    @author hyojoo.cho@lgepartner.com
#
#    @version 0.3
#
#    ** Do not change names related with operating (such as 'propField', 'targetField', 'targetContainer', 'backToList'...)
*/

enyo.kind({
	name: "g.Test.DatePickerPanel",
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
						{kind: "enyo.Table", name: "propTable", style: "margin-top:70px;", components:[
							{kind: "enyo.TableRow", components:[
								{kind: "enyo.TableCell", style: "padding-right: 10px; border-color:white; border-right-width: 1px; border-right-style: solid;", components:[
									{content: "locale"},
								]},
								{kind: "enyo.TableCell", components:[
									{name: "locale_input", kind: "enyo.Input", placeholder: "en-US", style: "width: 240px;", selectOnFocus: true, oninput: "updateSelected"},
								]},
							]},
							{name: "row_value", kind: "enyo.TableRow", components:[
								{kind: "enyo.TableCell", style: "border-color:white; border-right-width: 1px; border-right-style: solid;", components:[
									{content: "value"/*, style: "color: Tan"*/},
								]},
								{kind: "enyo.TableCell", components:[
									{name: "value_input", kind: "enyo.Input", placeholder: "please follow format (YYYY/MM/DD)", style: "width: 240px;", selectOnFocus: true, oninput: "updateSelected"},
								]},
							]},
						]},
					]},
				]},
				// Selected
				{classes: "selected", components:[
					{content: "input text", classes: "selected-title"},
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
				{classes: "title", style: "margin-top: 20px;", components:[
					{name: "targetFieldTitle", classes: "title-text", style: "z-index: 9999;"},
				]},
				// Target Container
				{kind: "enyo.Scroller", fit: true, strategyKind: "TouchScrollStrategy", touch: true, horizontal: "hidden", thumb: false, classes: "g-layout-box-inside-circle-no-wheel target-container-sroller", components: [
					{name: "targetContainer", components:[
					]},
				]},
				{
					name: "ptoast",
					kind: "g.Toast",
					content: "OK"
				},
				// Buttons
				{name: "reset", kind: "g.Icon", src: "assets/icon-reset.png", style: "z-index:9999;margin:130px 0 0 20px;", ontap:"resetTarget",},
				{name: "prop", kind: "g.Icon", src: "assets/icon-prop.png", style: "z-index:9999;margin:130px 0 0 250px;", ontap:"changeProp",},
			]},
		]},
	],

	create: function(inSender, inEvent) {
		this.inherited(arguments);
		this.$.propFieldTitle.setContent(this.kindName.replace(".Test","") + " Prop");
		this.$.targetFieldTitle.setContent(this.kindName.replace(".Test",""));
	},

	// render target
	renderTarget: function(inSender, inEvent){
		// enyo.log("["+this.name+"] "+"value: "+this.$.value_input.getValue());
		var localeValue = (this.$.locale_input.getValue() == "") ? "en-US" : this.$.locale_input.getValue();
		var dateValue = (this.$.value_input.getValue() == "") ? new Date() : new Date('"'+this.$.value_input.getValue()+'"');
		// enyo.log("["+this.name+"] "+"date: "+dateValue);

		if(!this.$.target){
			this.$.targetField.createComponent({
				name : "target",
				kind: "g.DatePickerPanel",
				content: "Garnet DatePickerPanel",
				// locale: localeValue,
				value: dateValue,
				onOK: function() {
					this.owner.$.ptoast.setContent("OK click!!");
					this.owner.$.ptoast.setOpen(!this.owner.$.ptoast.getOpen());
				},
				onCancel: function() {
					this.owner.$.ptoast.setContent("Cancel click!!");
					this.owner.$.ptoast.setOpen(!this.owner.$.ptoast.getOpen());
				},
			},{owner:this}).render();
		}

		// if you want to locate target on center
		this.$.targetContainer.applyStyle('text-align','center');
		enyo.log("[" + this.name + "] render... - locale: " + localeValue + ", value: " + dateValue);
		this.showTarget();
	},

	// apply properties
	applyProp: function(){
		var localeValue = this.$.locale_input.getValue();
		var dateValue = this.$.value_input.getValue();

		if (this.$.target){
			if (localeValue != ""){
				this.$.target.setLocale(localeValue);
			}
			if (dateValue != ""){
				this.$.target.setValue(new Date('"'+dateValue+'"'));
			}
		}
		enyo.log("[" + this.name + "] apply... - locale: " + localeValue + ", value: " + dateValue);
		this.showTarget();
	},

	// update selected
	updateSelected: function(inSender, inEvent){
		this.$.selected.setContent(inSender.name + " changed");
		// enyo.log("[" + this.name + "] " + inSender.name + " : " + inSender.value);
	},

	// reset target
	resetTarget: function(inSender, inEvent){
		// this.$.propTable.applyStyle("margin-top","70px");
		// this.$.row_value.applyStyle("display","table-row");

		this.$.locale_input.setValue("");
		this.$.value_input.setValue("");

		this.$.target.destroy();
		this.resetConsoles();
		enyo.log("[" + this.name + "] reset...");
		this.showProp();
		this.showRenderButton();
	},

	// change properties
	changeProp: function(inSender, inEvent){
		// this.$.propTable.applyStyle("margin-top","70px");
		// this.$.row_value.applyStyle("display","none");
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