const amqp = require("amqplib/callback_api");
const config = require('./config');
const log = require("./log");

const message = process.argv[2]? process.argv[2] : "Hello World";

amqp.connect(config.CONNECTION, function(error, connection) {
  if (error) throw error;

  connection.createChannel(function(error, channel) {
    if (error) throw error;

    channel.assertQueue(config.QUEUE_INPUT, {
      durable: false
    });
    channel.sendToQueue(config.QUEUE_INPUT, Buffer.from(message));

    console.log(log.SENDED, message, config.QUEUE_INPUT);
  });
  setTimeout(function() {
    connection.close();
    process.exit(0);
  }, 500);
});
