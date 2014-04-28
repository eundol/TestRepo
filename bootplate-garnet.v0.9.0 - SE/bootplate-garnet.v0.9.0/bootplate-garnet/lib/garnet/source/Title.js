//* @public
/**
	_g.Title is a title of current view of a application.
*/

g.TitleHandlers = {
	onScrollStart: "eventHandler",
	ondrag: "eventHandler",
	onWheelDataListMove: "eventHandler",
	onSectionChanged: "eventHandler"
};

//* @protected
enyo.kind({
	name: "g.TitleEventDelegate",
	title: undefined,
	_accmulatedDdy: 0,
	eventHandler: function(inSender, inEvent) {
		if (inEvent.type === "onScrollStart") {
			if (inEvent.originator.vertical && inEvent.originator.uy - inEvent.originator.py > 0) {
				// scroll down
				this.title.setOpen(true);
			} else if (inEvent.originator.vertical && inEvent.originator.uy - inEvent.originator.py < 0) {
				// scroll up
				this.title.setOpen(false);
			}
		} else if (inEvent.type == "onWheelDataListMove" || inEvent.type == "onSectionChanged" ) {
			this.title.setOpen(false);
		} else if (inEvent.type == "drag") {
			var ddy = inEvent.ddy;

			if (!ddy * this._accmulatedDdy) {
				this._accmulatedDdy = 0;
			} else if (this._accmulatedDdy !== 0) {
				if (ddy > 0) {
					this.title.setOpen(true);
				} else {
					this.title.setOpen(false);
				}
				this._accmulatedDdy = 0;
			}
			this._accmulatedDdy = this._accmulatedDdy + ddy;
		}

	}
});

//* @public
enyo.kind({
	name: "g.Title",
	//* @protected
	kind:"g.Drawer",
	classes: "g-title",
	create: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);

			this.createComponent({name: "eventDelegate", kind: "g.TitleEventDelegate", title: this});
		};
	}),
	eventHandler: function(inSender, inEvent) {
		return this.$.eventDelegate.eventHandler(inSender, inEvent);
	}
});
