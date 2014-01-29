var file = require('../util/file');
var irisPath = require('./iris-path');

function createUI (name) {
	file.createComponent('ui', name, irisPath.generateIrisPath);
}

module.exports.createUI = createUI;
