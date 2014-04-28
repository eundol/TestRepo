//* @public
/**
	_g.WheelSectionListControllerHandlers_ handles defined events.
	It can be used as a wheel handler for IndexList in handlerMappings.
*/
g.WheelSectionListControllerHandlers = {
	ondrag: "eventHandler",
	onScrollStop: "eventHandler"
};

//* @protected
enyo.kind({
	name: "g.WheelSectionListControllerDelegate",
	//* @protected
	eventHandler: function(inSender, inEvent) {
		var wheel = this.wheel;
		if (wheel) {
			if (inEvent.type === "drag") {
				wheel.$.wheelBg.setOpen(false);
				this.stopJob("showSection");
				wheel._sectionListView.hide();
				wheel._hideIndexPopup();
			} else if (inEvent.type === "onScrollStop") {
				wheel.$.wheelBg.setOpen(true);
				this.startJob("showSection", this._showSection, 1000);
			}
		}
		return false;
	},
	_showSection: function() {
		this.wheel._sectionListView.show();
	}
});

//* @public
/**
	_g.WheelSectionListController_ implements the control for a list which looks like a wheel.
*/
enyo.kind({
	name: "g.WheelSectionListController",
	//* @protected
	kind: "g.WheelGesture",
	//* @public
	/**
		onSectionChanged is firing when section has been changed.
	*/
	events: {
		onSectionChanged: ""
	},
	/**
		The array of visible index.
		Visible index should be one character.
		sectionList has to be an ordered set which has maximum length of 16.
		sectionList must be a subset of sectionLabelList.
	*/
	sectionList: ["#", "A", "C", "E", "F", "G", "I", "K", "M", "O", "Q", "S", "U", "W", "Z", "?"],
	/**
		The array of actual index
		sectionLabelList has to be an ordered set.
	*/
	sectionLabelList: ["#", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
	"N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "?"],
	//* @protected
	knobLengthRadian: 0.5,
	knobColor: g.constant.colorPoint,
	knobAlwaysEnabled: false,
	acceleratedWheelControl: false,
	_activated: true,
	_unitRadian: 0,
	_positionCorrection: 0.0175, // almost 1 degree in radians
	//section
	_sectionListView: undefined,
	_sectionLabelView: undefined,
	_startTheta: 0,
	_deltaTheta: 0,
	_currentSectionIndex: 0,
	_sectionRadianTable: [],
	classes: "g-wheel-section-list-controller",
	create: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this._createBackground();
			this._createKnob();
			this.pagesPerRoundChanged();
			this.sectionListChanged();
			this.sectionLabelListChanged();
			this._createIndexPopup();
			this.knobColorChanged();
			this._drawKnob(0);

			this.createComponent({
				name: "eventDelegate",
				kind: "g.WheelSectionListControllerDelegate",
				wheel: this
			});

		};
	}),
	pagesPerRoundChanged: function() {
		this._unitRadian = this._constMaxRadians / this.pagesPerRound;
	},
	sectionListChanged: function() {
		if (this.sectionList === undefined) {
			this.sectionList = ["#", "A", "C", "E", "F", "G", "I", "K", "M", "O", "Q", "S", "U", "W", "Z", "?"];
		}
		//clear
		if (this._sectionListView !== undefined) {
			this._sectionListView.destroy();
			this._sectionListView = undefined;
		}
		//create parent node
		this._sectionListView = this.createComponent({name: "sections"});
		//create sections, at (width/2 - padding + cos(T), height/2 - padding + sin(T))
		var theta = (Math.PI/4);
		this._startTheta = theta - (Math.PI/2);
		this._deltaTheta = (5*theta)/this.sectionList.length;
		var x0 = g.width/2 - 12;
		var y0 = g.height/2 - 12;
		for (var i=0; i<this.sectionList.length; i++) {
			var xx = x0 + (x0)*Math.cos((this._startTheta+0.15) + this._deltaTheta*i);
			var yy = y0 + (y0)*Math.sin((this._startTheta+0.15) + this._deltaTheta*i);
			this._sectionListView.createComponent({
				name: "section" + i,
				content: this.sectionList[i],
				classes: "g-section-label",
				style:"left: " + xx + "px; top: " + yy + "px;"
			});
		}
	},
	sectionLabelListChanged: function() {
		if (this.sectionLabelList === undefined) {
			this.sectionLabelList = [
				"#", "A", "B", "C", "D", "E", "F", "G",
				"H", "I", "J", "K", "L", "M", "N", "O", "P",
				"Q", "R", "S", "T", "U", "V",
				"W", "X", "Y", "Z", "?"
			];
		}
		//clear
		this._sectionRadianTable = [];
		var sIndex = 0;
		var rIndex = 0;
		var btwCount = 0;
		var offset = 0.1;
		for (var i=0; i<this.sectionLabelList.length; i++) {
			if (this.sectionLabelList[i] == this.sectionList[sIndex]) {
				//see the count and fill RadianTable
				//sIndex * this._deltaTheta + j*(this._deltaTheta/btwCount+1)
				var adding = (this._deltaTheta/(btwCount+1));
				var value = -this._deltaTheta;
				if (sIndex) {
					value = (sIndex-1)*this._deltaTheta;
				}
				for (var j=1; j<btwCount+2; j++) {
					value += adding;
					this._sectionRadianTable[rIndex++] = value + offset;
				}
				btwCount = 0;
				sIndex++;
			} else {
				btwCount++;
			}
		}
	},
	knobColorChanged: function() {
		this.$.knob.setColor(this.knobColor);
	},
	setBasePage: function(inBasePage) {
		this.basePage = inBasePage || 0;
	},
	setPagePosition: function(inPagePosition) {
		this._radianAccumulated = inPagePosition + this._positionCorrection;
	},
	activate: function() {
		if (!this._activated) {
			this._activated = true;
			this.show();
		}
	},
	deactivate: function() {
		if (this._activated) {
			this.hide();
			this._activated = false;
		}
	},
	showKnob: function() {
		this.$.knob.show();
	},
	hideKnob: function() {
		this.$.knob.hide();
	},
	isInbounds: enyo.inherit(function(sup) {
		return function(inEvent) {
			if (this._activated) {
				return sup.apply(this, arguments);
			} else {
				return false;
			}
		};
	}),
	eventHandler: function(inSender, inEvent) {
		return this.$.eventDelegate.eventHandler(inSender, inEvent);
	},
	_eventObservingStart: function(inRadian) {
		this._radian = inRadian;
		this._currentSectionIndex = -1;
		//section
		this._bubbleSectionChanged(inRadian);
		//this._showIndexPopup();
		return true;
	},
	_eventObservingStep: function(inRadian) {
		//section
		this._bubbleSectionChanged(inRadian);
		return true;
	},
	_eventObservingStop: function() {
		return true;
	},
	//* @private
	_createBackground: function() {
		this.createComponent({name: "wheelBg", kind: "g.WheelSectionBG", expanded: false});
	},
	_createKnob: function() {
		this.createComponent({
			name: "knob",
			kind: "g.Arc",
			color: "",
			width: g.wheelWidth * 1.4
		});
		if (!this.knobAlwaysEnabled) {
			this.$.knob.hide();
		}
	},
	_drawKnob: function(inRadian) {
		this.$.knob.draw(inRadian - this.knobLengthRadian / 2, inRadian + this.knobLengthRadian / 2);
	},
	_calculateAcceleration: function(inRadian) {
		if (inRadian < 0.5) {
			return this._unitRadian;
		} else if (inRadian < 2) {
			return this._unitRadian / 2;
		} else {
			return this._unitRadian / 5;
		}
	},
	//radian to section index
	_radianToSectionIndex: function(inRadian) {
		for (var i=0; i<this._sectionRadianTable.length-1; i++) {
			if ((inRadian+this._startTheta) >= this._sectionRadianTable[i] && (inRadian+this._startTheta) < this._sectionRadianTable[i+1]) {
				return i;
			}
		}
		if ((inRadian+this._startTheta) >= this._sectionRadianTable[i] && (inRadian+this._startTheta) < this._sectionRadianTable[i]+0.1) {
			return i;
		}
		return -1;
	},
	_bubbleSectionChanged: function(inRadian) {
		var newIndex = this._radianToSectionIndex(inRadian);
		if (newIndex >= 0 && newIndex < this.sectionLabelList.length && newIndex !== this._currentSectionIndex) {
			this._currentSectionIndex = newIndex;
			if (this.sectionLabelList[newIndex] != " ") {
				this._sectionLabelView.$.indexPopupC.applyStyle("-webkit-transform", "translate3d(0,"+ newIndex*(-320) +"px,0)");
				this._showIndexPopup();
			}
			var sectionParams = {
				sectionIndex: this._currentSectionIndex
			};
			this.doSectionChanged(sectionParams);
		}
		else if (newIndex < 0 || newIndex >= this.sectionLabelList.length) {
			this._currentSectionIndex = -1;
			this._hideIndexPopup();
		}
	},
	_createIndexPopup: function() {
		this._sectionLabelView = this.createComponent({name:"indexPopup", classes: "g-index-popup"});
		this._sectionLabelView.createComponent({name:"indexPopupBack", classes: "g-index-popup-bg"});
		this._sectionLabelView.createComponent({name:"indexPopupC", classes: "g-index-popup-content"});
		for (var i=0; i<this.sectionLabelList.length; i++) {
			this._sectionLabelView.$.indexPopupC.createComponent({tag: "span", content: this.sectionLabelList[i], classes: "g-index-popup-content-comp"});
		}
		this._sectionLabelView.hide();
	},
	_showIndexPopup: function() {
		this.$.wheelBg.setExpanded(true);
		this.$.wheelBg.setShowing(true);
		this._sectionLabelView.show();
		this._sectionListView.show();
		this.stopJob("hidePopup");
		this.startJob("hidePopup", this._hideIndexPopup, 1000);
	},
	_hideIndexPopup: function() {
		this._sectionLabelView.hide();
		this.$.wheelBg.setExpanded(false);
	}
});
