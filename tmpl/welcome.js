iris.screen(function (self) {

	// var resource = iris.resource(iris.path.resource);

	self.create = function() {
		
		self.tmpl(iris.path.screen.welcome.html);

		self.screens("screens", [
		// 	["home", iris.path.home.js]
		]);
	};

	// self.awake = function () {
		
	// };

},iris.path.screen.welcome.js);
