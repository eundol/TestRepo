(function() {
	window.g = window.g || {};
	if (window.ilib) {
		g.$L = (function() {
			var lfunc = function (string) {
				if (!g.$L.rb) {
					return string;
				}
				var str = g.$L.rb.getString(string);
				return str.toString();
			};
			lfunc.rb = new ilib.ResBundle({
				loadParams: {
					root: "$lib/garnet/resources"
				}
			});
			return lfunc;
		})();
	} else {
		g.$L = $L || function(s) { return s; };
	}
})();
