iris.resource(function (self) {
	"use strict";

	self.settings({
		type : 'json',
		path: '{{component}}/'
	});

	// called automatically
	// self.create = function() {
	// };

	self.new = function (params) {
		return self.post("", params);
	};

	self.load = function (id) {
		return self.get(id);
	};

	self.update = function (id, params) {
		return self.put(id, params);
	};

	self.remove = function (id) {
		return self.del(id);
	};

}, iris.path.resource.{{component}}.js);