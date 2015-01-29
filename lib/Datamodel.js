var fs = require('fs');
var path = require('path');

var datastorePath = path.join(__dirname, "../", "DATA/data.json");
var data = {};


exports.loadDatastore = function(datastorePath, callback){
	fs.exists(datastorePath, function(exists){
		if (exists){
			fs.readFile(datastorePath, function(err, fileData){
				if (err){ callback(err); return; }
				try {
					data = JSON.parse(fileData);
				} catch(e) {
					
				}
				callback();
			});
		} else {
			//file doesnt exist, write it
			exports.writeData(datastorePath, callback);
		}
	});
}

exports.writeData = function(datastorePath, callback) {
	fs.writeFile(datastorePath, JSON.stringify(data), function(err){
		if (err){ callback(err); return; }
		callback();
	});
}


exports.loadDatastore(datastorePath, function(err){
	if (err){ throw err; }

});