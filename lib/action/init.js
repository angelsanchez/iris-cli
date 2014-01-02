var file = require('../util/file');
var irisPath = require('./iris-path');

function generateSkeleton () {
		
	file.copyFolder(__dirname + '/../../tmpl/app_base/', process.cwd());

	irisPath.generateIrisPath();
}

module.exports.generateSkeleton = generateSkeleton;
