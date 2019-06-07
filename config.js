require("dotenv").config();

const RABBITMQ_HOST = process.env.RABBITMQ_HOST;
const RABBITMQ_PORT = process.env.RABBITMQ_PORT;
const RABBITMQ_LOGIN = process.env.RABBITMQ_LOGIN;
const RABBITMQ_PASSWORD = process.env.RABBITMQ_PASSWORD;
const QUEUE_INPUT = process.env.RABBITMQ_QUEUE_INPUT;

// ampq format
// amqp://user:pass@host:10000/vhost
const CONNECTION = `amqp://${RABBITMQ_LOGIN}:${RABBITMQ_PASSWORD}@${RABBITMQ_HOST}:${RABBITMQ_PORT}`;

module.exports = {
  QUEUE_INPUT,
  CONNECTION
};
