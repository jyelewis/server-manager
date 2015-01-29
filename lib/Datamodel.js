var fs = require('fs');
var path = require('path');

var datastorePath = path.join(__dirname, "../", "DATA/data.json");
var data = {};
var config = {};

function readJSON(filePath, callback) {
	fs.readFile(filePath, function(err, fileData){
		if (err){ callback(err); return; }
		var data;
		try {
			data = JSON.parse(fileData);
		} catch(e) {
			callback(new Error("Unable to parse JSON"));
			return
		}

		callback(undefined, data);
	});
}


exports.loadDatastore = function(callback){
	if(!callback){ callback = function(){}; }
	readJSON(datastorePath, function(err, newData){
		if (err) { callback(err); return; }
		data = newData;
		callback();
	});
}

exports.writeData = function(callback) {
	if(!callback){ callback = function(){}; }
	fs.writeFile(datastorePath, JSON.stringify(data), function(err){
		if (err){ callback(err); return; }
		callback();
	});
}

exports.loadConfig = function(callback){
	if(!callback){ callback = function(){}; }
	readJSON("../config.json", function(err, newData){
		if (err){
			//try to copy the config.example.json file to config.json
			fs.createReadStream('../config.example.json').pipe(fs.createWriteStream('../config.json'));
			readJSON("../config.json", function(err, newData){
				if (err) { callback(err); return; }
				config = newData;
				callback();
			});
			return;
		}
		config = newData;
		callback();
	});
}

exports.loadDatastore(function(err){
	if(err){
		throw err;
	}
});

exports.loadConfig(function(err){
	if(err){
		throw err;
	}
});


