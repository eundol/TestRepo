//* @public
g.WheelDataListControllerHandlers = {
};

//* @public
/**
	_g.WheelDataListController_ implements the control for a list which looks like a wheel.
*/
enyo.kind({
	name: "g.WheelDataListController",
	//* @protected
	kind: "g.WheelGesture",
	/**
		The number of items corresponding to one round (a circluar rotation).

		range [1 or greater integer]
	*/
	itemsPerRound: 150,
	events: {
		onWheelDataListMove: ""
	},
	widthVisible: g.wheelWidth * 0.7,
	wheelColor: "#474747",
	acceleratedWheelControl: false,
	expandDelayTime: 1000,
	_activated: true,
	_unitRadian: 0,
	_lastRadian: 0,
	_constStatusHold: 0,
	_constStatusActive: 1,
	_constStatusCanceled: 2,
	_status: 0, // this._constStatusHold
	classes: "g-wheel-list-controller",
	create: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this._createBackground();
			this.itemsPerRoundChanged();
			this.widthVisibleChanged();
			this.wheelColorChanged();
		};
	}),
	itemsPerRoundChanged: function() {
		this._unitRadian = this._constMaxRadians / this.itemsPerRound;
	},
	widthVisibleChanged: function() {
		this.$.background.applyStyle("border-width", this.widthVisible + "px");
	},
	wheelColorChanged: function() {
		this.$.background.applyStyle("border-color", this.wheelColor);
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
		return false;
	},
	_eventObservingStart: function(inRadian, inEventType) {
		this._status = this._constStatusHold;
		enyo.job(this.id + "_expand", this.bindSafely("_expand"), this.expandDelayTime);
		this._radian = inRadian;
		this._radianAccumulated = 0;
		return true;
	},
	_eventObservingStep: function(inRadian, inEventType) {
		if (this._status === this._constStatusHold && inEventType === "dragstart") {
			enyo.job.stop(this.id + "_expand");
			this._status = this._constStatusCanceled;
			this._eventObservingStop(inRadian, inEventType);
		} else if (this._status === this._constStatusActive) {
			this._updateList(inRadian);
		}
		return true;
	},
	_eventObservingStop: function(inRadian, inEventType) {
		if (this._status === this._constStatusActive) {
			this._updateList(inRadian);
		} else if (this._status === this._constStatusHold) {
			enyo.job.stop(this.id + "_expand");
		}
		if (this._status !== this._constStatusHold) {
			this._radianAccumulated = 0;
			this._shrink();
			this._status = this._constStatusHold;
		}
		return true;
	},
	//* @protected
	_createBackground: function() {
		this.createComponent({name: "background", classes: "g-circle"});
	},
	_updateList: function(inRadian) {
		var radianDelta = inRadian - this._radian;
		var deltaIndex;
		if (radianDelta > Math.PI) {
			radianDelta -= 2 * Math.PI;
		} else if (radianDelta < -Math.PI) {
			radianDelta += 2 * Math.PI;
		}
		this._radianAccumulated += radianDelta;
		this._radian = inRadian;
		deltaIndex = ~~((this._radianAccumulated / this._unitRadian) * this._accelerationFactor(radianDelta));
		if (deltaIndex !== 0) {
			this.doWheelDataListMove({
				deltaIndex: deltaIndex
			});
			this._radianAccumulated -= (deltaIndex / this._accelerationFactor(radianDelta) * this._unitRadian);
		}
	},
	_accelerationFactor: function(inRadian) {
		return (inRadian > 0.1)? 4: 2;
	},
	_expand: function() {
		this._status = this._constStatusActive;
		this.set("widthVisible", g.wheelExpandedWidth * 0.7);
	},
	_shrink: function() {
		this.set("widthVisible", g.wheelWidth * 0.7);
	}
});
