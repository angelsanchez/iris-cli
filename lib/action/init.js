var fs = require('fs');
var file = require('../util/file');
var irisPath = require('./iris-path');

function generateSkeleton () {
	var path = 'iris/';
  	mkdir('js');
  	mkdir('css');
  	mkdir(path);
  	mkdir(path + 'ui');
  	mkdir(path + 'screen');
  	mkdir(path + 'resource');
  	file.copy(__dirname + '/../../tmpl/index.html', 'index.html');
  	file.copy(__dirname + '/../../tmpl/init.js', 'js/init.js');
  	file.copy(__dirname + '/../../tmpl/iris-0.5.5.min.js', 'js/iris-0.5.5.min.js');

  	file.copy(__dirname + '/../../tmpl/welcome.js', path + 'screen/welcome.js');
  	file.copy(__dirname + '/../../tmpl/welcome.html', path + 'screen/welcome.html');

  	file.copy(__dirname + '/../../tmpl/base.css', 'css/base.css');

  	irisPath.generateIrisPath();
}

function mkdir (path) {
	console.log('Creating "' + path + '"...');
	fs.mkdirSync(path);
}

module.exports.generateSkeleton = generateSkeleton;
