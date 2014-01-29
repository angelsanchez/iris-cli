var file = require('../util/file');
var irisPath = require('./iris-path');

function createScreen (name) {
	file.createComponent('screen', name, irisPath.generateIrisPath);
}

module.exports.createScreen = createScreen;
