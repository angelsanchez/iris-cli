
var fs = require('fs');

var irisPath;

function generateIrisPath () {
	console.log('Generating iris.path...')

	irisPath = {};
	scanDir('iris/');

	var fileName = 'js/iris-path.js';
	var data = 'iris.path = ' + JSON.stringify(irisPath, null, 2);
	fs.writeFileSync(fileName, data);
	console.log('The file "' + fileName + '" was saved');
}

function scanDir (path) {
	var filenames = fs.readdirSync(path), fullPath;
	filenames.forEach(function(file) {
		fullPath = path + file;

		if ( fs.statSync(fullPath).isDirectory() ) {
			// console.log('|- ' + fullPath + '/...');
			scanDir(fullPath + "/");
		} else if ( fs.statSync(fullPath).isFile() ) {
			// console.log('|---- ' + file);
			addComponent(file, fullPath.replace('iris/', '').replace(file, ''))
		}
	 });
}

function addComponent (fileName, fullPath) {
// console.log("*** fileName->",fileName,"fullPath->", fullPath)
	var path = fullPath.substr(0, fullPath.length-1).split('/'); // remove last /
// console.log('*** path=', path)

	var i, componentPath = irisPath;
	for( i = 0; i < path.length; i++ ) {
		if ( !componentPath.hasOwnProperty(path[i]) ) {
			componentPath[path[i]] = {};
		}
		componentPath = componentPath[path[i]];
	}

	var pos = fileName.lastIndexOf('.');
	var componentName = fileName.substr(0, pos);
	var componentExt = fileName.substr(pos + 1);
	if ( !componentPath.hasOwnProperty(componentName) ) {
		componentPath[componentName] = {};
	}
	componentPath[componentName][componentExt] = fullPath + fileName;
}

module.exports.generateIrisPath = generateIrisPath;
