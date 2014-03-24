iris.ui(function (self) {
	"use strict";

	// self.settings({
	//	name : 'value'
	// });

	// var resource = iris.resource(iris.path.resource);
	// var model = iris.model(iris.path.model);

	self.create = function() {
		self.tmpl(iris.path.ui.{{component}}.html);

		// self.listen(model, 'event', fn);
	};

	// self.awake = function () {
		// self.resumeListeners();
	// };

	// self.sleep = function () {
		// self.pauseListeners();
	// };

	// self.destroy = function () {
		// self.removeListeners();
	// };

}, iris.path.ui.{{component}}.js);
