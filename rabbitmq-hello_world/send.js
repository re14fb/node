var amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", function(error0, connection) {
    if(error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel1) {
        if(error1) {
            throw error1;
        }

        var queue = "hello";
        var msg = 'Hello World';

        channel1.assertQueue(queue, {
            durable: false
        });

        channel1.sendToQueue(queue, Buffer.from(msg));
        console.log("[x] Sent %s", msg);
    });
    setTimeout(function() {
        connection.close();
        process.exit(0)
    }, 500);
});