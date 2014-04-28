/*
##   @b TitleTestApp (g.Title)
#
#    @brief
#        - Goal : Property validate
#        - Description : Testing g.Title API according to combination of properties.
#
#    @remark
#        - 2014.  3. 5. Initial created
#
#    @author heesung.eun@lgepartner.com
#
#    @version 0.1
#
#    ** Do not change names related with operating (such as 'propField', 'targetField', 'targetContainer', 'backToList'...)
*/

enyo.kind({
	name: "g.Test.Title",
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
						// Property
						{classes: "property", style: "margin-top:62px; text-align:center;", components:[
							{content: "There is no Property", style:"float: none;"},
						]},
						{classes: "property", style: "margin-top:25px; margin-left:41px;", components:[
							{content: "Title : "},
							{name: "title", kind: "enyo.Input", placeholder : "input title", value: "Life's Good with LG", selectOnFocus: true, style:"margin-left:6px; width:160px;", oninput: "keyPress"},
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
				{name: "back", kind: "g.Icon", src: "assets/arrow-left-icon.png", style: "z-index:9999; margin:130px 0 0 40px;", ontap:"resetTarget",},
			]},
			
		]},
	],
	
	create: function(inSender, inEvent) {
		this.inherited(arguments);
		this.$.propFieldTitle.setContent(this.kindName.replace(".Test","") + " Prop");
	},
	
	// render target
	renderTarget: function(inSender, inEvent){
		if(!this.$.targetList){
			this.$.targetField.createComponent({
				name : "targetList",
				kind: "g.Scroller",
				onScrollStart: "onScrollStart",
				onScrollStop: "showBackButton",
				style: "text-align: center; height: 320px;",
				components: [
					{content:"", style:"height:65px;"}
				]
			},{owner:this});  
		}
		for(var i = 0; i < 50 ; i++){
			var contentValue = makeName(5, 15, '', '');
			this.$.targetList.$.strategy.$.client.createComponent({
				content: contentValue,
				classes: "item-component",
				style: "font-size: 16px; width: 320px; height:30px; padding-top:10px; font-family: Miso;}",
			},{owner:this});
		}
		this.$.targetList.render();

		var titleValue = this.$.title.getValue();
		if(!this.$.target){
			this.$.targetField.createComponent({
				name : "target",
				kind: "g.Title",
				content: titleValue,
				style: "opacity: 0.8; background-color: #EDEDED; color:#4B4B4B;",
				ontap:"resetTarget",
			},{owner:this}).render();  
		}
		enyo.log("[" + this.name + "] render... - content : " + titleValue); // log
		this.showTarget();
	},
	
/*------ Added Functions ------*/
	keyPress: function(inSender){
		this.$.selected.setContent(inSender.name + " : " + this.$.title.getValue());
	},
	onScrollStart: function(inSender, inEvent){
		if (inEvent.originator.vertical && inEvent.originator.uy - inEvent.originator.py > 0) {
			// scroll down
			this.$.target.setOpen(true);
		} else if (inEvent.originator.vertical && inEvent.originator.uy - inEvent.originator.py < 0) {
			// scroll up
			this.$.target.setOpen(false);
		}
		this.hideBackButton();
	},
	hideBackButton: function(){
		this.$.back.applyStyle("display","none");
	},
	showBackButton: function(){
		this.$.back.applyStyle("display","inline-block");
	},
/*------------------*/	
	
	// reset target
	resetTarget: function(inSender, inEvent){
		this.$.title.setValue("Life's Good with LG"); // to set default
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
});

/* exported makeName */
function makeName(minlength, maxlength, prefix, suffix) {

	function rnd(minv, maxv) {
		if (maxv < minv) {
			return 0;
		}
		return Math.floor(Math.random()*(maxv-minv+1)) + minv;
	}

	prefix = prefix || '';
	suffix = suffix || '';
	// these weird character sets are intended to cope with the nature of English (e.g. char 'x' pops up less frequently than char 's')
	// note: 'h' appears as consonants and vocals
	var vocals = 'aeiouyh' + 'aeiou' + 'aeiou';
	var cons = 'bcdfghjklmnpqrstvwxz' + 'bcdfgjklmnprstvw' + 'bcdfgjklmnprst';
	var allchars = vocals + cons;
	var length = rnd(minlength, maxlength) - prefix.length - suffix.length;
	if (length < 1) {
		length = 1;
	}
	var consnum = 0;
	var i;
	if (prefix.length > 0) {
		for (i = 0; i < prefix.length; i++) {
			if (consnum == 2) {
				consnum = 0;
			}
			if (cons.indexOf(prefix[i]) != -1) {
				consnum++;
			}
		}
	}
	else {
		consnum = 1;
	}
	var name = prefix;
	for (i = 0; i < length; i++)
	{
		var touse;
		//if we have used 2 consonants, the next char must be vocal.
		if (consnum == 2)
		{
			touse = vocals;
			consnum = 0;
		}
		else {
			touse = allchars;
		}
		//pick a random character from the set we are goin to use.
		var c = touse.charAt(rnd(0, touse.length - 1));
		name = name + c;
		if (cons.indexOf(c) != -1) {
			consnum++;
		}
	}
	name = name.charAt(0).toUpperCase() + name.substring(1, name.length) + suffix;
	return name;
}