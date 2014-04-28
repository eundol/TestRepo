/**
	The _g.PanelSet_ kind is designed as a simple applicatoin layout for common use cases.
	In _g.PanelSet_, child controls are treated like an indexed array,
	and one of child controles is considered to be active.
	The active child is set as a next or previous child using _next_ or _previous_ method,
	and the active child is set by index using _setIndex_ method.
*/
enyo.kind({
	//* @public
	name: "g.PanelSet",
	//* @protected
	mixins: [
		"g.ValidationSupport"
	],
	//* @public
	published: {
		/**
		The index of the active panel.

		range [0 or higher integer]
		*/
		index: 0,
		/**
		Controls whether panels "wrap around" when moving past the end.

		range [true, false]
		*/
		wrapEnabled: true
	},
	/**
	The name of the transition effect.

	range ["flip-horizontal", "slide-horizontal"]
	*/
	effect: "flip-horizontal",
	//* @protected
	_panelSetInherited: true, // SHOULD BE ALWAYS A TRULY VALUE. Used for Panel kinds.
	_direction: true, // true: next, false: previous
	_redirect: true, // false: index is changed via next() or previous()
	_panelCount: 0,
	_indexBefore: 0,
	_panelClasses: "g-panelset-panel",
	_animationDuration: "0.2s",
	classes: "g-panelset",
	//* @protected
	initComponents: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this._countPanels();
			if (this.index === undefined || this.index < 0 || this.index >= this._panelCount) {
				this.index = 0;
			}
			if (this.wrapEnabled === undefined) {
				this.wrapEnabled = true;
			}
			if (this.effect === undefined || (this.effect !== "flip-horizontal" && this.effect !== "slide-horizontal")) {
				// this.effect = enyo.constructorForKind("g.PanelSet").prototype.effect;
				this.effect = "flip-horizontal";
			}
			this._readyEffect();
			this._readyPanelInit();
		};
	}),
	createComponents: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this._countPanels();
			this._readyPanelInit();
		};
	}),
	createComponent: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this._countPanels();
			this._readyPanelInit();
		};
	}),
	indexChanged: function(inOld) {
		if (this.index === undefined || this.index < 0 || this.index >= this._panelCount) {
			this.index = inOld;
			return;
		}

		// nothing changed
		if (this.index === inOld) {
			return;
		}

		this._indexBefore = inOld;
		this._countPanels();
		if (this._redirect) {
			this._direction = (this.index > inOld)? true: false;
		}
		this._redirect = true;
		this._applyEffect();
	},
	wrapEnabledChanged: function(inOld) {
		if (this.wrapEnabled === undefined) {
			this.wrapEnabled = inOld;
		}
	},
	//* @public
	/**
	Selects the named component owned by the PanelSet and returns its index.

	params:

	> inPanelName:
	>> The name of panel to be selected.

	>> range [string]

	return:

	> The index of selected panel. If there is no panel has inPanelName, null is returend.
	*/
	selectPanelByName: function(inPanelName) {
		var $i;
		var $p = this._getPanels();

		if (!inPanelName) {
			return;
		}

		for ($i = 0; $i < $p.length; ++$i) {
			if ($p[$i].name === inPanelName) {
				this.setIndex($i);
				return $i;
			}
		}

		return null;
	},
	/**
	Let the next panel be active.
	If _wrapEnabled_ is true and the current active panel is the last panel, the first panel will be active.
	*/
	next: function() {
		var i;

		this._countPanels();
		if (this._panelCount === 0) {
			return;
		}

		i = this._getReadyPanelIndex(this.index, true);
		if (i === -1) {
			return;
		} else {
			this._direction = true;
			this._redirect = false;
			this.setIndex(i);
		}
	},
	/**
	Let the previous panel be active.
	If _wrapEnabled_ is true and the current active panel is the first panel, the last panel will be active.
	*/
	previous: function() {
		var i;

		this._countPanels();
		if (this._panelCount === 0) {
			return;
		}

		i = this._getReadyPanelIndex(this.index, false);
		if (i === -1) {
			return;
		} else {
			this._direction = false;
			this._redirect = false;
			this.setIndex(i);
		}
	},
	//* @protected
	_getPanels: function() {
		var p = this.controlParent || this;
		return p.children;
	},
	_countPanels: function() {
		this._panelCount = this._getPanels().length;
	},
	_readyPanelInit: function() {
		var $i;
		var $p;
		if (this._panelCount > 0) {
			$p = this._getPanels();
			// set an effect for all panels.
			for ($i = 0; $i < $p.length; ++$i) {
				$p[$i].addRemoveClass(this._panelClasses, true);
				$p[$i].addRemoveClass(this.effect, true);
				if ($i !== this.index) {
					this._applyAnimationHiddenAtStart($p[$i]);
				}
			}
		}
	},
	_readyEffect: function() {
		this.animationHiddenAtStart = "panel-hidden forwards " + this._animationDuration;
		this.animationFromNext = this.effect + "-from-next";
		this.animationFromPrevious = this.effect + "-from-previous";
		this.animationToNext = this.effect + "-to-next";
		this.animationToPrevious = this.effect + "-to-previous";
	},
	_applyEffect: function() {
		// set an effect for the old current panel.
		this._applyAnimation(this._indexBefore, false, !this._direction);

		// set an effect for the new current panel.
		this._applyAnimation(this.index, true, this._direction);

		this._sendStartPanelAnimationEvent();
		this.startJob("_sendEndPanelAnimationEvent", this._sendEndPanelAnimationEvent, 1000);
	},
	_applyAnimationHiddenAtStart: function(inChildObj) {
		inChildObj.applyStyle("animation", this.animationHiddenAtStart);
		inChildObj.applyStyle("-webkit-animation", this.animationHiddenAtStart);
	},
	_applyAnimation: function(inIndex, inIsFrom, inIsNext) {
		var $p = this._getPanels();
		var value;
		if (inIsFrom) {
			if (inIsNext) {
				value = this.animationFromNext;
			} else {
				value = this.animationFromPrevious;
			}
		} else {
			if (inIsNext) {
				value = this.animationToNext;
			} else {
				value = this.animationToPrevious;
			}
		}
		value += (" forwards " + this._animationDuration);
		$p[inIndex].applyStyle("animation", value);
		$p[inIndex].applyStyle("-webkit-animation", value);
	},
	_getReadyPanelIndex: function(inIndex, inDirection) {
		var i;
		if (inDirection) {
			if (inIndex < this._panelCount - 1) {
				i = inIndex + 1;
			} else if (this.wrapEnabled) {
				i = 0;
			} else {
				return -1;
			}
		} else {
			if (inIndex > 0) {
				i = inIndex - 1;
			} else if (this.wrapEnabled) {
				i = this._panelCount - 1;
			} else {
				return -1;
			}
		}
		return i;
	},
	_sendStartPanelAnimationEvent: function() {
		var $p = this._getPanels();
		$p[this.index].waterfallDown("onStartPanelAnimation");
	},
	_sendEndPanelAnimationEvent: function() {
		var $p = this._getPanels();
		$p[this.index].waterfallDown("onEndPanelAnimation");
	}
});
