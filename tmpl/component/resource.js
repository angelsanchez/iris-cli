iris.resource(function (self) {

	self.settings({
		type : 'json',
		path: '{{component}}/'
	});

	self.load = function (id) {
		return self.get(id);
	};

}, iris.path.resource.{{component}}.js);
