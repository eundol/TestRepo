/** @protected
	_g.HandlerMappingsSupport is an event dispatcher.

**/
g.HandlerMappingsSupport = {
	name: "g.HandlerMappingsSupport",
	_handlerMappings: {},
	initComponents: enyo.inherit(function (sup) {
		return function() {
			var map = this.handlerMappings;
			this._handlerMappings = {};


			// predefined handlers for components -> this._handlerMappings
			for (var obj in map) {
				var handlers = map[obj];
				obj = (obj.substring(0, 3) === ".$.") ? obj.slice(3) : obj;

				// instance string name -> instance
				if (typeof handlers == "string") {
					var ps = handlers.split(".");
					handlers = window;

					for (var i = 0, r$; (r$ = ps[i]); ++i) {
						handlers = handlers[r$];
					}
				}

				// event handlers in this._handlerMappings -> this._handlerMappings
				for (var evt in handlers) {
					var handler = (handlers)[evt],
						hme = this._handlerMappings[evt];

					if (hme === undefined) {
						hme = this._handlerMappings[evt] = {self: []};
					}
					if ((hme)[obj] === undefined) {
						(hme)[obj] = [];
					}

					if (!~((hme)[obj]).indexOf(handler)) {
						(hme)[obj].push(handler);

						if (!this.hasOwnProperty("handlers")) {
							this._initMultipleEventHandlers(evt);
						}

						this.handlers[evt] = "eventDispatcher";
					}
				}
			}

			sup.apply(this, arguments);
		};
	}),
	// this.handlers -> this._handlerMappings
	_initMultipleEventHandlers: function(evt) {
		var hme = this._handlerMappings[evt];

		this.handlers = enyo.clone(this.handlers);

		if (!~((hme).self).indexOf(this.handlers[evt])) {
			((hme).self).push(this.handlers[evt]);
			if (!this.hasOwnProperty("handlers")) {
				this.handlers = enyo.clone(this.handlers);
			}
			this.handlers[evt] = "eventDispatcher";
		}
	},
	eventDispatcher: function(inSender, inEvent) {
		if (inEvent && inEvent.type && inEvent.originator != this) {
			var evt = (inEvent.type).substring(0,2) == "on" ? inEvent.type : "on" + inEvent.type,
				eventMap = (this._handlerMappings[evt]);

			// please write a code here to prevent from calling the default event handlers
			this.preEventHandler && this.preEventHandler(inSender, inEvent);

			for (var obj in eventMap) {
				var eventHandlers = eventMap[obj],
					instance = (obj == "self") ? this : this.$[obj];

				if (instance && instance !== inSender && eventHandlers) {
					for (var i = 0; i < eventHandlers.length; i++) {
						if (eventHandlers[i] && instance[(eventHandlers[i])] !== undefined) {
							// call an event handler
							(instance[(eventHandlers[i])])(inSender, inEvent);
						}
					}
				}
			}

			// please write a code here after calling all devault event handlers
			this.postEventHandler && this.postEventHandler(inSender, inEvent);
		}
	}
};
