import { Kafka } from 'kafkajs';
import 'dotenv/config';

const brokers = (process.env.KAFKA_BROKERS || 'localhost:9092').split(',');

export const kafka = new Kafka({
  clientId: 'qa-automation-client',
  brokers
});
