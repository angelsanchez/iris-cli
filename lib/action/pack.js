var path = require('path');
var file = require('../util/file');
var fs = require('fs');
var async = require('async');
var UglifyJS = require("uglify-js");
var htmlMinifier = require('html-minifier').minify;

var REGEX_JS = /\.js$/;
var REGEX_HTML = /\.html$/;
var IRIS_FOLDER = 'iris/';
var IRIS_PATH_JS = 'js/iris-path.js';
var IRIS_INIT_JS = 'js/init.js';
var cwd;

function pack (destination) {

	cwd = process.cwd();

	console.log('Destination folder is "' + destination + '", deleting content...');
	file.deleteFolder(destination);

	console.log('Copying application files to destination folder...');
	file.copyFolder(cwd, destination);
	file.deleteFolder( path.join(destination, IRIS_FOLDER) );
	fs.unlinkSync( path.join(cwd, destination, IRIS_PATH_JS) );
	fs.unlinkSync( path.join(cwd, destination, IRIS_INIT_JS) );

	console.log('Reading iris.path...');
	var irisPathStr = fs.readFileSync(path.join(cwd, IRIS_PATH_JS)).toString(); // TODO 'js/iris-path.js' should be global
	var irisPath = JSON.parse(irisPathStr.replace(/iris\.path *= */, ''));

	var filesToProcess = [];
	addFilesToProcess(filesToProcess, irisPath);
	console.log('There are ' + filesToProcess.length + ' files to process');
	
	var jsFiles = [], htmlFiles = [];
	jsFiles.push( path.join(cwd, 'js/iris-path.js') ); // Important: before the rest
	jsFiles.push( path.join(cwd, 'js/init.js') );
	
	for ( var i = 0; i < filesToProcess.length; i++ ) {
		var fileName = filesToProcess[i];
		if ( REGEX_JS.test(fileName) ) {
			jsFiles.push( path.join(IRIS_FOLDER, fileName) );
		} else if ( REGEX_HTML.test(fileName) ) {
			htmlFiles.push(fileName);
		}
	}


	var destFile = path.join(destination, 'js/init.min.js');

	async.series([
		function (done) {
			console.log('Compressing js files...');
			minifyJs(jsFiles, destFile, done);
		},
		function (done) {
			console.log('Compressing html files...');
			minifyHtml(htmlFiles, destFile, done);
		}
	], function () {
		console.log('Pack generated at "' + destination + '"');

		// Change init.js to init.min.js at the index file
		var indexPath = path.join(destination, 'index.html');
		var indexStr = fs.readFileSync(indexPath, "utf8").toString();

		// Remove iris-path from index file
		indexStr = indexStr.replace(/<script[^<]*iris-path.js[^<]*<\/script>/, '')
						.replace('js/init.js', 'js/init.min.js');

		fs.writeFile(indexPath, indexStr);
	});
}

function addFilesToProcess (result, object) {
	for ( var key in object ) {
		if ( typeof object[key] === 'string' ) {
			result.push( object[key] );
		} else {
			addFilesToProcess( result, object[key] );
		}
	}
}

function minifyJs (files, dest, done) {
	var min = UglifyJS.minify(files).code;

	fs.appendFile(
		dest,
		min,
		function (err) {
			if (err) {
				console.error('*** Error compressing js files: ', err);
				process.exit(-1);
			} else {
				done();
			}
		}
	);
}

function minifyHtml (files, dest, done) {
	var content = [], data, i;

	for ( i = 0; i < files.length; i++ ) {
		data = fs.readFileSync(path.join(cwd, IRIS_FOLDER + files[i]), "utf8").replace(/[\r\n\t]/g, '');
		data = htmlMinifier(data);
		content.push('iris.tmpl("' + files[i] + '","' + data.replace(/\"/g, '\\\"') + '");');
	}

	fs.appendFile(
		dest,
		content.join('\n'),
		function (err) {
			if (err) {
				console.error('*** Error concatenating templates', err);
				process.exit(-1);
			} else {
				done();
			}
		}
	);
}

module.exports.pack = pack;
