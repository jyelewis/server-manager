var fs = require('fs');
var path = require('path');
var async = require('async');

var datastorePath = path.join(__dirname, "../", "DATA/data.json");
exports.data = {};
exports.config = {};

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
		exports.data = newData;
		callback();
	});
}

exports.writeData = function(callback) {
	if(!callback){ callback = function(){}; }
	fs.writeFile(datastorePath, JSON.stringify(exports.data), function(err){
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
				exports.config = newData;
				callback();
			});
			return;
		}
		exports.config = newData;
		callback();
	});
}

exports.load = function(callback){
	async.parallel([
		 exports.loadDatastore
		,exports.loadConfig
	], function(err){
		if(err){ throw err; }
		callback(err);
	});
}




