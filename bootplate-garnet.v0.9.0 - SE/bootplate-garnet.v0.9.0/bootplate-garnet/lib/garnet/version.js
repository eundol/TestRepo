/*
	Garnet uses semantic versioning. Official releases have version
	numbers	of the form "X.y.z". Prereleases are indicated by a suffix
	of the form "-pre.N" where N is incremented for each prerelease.
	Between releases, version numbers include an additional "-dev"
	suffix.
*/

if (enyo && enyo.version) {
	enyo.version.garnet = "0.9.0";
}

var garnet = garnet || {};
garnet[enyo.version.garnet] = g || {};