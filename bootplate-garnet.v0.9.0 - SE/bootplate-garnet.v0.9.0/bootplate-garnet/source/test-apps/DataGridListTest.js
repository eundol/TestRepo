/*
##   @b DataGridListTestApp (g.DataGridList)
#
#    @brief
#        - Goal : Property validate
#        - Description : Testing g.DataGridList API according to combination of properties.
#
#    @remark
#        - 2014.  3.  6. Initial created
#
#    @author heesung.eun@lgepartner.com
#
#    @version 0.1
#
#    ** Do not change names related with operating (such as 'propField', 'targetField', 'targetContainer', 'backToList'...)
*/

enyo.kind({
	name: "g.Test.DataGridList",
	classes: "enyo-unselectable garnet test-app-base",
	handlers:{
	},
	components: [
		{classes : "g-common-width-height-fit g-layout-absolute-wrapper", components:[
			// {kind: "enyo.Image", src: "assets/mask320.png", style: "z-index: 9999; pointer-events: none;"},
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
					{name: "properties", classes: "properties", components:[
						{classes: "property", style: "margin-top:62px; text-align:center;", components:[
							{content: "There is no Property", style:"float: none;"},
						]},
						{classes: "property", style: "margin-top:25px; margin-left:41px;", components:[
							{content: "item counts : "},
							{name: "counts", kind: "enyo.Input", placeholder : "50", value: 50, selectOnFocus: true, style:"margin-left:6px; width:108px;", oninput: "keyPress"},
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
				{classes: "title", style:"z-index:9999;", components:[
					{name: "targetFieldTitle", classes: "title-text", ontap:"resetTarget",},
				]},
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
		if(!this.$.target){
			this.set("record", new enyo.Collection(this.generateRecords(this.$.counts.getValue())));
			this.index = 1;
			new enyo.Binding({source: this, target: this, from: ".record", to: ".$.target.collection", oneWay: false});
			this.$.targetField.createComponent({
				name: "target",
				kind: "g.DataGridList",
				scrollerOptions: {thumb: true},
				spacing: 5,
				style: "border-radius: 9999px; background-color:black;",
				components: [{
					components: [
						{name: "image", kind: "enyo.Image", style: "display: block;	width: 100%;"},
					],
					bindings: [
						{from: ".model.url", to: ".$.image.src"},
					]},
				],
			},{owner:this});  
		}
		this.$.target.render();
		enyo.log("[" + this.name + "] render..."); // log
		this.showTarget();
	},
	
/*------ Added Functions ------*/
	keyPress: function(inSender){
		this.$.selected.setContent(inSender.name + " : " + this.$.counts.getValue());
	},
/*------------------*/	

	// reset target
	resetTarget: function(inSender, inEvent){
		this.$.counts.setValue(50); // to set default
		this.$.target.destroy();
		this.resetConsoles();
		enyo.log("[" + this.name + "] reset...");
		this.showProp();
		this.showRenderButton();
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

	bindings: [
		{from: ".record", to: ".$.target.collection", oneWay: false},
	],
	
	// generateRecords
	generateRecords: function (count) {
		var records = [],
			idx     = this.index || 1;
		for (; records.length < count; ++idx) {
			var title = (idx % 8 === 0) ? " with long title" : "";
			records.push({
				text: "Item " + idx + title,
				url: "http://placehold.it/300x300/" + Math.floor(Math.random()*0x1000000).toString(16) + "/ffffff&text=Image " + idx
			});
		}
		// update our internal index so it will always generate unique values
		this.index = idx;
		return records;
	},
});