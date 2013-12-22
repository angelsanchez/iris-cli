var file = require('../util/file');
var irisPath = require('./iris-path');

function createResource () {
	file.createComponent('resource', irisPath.generateIrisPath);
}

module.exports.createResource = createResource;
