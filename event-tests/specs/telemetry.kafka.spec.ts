import { test, expect } from '@playwright/test';
import { randomUUID } from 'node:crypto';
import { kafka } from '../utils/kafkaClient.js';

const topic = process.env.KAFKA_TOPIC || 'gps-raw-events';

test.describe('Kafka - Telemetría GPS', () => {
  test('debe publicar y consumir un evento de telemetría válido', async () => {
    const producer = kafka.producer();
    const consumer = kafka.consumer({ groupId: `qa-group-${randomUUID()}` });

    const event = {
      eventId: randomUUID(),
      vehicleId: 'VEH-99',
      lat: 4.60,
      lng: -74.08,
      speed: 65,
      timestamp: new Date().toISOString()
    };

    await producer.connect();
    await consumer.connect();
    await consumer.subscribe({ topic, fromBeginning: true });

    const receivedPromise = new Promise<typeof event>((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('No llegó el mensaje dentro del tiempo esperado')), 15_000);

      consumer.run({
        eachMessage: async ({ message }) => {
          if (!message.value) return;

          const value = JSON.parse(message.value.toString());
          if (value.eventId === event.eventId) {
            clearTimeout(timer);
            resolve(value);
          }
        }
      }).catch(reject);
    });

    await producer.send({
      topic,
      messages: [{ key: event.vehicleId, value: JSON.stringify(event) }]
    });

    const received = await receivedPromise;

    expect(received.vehicleId).toBe('VEH-99');
    expect(received.lat).toBeGreaterThanOrEqual(-90);
    expect(received.lat).toBeLessThanOrEqual(90);
    expect(received.lng).toBeGreaterThanOrEqual(-180);
    expect(received.lng).toBeLessThanOrEqual(180);
    expect(typeof received.speed).toBe('number');

    await consumer.disconnect();
    await producer.disconnect();
  });
});
