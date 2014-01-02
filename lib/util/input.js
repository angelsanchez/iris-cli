var readline = require('readline');


function ask (msg, cbk, defaultVal) {
	var rl = readline.createInterface({
	  input: process.stdin,
	  output: process.stdout
	});

	rl.question(msg, function(val) {
		rl.close();
		
		cbk(val || defaultVal);
	});
}

module.exports = {
	ask : ask
};
