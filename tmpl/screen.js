iris.screen(function (self) {

	// var resource = iris.resource(iris.path.resource);

	self.create = function() {
		
		self.tmpl(iris.path.screen.{{component}}.html);
	};

	// self.awake = function () {
		
	// };

	// self.canSleep = function () {
	// 	return true;
	// };

	// self.sleep = function () {
		
	// };

	// self.destroy = function () {
		
	// };

},iris.path.screen.{{component}}.js);
