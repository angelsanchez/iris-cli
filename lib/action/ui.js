var file = require('../util/file');
var irisPath = require('./iris-path');

function createUI () {
	file.createComponent('ui', irisPath.generateIrisPath);
}

module.exports.createUI = createUI;
