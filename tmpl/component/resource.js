iris.resource(function (self) {
    "use strict";

	self.settings({
		type : 'json',
		path: '{{component}}/'
	});

	// self.create = function() {
	// };

    self.load = function (id) {
        return self.get(id);
    };

    self.create = function (params) {
        return self.post("", params);
    };

    self.update = function (id, params) {
        return self.put(id, params);
    };

    self.remove = function (id) {
        return self.del(id);
    };

}, iris.path.{{component}}.js);