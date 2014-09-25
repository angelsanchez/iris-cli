var fs = require('fs');
var path = require('path');
var input = require('./input');
var mkdirp = require('mkdirp');


function mkdir (path) {
	console.log('Creating "' + path + '"...');
	fs.mkdirSync(path);
}

function copyFile (from, to, mod) {
	var toExists = fs.existsSync(to);

	if ( toExists ) {
		console.error('The copy destination "' + to + '" exists!')
		process.exit(1);
	}

	var data = fs.readFileSync(from);
	if ( typeof mod === 'function' ) data = mod(data);
			
	fs.writeFileSync(to, data);
	console.log('Creating "' + to + '"...');
}

function copyFolder (from, to) {
	var stat = fs.statSync(from);
	var toExists = fs.existsSync(to);

	if ( stat.isFile() ) {
		copyFile(from, to);

	} else if ( stat.isDirectory() ) {

		if ( !toExists ) {
			mkdir(to);
		}

		var contents = fs.readdirSync(from);
		contents.forEach(function (content) {
			copyFolder(path.join(from, content), path.join(to, content));
		});
	}
}

function createComponent (type, name, cbk) {
	var defaultVal = 'component';

	if ( name === undefined ) {
		input.ask(type + ' name? (' + defaultVal + '): ', function(name) {
			createComponentComplete(type, name, cbk);
		}, defaultVal);
	} else {
		createComponentComplete(type, name, cbk);
	}
}

function createComponentComplete (type, name, cbk) {

	// e.g.: name = global.user.balance
	//       filename = balance
	//       namePath = global/user
	//       destFolder = /examples/project/iris/ui/global/user (cwd=/examples/project/)
	//       to = /examples/project/iris/ui/global/user/balance

	var filename = name.match(/[^.]+$/)[0];
	var namePath = name.replace(/\./g, '/').replace(filename, '');
	var destFolder = path.join(process.cwd(), 'iris/' + type, namePath);

	mkdirp.sync(destFolder);

	var from = path.join(__dirname, '../../tmpl/component', type);
	var to = path.join(destFolder, filename);

	copyFile(from + '.js', to + '.js', function (data) {
		return data.replace(/{{component}}/g, name);
	});

	if ( type != 'resource' && type != 'model' ) {
		copyFile(from + '.html', to + '.html', function (data) {
			return data.replace(/{{component}}/g, name);
		});
	}
	
	cbk();

}

function deleteFolder (target) {
  if( fs.existsSync(target) ) {
  	var curPath;
    fs.readdirSync(target).forEach(function(file,index){
      curPath = path.join(target, file);

      if (fs.statSync(curPath).isDirectory()) {
        deleteFolder(curPath);
      } else {
      	// delete file
        fs.unlinkSync(curPath);
      }

    });
    
    fs.rmdirSync(target);
  }
};

module.exports = {
	copyFile : copyFile,
	copyFolder: copyFolder,
	createComponent : createComponent,
	deleteFolder : deleteFolder
};
