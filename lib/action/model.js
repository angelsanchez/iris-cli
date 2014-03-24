var file = require('../util/file');
var irisPath = require('./iris-path');

function createModel (name) {
	file.createComponent('model', name, irisPath.generateIrisPath);
}

module.exports.createModel = createModel;
