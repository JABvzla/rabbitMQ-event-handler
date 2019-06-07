const amqp = require("amqplib/callback_api");
const config = require("./config");
const log = require("./log");

const SERVICE_NAME = process.argv[2];

if (!SERVICE_NAME) return console.error("Service name is required");

amqp.connect(config.CONNECTION, function(error, connection) {
  if (error) throw error;

  connection.createChannel(function(error, channel) {
    if (error) throw error;

    channel.assertQueue(SERVICE_NAME, { durable: false });

    console.log(log.LISTEN, SERVICE_NAME);

    channel.consume(
      SERVICE_NAME,
      msg => {
        console.log(log.RECEIVED, msg.content.toString());
      },
      {
        noAck: true
      }
    );
  });
});
