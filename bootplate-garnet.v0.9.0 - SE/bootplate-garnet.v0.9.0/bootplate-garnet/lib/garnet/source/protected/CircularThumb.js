//* @protected
/**
	_g.CircularThumb_ is a helper kind used by
	<a href="#g.ScrollStrategy">g.ScrollStrategy</a> to
	display a circular visual scroll indicator.

	_g.CircularThumb_ is not typically created in application code.
*/
enyo.kind({
	name: "g.CircularThumb",
	//* @protected
	mixins: [ "g.ValidationSupport" ],
	//* The orientation of the scroll indicator bar; "v" for vertical or "h" for horizontal
	axis: "v",
	_arcName: "",
	//* Minimum size of the indicator
	minimumThumbSizeRatio: 0.0625, // 1/16
	overScrollEnabled: false,
	innerComponent: {
		kind: "g.Arc",
		color: g.constant.colorPoint,
		width: g.circularThumbWidth * g.height,
		classes: "g-scroller-circluarthumb"
	},
	create: enyo.inherit(function (sup) {
		return function() {
			sup.apply(this, arguments);
			var v = this.axis == "v";
			this.dimension = v ? "height" : "width";
			this.offset = v ? "top" : "left";
			this.positionMethod = v ? "getScrollTop" : "getScrollLeft";
			this.sizeDimension = v ? "clientHeight" : "clientWidth";
		};
	}),
	rendered: enyo.inherit(function(sup) {
		return function() {
			// the size of the circular thumb is same as the device screen's size.
			var size = (g.width > g.height)? g.height: g.width;
			var current = this.parent.parent;
			var nearestObject;
			var objectBounds;
			// find the nearest object
			while (current.parent) {
				current = current.parent;
				if (g.DataList.prototype.isPrototypeOf(current) || !current.hasNode()) {
					continue;
				}
				if (g.Popup.prototype.isPrototypeOf(current)) {
					nearestObject = current;
					break;
				} else {
					objectBounds = current.getAbsoluteBounds();
					if (objectBounds.height === g.height && objectBounds.width === g.width) {
						nearestObject = current;
						break;
					}
				}
			}
			if (!nearestObject) {
				nearestObject = current;
			}
			// create thumb UI arc
			this._arcName = "arc" + (g.CircularThumb.arcNumber++);
			this.innerComponent.name = this._arcName;
			nearestObject.createComponent(this.innerComponent, {owner: this});
			(this.$[this._arcName]).applyStyle("width", size + "px");
			(this.$[this._arcName]).applyStyle("height", size + "px");
			// render
			(this.$[this._arcName]).render();
			// super call
			sup.apply(this, arguments);
		};
	}),
	//* Syncs the scroll indicator bar to the scroller size and position,
	//* as determined by the passed-in scroll strategy.
	sync: function(inStrategy) {
		this.scrollBounds = inStrategy._getScrollBounds();
		this.clientSize = this.scrollBounds[this.sizeDimension];
		this.screenSize = this.scrollBounds[this.dimension];
		this._minimumThumbSize = this.minimumThumbSizeRatio * this.clientSize;
		this.update(inStrategy);
	},
	update: function(inStrategy) {
		if (this.showing) {
			if (this.clientSize >= this.screenSize) {
				this.hide();
				return;
			}
			// get over scroll info
			var sizeOver = 0, positionOver = 0, offsetOver = 0;
			if (this.overScrollEnabled && inStrategy.isOverscrolling()) {
				offsetOver = inStrategy.getOverScrollBounds()["over" + this.offset];
				sizeOver = Math.abs(offsetOver);
				positionOver = Math.max(offsetOver, 0);
			}
			// calc size
			var sizeThumb = Math.floor((this.clientSize * this.clientSize / this.screenSize) - sizeOver);
			sizeThumb = Math.max(this._minimumThumbSize, sizeThumb);
			sizeThumb = sizeThumb / this.clientSize * 2 * Math.PI;
			// calc position
			var screenOffset = inStrategy[this.positionMethod]() - offsetOver;
			var positionThumb = Math.floor((this.clientSize * screenOffset / this.screenSize) + positionOver);
			positionThumb = Math.max(0, Math.min(this.clientSize - this._minimumThumbSize, positionThumb));
			positionThumb = positionThumb / this.clientSize * 2 * Math.PI;
			// apply thumb styling
			if ((sizeThumb < this.clientSize) && this.hasNode()) {
				if (this._pos !== positionThumb) {
					this._pos = positionThumb;
				}
				if (this._size !== sizeThumb) {
					this._size = sizeThumb;
				}
				(this.$[this._arcName]).draw(positionThumb, positionThumb + sizeThumb);
			} else {
				this.hide();
			}
		}
	},
	// implement set because showing is not changed while
	// we delayHide but we want to cancel the hide.
	setShowing: function(inShowing) {
		if (inShowing && inShowing != this.showing) {
			if (this.clientSize >= this.screenSize) {
				return;
			}
		}
		if (this.hasNode()) {
			this.cancelDelayHide();
		}
		if (inShowing != this.showing) {
			var last = this.showing;
			this.showing = inShowing;
			this.showingChanged(last);
		}
	},
	delayHide: function(inDelay) {
		if (this.showing) {
			enyo.job(this.id + "hide", this.bindSafely("hide"), inDelay || 0);
		}
	},
	cancelDelayHide: function() {
		enyo.job.stop(this.id + "hide");
	},
	show: function() {
		(this.$[this._arcName]).show();
	},
	hide: function() {
		(this.$[this._arcName]).hide();
	},
	statics: {
		arcNumber: 0
	}
});
