//* @protected
/**
	Event capture feature for wheel controllers:
	capture events to a specific wheel control via
		enyo.dispatcher.registerWheelController(inController)
	release events via
		enyo.dispatcher.unregisterWheelController(inController)
*/
enyo.dispatcher.features.push(function(e) {
	var controller;
	var target;
	var handler;
	var handlerName;
	var object;
	var i;
	if (this.wheelControllerSupport && !e.preventDispatch) {
		target = e.dispatchTarget;
		if (e.type === "down") {
			object = target;
			while (object && !object.ignoreWheelControl) {
				object = object.parent;
			}
			if (object && object.ignoreWheelControl) {
				return;
			}
		}
		handlerName = this.wheelControllerEvents[(e.customEvent? "": "on") + e.type];
		if (target && handlerName) {
			if (e.type === "drag" || e.type === "dragfinish") {
				controller = this.wheelDragEventHandler;
			} else {
				for (i = 0; i < this.wheelControllers.length; ++i) {
					if (target.isDescendantOf && target.isDescendantOf(this.wheelControllers[i].parent)) {
						if (!controller || this.wheelControllers[i].parent.isDescendantOf(controller.parent)) {
							controller = this.wheelControllers[i];
						}
					}
				}
			}
		}
		if (controller) {
			handler = handlerName && controller[handlerName];
			if (handler) {
				e.preventDispatch = handler.apply(controller, [controller, e]);
				if (e.type === "dragstart") {
					if (e.preventDispatch) {
						this.wheelDragEventHandler = controller;
					} else {
						this.wheelDragEventHandler = undefined;
					}
				}
			}
		}
	}
});

//
//        NOTE: This object is a plug-in; these methods should
//        be called on _enyo.dispatcher_, and not on the plug-in itself.
//
enyo.mixin(enyo.dispatcher, {
	wheelControllerSupport: false,
	wheelDragEventHandler: undefined,
	wheelControllerEvents: {
		ondown: "_start",
		onhold: "_step",
		ondragstart: "_step",
		ondrag: "_step",
		ondragfinish: "_stop",
		onup: "_stop",
		ontap: "_stop"
	},
	wheelControllers: [],
	registerWheelController: function(inController) {
		var i;
		for (i = 0; i < this.wheelControllers.length; ++i) {
			if (this.wheelControllers[i] === inController) {
				return;
			}
		}
		this.wheelControllers.push(inController);
		this.wheelControllerSupport = true;
	},
	unregisterWheelController: function(inController) {
		var i;
		for (i = 0; i < this.wheelControllers.length; ++i) {
			if (this.wheelControllers[i] === inController) {
				this.wheelControllers.splice(i, 1);
				break;
			}
		}
		if (this.wheelControllers.length <= 0) {
			this.wheelControllerSupport = false;
		}
	}
});

//* @protected
/**
	The _g.WheelGesture_ kind is the base controller for the touch wheel control kinds.
*/
enyo.kind({
	//* @public
	name: "g.WheelGesture",
	//* @protected
	mixins: [
		"g.ValidationSupport"
	],
	//* @public
	published: {
		/**
			The outter-bound radius to be activated.

			range [1 ~ the device screen width / 2 in pixel]
		*/
		radius: g.width / 2,
		/**
			The width of a ring area that an event is handled in.

			range [1 or higher number in pixels]
		*/
		widthSensing: g.wheelGestureWidth,
		/**
			The width of a ring area that an dragging event works in.
			If a dragging gesture moves out this ring area forwarding the center,
			a dragging gesture is finished and will not work until a new drag-starting.

			range [1 or higher number in pixels]
		*/
		widthDragging: g.width * g.wheelGestureDraggingWidth
	},
	//* @protected
	_centerX: 0,
	_centerY: 0,
	_minRadiusSquare: 0,
	_maxRadiusSquare: 0,
	_cancelRadiusSquare: 0,
	_constMaxRadians: Math.PI * 2,
	_isObserving: false,
	_isCanceled: false,
	//* @protected
	rendered: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this._initVariables&&this._initVariables();
			this._captureEvents();
		};
	}),
	destroy: enyo.inherit(function(sup) {
		return function() {
			this._releaseEvents();
			sup.apply(this, arguments);
		};
	}),
	//* @public
	isInbounds: function(inEvent) {
		var dX = inEvent.clientX - this._centerX;
		var dY = inEvent.clientY - this._centerY;
		var radiusSquare = dX * dX + dY * dY;
		return ((radiusSquare >= this._minRadiusSquare) && (radiusSquare <= this._maxRadiusSquare));
	},
	isInboundsDragging: function(inEvent) {
		var dX = inEvent.clientX - this._centerX;
		var dY = inEvent.clientY - this._centerY;
		var radiusSquare = dX * dX + dY * dY;
		return (radiusSquare >= this._cancelRadiusSquare);
	},
	//* @protected
	_start: function(inSender, inEvent) {
		// work-around code for height information of node.
		this._initVariables&&this._initVariables();
		if (this.isInbounds(inEvent)) {
			this._isObserving = true;
			this._isCanceled = false;
			return this._eventObservingStart(this._computeRadian(inEvent), inEvent.type);
		} else {
			return false;
		}
	},
	_step: function(inSender, inEvent) {
		if (this._isObserving) {
			if (this.isInboundsDragging(inEvent)) {
				return this._eventObservingStep(this._computeRadian(inEvent), inEvent.type);
			} else {
				this._isCanceled = true;
				return this._stop(inSender, inEvent);
			}
		} else if (this._isCanceled) {
			return true;
		} else {
			return false;
		}
	},
	_stop: function(inSender, inEvent) {
		// work-around code for height information of node.
		this._initVariables&&this._initVariables();
		if (this._isObserving) {
			var ret = this._eventObservingStop(this._computeRadian(inEvent), inEvent.type);
			this._isObserving = false;
			if (ret && inEvent.preventTap) {
				inEvent.preventTap();
			}
			return ret;
		} else if (this._isCanceled) {
			this._isCanceled = false;
			return true;
		} else {
			return false;
		}
	},
	_eventObservingStart: function(inRadian) {
		return true;
	},
	_eventObservingStep: function(inRadian) {
		return true;
	},
	_eventObservingStop: function(inRadian) {
		return true;
	},
	_initVariables: function() {
		var outBounds = this.getAbsoluteBounds();
		var innerRadius = this.radius - this.widthSensing;
		var cancelRadius = this.radius - this.widthDragging;
		if (outBounds.left === 0 && outBounds.top === 0 && outBounds.width === 0 && outBounds.height === 0) {
			return;
		}
		this._centerX = outBounds.left + outBounds.width / 2;
		this._centerY = outBounds.top + outBounds.height / 2;
		this._minRadiusSquare = innerRadius * innerRadius;
		this._maxRadiusSquare = this.radius * this.radius;
		this._cancelRadiusSquare = cancelRadius * cancelRadius;
		this._initVariables = undefined;
	},
	_computeRadian: function(inEvent) {
		var dx = inEvent.clientX - this._centerX;
		var dy = inEvent.clientY - this._centerY;
		var radian = Math.acos(-dy / Math.sqrt(dx * dx + dy * dy));
		if (dx < 0) {
			radian = this._constMaxRadians - radian;
		}
		return radian;
	},
	_captureEvents: function() {
		enyo.dispatcher.registerWheelController(this);
	},
	_releaseEvents: function() {
		enyo.dispatcher.unregisterWheelController(this);
	}
});
