var file = require('../util/file');
var irisPath = require('./iris-path');

function createResource (name) {
	file.createComponent('resource', name, irisPath.generateIrisPath);
}

module.exports.createResource = createResource;
