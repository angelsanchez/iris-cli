var file = require('../util/file');
var irisPath = require('./iris-path');
var request = require('request');
var path = require('path');
var fs = require('fs');

function generateSkeleton () {
		
	var cwd = process.cwd();

	file.copyFolder(__dirname + '/../../tmpl/app_base/', cwd);

	irisPath.generateIrisPath();

	// Download the latest iris version
	var irisJsUrl = 'https://raw.github.com/thegameofcode/iris/master/dist/iris.min.js';
	request(irisJsUrl).pipe(fs.createWriteStream( path.join(cwd, 'js/iris.min.js') ));
}

module.exports.generateSkeleton = generateSkeleton;
