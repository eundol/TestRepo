(function (enyo, g) {
	//*@protected
	g.publishedProperties = [];

	/**
		These properties ensures that, when created, they will validate published property types.
	*/
	g.ValidationSupport = {
		name: "g.ValidationSupport",
		create: enyo.inherit(function (sup) {
			return function (props) {
				if (g.debug) {
					this.validate();
				}
				sup.apply(this, arguments);
			};
		}),
		validate: function() {
			var pp = g.publishedProperties,
				kindName = this.kindName, // "kind" should be a string.
				published,
				property;

			while(
				// To validate until kindName is equal to "enyo.Control"
				kindName != "enyo.Control" &&
				// To get published properties
				(pp[kindName] ? published = pp[kindName] : published = pp[kindName] = enyo.constructorForKind(kindName).prototype.published)
			) {
				// To validate a published property types
				for (property in published) {
					if ((typeof this[property]) !== (typeof published[property])) {
						enyo.warn("[Garnet] Set Published property '" + property + "' value to a wrong type");
						enyo.warn("[Garnet] '" + property + "' is defined in '" + kindName + "' kind");
						enyo.warn("[Garnet] The kind of it is " + this.kind);
						enyo.warn("[Garnet] The owner name of the component is " + this.owner.name);
					}
				}

				// To get an inherited kind name
				kindName = enyo.constructorForKind(kindName).prototype.base.prototype.kindName;

				// To get published properties
				published = pp[kindName] ? pp[kindName] : pp[kindName] = enyo.constructorForKind(kindName).prototype.published;
			// } while(kindName != "enyo.Control" && published != undefined);
			}
		}
	};
})(enyo, g);
