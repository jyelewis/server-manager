var push = require( 'pushover-notifications' );

var p = new push( {
    user: "uf1ZaeJDC42zH13FJz2v1DHfbXdZgh",
    token: "az4SBbUs4aCGG2XTBNGreUfP59pHgq",
});

var msg = {
    // These values correspond to the parameters detailed on https://pushover.net/api
    // 'message' is required. All other values are optional.
    message: 'omg node test',   // required
    title: "Well - this is fantastic",
    sound: 'magic',
    device: 'devicename',
    priority: 1
};

p.send(msg, function(err, result) {
    if (err) {
        throw err;
    }

    console.log(result);
});