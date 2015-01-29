var push = require('pushover-notifications');
var Datamodel = require('./Datamodel');

exports.notify = function(title, message, callback, sound) {
	if (!sound){
		sound = "magic"
	}
	if (!callback) {
		callback = function(err){if (err){throw err;}};
	}
	if (typeof(title) != "string" || typeof(message) != "string" || typeof(sound) != "string"){
		throw TypeError("Expected string for title, message and sound");
	}

	var p = new push( {
	    user: Datamodel.config['pushover-token'],
	    token: Datamodel.config['pushover-user'],
	});

	var msg = {
	    // These values correspond to the parameters detailed on https://pushover.net/api
	    // 'message' is required. All other values are optional.
	    message: message,   // required
	    title: title,
	    sound: sound,
	    device: 'devicename',
	    priority: 1
	};

	p.send(msg, callback);
}