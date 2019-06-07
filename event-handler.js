const amqp = require("amqplib/callback_api");
const config = require("./config");
const log = require("./log");

const services = [];

amqp.connect(config.CONNECTION, function(error, connection) {
  if (error) throw error;

  connection.createChannel(function(error, channel) {
    if (error) throw error;

    channel.assertQueue(config.QUEUE_INPUT, { durable: false });

    console.log(log.LISTEN, config.QUEUE_INPUT);

    channel.consume(
      config.QUEUE_INPUT,
      msg => {
        const { content } = msg;
        console.log(log.RECEIVED, content.toString());

        services.forEach(e => {
          channel.sendToQueue(e, Buffer.from(content));
          console.log(log.SENDED, content.toString(), e);
        });
      },
      {
        noAck: true
      }
    );
  });
});

/*
RABBITMQ_HOST=rabbitmq.123seguro.com
RABBITMQ_PORT=5672
RABBITMQ_LOGIN=guest
RABBITMQ_PASSWORD=123%23Seguro
RABBITMQ_QUEUE_INPUT=jabQueue
*/