/*
##   @b ProgressBarTestApp (g.ProgressBar)
#
#    @brief
#        - Goal : Property validate
#        - Description : Testing g.ProgressBar API according to combination of properties.
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
	name: "g.Test.ProgressBar",
	classes: "enyo-unselectable garnet test-app-base progressbar-test ",
	handlers:{
		ontap: "updateSelected",
	},
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
				{style: "height: 220px;", classes: "g-layout-box-inside-circle-no-wheel properties-scroller", components: [
					{name: "properties", classes: "properties", components:[
						// Property - disable
						{classes: "property", style: "margin-top:30px; margin-left:40px; font-size: 16px;", components:[
							{content: "min : "},
							{name: "min_input", kind: "enyo.Input", style: "width: 50px; margin-left: 5px; margin-right: 25px;", value: 0, selectOnFocus: true},
							{content: "max : "},
							{name: "max_input", kind: "enyo.Input", style: "width: 50px; margin-left: 5px;", value: 100, selectOnFocus: true},
							{tag: "br"},
							{tag: "br"},
							{content: "progress : "},
							{name: "progress_input", kind: "enyo.Input", style: "width: 135px; margin-left: 10px;", value: 0, selectOnFocus: true},
							{tag: "br"},
							{tag: "br"},
							{content: "bgProgress : "},
							{name: "bgProgress_input", kind: "enyo.Input", style: "width: 115px; margin-left: 10px;", value: 0, selectOnFocus: true},
							{tag: "br"},
							{tag: "br"},
							{content: "barClasses : "},
							{name: "barClasses_input", kind: "enyo.Input", style: "width: 120px; margin-left: 10px;", value: "g-progress-bar-bar", selectOnFocus: true},
							{tag: "br"},
							{tag: "br"},
							{content: "bgBarClasses : "},
							{name: "bgBarClasses_input", kind: "enyo.Input", style: "width: 100px; margin-left: 10px;", value: "g-progress-bg-bar", selectOnFocus: true},
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
				{classes: "g-layout-box-inside-circle-no-wheel target-container-scroller", components: [
					{name: "targetContainer", style: "text-align: center;", components:[
						{name: "animateButton", kind: "g.Button", style: "min-height: 40px; height: 40px; width: 250px; margin-top: 100px; margin-right: 10px; padding: 0 10px; z-index: 9999; font-size: 14pt; text-transform: none;", classes: "button"/* style: "margin-top:120px; margin-right: 10px; z-index:9999;" */, ontap: "startAnimate", small: true, content: "animateToProgress"},
						{name: "animateInput", kind: "enyo.Input", style: "width: 200px; height: 28px; margin-top: 10px; z-index:9999;", value: 20, selectOnFocus: true},
					]},
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
		if(inEvent.originator.kind == 'enyo.Checkbox'){
			selected.setContent(inEvent.originator.name + " selected");
			enyo.log("[" + this.name + "] " + inEvent.originator.name + " selected");
		}
	},

	// render target
	renderTarget: function(inSender, inEvent){
		var minValue = Number(this.$.min_input.getValue());
		var maxValue = Number(this.$.max_input.getValue());
		var progressValue = Number(this.$.progress_input.getValue());
		var bgProgressValue = Number(this.$.bgProgress_input.getValue());
		var barClassesValue = this.$.barClasses_input.getValue();
		var bgBarClassesValue = this.$.bgBarClasses_input.getValue();

		if(!this.$.target){
			this.$.targetField.createComponent({
				name : "target",
				kind: "g.ProgressBar",
				min: minValue,
				max: maxValue,
				progress: progressValue,
				bgProgress: bgProgressValue,
				barClasses: barClassesValue,
				bgBarClasses: bgBarClassesValue,
				style: "width: 260px; height: 20px; margin-top: 100px; margin-left: 30px;"
			},{owner:this}).render();  
		}
		enyo.log("[" + this.name + "] render... ");
		enyo.log("min: " + minValue + ", max: " + maxValue + ", progress: " + progressValue + ", bgProgress: " + bgProgressValue + ", barClasses: " + barClassesValue + ", bgBarClasses: " + bgBarClassesValue);
		this.showTarget();
	},

	// apply properties
	applyProp: function(){
		var minValue = Number(this.$.min_input.getValue());
		var maxValue = Number(this.$.max_input.getValue());
		var progressValue = Number(this.$.progress_input.getValue());
		var bgProgressValue = Number(this.$.bgProgress_input.getValue());
		var barClassesValue = this.$.barClasses_input.getValue();
		var bgBarClassesValue = this.$.bgBarClasses_input.getValue();

		this.$.target.setMin(minValue);
		this.$.target.setMax(maxValue);
		this.$.target.setProgress(progressValue);
		this.$.target.setBgProgress(bgProgressValue);
		this.$.target.setBarClasses(barClassesValue);
		this.$.target.setBgBarClasses(bgBarClassesValue);
		enyo.log("[" + this.name + "] apply... ");
		enyo.log("min: " + minValue + ", max: " + maxValue + ", progress: " + progressValue + ", bgProgress: " + bgProgressValue + ", barClasses: " + barClassesValue + ", bgBarClasses: " + bgBarClassesValue);
		this.showTarget();
		this.$.properties.ontap = "";
	},

	startAnimate: function(inSender, inEvent){
		this.$.target.animateProgressTo(parseInt(this.$.animateInput.getValue(), 10));
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
		this.$.min_input.setValue(0);
		this.$.max_input.setValue(100);
		this.$.progress_input.setValue(0);
		this.$.bgProgress_input.setValue(0);
		this.$.barClasses_input.setValue('g-progress-bar-bar');
		this.$.bgBarClasses_input.setValue('g-progress-bg-bar');
	},
});