var amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", function(error0, connection) {
    if(error0) {
        throw error0
    }
    connection.createChannel(function(error1, channel1) {
        if(error1) {
            throw error1;
        } 
        
        var queue = "hello";

        channel1.assertQueue(queue, {
            durable: false
        });

        console.log("[*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel1.consume(queue, function(msg) {
            console.log("[x] Received %s", msg.content.toString());
        }, {
            noAnk: true
        });
    });
});