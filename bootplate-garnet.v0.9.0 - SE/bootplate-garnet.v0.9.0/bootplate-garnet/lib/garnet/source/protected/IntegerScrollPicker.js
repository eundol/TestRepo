//* @protected
/**
	_g.IntegerScrollPicker_ is a control that displays a list of integers
	ranging from _min_ to _max_, soliciting a choice from the user.

	To initialize the picker to a particular integer, set the _value_ property to
	that integer:

		{kind: "g.IntegerScrollPicker", noneText: "None Selected",
			content: "Choose a Number", min: 0, max: 25, value: 5}

	The picker may be changed programmatically by modifying the published
	properties _value_,	_min_, or _max_ in the normal manner, by calling _set()_.
*/
enyo.kind({
	name: "g.IntegerScrollPicker",
	//* @public
	published: {
		/**
			It holds current picker value.
		*/
		value: 0,
		/**
			It holds minimum picker value.

			range [Integer]
		*/
		min: 0,
		/**
			It holds maximum picker value.

			range [Integer]
		*/
		max: 9,
		/**
			If a number is specified, picker value is displayed as this many zero-filled digits

			range [Integer] ex: "00" for 2
		*/
		digits: 0,
		/**
			When true, incrementing past max will wrap to min, and vice versa

			range [true, false]
		*/
		wrap: false
	},
	//* @protected
	mixins: [
		"g.ValidationSupport"
	],
	params: "",
	/**
		Item height of scroller in px
	*/
	itemHeight: 82,
	kFrictionDamping: 0.8,
	events: {
		onChange: ""
	},
	//* Cache scroll bounds so we don't have to run _stop()_ every time we need them
	scrollBounds: {},
	components: [
		{kind: "g.Scroller", thumb:false, touch:true, useMouseWheel: false, onScrollStop: "integerScrollerStop", classes: "g-scroll-picker", components: [
			{name:"repeater", kind:"g.FlyweightRepeater", onSetupItem: "setupItem", style: "-webkit-transform: translate3d(0px, 0px, 0px);", components: [
				{name: "item", classes:"g-scroll-picker-item"}
			]}
		]}
	],
	classes: "g-scroll-picker-container",
	create: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.params.touchEvents = true;

			enyo.warn("IntegerScrollPicker will be depreated!!!");
		};
	}),
	rendered: function() {
		this.inherited(arguments);
		this.rangeChanged();
		this.updateScrollBounds();
		this.$.scroller.scrollToNode(this.$.repeater.fetchRowNode(this.value - this.min));
		this.$.scroller.getStrategy().setInterval(100);
	},
	setupItem: function(inSender, inEvent) {
		var index = inEvent.index;
		var content = index + this.min;
		if (this.digits) {
			content = ("00000000000000000000" + content).slice(-this.digits);
		}
		this.$.item.setContent(content);
	},
	setupItemFromIndex: function(inIndex) {
		var index = inIndex;
		var content = index + this.min;
		if (this.digits) {
			content = ("00000000000000000000" + content).slice(-this.digits);
		}
		this.$.item.setContent(content);
	},
	rangeChanged: function() {
		this.value = this.value >= this.min && this.value <= this.max ? this.value : this.min;
		this.$.repeater.setCount(this.max-this.min+1);
		this.$.repeater.render();
		//asynchronously scroll to the current node, this works around a potential scrolling glitch
		enyo.asyncMethod(enyo.bind(this,function() {
			this.$.scroller.scrollToNode(this.$.repeater.fetchRowNode(this.value - this.min));
		}));
	},
	valueChanged: function(inOld) {
		var node = this.$.repeater.fetchRowNode(this.value - this.min);
		if (node) {
			this.$.scroller.scrollTo(node.offsetLeft, node.offsetTop);
		}
	},
	minChanged: function() {
		this.rangeChanged();
	},
	maxChanged: function() {
		this.rangeChanged();
	},
	previous: function(inSender, inEvent) {
		if (this.value > this.min) {
			this.setValue(this.value - 1);
		} else if (this.wrap) {
			this.setValue(this.max);
		} else {
			return;
		}
		this.fireChangeEvent();
		return true;
	},
	next: function(inSender, inEvent) {
		if (this.value < this.max) {
			this.setValue(this.value + 1);
		} else if (this.wrap) {
			this.setValue(this.min);
		} else {
			return;
		}
		this.fireChangeEvent();
		return true;
	},
	fireChangeEvent: function() {
		this.doChange({
			name:this.name,
			value:this.value
		});
	},
	//* Cache scroll bounds in _this.scrollBounds_ so we don't have to call stop() to retrieve them later
	// NOTE - this is a copy of what's in Scroller, we will likely later integrate this functionality (including animateToNode) into enyo.Scroller & remove from here
	updateScrollBounds: function() {
		this.scrollBounds = this.$.scroller.getStrategy()._getScrollBounds();
	},
	//* Scrolls to a given node in the list.
	animateToNode: function(inNode) {
		var sb = this.scrollBounds,
			st = this.$.scroller.getStrategy(),
			b = {
				height: inNode.offsetHeight,
				width: inNode.offsetWidth,
				top: 0,
				left: 0
			},
			n = inNode;

		if (!st.scrollNode) {
			return;
		}

		while (n && n.parentNode && n.id != st.scrollNode.id) {
			b.top += n.offsetTop;
			b.left += n.offsetLeft;
			n = n.parentNode;
		}

		var xDir = b.left - sb.left > 0 ? 1 : b.left - sb.left < 0 ? -1 : 0;
		var yDir = b.top - sb.top > 0 ? 1 : b.top - sb.top < 0 ? -1 : 0;

		var y = (yDir === 0) ? sb.top  : Math.min(sb.maxTop, b.top);
		var x = (xDir === 0) ? sb.left : Math.min(sb.maxLeft, b.left);

		// If x or y changed, scroll to new position
		if (x !== this.$.scroller.getScrollLeft() || y !== this.$.scroller.getScrollTop()) {
			this.$.scroller.scrollTo(x,y);
		}
	},
	//* Silently scrolls to the _inValue_ y-position without animating
	setScrollTop: function(inValue) {
		this.$.scroller.setScrollTop(inValue);
	},
	integerScrollerStop: function(inSender, inEvent) {
		var hackHeight = (this.itemHeight - 1);
		var divisible = inSender.getScrollBounds().top % this.itemHeight;

		if ((Math.abs(divisible) < 1) || (Math.abs(divisible - hackHeight) < 1)) {

			var itemSelected = (Math.abs(divisible - hackHeight) < 1) ? (inSender.getScrollBounds().top + 1) : inSender.getScrollBounds().top;
			var itemIndex = Math.round(itemSelected / this.itemHeight);
			this.setupItemFromIndex(itemIndex);
			this.value = this.$.item.content;
			this.fireChangeEvent();
		} else {
			var roundedInt = this.roundInt(inSender.getScrollBounds().top, this.itemHeight);
			inSender.scrollTo(0, roundedInt);
		}
		return true;
	},
	roundInt: function (value, increment) {

		var remain = value % increment;
		var roundvalue = increment / 2;
		var result;

		// round up
		if (remain >= roundvalue) {
			result = value - remain;
			result += increment;

		// round down
		} else {
			result = value - remain;
		}

		return result;
	}
});
