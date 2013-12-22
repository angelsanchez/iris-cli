var file = require('../util/file');
var irisPath = require('./iris-path');

function createScreen () {
	file.createComponent('screen', irisPath.generateIrisPath);
}

module.exports.createScreen = createScreen;
