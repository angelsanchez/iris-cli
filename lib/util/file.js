var fs = require('fs');

var readline = require('readline');

function copy (from, to, filter) {
	var data = fs.readFileSync(from, 'utf8');
	if ( filter ) data = filter(data);
	    
	fs.writeFileSync(to, data);
	console.log(to + ' created');
}

function createComponent (type, cbk) {
	var defaultVal = 'component';
	var rl = readline.createInterface({
	  input: process.stdin,
	  output: process.stdout
	});
	
	rl.question(type + ' name? (' + defaultVal + '): ', function(name) {
		rl.close();
		
		name = name || defaultVal;

		copy(__dirname + '/../../tmpl/' + type + '.js', "iris/" + type + "/" + name + '.js', function (data) {
			return data.replace(/{{component}}/g, name);
		});

		if ( type != 'resource' ) {
			copy(__dirname + '/../../tmpl/' + type + '.html', "iris/" + type + "/" + name + '.html', function (data) {
				return data.replace(/{{component}}/g, name);
			});
		}
		
		cbk();
	});
}

module.exports = {
	copy : copy,
	createComponent : createComponent
};
