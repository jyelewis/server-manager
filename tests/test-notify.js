
exports.notify = function(test){
	var notify = require("../lib/Notify.js").notify;
	test.throws(function(){ notify([], []); });

	notify("Test executed", "Test Notify.js", function(err, result){
		test.ifError(err);
		test.ok(JSON.parse(result).status);
		test.done();
	});
}


